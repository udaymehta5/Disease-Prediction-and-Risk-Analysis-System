import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setResult } from '../store/resultSlice';
import FileDropzone from '../components/FileDropzone';
import api from '../services/api';

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      const message = err.response?.data?.error || 'Failed to analyze uploaded file. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container upload-page">
      <div className="page-header">
        <h2>Upload Medical Report</h2>
        <p className="page-subtitle">
          Upload blood panels, lab tests, or physician notes in CSV, PDF, or TXT format.
          Our RAG pipeline extracts biomarkers and cross-references clinical knowledge.
        </p>
      </div>

      <div className="upload-card">
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
            disabled={!selectedFile || loading}
          >
            {loading ? (
              <span className="loading-spinner-row">
                <span className="spinner"></span> Analyzing Report with RAG & Groq LLM...
              </span>
            ) : (
              'Analyze Report & Predict Risk'
            )}
          </button>
        </div>

        <div className="security-notice">
          🔒 <strong>Privacy Assurance:</strong> Your uploaded medical files are processed securely in memory and
          deleted immediately after clinical parameter extraction.
        </div>
      </div>
    </div>
  );
}

export default Upload;
