import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, registerSuccess, loginFailure, clearError } from '../store/authSlice';
import GoogleAuthButton from '../components/GoogleAuthButton';
import api from '../services/api';
import './Auth.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToDisclaimer, setAgreedToDisclaimer] = useState(true);
  const [clientError, setClientError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error } = useSelector((state) => state.auth);
  const from = location.state?.from?.pathname || '/';

  // Compute password strength metrics
  const getPasswordStrength = (pwd) => {
    if (!pwd) return { score: 0, label: '', class: '' };
    let score = 0;
    if (pwd.length >= 6) score += 1;
    if (pwd.length >= 10) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    if (score <= 1) return { score: 1, label: 'Weak', class: 'weak' };
    if (score <= 2) return { score: 2, label: 'Fair', class: 'medium' };
    return { score: 3, label: 'Strong', class: 'strong' };
  };

  const strength = getPasswordStrength(password);
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;
  const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setClientError('');

    if (password.length < 6) {
      setClientError('Password must contain at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setClientError('Passwords do not match. Please re-enter your password.');
      return;
    }

    if (!agreedToDisclaimer) {
      setClientError('Please acknowledge the clinical support terms before registering.');
      return;
    }

    dispatch(loginStart());

    try {
      const response = await api.post('/auth/register', { name, email, password });
      dispatch(registerSuccess(response.data));
      navigate(from, { replace: true });
    } catch (err) {
      console.error('[Registration Error]', err);
      const message = err.response?.data?.error || err.userMessage || (err.message === 'Network Error' ? 'Cannot connect to backend server. Please make sure the backend is running on port 5000.' : err.message) || 'Registration failed. Please try again with another email.';
      dispatch(loginFailure(message));
    }
  };

  const displayedError = clientError || error;

  return (
    <div className="auth-page-wrapper">
      <div className="auth-split-layout">
        {/* Left Side: Clinical Features & Credentials Showcase */}
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
              Begin Clinical Risk Assessment
            </h2>
            <p className="auth-side-desc">
              Create your account to unlock continuous health surveillance, structured multi-condition screening, and personalized risk trajectory tracking.
            </p>

            <div className="auth-feature-list">
              <div className="auth-feature-item">
                <div className="auth-feature-bullet">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <div className="auth-feature-title">Longitudinal Risk History</div>
                  <div className="auth-feature-sub">Preserve assessment chronologies across clinic visits and screenings.</div>
                </div>
              </div>

              <div className="auth-feature-item">
                <div className="auth-feature-bullet">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <div className="auth-feature-title">AI Consultation Engine</div>
                  <div className="auth-feature-sub">Engage with conversational diagnostic agents grounded in verified literature.</div>
                </div>
              </div>

              <div className="auth-feature-item">
                <div className="auth-feature-bullet">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <div className="auth-feature-title">Zero Third-Party Tracking</div>
                  <div className="auth-feature-sub">Your personal identifiers and health markers are strictly confidential.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="auth-trust-box">
            <p className="auth-trust-quote">
              "Providing quantified clarity for proactive preventive health decisions."
            </p>
            <div className="auth-trust-meta">
              <span className="auth-status-indicator">
                <span className="auth-status-dot" />
                Encrypted Storage
              </span>
              <span className="text-muted" style={{ fontFamily: 'Space Mono, monospace' }}>FREE TIER AVAILABLE</span>
            </div>
          </div>
        </aside>

        {/* Right Side: Account Creation Form */}
        <div className="auth-form-panel">
          <div className="auth-form-header">
            <span className="auth-kicker">// REGISTRATION PROTOCOL</span>
            <h1 className="auth-title">Create an Account</h1>
            <p className="auth-desc">Join Vita Signal to begin personalized disease risk assessments.</p>
          </div>

          {/* Alert Notification */}
          {displayedError && (
            <div className="auth-alert auth-alert-error" role="alert">
              <svg className="auth-alert-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <div className="auth-alert-content">{displayedError}</div>
              <button
                type="button"
                onClick={() => { setClientError(''); dispatch(clearError()); }}
                className="auth-alert-dismiss"
                aria-label="Dismiss alert"
              >
                ×
              </button>
            </div>
          )}

          {/* Social Single Sign-On */}
          <div className="auth-social-box">
            <GoogleAuthButton redirectPath={from} />
            <div className="auth-social-divider">
              <span>Or sign up with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="auth-form-fields" noValidate>
            {/* Full Name */}
            <div className="auth-field-group">
              <label htmlFor="reg-name" className="auth-field-label">
                Full Name / Clinician Title
              </label>
              <div className="auth-input-wrapper">
                <svg className="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <input
                  id="reg-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="auth-input"
                  placeholder="Dr. Alex Morgan / Jane Smith"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (displayedError) { setClientError(''); dispatch(clearError()); }
                  }}
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="auth-field-group">
              <label htmlFor="reg-email" className="auth-field-label">
                Email Address
              </label>
              <div className="auth-input-wrapper">
                <svg className="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <input
                  id="reg-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="auth-input"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (displayedError) { setClientError(''); dispatch(clearError()); }
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div className="auth-field-group">
              <label htmlFor="reg-password" className="auth-field-label">
                Password (min. 6 characters)
              </label>
              <div className="auth-input-wrapper">
                <svg className="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  id="reg-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="new-password"
                  minLength={6}
                  className="auth-input has-right-toggle"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (displayedError) { setClientError(''); dispatch(clearError()); }
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

              {/* Password strength meter */}
              {password && (
                <div className="auth-password-strength">
                  <div className="strength-bar-track">
                    <div className={`strength-bar-fill ${strength.class}`} />
                  </div>
                  <div className="strength-labels-row">
                    <span className={`strength-text ${strength.class}`}>Strength: {strength.label}</span>
                    <span className="strength-hint">Min 6 characters, numbers recommended</span>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="auth-field-group">
              <label htmlFor="reg-confirm" className="auth-field-label">
                Confirm Password
              </label>
              <div className="auth-input-wrapper">
                <svg className="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  id="reg-confirm"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  autoComplete="new-password"
                  className="auth-input has-right-toggle"
                  placeholder="••••••••••••"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (displayedError) { setClientError(''); dispatch(clearError()); }
                  }}
                />
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  title={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? (
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

              {/* Match indicator */}
              {confirmPassword && (
                <div className={`auth-match-indicator ${passwordsMatch ? 'match' : 'mismatch'}`}>
                  {passwordsMatch ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Passwords match</span>
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                      <span>Passwords do not match yet</span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Clinical disclaimer agreement */}
            <div className="auth-options-row">
              <label className="auth-checkbox-label">
                <input
                  type="checkbox"
                  className="auth-checkbox"
                  checked={agreedToDisclaimer}
                  onChange={(e) => setAgreedToDisclaimer(e.target.checked)}
                />
                <span style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>
                  I understand Vita Signal outputs are intended for clinical decision support and risk education, not definitive diagnosis.
                </span>
              </label>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              className="btn btn-primary auth-submit-btn"
              disabled={loading || !name.trim() || !email.trim() || !password || !agreedToDisclaimer}
            >
              {loading ? (
                <>
                  <span className="auth-spinner" aria-hidden="true" />
                  <span>Creating Clinical Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
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
            <span>Already have credentials?</span>
          </div>

          {/* Switch link */}
          <div className="auth-footer-prompt">
            Already registered with Vita Signal?
            <Link to="/login" className="auth-link-bold">
              Sign in to your account
            </Link>
          </div>

          {/* Security Stamp */}
          <div className="auth-security-stamp">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>Strict Privacy Standards • Encrypted Database</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
