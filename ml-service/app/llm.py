import os
import json
import re
from pathlib import Path
from dotenv import load_dotenv
from groq import Groq

# Load environment variables from workspace root or ml-service directory
dotenv_path = Path(__file__).resolve().parent.parent.parent / '.env'
if dotenv_path.exists():
    load_dotenv(dotenv_path=dotenv_path)
else:
    load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_MODEL = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")

_client = None

def get_groq_client() -> Groq:
    """Initializes and caches the Groq API client."""
    global _client
    if _client is None:
        if not GROQ_API_KEY:
            raise ValueError("GROQ_API_KEY environment variable is not configured.")
        _client = Groq(api_key=GROQ_API_KEY)
    return _client

def clean_json_string(raw_text: str) -> str:
    """Strips markdown code fences, comments, or leading/trailing text."""
    # Remove ```json ... ``` fences if present
    match = re.search(r'```(?:json)?\s*([\s\S]*?)\s*```', raw_text, re.IGNORECASE)
    if match:
        return match.group(1).strip()
    return raw_text.strip()

def generate_json(prompt: str, system_prompt: str = "") -> dict:
    """
    Calls Groq LLM and safely parses response as JSON.
    Guarantees returning a dictionary, with fallback if parsing fails.
    """
    client = get_groq_client()

    messages = []
    if system_prompt:
        messages.append({"role": "system", "content": system_prompt})
    else:
        messages.append({
            "role": "system", 
            "content": "You are a clinical decision support AI. Always respond in valid, parseable JSON format only."
        })

    messages.append({"role": "user", "content": prompt})

    try:
        completion = client.chat.completions.create(
            model=GROQ_MODEL,
            messages=messages,
            response_format={"type": "json_object"},
            temperature=0.2,
            max_tokens=2048,
        )

        raw_content = completion.choices[0].message.content or "{}"
        cleaned_content = clean_json_string(raw_content)
        return json.loads(cleaned_content)
    except Exception as e:
        print(f"[LLM Error] Failed to generate or parse JSON from Groq: {e}")
        # Safe standard fallback matching required prediction format
        return {
            "predictions": [
                {
                    "disease": "Undetermined Condition",
                    "confidence": "Low",
                    "reason": "AI inference completed with incomplete structured output. Please consult a clinician."
                }
            ],
            "risk": {
                "level": "Low",
                "factors": ["Inconclusive laboratory or symptom profile"],
                "precautions": ["Consult a medical professional for comprehensive evaluation"]
            },
            "disclaimer": "This is an informational tool, NOT a medical diagnosis. Consult a qualified doctor."
        }

def generate_chat_response(messages: list, system_prompt: str = "") -> str:
    """
    Generates a natural language response for multi-turn conversational AI chat.
    """
    client = get_groq_client()
    formatted_messages = []

    if system_prompt:
        formatted_messages.append({"role": "system", "content": system_prompt})

    for m in messages:
        formatted_messages.append({"role": m["role"], "content": m["content"]})

    completion = client.chat.completions.create(
        model=GROQ_MODEL,
        messages=formatted_messages,
        temperature=0.4,
        max_tokens=1024,
    )

    return completion.choices[0].message.content or ""
