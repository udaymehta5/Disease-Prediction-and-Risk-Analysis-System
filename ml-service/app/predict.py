from app.llm import generate_json
from app.rag import retrieve_relevant_chunks

STANDARD_DISCLAIMER = "This is an informational tool, NOT a medical diagnosis. Consult a qualified doctor."

def analyze_health_risk(user_input: str, user_id: int | None = None) -> dict:
    """
    Combines retrieved clinical knowledge (RAG) with user symptoms or laboratory values,
    then queries Groq LLM to generate the standardized disease prediction and risk analysis.
    """
    # 1. Retrieve top 4 relevant knowledge chunks from pgvector
    retrieved_chunks = retrieve_relevant_chunks(user_input, user_id=user_id, top_k=4)
    rag_context = "\n---\n".join(retrieved_chunks) if retrieved_chunks else "No specific seed knowledge found."

    # 2. Formulate clinical prompt
    system_prompt = (
        "You are an expert Clinical Decision Support AI. Analyze the provided clinical findings, "
        "biomarkers, and symptom descriptions against reference medical knowledge.\n"
        "You MUST return ONLY a valid JSON object matching the exact schema below.\n"
        "Do NOT include any markdown code blocks, conversational pleasantries, or preamble.\n"
        "Required JSON schema:\n"
        "{\n"
        '  "predictions": [\n'
        '    {\n'
        '      "disease": "Disease Name",\n'
        '      "confidence": "Low" | "Medium" | "High",\n'
        '      "reason": "Brief clinical rationale based on reported findings"\n'
        '    }\n'
        '  ],\n'
        '  "risk": {\n'
        '    "level": "Low" | "Medium" | "High",\n'
        '    "factors": ["List of key clinical or lifestyle risk factors"],\n'
        '    "precautions": ["List of actionable clinical precautions and lifestyle changes"]\n'
        '  },\n'
        f'  "disclaimer": "{STANDARD_DISCLAIMER}"\n'
        "}\n"
        "Provide exactly up to 3 most probable diseases sorted by descending likelihood."
    )

    user_prompt = (
        f"--- CLINICAL REFERENCE KNOWLEDGE (RAG) ---\n{rag_context}\n\n"
        f"--- PATIENT SYMPTOMS / LAB REPORT DATA ---\n{user_input}\n\n"
        "Please provide your structured clinical assessment in valid JSON."
    )

    # 3. Call Groq LLM with safe parsing
    result = generate_json(prompt=user_prompt, system_prompt=system_prompt)

    # 4. Validate and enforce schema compliance
    if not isinstance(result, dict):
        result = {}

    predictions = result.get("predictions", [])
    if not isinstance(predictions, list) or len(predictions) == 0:
        predictions = [
            {
                "disease": "Inconclusive Findings",
                "confidence": "Low",
                "reason": "Provided inputs do not conclusively match known disease profiles."
            }
        ]

    # Clean confidence values to Low | Medium | High
    for p in predictions:
        if p.get("confidence") not in ["Low", "Medium", "High"]:
            p["confidence"] = "Medium"

    risk = result.get("risk", {})
    if not isinstance(risk, dict):
        risk = {}

    risk_level = risk.get("level", "Medium")
    if risk_level not in ["Low", "Medium", "High"]:
        risk_level = "Medium"

    risk_factors = risk.get("factors", [])
    if not isinstance(risk_factors, list):
        risk_factors = ["General symptom monitoring advised"]

    risk_precautions = risk.get("precautions", [])
    if not isinstance(risk_precautions, list):
        risk_precautions = ["Consult a healthcare provider for physical evaluation"]

    return {
        "predictions": predictions[:3],
        "risk": {
            "level": risk_level,
            "factors": risk_factors,
            "precautions": risk_precautions
        },
        "disclaimer": STANDARD_DISCLAIMER
    }
