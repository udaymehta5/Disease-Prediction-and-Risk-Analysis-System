import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from './Container';
import './Footer.css';

function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const handleAnchorClick = (e, targetId) => {
    e.preventDefault();
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
    <footer className="vita-footer">
      <Container>
        <div className="footer-columns">
          {/* Column 1: Brand & Bio */}
          <div className="footer-col footer-col-brand">
            <Link to="/" className="footer-brand">
              <span className="brand-mark-circle">
                <svg
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
              <span className="footer-brand-title">Vita Signal</span>
            </Link>
            <p className="footer-tagline">
              A clinical decision support and health risk analysis system combining retrieval-augmented
              medical knowledge with structured symptom reasoning.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Overview</h4>
            <ul className="footer-link-list">
              <li>
                <a href="#how-it-works" onClick={(e) => handleAnchorClick(e, 'how-it-works')}>
                  How it works
                </a>
              </li>
              <li>
                <a href="#features" onClick={(e) => handleAnchorClick(e, 'features')}>
                  Three ways to test
                </a>
              </li>
              <li>
                <a href="#diseases" onClick={(e) => handleAnchorClick(e, 'diseases')}>
                  Diseases catalog
                </a>
              </li>
              <li>
                <a href="#understanding-risk" onClick={(e) => handleAnchorClick(e, 'understanding-risk')}>
                  Understanding risk
                </a>
              </li>
              <li>
                <a href="#privacy-safety" onClick={(e) => handleAnchorClick(e, 'privacy-safety')}>
                  Privacy & safety
                </a>
              </li>
              <li>
                <a href="#faq" onClick={(e) => handleAnchorClick(e, 'faq')}>
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Tools & Account */}
          <div className="footer-col">
            <h4 className="footer-heading">Assessments</h4>
            <ul className="footer-link-list">
              <li><Link to="/upload">Upload report</Link></li>
              <li><Link to="/chat">AI chat consultation</Link></li>
              <li><Link to="/mcq">Symptom quiz (MCQ)</Link></li>
              <li><Link to="/login">Sign in</Link></li>
              <li><Link to="/register">Create free account</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer Row */}
        <div className="footer-bottom-row">
          <p className="footer-disclaimer-text">
            College major project. Vita Signal is an informational tool, not a medical diagnosis.
            Consult a qualified physician for any health decision.
          </p>
          <span className="footer-copyright">
            © {currentYear} Vita Signal
          </span>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
