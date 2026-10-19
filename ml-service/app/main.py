import json
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

from app.parsers import parse_document
from app.rag import retrieve_relevant_chunks
from app.llm import generate_chat_response, generate_json
from app.predict import analyze_health_risk, STANDARD_DISCLAIMER

app = FastAPI(
    title="Disease Prediction & Risk Analysis ML Service",
    description="FastAPI service delivering RAG vector search, Groq LLM predictions, chat, and MCQ assessment",
    version="1.0.0"
)

# Enable CORS for internal backend service communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1. Health check endpoint
@app.get("/health")
def health_check():
    """Returns the operational status of the ML service."""
    return {"status": "ok", "service": "ml-service"}

# 2. File Upload analysis
@app.post("/analyze-file")
async def analyze_file(
    file: UploadFile = File(...),
    user_id: Optional[int] = Form(None)
):
    """
    Parses uploaded report (CSV, PDF, or TXT), retrieves RAG knowledge,
    and returns standardized disease prediction.
    """
    try:
        content_bytes = await file.read()
        extracted_text = parse_document(content_bytes, file.filename)
        
        if not extracted_text.strip():
            raise HTTPException(status_code=400, detail="Uploaded file contains no readable text.")

        result = analyze_health_risk(user_input=extracted_text, user_id=user_id)
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

# Request schema for Chat
class ChatMessage(BaseModel):
    role: str # 'user' or 'assistant'
    content: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessage]] = []
    user_id: Optional[int] = None

# 3. AI Chat endpoint
@app.post("/chat")
def chat(request: ChatRequest):
    """
    Processes user symptom description with RAG context and conversational history.
    Suggests likely conditions, highlights risk factors, and asks relevant follow-up questions.
    """
    try:
        # Retrieve clinical reference knowledge from pgvector
        retrieved_chunks = retrieve_relevant_chunks(request.message, user_id=request.user_id, top_k=3)
        context_str = "\n---\n".join(retrieved_chunks) if retrieved_chunks else "No specific clinical notes retrieved."

        system_prompt = (
            "You are an empathetic, knowledgeable Clinical Health AI assistant for a disease risk analysis project.\n"
            f"--- CLINICAL KNOWLEDGE BASE (RAG) ---\n{context_str}\n\n"
            "Guidelines:\n"
            "1. Listen carefully to the user's symptoms and show empathy.\n"
            "2. Cross-reference symptoms against the provided clinical knowledge base.\n"
            "3. Ask clarifying follow-up questions (e.g. symptom onset, severity, triggers, associated signs).\n"
            "4. Mention potential conditions they should be aware of, along with relevant risk factors and precautions.\n"
            f"5. Always emphasize: {STANDARD_DISCLAIMER}\n"
            "Keep replies concise, clear, and easy for a patient to understand."
        )

        # Assemble conversation messages for Groq
        messages = []
        for msg in request.history[-6:]:  # Keep recent context window
            messages.append({"role": msg.role, "content": msg.content})

        messages.append({"role": "user", "content": request.message})

        reply = generate_chat_response(messages=messages, system_prompt=system_prompt)
        return {"reply": reply}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chat generation failed: {str(e)}")

# Request schema for MCQ Next Question
class MCQAnswer(BaseModel):
    question: str
    answer: str

class MCQNextRequest(BaseModel):
    step: int # 1 to 8-10
    answers: Optional[List[MCQAnswer]] = []
    user_id: Optional[int] = None

# Fallback MCQ question bank in case Groq response formatting varies
FALLBACK_MCQ_BANK = [
    {
        "question": "What is the primary symptom or discomfort you are experiencing today?",
        "options": [
            "Fever, chills, or body aches",
            "Cough, shortness of breath, or chest tightness",
            "Frequent thirst, urination, or chronic fatigue",
            "Severe throbbing headache or dizziness",
            "None of these"
        ]
    },
    {
        "question": "How long have you been experiencing these symptoms?",
        "options": [
            "Just started today or yesterday (acute)",
            "Less than a week",
            "Between 1 to 4 weeks",
            "More than a month (chronic / recurring)",
            "None of these"
        ]
    },
    {
        "question": "Are you experiencing any respiratory or breathing difficulties?",
        "options": [
            "Shortness of breath during mild walking or climbing stairs",
            "Wheezing or whistling sound when exhaling",
            "Persistent dry or mucus cough",
            "Chest pressure or heavy sensation",
            "None of these"
        ]
    },
    {
        "question": "Do you notice any metabolic or energy fluctuations?",
        "options": [
            "Excessive unquenchable thirst (polydipsia)",
            "Frequent urination, particularly waking up at night",
            "Unexplained weight loss or constant hunger",
            "Extreme fatigue or blurred vision",
            "None of these"
        ]
    },
    {
        "question": "Are you experiencing any cardiovascular or blood pressure related signs?",
        "options": [
            "Morning occipital headache or lightheadedness",
            "Rapid or irregular fluttering heartbeat (palpitations)",
            "Chest discomfort radiating to jaw or left arm",
            "Swelling in feet, ankles, or legs",
            "None of these"
        ]
    },
    {
        "question": "Are you having any digestive or abdominal discomfort?",
        "options": [
            "Burning chest sensation (heartburn) after eating",
            "Acid or sour fluid regurgitation into throat",
            "Watery diarrhea or severe stomach cramping",
            "Nausea, bloating, or vomiting",
            "None of these"
        ]
    },
    {
        "question": "Do you experience headaches or neurological sensitivities?",
        "options": [
            "Unilateral throbbing head pain lasting several hours",
            "Extreme sensitivity to light (photophobia) and noise",
            "Visual disturbances (shimmering lines or blind spots)",
            "Tension band sensation across forehead and neck",
            "None of these"
        ]
    },
    {
        "question": "Do you have any relevant clinical risk factors or lifestyle habits?",
        "options": [
            "Sedentary lifestyle or BMI >= 25",
            "Current or former tobacco smoker",
            "Family history of diabetes, hypertension, or heart disease",
            "High dietary sodium and high everyday stress",
            "None of these"
        ]
    }
]

# 4. MCQ Next question endpoint
@app.post("/mcq/next")
def mcq_next(request: MCQNextRequest):
    """
    Generates the next adaptive multiple-choice question with 4 options + 'None of these'.
    Completes assessment after 8 to 10 questions.
    """
    total_steps = 8

    if request.step > total_steps:
        return {"question": "", "options": [], "done": True, "step": request.step}

    # Format previous answers for LLM context
    history_summary = ""
    if request.answers:
        history_summary = "\n".join([f"- Q: {a.question} -> Selected: {a.answer}" for a in request.answers])

    prompt = (
        f"You are conducting an adaptive multiple-choice clinical symptom assessment.\n"
        f"Current question step: {request.step} of {total_steps}.\n"
        f"Patient answers so far:\n{history_summary if history_summary else 'No answers yet (First Question).'}\n\n"
        "Generate the next clinically relevant symptom question to narrow down potential disorders.\n"
        "Requirements:\n"
        "- Question must be clear and focus on specific symptoms or risk factors.\n"
        "- Provide EXACTLY 4 distinct, clinical symptom choices PLUS 'None of these' as the 5th option.\n"
        "- Return ONLY a JSON object with this exact format:\n"
        "{\n"
        '  "question": "Question text here?",\n'
        '  "options": ["Option 1", "Option 2", "Option 3", "Option 4", "None of these"],\n'
        '  "done": false\n'
        "}"
    )

    try:
        response = generate_json(
            prompt=prompt,
            system_prompt="You generate adaptive clinical multiple-choice questions. Return strict JSON only."
        )

        question = response.get("question")
        options = response.get("options", [])

        # Validate options: must have at least 4 options and ensure 'None of these' is present
        if not question or not isinstance(options, list) or len(options) < 4:
            raise ValueError("Malformed MCQ generation from LLM")

        if "None of these" not in options:
            options = options[:4] + ["None of these"]

        return {
            "step": request.step,
            "totalSteps": total_steps,
            "question": question,
            "options": options[:5],
            "done": False
        }

    except Exception:
        # Graceful fallback to pre-curated question bank
        fallback_idx = min(request.step - 1, len(FALLBACK_MCQ_BANK) - 1)
        fallback_item = FALLBACK_MCQ_BANK[fallback_idx]
        return {
            "step": request.step,
            "totalSteps": total_steps,
            "question": fallback_item["question"],
            "options": fallback_item["options"],
            "done": False
        }

# Request schema for MCQ Result
class MCQResultRequest(BaseModel):
    answers: List[MCQAnswer]
    user_id: Optional[int] = None

# 5. MCQ Result prediction endpoint
@app.post("/mcq/result")
def mcq_result(request: MCQResultRequest):
    """
    Synthesizes all submitted MCQ answers and generates the final disease prediction and risk analysis.
    """
    if not request.answers:
        raise HTTPException(status_code=400, detail="No answers provided for MCQ evaluation.")

    formatted_answers = [
        f"Question: {item.question}\nPatient Answer: {item.answer}" 
        for item in request.answers if item.answer != "None of these"
    ]

    summary = (
        "Patient Multiple Choice Symptom Questionnaire Summary:\n" + 
        ("\n\n".join(formatted_answers) if formatted_answers else "Patient answered 'None of these' to all symptom inquiries.")
    )

    return analyze_health_risk(user_input=summary, user_id=request.user_id)
