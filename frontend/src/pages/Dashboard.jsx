import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Container from '../components/Container';
import Button from '../components/Button';
import Card from '../components/Card';
import SectionHeading from '../components/SectionHeading';
import StepItem from '../components/StepItem';
import FeatureRow from '../components/FeatureRow';
import DiseaseCard from '../components/DiseaseCard';
import RiskCard from '../components/RiskCard';
import FaqItem from '../components/FaqItem';
import BmiSection from '../components/BmiSection';
import { DISEASES_DATA, DISEASE_CATEGORIES } from '../data/diseases';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [diseaseSearch, setDiseaseSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(12);

  // Handle protected feature routing: redirects unauthenticated users through /login
  const handleProtectedAction = (targetPath) => {
    if (isAuthenticated) {
      navigate(targetPath);
    } else {
      navigate('/login', { state: { from: { pathname: targetPath } } });
    }
  };

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter diseases by active category and search query across 260+ conditions
  const filteredDiseases = useMemo(() => {
    return DISEASES_DATA.filter((d) => {
      const matchesCategory = selectedCategory === 'All' || d.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!diseaseSearch.trim()) return true;
      const q = diseaseSearch.toLowerCase();
      const inName = d.name.toLowerCase().includes(q);
      const inSymptoms = Array.isArray(d.symptoms) && d.symptoms.some((s) => s.toLowerCase().includes(q));
      const inDesc = d.description && d.description.toLowerCase().includes(q);
      return inName || inSymptoms || inDesc;
    });
  }, [selectedCategory, diseaseSearch]);

  // Sample mock data for Section 05: Understanding Risk
  const sampleRiskData = {
    level: 'Medium',
    factors: [
      'Fasting blood glucose elevated (138 mg/dL)',
      'Reported sedentary lifestyle with minimal physical activity',
      'Positive first-degree family history of metabolic disorders'
    ],
    precautions: [
      'Schedule a confirmatory venous blood draw and HbA1c panel',
      'Follow a structured low-glycemic dietary plan high in vegetables and fiber',
      'Engage in 30 minutes of daily brisk aerobic walking'
    ]
  };

  return (
    <div className="landing-page">
      {/* Logged-In User Quick Access Header Banner */}
      {isAuthenticated && (
        <section className="user-banner-wrapper">
          <Container>
            <div className="user-hero-panel">
              <div className="user-hero-info">
                <h3>Welcome back, {user?.name || 'User'}</h3>
                <p>Select an assessment tool below or review your previous evaluations.</p>
              </div>
              <div className="user-quick-links">
                <Button variant="outline" size="sm" onClick={() => navigate('/history')}>
                  📜 View History
                </Button>
                <Button variant="filled" size="sm" onClick={() => navigate('/upload')}>
                  Upload Report
                </Button>
                <Button variant="filled" size="sm" onClick={() => navigate('/chat')}>
                  AI Chat
                </Button>
                <Button variant="filled" size="sm" onClick={() => navigate('/mcq')}>
                  Symptom Quiz
                </Button>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* ====================================================================
          01 HERO SECTION
          ==================================================================== */}
      <section className="hero-section" id="hero">
        <Container>
          <div className="hero-grid">
            {/* Left Content */}
            <div className="hero-left-col">
              <span className="hero-tag">Clinical Decision Support</span>
              <h1 className="hero-headline">
                Describe how you feel. Get a clearer picture of what it could be.
              </h1>
              <p className="hero-subtext">
                Upload a laboratory report, describe your symptoms in conversation, or answer an
                adaptive clinical quiz. Vita Signal cross-references clinical knowledge to highlight
                potential risks before you consult a doctor.
              </p>

              <div className="hero-btn-group">
                <Button
                  variant="filled"
                  size="lg"
                  onClick={() => (isAuthenticated ? navigate('/upload') : navigate('/register'))}
                >
                  {isAuthenticated ? 'Start an assessment ➔' : 'Get started free ➔'}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={(e) => scrollToSection(e, 'how-it-works')}
                >
                  See how it works
                </Button>
              </div>
            </div>

            {/* Right Illustration: Handcrafted CSS Mock Output Card */}
            <div className="hero-right-col">
              <div className="hero-mock-card">
                <div className="mock-card-header">
                  <span className="mono-num">Example Output</span>
                  <span className="mock-title">Preliminary Screening</span>
                </div>

                <div className="mock-condition-list">
                  <div className="mock-condition-item">
                    <span className="mock-condition-name">1. Type 2 Diabetes</span>
                    <span className="mock-confidence-pill pill-high">High Confidence</span>
                  </div>
                  <div className="mock-condition-item">
                    <span className="mock-condition-name">2. Metabolic Syndrome</span>
                    <span className="mock-confidence-pill pill-med">Medium Confidence</span>
                  </div>
                  <div className="mock-condition-item">
                    <span className="mock-condition-name">3. Essential Hypertension</span>
                    <span className="mock-confidence-pill pill-low">Low Confidence</span>
                  </div>
                </div>

                <div className="mock-card-bottom">
                  <span className="mock-risk-label">Identified Overall Risk:</span>
                  <span className="risk-level-badge level-medium">MEDIUM RISK</span>
                </div>
              </div>
            </div>
          </div>

          {/* Thin Bordered Strip under Hero */}
          <div className="hero-disclaimer-strip">
            <span className="strip-icon">⚠️</span>
            <span>
              <strong>Not a medical diagnosis.</strong> Vita Signal is an informational triage tool.
              Always consult a certified medical practitioner for definitive diagnosis and treatment.
            </span>
          </div>
        </Container>
      </section>

      {/* ====================================================================
          02 THREE WAYS TO USE VITA SIGNAL (FEATURES)
          ==================================================================== */}
      <section className="section-padding" id="features">
        <Container>
          <SectionHeading
            number="02"
            title="Three ways to use Vita Signal"
            subtitle="Choose the method that best fits what information you have on hand right now."
          />

          <div className="feature-rows-list">
            {/* Method A: Upload */}
            <FeatureRow
              tag="Method A"
              title="Upload a lab report or clinical note"
              description="Have a recent blood test, metabolic panel, or doctor's summary? Upload it directly to extract clinical indicators without manual typing."
              details={[
                'Accepts CSV, PDF, and plain TXT files up to 5 MB',
                'Extracts biomarker values like fasting glucose, blood pressure, and cholesterol',
                'Temporary files are analyzed in memory and immediately deleted'
              ]}
              actionText="Try report upload"
              onAction={() => handleProtectedAction('/upload')}
              illustration={
                <div className="mock-doc-visual">
                  <div className="mock-doc-header">
                    <span>blood_panel_2026.csv</span>
                    <span>14.2 KB</span>
                  </div>
                  <table className="mock-doc-table">
                    <thead>
                      <tr>
                        <th>Biomarker</th>
                        <th>Value</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="highlight-row">
                        <td>Fasting Glucose</td>
                        <td>148 mg/dL</td>
                        <td>High</td>
                      </tr>
                      <tr className="highlight-row">
                        <td>HbA1c</td>
                        <td>7.2%</td>
                        <td>Elevated</td>
                      </tr>
                      <tr>
                        <td>Systolic BP</td>
                        <td>138 mmHg</td>
                        <td>Borderline</td>
                      </tr>
                      <tr>
                        <td>Total Cholesterol</td>
                        <td>210 mg/dL</td>
                        <td>Slightly High</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              }
            />

            {/* Method B: Chat (Reversed) */}
            <FeatureRow
              tag="Method B"
              title="Chat with the AI in your own words"
              description="Don't have lab test papers? Simply describe how you feel in everyday language. The AI asks clarifying questions to narrow down possibilities."
              details={[
                'No clinical terminology required — speak plainly',
                'AI asks follow-up questions regarding onset, duration, and pain severity',
                'Cross-references symptoms against reference disease patterns'
              ]}
              actionText="Start conversation"
              reversed={true}
              onAction={() => handleProtectedAction('/chat')}
              illustration={
                <div className="mock-chat-visual">
                  <div className="mock-chat-bubble bubble-user-sample">
                    "I have had a throbbing pain on the right side of my head since yesterday, and bright lights make me nauseous."
                  </div>
                  <div className="mock-chat-bubble bubble-ai-sample">
                    "These symptoms are characteristic of a unilateral migraine attack. Did you notice any visual shimmering or blind spots beforehand?"
                  </div>
                </div>
              }
            />

            {/* Method C: MCQ Quiz */}
            <FeatureRow
              tag="Method C"
              title="Take the adaptive symptom quiz"
              description="Answer 8 to 10 progressive questions. Each question is generated adaptively based on your previous answers to rule in or out conditions."
              details={[
                'Fast, structured screening ideal for quick triage',
                'Every question includes 4 targeted choices plus "None of these"',
                'Synthesizes all answers into a complete prediction report upon completion'
              ]}
              actionText="Take the symptom quiz"
              onAction={() => handleProtectedAction('/mcq')}
              illustration={
                <div className="mock-mcq-visual">
                  <div className="mock-mcq-step">Question 3 of 8</div>
                  <div className="mock-mcq-q">Are you experiencing noticeable thirst or urination changes?</div>
                  <div className="mock-mcq-options">
                    <div className="mock-mcq-opt selected">
                      <span className="opt-indicator-circle checked"></span>
                      <span>Yes, noticeable during the day and night</span>
                    </div>
                    <div className="mock-mcq-opt">
                      <span className="opt-indicator-circle"></span>
                      <span>Only after intense physical exercise</span>
                    </div>
                    <div className="mock-mcq-opt">
                      <span className="opt-indicator-circle"></span>
                      <span>None of these</span>
                    </div>
                  </div>
                </div>
              }
            />
          </div>
        </Container>
      </section>

      {/* ====================================================================
          03 HOW IT WORKS
          ==================================================================== */}
      <section className="section-padding how-it-works-section" id="how-it-works">
        <Container>
          <SectionHeading
            number="03"
            title="How it works"
            subtitle="Three straightforward steps from describing your symptoms to obtaining structured risk guidance."
          />

          <div className="steps-row">
            <StepItem
              number="1"
              title="Share your symptoms"
              description="Upload a lab test document (CSV, PDF, TXT), describe symptoms in conversational chat, or complete a fast multiple-choice questionnaire."
            />
            <StepItem
              number="2"
              title="Compare with clinical evidence"
              description="The system extracts biomarker values and symptom tokens, querying an evidence-based vector store of medical knowledge via RAG."
            />
            <StepItem
              number="3"
              title="Receive risk analysis & precautions"
              description="Review top likely conditions, confidence indicators, specific risk factors, and actionable precautions to bring to your physician."
              isLast={true}
            />
          </div>
        </Container>
      </section>

      {/* ====================================================================
          04 CLINICAL BMI & METABOLIC RISK ANALYSIS
          ==================================================================== */}
      <BmiSection />

      {/* ====================================================================
          05 DISEASES WE CAN LOOK AT
          ==================================================================== */}
      <section className="section-padding" id="diseases">
        <Container>
          <SectionHeading
            number="05"
            title="Diseases we can look at"
            subtitle="A curated reference index of common conditions recognized in our clinical knowledge base. Click any card to expand precautions and medical guidance."
          />

          {/* Live Search & Filter Bar */}
          <div className="diseases-search-controls">
            <div className="diseases-search-box">
              <span className="search-icon-symbol">🔍</span>
              <input
                type="text"
                placeholder="Search 260+ diseases by name, symptom (e.g. chest pain, vertigo, rash), or keyword..."
                value={diseaseSearch}
                onChange={(e) => {
                  setDiseaseSearch(e.target.value);
                  setVisibleCount(12);
                }}
                className="diseases-search-input"
              />
              {diseaseSearch && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => {
                    setDiseaseSearch('');
                    setVisibleCount(12);
                  }}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="diseases-count-indicator">
              Showing <strong>{Math.min(visibleCount, filteredDiseases.length)}</strong> of <strong>{filteredDiseases.length}</strong> matching conditions
            </div>
          </div>

          {/* Filter Chips */}
          <div className="filter-chips-row" role="tablist" aria-label="Filter conditions by category">
            {DISEASE_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                className={`filter-chip ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => {
                  setSelectedCategory(category);
                  setVisibleCount(12);
                }}
                role="tab"
                aria-selected={selectedCategory === category}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Expandable Diseases Grid */}
          {filteredDiseases.length > 0 ? (
            <>
              <div className="diseases-grid">
                {filteredDiseases.slice(0, visibleCount).map((disease) => (
                  <DiseaseCard key={disease.id} disease={disease} />
                ))}
              </div>

              {/* Show More Pagination Button */}
              {filteredDiseases.length > visibleCount && (
                <div className="diseases-show-more-row">
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => setVisibleCount((prev) => Math.min(prev + 18, filteredDiseases.length))}
                  >
                    Load More Conditions ({filteredDiseases.length - visibleCount} remaining) ▾
                  </Button>
                  <button
                    type="button"
                    className="show-all-text-btn"
                    onClick={() => setVisibleCount(filteredDiseases.length)}
                  >
                    View All {filteredDiseases.length}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="diseases-empty-search">
              <span className="empty-icon">🔎</span>
              <h4>No specific condition matched "{diseaseSearch}"</h4>
              <p>Our clinical AI model can analyze any symptom even if it's not directly in this catalog.</p>
              <Button
                variant="filled"
                size="sm"
                onClick={() => handleProtectedAction('/chat')}
              >
                Ask AI Doctor About "{diseaseSearch}" ➔
              </Button>
            </div>
          )}

          {/* More Diseases Coverage Banner */}
          <div className="more-diseases-banner">
            <div className="more-diseases-header">
              <div className="more-diseases-badge">
                <span className="sparkle-icon">✨</span>
                <span>Expanded Clinical Knowledge Base</span>
              </div>
              <h3 className="more-diseases-title">
                Covering Far More Than What Is Listed Above
              </h3>
              <p className="more-diseases-subtitle">
                The conditions displayed above represent our curated quick-reference index. Vita Signal's Retrieval-Augmented Generation (RAG) system and clinical AI cross-reference <strong>hundreds of symptoms, laboratory panels, and multi-system conditions</strong>.
              </p>
            </div>

            <div className="more-diseases-categories-grid">
              <div className="more-cat-card">
                <div className="more-cat-icon">🫀</div>
                <h4>Cardiovascular & Circulatory</h4>
                <p className="more-cat-items">
                  Arrhythmias (AFib), Coronary Artery Disease, Heart Failure, Deep Vein Thrombosis (DVT), Peripheral Artery Disease
                </p>
              </div>

              <div className="more-cat-card">
                <div className="more-cat-icon">🧬</div>
                <h4>Endocrine & Metabolic</h4>
                <p className="more-cat-items">
                  Hypothyroidism, Hyperthyroidism, Metabolic Syndrome, Gout & Hyperuricemia, Vitamin D & B12 Deficiencies
                </p>
              </div>

              <div className="more-cat-card">
                <div className="more-cat-icon">🫁</div>
                <h4>Respiratory & Pulmonary</h4>
                <p className="more-cat-items">
                  Acute Bronchitis, Sleep Apnea, Allergic Rhinitis, Pneumonia risk indicators, Pulmonary Embolism screening
                </p>
              </div>

              <div className="more-cat-card">
                <div className="more-cat-icon">🔬</div>
                <h4>Gastrointestinal & Hepatic</h4>
                <p className="more-cat-items">
                  GERD / Acid Reflux, Irritable Bowel Syndrome (IBS), Gallstones (Cholelithiasis), Gastritis, NAFLD / Fatty Liver
                </p>
              </div>

              <div className="more-cat-card">
                <div className="more-cat-icon">🧠</div>
                <h4>Neurological & Mental Fatigue</h4>
                <p className="more-cat-items">
                  Tension Headaches, Migraine with/without aura, Vertigo / Vestibular Neuritis, Chronic Stress & Burnout
                </p>
              </div>

              <div className="more-cat-card">
                <div className="more-cat-icon">🦴</div>
                <h4>Musculoskeletal & Autoimmune</h4>
                <p className="more-cat-items">
                  Osteoarthritis, Fibromyalgia, Rheumatoid Arthritis indicators, Lumbar Radiculopathy, Tendinitis
                </p>
              </div>
            </div>

            <div className="more-diseases-footer">
              <div className="more-diseases-footer-text">
                <strong>Have unlisted symptoms or a specialized lab panel?</strong>
                <span>Describe your symptoms to our clinical AI doctor or upload your test report for personalized triage analysis.</span>
              </div>
              <div className="more-diseases-cta-btns">
                <Button
                  variant="filled"
                  size="sm"
                  onClick={() => handleProtectedAction('/chat')}
                >
                  Ask AI About Any Condition ➔
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleProtectedAction('/upload')}
                >
                  Upload Your Report
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ====================================================================
          06 UNDERSTANDING YOUR RISK RESULT
          ==================================================================== */}
      <section className="section-padding" id="understanding-risk">
        <Container>
          <SectionHeading
            number="06"
            title="Understanding your risk result"
            subtitle="Every report delivers four unambiguous elements to facilitate constructive discussions with a healthcare professional."
          />

          <div className="understanding-risk-grid">
            {/* Left Breakdown */}
            <div className="risk-explanation-col">
              <ul className="risk-explanation-list">
                <li className="explanation-item">
                  <span className="item-num">1</span>
                  <div className="item-content">
                    <h4>Top 3 Candidate Conditions</h4>
                    <p>
                      Ranked by likelihood with Low, Medium, or High confidence indicators based on
                      how closely your inputs align with clinical criteria.
                    </p>
                  </div>
                </li>

                <li className="explanation-item">
                  <span className="item-num">2</span>
                  <div className="item-content">
                    <h4>Overall Risk Level (Low / Medium / High)</h4>
                    <p>
                      Indicates clinical urgency. High Risk flags severe biomarker thresholds (such as
                      crisis-level blood pressure or dangerous hyperglycemia) requiring immediate attention.
                    </p>
                  </div>
                </li>

                <li className="explanation-item">
                  <span className="item-num">3</span>
                  <div className="item-content">
                    <h4>Key Risk Factors Identified</h4>
                    <p>
                      Specific clinical indicators (such as elevated HbA1c, chronic stress, or family history)
                      extracted from your report or quiz responses.
                    </p>
                  </div>
                </li>

                <li className="explanation-item">
                  <span className="item-num">4</span>
                  <div className="item-content">
                    <h4>Recommended Precautions</h4>
                    <p>
                      Non-prescriptive lifestyle guidance, dietary suggestions, and recommended follow-up
                      laboratory panels to review with a clinician.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Right Large Sample RiskCard */}
            <div className="risk-card-preview-col">
              <RiskCard risk={sampleRiskData} isSample={true} />
            </div>
          </div>
        </Container>
      </section>

      {/* ====================================================================
          07 PRIVACY AND SAFETY
          ==================================================================== */}
      <section className="section-padding" id="privacy-safety">
        <Container>
          <SectionHeading
            number="07"
            title="Privacy and safety"
            subtitle="Transparent commitments regarding data handling, project scope, and emergency protocols."
          />

          <div className="privacy-grid">
            <Card className="privacy-card">
              <div className="privacy-card-icon">🔒</div>
              <h4>Temporary File Processing</h4>
              <p>
                Uploaded documents are held in temporary memory solely during the analysis request.
                Files are immediately deleted from disk once clinical parameters are extracted.
              </p>
            </Card>

            <Card className="privacy-card">
              <div className="privacy-card-icon">🛡️</div>
              <h4>Account-Scoped History</h4>
              <p>
                Your assessment results are tied securely to your personal account in PostgreSQL.
                Records are never aggregated for third-party commercial marketing or shared externally.
              </p>
            </Card>

            <Card className="privacy-card">
              <div className="privacy-card-icon">⚠️</div>
              <h4>Educational Major Project</h4>
              <p>
                Vita Signal was developed as a college major project exploring Retrieval-Augmented
                Generation (RAG). It is not an FDA/CE cleared medical device and cannot diagnose illness.
              </p>
            </Card>

            <Card className="privacy-card">
              <div className="privacy-card-icon">🚨</div>
              <h4>Emergency Protocol</h4>
              <p>
                If you or someone around you is experiencing severe chest pain, shortness of breath,
                sudden unilateral numbness, or severe hemorrhaging, contact emergency services immediately.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* ====================================================================
          08 FAQ
          ==================================================================== */}
      <section className="section-padding" id="faq">
        <Container>
          <SectionHeading
            number="08"
            title="Frequently asked questions"
            subtitle="Clear, direct answers about how Vita Signal works, its capabilities, and its limitations."
          />

          <div className="faq-list-container">
            <FaqItem
              question="Is Vita Signal a substitute for a doctor's diagnosis?"
              answer="No. Vita Signal is strictly an informational clinical decision support and triage aid. It suggests possible conditions based on statistical and semantic pattern matching against clinical literature. Always consult a qualified physician for clinical confirmation and prescription medication."
            />
            <FaqItem
              question="How does the AI analyze my symptoms and lab reports?"
              answer="Vita Signal utilizes a Retrieval-Augmented Generation (RAG) architecture. When you upload a report or enter symptoms, your text is embedded into a 384-dimensional dense vector (using sentence-transformers) and compared against verified medical reference files stored in pgvector. The relevant clinical guidelines and your inputs are then evaluated by Groq's high-speed Llama 3.3 70B model to generate structured predictions."
            />
            <FaqItem
              question="What file formats can I upload?"
              answer="Vita Signal currently accepts CSV (such as lab test results or blood biomarker panels), PDF (digital lab reports and doctor summaries), and TXT files up to 5 MB in size. Other file formats like images or Word documents are not supported."
            />
            <FaqItem
              question="How many questions are in the symptom quiz?"
              answer="The adaptive symptom quiz consists of 8 carefully formulated multiple-choice questions. Each subsequent question is chosen dynamically based on your previous answers to progressively narrow down potential risk categories."
            />
            <FaqItem
              question="What happens to my uploaded files after analysis?"
              answer="Uploaded files are processed immediately in backend memory to extract text and lab parameters. The temporary file is permanently deleted from the server disk within the request's execution block."
            />
            <FaqItem
              question="What should I do if my result shows 'High Risk'?"
              answer="A 'High Risk' result indicates that one or more reported values (such as fasting glucose > 140 mg/dL or stage-2 hypertension metrics) fall within clinically critical thresholds. You should schedule an appointment with a primary care physician or specialist as soon as possible and take the printed report with you."
            />
            <FaqItem
              question="Can I access my previous test reports later?"
              answer="Yes. When signed into your account, all past analyses (whether conducted via report upload, AI chat, or the symptom quiz) are preserved in your personal Assessment History page, allowing you to track health risk trends over time."
            />
          </div>
        </Container>
      </section>

      {/* ====================================================================
          08 FINAL CALL TO ACTION
          ==================================================================== */}
      <section className="section-padding cta-section" id="get-started">
        <Container>
          <div className="cta-block">
            <h2 className="cta-title">Ready to evaluate your symptoms?</h2>
            <p className="cta-subtitle">
              Start with an upload, an interactive chat, or a quick multiple-choice questionnaire.
              Receive clear, structured health risk insights in under two minutes.
            </p>
            <div className="cta-btn-row">
              <Button
                variant="filled"
                size="lg"
                onClick={() => (isAuthenticated ? navigate('/upload') : navigate('/register'))}
              >
                {isAuthenticated ? 'Perform new assessment ➔' : 'Create free account ➔'}
              </Button>
              {!isAuthenticated && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/login')}
                >
                  Log in to existing account
                </Button>
              )}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default Dashboard;
