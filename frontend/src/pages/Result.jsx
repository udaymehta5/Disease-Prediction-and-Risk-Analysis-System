import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RiskCard from '../components/RiskCard';
import './Assessments.css';

function Result() {
  const navigate = useNavigate();
  const { currentResult, source, inputSummary } = useSelector((state) => state.result);

  if (!currentResult) {
    return (
      <div className="page-container text-center" style={{ maxWidth: '640px' }}>
        <div className="empty-state-card">
          <div className="empty-state-icon">📋</div>
          <h2>No Assessment Result Found</h2>
          <p>Please perform a health analysis via Lab Report Upload, AI Chat, or the Symptom Quiz.</p>
          <button onClick={() => navigate('/')} className="btn btn-primary mt-4">
            Go to Assessments Dashboard
          </button>
        </div>
      </div>
    );
  }

  const { predictions, risk, disclaimer } = currentResult;

  const getConfidencePill = (conf) => {
    const c = (conf || 'Medium').toLowerCase();
    return <span className={`confidence-pill ${c}`}>{conf} Confidence</span>;
  };

  const getSourceBadge = () => {
    switch (source) {
      case 'upload': return '📄 Lab Report Extraction';
      case 'chat': return '💬 AI Consultation Transcript';
      case 'mcq': return '📋 Adaptive Symptom Quiz';
      default: return '🩺 Clinical Evaluation';
    }
  };

  return (
    <div className="page-container result-page">
      <div className="result-header-row">
        <div>
          <span className="page-kicker">// CLINICAL SYNTHESIS REPORT</span>
          <h1 className="page-title" style={{ marginBottom: '0.35rem' }}>Diagnostic Risk Stratification</h1>
          <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <span className="history-source-badge">{getSourceBadge()}</span>
            {inputSummary && (
              <span style={{ fontSize: '0.85rem', color: 'var(--ink-muted)' }}>
                • {inputSummary}
              </span>
            )}
          </div>
        </div>

        <div className="result-actions-group">
          <button onClick={() => window.print()} className="btn btn-outline btn-sm">
            🖨️ Print Clinical Summary
          </button>
          <button onClick={() => navigate('/history')} className="btn btn-outline btn-sm">
            📜 Historical Records
          </button>
        </div>
      </div>

      {/* Prominent Medical Disclaimer */}
      <div className="clinical-notice-banner">
        <span className="clinical-notice-icon">⚠️</span>
        <div>
          <strong>Medical Notice:</strong> {disclaimer || "Vita Signal provides clinical decision support and risk estimates. Always consult a licensed medical provider for diagnostic verification."}
        </div>
      </div>

      {/* Top 3 Predicted Diseases */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.45rem', marginBottom: '1rem' }}>
          Condition Differential & Predicted Findings
        </h3>
        <div className="predictions-container">
          {predictions && predictions.length > 0 ? (
            predictions.map((item, idx) => (
              <div key={idx} className="prediction-item-card">
                <div className="prediction-top-row">
                  <span className="prediction-rank-badge">#{idx + 1} PROBABILITY</span>
                  <h4 className="prediction-disease-title">{item.disease}</h4>
                  {getConfidencePill(item.confidence)}
                </div>
                <p className="prediction-reason-text">{item.reason}</p>
              </div>
            ))
          ) : (
            <p style={{ color: 'var(--ink-muted)' }}>No specific condition patterns matched.</p>
          )}
        </div>
      </div>

      {/* Multi-Condition Risk Card */}
      <div style={{ marginBottom: '2.5rem' }}>
        <RiskCard risk={risk} />
      </div>

      {/* Next Steps Footer */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'flex-start', paddingTop: '1rem', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
        <button onClick={() => navigate('/upload')} className="btn btn-primary">
          📄 Ingest Another Lab Report
        </button>
        <button onClick={() => navigate('/chat')} className="btn btn-outline">
          💬 Follow Up with AI Chat
        </button>
        <button onClick={() => navigate('/')} className="btn btn-outline">
          Return to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Result;
