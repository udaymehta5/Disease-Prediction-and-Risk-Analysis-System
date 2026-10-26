import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure, clearError } from '../store/authSlice';
import GoogleAuthButton from '../components/GoogleAuthButton';
import api from '../services/api';
import './Auth.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error } = useSelector((state) => state.auth);

  // Return to intended page or default to Dashboard
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInfoMessage('');
    dispatch(loginStart());

    try {
      const response = await api.post('/auth/login', { email, password });
      dispatch(loginSuccess(response.data));
      navigate(from, { replace: true });
    } catch (err) {
      console.error('[Login Error]', err);
      const message = err.response?.data?.error || err.userMessage || (err.message === 'Network Error' ? 'Cannot connect to backend server. Please make sure the backend is running on port 5000.' : err.message) || 'Login failed. Please verify your email and password.';
      dispatch(loginFailure(message));
    }
  };

  // Demo auto-fill convenience
  const handleQuickDemo = () => {
    setEmail('doctor@vitasignal.ai');
    setPassword('MedicalDemo2026!');
    setInfoMessage('Demo credentials filled. Click "Sign In" or edit credentials as needed.');
    dispatch(clearError());
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setInfoMessage('Password recovery instructions will be dispatched to your registered address upon request.');
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-split-layout">
        {/* Left Side: Clinical Brand Feature Showcase */}
        <aside className="auth-side-panel">
          <div>
            <div className="auth-brand-badge">
              <span className="auth-brand-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 8L9 4l-3 8H2" />
                </svg>
              </span>
              <span className="auth-brand-text">Vita Signal System</span>
            </div>

            <h2 className="auth-side-headline">
              Clinical Intelligence & Risk Stratification
            </h2>
            <p className="auth-side-desc">
              Cross-referencing RAG medical knowledge with multi-factor predictive models for evidence-based disease screening.
            </p>

            <div className="auth-feature-list">
              <div className="auth-feature-item">
                <div className="auth-feature-bullet">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <div className="auth-feature-title">Multi-Condition Screening</div>
                  <div className="auth-feature-sub">Evaluate diabetes, cardiovascular, hepatic, and renal risk factors.</div>
                </div>
              </div>

              <div className="auth-feature-item">
                <div className="auth-feature-bullet">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <div className="auth-feature-title">Lab Report OCR & Biomarkers</div>
                  <div className="auth-feature-sub">Direct ingestion of clinical PDF panels and structured test outputs.</div>
                </div>
              </div>

              <div className="auth-feature-item">
                <div className="auth-feature-bullet">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <div className="auth-feature-title">Encrypted Clinical Records</div>
                  <div className="auth-feature-sub">All patient metrics remain encrypted and locally verifiable.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="auth-trust-box">
            <p className="auth-trust-quote">
              "Actionable pre-diagnostic triage designed to augment clinical judgment, not replace it."
            </p>
            <div className="auth-trust-meta">
              <span className="auth-status-indicator">
                <span className="auth-status-dot" />
                Active v2.4 Model
              </span>
              <span className="text-muted" style={{ fontFamily: 'Space Mono, monospace' }}>TLS 1.3 SECURE</span>
            </div>
          </div>
        </aside>

        {/* Right Side: Sign In Form */}
        <div className="auth-form-panel">
          <div className="auth-form-header">
            <span className="auth-kicker">// CLINICAL AUTHENTICATION</span>
            <h1 className="auth-title">Sign In to Vita Signal</h1>
            <p className="auth-desc">Access your risk evaluations, consultation logs, and medical records.</p>
          </div>

          {/* Quick Demo Credentials Assistant */}
          <div className="auth-demo-banner">
            <span className="auth-demo-text">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              Quick Test: Fill sample clinical credentials
            </span>
            <button
              type="button"
              className="auth-demo-btn"
              onClick={handleQuickDemo}
              aria-label="Fill demo credentials"
            >
              Fill Demo
            </button>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="auth-alert auth-alert-error" role="alert">
              <svg className="auth-alert-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <div className="auth-alert-content">{error}</div>
              <button
                type="button"
                onClick={() => dispatch(clearError())}
                className="auth-alert-dismiss"
                aria-label="Dismiss alert"
              >
                ×
              </button>
            </div>
          )}

          {/* Info Banner */}
          {infoMessage && (
            <div className="auth-alert" style={{ backgroundColor: 'var(--green-soft)', borderColor: 'var(--ink)' }} role="status">
              <svg className="auth-alert-icon" style={{ color: 'var(--green)' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <div className="auth-alert-content">{infoMessage}</div>
              <button
                type="button"
                onClick={() => setInfoMessage('')}
                className="auth-alert-dismiss"
                aria-label="Dismiss info"
              >
                ×
              </button>
            </div>
          )}

          {/* Social Single Sign-On */}
          <div className="auth-social-box">
            <GoogleAuthButton redirectPath={from} />
            <div className="auth-social-divider">
              <span>Or sign in with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="auth-form-fields" noValidate>
            {/* Email Address */}
            <div className="auth-field-group">
              <label htmlFor="email" className="auth-field-label">
                Email Address
              </label>
              <div className="auth-input-wrapper">
                <svg className="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="auth-input"
                  placeholder="doctor@hospital.org / user@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) dispatch(clearError());
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div className="auth-field-group">
              <div className="auth-field-label-row">
                <label htmlFor="password" className="auth-field-label">
                  Password
                </label>
                <a href="#forgot" onClick={handleForgotPassword} className="auth-field-helper">
                  Forgot password?
                </a>
              </div>
              <div className="auth-input-wrapper">
                <svg className="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  className="auth-input has-right-toggle"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) dispatch(clearError());
                  }}
                />
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="auth-options-row">
              <label className="auth-checkbox-label">
                <input
                  type="checkbox"
                  className="auth-checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember this workstation</span>
              </label>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              className="btn btn-primary auth-submit-btn"
              disabled={loading || !email.trim() || !password.trim()}
            >
              {loading ? (
                <>
                  <span className="auth-spinner" aria-hidden="true" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Platform</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="auth-divider">
            <span>New to Vita Signal?</span>
          </div>

          {/* Switch link */}
          <div className="auth-footer-prompt">
            Don't have an account yet?
            <Link to="/register" className="auth-link-bold">
              Create an account here
            </Link>
          </div>

          {/* Security Stamp */}
          <div className="auth-security-stamp">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>End-to-End Encrypted Session • HIPAA / GDPR Aligned Privacy</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
