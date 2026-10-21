import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addMessage, setLoading, setError, clearChat } from '../store/chatSlice';
import { setResult } from '../store/resultSlice';
import ChatBox from '../components/ChatBox';
import api from '../services/api';
import './Assessments.css';

function Chat() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { messages, loading, error } = useSelector((state) => state.chat);
  const [analyzingReport, setAnalyzingReport] = useState(false);

  // Suggested prompt chips for quick client testing
  const samplePrompts = [
    "I've been feeling extreme thirst, frequent urination, and constant fatigue for 3 weeks.",
    "Sudden high blood pressure spikes, morning throbbing headache, and dizziness.",
    "Severe one-sided throbbing headache with nausea and extreme sensitivity to bright light.",
    "Shortness of breath, persistent cough, and mild chest tightness after climbing stairs.",
    "Burning sensation in upper abdomen, acid reflux after meals, and bloating."
  ];

  const handleSendMessage = async (text) => {
    // 1. Append user message to Redux store
    dispatch(addMessage({ sender: 'user', text }));
    dispatch(setLoading(true));
    dispatch(setError(null));

    // 2. Prepare conversation history format
    const historyPayload = messages.map((m) => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text
    }));

    try {
      // 3. Call backend POST /api/chat
      const response = await api.post('/chat', {
        message: text,
        history: historyPayload
      });

      // 4. Append AI reply to Redux store
      dispatch(addMessage({
        sender: 'ai',
        text: response.data.reply
      }));
    } catch (err) {
      console.error('[Chat Error]', err);
      const msg = err.response?.data?.error || err.message || 'Unable to connect to AI assistant. Please verify services.';
      dispatch(setError(msg));
      dispatch(addMessage({
        sender: 'ai',
        text: `⚠️ Error: ${msg}`
      }));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Convert conversation into full official clinical risk report
  const handleSynthesizeReport = async () => {
    const userMessages = messages.filter((m) => m.sender === 'user');
    if (userMessages.length === 0) return;

    setAnalyzingReport(true);
    dispatch(setError(null));

    const historyPayload = messages.map((m) => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text
    }));

    try {
      const response = await api.post('/chat/analyze', {
        history: historyPayload
      });

      // Save prediction to Redux result store
      dispatch(setResult({
        result: response.data.result,
        source: 'chat',
        inputSummary: response.data.inputSummary,
        id: response.data.id
      }));

      // Navigate to formal result page
      navigate('/result');
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to synthesize risk assessment from conversation.';
      dispatch(setError(msg));
    } finally {
      setAnalyzingReport(false);
    }
  };

  const hasUserMessages = messages.some((m) => m.sender === 'user');

  return (
    <div className="page-container chat-page">
      <div className="page-header">
        <span className="page-kicker">// CONVERSATIONAL RISK CONSULTATION</span>
        <h1 className="page-title">Interactive AI Health Consultation</h1>
        <p className="page-subtitle">
          Describe your symptoms conversationally. Powered by Groq LLaMA and RAG clinical literature,
          the AI analyzes symptom severity, outlines associated risk levels, and guides you on next steps.
        </p>
      </div>

      <div className="clinical-notice-banner">
        <span className="clinical-notice-icon">💬</span>
        <div>
          <strong>Real-Time Clinical Interaction:</strong> You can ask questions, provide clarifications, and at any point click
          <strong>"Generate Risk Report"</strong> to generate a comprehensive prediction and risk score.
        </div>
      </div>

      {error && (
        <div className="auth-alert auth-alert-error mb-3" style={{ marginBottom: '1.5rem' }}>
          <div className="auth-alert-content">{error}</div>
        </div>
      )}

      <div className="chat-layout">
        {/* Left Sidebar: Quick Prompts & Action */}
        <aside className="chat-sidebar">
          <div>
            <div className="chat-sidebar-title">Quick Symptom Starters</div>
            <p style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', marginBottom: '1rem' }}>
              Click any sample symptom description to initiate the consultation:
            </p>

            <div className="prompt-chips-list">
              {samplePrompts.map((promptText, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="prompt-chip-btn"
                  onClick={() => handleSendMessage(promptText)}
                  disabled={loading || analyzingReport}
                >
                  {promptText}
                </button>
              ))}
            </div>
          </div>

          <div className="chat-synthesize-card">
            <h4 className="chat-synthesize-title">Ready for Full Report?</h4>
            <p className="chat-synthesize-desc">
              Convert this chat conversation into an official risk analysis with confidence rankings.
            </p>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              style={{ width: '100%' }}
              onClick={handleSynthesizeReport}
              disabled={!hasUserMessages || analyzingReport || loading}
            >
              {analyzingReport ? 'Synthesizing Report...' : '⚡ Generate Risk Report'}
            </button>
          </div>
        </aside>

        {/* Right Main Console: Chat Box */}
        <main>
          <ChatBox
            messages={messages}
            loading={loading}
            onSendMessage={handleSendMessage}
            onClearChat={() => dispatch(clearChat())}
            onSynthesizeReport={handleSynthesizeReport}
            analyzingReport={analyzingReport}
          />
        </main>
      </div>
    </div>
  );
}

export default Chat;
