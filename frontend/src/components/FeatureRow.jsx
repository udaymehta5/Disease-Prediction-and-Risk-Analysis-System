import React from 'react';
import Button from './Button';
import './FeatureRow.css';

function FeatureRow({
  tag,            // e.g. "Method A"
  title,          // e.g. "Upload a lab report or document"
  description,    // 2-3 lines of plain explanation
  details = [],   // bullet points
  actionText,     // "Try upload"
  onAction,       // click handler that checks auth
  reversed = false,
  illustration    // JSX illustration component
}) {
  return (
    <div className={`feature-row ${reversed ? 'feature-row-reversed' : ''}`}>
      <div className="feature-text-col">
        <span className="feature-tag mono-num">{tag}</span>
        <h3 className="feature-title">{title}</h3>
        <p className="feature-desc">{description}</p>

        {details.length > 0 && (
          <ul className="feature-bullets">
            {details.map((item, idx) => (
              <li key={idx}>
                <span className="bullet-dash">—</span> {item}
              </li>
            ))}
          </ul>
        )}

        <div className="feature-btn-row">
          <Button variant="filled" onClick={onAction}>
            {actionText} ➔
          </Button>
        </div>
      </div>

      <div className="feature-visual-col">
        <div className="illustration-wrapper">
          {illustration}
        </div>
      </div>
    </div>
  );
}

export default FeatureRow;
