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

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          <a
            href="#how-it-works"
            className="nav-item"
            onClick={(e) => handleAnchorClick(e, 'how-it-works')}
          >
            How it works
          </a>
          <a
            href="#features"
            className="nav-item"
            onClick={(e) => handleAnchorClick(e, 'features')}
          >
            Features
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

          {isAuthenticated && (
            <>
              <Link to="/upload" className="nav-item">Upload</Link>
              <Link to="/chat" className="nav-item">Chat</Link>
              <Link to="/mcq" className="nav-item">Quiz</Link>
              <Link to="/history" className="nav-item">History</Link>
            </>
          )}
        </nav>

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
          <nav className="mobile-nav-links">
            <a
              href="#how-it-works"
              className="mobile-nav-item"
              onClick={(e) => handleAnchorClick(e, 'how-it-works')}
            >
              How it works
            </a>
            <a
              href="#features"
              className="mobile-nav-item"
              onClick={(e) => handleAnchorClick(e, 'features')}
            >
              Features
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

            {isAuthenticated ? (
              <>
                <Link to="/upload" className="mobile-nav-item" onClick={closeMobileMenu}>
                  Upload Report
                </Link>
                <Link to="/chat" className="mobile-nav-item" onClick={closeMobileMenu}>
                  AI Chat Consultation
                </Link>
                <Link to="/mcq" className="mobile-nav-item" onClick={closeMobileMenu}>
                  Symptom Quiz
                </Link>
                <Link to="/history" className="mobile-nav-item" onClick={closeMobileMenu}>
                  Assessment History
                </Link>
                <div className="mobile-auth-divider"></div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="btn-block"
                >
                  Log out ({user?.name || 'Account'})
                </Button>
              </>
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
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
