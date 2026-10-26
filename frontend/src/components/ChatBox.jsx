import React, { useState, useEffect, useRef } from 'react';

function ChatBox({
  messages,
  loading,
  onSendMessage,
  onClearChat,
  onSynthesizeReport,
  analyzingReport,
  initialPrompt,
  onInitialPromptConsumed
}) {
  const [inputText, setInputText] = useState('');
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);
  const typingIntervalRef = useRef(null);
  const autoTypeTimerRef = useRef(null);

  // Auto-type typewriter effect into input when initialPrompt is received, then auto-send to AI doctor
  useEffect(() => {
    if (initialPrompt) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
      const fullText = initialPrompt;
      let charIdx = 0;
      setInputText('');

      // Fast, smooth typing animation so user sees it actively typing out into the field
      const step = Math.max(2, Math.floor(fullText.length / 28));

      typingIntervalRef.current = setInterval(() => {
        charIdx += step;
        if (charIdx >= fullText.length) {
          setInputText(fullText);
          clearInterval(typingIntervalRef.current);
          if (onInitialPromptConsumed) {
            onInitialPromptConsumed();
          }
          // After a natural pause (~400ms) to see the typed prompt, automatically transmit to the AI
          autoTypeTimerRef.current = setTimeout(() => {
            onSendMessage(fullText);
            setInputText('');
          }, 400);
        } else {
          setInputText(fullText.slice(0, charIdx));
        }
      }, 15);

      return () => {
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        if (autoTypeTimerRef.current) clearTimeout(autoTypeTimerRef.current);
      };
    }
  }, [initialPrompt]);

  // Auto-scroll strictly inside the chat messages box (never scrolls outer page)
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, loading]);

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    if (autoTypeTimerRef.current) clearTimeout(autoTypeTimerRef.current);
    if (!inputText.trim() || loading) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      handleSubmit(e);
    }
  };


  // Helper to format AI message text (cleans markdown hashtags, renders headings, bolding, and bullets)
  const renderFormattedMessage = (text) => {
    if (!text) return null;

    // Split text into lines to preserve clean structure
    const lines = text.split('\n');
    return lines.map((rawLine, idx) => {
      let line = rawLine;

      // Detect and strip markdown hashtags (e.g., #, ##, ###, ####)
      const headingMatch = line.match(/^#{1,6}\s*(.+)$/);
      const isHeading = Boolean(headingMatch);
      if (isHeading) {
        line = headingMatch[1].trim();
      }

      // Detect bullet points (* or - or •)
      const bulletMatch = !isHeading && line.match(/^[\*\-]\s+(.+)$/);
      const isBullet = Boolean(bulletMatch);
      if (isBullet) {
        line = bulletMatch[1].trim();
      }

      // Format lines with **bold**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const formattedContent = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      if (isHeading) {
        return (
          <div key={idx} className="chat-heading-row">
            <span className="chat-heading-text">{formattedContent}</span>
          </div>
        );
      }

      if (isBullet) {
        return (
          <div key={idx} className="chat-bullet-row">
            <span className="chat-bullet-icon">●</span>
            <span className="chat-bullet-text">{formattedContent}</span>
          </div>
        );
      }

      if (!line.trim()) {
        return <div key={idx} className="chat-spacer-line" />;
      }

      return (
        <div key={idx} className="chat-text-line">
          {formattedContent}
        </div>
      );
    });
  };

  const hasUserMessages = messages.some((m) => m.sender === 'user');

  return (
    <div className="chatbox-container">
      {/* Console Top Header */}
      <div className="chatbox-header">
        <div className="chatbox-status">
          <span className="chat-status-pulse" />
          <span>Clinical AI Consultant (Groq LLaMA 3.3 • Online)</span>
        </div>
        <div className="chatbox-header-actions">
          {hasUserMessages && (
            <button
              type="button"
              onClick={onSynthesizeReport}
              className="btn btn-outline btn-sm"
              disabled={analyzingReport || loading}
              style={{ backgroundColor: 'var(--green-soft)', borderColor: 'var(--ink)' }}
              title="Generate comprehensive risk stratification from this conversation"
            >
              {analyzingReport ? (
                <>
                  <span className="auth-spinner" style={{ width: '12px', height: '12px', marginRight: '4px' }} />
                  Analyzing Risk...
                </>
              ) : (
                '⚡ Generate Risk Report'
              )}
            </button>
          )}
          <button
            type="button"
            onClick={onClearChat}
            className="btn btn-outline btn-sm"
            title="Reset conversation"
          >
            Clear Chat
          </button>
        </div>
      </div>

      {/* Message Feed */}
      <div className="chatbox-messages" ref={messagesContainerRef}>
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem 1.5rem', color: 'var(--ink-muted)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>💬</div>
            <h4 style={{ fontFamily: 'Fraunces, serif', marginBottom: '0.5rem', color: 'var(--ink)' }}>
              Start Your Medical Consultation
            </h4>
            <p style={{ fontSize: '0.92rem', maxWidth: '460px', margin: '0 auto' }}>
              Describe your symptoms, how long you've experienced them, and any related factors.
              The AI will analyze potential conditions and estimate your associated risk level.
            </p>
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={msg.id || index}
            className={`message-bubble-row ${msg.sender === 'user' ? 'message-user' : 'message-ai'}`}
          >
            <div className="message-avatar">
              {msg.sender === 'user' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 8L9 4l-3 8H2" />
                </svg>
              )}
            </div>
            <div className="bubble-content">
              <div className="message-text">{renderFormattedMessage(msg.text)}</div>
              <span className="message-timestamp">
                {msg.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="message-bubble-row message-ai">
            <div className="message-avatar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 8L9 4l-3 8H2" />
              </svg>
            </div>
            <div className="bubble-content bubble-typing">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          </div>
        )}
      </div>

      {/* Input Row */}
      <form onSubmit={handleSubmit} className="chatbox-input-form">
        <input
          ref={inputRef}
          type="text"
          className="chatbox-input-field"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe your symptoms (e.g., 'I have extreme thirst, fatigue, and blurry vision for 3 weeks')..."
          disabled={loading || analyzingReport}
        />
        <button
          type="submit"
          className="btn btn-primary"
          style={{ padding: '0.85rem 1.4rem' }}
          disabled={!inputText.trim() || loading || analyzingReport}
        >
          <span>Send</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </form>
    </div>
  );
}

export default ChatBox;
