import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setResult } from '../store/resultSlice';
import MCQCard from '../components/MCQCard';
import api from '../services/api';
import './Assessments.css';

function MCQ() {
  const [step, setStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(8);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [answers, setAnswers] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [analyzingResult, setAnalyzingResult] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch initial question on page load
  useEffect(() => {
    fetchQuestion(1, []);
  }, []);

  const fetchQuestion = async (stepNum, existingAnswers) => {
    setLoading(true);
    setError(null);
    setSelectedOption('');

    try {
      const response = await api.post('/mcq/next', {
        step: stepNum,
        answers: existingAnswers
      });

      if (response.data.done) {
        // All questions completed, evaluate results
        await generateFinalPrediction(existingAnswers);
        return;
      }

      setStep(response.data.step || stepNum);
      setTotalSteps(response.data.totalSteps || 8);
      setQuestion(response.data.question);
      setOptions(response.data.options || []);
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to load question. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const generateFinalPrediction = async (finalAnswers) => {
    setAnalyzingResult(true);
    setError(null);

    try {
      const response = await api.post('/mcq/result', {
        answers: finalAnswers
      });

      // Save prediction result to Redux
      dispatch(setResult({
        result: response.data.result,
        source: 'mcq',
        inputSummary: response.data.inputSummary,
        id: response.data.id
      }));

      // Navigate to standard Result page
      navigate('/result');
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to analyze quiz results. Please try again.';
      setError(msg);
      setAnalyzingResult(false);
    }
  };

  const handleNext = async () => {
    if (!selectedOption) return;

    const currentAnswerObj = {
      question,
      answer: selectedOption
    };

    const updatedAnswers = [...answers, currentAnswerObj];
    setAnswers(updatedAnswers);

    if (step >= totalSteps) {
      // Reached final step
      await generateFinalPrediction(updatedAnswers);
    } else {
      // Fetch subsequent question
      await fetchQuestion(step + 1, updatedAnswers);
    }
  };

  if (analyzingResult) {
    return (
      <div className="page-container" style={{ textAlign: 'center', maxWidth: '640px' }}>
        <div className="mcq-card" style={{ padding: '4rem 2rem' }}>
          <div className="auth-spinner" style={{ width: '42px', height: '42px', margin: '0 auto 1.5rem', borderWidth: '3.5px' }} />
          <h2 style={{ fontFamily: 'Fraunces, serif', marginBottom: '0.75rem' }}>
            Synthesizing Clinical Profile...
          </h2>
          <p style={{ color: 'var(--ink-muted)', fontSize: '0.98rem', lineHeight: '1.6' }}>
            Our clinical inference engine is cross-referencing your questionnaire responses against
            multi-condition diagnostic indicators to generate your comprehensive risk report.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container mcq-page">
      <div className="page-header">
        <span className="page-kicker">// ADAPTIVE CLINICAL SCREENING</span>
        <h1 className="page-title">Dynamic Symptom Assessment Quiz</h1>
        <p className="page-subtitle">
          An interactive, clinically informed questionnaire. Each question adapts in real-time based on
          your preceding responses to isolate symptoms and estimate disorder risks.
        </p>
      </div>

      <div className="clinical-notice-banner">
        <span className="clinical-notice-icon">📋</span>
        <div>
          <strong>Adaptive Evaluation:</strong> Select the option that best mirrors your experience over recent weeks.
          If a symptom does not apply, simply choose <strong>"None of these"</strong>.
        </div>
      </div>

      {error && (
        <div className="auth-alert auth-alert-error" style={{ marginBottom: '1.5rem' }}>
          <div className="auth-alert-content">{error}</div>
          <button
            onClick={() => fetchQuestion(step, answers)}
            className="btn btn-sm btn-outline ml-2"
            style={{ marginLeft: '0.75rem' }}
          >
            Retry
          </button>
        </div>
      )}

      <div className="mcq-container">
        {question ? (
          <MCQCard
            step={step}
            totalSteps={totalSteps}
            question={question}
            options={options}
            selectedOption={selectedOption}
            onSelectOption={setSelectedOption}
            onNext={handleNext}
            loading={loading}
            isLastStep={step === totalSteps}
          />
        ) : (
          loading && (
            <div className="mcq-card" style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
              <div className="auth-spinner" style={{ width: '32px', height: '32px', margin: '0 auto 1rem' }} />
              <p style={{ fontWeight: 600, color: 'var(--ink)' }}>
                Generating adaptive clinical inquiry...
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default MCQ;
