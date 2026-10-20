import React from 'react';
import Card from './Card';
import './StepItem.css';

function StepItem({ number, title, description, isLast = false }) {
  return (
    <div className={`step-item-wrapper ${isLast ? 'is-last' : ''}`}>
      <Card className="step-card">
        <div className="step-badge-row">
          <span className="step-badge">{number}</span>
          <span className="step-label">Step</span>
        </div>
        <h3 className="step-title">{title}</h3>
        <p className="step-description">{description}</p>
      </Card>
      {!isLast && <div className="step-connector" aria-hidden="true" />}
    </div>
  );
}

export default StepItem;
