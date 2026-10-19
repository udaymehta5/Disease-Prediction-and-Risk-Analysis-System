import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setResult } from '../store/resultSlice';
import MCQCard from '../components/MCQCard';
import api from '../services/api';

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
      <div className="page-container text-center">
        <div className="card placeholder-card">
          <div className="spinner large-spinner"></div>
          <h3 className="mt-4">Synthesizing Symptom Assessment...</h3>
          <p className="text-muted">
            Our clinical inference engine is cross-referencing your answers with disease profiles.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container mcq-page">
      <div className="page-header">
        <h2>Adaptive Symptom Assessment Quiz</h2>
        <p className="page-subtitle">
          Answer each question carefully. The questions adapt based on your answers to identify potential risks.
        </p>
      </div>

      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
          <button onClick={() => fetchQuestion(step, answers)} className="btn btn-sm btn-outline ml-2">
            Retry
          </button>
        </div>
      )}

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
          <div className="card placeholder-card">
            <span className="spinner"></span>
            <p className="mt-2">Generating adaptive clinical question...</p>
          </div>
        )
      )}
    </div>
  );
}

export default MCQ;
