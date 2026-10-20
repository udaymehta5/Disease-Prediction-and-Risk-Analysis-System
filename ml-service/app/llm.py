import os
import json
import re
from pathlib import Path
from dotenv import load_dotenv
from groq import Groq

# Load environment variables from workspace root or ml-service directory
dotenv_path_root = Path(__file__).resolve().parent.parent.parent / '.env'
dotenv_path_service = Path(__file__).resolve().parent.parent / '.env'
if dotenv_path_root.exists():
    load_dotenv(dotenv_path=dotenv_path_root, override=True)
elif dotenv_path_service.exists():
    load_dotenv(dotenv_path=dotenv_path_service, override=True)
else:
    load_dotenv(override=True)

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
DEFAULT_MODEL = os.getenv("GROQ_MODEL", "qwen/qwen3.8-27b")

_client = None
_active_model = None

# Known high-performing models on Groq to try in order of preference
FALLBACK_MODELS = [
    DEFAULT_MODEL,
    "qwen/qwen3.8-27b",
    "openai/gpt-oss-120b",
    "openai/gpt-oss-20b",
    "llama-3.3-70b-versatile",
    "llama-3.1-8b-instant"
]

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

def _call_groq_with_fallback(messages: list, response_format=None, temperature=0.3, max_tokens=1024):
    """
    Calls Groq chat completion with automatic model discovery and fallback.
    Prevents 404 (model_not_found) and 400 (model_decommissioned) errors.
    """
    global _active_model
    client = get_groq_client()

    # Prioritize active working model, then fallback candidates
    models_to_try = []
    if _active_model:
        models_to_try.append(_active_model)
    for m in FALLBACK_MODELS:
        if m and m not in models_to_try:
            models_to_try.append(m)

    last_error = None
    for model_name in models_to_try:
        try:
            kwargs = {
                "model": model_name,
                "messages": messages,
                "temperature": temperature,
                "max_tokens": max_tokens,
            }
            if response_format:
                kwargs["response_format"] = response_format

            completion = client.chat.completions.create(**kwargs)
            _active_model = model_name  # Cache working model
            return completion
        except Exception as e:
            err_str = str(e).lower()
            last_error = e
            # Only try next model if it is a model availability/deprecation issue
            if "model_not_found" in err_str or "model_decommissioned" in err_str or "404" in err_str or "does not exist" in err_str:
                print(f"[LLM Warning] Model '{model_name}' unavailable on Groq. Trying fallback...")
                continue
            else:
                # If it's a JSON validation error or rate limit, re-raise or break
                raise e

    # If all static candidates failed, query Groq for available models dynamically
    try:
        remote_models = [m.id for m in client.models.list().data if not m.id.startswith("whisper")]
        for model_name in remote_models:
            if model_name not in models_to_try:
                try:
                    kwargs = {
                        "model": model_name,
                        "messages": messages,
                        "temperature": temperature,
                        "max_tokens": max_tokens,
                    }
                    if response_format:
                        kwargs["response_format"] = response_format
                    completion = client.chat.completions.create(**kwargs)
                    _active_model = model_name
                    print(f"[LLM Success] Dynamically selected available Groq model: {model_name}")
                    return completion
                except Exception:
                    continue
    except Exception:
        pass

    raise last_error

def generate_json(prompt: str, system_prompt: str = "") -> dict:
    """
    Calls Groq LLM and safely parses response as JSON.
    Guarantees returning a dictionary, with fallback if parsing fails.
    """
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
        completion = _call_groq_with_fallback(
            messages=messages,
            response_format={"type": "json_object"},
            temperature=0.2,
            max_tokens=2048
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
    formatted_messages = []

    if system_prompt:
        formatted_messages.append({"role": "system", "content": system_prompt})

    for m in messages:
        formatted_messages.append({"role": m["role"], "content": m["content"]})

    completion = _call_groq_with_fallback(
        messages=formatted_messages,
        temperature=0.4,
        max_tokens=1024
    )

    return completion.choices[0].message.content or ""
