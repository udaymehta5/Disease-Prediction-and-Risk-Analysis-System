import React from 'react';

function RiskCard({ risk }) {
  if (!risk) return null;

  const level = risk.level || 'Medium';
  const factors = risk.factors || [];
  const precautions = risk.precautions || [];

  // Determine badge styling based on risk level
  const getBadgeClass = (lvl) => {
    switch (lvl.toLowerCase()) {
      case 'high':
        return 'risk-badge risk-high';
      case 'medium':
        return 'risk-badge risk-medium';
      case 'low':
      default:
        return 'risk-badge risk-low';
    }
  };

  return (
    <div className="risk-card">
      <div className="risk-header">
        <h3>Risk Assessment</h3>
        <span className={getBadgeClass(level)}>
          {level.toUpperCase()} RISK
        </span>
      </div>

      <div className="risk-content-grid">
        {/* Identified Risk Factors */}
        <div className="risk-column">
          <h4>⚠️ Key Risk Factors</h4>
          {factors.length > 0 ? (
            <ul className="factors-list">
              {factors.map((factor, idx) => (
                <li key={idx}>{factor}</li>
              ))}
            </ul>
          ) : (
            <p className="empty-note">No critical risk factors identified.</p>
          )}
        </div>

        {/* Recommended Clinical Precautions */}
        <div className="risk-column">
          <h4>🛡️ Recommended Precautions</h4>
          {precautions.length > 0 ? (
            <ul className="precautions-list">
              {precautions.map((precaution, idx) => (
                <li key={idx}>{precaution}</li>
              ))}
            </ul>
          ) : (
            <p className="empty-note">Maintain healthy lifestyle and routine checkups.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default RiskCard;
