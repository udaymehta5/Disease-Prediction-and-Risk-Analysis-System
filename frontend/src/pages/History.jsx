import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setResult } from '../store/resultSlice';
import api from '../services/api';
import './Assessments.css';

function History() {
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'upload' | 'chat' | 'mcq'

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

  const getSourceDetails = (source) => {
    switch (source) {
      case 'upload':
        return { label: 'Lab Upload', icon: '📄' };
      case 'chat':
        return { label: 'AI Chat', icon: '💬' };
      case 'mcq':
        return { label: 'Symptom Quiz', icon: '📋' };
      default:
        return { label: 'Clinical Assessment', icon: '🩺' };
    }
  };

  const getRiskBadge = (resultJson) => {
    const riskLevel = resultJson?.risk?.level || 'Medium';
    const levelLower = riskLevel.toLowerCase();

    let badgeClass = 'risk-badge risk-medium';
    if (levelLower === 'high') badgeClass = 'risk-badge risk-high';
    if (levelLower === 'low') badgeClass = 'risk-badge risk-low';

    return <span className={badgeClass}>{riskLevel.toUpperCase()} RISK</span>;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Recently';
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filter list based on selected tab
  const filteredList = historyList.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.source === activeFilter;
  });

  return (
    <div className="page-container history-page">
      <div className="page-header">
        <span className="page-kicker">// LONGITUDINAL HEALTH RECORDS</span>
        <h1 className="page-title">Assessment & Screening History</h1>
        <p className="page-subtitle">
          Review your chronological evaluations across lab report extractions, conversational AI consultations,
          and adaptive questionnaires.
        </p>
      </div>

      {error && (
        <div className="auth-alert auth-alert-error" style={{ marginBottom: '1.5rem' }}>
          <div className="auth-alert-content">{error}</div>
          <button onClick={fetchHistory} className="btn btn-outline btn-sm ml-2">
            Retry
          </button>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="history-filter-tabs">
        <button
          type="button"
          className={`filter-tab-btn ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          All Assessments ({historyList.length})
        </button>
        <button
          type="button"
          className={`filter-tab-btn ${activeFilter === 'upload' ? 'active' : ''}`}
          onClick={() => setActiveFilter('upload')}
        >
          📄 Lab Uploads ({historyList.filter((i) => i.source === 'upload').length})
        </button>
        <button
          type="button"
          className={`filter-tab-btn ${activeFilter === 'chat' ? 'active' : ''}`}
          onClick={() => setActiveFilter('chat')}
        >
          💬 AI Consultations ({historyList.filter((i) => i.source === 'chat').length})
        </button>
        <button
          type="button"
          className={`filter-tab-btn ${activeFilter === 'mcq' ? 'active' : ''}`}
          onClick={() => setActiveFilter('mcq')}
        >
          📋 Quizzes ({historyList.filter((i) => i.source === 'mcq').length})
        </button>
      </div>

      {loading ? (
        <div className="empty-state-card">
          <div className="auth-spinner" style={{ width: '36px', height: '36px', margin: '0 auto 1rem' }} />
          <p style={{ fontWeight: 600 }}>Loading encrypted clinical history records...</p>
        </div>
      ) : filteredList.length === 0 ? (
        <div className="empty-state-card">
          <div className="empty-state-icon">📂</div>
          <h3>No Assessments Found</h3>
          <p>
            {activeFilter === 'all'
              ? "You haven't conducted any health analyses yet. Choose an assessment method below to begin."
              : `No ${activeFilter.toUpperCase()} assessments recorded yet.`}
          </p>
          <div className="empty-state-actions">
            <button onClick={() => navigate('/upload')} className="btn btn-primary">
              📄 Upload Report
            </button>
            <button onClick={() => navigate('/chat')} className="btn btn-outline">
              💬 Start AI Chat
            </button>
            <button onClick={() => navigate('/mcq')} className="btn btn-outline">
              📋 Take Symptom Quiz
            </button>
          </div>
        </div>
      ) : (
        <div className="history-list">
          {filteredList.map((item) => {
            const parsed = typeof item.result_json === 'string'
              ? JSON.parse(item.result_json)
              : item.result_json;
            const topPrediction = parsed?.predictions?.[0];
            const sourceInfo = getSourceDetails(item.source);

            return (
              <div key={item.id} className="history-item-card">
                <div style={{ flex: 1 }}>
                  <div className="history-meta-top">
                    <span className="history-source-badge">
                      {sourceInfo.icon} {sourceInfo.label}
                    </span>
                    <span className="history-date-stamp">{formatDate(item.created_at)}</span>
                  </div>
                  <h3 className="history-disease-heading">
                    {topPrediction?.disease || 'Clinical Screening Record'}
                  </h3>
                  <p className="history-summary-snippet">{item.input_summary}</p>
                </div>

                <div className="history-side-actions">
                  {getRiskBadge(parsed)}
                  <button
                    onClick={() => handleViewResult(item)}
                    className="btn btn-outline btn-sm"
                    style={{ whiteSpace: 'nowrap' }}
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
