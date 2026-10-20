import sys
from pathlib import Path
import gradio as gr

# Prevent app.py from shadowing the app/ package directory
app_dir = Path(__file__).resolve().parent / "app"
if "app" in sys.modules:
    sys.modules["app"].__path__ = [str(app_dir)]

from app.main import app as fastapi_app

# Mount existing FastAPI application on Gradio
# All API endpoints (/health, /predict, /chat, /analyze-file, /docs) work identically
with gr.Blocks(title="Vita Signal ML Service") as demo:
    gr.Markdown("# 🩺 Vita Signal ML Microservice\n\nFastAPI clinical decision-support and risk analysis endpoints are live and running with 16GB RAM.")

app = gr.mount_gradio_app(fastapi_app, demo, path="/gradio")
