import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage, setLoading, setError, clearChat } from '../store/chatSlice';
import ChatBox from '../components/ChatBox';
import api from '../services/api';

function Chat() {
  const dispatch = useDispatch();
  const { messages, loading, error } = useSelector((state) => state.chat);

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
      const msg = err.response?.data?.error || 'Unable to connect to AI assistant. Please try again.';
      dispatch(setError(msg));
      dispatch(addMessage({
        sender: 'ai',
        text: `⚠️ Error: ${msg}`
      }));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="page-container chat-page">
      <div className="page-header">
        <h2>Interactive Health Consultation</h2>
        <p className="page-subtitle">
          Describe your symptoms conversationally. The AI cross-references our RAG clinical knowledge base
          to suggest likely conditions and ask relevant follow-up questions.
        </p>
      </div>

      <div className="disclaimer-alert mb-4">
        <span className="disclaimer-icon">ℹ️</span>
        <div className="disclaimer-text">
          <strong>Notice:</strong> This conversation is an informational triage aid. In the event of chest pain,
          shortness of breath, or emergency symptoms, contact local emergency services immediately.
        </div>
      </div>

      <ChatBox
        messages={messages}
        loading={loading}
        onSendMessage={handleSendMessage}
        onClearChat={() => dispatch(clearChat())}
      />
    </div>
  );
}

export default Chat;
