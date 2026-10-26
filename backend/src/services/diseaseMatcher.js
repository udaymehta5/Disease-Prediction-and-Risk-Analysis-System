const fs = require('fs');
const path = require('path');

// Load compiled disease knowledge dataset derived from database/data.csv and database/final_symptoms_to_disease.csv
let diseasesData = null;
try {
  const datasetPath = path.resolve(__dirname, '../data/diseasesDataset.json');
  if (fs.existsSync(datasetPath)) {
    diseasesData = JSON.parse(fs.readFileSync(datasetPath, 'utf-8'));
    console.log(`[Disease Matcher] Loaded ${Object.keys(diseasesData).length} conditions from dataset.`);
  }
} catch (err) {
  console.warn('[Disease Matcher Warning] Could not load compiled dataset:', err.message);
  diseasesData = {};
}

/**
 * Normalizes input text into clean lowercase token array.
 */
function tokenize(text) {
  if (!text || typeof text !== 'string') return [];
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2);
}

/**
 * Searches the 254-disease dataset for candidates matching the input symptoms or text.
 * Calculates score based on symptom co-occurrence and keyword overlap.
 * 
 * @param {string} userInput - Symptoms or extracted text from patient
 * @param {number} topK - Number of top candidate diseases to return (default: 5)
 * @returns {Array<{disease: string, category: string, matchedSymptoms: string[], score: number}>}
 */
function findTopMatches(userInput, topK = 5) {
  if (!userInput || !diseasesData) return [];

  const inputLower = userInput.toLowerCase();
  const inputTokens = new Set(tokenize(userInput));
  const results = [];

  for (const [diseaseKey, info] of Object.entries(diseasesData)) {
    let matchScore = 0;
    const matchedSymptoms = [];

    // Check direct disease name occurrence
    if (inputLower.includes(diseaseKey)) {
      matchScore += 10;
    }

    // Check symptom matches
    for (const symptom of info.symptoms) {
      const symLower = symptom.toLowerCase();
      // Multi-word phrase exact match
      if (inputLower.includes(symLower)) {
        matchScore += 3.0;
        matchedSymptoms.push(symptom);
      } else {
        // Token level overlap
        const symTokens = symLower.split(/\s+/);
        const matchCount = symTokens.filter((t) => inputTokens.has(t)).length;
        if (matchCount >= 2 && matchCount === symTokens.length) {
          matchScore += 2.0;
          matchedSymptoms.push(symptom);
        } else if (matchCount >= 1 && symTokens.length <= 2) {
          matchScore += 0.8;
          matchedSymptoms.push(symptom);
        }
      }
    }

    if (matchScore > 0) {
      results.push({
        disease: info.name,
        key: diseaseKey,
        category: info.category,
        matchedSymptoms: [...new Set(matchedSymptoms)],
        score: Number(matchScore.toFixed(2))
      });
    }
  }

  // Sort descending by match score
  results.sort((a, b) => b.score - a.score);
  return results.slice(0, topK);
}

/**
 * Formats top dataset matches as context string for LLM prompting.
 */
function formatMatchesForPrompt(matches) {
  if (!matches || matches.length === 0) return '';
  const lines = ['--- RELEVANT CANDIDATES IDENTIFIED FROM 250+ CLINICAL DATASET ---'];
  for (const m of matches) {
    const syms = m.matchedSymptoms.length > 0 ? m.matchedSymptoms.join(', ') : 'correlated pattern';
    lines.push(`• ${m.disease} (${m.category}) — Correlated symptoms: ${syms}`);
  }
  return lines.join('\n') + '\n\n';
}

module.exports = {
  findTopMatches,
  formatMatchesForPrompt,
  getDataset: () => diseasesData
};
