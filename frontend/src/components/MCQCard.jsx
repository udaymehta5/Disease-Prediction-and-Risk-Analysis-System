import React from 'react';

function MCQCard({
  step,
  totalSteps,
  question,
  options,
  selectedOption,
  onSelectOption,
  onNext,
  loading,
  isLastStep
}) {
  const progressPercent = Math.min(Math.round(((step - 1) / totalSteps) * 100), 100);

  return (
    <div className="mcq-card">
      {/* Progress header */}
      <div className="mcq-progress-header">
        <div className="mcq-progress-top-row">
          <div className="mcq-step-badge">
            <span style={{ fontSize: '1rem' }}>📋</span>
            <span>Question {step} of {totalSteps}</span>
          </div>
          <span className="mcq-percent-label">{progressPercent}% Completed</span>
        </div>
        <div className="mcq-progress-track">
          <div
            className="mcq-progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question prompt */}
      <h3 className="mcq-question-text">{question}</h3>

      {/* Options radio list */}
      <div className="mcq-options-list">
        {options.map((option, idx) => {
          const isSelected = selectedOption === option;
          return (
            <div
              key={idx}
              className={`mcq-option-label ${isSelected ? 'selected' : ''}`}
              onClick={() => !loading && onSelectOption(option)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  if (!loading) onSelectOption(option);
                }
              }}
            >
              <span className="option-letter-indicator">{String.fromCharCode(65 + idx)}</span>
              <span className="option-content-text">{option}</span>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="mcq-actions-row">
        <button
          onClick={onNext}
          className="btn btn-primary"
          style={{ padding: '0.85rem 1.6rem', fontSize: '0.98rem' }}
          disabled={!selectedOption || loading}
        >
          {loading ? (
            <>
              <span className="auth-spinner" style={{ width: '16px', height: '16px', marginRight: '6px' }} />
              <span>Analyzing response...</span>
            </>
          ) : isLastStep ? (
            <>
              <span>Complete Assessment & View Risk Report</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </>
          ) : (
            <>
              <span>Next Question</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default MCQCard;
