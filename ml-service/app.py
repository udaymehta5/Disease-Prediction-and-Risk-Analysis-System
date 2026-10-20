import os
import sys
import types
from pathlib import Path

# CRITICAL: Disable Gradio Server-Side Rendering (SSR) mode.
# On Hugging Face Spaces, Gradio SSR spawns a Node.js sidecar process on port 7860,
# which causes Uvicorn to crash with [Errno 98] address already in use!
os.environ["GRADIO_SSR_MODE"] = "False"

import gradio as gr
import uvicorn

current_dir = Path(__file__).resolve().parent
if str(current_dir) not in sys.path:
    sys.path.insert(0, str(current_dir))

# Support both file layouts on Hugging Face Spaces:
# Case 1: Code is inside the app/ subfolder
# Case 2: Code files (main.py, rag.py, etc.) were uploaded directly to the root
app_subfolder = current_dir / "app"
if app_subfolder.exists():
    if "app" in sys.modules:
        sys.modules["app"].__path__ = [str(app_subfolder)]
else:
    app_pkg = types.ModuleType("app")
    app_pkg.__path__ = [str(current_dir)]
    sys.modules["app"] = app_pkg

from app.main import app as fastapi_app

# Mount Gradio onto FastAPI at root "/" with ssr_mode=False so visiting the space URL displays the UI,
# and all FastAPI endpoints (/health, /predict, /chat, etc.) remain fully accessible!
with gr.Blocks(title="Vita Signal ML Service") as demo:
    gr.Markdown("# 🩺 Vita Signal ML Microservice\n\nFastAPI clinical decision-support and risk analysis endpoints are live and running with 16GB RAM.")
    gr.Markdown("### Endpoints Active:\n- `GET /health` - System health probe\n- `POST /predict` - Disease risk prediction\n- `POST /chat` - Clinical reasoning AI assistant\n- `POST /analyze-file` - Medical biomarker document OCR & extraction\n- `POST /mcq/next` - Adaptive medical questionnaire\n- `POST /mcq/result` - MCQ diagnosis score calculation\n- `GET /docs` - Interactive Swagger API documentation")

app = gr.mount_gradio_app(fastapi_app, demo, path="/", ssr_mode=False)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=7860, reload=False)
