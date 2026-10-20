import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setResult } from '../store/resultSlice';
import FileDropzone from '../components/FileDropzone';
import api from '../services/api';
import './Assessments.css';

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Load sample medical CSV report for instant 1-click client testing
  const handleLoadSampleReport = () => {
    const sampleCsvContent = `Biomarker,Result,Reference_Range,Status\nFasting Glucose,148,70-99 mg/dL,High\nHbA1c,7.2,4.0-5.6 %,High\nBlood Pressure Systolic,138,<120 mmHg,Elevated\nBlood Pressure Diastolic,86,<80 mmHg,Elevated\nTotal Cholesterol,228,<200 mg/dL,Borderline High\nTriglycerides,195,<150 mg/dL,High\nHDL Cholesterol,38,>40 mg/dL,Low\nPatient Notes: Patient reports persistent fatigue, increased thirst (polydipsia), and nocturia for the past 6 weeks.`;
    
    const file = new File([sampleCsvContent], 'sample_lab_report.csv', { type: 'text/csv' });
    setSelectedFile(file);
    setError(null);
  };

  const handleUploadAndAnalyze = async () => {
    if (!selectedFile) {
      setError('Please select or drag a CSV, PDF, or TXT file first.');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Dispatch prediction result to Redux store
      dispatch(setResult({
        result: response.data.result,
        source: 'upload',
        inputSummary: response.data.inputSummary,
        id: response.data.id
      }));

      // Navigate to standardized Result view
      navigate('/result');
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to analyze uploaded file. Please verify ML service status.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container upload-page">
      <div className="page-header">
        <span className="page-kicker">// CLINICAL REPORT INGESTION</span>
        <h1 className="page-title">Upload Medical Lab Report</h1>
        <p className="page-subtitle">
          Upload comprehensive blood panels, diagnostic test sheets, or physician consultation notes.
          Our RAG pipeline extracts numerical biomarkers, flags anomalies, and cross-references clinical knowledge.
        </p>
      </div>

      <div className="clinical-notice-banner">
        <span className="clinical-notice-icon">🩺</span>
        <div>
          <strong>Clinical Decision Support Tool:</strong> Uploaded parameters are analyzed against established diagnostic thresholds.
          This evaluation helps identify potential risk trajectories before clinical consultation.
        </div>
      </div>

      <div className="upload-grid">
        {/* Left / Main Card: Dropzone and Actions */}
        <div className="upload-main-card">
          <div className="upload-steps-row">
            <div className={`upload-step-item ${selectedFile ? 'active' : ''}`}>
              <span className="step-num-bubble">1</span>
              <span>Select Lab File</span>
            </div>
            <div className={`upload-step-item ${loading ? 'active' : ''}`}>
              <span className="step-num-bubble">2</span>
              <span>AI Biomarker OCR</span>
            </div>
            <div className="upload-step-item">
              <span className="step-num-bubble">3</span>
              <span>Risk Synthesis</span>
            </div>
          </div>

          {/* Quick Sample Demo Loader */}
          <div className="sample-report-box">
            <div className="sample-report-text">
              <strong>Need sample data to test?</strong>
              Load our pre-configured clinical metabolic & lipid panel with one click.
            </div>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={handleLoadSampleReport}
            >
              ⚡ Load Sample Data
            </button>
          </div>

          <FileDropzone
            selectedFile={selectedFile}
            onFileSelected={(file) => {
              setSelectedFile(file);
              setError(null);
            }}
            error={error}
            clearError={() => setError(null)}
          />

          <div className="upload-actions">
            <button
              onClick={handleUploadAndAnalyze}
              className="btn btn-primary btn-block"
              style={{ padding: '0.95rem 1.5rem', fontSize: '1.02rem', width: '100%' }}
              disabled={!selectedFile || loading}
            >
              {loading ? (
                <>
                  <span className="auth-spinner" aria-hidden="true" style={{ width: '18px', height: '18px', marginRight: '0.6rem' }} />
                  <span>Extracting Biomarkers & Querying Medical Knowledge...</span>
                </>
              ) : (
                <>
                  <span>Analyze Report & Stratify Risk</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Panel: Clinical Guidance & Biomarkers */}
        <div className="upload-info-card">
          <h3 className="upload-info-title">Supported Biomarkers</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--ink-muted)', marginBottom: '1.25rem' }}>
            Our parser automatically detects and cross-references values for key diagnostic panels:
          </p>

          <div className="biomarker-chips-list">
            <span className="biomarker-chip">Fasting Glucose</span>
            <span className="biomarker-chip">HbA1c</span>
            <span className="biomarker-chip">Systolic / Diastolic BP</span>
            <span className="biomarker-chip">Total Cholesterol</span>
            <span className="biomarker-chip">HDL / LDL</span>
            <span className="biomarker-chip">Triglycerides</span>
            <span className="biomarker-chip">Serum Creatinine</span>
            <span className="biomarker-chip">Liver Enzymes (ALT/AST)</span>
          </div>

          <div className="security-trust-strip">
            🔒 <strong>Zero-Persistence Guarantee:</strong> Uploaded documents are parsed in temporary memory and purged immediately following parameter extraction.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upload;
