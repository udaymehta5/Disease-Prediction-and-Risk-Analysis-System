const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { Groq } = require('groq-sdk');
const db = require('../config/db');
const diseaseMatcher = require('./diseaseMatcher');

const STANDARD_DISCLAIMER = 'This is an informational tool, NOT a medical diagnosis. Consult a qualified doctor.';


// Fallback MCQ Bank for adaptive medical questionnaire
const FALLBACK_MCQ_BANK = [
  {
    question: 'What is the primary symptom or discomfort you are experiencing today?',
    options: [
      'Fever, chills, or body aches',
      'Cough, shortness of breath, or chest tightness',
      'Frequent thirst, urination, or chronic fatigue',
      'Severe throbbing headache or dizziness',
      'None of these'
    ]
  },
  {
    question: 'How long have you been experiencing these symptoms?',
    options: [
      'Just started today or yesterday (acute)',
      'Less than a week',
      'Between 1 to 4 weeks',
      'More than a month (chronic / recurring)',
      'None of these'
    ]
  },
  {
    question: 'Are you experiencing any respiratory or breathing difficulties?',
    options: [
      'Shortness of breath during mild walking or climbing stairs',
      'Wheezing or whistling sound when exhaling',
      'Persistent dry or mucus cough',
      'Chest pressure or heavy sensation',
      'None of these'
    ]
  },
  {
    question: 'Do you notice any metabolic or energy fluctuations?',
    options: [
      'Excessive unquenchable thirst (polydipsia)',
      'Frequent urination, particularly waking up at night',
      'Unexplained weight loss or constant hunger',
      'Extreme fatigue or blurred vision',
      'None of these'
    ]
  },
  {
    question: 'Are you experiencing any cardiovascular or blood pressure related signs?',
    options: [
      'Morning occipital headache or lightheadedness',
      'Rapid or irregular fluttering heartbeat (palpitations)',
      'Chest discomfort radiating to jaw or left arm',
      'Swelling in feet, ankles, or legs',
      'None of these'
    ]
  },
  {
    question: 'Are you having any digestive or abdominal discomfort?',
    options: [
      'Burning chest sensation (heartburn) after eating',
      'Acid or sour fluid regurgitation into throat',
      'Watery diarrhea or severe stomach cramping',
      'Nausea, bloating, or vomiting',
      'None of these'
    ]
  },
  {
    question: 'Do you experience headaches or neurological sensitivities?',
    options: [
      'Unilateral throbbing head pain lasting several hours',
      'Extreme sensitivity to light (photophobia) and noise',
      'Visual disturbances (shimmering lines or blind spots)',
      'Tension band sensation across forehead and neck',
      'None of these'
    ]
  },
  {
    question: 'Do you have any relevant clinical risk factors or lifestyle habits?',
    options: [
      'Sedentary lifestyle or BMI >= 25',
      'Current or former tobacco smoker',
      'Family history of diabetes, hypertension, or heart disease',
      'High dietary sodium and high everyday stress',
      'None of these'
    ]
  }
];

// Clinical reference knowledge for disease grounding
const CLINICAL_KNOWLEDGE_SUMMARY = `
- Asthma & COPD: Wheezing, shortness of breath, persistent cough, FEV1/FVC < 0.70, SpO2 drop, smoking exposure, triggers.
- Cardiovascular Disease: Chest pain radiating to arm/jaw, exertional dyspnea, palpitations, elevated troponin, ECG changes, hypertension, LDL elevation.
- Gastroenteritis & GERD: Acid reflux, heartburn, regurgitation, watery diarrhea, vomiting, dehydration, epigastric tenderness.
- Hypertension: BP >= 130/80 mmHg, occipital morning headaches, dizziness, stroke/cardiac risk, salt sensitivity, family history.
- Migraine & Headaches: Throbbing unilateral headache, photophobia, phonophobia, nausea, visual aura, stress triggers.
- Type 2 Diabetes: Fasting glucose >= 126 mg/dL, HbA1c >= 6.5%, polyuria, polydipsia, polyphagia, neuropathy, obesity.
- Viral Respiratory Infection: Acute fever, rhinorrhea, sore throat, myalgia, dry cough, normal or mild leukopenia, self-limiting course.
`;

let groqClient = null;
let activeWorkingModel = null;

function getGroqClient() {
  if (!groqClient) {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error('GROQ_API_KEY environment variable is not configured.');
    }
    groqClient = new Groq({ apiKey });
  }
  return groqClient;
}

function cleanJsonString(rawText) {
  if (!rawText) return '{}';
  let cleaned = rawText.trim();
  // Strip ```json ... ``` markdown code fences
  const fenceMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (fenceMatch) {
    cleaned = fenceMatch[1].trim();
  }
  // Find outermost JSON object
  const startIdx = cleaned.indexOf('{');
  const endIdx = cleaned.lastIndexOf('}');
  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    cleaned = cleaned.slice(startIdx, endIdx + 1);
  }
  return cleaned;
}

async function callGroqWithFallback(messages, { temperature = 0.3, maxTokens = 1024, responseFormat = null } = {}) {
  const client = getGroqClient();
  const configuredModel = process.env.GROQ_MODEL;

  const candidateModels = [];
  if (activeWorkingModel) candidateModels.push(activeWorkingModel);
  if (configuredModel && !candidateModels.includes(configuredModel)) candidateModels.push(configuredModel);
  ['qwen/qwen3.8-27b', 'openai/gpt-oss-120b', 'openai/gpt-oss-20b'].forEach((m) => {
    if (!candidateModels.includes(m)) candidateModels.push(m);
  });

  let lastError = null;
  for (const model of candidateModels) {
    try {
      const params = {
        model,
        messages,
        temperature,
        max_tokens: maxTokens
      };
      if (responseFormat) {
        params.response_format = responseFormat;
      }
      const completion = await client.chat.completions.create(params);
      activeWorkingModel = model;
      return completion.choices[0]?.message?.content || '';
    } catch (err) {
      lastError = err;
      const status = err.status || err.response?.status;
      const msg = err.message || '';
      console.warn(`[Groq Model Warning] Model '${model}' failed (${status || 'error'}: ${msg}). Trying fallback...`);
      // Continue to next model if not found or decommissioned
      if (status === 404 || status === 400 || msg.includes('does not exist')) {
        continue;
      }
      throw err;
    }
  }

  throw lastError || new Error('All Groq candidate models failed.');
}

async function generateJson(prompt, systemPrompt) {
  const messages = [];
  if (systemPrompt) {
    messages.push({ role: 'system', content: systemPrompt });
  }
  messages.push({ role: 'user', content: prompt });

  const rawText = await callGroqWithFallback(messages, {
    temperature: 0.2,
    maxTokens: 1200
  });

  const cleaned = cleanJsonString(rawText);
  try {
    return JSON.parse(cleaned);
  } catch (parseErr) {
    console.error('[ML JSON Parse Error] Raw text was:', rawText);
    throw new Error('ML model returned invalid JSON format.');
  }
}

/**
 * Parses uploaded document (PDF, CSV, TXT) into clean text string.
 */
async function parseDocument(fileBuffer, filename) {
  const ext = path.extname(filename).toLowerCase();

  if (ext === '.csv') {
    const content = fileBuffer.toString('utf-8');
    const lines = content.split(/\r?\n/).filter((l) => l.trim().length > 0);
    if (lines.length === 0) return '';
    const headers = lines[0].split(',').map((h) => h.trim());
    const formatted = [`Columns: ${headers.join(', ')}`];
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',').map((c) => c.trim());
      if (cols.length === headers.length) {
        const row = headers.map((h, idx) => `${h}: ${cols[idx]}`).join('; ');
        formatted.push(`Record ${i}: ${row}`);
      } else {
        formatted.push(`Record ${i}: ${lines[i]}`);
      }
    }
    return formatted.join('\n');
  }

  if (ext === '.pdf') {
    try {
      const { PDFParse } = require('pdf-parse');
      const parser = new PDFParse({ data: fileBuffer });
      if (typeof parser.load === 'function') await parser.load();
      if (typeof parser.getText === 'function') {
        const textResult = await parser.getText();
        if (typeof parser.destroy === 'function') await parser.destroy();
        const extracted = typeof textResult === 'string' ? textResult : (textResult?.text || '');
        if (extracted.trim()) return extracted.trim();
      }
    } catch (pdfErr) {
      console.warn('[PDF Parser Warning] Structured parser fallback:', pdfErr.message);
    }
    // Fallback: extract ASCII printable text from buffer
    const rawStr = fileBuffer.toString('latin1');
    const matches = rawStr.match(/[\x20-\x7E\t\r\n]{4,}/g);
    return matches ? matches.join(' ') : 'Unable to extract text from PDF';
  }

  if (ext === '.txt') {
    return fileBuffer.toString('utf-8');
  }

  throw new Error(`Unsupported file format: ${filename}. Supported formats: .pdf, .csv, .txt`);
}

/**
 * Retrieves the patient's past medical history and uploaded lab reports from Supabase.
 * Supplies RAG context to the clinical AI so it knows what was in files previously uploaded by the patient.
 */
async function getUserMedicalHistoryContext(userId) {
  if (!userId || !db.isConfigured || userId === 9999) return '';

  try {
    const result = await db.query(
      `SELECT source, input_summary, result_json, created_at 
       FROM results 
       WHERE user_id = $1 
       ORDER BY created_at DESC 
       LIMIT 4`,
      [userId]
    );

    if (!result.rows || result.rows.length === 0) return '';

    const entries = [];
    for (const row of result.rows) {
      const dateStr = new Date(row.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      const rJson = typeof row.result_json === 'string' ? JSON.parse(row.result_json) : row.result_json;

      if (row.source === 'upload') {
        const uploadInfo = rJson.uploadedReport || {};
        const filename = uploadInfo.filename || row.input_summary;
        const textSnippet = uploadInfo.extractedText ? uploadInfo.extractedText.slice(0, 1500) : '';
        const topCondition = rJson.predictions?.[0]?.disease || 'Evaluated';
        const riskLevel = rJson.risk?.level || 'Unknown';

        entries.push(
          `[Patient Uploaded Report: ${filename} (Analyzed on ${dateStr})]\n` +
          `- Extracted Biomarkers / Content:\n${textSnippet || 'Lab report content analyzed.'}\n` +
          `- Diagnostic Findings: ${topCondition} (Risk Level: ${riskLevel})`
        );
      } else if (row.source === 'mcq') {
        const topCondition = rJson.predictions?.[0]?.disease || 'Evaluated';
        entries.push(`[Previous MCQ Assessment on ${dateStr}]: Evaluated as ${topCondition} (Risk: ${rJson.risk?.level || 'Low'})`);
      } else if (row.source === 'chat') {
        entries.push(`[Previous Symptom Consultation on ${dateStr}]: ${row.input_summary}`);
      }
    }

    if (entries.length === 0) return '';
    return `--- PATIENT'S MEDICAL HISTORY & UPLOADED LAB REPORTS ---\n` + entries.join('\n\n') + '\n\n';
  } catch (err) {
    console.warn('[RAG Notice] Could not fetch user medical history:', err.message);
    return '';
  }
}

/**
 * Standard disease risk prediction engine.
 */
async function analyzeHealthRisk(userInput, userId = null) {
  if (!userInput || !userInput.trim()) {
    throw new Error('user_input cannot be empty.');
  }

  const userHistoryContext = await getUserMedicalHistoryContext(userId);
  const datasetMatches = diseaseMatcher.findTopMatches(userInput, 6);
  const datasetContext = diseaseMatcher.formatMatchesForPrompt(datasetMatches);

  const systemPrompt = `You are an expert Clinical Decision Support AI. Analyze the provided clinical findings, biomarkers, and symptom descriptions against reference medical knowledge and the 250+ condition dataset.
--- CLINICAL REFERENCE KNOWLEDGE ---
${CLINICAL_KNOWLEDGE_SUMMARY}
${datasetContext}
${userHistoryContext}
You MUST return ONLY a valid JSON object matching the exact schema below.
Do NOT include markdown fences, comments, or pleasantries.
Required JSON schema:
{
  "predictions": [
    {
      "disease": "Disease Name",
      "confidence": "Low" | "Medium" | "High",
      "reason": "Brief clinical rationale based on reported findings"
    }
  ],
  "risk": {
    "level": "Low" | "Medium" | "High",
    "factors": ["List of key clinical or lifestyle risk factors"],
    "precautions": ["List of actionable clinical precautions and lifestyle changes"]
  },
  "disclaimer": "${STANDARD_DISCLAIMER}"
}
Provide exactly up to 3 most probable diseases sorted by descending likelihood.`;

  const userPrompt = `--- PATIENT SYMPTOMS / LAB REPORT DATA ---
${userInput.trim()}

Please provide your structured clinical assessment in valid JSON.`;

  let result = await generateJson(userPrompt, systemPrompt);
  if (!result || typeof result !== 'object') {
    result = {};
  }

  // Schema normalization
  const rawPredictions = Array.isArray(result.predictions) ? result.predictions : [];
  const normalizedPredictions = rawPredictions.slice(0, 3).map((item) => {
    let conf = item.confidence || 'Medium';
    if (!['Low', 'Medium', 'High'].includes(conf)) conf = 'Medium';
    return {
      disease: String(item.disease || 'Undifferentiated Clinical Profile'),
      confidence: conf,
      reason: String(item.reason || 'Symptom correlation identified.')
    };
  });

  if (normalizedPredictions.length === 0) {
    normalizedPredictions.push({
      disease: 'Undifferentiated Symptom Presentation',
      confidence: 'Low',
      reason: 'General symptom indicators observed. Requires professional diagnostic evaluation.'
    });
  }

  const rawRisk = result.risk || {};
  let riskLevel = rawRisk.level || 'Low';
  if (!['Low', 'Medium', 'High'].includes(riskLevel)) riskLevel = 'Low';

  const riskFactors = Array.isArray(rawRisk.factors) && rawRisk.factors.length > 0
    ? rawRisk.factors.map(String)
    : ['Non-specific symptom onset reported'];

  const precautions = Array.isArray(rawRisk.precautions) && rawRisk.precautions.length > 0
    ? rawRisk.precautions.map(String)
    : [
        'Monitor temperature, hydration, and symptom intensity closely.',
        'Schedule a clinical consultation if symptoms persist or intensify.',
        'Seek immediate emergency care for shortness of breath or sudden chest pain.'
      ];

  return {
    predictions: normalizedPredictions,
    risk: {
      level: riskLevel,
      factors: riskFactors,
      precautions: precautions
    },
    disclaimer: STANDARD_DISCLAIMER
  };
}

/**
 * AI Chat Assistant endpoint logic.
 */
async function chat(message, history = [], userId = null) {
  if (!message || !message.trim()) {
    throw new Error('Message text cannot be empty.');
  }

  const userHistoryContext = await getUserMedicalHistoryContext(userId);
  const datasetMatches = diseaseMatcher.findTopMatches(message, 5);
  const datasetContext = diseaseMatcher.formatMatchesForPrompt(datasetMatches);

  const systemPrompt = `You are an empathetic, highly knowledgeable Clinical Health AI assistant for a disease risk analysis platform.
--- CLINICAL REFERENCE KNOWLEDGE ---
${CLINICAL_KNOWLEDGE_SUMMARY}
${datasetContext}
${userHistoryContext}
Clinical Communication Guidelines:
1. Listen attentively to the user's reported symptoms, onset, and severity.
2. Cross-reference symptoms against clinical knowledge to identify potential conditions.
3. If the patient has previously uploaded lab reports or records shown in the medical history above, refer to their specific biomarkers, numbers, or report findings when relevant, or when the patient asks about their uploaded file or past assessments.
4. Format your response clearly so the patient can easily understand:
   - **Assessment & Potential Conditions**: Explain possible medical causes in clear, compassionate language.
   - **Estimated Risk Level**: State whether the reported profile appears Low Risk, Moderate/Medium Risk, or High Risk, explaining why.
   - **Clinical Inquiries**: Ask 1-2 focused follow-up questions to help refine the assessment.
   - **Recommended Next Steps & Precautions**: Practical lifestyle, hydration, or medical consultation advice.
5. STRICT FORMATTING RULE: Never use markdown hashtag headers (never write "#", "##", "###", or "####"). Always use bold titles (e.g., **Assessment & Potential Conditions:**) and clean bullet points instead.
6. Disclaimer: ${STANDARD_DISCLAIMER}
Keep your formatting clean, structured, and easy for any client to read.`;

  const messages = [{ role: 'system', content: systemPrompt }];
  if (Array.isArray(history)) {
    const recentHistory = history.slice(-6);
    for (const msg of recentHistory) {
      if (msg.role && msg.content) {
        messages.push({ role: msg.role === 'assistant' ? 'assistant' : 'user', content: String(msg.content) });
      }
    }
  }
  messages.push({ role: 'user', content: message.trim() });

  const rawReply = await callGroqWithFallback(messages, { temperature: 0.4, maxTokens: 800 });
  // Cleanly strip any stray markdown hashtags (e.g. ### Assessment -> Assessment)
  const reply = rawReply ? String(rawReply).replace(/^#{1,6}\s*/gm, '') : '';
  return { reply };
}


/**
 * AI Chat Risk Analysis logic.
 */
async function analyzeChat(history = [], userId = null) {
  if (!Array.isArray(history) || history.length === 0) {
    throw new Error('No conversation history to analyze.');
  }
  const userStatements = history.filter((m) => m.role === 'user').map((m) => m.content);
  if (userStatements.length === 0) {
    throw new Error('No patient symptoms recorded in conversation.');
  }
  const summary = 'Patient Consultation Transcript:\n' + userStatements.map((s) => `- ${s}`).join('\n');
  return analyzeHealthRisk(summary, userId);
}

/**
 * Adaptive MCQ Next Question logic.
 */
async function getNextMcq(step = 1, answers = [], userId = null) {
  const totalSteps = 8;
  const currentStep = typeof step === 'number' ? step : 1;

  if (currentStep > totalSteps) {
    return { question: '', options: [], done: true, step: currentStep, totalSteps };
  }

  let historySummary = '';
  if (Array.isArray(answers) && answers.length > 0) {
    historySummary = answers.map((a) => `- Q: ${a.question} -> Selected: ${a.answer}`).join('\n');
  }

  const prompt = `You are conducting an adaptive multiple-choice clinical symptom assessment.
Current question step: ${currentStep} of ${totalSteps}.
Patient answers so far:
${historySummary || 'No answers yet (First Question).'}

Generate the next clinically relevant symptom question to narrow down potential disorders.
Requirements:
- Question must be clear and focus on specific symptoms or risk factors.
- Provide EXACTLY 4 distinct, clinical symptom choices PLUS 'None of these' as the 5th option.
- Return ONLY a JSON object with this exact format:
{
  "question": "Question text here?",
  "options": ["Option 1", "Option 2", "Option 3", "Option 4", "None of these"],
  "done": false
}`;

  try {
    const response = await generateJson(
      prompt,
      'You generate adaptive clinical multiple-choice questions. Return strict JSON only.'
    );
    let question = response?.question;
    let options = Array.isArray(response?.options) ? response.options : [];

    if (!question || options.length < 4) {
      throw new Error('Malformed MCQ output');
    }

    if (!options.includes('None of these')) {
      options = options.slice(0, 4);
      options.push('None of these');
    }

    return {
      step: currentStep,
      totalSteps,
      question,
      options: options.slice(0, 5),
      done: false
    };
  } catch (err) {
    const fallbackIdx = Math.min(currentStep - 1, FALLBACK_MCQ_BANK.length - 1);
    const fallbackItem = FALLBACK_MCQ_BANK[fallbackIdx];
    return {
      step: currentStep,
      totalSteps,
      question: fallbackItem.question,
      options: fallbackItem.options,
      done: false
    };
  }
}

/**
 * MCQ Result Synthesis logic.
 */
async function analyzeMcqResult(answers = [], userId = null) {
  if (!Array.isArray(answers) || answers.length === 0) {
    throw new Error('No answers provided for MCQ evaluation.');
  }

  const formattedAnswers = answers
    .filter((item) => item.answer && item.answer !== 'None of these')
    .map((item) => `Question: ${item.question}\nPatient Answer: ${item.answer}`);

  const summary =
    'Patient Multiple Choice Symptom Questionnaire Summary:\n' +
    (formattedAnswers.length > 0
      ? formattedAnswers.join('\n\n')
      : "Patient answered 'None of these' to all symptom inquiries.");

  return analyzeHealthRisk(summary, userId);
}

module.exports = {
  STANDARD_DISCLAIMER,
  parseDocument,
  analyzeHealthRisk,
  chat,
  analyzeChat,
  getNextMcq,
  analyzeMcqResult
};
