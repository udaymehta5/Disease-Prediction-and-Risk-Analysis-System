// Clinical knowledge reference catalog for Vita Signal
// General, accurate, and cautious informational summaries (no treatment claims)

export const DISEASES_DATA = [
  {
    id: 'diabetes',
    name: 'Type 2 Diabetes',
    category: 'Chronic',
    description: 'A chronic metabolic disorder where cells become resistant to insulin, elevating blood glucose levels over time.',
    symptoms: ['Frequent urination (especially at night)', 'Persistent unquenchable thirst', 'Unexplained fatigue or blurred vision'],
    riskFactors: 'Sedentary routine, BMI above 25, family history, age 45+.',
    precautions: [
      'Monitor fasting blood glucose and quarterly HbA1c levels',
      'Follow a balanced diet with controlled carbohydrates and high dietary fiber',
      'Aim for at least 30 minutes of moderate aerobic exercise daily'
    ],
    whenToSeeDoctor: 'Consult a doctor if fasting blood glucose consistently exceeds 126 mg/dL or if you experience recurrent unhealed sores.'
  },
  {
    id: 'hypertension',
    name: 'Hypertension',
    category: 'Chronic',
    description: 'Persistently elevated arterial pressure that places strain on blood vessels and the heart without obvious early signs.',
    symptoms: ['Morning headaches near the back of the head', 'Occasional dizziness or lightheadedness', 'Shortness of breath on mild exertion'],
    riskFactors: 'High sodium intake, chronic stress, smoking, family history.',
    precautions: [
      'Track resting blood pressure readings at home twice daily',
      'Reduce dietary sodium to under 2,000 mg per day (DASH diet)',
      'Incorporate stress management and avoid tobacco products'
    ],
    whenToSeeDoctor: 'Seek urgent care if systolic reading exceeds 180 mmHg or is accompanied by chest pain or severe headache.'
  },
  {
    id: 'asthma',
    name: 'Asthma',
    category: 'Chronic',
    description: 'A respiratory condition characterized by airway inflammation and episodic narrowing that hinders normal breathing.',
    symptoms: ['Wheezing or whistling sound during exhalation', 'Persistent dry or nighttime cough', 'Chest tightness during cold weather or exertion'],
    riskFactors: 'Allergies, family history of atopy, exposure to smoke or chemical fumes.',
    precautions: [
      'Identify and avoid specific environmental triggers such as dust, pollen, or smoke',
      'Always keep prescribed rescue inhaler accessible',
      'Get annual seasonal influenza vaccination to avoid chest exacerbations'
    ],
    whenToSeeDoctor: 'Seek emergency medical evaluation if breathing difficulty does not respond to rescue inhalers or speech becomes strained.'
  },
  {
    id: 'anemia',
    name: 'Iron Deficiency Anemia',
    category: 'Common',
    description: 'A deficit in healthy red blood cells or hemoglobin, reducing oxygen transport throughout bodily tissues.',
    symptoms: ['Persistent lethargy and low stamina', 'Pale skin, inner eyelids, or brittle nails', 'Cold hands and feet or occasional dizziness'],
    riskFactors: 'Nutritional iron deficiency, chronic blood loss, heavy menstrual cycles.',
    precautions: [
      'Incorporate iron-rich foods (lentils, spinach, beans, fortified grains)',
      'Pair iron-rich foods with Vitamin C for improved intestinal absorption',
      'Avoid drinking black tea or coffee alongside primary meals'
    ],
    whenToSeeDoctor: 'See a physician for complete blood count (CBC) and serum ferritin testing if extreme fatigue interferes with daily activities.'
  },
  {
    id: 'typhoid',
    name: 'Typhoid Fever',
    category: 'Infectious',
    description: 'A bacterial systemic infection caused by Salmonella Typhi, primarily spread through contaminated water or food.',
    symptoms: ['Prolonged step-ladder fever rising daily', 'Abdominal discomfort with headache', 'Coated white tongue and loss of appetite'],
    riskFactors: 'Consumption of untreated municipal water, unpeeled raw foods, poor sanitation.',
    precautions: [
      'Drink strictly boiled, filtered, or bottled drinking water',
      'Wash hands thoroughly with soap before food preparation and eating',
      'Avoid raw street foods and uncooked produce in endemic regions'
    ],
    whenToSeeDoctor: 'Visit a clinic promptly for Widal or blood culture testing if sustained high fever persists past 3 days.'
  },
  {
    id: 'dengue',
    name: 'Dengue Fever',
    category: 'Infectious',
    description: 'A vector-borne viral disease transmitted by Aedes mosquitoes, causing acute fever and systemic joint discomfort.',
    symptoms: ['Sudden high fever with intense headache', 'Pain behind the eyes (retro-orbital)', 'Severe muscle, bone, and joint aches'],
    riskFactors: 'Exposure to standing water pools and tropical/subtropical rainfall zones.',
    precautions: [
      'Eliminate stagnant water in plant saucers, buckets, and discarded tires',
      'Use mosquito repellent lotions and protective long-sleeved clothing',
      'Maintain adequate hydration with coconut water, ORS, and clear soups'
    ],
    whenToSeeDoctor: 'Seek emergency care immediately if you notice bleeding gums, skin petechiae, persistent vomiting, or sudden drop in platelet count.'
  },
  {
    id: 'malaria',
    name: 'Malaria',
    category: 'Infectious',
    description: 'A parasitic blood infection transmitted via infected female Anopheles mosquitoes, characterized by cyclical fevers.',
    symptoms: ['Cyclical high fever with shaking chills (rigors)', 'Profuse sweating as fever breaks', 'Body weakness, nausea, and headache'],
    riskFactors: 'Travel or residence in endemic mosquito-prone areas without prophylaxis.',
    precautions: [
      'Sleep under insecticide-treated bed nets (ITNs)',
      'Use indoor repellent sprays during dusk and dawn periods',
      'Consult a travel medicine clinician before traveling to high-transmission areas'
    ],
    whenToSeeDoctor: 'Get a peripheral blood smear or rapid diagnostic test (RDT) immediately upon developing cyclical chills and fever.'
  },
  {
    id: 'pneumonia',
    name: 'Pneumonia',
    category: 'Common',
    description: 'An acute infection inflaming the air sacs (alveoli) in one or both lungs, which may fill with fluid or purulent material.',
    symptoms: ['Productive cough with yellow, green, or rusty mucus', 'Sharp chest pain worsening with deep inhalation', 'High fever, shaking chills, and shallow breathing'],
    riskFactors: 'Recent viral cold/flu, age over 65, chronic lung diseases, smoking.',
    precautions: [
      'Ensure timely recovery from common colds and avoid smoking',
      'Stay updated on pneumococcal and influenza vaccines',
      'Practice good respiratory hygiene and hand washing'
    ],
    whenToSeeDoctor: 'Seek urgent hospital care if resting oxygen saturation drops below 94%, lips appear bluish, or breathing becomes painful.'
  },
  {
    id: 'migraine',
    name: 'Migraine',
    category: 'Common',
    description: 'A recurrent neurovascular headache disorder typically producing intense pulsating discomfort on one side of the head.',
    symptoms: ['Throbbing unilateral head pain lasting 4-72 hours', 'Heightened sensitivity to light, sound, and smells', 'Nausea, vomiting, or visual aura (flickering zigzag lines)'],
    riskFactors: 'Stress, irregular sleep patterns, hormonal fluctuations, skipping meals.',
    precautions: [
      'Maintain regular sleep schedules and consistent meal times',
      'Rest in a dark, quiet room during headache onset',
      'Keep a trigger log noting specific foods, weather shifts, or sensory triggers'
    ],
    whenToSeeDoctor: 'Consult a neurologist if headaches occur more than 4 times a month or appear suddenly like a "thunderclap".'
  },
  {
    id: 'thyroid',
    name: 'Hypothyroidism',
    category: 'Chronic',
    description: 'An endocrine condition in which the thyroid gland produces insufficient thyroid hormones, slowing cellular metabolism.',
    symptoms: ['Unexplained weight gain and sluggish metabolism', 'Intolerance to cold temperatures', 'Dry skin, thinning hair, and muscle weakness'],
    riskFactors: 'Autoimmune thyroiditis (Hashimoto\'s), female sex, iodine deficiency, family history.',
    precautions: [
      'Schedule annual thyroid-stimulating hormone (TSH) and Free T4 blood panels',
      'Consume adequate dietary iodine through iodized salt and seafood',
      'Take prescribed thyroid hormone replacement consistently on an empty stomach'
    ],
    whenToSeeDoctor: 'Consult an endocrinologist for laboratory evaluation if persistent sluggishness and unexplained weight changes occur.'
  },
  {
    id: 'fatty-liver',
    name: 'Non-Alcoholic Fatty Liver (NAFLD)',
    category: 'Lifestyle',
    description: 'The excessive accumulation of triglycerides inside hepatocytes without significant alcohol consumption.',
    symptoms: ['Usually asymptomatic in early stages', 'Dull ache or fullness in upper right abdomen', 'General daytime fatigue or malaise'],
    riskFactors: 'Insulin resistance, obesity, high dietary fructose, elevated triglycerides.',
    precautions: [
      'Adopt a plant-rich Mediterranean diet low in refined carbohydrates and sugary beverages',
      'Achieve gradual, sustainable 7-10% body weight reduction if overweight',
      'Engage in regular moderate aerobic and resistance training weekly'
    ],
    whenToSeeDoctor: 'Consult a physician or gastroenterologist for liver ultrasound and liver function enzyme (ALT/AST) blood panels.'
  },
  {
    id: 'flu',
    name: 'Influenza & Upper Respiratory Infection',
    category: 'Infectious',
    description: 'A contagious airborne viral infection targeting the respiratory tract, causing rapid onset systemic symptoms.',
    symptoms: ['Sudden high fever with chills', 'Generalized aching muscles and joints (myalgia)', 'Dry cough, sore throat, and nasal congestion'],
    riskFactors: 'Crowded indoor spaces, dry winter climate, lack of seasonal vaccination.',
    precautions: [
      'Rest in bed and maintain high fluid intake (water, herbal teas, broths)',
      'Isolate at home during the febrile period to protect vulnerable people',
      'Cover coughs and sneezes with a tissue or flexed elbow'
    ],
    whenToSeeDoctor: 'Consult a doctor if high fever fails to break after 48 hours or if accompanied by chest pain or shortness of breath.'
  }
];

export const DISEASE_CATEGORIES = ['All', 'Common', 'Chronic', 'Infectious', 'Lifestyle'];
