import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setResult } from '../store/resultSlice';
import api from '../services/api';

function History() {
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/history');
      setHistoryList(response.data.history || []);
    } catch (err) {
      const msg = err.response?.data?.error || 'Unable to load assessment history.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleViewResult = (item) => {
    // Parse result_json if it comes as a string or object
    const parsedResult = typeof item.result_json === 'string' 
      ? JSON.parse(item.result_json) 
      : item.result_json;

    dispatch(setResult({
      result: parsedResult,
      source: item.source,
      inputSummary: item.input_summary,
      id: item.id
    }));

    navigate('/result');
  };

  const getSourceIcon = (source) => {
    switch (source) {
      case 'upload': return '📄 File Upload';
      case 'chat': return '💬 AI Chat';
      case 'mcq': return '📋 MCQ Quiz';
      default: return '🩺 Assessment';
    }
  };

  const getRiskBadge = (resultJson) => {
    const riskLevel = resultJson?.risk?.level || 'Medium';
    let badgeClass = 'risk-badge risk-medium';
    if (riskLevel.toLowerCase() === 'high') badgeClass = 'risk-badge risk-high';
    if (riskLevel.toLowerCase() === 'low') badgeClass = 'risk-badge risk-low';

    return <span className={badgeClass}>{riskLevel.toUpperCase()} RISK</span>;
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="page-container history-page">
      <div className="page-header">
        <h2>Your Assessment History</h2>
        <p className="page-subtitle">
          Review all previous disease risk evaluations, uploaded reports, and symptom assessments.
        </p>
      </div>

      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
          <button onClick={fetchHistory} className="btn btn-outline btn-sm ml-2">Retry</button>
        </div>
      )}

      {loading ? (
        <div className="card placeholder-card">
          <span className="spinner"></span>
          <p className="mt-2">Loading your historical records...</p>
        </div>
      ) : historyList.length === 0 ? (
        <div className="empty-state-card">
          <div className="empty-icon">📂</div>
          <h3>No Assessments Found</h3>
          <p>You haven't conducted any health analyses yet.</p>
          <button onClick={() => navigate('/')} className="btn btn-primary mt-3">
            Conduct Your First Assessment
          </button>
        </div>
      ) : (
        <div className="history-list">
          {historyList.map((item) => {
            const parsed = typeof item.result_json === 'string' 
              ? JSON.parse(item.result_json) 
              : item.result_json;
            const topPrediction = parsed?.predictions?.[0];

            return (
              <div key={item.id} className="history-item-card">
                <div className="history-item-main">
                  <div className="history-meta-row">
                    <span className="history-source-tag">{getSourceIcon(item.source)}</span>
                    <span className="history-date">{formatDate(item.created_at)}</span>
                  </div>
                  <h4 className="history-disease-title">
                    {topPrediction?.disease || 'Inconclusive Assessment'}
                  </h4>
                  <p className="history-summary-text">{item.input_summary}</p>
                </div>

                <div className="history-item-side">
                  {getRiskBadge(parsed)}
                  <button 
                    onClick={() => handleViewResult(item)} 
                    className="btn btn-outline btn-sm"
                  >
                    View Report ➔
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default History;
