import React from 'react';
import './FaqItem.css';

function FaqItem({ question, answer }) {
  return (
    <details className="vita-faq-item">
      <summary className="faq-summary">
        <span className="faq-question-text">{question}</span>
        <span className="faq-toggle-icon" aria-hidden="true">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
      </summary>
      <div className="faq-content">
        <p>{answer}</p>
      </div>
    </details>
  );
}

export default FaqItem;
