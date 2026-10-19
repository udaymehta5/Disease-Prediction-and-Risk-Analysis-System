import React, { useState, useEffect, useRef } from 'react';

function ChatBox({ messages, loading, onSendMessage, onClearChat }) {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat feed when a new message is appended
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim() || loading) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-header">
        <div className="chatbox-status">
          <span className="status-dot"></span>
          <span>Health AI Assistant (Online)</span>
        </div>
        <button onClick={onClearChat} className="btn btn-outline btn-sm" title="Reset chat history">
          Clear Chat
        </button>
      </div>

      <div className="chatbox-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message-bubble-row ${msg.sender === 'user' ? 'message-user' : 'message-ai'}`}
          >
            <div className="avatar">{msg.sender === 'user' ? '👤' : '🩺'}</div>
            <div className="bubble-content">
              <div className="message-text">{msg.text}</div>
              <span className="message-timestamp">{msg.timestamp}</span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="message-bubble-row message-ai">
            <div className="avatar">🩺</div>
            <div className="bubble-content bubble-typing">
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="chatbox-input-form">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Describe your symptoms (e.g., 'I have had a throbbing headache and nausea since yesterday')..."
          disabled={loading}
        />
        <button type="submit" className="btn btn-primary" disabled={!inputText.trim() || loading}>
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatBox;
