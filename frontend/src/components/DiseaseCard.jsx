import React, { useState } from 'react';
import Card from './Card';
import './DiseaseCard.css';

function DiseaseCard({ disease }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      className={`disease-card ${expanded ? 'is-expanded' : ''}`}
      onClick={() => setExpanded(!expanded)}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setExpanded(!expanded);
        }
      }}
    >
      <div className="disease-card-header">
        <div className="disease-meta">
          <span className="disease-category-tag">{disease.category}</span>
          <h3 className="disease-name">{disease.name}</h3>
        </div>
        <button
          type="button"
          className="disease-expand-btn"
          aria-label={expanded ? 'Collapse details' : 'Expand details'}
          tabIndex={-1}
        >
          {expanded ? '−' : '+'}
        </button>
      </div>

      <p className="disease-short-desc">{disease.description}</p>

      <div className="disease-symptoms-section">
        <span className="section-label">Common signs:</span>
        <ul className="symptoms-pill-list">
          {disease.symptoms.map((symptom, idx) => (
            <li key={idx} className="symptom-pill">{symptom}</li>
          ))}
        </ul>
      </div>

      <div className="disease-risk-note">
        <span className="section-label">Risk note:</span>
        <p>{disease.riskFactors}</p>
      </div>

      {/* Accordion inline expansion */}
      {expanded && (
        <div className="disease-expanded-drawer">
          <div className="expanded-divider"></div>
          
          <div className="expanded-block">
            <h4>Recommended precautions</h4>
            <ul className="precautions-bullet-list">
              {disease.precautions.map((item, idx) => (
                <li key={idx}>
                  <span className="bullet-indicator">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="expanded-block doc-warning-block">
            <h4>When to see a physician</h4>
            <p>{disease.whenToSeeDoctor}</p>
          </div>
        </div>
      )}

      <div className="card-footer-prompt">
        <span>{expanded ? 'Click to collapse' : 'Click to view precautions & guidance ➔'}</span>
      </div>
    </Card>
  );
}

export default DiseaseCard;
