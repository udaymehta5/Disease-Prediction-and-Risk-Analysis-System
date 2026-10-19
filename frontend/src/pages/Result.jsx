import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RiskCard from '../components/RiskCard';

function Result() {
  const navigate = useNavigate();
  const { currentResult, source, inputSummary } = useSelector((state) => state.result);

  if (!currentResult) {
    return (
      <div className="page-container text-center">
        <div className="empty-state-card">
          <h2>No Assessment Result Found</h2>
          <p>Please perform an analysis via File Upload, AI Chat, or the Symptom Quiz.</p>
          <button onClick={() => navigate('/')} className="btn btn-primary mt-4">
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const { predictions, risk, disclaimer } = currentResult;

  const getConfidenceClass = (conf) => {
    switch (conf?.toLowerCase()) {
      case 'high':
        return 'confidence-badge conf-high';
      case 'medium':
        return 'confidence-badge conf-medium';
      case 'low':
      default:
        return 'confidence-badge conf-low';
    }
  };

  return (
    <div className="page-container result-page">
      <div className="result-header">
        <div>
          <h2>Assessment Results</h2>
          {inputSummary && <p className="result-subtext">{inputSummary}</p>}
        </div>
        <div className="result-actions">
          <button onClick={() => window.print()} className="btn btn-outline btn-sm">
            🖨️ Print Report
          </button>
          <button onClick={() => navigate('/history')} className="btn btn-outline btn-sm">
            📜 View History
          </button>
        </div>
      </div>

      {/* Prominent Medical Disclaimer */}
      <div className="disclaimer-alert">
        <span className="disclaimer-icon">⚠️</span>
        <div className="disclaimer-text">
          <strong>Medical Disclaimer:</strong> {disclaimer || "This is an informational tool, NOT a medical diagnosis. Consult a qualified doctor."}
        </div>
      </div>

      {/* Top 3 Predicted Diseases */}
      <div className="section-block">
        <h3>Top Predicted Conditions</h3>
        <div className="predictions-list">
          {predictions && predictions.length > 0 ? (
            predictions.map((item, idx) => (
              <div key={idx} className="prediction-item">
                <div className="prediction-main">
                  <div className="prediction-title-row">
                    <span className="rank-indicator">#{idx + 1}</span>
                    <h4 className="disease-name">{item.disease}</h4>
                    <span className={getConfidenceClass(item.confidence)}>
                      {item.confidence} Confidence
                    </span>
                  </div>
                  <p className="prediction-reason">{item.reason}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="empty-note">No specific conditions identified.</p>
          )}
        </div>
      </div>

      {/* Risk Analysis Card */}
      <div className="section-block">
        <RiskCard risk={risk} />
      </div>

      {/* Next Steps Buttons */}
      <div className="result-footer-nav">
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Perform Another Assessment
        </button>
      </div>
    </div>
  );
}

export default Result;
