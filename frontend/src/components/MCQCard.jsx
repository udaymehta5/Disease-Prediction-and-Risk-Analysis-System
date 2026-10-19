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
        <div className="mcq-step-badge">
          Question {step} of {totalSteps}
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
            <label
              key={idx}
              className={`mcq-option-label ${isSelected ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name="mcq-option"
                value={option}
                checked={isSelected}
                onChange={() => onSelectOption(option)}
                disabled={loading}
              />
              <span className="option-indicator">{String.fromCharCode(65 + idx)}</span>
              <span className="option-text">{option}</span>
            </label>
          );
        })}
      </div>

      {/* Actions */}
      <div className="mcq-actions">
        <button
          onClick={onNext}
          className="btn btn-primary"
          disabled={!selectedOption || loading}
        >
          {loading ? (
            'Processing...'
          ) : isLastStep ? (
            'Complete & View Prediction ➔'
          ) : (
            'Next Question ➔'
          )}
        </button>
      </div>
    </div>
  );
}

export default MCQCard;
