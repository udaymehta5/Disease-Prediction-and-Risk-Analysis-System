import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setResult } from '../store/resultSlice';
import api from '../services/api';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [recentResults, setRecentResults] = useState([]);
  const [loadingRecent, setLoadingRecent] = useState(false);

  // Load recent results for authenticated user
  useEffect(() => {
    if (isAuthenticated) {
      fetchRecentResults();
    }
  }, [isAuthenticated]);

  const fetchRecentResults = async () => {
    setLoadingRecent(true);
    try {
      const response = await api.get('/history');
      setRecentResults((response.data.history || []).slice(0, 3));
    } catch (err) {
      console.error('Failed to load recent results:', err);
    } finally {
      setLoadingRecent(false);
    }
  };

  const handleCardClick = (path) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      navigate('/login', { state: { from: { pathname: path } } });
    }
  };

  const handleViewResult = (item) => {
    const parsed = typeof item.result_json === 'string'
      ? JSON.parse(item.result_json)
      : item.result_json;

    dispatch(setResult({
      result: parsed,
      source: item.source,
      inputSummary: item.input_summary,
      id: item.id
    }));

    navigate('/result');
  };

  const getSourceIcon = (source) => {
    switch (source) {
      case 'upload': return '📄 Report Upload';
      case 'chat': return '💬 AI Consultation';
      case 'mcq': return '📋 Symptom Quiz';
      default: return '🩺 Assessment';
    }
  };

  return (
    <div className="page-container dashboard-page">
      <header className="hero-section">
        <h1>Disease Prediction & Risk Analysis</h1>
        <p className="hero-subtitle">
          Early health risk assessment powered by RAG medical knowledge bases, clinical parameter extraction, and Groq LLM inference.
        </p>
        <div className="disclaimer-banner">
          ⚠️ <strong>Medical Disclaimer:</strong> This application is an educational and informational tool,
          <strong> NOT a medical diagnosis</strong>. Always consult a qualified doctor for any medical decisions.
        </div>
      </header>

      {/* 3 Main Action Cards */}
      <section className="features-grid">
        {/* Card 1: File Upload */}
        <div 
          className="feature-card" 
          onClick={() => handleCardClick('/upload')}
          role="button"
          tabIndex={0}
        >
          <div className="card-icon">📄</div>
          <h3>Upload Medical Report</h3>
          <p>
            Upload blood panels, lab tests, or physician notes (CSV, PDF, TXT).
            Our RAG system extracts biomarker values and predicts risk.
          </p>
          <button className="btn btn-primary card-action-btn">
            {isAuthenticated ? 'Upload File' : 'Sign in & Upload'}
          </button>
        </div>

        {/* Card 2: AI Chat */}
        <div 
          className="feature-card" 
          onClick={() => handleCardClick('/chat')}
          role="button"
          tabIndex={0}
        >
          <div className="card-icon">💬</div>
          <h3>Chat with Health AI</h3>
          <p>
            Describe how you are feeling in natural conversation. The AI engages in consultative
            dialogue, cross-referencing your symptoms with clinical records.
          </p>
          <button className="btn btn-primary card-action-btn">
            {isAuthenticated ? 'Start Chat' : 'Sign in & Chat'}
          </button>
        </div>

        {/* Card 3: MCQ Quiz */}
        <div 
          className="feature-card" 
          onClick={() => handleCardClick('/mcq')}
          role="button"
          tabIndex={0}
        >
          <div className="card-icon">📋</div>
          <h3>Symptom Quiz (MCQ)</h3>
          <p>
            Answer 8 to 10 dynamically generated multiple-choice symptom questions.
            The AI adapts its questions according to your previous answers.
          </p>
          <button className="btn btn-primary card-action-btn">
            {isAuthenticated ? 'Take Quiz' : 'Sign in & Quiz'}
          </button>
        </div>
      </section>

      {/* Recent Activity for Logged-In User */}
      {isAuthenticated && (
        <section className="recent-activity-section">
          <div className="section-header">
            <div>
              <h2>Recent Assessments</h2>
              <p className="text-muted">Welcome back, {user?.name || 'User'}! Review your recent health evaluations.</p>
            </div>
            <button onClick={() => navigate('/history')} className="btn btn-outline btn-sm">
              View All History ➔
            </button>
          </div>

          {loadingRecent ? (
            <p className="loading-text">Loading recent evaluations...</p>
          ) : recentResults.length > 0 ? (
            <div className="recent-grid">
              {recentResults.map((item) => {
                const parsed = typeof item.result_json === 'string'
                  ? JSON.parse(item.result_json)
                  : item.result_json;
                const topPrediction = parsed?.predictions?.[0];
                const riskLevel = parsed?.risk?.level || 'Medium';

                return (
                  <div key={item.id} className="recent-card">
                    <div className="recent-card-top">
                      <span className="recent-source">{getSourceIcon(item.source)}</span>
                      <span className={`risk-badge risk-${riskLevel.toLowerCase()}`}>
                        {riskLevel} Risk
                      </span>
                    </div>
                    <h4>{topPrediction?.disease || 'Assessment Result'}</h4>
                    <p className="recent-summary">{item.input_summary}</p>
                    <button
                      onClick={() => handleViewResult(item)}
                      className="btn btn-outline btn-sm btn-block mt-2"
                    >
                      View Report
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="empty-recent-note">
              No previous assessments yet. Choose an option above to conduct your first evaluation!
            </p>
          )}
        </section>
      )}
    </div>
  );
}

export default Dashboard;
