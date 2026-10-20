import React from 'react';
import Card from './Card';
import './RiskCard.css';

function RiskCard({ risk, isSample = false }) {
  if (!risk) return null;

  const level = (risk.level || 'Medium').toLowerCase();
  const factors = risk.factors || [];
  const precautions = risk.precautions || [];

  return (
    <Card className="vita-risk-card">
      <div className="risk-card-top-row">
        <div>
          {isSample && <span className="sample-pill mono-num">Sample Output</span>}
          <h3 className="risk-card-title">Risk Assessment</h3>
        </div>
        <div className={`risk-level-badge level-${level}`}>
          {level.toUpperCase()} RISK
        </div>
      </div>

      {/* 3-Segment Visual Risk Meter made with simple CSS blocks */}
      <div className="risk-meter-container" aria-label={`Risk level meter: ${level}`}>
        <div className="risk-meter-track">
          <div className={`meter-segment meter-low ${level === 'low' ? 'active' : ''}`}>
            <span>Low</span>
          </div>
          <div className={`meter-segment meter-med ${level === 'medium' ? 'active' : ''}`}>
            <span>Medium</span>
          </div>
          <div className={`meter-segment meter-high ${level === 'high' ? 'active' : ''}`}>
            <span>High</span>
          </div>
        </div>
      </div>

      <div className="risk-grid-cols">
        {/* Identified Risk Factors */}
        <div className="risk-col">
          <h4 className="risk-col-heading">
            <span className="col-icon">⚠️</span> Key Risk Factors
          </h4>
          {factors.length > 0 ? (
            <ul className="risk-item-list">
              {factors.map((factor, idx) => (
                <li key={idx}>
                  <span className="bullet-sym">•</span>
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-subtle-text">No critical risk indicators detected.</p>
          )}
        </div>

        {/* Recommended Precautions */}
        <div className="risk-col">
          <h4 className="risk-col-heading">
            <span className="col-icon">🛡️</span> Actionable Precautions
          </h4>
          {precautions.length > 0 ? (
            <ul className="risk-item-list">
              {precautions.map((prec, idx) => (
                <li key={idx}>
                  <span className="bullet-sym">✓</span>
                  <span>{prec}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-subtle-text">Follow routine health maintenance.</p>
          )}
        </div>
      </div>
    </Card>
  );
}

export default RiskCard;
