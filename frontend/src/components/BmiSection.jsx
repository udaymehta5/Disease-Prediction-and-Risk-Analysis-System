import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from './Container';
import Card from './Card';
import Button from './Button';
import SectionHeading from './SectionHeading';
import './BmiSection.css';

// Clinical reference categories & thresholds based on WHO standards
const BMI_CATEGORIES = {
  UNDERWEIGHT: {
    key: 'underweight',
    label: 'Underweight',
    range: '< 18.5',
    color: '#2980B9',
    bgColor: 'rgba(41, 128, 185, 0.12)',
    borderColor: '#2980B9',
    severity: 'Noticeable Nutritional Risk',
    badgeClass: 'badge-underweight',
    summary: 'Your body mass is below the optimal clinical range. This may reflect inadequate caloric intake, high metabolic burn, or underlying nutritional deficiencies.',
    risks: [
      {
        title: 'Immunological Vulnerability',
        desc: 'Suppressed immune response leading to prolonged recovery times and heightened susceptibility to common infections.'
      },
      {
        title: 'Osteopenia & Fragility',
        desc: 'Reduced bone mineral density and elevated lifetime risk of early osteoporosis or stress fractures.'
      },
      {
        title: 'Nutritional Anemia & Fatigue',
        desc: 'Frequent iron, ferritin, and B12 deficits causing chronic fatigue, dizziness, and low physical stamina.'
      },
      {
        title: 'Hormonal & Muscle Loss',
        desc: 'Depleted lean mass (sarcopenia) and possible endocrine disruptions affecting metabolism and repair.'
      }
    ],
    factors: [
      'Serum ferritin, iron panel, and Vitamin B12 levels',
      'Daily protein synthesis & macronutrient balance (minimum 1.2–1.6 g/kg)',
      'Bone mineral density (DEXA scan) if prolonged underweight',
      'Thyroid screening (TSH/Free T4) to rule out hyperthyroidism'
    ],
    goals: [
      {
        icon: '🥑',
        title: 'Caloric Quality Surplus',
        target: 'Incorporate 300–500 kcal/day of nutrient-dense whole foods (avocados, nuts, whole eggs, seeds, cold-pressed oils) without relying on ultra-processed sugars.'
      },
      {
        icon: '🏋️',
        title: 'Hypertrophic Resistance Training',
        target: 'Engage in 3 weekly progressive compound lifting sessions (squats, rows, presses) to convert excess calories into functional lean muscle mass.'
      },
      {
        icon: '🥩',
        title: 'Regular Protein Intake',
        target: 'Distribute 25–35g of bioavailable protein across 3–4 meals daily to support muscular repair and enzymatic synthesis.'
      },
      {
        icon: '🩺',
        title: 'Clinical Deficiency Screen',
        target: 'Schedule a basic metabolic panel and complete blood count (CBC) with your physician to evaluate absorption.'
      }
    ]
  },

  NORMAL: {
    key: 'normal',
    label: 'Normal (Healthy Weight)',
    range: '18.5 – 24.9',
    color: '#3E9B4F',
    bgColor: 'rgba(62, 155, 79, 0.12)',
    borderColor: '#3E9B4F',
    severity: 'Optimal Biometric Baseline',
    badgeClass: 'badge-normal',
    summary: 'Congratulations! Your BMI sits within the clinically recommended healthy weight spectrum, associated with the lowest statistical risk of chronic cardiovascular and metabolic conditions.',
    risks: [
      {
        title: 'Normal Baseline Risk',
        desc: 'Your risk for cardiovascular disease, Type 2 diabetes, and stroke is statistically low based on mass-to-height ratio.'
      },
      {
        title: 'Normal Weight Obesity Watch',
        desc: 'Be mindful of "skinny fat" syndrome (low BMI with hidden visceral adiposity) — body composition and fitness matter as much as scale weight.'
      },
      {
        title: 'Sedentary Lifestyle Trap',
        desc: 'A normal BMI does not grant immunity from high cholesterol or elevated blood pressure if physical activity is neglected.'
      }
    ],
    factors: [
      'Visceral adiposity & waist-to-height ratio (< 0.5 is optimal)',
      'Fasting glucose (< 100 mg/dL) & lipid panel (HDL > 50 mg/dL)',
      'Resting arterial blood pressure (< 120/80 mmHg)',
      'Resting heart rate (< 70 bpm for cardiovascular efficiency)'
    ],
    goals: [
      {
        icon: '🎯',
        title: 'Maintain Weight Consistency',
        target: 'Aim to keep your scale weight within a tight 2–3 kg variance across seasons by stabilizing weekly energy expenditure.'
      },
      {
        icon: '🏃',
        title: '150 Mins/Week Cardiovascular Baseline',
        target: 'Hit at least 150 minutes of moderate aerobic conditioning (brisk walking, cycling, swimming, jogging) or 75 minutes vigorous exercise.'
      },
      {
        icon: '💪',
        title: 'Preserve Lean Muscle & Bone Mass',
        target: '2–3 strength training sessions per week to protect against age-related sarcopenia and maintain high metabolic insulin sensitivity.'
      },
      {
        icon: '🥗',
        title: 'Anti-Inflammatory Nutrition',
        target: 'Emphasize leafy greens, cruciferous vegetables, polyphenol-rich fruits, omega-3 fatty acids, and clean hydration (2.5L daily).'
      },
      {
        icon: '🩺',
        title: 'Annual Preventative Bloodwork',
        target: 'Conduct annual checkups of HbA1c, fasting lipids, and kidney/liver functions to verify internal cellular health matches your outer healthy BMI.'
      }
    ]
  },

  OVERWEIGHT: {
    key: 'overweight',
    label: 'Overweight (Pre-Obese)',
    range: '25.0 – 29.9',
    color: '#D47E16',
    bgColor: 'rgba(212, 126, 22, 0.12)',
    borderColor: '#D47E16',
    severity: 'Mild to Moderate Risk Gradient',
    badgeClass: 'badge-overweight',
    summary: 'Your body mass is moderately higher than standard clinical guidelines for your height. Early proactive adjustments can prevent progression into clinical obesity.',
    risks: [
      {
        title: 'Insulin Resistance & Pre-Diabetes',
        desc: 'Increased visceral fat deposits diminish peripheral tissue sensitivity to insulin, gradually elevating fasting glucose.'
      },
      {
        title: 'Borderline Hypertension',
        desc: 'Greater circulatory volume and vascular resistance can elevate systolic/diastolic blood pressure above 125/85 mmHg.'
      },
      {
        title: 'Atherogenic Dyslipidemia',
        desc: 'Higher likelihood of elevated LDL, oxidized small-dense particles, high triglycerides, and suppressed protective HDL.'
      },
      {
        title: 'Joint Cartilage Strain',
        desc: 'Every additional kilogram exerts approximately 4 kilograms of mechanical compression across the knees and lower lumbar spine.'
      }
    ],
    factors: [
      'HbA1c & Fasting Insulin (early detection of insulin resistance)',
      'Continuous blood pressure monitoring (morning and evening readings)',
      'Waist circumference (aim for < 94 cm in men, < 80 cm in women)',
      'Serum ALT/AST levels to monitor early hepatic steatosis (fatty liver)'
    ],
    goals: [
      {
        icon: '📉',
        title: 'Target 5–7% Sustainable Reduction',
        target: 'Clinically proven to reverse pre-diabetes markers. Focus on a modest, steady reduction of 0.5 kg (1 lb) per week rather than restrictive crash diets.'
      },
      {
        icon: '🚶',
        title: '8,000–10,000 Daily Steps Baseline',
        target: 'Break up sedentary work periods with 5-minute brisk walking breaks every hour to enhance postprandial glucose clearance.'
      },
      {
        icon: '🥦',
        title: 'High-Fiber Plate Architecture',
        target: 'Dedicate 50% of lunch and dinner plates to non-starchy vegetables; reduce refined flours and eliminate sugary liquid beverages completely.'
      },
      {
        icon: '💤',
        title: '7–8 Hours Quality Circadian Sleep',
        target: 'Sleep deprivation spikes ghrelin (hunger hormone) by up to 28% and elevates morning cortisol, directly promoting visceral belly fat storage.'
      }
    ]
  },

  OBESE_1: {
    key: 'obese1',
    label: 'Obese Class I (Moderate)',
    range: '30.0 – 34.9',
    color: '#E05338',
    bgColor: 'rgba(224, 83, 56, 0.12)',
    borderColor: '#E05338',
    severity: 'High Clinical Risk',
    badgeClass: 'badge-obese1',
    summary: 'Your BMI is in Class I Obesity. Substantial clinical research correlates this tier with heightened metabolic, cardiovascular, and respiratory conditions that merit structured medical consultation.',
    risks: [
      {
        title: 'Type 2 Diabetes Mellitus',
        desc: 'Significant clinical elevation in the lifetime risk of beta-cell exhaustion and diabetic microvascular complications.'
      },
      {
        title: 'Coronary Artery Disease & Stroke',
        desc: 'Chronic vascular endothelial inflammation and accelerated arterial plaque deposition.'
      },
      {
        title: 'Obstructive Sleep Apnea (OSA)',
        desc: 'Pharyngeal soft tissue mass causing intermittent nocturnal hypoxia, loud snoring, and chronic daytime lethargy.'
      },
      {
        title: 'Non-Alcoholic Fatty Liver Disease (NAFLD)',
        desc: 'Ectopic triglyceride accumulation in hepatocytes, progressing from simple steatosis to chronic NASH.'
      }
    ],
    factors: [
      'Comprehensive Cardiometabolic Panel (hs-CRP, ApoB, Lipid panel, HbA1c)',
      'Liver ultrasound or FibroScan for steatosis assessment',
      'Overnight polysomnography if experiencing morning headaches or snoring',
      'Renal microalbumin-to-creatinine ratio'
    ],
    goals: [
      {
        icon: '🩺',
        title: 'Structured Medical Partnership',
        target: 'Partner with a primary care physician or registered dietitian for an individualized nutrition and biomarker management plan.'
      },
      {
        icon: '🏊',
        title: 'Low-Impact Joint-Safe Aerobics',
        target: 'Begin with swimming, recumbent cycling, or elliptical workouts 4x weekly for 30 minutes to protect knee and hip cartilage.'
      },
      {
        icon: '🥗',
        title: 'Whole-Food Caloric Rebalance',
        target: 'Target a consistent 500 kcal deficit using volumetric eating (high water/fiber foods like soups, leafy salads, legumes, and lean proteins).'
      },
      {
        icon: '📊',
        title: 'Consistent Weekly Logging',
        target: 'Track waist measurements, resting blood pressure, and energy levels weekly rather than obsessing over day-to-day scale fluctuations.'
      }
    ]
  },

  OBESE_2: {
    key: 'obese2',
    label: 'Obese Class II & III (Severe)',
    range: '≥ 35.0',
    color: '#C0392B',
    bgColor: 'rgba(192, 57, 43, 0.14)',
    borderColor: '#C0392B',
    severity: 'Very High / Urgent Clinical Risk',
    badgeClass: 'badge-obese2',
    summary: 'Your BMI indicates severe body mass excess. This classification presents immediate cardiometabolic strain and warrants a comprehensive medical health evaluation with your physician.',
    risks: [
      {
        title: 'Cardiovascular & Vascular Overload',
        desc: 'Greatly increased risk of congestive heart failure, venous thromboembolism, and premature atherosclerotic events.'
      },
      {
        title: 'Severe Metabolic Syndrome',
        desc: 'Clustering of severe hyperglycemia, hypertriglyceridemia, central adiposity, and systemic inflammatory cytokines.'
      },
      {
        title: 'Severe Osteoarthritis & Immobility',
        desc: 'Progressive cartilage wear in load-bearing joints accompanied by chronic back and knee inflammation.'
      },
      {
        title: 'Respiratory Hypoventilation',
        desc: 'Compromised chest wall mechanics and nocturnal hypoxemia placing stress on pulmonary vasculature.'
      }
    ],
    factors: [
      'Echocardiogram and resting ECG to assess cardiac geometry & wall stress',
      'Full endocrine workup (cortisol, thyroid, fasting insulin, HbA1c)',
      'Comprehensive metabolic and renal panel (eGFR, BUN, electrolytes)',
      'Bilateral lower extremity vascular check for venous insufficiency'
    ],
    goals: [
      {
        icon: '🏥',
        title: 'Multidisciplinary Clinical Care',
        target: 'Work with a clinical team specializing in bariatric medicine, cardiology, and nutritional therapy to build a supervised intervention plan.'
      },
      {
        icon: '🚶',
        title: 'Supervised Mobility Routine',
        target: 'Start with 10–15 minute supported walking or warm-water hydrotherapy sessions twice daily, focusing on cardiovascular safety.'
      },
      {
        icon: '🥣',
        title: 'Eliminate Ultra-Processed Foods',
        target: 'Replace fast foods, deep-fried items, and high-sodium foods with simple, home-cooked single-ingredient meals.'
      },
      {
        icon: '🤝',
        title: 'Mental Health & Support Network',
        target: 'Connect with a certified behavioral health coach or community support group to build lasting emotional and lifestyle resilience.'
      }
    ]
  }
};

function BmiSection() {
  const navigate = useNavigate();

  // Unit system toggle: 'metric' (cm / kg) or 'imperial' (ft+in / lbs)
  const [unitSystem, setUnitSystem] = useState('metric');

  // Metric state
  const [heightCm, setHeightCm] = useState(172);
  const [weightKg, setWeightKg] = useState(68);

  // Imperial state
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(8);
  const [weightLbs, setWeightLbs] = useState(150);

  // Optional demographic fields
  const [gender, setGender] = useState('unspecified');
  const [ageGroup, setAgeGroup] = useState('adult');

  // Handle unit system change while converting values
  const handleUnitToggle = (system) => {
    if (system === unitSystem) return;
    if (system === 'imperial') {
      // Metric -> Imperial
      const totalInches = heightCm / 2.54;
      const ft = Math.floor(totalInches / 12);
      const inches = Math.round(totalInches % 12);
      const lbs = Math.round(weightKg * 2.20462);
      setHeightFt(Math.max(3, Math.min(8, ft)));
      setHeightIn(inches === 12 ? 0 : inches);
      setWeightLbs(Math.max(40, Math.min(600, lbs)));
    } else {
      // Imperial -> Metric
      const totalInches = heightFt * 12 + heightIn;
      const cm = Math.round(totalInches * 2.54);
      const kg = Math.round(weightLbs / 2.20462);
      setHeightCm(Math.max(90, Math.min(250, cm)));
      setWeightKg(Math.max(25, Math.min(300, kg)));
    }
    setUnitSystem(system);
  };

  // Preset loaders for quick exploration
  const applyPreset = (presetType) => {
    if (unitSystem === 'metric') {
      if (presetType === 'underweight') { setHeightCm(175); setWeightKg(52); }
      if (presetType === 'normal') { setHeightCm(175); setWeightKg(68); }
      if (presetType === 'overweight') { setHeightCm(175); setWeightKg(84); }
      if (presetType === 'obese') { setHeightCm(175); setWeightKg(102); }
    } else {
      if (presetType === 'underweight') { setHeightFt(5); setHeightIn(9); setWeightLbs(115); }
      if (presetType === 'normal') { setHeightFt(5); setHeightIn(9); setWeightLbs(150); }
      if (presetType === 'overweight') { setHeightFt(5); setHeightIn(9); setWeightLbs(185); }
      if (presetType === 'obese') { setHeightFt(5); setHeightIn(9); setWeightLbs(225); }
    }
  };

  // Compute calculated metrics
  const analysis = useMemo(() => {
    let heightInMeters = 0;
    let weightInKg = 0;

    if (unitSystem === 'metric') {
      heightInMeters = heightCm / 100;
      weightInKg = weightKg;
    } else {
      const totalInches = (Number(heightFt) || 0) * 12 + (Number(heightIn) || 0);
      heightInMeters = (totalInches * 2.54) / 100;
      weightInKg = (Number(weightLbs) || 0) / 2.20462;
    }

    if (heightInMeters <= 0 || weightInKg <= 0) {
      return null;
    }

    const bmiVal = weightInKg / (heightInMeters * heightInMeters);
    const bmi = Number(bmiVal.toFixed(1));

    // Determine category
    let category = BMI_CATEGORIES.NORMAL;
    if (bmi < 18.5) {
      category = BMI_CATEGORIES.UNDERWEIGHT;
    } else if (bmi < 25.0) {
      category = BMI_CATEGORIES.NORMAL;
    } else if (bmi < 30.0) {
      category = BMI_CATEGORIES.OVERWEIGHT;
    } else if (bmi < 35.0) {
      category = BMI_CATEGORIES.OBESE_1;
    } else {
      category = BMI_CATEGORIES.OBESE_2;
    }

    // Healthy weight range for this height (BMI 18.5 - 24.9)
    const minHealthyKg = 18.5 * (heightInMeters * heightInMeters);
    const maxHealthyKg = 24.9 * (heightInMeters * heightInMeters);

    let healthyRangeText = '';
    let weightDiffText = '';
    let weightDiffStatus = 'optimal';

    if (unitSystem === 'metric') {
      healthyRangeText = `${minHealthyKg.toFixed(1)} kg – ${maxHealthyKg.toFixed(1)} kg`;
      if (weightInKg < minHealthyKg) {
        const diff = (minHealthyKg - weightInKg).toFixed(1);
        weightDiffText = `${diff} kg below healthy baseline`;
        weightDiffStatus = 'under';
      } else if (weightInKg > maxHealthyKg) {
        const diff = (weightInKg - maxHealthyKg).toFixed(1);
        weightDiffText = `${diff} kg above healthy baseline`;
        weightDiffStatus = 'over';
      } else {
        weightDiffText = 'Within optimal healthy spectrum';
        weightDiffStatus = 'optimal';
      }
    } else {
      const minHealthyLbs = minHealthyKg * 2.20462;
      const maxHealthyLbs = maxHealthyKg * 2.20462;
      healthyRangeText = `${minHealthyLbs.toFixed(1)} lbs – ${maxHealthyLbs.toFixed(1)} lbs`;
      const currentLbs = weightInKg * 2.20462;
      if (currentLbs < minHealthyLbs) {
        const diff = (minHealthyLbs - currentLbs).toFixed(1);
        weightDiffText = `${diff} lbs below healthy baseline`;
        weightDiffStatus = 'under';
      } else if (currentLbs > maxHealthyLbs) {
        const diff = (currentLbs - maxHealthyLbs).toFixed(1);
        weightDiffText = `${diff} lbs above healthy baseline`;
        weightDiffStatus = 'over';
      } else {
        weightDiffText = 'Within optimal healthy spectrum';
        weightDiffStatus = 'optimal';
      }
    }

    // Needle position on the gauge: 12 (min) to 42 (max)
    const clampBmi = Math.max(12, Math.min(42, bmi));
    const gaugePercent = ((clampBmi - 12) / (42 - 12)) * 100;

    return {
      bmi,
      category,
      healthyRangeText,
      weightDiffText,
      weightDiffStatus,
      gaugePercent
    };
  }, [unitSystem, heightCm, weightKg, heightFt, heightIn, weightLbs]);

  // Navigate to AI consultation with contextual health summary including height, weight, and calculated BMI
  const handleConsultDoctor = () => {
    if (!analysis) return;
    const heightText = unitSystem === 'metric'
      ? `${heightCm} cm`
      : `${heightFt} ft ${heightIn} in`;
    const weightText = unitSystem === 'metric'
      ? `${weightKg} kg`
      : `${weightLbs} lbs`;

    const prompt = `Hello doctor, my height is ${heightText} and my weight is ${weightText}, which results in a BMI of ${analysis.bmi} (${analysis.category.label}). Could you please advise me on my cardiovascular and metabolic health risks, and suggest what specific diet, lifestyle, and exercise goals I should follow?`;

    navigate('/chat', { state: { initialPrompt: prompt } });
  };

  return (
    <section className="section-padding bmi-section-wrapper" id="bmi">
      <Container>
        <SectionHeading
          number="04"
          title="BMI"
          subtitle="Input your height and weight to calculate your Body Mass Index, identify correlated health risks, and review evidence-based consistent goals."
        />

        {/* Preset Quick Chips Bar */}
        <div className="bmi-presets-row">
          <span className="presets-label">Explore sample profiles:</span>
          <button
            type="button"
            className="bmi-preset-chip"
            onClick={() => applyPreset('underweight')}
          >
            📉 Underweight (17.0)
          </button>
          <button
            type="button"
            className="bmi-preset-chip"
            onClick={() => applyPreset('normal')}
          >
            🌿 Optimal Healthy (22.2)
          </button>
          <button
            type="button"
            className="bmi-preset-chip"
            onClick={() => applyPreset('overweight')}
          >
            ⚠️ Overweight (27.4)
          </button>
          <button
            type="button"
            className="bmi-preset-chip"
            onClick={() => applyPreset('obese')}
          >
            🚨 Class I Obesity (33.3)
          </button>
        </div>

        {/* Main Interactive Split Card */}
        <div className="bmi-main-grid">
          {/* Left Column: Biometric Inputs */}
          <Card className="bmi-input-card">
            <div className="bmi-card-header">
              <div className="bmi-card-title-group">
                <span className="bmi-card-tag">Interactive Calculator</span>
                <h3 className="bmi-card-title">Enter Your Biometrics</h3>
              </div>

              {/* Unit System Switcher */}
              <div className="unit-toggle-pill" role="group" aria-label="Measurement Unit System">
                <button
                  type="button"
                  className={`unit-toggle-btn ${unitSystem === 'metric' ? 'active' : ''}`}
                  onClick={() => handleUnitToggle('metric')}
                >
                  Metric (cm / kg)
                </button>
                <button
                  type="button"
                  className={`unit-toggle-btn ${unitSystem === 'imperial' ? 'active' : ''}`}
                  onClick={() => handleUnitToggle('imperial')}
                >
                  Imperial (ft / lbs)
                </button>
              </div>
            </div>

            <div className="bmi-form-body">
              {/* Height Input */}
              {unitSystem === 'metric' ? (
                <div className="bmi-field-group">
                  <div className="bmi-field-label-row">
                    <label htmlFor="height-cm">Height</label>
                    <span className="bmi-field-val-badge mono-num">{heightCm} cm</span>
                  </div>
                  <div className="bmi-input-with-slider">
                    <input
                      id="height-cm"
                      type="number"
                      min="90"
                      max="250"
                      value={heightCm}
                      onChange={(e) => setHeightCm(Math.max(50, Math.min(250, Number(e.target.value) || 0)))}
                      className="bmi-number-input"
                    />
                    <input
                      type="range"
                      min="120"
                      max="220"
                      value={heightCm}
                      onChange={(e) => setHeightCm(Number(e.target.value))}
                      className="bmi-range-slider"
                      aria-label="Height in centimeters"
                    />
                  </div>
                </div>
              ) : (
                <div className="bmi-field-group">
                  <div className="bmi-field-label-row">
                    <label>Height</label>
                    <span className="bmi-field-val-badge mono-num">{heightFt} ft {heightIn} in</span>
                  </div>
                  <div className="bmi-dual-inputs">
                    <div className="dual-input-item">
                      <input
                        type="number"
                        min="3"
                        max="8"
                        value={heightFt}
                        onChange={(e) => setHeightFt(Math.max(3, Math.min(8, Number(e.target.value) || 0)))}
                        className="bmi-number-input"
                      />
                      <span className="input-unit-sub">Feet</span>
                    </div>
                    <div className="dual-input-item">
                      <input
                        type="number"
                        min="0"
                        max="11"
                        value={heightIn}
                        onChange={(e) => setHeightIn(Math.max(0, Math.min(11, Number(e.target.value) || 0)))}
                        className="bmi-number-input"
                      />
                      <span className="input-unit-sub">Inches</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Weight Input */}
              {unitSystem === 'metric' ? (
                <div className="bmi-field-group">
                  <div className="bmi-field-label-row">
                    <label htmlFor="weight-kg">Body Weight</label>
                    <span className="bmi-field-val-badge mono-num">{weightKg} kg</span>
                  </div>
                  <div className="bmi-input-with-slider">
                    <input
                      id="weight-kg"
                      type="number"
                      min="25"
                      max="300"
                      value={weightKg}
                      onChange={(e) => setWeightKg(Math.max(20, Math.min(300, Number(e.target.value) || 0)))}
                      className="bmi-number-input"
                    />
                    <input
                      type="range"
                      min="35"
                      max="160"
                      value={weightKg}
                      onChange={(e) => setWeightKg(Number(e.target.value))}
                      className="bmi-range-slider"
                      aria-label="Weight in kilograms"
                    />
                  </div>
                </div>
              ) : (
                <div className="bmi-field-group">
                  <div className="bmi-field-label-row">
                    <label htmlFor="weight-lbs">Body Weight</label>
                    <span className="bmi-field-val-badge mono-num">{weightLbs} lbs</span>
                  </div>
                  <div className="bmi-input-with-slider">
                    <input
                      id="weight-lbs"
                      type="number"
                      min="50"
                      max="600"
                      value={weightLbs}
                      onChange={(e) => setWeightLbs(Math.max(40, Math.min(600, Number(e.target.value) || 0)))}
                      className="bmi-number-input"
                    />
                    <input
                      type="range"
                      min="80"
                      max="350"
                      value={weightLbs}
                      onChange={(e) => setWeightLbs(Number(e.target.value))}
                      className="bmi-range-slider"
                      aria-label="Weight in pounds"
                    />
                  </div>
                </div>
              )}

              {/* Demographics Row (Optional context) */}
              <div className="bmi-demographics-row">
                <div className="demo-select-group">
                  <label htmlFor="bmi-gender">Biological Sex</label>
                  <select
                    id="bmi-gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="bmi-select"
                  >
                    <option value="unspecified">Standard Clinical Reference</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                </div>

                <div className="demo-select-group">
                  <label htmlFor="bmi-age">Age Bracket</label>
                  <select
                    id="bmi-age"
                    value={ageGroup}
                    onChange={(e) => setAgeGroup(e.target.value)}
                    className="bmi-select"
                  >
                    <option value="adult">Adult (18 – 64 yrs)</option>
                    <option value="senior">Senior (65+ yrs)</option>
                    <option value="young">Young Adult (18 – 24 yrs)</option>
                  </select>
                </div>
              </div>

              {/* Reset to Standard Defaults */}
              <div className="bmi-form-footer">
                <button
                  type="button"
                  className="bmi-reset-btn"
                  onClick={() => {
                    if (unitSystem === 'metric') {
                      setHeightCm(172);
                      setWeightKg(68);
                    } else {
                      setHeightFt(5);
                      setHeightIn(8);
                      setWeightLbs(150);
                    }
                  }}
                >
                  ↺ Reset values
                </button>
                <span className="bmi-calc-note">Calculated in real-time via WHO standards</span>
              </div>
            </div>
          </Card>

          {/* Right Column: Score Readout & Spectrum Gauge */}
          {analysis && (
            <Card className="bmi-result-card" style={{ borderColor: analysis.category.borderColor }}>
              <div className="bmi-score-top">
                <div className="bmi-score-left">
                  <span className="bmi-score-caption">Calculated Body Mass Index</span>
                  <div className="bmi-score-display">
                    <span className="bmi-score-val mono-num">{analysis.bmi}</span>
                    <span className="bmi-score-unit">kg/m²</span>
                  </div>
                </div>

                <div className="bmi-category-badge-box">
                  <span
                    className={`bmi-pill-badge ${analysis.category.badgeClass}`}
                    style={{ backgroundColor: analysis.category.bgColor, color: analysis.category.color }}
                  >
                    ● {analysis.category.label}
                  </span>
                  <span className="bmi-severity-label">{analysis.category.severity}</span>
                </div>
              </div>

              {/* Dynamic Spectrum Gauge Bar */}
              <div className="bmi-gauge-container">
                <div className="bmi-gauge-labels">
                  <span>Underweight</span>
                  <span>Normal</span>
                  <span>Overweight</span>
                  <span>Obese</span>
                </div>

                <div className="bmi-gauge-track">
                  <div className="gauge-segment seg-under" title="Underweight (< 18.5)"></div>
                  <div className="gauge-segment seg-normal" title="Normal (18.5 - 24.9)"></div>
                  <div className="gauge-segment seg-over" title="Overweight (25 - 29.9)"></div>
                  <div className="gauge-segment seg-obese1" title="Obese Class I (30 - 34.9)"></div>
                  <div className="gauge-segment seg-obese2" title="Severe Obese (≥ 35)"></div>

                  {/* Dynamic Sliding Needle */}
                  <div
                    className="bmi-gauge-needle"
                    style={{ left: `${Math.min(98, Math.max(2, analysis.gaugePercent))}%` }}
                  >
                    <div className="needle-pin" style={{ backgroundColor: analysis.category.color }}></div>
                    <div className="needle-tooltip mono-num">{analysis.bmi}</div>
                  </div>
                </div>

                <div className="bmi-gauge-ticks">
                  <span>12</span>
                  <span>18.5</span>
                  <span>25.0</span>
                  <span>30.0</span>
                  <span>35.0</span>
                  <span>42+</span>
                </div>
              </div>

              {/* Healthy Target & Weight Differential Strip */}
              <div className="bmi-targets-strip">
                <div className="target-metric-box">
                  <span className="target-metric-label">Healthy Weight for Your Height</span>
                  <span className="target-metric-val mono-num">{analysis.healthyRangeText}</span>
                </div>
                <div className="target-metric-box">
                  <span className="target-metric-label">Status Differential</span>
                  <span className={`target-metric-status status-${analysis.weightDiffStatus}`}>
                    {analysis.weightDiffStatus === 'optimal' ? '✓ ' : ''}
                    {analysis.weightDiffText}
                  </span>
                </div>
              </div>

              {/* Clinical Summary Paragraph */}
              <p className="bmi-clinical-summary">
                {analysis.category.summary}
              </p>

              {/* Quick Action CTA inside card */}
              <div className="bmi-card-actions">
                <Button
                  variant="filled"
                  size="sm"
                  onClick={handleConsultDoctor}
                >
                  💬 Consult AI Doctor about this BMI
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/mcq')}
                >
                  Take Full Symptom Quiz
                </Button>
              </div>
            </Card>
          )}
        </div>

        {/* Detailed Breakdown Panels (Risks, Health Factors, and Consistent Goals) */}
        {analysis && (
          <div className="bmi-details-wrapper">
            {/* Panel 1: Associated Health Risks */}
            <Card className="bmi-detail-panel risks-panel">
              <div className="panel-header">
                <span className="panel-icon">⚠️</span>
                <div>
                  <h4 className="panel-title">Potential Health Risks Associated with this BMI</h4>
                  <p className="panel-subtitle">Epidemiological and clinical risk correlations according to public health criteria</p>
                </div>
              </div>

              <div className="panel-risks-grid">
                {analysis.category.risks.map((risk, index) => (
                  <div key={index} className="risk-item-box">
                    <div className="risk-item-header">
                      <span className="risk-item-bullet" style={{ backgroundColor: analysis.category.color }}></span>
                      <h5 className="risk-item-title">{risk.title}</h5>
                    </div>
                    <p className="risk-item-desc">{risk.desc}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Panel 2: Key Health Factors to Monitor */}
            <Card className="bmi-detail-panel factors-panel">
              <div className="panel-header">
                <span className="panel-icon">🧪</span>
                <div>
                  <h4 className="panel-title">Critical Health Factors & Biomarkers to Monitor</h4>
                  <p className="panel-subtitle">Key laboratory panels and physical metrics recommended for regular review</p>
                </div>
              </div>

              <ul className="factors-checklist">
                {analysis.category.factors.map((factor, index) => (
                  <li key={index} className="factor-check-item">
                    <span className="factor-check-icon">✓</span>
                    <span className="factor-check-text">{factor}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Panel 3: Consistent Goals & Action Plan */}
            <Card className={`bmi-detail-panel goals-panel ${analysis.category.key === 'normal' ? 'goals-panel-optimal' : ''}`}>
              <div className="panel-header">
                <span className="panel-icon">{analysis.category.key === 'normal' ? '🌟' : '🎯'}</span>
                <div>
                  <h4 className="panel-title">
                    {analysis.category.key === 'normal'
                      ? 'Consistent Health & Longevity Goals (Maintaining Your Optimal BMI)'
                      : `Recommended Action Plan & Targets for Reaching Healthy Equilibrium`}
                  </h4>
                  <p className="panel-subtitle">
                    {analysis.category.key === 'normal'
                      ? 'Having a normal BMI is fantastic! Follow these 5 evidence-based habits to sustain your metabolic health, muscle mass, and long-term vitality.'
                      : 'Evidence-based lifestyle, conditioning, and nutritional modifications for sustainable metabolic health.'}
                  </p>
                </div>
              </div>

              <div className="goals-cards-grid">
                {analysis.category.goals.map((goal, index) => (
                  <div key={index} className="goal-card">
                    <div className="goal-card-top">
                      <span className="goal-card-icon">{goal.icon}</span>
                      <h5 className="goal-card-title">{goal.title}</h5>
                    </div>
                    <p className="goal-card-target">{goal.target}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </Container>
    </section>
  );
}

export default BmiSection;
