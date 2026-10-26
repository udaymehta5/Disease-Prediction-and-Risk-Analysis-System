import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import ThemeToggle from './ThemeToggle';
import Button from './Button';
import './Navbar.css';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    setMobileMenuOpen(false);
    navigate('/');
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Handles anchor links: if on homepage, scroll smoothly; if elsewhere, navigate home with hash
  const handleAnchorClick = (e, targetId) => {
    e.preventDefault();
    closeMobileMenu();

    if (location.pathname === '/') {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${targetId}`);
    }
  };

  return (
    <header className="vita-header">
      <div className="vita-header-container">
        {/* Brand Wordmark with Pulse SVG Mark */}
        <Link to="/" className="vita-brand" onClick={closeMobileMenu}>
          <span className="brand-mark-circle">
            <svg
              className="pulse-svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 12h-4l-3 8L9 4l-3 8H2" />
            </svg>
          </span>
          <span className="brand-text">Vita Signal</span>
        </Link>

        {/* Desktop Navigation: Informational Page Anchors */}
        <nav className="desktop-info-nav">
          <a
            href="#features"
            className="nav-item"
            onClick={(e) => handleAnchorClick(e, 'features')}
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="nav-item"
            onClick={(e) => handleAnchorClick(e, 'how-it-works')}
          >
            How it works
          </a>
          <a
            href="#bmi"
            className="nav-item"
            onClick={(e) => handleAnchorClick(e, 'bmi')}
          >
            BMI
          </a>
          <a
            href="#diseases"
            className="nav-item"
            onClick={(e) => handleAnchorClick(e, 'diseases')}
          >
            Diseases
          </a>
          <a
            href="#faq"
            className="nav-item"
            onClick={(e) => handleAnchorClick(e, 'faq')}
          >
            FAQ
          </a>
        </nav>

        {/* Dedicated Interactive Actions Hub (User Access & Action Center) */}
        <div className="header-interactive-hub" role="region" aria-label="Interactive Clinical Tools">
          <Link
            to="/upload"
            className={`hub-tool-btn ${location.pathname === '/upload' ? 'is-active' : ''}`}
            title="Upload laboratory blood tests or clinical reports"
          >
            <svg
              className="tool-btn-icon"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span>Upload</span>
          </Link>

          <Link
            to="/chat"
            className={`hub-tool-btn ${location.pathname === '/chat' ? 'is-active' : ''}`}
            title="Interactive AI chat consultation and symptom triage"
          >
            <svg
              className="tool-btn-icon"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <span>AI Chat</span>
          </Link>

          <Link
            to="/mcq"
            className={`hub-tool-btn ${location.pathname === '/mcq' ? 'is-active' : ''}`}
            title="Structured interactive clinical MCQ quiz"
          >
            <svg
              className="tool-btn-icon"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
            <span>Quiz</span>
          </Link>

          {isAuthenticated && (
            <Link
              to="/history"
              className={`hub-tool-btn ${location.pathname === '/history' ? 'is-active' : ''}`}
              title="Review saved predictions and report assessments"
            >
              <svg
                className="tool-btn-icon"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>History</span>
            </Link>
          )}
        </div>

        {/* Right Action Area */}
        <div className="header-actions">
          <ThemeToggle />

          {isAuthenticated ? (
            <div className="user-nav-group">
              <span className="user-name-badge">
                <span className="user-dot"></span>
                {user?.name || 'Account'}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                Log out
              </Button>
            </div>
          ) : (
            <div className="auth-btn-group">
              <Button
                as={Link}
                to="/login"
                variant="outline"
                size="sm"
              >
                Log in
              </Button>
              <Button
                as={Link}
                to="/register"
                variant="filled"
                size="sm"
              >
                Sign up
              </Button>
            </div>
          )}

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            className="hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="7" x2="21" y2="7" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="17" x2="21" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer / Dropdown Panel */}
      {mobileMenuOpen && (
        <div className="mobile-dropdown-panel">
          {/* Prominent Mobile Interactive Tools Hub */}
          <div className="mobile-interactive-section">
            <div className="mobile-section-heading">
              <span className="mobile-tools-badge">
                <span className="hub-tag-pulse"></span>
                QUICK ACTIONS
              </span>
              <span className="mobile-tools-sub">Direct Patient Access</span>
            </div>

            <div className="mobile-tools-grid">
              <Link
                to="/upload"
                className={`mobile-tool-card ${location.pathname === '/upload' ? 'is-active' : ''}`}
                onClick={closeMobileMenu}
              >
                <div className="mobile-tool-card-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
                <div className="mobile-tool-card-body">
                  <span className="mobile-tool-name">Upload Report</span>
                  <span className="mobile-tool-caption">Scan lab reports & blood tests</span>
                </div>
              </Link>

              <Link
                to="/chat"
                className={`mobile-tool-card ${location.pathname === '/chat' ? 'is-active' : ''}`}
                onClick={closeMobileMenu}
              >
                <div className="mobile-tool-card-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </div>
                <div className="mobile-tool-card-body">
                  <span className="mobile-tool-name">AI Chat</span>
                  <span className="mobile-tool-caption">Conversational clinical triage</span>
                </div>
              </Link>

              <Link
                to="/mcq"
                className={`mobile-tool-card ${location.pathname === '/mcq' ? 'is-active' : ''}`}
                onClick={closeMobileMenu}
              >
                <div className="mobile-tool-card-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                </div>
                <div className="mobile-tool-card-body">
                  <span className="mobile-tool-name">Symptom Quiz</span>
                  <span className="mobile-tool-caption">Targeted multi-choice diagnosis</span>
                </div>
              </Link>

              {isAuthenticated && (
                <Link
                  to="/history"
                  className={`mobile-tool-card ${location.pathname === '/history' ? 'is-active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  <div className="mobile-tool-card-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div className="mobile-tool-card-body">
                    <span className="mobile-tool-name">History</span>
                    <span className="mobile-tool-caption">Saved tests & risk logs</span>
                  </div>
                </Link>
              )}
            </div>
          </div>

          {/* Informational Anchor Links */}
          <div className="mobile-section-heading mobile-info-heading">
            <span className="mobile-info-label">Page Navigation</span>
          </div>
          <nav className="mobile-nav-links">
            <a
              href="#features"
              className="mobile-nav-item"
              onClick={(e) => handleAnchorClick(e, 'features')}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="mobile-nav-item"
              onClick={(e) => handleAnchorClick(e, 'how-it-works')}
            >
              How it works
            </a>
            <a
              href="#bmi"
              className="mobile-nav-item"
              onClick={(e) => handleAnchorClick(e, 'bmi')}
            >
              BMI
            </a>
            <a
              href="#diseases"
              className="mobile-nav-item"
              onClick={(e) => handleAnchorClick(e, 'diseases')}
            >
              Diseases
            </a>
            <a
              href="#faq"
              className="mobile-nav-item"
              onClick={(e) => handleAnchorClick(e, 'faq')}
            >
              FAQ
            </a>
          </nav>

          {/* Auth Section */}
          <div className="mobile-auth-divider"></div>
          {isAuthenticated ? (
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="btn-block"
            >
              Log out ({user?.name || 'Account'})
            </Button>
          ) : (
            <div className="mobile-auth-actions">
              <Button
                as={Link}
                to="/login"
                variant="outline"
                onClick={closeMobileMenu}
                className="btn-block"
              >
                Log in
              </Button>
              <Button
                as={Link}
                to="/register"
                variant="filled"
                onClick={closeMobileMenu}
                className="btn-block"
              >
                Sign up
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
