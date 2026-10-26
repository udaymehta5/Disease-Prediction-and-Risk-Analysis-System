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
  },
  {
    id: 'panic_disorder',
    name: "Panic Disorder",
    category: 'Mental Health',
    description: "A clinical condition characterized by depressive or psychotic symptoms and dizziness, indexed in our 250+ condition dataset.",
    symptoms: ["Depressive Or Psychotic Symptoms", "Dizziness", "Insomnia", "Abnormal Involuntary Movements"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'eye_alignment_disorder',
    name: "Eye Alignment Disorder",
    category: 'ENT & Sensory',
    description: "A clinical condition characterized by lack of growth and irregular appearing scalp, indexed in our 250+ condition dataset.",
    symptoms: ["Lack Of Growth", "Irregular Appearing Scalp", "Double Vision", "Symptoms Of Eye"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'vaginitis',
    name: "Vaginitis",
    category: 'Reproductive',
    description: "A clinical condition characterized by pain during intercourse and lower abdominal pain, indexed in our 250+ condition dataset.",
    symptoms: ["Pain During Intercourse", "Lower Abdominal Pain", "Vaginal Pain", "Vaginal Discharge"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'glaucoma',
    name: "Glaucoma",
    category: 'ENT & Sensory',
    description: "A clinical condition characterized by foreign body sensation in eye and itchiness of eye, indexed in our 250+ condition dataset.",
    symptoms: ["Foreign Body Sensation In Eye", "Itchiness Of Eye", "Itchy Eyelid", "Lacrimation"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'eating_disorder',
    name: "Eating Disorder",
    category: 'General Clinical',
    description: "A clinical condition characterized by abusing alcohol and insomnia, indexed in our 250+ condition dataset.",
    symptoms: ["Abusing Alcohol", "Insomnia", "Acne Or Pimples", "Depression"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'transient_ischemic_attack',
    name: "Transient Ischemic Attack",
    category: 'General Clinical',
    description: "A clinical condition characterized by focal weakness and depressive or psychotic symptoms, indexed in our 250+ condition dataset.",
    symptoms: ["Focal Weakness", "Depressive Or Psychotic Symptoms", "Headache", "Dizziness"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'pyelonephritis',
    name: "Pyelonephritis",
    category: 'Urological',
    description: "A clinical condition characterized by sharp abdominal pain and low back pain, indexed in our 250+ condition dataset.",
    symptoms: ["Sharp Abdominal Pain", "Low Back Pain", "Frequent Urination", "Side Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'chronic_pain_disorder',
    name: "Chronic Pain Disorder",
    category: 'General Clinical',
    description: "A clinical condition characterized by pelvic pain and leg pain, indexed in our 250+ condition dataset.",
    symptoms: ["Pelvic Pain", "Leg Pain", "Low Back Pain", "Ache All Over"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'problem_during_pregnancy',
    name: "Problem During Pregnancy",
    category: 'Urological',
    description: "A clinical condition characterized by pelvic pain and lower abdominal pain, indexed in our 250+ condition dataset.",
    symptoms: ["Pelvic Pain", "Lower Abdominal Pain", "Problems During Pregnancy", "Back Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'choledocholithiasis',
    name: "Choledocholithiasis",
    category: 'General Clinical',
    description: "A clinical condition characterized by jaundice and decreased appetite, indexed in our 250+ condition dataset.",
    symptoms: ["Jaundice", "Decreased Appetite", "Sharp Abdominal Pain", "Side Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'diabetic_retinopathy',
    name: "Diabetic Retinopathy",
    category: 'Endocrine',
    description: "A clinical condition characterized by abnormal movement of eyelid and foreign body sensation in eye, indexed in our 250+ condition dataset.",
    symptoms: ["Abnormal Movement Of Eyelid", "Foreign Body Sensation In Eye", "Double Vision", "Symptoms Of Eye"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'fibromyalgia',
    name: "Fibromyalgia",
    category: 'Musculoskeletal',
    description: "A clinical condition characterized by low back pain and hip pain, indexed in our 250+ condition dataset.",
    symptoms: ["Low Back Pain", "Hip Pain", "Leg Pain", "Arm Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'acute_pancreatitis',
    name: "Acute Pancreatitis",
    category: 'Digestive',
    description: "A clinical condition characterized by burning abdominal pain and nausea, indexed in our 250+ condition dataset.",
    symptoms: ["Burning Abdominal Pain", "Nausea", "Vomiting", "Hemoptysis"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'thrombophlebitis',
    name: "Thrombophlebitis",
    category: 'General Clinical',
    description: "A clinical condition characterized by skin swelling and arm swelling, indexed in our 250+ condition dataset.",
    symptoms: ["Skin Swelling", "Arm Swelling", "Arm Pain", "Foot Or Toe Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'teething_syndrome',
    name: "Teething Syndrome",
    category: 'General Clinical',
    description: "A clinical condition characterized by cough and ear pain, indexed in our 250+ condition dataset.",
    symptoms: ["Cough", "Ear Pain", "Symptoms Of Infants", "Redness In Ear"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'infectious_gastroenteritis',
    name: "Infectious Gastroenteritis",
    category: 'Infectious',
    description: "A clinical condition characterized by nausea and decreased appetite, indexed in our 250+ condition dataset.",
    symptoms: ["Nausea", "Decreased Appetite", "Diarrhea", "Headache"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'acute_sinusitis',
    name: "Acute Sinusitis",
    category: 'Respiratory',
    description: "A clinical condition characterized by sore throat and coryza, indexed in our 250+ condition dataset.",
    symptoms: ["Sore Throat", "Coryza", "Sinus Congestion", "Ear Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'postpartum_depression',
    name: "Postpartum Depression",
    category: 'Mental Health',
    description: "A clinical condition characterized by drug abuse and problems during pregnancy, indexed in our 250+ condition dataset.",
    symptoms: ["Drug Abuse", "Problems During Pregnancy", "Delusions Or Hallucinations", "Depression"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'spondylitis',
    name: "Spondylitis",
    category: 'Musculoskeletal',
    description: "A clinical condition characterized by stiffness all over and side pain, indexed in our 250+ condition dataset.",
    symptoms: ["Stiffness All Over", "Side Pain", "Low Back Pain", "Back Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'uterine_fibroids',
    name: "Uterine Fibroids",
    category: 'Reproductive',
    description: "A clinical condition characterized by involuntary urination and intermenstrual bleeding, indexed in our 250+ condition dataset.",
    symptoms: ["Involuntary Urination", "Intermenstrual Bleeding", "Painful Menstruation", "Unpredictable Menstruation"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'chalazion',
    name: "Chalazion",
    category: 'General Clinical',
    description: "A clinical condition characterized by eyelid swelling and diminished vision, indexed in our 250+ condition dataset.",
    symptoms: ["Eyelid Swelling", "Diminished Vision", "Mass On Eyelid", "Lacrimation"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'vaginal_yeast_infection',
    name: "Vaginal Yeast Infection",
    category: 'Infectious',
    description: "A clinical condition characterized by suprapubic pain and itching of skin, indexed in our 250+ condition dataset.",
    symptoms: ["Suprapubic Pain", "Itching Of Skin", "Vaginal Itching", "Vaginal Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'ingrown_toe_nail',
    name: "Ingrown Toe Nail",
    category: 'General Clinical',
    description: "A clinical condition characterized by neck swelling and irregular appearing nails, indexed in our 250+ condition dataset.",
    symptoms: ["Neck Swelling", "Irregular Appearing Nails", "Foot Or Toe Swelling", "Swollen Eye"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'corneal_disorder',
    name: "Corneal Disorder",
    category: 'General Clinical',
    description: "A clinical condition characterized by double vision and white discharge from eye, indexed in our 250+ condition dataset.",
    symptoms: ["Double Vision", "White Discharge From Eye", "Spots Or Clouds In Vision", "Itchiness Of Eye"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'viral_warts',
    name: "Viral Warts",
    category: 'Infectious',
    description: "A clinical condition characterized by lip swelling and skin swelling, indexed in our 250+ condition dataset.",
    symptoms: ["Lip Swelling", "Skin Swelling", "Warts", "Skin Lesion"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'stroke',
    name: "Stroke",
    category: 'Cardiovascular',
    description: "A clinical condition characterized by headache and problems with movement, indexed in our 250+ condition dataset.",
    symptoms: ["Headache", "Problems With Movement", "Focal Weakness", "Dizziness"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'pelvic_organ_prolapse',
    name: "Pelvic Organ Prolapse",
    category: 'Reproductive',
    description: "A clinical condition characterized by blood in urine and intermenstrual bleeding, indexed in our 250+ condition dataset.",
    symptoms: ["Blood In Urine", "Intermenstrual Bleeding", "Involuntary Urination", "Frequent Urination"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'fracture_of_the_arm',
    name: "Fracture of the Arm",
    category: 'Musculoskeletal',
    description: "A clinical condition characterized by shoulder stiffness or tightness and wrist swelling, indexed in our 250+ condition dataset.",
    symptoms: ["Shoulder Stiffness Or Tightness", "Wrist Swelling", "Arm Pain", "Elbow Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'hyperkalemia',
    name: "Hyperkalemia",
    category: 'General Clinical',
    description: "A clinical condition characterized by decreased heart rate and depressive or psychotic symptoms, indexed in our 250+ condition dataset.",
    symptoms: ["Decreased Heart Rate", "Depressive Or Psychotic Symptoms", "Weakness", "Feeling Ill"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'cornea_infection',
    name: "Cornea Infection",
    category: 'Infectious',
    description: "A clinical condition characterized by lip swelling and spots or clouds in vision, indexed in our 250+ condition dataset.",
    symptoms: ["Lip Swelling", "Spots Or Clouds In Vision", "Diminished Vision", "Pain In Eye"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'chronic_sinusitis',
    name: "Chronic Sinusitis",
    category: 'Respiratory',
    description: "A clinical condition characterized by cough and ear pain, indexed in our 250+ condition dataset.",
    symptoms: ["Cough", "Ear Pain", "Headache", "Painful Sinuses"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'conductive_hearing_loss',
    name: "Conductive Hearing Loss",
    category: 'ENT & Sensory',
    description: "A clinical condition characterized by hoarse voice and plugged feeling in ear, indexed in our 250+ condition dataset.",
    symptoms: ["Hoarse Voice", "Plugged Feeling In Ear", "Ear Pain", "Low Self Esteem"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'abdominal_hernia',
    name: "Abdominal Hernia",
    category: 'Digestive',
    description: "A clinical condition characterized by symptoms of the scrotum and testes and lower abdominal pain, indexed in our 250+ condition dataset.",
    symptoms: ["Symptoms Of The Scrotum And Testes", "Lower Abdominal Pain", "Sharp Abdominal Pain", "Irregular Belly Button"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'marijuana_abuse',
    name: "Marijuana Abuse",
    category: 'General Clinical',
    description: "A clinical condition characterized by abusing alcohol and excessive anger, indexed in our 250+ condition dataset.",
    symptoms: ["Abusing Alcohol", "Excessive Anger", "Low Self Esteem", "Hostile Behavior"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'indigestion',
    name: "Indigestion",
    category: 'General Clinical',
    description: "A clinical condition characterized by stomach bloating and heartburn, indexed in our 250+ condition dataset.",
    symptoms: ["Stomach Bloating", "Heartburn", "Sharp Abdominal Pain", "Diarrhea"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'bursitis',
    name: "Bursitis",
    category: 'Musculoskeletal',
    description: "A clinical condition characterized by elbow swelling and knee pain, indexed in our 250+ condition dataset.",
    symptoms: ["Elbow Swelling", "Knee Pain", "Hip Pain", "Arm Swelling"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'pulmonary_congestion',
    name: "Pulmonary Congestion",
    category: 'General Clinical',
    description: "A clinical condition characterized by cough and chest tightness, indexed in our 250+ condition dataset.",
    symptoms: ["Cough", "Chest Tightness", "Leg Swelling", "Sharp Chest Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'actinic_keratosis',
    name: "Actinic Keratosis",
    category: 'Dermatological',
    description: "A clinical condition characterized by symptoms of the face and irregular appearing scalp, indexed in our 250+ condition dataset.",
    symptoms: ["Symptoms Of The Face", "Irregular Appearing Scalp", "Skin Dryness Peeling Scaliness Or Roughness", "Skin Moles"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'acute_otitis_media',
    name: "Acute Otitis Media",
    category: 'ENT & Sensory',
    description: "A clinical condition characterized by diminished hearing and coryza, indexed in our 250+ condition dataset.",
    symptoms: ["Diminished Hearing", "Coryza", "Plugged Feeling In Ear", "Redness In Ear"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'chronic_obstructive_pulmonary_disease_copd',
    name: "Chronic Obstructive Pulmonary Disease (copd)",
    category: 'Respiratory',
    description: "A clinical condition characterized by sharp chest pain and coryza, indexed in our 250+ condition dataset.",
    symptoms: ["Sharp Chest Pain", "Coryza", "Coughing Up Sputum", "Cough"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'spondylosis',
    name: "Spondylosis",
    category: 'Musculoskeletal',
    description: "A clinical condition characterized by neck pain and low back pain, indexed in our 250+ condition dataset.",
    symptoms: ["Neck Pain", "Low Back Pain", "Ache All Over", "Back Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'herpangina',
    name: "Herpangina",
    category: 'Cardiovascular',
    description: "A clinical condition characterized by swollen lymph nodes and insomnia, indexed in our 250+ condition dataset.",
    symptoms: ["Swollen Lymph Nodes", "Insomnia", "Decreased Appetite", "Vomiting"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'injury_to_the_shoulder',
    name: "Injury to the Shoulder",
    category: 'General Clinical',
    description: "A clinical condition characterized by shoulder stiffness or tightness and bones are painful, indexed in our 250+ condition dataset.",
    symptoms: ["Shoulder Stiffness Or Tightness", "Bones Are Painful", "Muscle Cramps Contractures Or Spasms", "Arm Stiffness Or Tightness"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'heart_block',
    name: "Heart Block",
    category: 'Cardiovascular',
    description: "A clinical condition characterized by weight gain and weakness, indexed in our 250+ condition dataset.",
    symptoms: ["Weight Gain", "Weakness", "Irregular Heartbeat", "Palpitations"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'attention_deficit_hyperactivity_disorder_adhd',
    name: "Attention Deficit Hyperactivity Disorder (adhd)",
    category: 'General Clinical',
    description: "A clinical condition characterized by hostile behavior and lack of growth, indexed in our 250+ condition dataset.",
    symptoms: ["Hostile Behavior", "Lack Of Growth", "Drug Abuse", "Depression"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'injury_to_the_arm',
    name: "Injury to the Arm",
    category: 'General Clinical',
    description: "A clinical condition characterized by wrist swelling and loss of sensation, indexed in our 250+ condition dataset.",
    symptoms: ["Wrist Swelling", "Loss Of Sensation", "Elbow Swelling", "Arm Stiffness Or Tightness"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'complex_regional_pain_syndrome',
    name: "Complex Regional Pain Syndrome",
    category: 'General Clinical',
    description: "A clinical condition characterized by back pain and foot or toe pain, indexed in our 250+ condition dataset.",
    symptoms: ["Back Pain", "Foot Or Toe Pain", "Neck Pain", "Leg Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'injury_to_the_trunk',
    name: "Injury to the Trunk",
    category: 'General Clinical',
    description: "A clinical condition characterized by symptoms of the scrotum and testes and neck pain, indexed in our 250+ condition dataset.",
    symptoms: ["Symptoms Of The Scrotum And Testes", "Neck Pain", "Back Pain", "Shoulder Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'vulvodynia',
    name: "Vulvodynia",
    category: 'General Clinical',
    description: "A clinical condition characterized by back pain and vaginal discharge, indexed in our 250+ condition dataset.",
    symptoms: ["Back Pain", "Vaginal Discharge", "Lower Abdominal Pain", "Nausea"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'concussion',
    name: "Concussion",
    category: 'General Clinical',
    description: "A clinical condition characterized by nausea and headache, indexed in our 250+ condition dataset.",
    symptoms: ["Nausea", "Headache", "Disturbance Of Memory", "Double Vision"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'bladder_disorder',
    name: "Bladder Disorder",
    category: 'Urological',
    description: "A clinical condition characterized by painful urination and lower abdominal pain, indexed in our 250+ condition dataset.",
    symptoms: ["Painful Urination", "Lower Abdominal Pain", "Frequent Urination", "Sharp Abdominal Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'neuralgia',
    name: "Neuralgia",
    category: 'Neurological',
    description: "A clinical condition characterized by headache and hip pain, indexed in our 250+ condition dataset.",
    symptoms: ["Headache", "Hip Pain", "Back Pain", "Loss Of Sensation"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'bipolar_disorder',
    name: "Bipolar Disorder",
    category: 'Mental Health',
    description: "A clinical condition characterized by insomnia and abusing alcohol, indexed in our 250+ condition dataset.",
    symptoms: ["Insomnia", "Abusing Alcohol", "Depression", "Delusions Or Hallucinations"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'gastroesophageal_reflux_disease_gerd',
    name: "Gastroesophageal Reflux Disease (gerd)",
    category: 'Digestive',
    description: "A clinical condition characterized by cough and difficulty in swallowing, indexed in our 250+ condition dataset.",
    symptoms: ["Cough", "Difficulty In Swallowing", "Sharp Abdominal Pain", "Regurgitation"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'hypoglycemia',
    name: "Hypoglycemia",
    category: 'General Clinical',
    description: "A clinical condition characterized by feeling ill and nausea, indexed in our 250+ condition dataset.",
    symptoms: ["Feeling Ill", "Nausea", "Seizures", "Fainting"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'idiopathic_absence_of_menstruation',
    name: "Idiopathic Absence of Menstruation",
    category: 'Reproductive',
    description: "A clinical condition characterized by vaginal itching and sharp abdominal pain, indexed in our 250+ condition dataset.",
    symptoms: ["Vaginal Itching", "Sharp Abdominal Pain", "Lower Abdominal Pain", "Absence Of Menstruation"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'hiatal_hernia',
    name: "Hiatal Hernia",
    category: 'Digestive',
    description: "A clinical condition characterized by difficulty in swallowing and nausea, indexed in our 250+ condition dataset.",
    symptoms: ["Difficulty In Swallowing", "Nausea", "Upper Abdominal Pain", "Sharp Abdominal Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'allergy',
    name: "Allergy",
    category: 'General Clinical',
    description: "A clinical condition characterized by fluid retention and allergic reaction, indexed in our 250+ condition dataset.",
    symptoms: ["Fluid Retention", "Allergic Reaction", "Peripheral Edema", "Skin Swelling"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'chronic_otitis_media',
    name: "Chronic Otitis Media",
    category: 'ENT & Sensory',
    description: "A clinical condition characterized by cough and painful sinuses, indexed in our 250+ condition dataset.",
    symptoms: ["Cough", "Painful Sinuses", "Fever", "Nasal Congestion"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'lymphedema',
    name: "Lymphedema",
    category: 'General Clinical',
    description: "A clinical condition characterized by foot or toe swelling and throat swelling, indexed in our 250+ condition dataset.",
    symptoms: ["Foot Or Toe Swelling", "Throat Swelling", "Lymphedema", "Fluid Retention"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'acute_bronchospasm',
    name: "Acute Bronchospasm",
    category: 'Respiratory',
    description: "A clinical condition characterized by vomiting and cough, indexed in our 250+ condition dataset.",
    symptoms: ["Vomiting", "Cough", "Sore Throat", "Difficulty Breathing"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'sciatica',
    name: "Sciatica",
    category: 'Neurological',
    description: "A clinical condition characterized by leg pain and problems with movement, indexed in our 250+ condition dataset.",
    symptoms: ["Leg Pain", "Problems With Movement", "Low Back Pain", "Lower Body Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'degenerative_disc_disease',
    name: "Degenerative Disc Disease",
    category: 'General Clinical',
    description: "A clinical condition characterized by shoulder pain and neck pain, indexed in our 250+ condition dataset.",
    symptoms: ["Shoulder Pain", "Neck Pain", "Low Back Pain", "Loss Of Sensation"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'diverticulosis',
    name: "Diverticulosis",
    category: 'Digestive',
    description: "A clinical condition characterized by nausea and rectal bleeding, indexed in our 250+ condition dataset.",
    symptoms: ["Nausea", "Rectal Bleeding", "Upper Abdominal Pain", "Sharp Abdominal Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'pain_after_an_operation',
    name: "Pain After An Operation",
    category: 'General Clinical',
    description: "A clinical condition characterized by leg pain and low back pain, indexed in our 250+ condition dataset.",
    symptoms: ["Leg Pain", "Low Back Pain", "Nausea", "Headache"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'dermatitis_due_to_sun_exposure',
    name: "Dermatitis Due to Sun Exposure",
    category: 'Dermatological',
    description: "A clinical condition characterized by lack of growth and acne or pimples, indexed in our 250+ condition dataset.",
    symptoms: ["Lack Of Growth", "Acne Or Pimples", "Skin Rash", "Skin Dryness Peeling Scaliness Or Roughness"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'fungal_infection_of_the_skin',
    name: "Fungal Infection of the Skin",
    category: 'Infectious',
    description: "A clinical condition characterized by acne or pimples and itchy scalp, indexed in our 250+ condition dataset.",
    symptoms: ["Acne Or Pimples", "Itchy Scalp", "Skin Lesion", "Itching Of Skin"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'injury_to_the_leg',
    name: "Injury to the Leg",
    category: 'General Clinical',
    description: "A clinical condition characterized by leg swelling and problems with movement, indexed in our 250+ condition dataset.",
    symptoms: ["Leg Swelling", "Problems With Movement", "Knee Swelling", "Knee Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'mitral_valve_disease',
    name: "Mitral Valve Disease",
    category: 'General Clinical',
    description: "A clinical condition characterized by sweating and shortness of breath, indexed in our 250+ condition dataset.",
    symptoms: ["Sweating", "Shortness Of Breath", "Irregular Heartbeat", "Chest Tightness"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'parkinson_disease',
    name: "Parkinson Disease",
    category: 'Neurological',
    description: "A clinical condition characterized by focal weakness and stiffness all over, indexed in our 250+ condition dataset.",
    symptoms: ["Focal Weakness", "Stiffness All Over", "Leg Stiffness Or Tightness", "Abnormal Involuntary Movements"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'gout',
    name: "Gout",
    category: 'Endocrine',
    description: "A clinical condition characterized by knee pain and foot or toe pain, indexed in our 250+ condition dataset.",
    symptoms: ["Knee Pain", "Foot Or Toe Pain", "Knee Swelling", "Foot Or Toe Swelling"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'otitis_media',
    name: "Otitis Media",
    category: 'ENT & Sensory',
    description: "A clinical condition characterized by vomiting and ear pain, indexed in our 250+ condition dataset.",
    symptoms: ["Vomiting", "Ear Pain", "Coryza", "Diminished Hearing"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'drug_abuse_opioids',
    name: "Drug Abuse (opioids)",
    category: 'General Clinical',
    description: "A clinical condition characterized by restlessness and temper problems, indexed in our 250+ condition dataset.",
    symptoms: ["Restlessness", "Temper Problems", "Drug Abuse", "Insomnia"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'acute_kidney_injury',
    name: "Acute Kidney Injury",
    category: 'Urological',
    description: "A clinical condition characterized by retention of urine and weakness, indexed in our 250+ condition dataset.",
    symptoms: ["Retention Of Urine", "Weakness", "Vomiting", "Nausea"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'threatened_pregnancy',
    name: "Threatened Pregnancy",
    category: 'Reproductive',
    description: "A clinical condition characterized by sharp abdominal pain and cramps and spasms, indexed in our 250+ condition dataset.",
    symptoms: ["Sharp Abdominal Pain", "Cramps And Spasms", "Lower Abdominal Pain", "Pelvic Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'gum_disease',
    name: "Gum Disease",
    category: 'General Clinical',
    description: "A clinical condition characterized by mouth ulcer and toothache, indexed in our 250+ condition dataset.",
    symptoms: ["Mouth Ulcer", "Toothache", "Ear Pain", "Gum Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'gastrointestinal_hemorrhage',
    name: "Gastrointestinal Hemorrhage",
    category: 'Digestive',
    description: "A clinical condition characterized by blood in stool and rectal bleeding, indexed in our 250+ condition dataset.",
    symptoms: ["Blood In Stool", "Rectal Bleeding", "Vomiting", "Nausea"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'seborrheic_dermatitis',
    name: "Seborrheic Dermatitis",
    category: 'Dermatological',
    description: "A clinical condition characterized by acne or pimples and skin dryness peeling scaliness or roughness, indexed in our 250+ condition dataset.",
    symptoms: ["Acne Or Pimples", "Skin Dryness Peeling Scaliness Or Roughness", "Irregular Appearing Scalp", "Skin Lesion"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'food_allergy',
    name: "Food Allergy",
    category: 'General Clinical',
    description: "A clinical condition characterized by lip swelling and cough, indexed in our 250+ condition dataset.",
    symptoms: ["Lip Swelling", "Cough", "Allergic Reaction", "Abnormal Appearing Skin"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'labyrinthitis',
    name: "Labyrinthitis",
    category: 'General Clinical',
    description: "A clinical condition characterized by ear pain and diminished hearing, indexed in our 250+ condition dataset.",
    symptoms: ["Ear Pain", "Diminished Hearing", "Vomiting", "Loss Of Sensation"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'anxiety',
    name: "Anxiety",
    category: 'Mental Health',
    description: "A clinical condition characterized by sharp chest pain and depressive or psychotic symptoms, indexed in our 250+ condition dataset.",
    symptoms: ["Sharp Chest Pain", "Depressive Or Psychotic Symptoms", "Insomnia", "Depression"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'bell_palsy',
    name: "Bell Palsy",
    category: 'Neurological',
    description: "A clinical condition characterized by diminished vision and abnormal involuntary movements, indexed in our 250+ condition dataset.",
    symptoms: ["Diminished Vision", "Abnormal Involuntary Movements", "Peripheral Edema", "Focal Weakness"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'conjunctivitis_due_to_allergy',
    name: "Conjunctivitis Due to Allergy",
    category: 'General Clinical',
    description: "A clinical condition characterized by eye redness and sneezing, indexed in our 250+ condition dataset.",
    symptoms: ["Eye Redness", "Sneezing", "Itchiness Of Eye", "Nasal Congestion"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'drug_reaction',
    name: "Drug Reaction",
    category: 'General Clinical',
    description: "A clinical condition characterized by nausea and skin rash, indexed in our 250+ condition dataset.",
    symptoms: ["Nausea", "Skin Rash", "Allergic Reaction", "Headache"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'myopia',
    name: "Myopia",
    category: 'General Clinical',
    description: "A clinical condition characterized by foreign body sensation in eye and eye deviation, indexed in our 250+ condition dataset.",
    symptoms: ["Foreign Body Sensation In Eye", "Eye Deviation", "Eye Redness", "Diminished Vision"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'osteoarthritis',
    name: "Osteoarthritis",
    category: 'Musculoskeletal',
    description: "A clinical condition characterized by hip pain and knee weakness, indexed in our 250+ condition dataset.",
    symptoms: ["Hip Pain", "Knee Weakness", "Knee Pain", "Ankle Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'macular_degeneration',
    name: "Macular Degeneration",
    category: 'General Clinical',
    description: "A clinical condition characterized by double vision and foreign body sensation in eye, indexed in our 250+ condition dataset.",
    symptoms: ["Double Vision", "Foreign Body Sensation In Eye", "Blindness", "Lacrimation"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'fracture_of_the_rib',
    name: "Fracture of the Rib",
    category: 'Musculoskeletal',
    description: "A clinical condition characterized by shortness of breath and back pain, indexed in our 250+ condition dataset.",
    symptoms: ["Shortness Of Breath", "Back Pain", "Rib Pain", "Back Mass Or Lump"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'vaginal_cyst',
    name: "Vaginal Cyst",
    category: 'Dermatological',
    description: "A clinical condition characterized by heavy menstrual flow and pelvic pain, indexed in our 250+ condition dataset.",
    symptoms: ["Heavy Menstrual Flow", "Pelvic Pain", "Lower Abdominal Pain", "Intermenstrual Bleeding"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'alcohol_abuse',
    name: "Alcohol Abuse",
    category: 'General Clinical',
    description: "A clinical condition characterized by vomiting blood and hostile behavior, indexed in our 250+ condition dataset.",
    symptoms: ["Vomiting Blood", "Hostile Behavior", "Smoking Problems", "Depression"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'carpal_tunnel_syndrome',
    name: "Carpal Tunnel Syndrome",
    category: 'General Clinical',
    description: "A clinical condition characterized by elbow pain and wrist swelling, indexed in our 250+ condition dataset.",
    symptoms: ["Elbow Pain", "Wrist Swelling", "Loss Of Sensation", "Neck Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'kidney_stone',
    name: "Kidney Stone",
    category: 'Urological',
    description: "A clinical condition characterized by vomiting and back pain, indexed in our 250+ condition dataset.",
    symptoms: ["Vomiting", "Back Pain", "Side Pain", "Frequent Urination"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'autism',
    name: "Autism",
    category: 'General Clinical',
    description: "A clinical condition characterized by long menstrual periods and difficulty speaking, indexed in our 250+ condition dataset.",
    symptoms: ["Long Menstrual Periods", "Difficulty Speaking", "Hostile Behavior", "Antisocial Behavior"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'chronic_glaucoma',
    name: "Chronic Glaucoma",
    category: 'ENT & Sensory',
    description: "A clinical condition characterized by itchiness of eye and white discharge from eye, indexed in our 250+ condition dataset.",
    symptoms: ["Itchiness Of Eye", "White Discharge From Eye", "Spots Or Clouds In Vision", "Pain In Eye"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'nose_disorder',
    name: "Nose Disorder",
    category: 'General Clinical',
    description: "A clinical condition characterized by ear pain and nosebleed, indexed in our 250+ condition dataset.",
    symptoms: ["Ear Pain", "Nosebleed", "Facial Pain", "Difficulty Breathing"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'dental_caries',
    name: "Dental Caries",
    category: 'General Clinical',
    description: "A clinical condition characterized by facial pain and peripheral edema, indexed in our 250+ condition dataset.",
    symptoms: ["Facial Pain", "Peripheral Edema", "Restlessness", "Gum Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'muscle_spasm',
    name: "Muscle Spasm",
    category: 'Musculoskeletal',
    description: "A clinical condition characterized by low back pain and leg pain, indexed in our 250+ condition dataset.",
    symptoms: ["Low Back Pain", "Leg Pain", "Headache", "Loss Of Sensation"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'itching_of_unknown_cause',
    name: "Itching of Unknown Cause",
    category: 'General Clinical',
    description: "A clinical condition characterized by problems during pregnancy and fluid retention, indexed in our 250+ condition dataset.",
    symptoms: ["Problems During Pregnancy", "Fluid Retention", "Vaginal Itching", "Allergic Reaction"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'urge_incontinence',
    name: "Urge Incontinence",
    category: 'Urological',
    description: "A clinical condition characterized by retention of urine and vaginal itching, indexed in our 250+ condition dataset.",
    symptoms: ["Retention Of Urine", "Vaginal Itching", "Blood In Urine", "Frequent Urination"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'corneal_abrasion',
    name: "Corneal Abrasion",
    category: 'General Clinical',
    description: "A clinical condition characterized by diminished vision and itchiness of eye, indexed in our 250+ condition dataset.",
    symptoms: ["Diminished Vision", "Itchiness Of Eye", "White Discharge From Eye", "Symptoms Of Eye"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'dysthymic_disorder',
    name: "Dysthymic Disorder",
    category: 'General Clinical',
    description: "A clinical condition characterized by excessive anger and loss of sex drive, indexed in our 250+ condition dataset.",
    symptoms: ["Excessive Anger", "Loss Of Sex Drive", "Temper Problems", "Depression"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'hypertensive_heart_disease',
    name: "Hypertensive Heart Disease",
    category: 'Cardiovascular',
    description: "A clinical condition characterized by leg swelling and palpitations, indexed in our 250+ condition dataset.",
    symptoms: ["Leg Swelling", "Palpitations", "Difficulty Breathing", "Fatigue"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'balanitis',
    name: "Balanitis",
    category: 'General Clinical',
    description: "A clinical condition characterized by suprapubic pain and painful urination, indexed in our 250+ condition dataset.",
    symptoms: ["Suprapubic Pain", "Painful Urination", "Skin Rash", "Cough"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'alcohol_withdrawal',
    name: "Alcohol Withdrawal",
    category: 'General Clinical',
    description: "A clinical condition characterized by dizziness and depressive or psychotic symptoms, indexed in our 250+ condition dataset.",
    symptoms: ["Dizziness", "Depressive Or Psychotic Symptoms", "Vomiting", "Seizures"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'hemiplegia',
    name: "Hemiplegia",
    category: 'General Clinical',
    description: "A clinical condition characterized by weakness and slurring words, indexed in our 250+ condition dataset.",
    symptoms: ["Weakness", "Slurring Words", "Difficulty Speaking", "Arm Stiffness Or Tightness"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'joint_effusion',
    name: "Joint Effusion",
    category: 'Musculoskeletal',
    description: "A clinical condition characterized by wrist pain and knee stiffness or tightness, indexed in our 250+ condition dataset.",
    symptoms: ["Wrist Pain", "Knee Stiffness Or Tightness", "Ankle Swelling", "Knee Swelling"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'seasonal_allergies_hay_fever',
    name: "Seasonal Allergies (hay Fever)",
    category: 'Infectious',
    description: "A clinical condition characterized by lacrimation and ear pain, indexed in our 250+ condition dataset.",
    symptoms: ["Lacrimation", "Ear Pain", "Frontal Headache", "Coryza"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'dry_eye_of_unknown_cause',
    name: "Dry Eye of Unknown Cause",
    category: 'ENT & Sensory',
    description: "A clinical condition characterized by foreign body sensation in eye and pain in eye, indexed in our 250+ condition dataset.",
    symptoms: ["Foreign Body Sensation In Eye", "Pain In Eye", "Diminished Vision", "Eye Redness"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'fungal_infection_of_the_hair',
    name: "Fungal Infection of the Hair",
    category: 'Infectious',
    description: "A clinical condition characterized by skin growth and skin rash, indexed in our 250+ condition dataset.",
    symptoms: ["Skin Growth", "Skin Rash", "Pelvic Pain", "Irregular Appearing Scalp"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'tooth_abscess',
    name: "Tooth Abscess",
    category: 'Infectious',
    description: "A clinical condition characterized by neck swelling and skin swelling, indexed in our 250+ condition dataset.",
    symptoms: ["Neck Swelling", "Skin Swelling", "Pain In Gums", "Gum Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'envenomation_from_spider_or_animal_bite',
    name: "Envenomation From Spider or Animal Bite",
    category: 'General Clinical',
    description: "A clinical condition characterized by arm swelling and itching of skin, indexed in our 250+ condition dataset.",
    symptoms: ["Arm Swelling", "Itching Of Skin", "Paresthesia", "Hand Or Finger Swelling"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'rectal_disorder',
    name: "Rectal Disorder",
    category: 'General Clinical',
    description: "A clinical condition characterized by heartburn and pain of the anus, indexed in our 250+ condition dataset.",
    symptoms: ["Heartburn", "Pain Of The Anus", "Constipation", "Sharp Abdominal Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'benign_paroxysmal_positional_vertical_bppv',
    name: "Benign Paroxysmal Positional Vertical (bppv)",
    category: 'General Clinical',
    description: "A clinical condition characterized by irregular heartbeat and fainting, indexed in our 250+ condition dataset.",
    symptoms: ["Irregular Heartbeat", "Fainting", "Headache", "Nausea"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'stye',
    name: "Stye",
    category: 'General Clinical',
    description: "A clinical condition characterized by skin swelling and eyelid lesion or rash, indexed in our 250+ condition dataset.",
    symptoms: ["Skin Swelling", "Eyelid Lesion Or Rash", "Swollen Eye", "Eyelid Swelling"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'atrophic_skin_condition',
    name: "Atrophic Skin Condition",
    category: 'Dermatological',
    description: "A clinical condition characterized by acne or pimples and lip swelling, indexed in our 250+ condition dataset.",
    symptoms: ["Acne Or Pimples", "Lip Swelling", "Skin Lesion", "Skin Growth"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'oral_mucosal_lesion',
    name: "Oral Mucosal Lesion",
    category: 'General Clinical',
    description: "A clinical condition characterized by cough and lip swelling, indexed in our 250+ condition dataset.",
    symptoms: ["Cough", "Lip Swelling", "Fever", "Mouth Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'intracerebral_hemorrhage',
    name: "Intracerebral Hemorrhage",
    category: 'General Clinical',
    description: "A clinical condition characterized by diminished vision and focal weakness, indexed in our 250+ condition dataset.",
    symptoms: ["Diminished Vision", "Focal Weakness", "Nausea", "Headache"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'ganglion_cyst',
    name: "Ganglion Cyst",
    category: 'Dermatological',
    description: "A clinical condition characterized by knee lump or mass and leg pain, indexed in our 250+ condition dataset.",
    symptoms: ["Knee Lump Or Mass", "Leg Pain", "Foot Or Toe Pain", "Skin Growth"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'skin_disorder',
    name: "Skin Disorder",
    category: 'Dermatological',
    description: "A clinical condition characterized by abnormal appearing skin and skin irritation, indexed in our 250+ condition dataset.",
    symptoms: ["Abnormal Appearing Skin", "Skin Irritation", "Skin Moles", "Skin Lesion"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'tooth_disorder',
    name: "Tooth Disorder",
    category: 'General Clinical',
    description: "A clinical condition characterized by peripheral edema and mouth ulcer, indexed in our 250+ condition dataset.",
    symptoms: ["Peripheral Edema", "Mouth Ulcer", "Ear Pain", "Toothache"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'heart_attack',
    name: "Heart Attack",
    category: 'Cardiovascular',
    description: "A clinical condition characterized by heartburn and fainting, indexed in our 250+ condition dataset.",
    symptoms: ["Heartburn", "Fainting", "Nausea", "Increased Heart Rate"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'fracture_of_the_leg',
    name: "Fracture of the Leg",
    category: 'Musculoskeletal',
    description: "A clinical condition characterized by knee weakness and leg stiffness or tightness, indexed in our 250+ condition dataset.",
    symptoms: ["Knee Weakness", "Leg Stiffness Or Tightness", "Ankle Swelling", "Knee Swelling"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'oral_thrush_yeast_infection',
    name: "Oral Thrush (yeast Infection)",
    category: 'Infectious',
    description: "A clinical condition characterized by irritable infant and constipation, indexed in our 250+ condition dataset.",
    symptoms: ["Irritable Infant", "Constipation", "Tongue Lesions", "Cough"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'obstructive_sleep_apnea_osa',
    name: "Obstructive Sleep Apnea (osa)",
    category: 'Respiratory',
    description: "A clinical condition characterized by mouth dryness and fatigue, indexed in our 250+ condition dataset.",
    symptoms: ["Mouth Dryness", "Fatigue", "Sweating", "Difficulty Breathing"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'hypokalemia',
    name: "Hypokalemia",
    category: 'General Clinical',
    description: "A clinical condition characterized by sharp chest pain and diarrhea, indexed in our 250+ condition dataset.",
    symptoms: ["Sharp Chest Pain", "Diarrhea", "Nausea", "Fainting"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'psoriasis',
    name: "Psoriasis",
    category: 'Dermatological',
    description: "A clinical condition characterized by skin swelling and skin rash, indexed in our 250+ condition dataset.",
    symptoms: ["Skin Swelling", "Skin Rash", "Irregular Appearing Scalp", "Itchy Scalp"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'arthritis_of_the_hip',
    name: "Arthritis of the Hip",
    category: 'Musculoskeletal',
    description: "A clinical condition characterized by pelvic pain and knee pain, indexed in our 250+ condition dataset.",
    symptoms: ["Pelvic Pain", "Knee Pain", "Ache All Over", "Groin Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'sensorineural_hearing_loss',
    name: "Sensorineural Hearing Loss",
    category: 'ENT & Sensory',
    description: "A clinical condition characterized by hoarse voice and throat feels tight, indexed in our 250+ condition dataset.",
    symptoms: ["Hoarse Voice", "Throat Feels Tight", "Ear Pain", "Nasal Congestion"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'ileus',
    name: "Ileus",
    category: 'General Clinical',
    description: "A clinical condition characterized by lower abdominal pain and headache, indexed in our 250+ condition dataset.",
    symptoms: ["Lower Abdominal Pain", "Headache", "Diarrhea", "Vomiting"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'sickle_cell_crisis',
    name: "Sickle Cell Crisis",
    category: 'General Clinical',
    description: "A clinical condition characterized by vomiting and arm pain, indexed in our 250+ condition dataset.",
    symptoms: ["Vomiting", "Arm Pain", "Sharp Abdominal Pain", "Leg Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'urethritis',
    name: "Urethritis",
    category: 'Urological',
    description: "A clinical condition characterized by vaginal itching and suprapubic pain, indexed in our 250+ condition dataset.",
    symptoms: ["Vaginal Itching", "Suprapubic Pain", "Painful Urination", "Penile Discharge"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'prostatitis',
    name: "Prostatitis",
    category: 'Urological',
    description: "A clinical condition characterized by sharp abdominal pain and retention of urine, indexed in our 250+ condition dataset.",
    symptoms: ["Sharp Abdominal Pain", "Retention Of Urine", "Impotence", "Blood In Urine"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'otitis_externa_swimmer_s_ear',
    name: "Otitis Externa (swimmer's Ear)",
    category: 'ENT & Sensory',
    description: "A clinical condition characterized by itchy ear s and fever, indexed in our 250+ condition dataset.",
    symptoms: ["Itchy Ear S", "Fever", "Ear Pain", "Plugged Feeling In Ear"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'acute_bronchiolitis',
    name: "Acute Bronchiolitis",
    category: 'Respiratory',
    description: "A clinical condition characterized by nasal congestion and fever, indexed in our 250+ condition dataset.",
    symptoms: ["Nasal Congestion", "Fever", "Wheezing", "Vomiting"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'insect_bite',
    name: "Insect Bite",
    category: 'General Clinical',
    description: "A clinical condition characterized by leg swelling and hand or finger swelling, indexed in our 250+ condition dataset.",
    symptoms: ["Leg Swelling", "Hand Or Finger Swelling", "Skin Rash", "Peripheral Edema"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'paroxysmal_ventricular_tachycardia',
    name: "Paroxysmal Ventricular Tachycardia",
    category: 'Cardiovascular',
    description: "A clinical condition characterized by dizziness and decreased heart rate, indexed in our 250+ condition dataset.",
    symptoms: ["Dizziness", "Decreased Heart Rate", "Fainting", "Chest Tightness"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'pyogenic_skin_infection',
    name: "Pyogenic Skin Infection",
    category: 'Infectious',
    description: "A clinical condition characterized by foot or toe pain and abnormal appearing skin, indexed in our 250+ condition dataset.",
    symptoms: ["Foot Or Toe Pain", "Abnormal Appearing Skin", "Peripheral Edema", "Leg Swelling"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'viral_exanthem',
    name: "Viral Exanthem",
    category: 'Infectious',
    description: "A clinical condition characterized by skin swelling and fever, indexed in our 250+ condition dataset.",
    symptoms: ["Skin Swelling", "Fever", "Abnormal Appearing Skin", "Skin Rash"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'noninfectious_gastroenteritis',
    name: "Noninfectious Gastroenteritis",
    category: 'Infectious',
    description: "A clinical condition characterized by diarrhea and nausea, indexed in our 250+ condition dataset.",
    symptoms: ["Diarrhea", "Nausea", "Sharp Abdominal Pain", "Decreased Appetite"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'benign_prostatic_hyperplasia_bph',
    name: "Benign Prostatic Hyperplasia (bph)",
    category: 'Urological',
    description: "A clinical condition characterized by symptoms of prostate and frequent urination, indexed in our 250+ condition dataset.",
    symptoms: ["Symptoms Of Prostate", "Frequent Urination", "Blood In Urine", "Impotence"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'cataract',
    name: "Cataract",
    category: 'ENT & Sensory',
    description: "A clinical condition characterized by double vision and symptoms of eye, indexed in our 250+ condition dataset.",
    symptoms: ["Double Vision", "Symptoms Of Eye", "Blindness", "Lacrimation"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'spinal_stenosis',
    name: "Spinal Stenosis",
    category: 'Musculoskeletal',
    description: "A clinical condition characterized by back pain and neck pain, indexed in our 250+ condition dataset.",
    symptoms: ["Back Pain", "Neck Pain", "Problems With Movement", "Arm Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'intestinal_obstruction',
    name: "Intestinal Obstruction",
    category: 'General Clinical',
    description: "A clinical condition characterized by vaginal itching and nausea, indexed in our 250+ condition dataset.",
    symptoms: ["Vaginal Itching", "Nausea", "Stomach Bloating", "Sharp Abdominal Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'acute_bronchitis',
    name: "Acute Bronchitis",
    category: 'Respiratory',
    description: "A clinical condition characterized by nasal congestion and fever, indexed in our 250+ condition dataset.",
    symptoms: ["Nasal Congestion", "Fever", "Coryza", "Headache"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'ischemic_heart_disease',
    name: "Ischemic Heart Disease",
    category: 'Cardiovascular',
    description: "A clinical condition characterized by muscle pain and sharp chest pain, indexed in our 250+ condition dataset.",
    symptoms: ["Muscle Pain", "Sharp Chest Pain", "Peripheral Edema", "Chest Tightness"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'croup',
    name: "Croup",
    category: 'Respiratory',
    description: "A clinical condition characterized by nasal congestion and vomiting, indexed in our 250+ condition dataset.",
    symptoms: ["Nasal Congestion", "Vomiting", "Cough", "Pulling At Ears"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'idiopathic_excessive_menstruation',
    name: "Idiopathic Excessive Menstruation",
    category: 'Reproductive',
    description: "A clinical condition characterized by sharp abdominal pain and cramps and spasms, indexed in our 250+ condition dataset.",
    symptoms: ["Sharp Abdominal Pain", "Cramps And Spasms", "Frequent Menstruation", "Unpredictable Menstruation"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'ear_drum_damage',
    name: "Ear Drum Damage",
    category: 'ENT & Sensory',
    description: "A clinical condition characterized by pus draining from ear and ringing in ear, indexed in our 250+ condition dataset.",
    symptoms: ["Pus Draining From Ear", "Ringing In Ear", "Redness In Ear", "Pulling At Ears"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'erectile_dysfunction',
    name: "Erectile Dysfunction",
    category: 'General Clinical',
    description: "A clinical condition characterized by involuntary urination and loss of sex drive, indexed in our 250+ condition dataset.",
    symptoms: ["Involuntary Urination", "Loss Of Sex Drive", "Symptoms Of Prostate", "Frequent Urination"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'temporary_or_benign_blood_in_urine',
    name: "Temporary or Benign Blood in Urine",
    category: 'Urological',
    description: "A clinical condition characterized by painful urination and suprapubic pain, indexed in our 250+ condition dataset.",
    symptoms: ["Painful Urination", "Suprapubic Pain", "Frequent Urination", "Lower Abdominal Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'onychomycosis',
    name: "Onychomycosis",
    category: 'General Clinical',
    description: "A clinical condition characterized by skin growth and abnormal appearing skin, indexed in our 250+ condition dataset.",
    symptoms: ["Skin Growth", "Abnormal Appearing Skin", "Skin Swelling", "Skin On Leg Or Foot Looks Infected"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'iron_deficiency_anemia',
    name: "Iron Deficiency Anemia",
    category: 'Endocrine',
    description: "A clinical condition characterized by intermenstrual bleeding and heartburn, indexed in our 250+ condition dataset.",
    symptoms: ["Intermenstrual Bleeding", "Heartburn", "Weakness", "Heavy Menstrual Flow"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'acute_respiratory_distress_syndrome_ards',
    name: "Acute Respiratory Distress Syndrome (ards)",
    category: 'Respiratory',
    description: "A clinical condition characterized by chills and chest tightness, indexed in our 250+ condition dataset.",
    symptoms: ["Chills", "Chest Tightness", "Fever", "Sharp Chest Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'tendinitis',
    name: "Tendinitis",
    category: 'Musculoskeletal',
    description: "A clinical condition characterized by hand or finger swelling and ankle pain, indexed in our 250+ condition dataset.",
    symptoms: ["Hand Or Finger Swelling", "Ankle Pain", "Arm Pain", "Shoulder Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'common_cold',
    name: "Common Cold",
    category: 'General Clinical',
    description: "A clinical condition characterized by chills and headache, indexed in our 250+ condition dataset.",
    symptoms: ["Chills", "Headache", "Ear Pain", "Cough"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'acne',
    name: "Acne",
    category: 'Dermatological',
    description: "A clinical condition characterized by irregular appearing scalp and skin dryness peeling scaliness or roughness, indexed in our 250+ condition dataset.",
    symptoms: ["Irregular Appearing Scalp", "Skin Dryness Peeling Scaliness Or Roughness", "Long Menstrual Periods", "Abnormal Appearing Skin"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'depression',
    name: "Depression",
    category: 'Mental Health',
    description: "A clinical condition characterized by disturbance of memory and abusing alcohol, indexed in our 250+ condition dataset.",
    symptoms: ["Disturbance Of Memory", "Abusing Alcohol", "Hostile Behavior", "Temper Problems"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'drug_abuse',
    name: "Drug Abuse",
    category: 'General Clinical',
    description: "A clinical condition characterized by smoking problems and antisocial behavior, indexed in our 250+ condition dataset.",
    symptoms: ["Smoking Problems", "Antisocial Behavior", "Drug Abuse", "Abusing Alcohol"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'urinary_tract_obstruction',
    name: "Urinary Tract Obstruction",
    category: 'Urological',
    description: "A clinical condition characterized by painful urination and excessive urination at night, indexed in our 250+ condition dataset.",
    symptoms: ["Painful Urination", "Excessive Urination At Night", "Blood In Urine", "Frequent Urination"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'iridocyclitis',
    name: "Iridocyclitis",
    category: 'General Clinical',
    description: "A clinical condition characterized by headache and foreign body sensation in eye, indexed in our 250+ condition dataset.",
    symptoms: ["Headache", "Foreign Body Sensation In Eye", "Lacrimation", "Pain In Eye"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'varicocele_of_the_testicles',
    name: "Varicocele of the Testicles",
    category: 'General Clinical',
    description: "A clinical condition characterized by involuntary urination and pain of the anus, indexed in our 250+ condition dataset.",
    symptoms: ["Involuntary Urination", "Pain Of The Anus", "Infertility", "Pain In Testicles"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'irritable_bowel_syndrome',
    name: "Irritable Bowel Syndrome",
    category: 'Digestive',
    description: "A clinical condition characterized by flatulence and insomnia, indexed in our 250+ condition dataset.",
    symptoms: ["Flatulence", "Insomnia", "Nausea", "Lower Abdominal Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'ovarian_cyst',
    name: "Ovarian Cyst",
    category: 'Dermatological',
    description: "A clinical condition characterized by intermenstrual bleeding and vaginal discharge, indexed in our 250+ condition dataset.",
    symptoms: ["Intermenstrual Bleeding", "Vaginal Discharge", "Vomiting", "Lower Abdominal Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'lipoma',
    name: "Lipoma",
    category: 'General Clinical',
    description: "A clinical condition characterized by bones are painful and groin mass, indexed in our 250+ condition dataset.",
    symptoms: ["Bones Are Painful", "Groin Mass", "Arm Lump Or Mass", "Abnormal Appearing Skin"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'pulmonary_hypertension',
    name: "Pulmonary Hypertension",
    category: 'Cardiovascular',
    description: "A clinical condition characterized by feeling ill and apnea, indexed in our 250+ condition dataset.",
    symptoms: ["Feeling Ill", "Apnea", "Sharp Chest Pain", "Palpitations"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'lymphadenitis',
    name: "Lymphadenitis",
    category: 'General Clinical',
    description: "A clinical condition characterized by cough and sharp abdominal pain, indexed in our 250+ condition dataset.",
    symptoms: ["Cough", "Sharp Abdominal Pain", "Neck Swelling", "Fever"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'injury_to_the_face',
    name: "Injury to the Face",
    category: 'General Clinical',
    description: "A clinical condition characterized by diminished hearing and neck stiffness or tightness, indexed in our 250+ condition dataset.",
    symptoms: ["Diminished Hearing", "Neck Stiffness Or Tightness", "Neck Pain", "Nosebleed"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'aortic_valve_disease',
    name: "Aortic Valve Disease",
    category: 'General Clinical',
    description: "A clinical condition characterized by irregular heartbeat and sharp chest pain, indexed in our 250+ condition dataset.",
    symptoms: ["Irregular Heartbeat", "Sharp Chest Pain", "Difficulty Breathing", "Palpitations"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'rheumatoid_arthritis',
    name: "Rheumatoid Arthritis",
    category: 'Musculoskeletal',
    description: "A clinical condition characterized by wrist swelling and elbow swelling, indexed in our 250+ condition dataset.",
    symptoms: ["Wrist Swelling", "Elbow Swelling", "Ache All Over", "Wrist Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'impetigo',
    name: "Impetigo",
    category: 'General Clinical',
    description: "A clinical condition characterized by mouth ulcer and skin swelling, indexed in our 250+ condition dataset.",
    symptoms: ["Mouth Ulcer", "Skin Swelling", "Skin Lesion", "Sore In Nose"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'oppositional_disorder',
    name: "Oppositional Disorder",
    category: 'General Clinical',
    description: "A clinical condition characterized by low self esteem and hostile behavior, indexed in our 250+ condition dataset.",
    symptoms: ["Low Self Esteem", "Hostile Behavior", "Excessive Anger", "Fainting"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'diabetic_peripheral_neuropathy',
    name: "Diabetic Peripheral Neuropathy",
    category: 'Endocrine',
    description: "A clinical condition characterized by lymphedema and foot or toe stiffness or tightness, indexed in our 250+ condition dataset.",
    symptoms: ["Lymphedema", "Foot Or Toe Stiffness Or Tightness", "Skin Lesion", "Leg Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'idiopathic_irregular_menstrual_cycle',
    name: "Idiopathic Irregular Menstrual Cycle",
    category: 'Reproductive',
    description: "A clinical condition characterized by cramps and spasms and unpredictable menstruation, indexed in our 250+ condition dataset.",
    symptoms: ["Cramps And Spasms", "Unpredictable Menstruation", "Heavy Menstrual Flow", "Long Menstrual Periods"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'interstitial_lung_disease',
    name: "Interstitial Lung Disease",
    category: 'Respiratory',
    description: "A clinical condition characterized by sore throat and shortness of breath, indexed in our 250+ condition dataset.",
    symptoms: ["Sore Throat", "Shortness Of Breath", "Wheezing", "Cough"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'mononeuritis',
    name: "Mononeuritis",
    category: 'General Clinical',
    description: "A clinical condition characterized by hand or finger pain and leg pain, indexed in our 250+ condition dataset.",
    symptoms: ["Hand Or Finger Pain", "Leg Pain", "Wrist Pain", "Hand Or Finger Weakness"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'hypovolemia',
    name: "Hypovolemia",
    category: 'General Clinical',
    description: "A clinical condition characterized by fainting and dizziness, indexed in our 250+ condition dataset.",
    symptoms: ["Fainting", "Dizziness", "Diarrhea", "Vomiting"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'schizophrenia',
    name: "Schizophrenia",
    category: 'Mental Health',
    description: "A clinical condition characterized by insomnia and depression, indexed in our 250+ condition dataset.",
    symptoms: ["Insomnia", "Depression", "Hysterical Behavior", "Fears And Phobias"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'sepsis',
    name: "Sepsis",
    category: 'Infectious',
    description: "A clinical condition characterized by shortness of breath and fever, indexed in our 250+ condition dataset.",
    symptoms: ["Shortness Of Breath", "Fever", "Feeling Ill", "Difficulty Breathing"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'cholecystitis',
    name: "Cholecystitis",
    category: 'Digestive',
    description: "A clinical condition characterized by vomiting and back pain, indexed in our 250+ condition dataset.",
    symptoms: ["Vomiting", "Back Pain", "Side Pain", "Sharp Abdominal Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'social_phobia',
    name: "Social Phobia",
    category: 'Mental Health',
    description: "A clinical condition characterized by abusing alcohol and excessive appetite, indexed in our 250+ condition dataset.",
    symptoms: ["Abusing Alcohol", "Excessive Appetite", "Excessive Anger", "Depression"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'ear_wax_impaction',
    name: "Ear Wax Impaction",
    category: 'ENT & Sensory',
    description: "A clinical condition characterized by fluid in ear and sinus congestion, indexed in our 250+ condition dataset.",
    symptoms: ["Fluid In Ear", "Sinus Congestion", "Plugged Feeling In Ear", "Ringing In Ear"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'rosacea',
    name: "Rosacea",
    category: 'Dermatological',
    description: "A clinical condition characterized by abnormal appearing skin and symptoms of eye, indexed in our 250+ condition dataset.",
    symptoms: ["Abnormal Appearing Skin", "Symptoms Of Eye", "Skin Growth", "Skin Dryness Peeling Scaliness Or Roughness"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'fracture_of_the_facial_bones',
    name: "Fracture of the Facial Bones",
    category: 'Musculoskeletal',
    description: "A clinical condition characterized by lip swelling and pain in eye, indexed in our 250+ condition dataset.",
    symptoms: ["Lip Swelling", "Pain In Eye", "Double Vision", "Facial Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'post_traumatic_stress_disorder_ptsd',
    name: "Post-traumatic Stress Disorder (ptsd)",
    category: 'General Clinical',
    description: "A clinical condition characterized by hostile behavior and temper problems, indexed in our 250+ condition dataset.",
    symptoms: ["Hostile Behavior", "Temper Problems", "Insomnia", "Drug Abuse"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'blepharitis',
    name: "Blepharitis",
    category: 'General Clinical',
    description: "A clinical condition characterized by eye burns or stings and eyelid swelling, indexed in our 250+ condition dataset.",
    symptoms: ["Eye Burns Or Stings", "Eyelid Swelling", "Spots Or Clouds In Vision", "Lacrimation"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'cystitis',
    name: "Cystitis",
    category: 'Dermatological',
    description: "A clinical condition characterized by involuntary urination and side pain, indexed in our 250+ condition dataset.",
    symptoms: ["Involuntary Urination", "Side Pain", "Symptoms Of Bladder", "Frequent Urination"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'hemorrhoids',
    name: "Hemorrhoids",
    category: 'Digestive',
    description: "A clinical condition characterized by heartburn and lower body pain, indexed in our 250+ condition dataset.",
    symptoms: ["Heartburn", "Lower Body Pain", "Constipation", "Rectal Bleeding"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'contact_dermatitis',
    name: "Contact Dermatitis",
    category: 'Dermatological',
    description: "A clinical condition characterized by skin moles and allergic reaction, indexed in our 250+ condition dataset.",
    symptoms: ["Skin Moles", "Allergic Reaction", "Itching Of Skin", "Skin Irritation"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'sinus_bradycardia',
    name: "Sinus Bradycardia",
    category: 'Cardiovascular',
    description: "A clinical condition characterized by chest tightness and irregular heartbeat, indexed in our 250+ condition dataset.",
    symptoms: ["Chest Tightness", "Irregular Heartbeat", "Fainting", "Decreased Heart Rate"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'pelvic_inflammatory_disease',
    name: "Pelvic Inflammatory Disease",
    category: 'Reproductive',
    description: "A clinical condition characterized by burning abdominal pain and painful urination, indexed in our 250+ condition dataset.",
    symptoms: ["Burning Abdominal Pain", "Painful Urination", "Intermenstrual Bleeding", "Lower Abdominal Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'liver_disease',
    name: "Liver Disease",
    category: 'Digestive',
    description: "A clinical condition characterized by upper abdominal pain and nausea, indexed in our 250+ condition dataset.",
    symptoms: ["Upper Abdominal Pain", "Nausea", "Blood In Stool", "Peripheral Edema"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'chronic_constipation',
    name: "Chronic Constipation",
    category: 'General Clinical',
    description: "A clinical condition characterized by retention of urine and lower abdominal pain, indexed in our 250+ condition dataset.",
    symptoms: ["Retention Of Urine", "Lower Abdominal Pain", "Vomiting", "Constipation"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'skin_polyp',
    name: "Skin Polyp",
    category: 'Dermatological',
    description: "A clinical condition characterized by skin swelling and skin moles, indexed in our 250+ condition dataset.",
    symptoms: ["Skin Swelling", "Skin Moles", "Warts", "Irregular Appearing Scalp"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'brachial_neuritis',
    name: "Brachial Neuritis",
    category: 'General Clinical',
    description: "A clinical condition characterized by elbow pain and neck pain, indexed in our 250+ condition dataset.",
    symptoms: ["Elbow Pain", "Neck Pain", "Paresthesia", "Low Back Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'esophagitis',
    name: "Esophagitis",
    category: 'Digestive',
    description: "A clinical condition characterized by difficulty in swallowing and upper abdominal pain, indexed in our 250+ condition dataset.",
    symptoms: ["Difficulty In Swallowing", "Upper Abdominal Pain", "Vomiting", "Sore Throat"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'yeast_infection',
    name: "Yeast Infection",
    category: 'Infectious',
    description: "A clinical condition characterized by suprapubic pain and frequent urination, indexed in our 250+ condition dataset.",
    symptoms: ["Suprapubic Pain", "Frequent Urination", "Sharp Abdominal Pain", "Vaginal Discharge"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'diverticulitis',
    name: "Diverticulitis",
    category: 'Digestive',
    description: "A clinical condition characterized by constipation and sharp abdominal pain, indexed in our 250+ condition dataset.",
    symptoms: ["Constipation", "Sharp Abdominal Pain", "Lower Abdominal Pain", "Diarrhea"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'psychotic_disorder',
    name: "Psychotic Disorder",
    category: 'Mental Health',
    description: "A clinical condition characterized by insomnia and hostile behavior, indexed in our 250+ condition dataset.",
    symptoms: ["Insomnia", "Hostile Behavior", "Fears And Phobias", "Delusions Or Hallucinations"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'smoking_or_tobacco_addiction',
    name: "Smoking or Tobacco Addiction",
    category: 'Mental Health',
    description: "A clinical condition characterized by excessive anger and smoking problems, indexed in our 250+ condition dataset.",
    symptoms: ["Excessive Anger", "Smoking Problems", "Hurts To Breath", "Drug Abuse"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'sprain_or_strain',
    name: "Sprain or Strain",
    category: 'Musculoskeletal',
    description: "A clinical condition characterized by back pain and arm pain, indexed in our 250+ condition dataset.",
    symptoms: ["Back Pain", "Arm Pain", "Wrist Pain", "Foot Or Toe Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'idiopathic_painful_menstruation',
    name: "Idiopathic Painful Menstruation",
    category: 'Reproductive',
    description: "A clinical condition characterized by vaginal discharge and pelvic pain, indexed in our 250+ condition dataset.",
    symptoms: ["Vaginal Discharge", "Pelvic Pain", "Cramps And Spasms", "Heavy Menstrual Flow"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'eustachian_tube_dysfunction_ear_disorder',
    name: "Eustachian Tube Dysfunction (ear Disorder)",
    category: 'ENT & Sensory',
    description: "A clinical condition characterized by sore throat and abnormal breathing sounds, indexed in our 250+ condition dataset.",
    symptoms: ["Sore Throat", "Abnormal Breathing Sounds", "Ringing In Ear", "Ear Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'appendicitis',
    name: "Appendicitis",
    category: 'General Clinical',
    description: "A clinical condition characterized by decreased appetite and burning abdominal pain, indexed in our 250+ condition dataset.",
    symptoms: ["Decreased Appetite", "Burning Abdominal Pain", "Lower Abdominal Pain", "Stomach Bloating"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'hyperemesis_gravidarum',
    name: "Hyperemesis Gravidarum",
    category: 'General Clinical',
    description: "A clinical condition characterized by vomiting blood and burning abdominal pain, indexed in our 250+ condition dataset.",
    symptoms: ["Vomiting Blood", "Burning Abdominal Pain", "Nausea", "Pain During Pregnancy"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'pleural_effusion',
    name: "Pleural Effusion",
    category: 'General Clinical',
    description: "A clinical condition characterized by sharp abdominal pain and weakness, indexed in our 250+ condition dataset.",
    symptoms: ["Sharp Abdominal Pain", "Weakness", "Rib Pain", "Hurts To Breath"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'sialoadenitis',
    name: "Sialoadenitis",
    category: 'General Clinical',
    description: "A clinical condition characterized by swollen lymph nodes and cough, indexed in our 250+ condition dataset.",
    symptoms: ["Swollen Lymph Nodes", "Cough", "Sore Throat", "Facial Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'urinary_tract_infection',
    name: "Urinary Tract Infection",
    category: 'Infectious',
    description: "A clinical condition characterized by suprapubic pain and painful urination, indexed in our 250+ condition dataset.",
    symptoms: ["Suprapubic Pain", "Painful Urination", "Side Pain", "Vomiting"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'ankylosing_spondylitis',
    name: "Ankylosing Spondylitis",
    category: 'Musculoskeletal',
    description: "A clinical condition characterized by paresthesia and elbow pain, indexed in our 250+ condition dataset.",
    symptoms: ["Paresthesia", "Elbow Pain", "Ache All Over", "Low Back Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'peripheral_nerve_disorder',
    name: "Peripheral Nerve Disorder",
    category: 'General Clinical',
    description: "A clinical condition characterized by leg weakness and loss of sensation, indexed in our 250+ condition dataset.",
    symptoms: ["Leg Weakness", "Loss Of Sensation", "Arm Pain", "Back Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'sebaceous_cyst',
    name: "Sebaceous Cyst",
    category: 'Dermatological',
    description: "A clinical condition characterized by skin moles and skin growth, indexed in our 250+ condition dataset.",
    symptoms: ["Skin Moles", "Skin Growth", "Neck Mass", "Hand Or Finger Lump Or Mass"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'neurosis',
    name: "Neurosis",
    category: 'General Clinical',
    description: "A clinical condition characterized by smoking problems and hostile behavior, indexed in our 250+ condition dataset.",
    symptoms: ["Smoking Problems", "Hostile Behavior", "Depression", "Excessive Anger"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'seborrheic_keratosis',
    name: "Seborrheic Keratosis",
    category: 'Dermatological',
    description: "A clinical condition characterized by itching of skin and skin moles, indexed in our 250+ condition dataset.",
    symptoms: ["Itching Of Skin", "Skin Moles", "Abnormal Appearing Skin", "Skin Growth"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'spontaneous_abortion',
    name: "Spontaneous Abortion",
    category: 'General Clinical',
    description: "A clinical condition characterized by burning abdominal pain and uterine contractions, indexed in our 250+ condition dataset.",
    symptoms: ["Burning Abdominal Pain", "Uterine Contractions", "Pain During Pregnancy", "Pelvic Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'adjustment_reaction',
    name: "Adjustment Reaction",
    category: 'General Clinical',
    description: "A clinical condition characterized by delusions or hallucinations and insomnia, indexed in our 250+ condition dataset.",
    symptoms: ["Delusions Or Hallucinations", "Insomnia", "Depression", "Hostile Behavior"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'gallstone',
    name: "Gallstone",
    category: 'General Clinical',
    description: "A clinical condition characterized by regurgitation 1 and back pain, indexed in our 250+ condition dataset.",
    symptoms: ["Regurgitation 1", "Back Pain", "Burning Abdominal Pain", "Nausea"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'multiple_sclerosis',
    name: "Multiple Sclerosis",
    category: 'Neurological',
    description: "A clinical condition characterized by abnormal involuntary movements and leg weakness, indexed in our 250+ condition dataset.",
    symptoms: ["Abnormal Involuntary Movements", "Leg Weakness", "Loss Of Sensation", "Fatigue"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'angina',
    name: "Angina",
    category: 'Cardiovascular',
    description: "A clinical condition characterized by hot flashes and palpitations, indexed in our 250+ condition dataset.",
    symptoms: ["Hot Flashes", "Palpitations", "Sharp Chest Pain", "Chest Tightness"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'skin_pigmentation_disorder',
    name: "Skin Pigmentation Disorder",
    category: 'Dermatological',
    description: "A clinical condition characterized by irregular appearing scalp and warts, indexed in our 250+ condition dataset.",
    symptoms: ["Irregular Appearing Scalp", "Warts", "Skin Growth", "Skin Moles"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'diabetic_ketoacidosis',
    name: "Diabetic Ketoacidosis",
    category: 'Endocrine',
    description: "A clinical condition characterized by frequent urination and decreased appetite, indexed in our 250+ condition dataset.",
    symptoms: ["Frequent Urination", "Decreased Appetite", "Nausea", "Fluid Retention"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'obsessive_compulsive_disorder_ocd',
    name: "Obsessive Compulsive Disorder (ocd)",
    category: 'General Clinical',
    description: "A clinical condition characterized by feeling ill and lack of growth, indexed in our 250+ condition dataset.",
    symptoms: ["Feeling Ill", "Lack Of Growth", "Low Self Esteem", "Anxiety And Nervousness"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'hyponatremia',
    name: "Hyponatremia",
    category: 'General Clinical',
    description: "A clinical condition characterized by shortness of breath and back pain, indexed in our 250+ condition dataset.",
    symptoms: ["Shortness Of Breath", "Back Pain", "Sharp Chest Pain", "Vomiting"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'personality_disorder',
    name: "Personality Disorder",
    category: 'General Clinical',
    description: "A clinical condition characterized by temper problems and hostile behavior, indexed in our 250+ condition dataset.",
    symptoms: ["Temper Problems", "Hostile Behavior", "Delusions Or Hallucinations", "Insomnia"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'strep_throat',
    name: "Strep Throat",
    category: 'Infectious',
    description: "A clinical condition characterized by vomiting and headache, indexed in our 250+ condition dataset.",
    symptoms: ["Vomiting", "Headache", "Ear Pain", "Skin Rash"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'gastritis',
    name: "Gastritis",
    category: 'Digestive',
    description: "A clinical condition characterized by headache and diarrhea, indexed in our 250+ condition dataset.",
    symptoms: ["Headache", "Diarrhea", "Sharp Abdominal Pain", "Regurgitation 1"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'skin_cancer',
    name: "Skin Cancer",
    category: 'Dermatological',
    description: "A clinical condition characterized by irregular appearing scalp and lip swelling, indexed in our 250+ condition dataset.",
    symptoms: ["Irregular Appearing Scalp", "Lip Swelling", "Skin Lesion", "Skin Growth"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'tonsillitis',
    name: "Tonsillitis",
    category: 'ENT & Sensory',
    description: "A clinical condition characterized by lump in throat and diminished hearing, indexed in our 250+ condition dataset.",
    symptoms: ["Lump In Throat", "Diminished Hearing", "Abnormal Breathing Sounds", "Throat Redness"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'developmental_disability',
    name: "Developmental Disability",
    category: 'General Clinical',
    description: "A clinical condition characterized by restlessness and temper problems, indexed in our 250+ condition dataset.",
    symptoms: ["Restlessness", "Temper Problems", "Seizures", "Obsessions And Compulsions"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'acute_stress_reaction',
    name: "Acute Stress Reaction",
    category: 'General Clinical',
    description: "A clinical condition characterized by abnormal involuntary movements and sharp chest pain, indexed in our 250+ condition dataset.",
    symptoms: ["Abnormal Involuntary Movements", "Sharp Chest Pain", "Headache", "Dizziness"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'delirium',
    name: "Delirium",
    category: 'General Clinical',
    description: "A clinical condition characterized by slurring words and problems with movement, indexed in our 250+ condition dataset.",
    symptoms: ["Slurring Words", "Problems With Movement", "Hostile Behavior", "Delusions Or Hallucinations"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'callus',
    name: "Callus",
    category: 'General Clinical',
    description: "A clinical condition characterized by acne or pimples and skin swelling, indexed in our 250+ condition dataset.",
    symptoms: ["Acne Or Pimples", "Skin Swelling", "Foot Or Toe Swelling", "Skin Growth"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'deviated_nasal_septum',
    name: "Deviated Nasal Septum",
    category: 'General Clinical',
    description: "A clinical condition characterized by facial pain and nosebleed, indexed in our 250+ condition dataset.",
    symptoms: ["Facial Pain", "Nosebleed", "Painful Sinuses", "Headache"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'hemangioma',
    name: "Hemangioma",
    category: 'General Clinical',
    description: "A clinical condition characterized by lip swelling and irregular appearing scalp, indexed in our 250+ condition dataset.",
    symptoms: ["Lip Swelling", "Irregular Appearing Scalp", "Skin Moles", "Skin Lesion"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'chronic_back_pain',
    name: "Chronic Back Pain",
    category: 'General Clinical',
    description: "A clinical condition characterized by back cramps or spasms and side pain, indexed in our 250+ condition dataset.",
    symptoms: ["Back Cramps Or Spasms", "Side Pain", "Low Back Pain", "Hip Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'heart_failure',
    name: "Heart Failure",
    category: 'Cardiovascular',
    description: "A clinical condition characterized by cough and difficulty breathing, indexed in our 250+ condition dataset.",
    symptoms: ["Cough", "Difficulty Breathing", "Palpitations", "Sharp Chest Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'conjunctivitis',
    name: "Conjunctivitis",
    category: 'General Clinical',
    description: "A clinical condition characterized by sore throat and pain in eye, indexed in our 250+ condition dataset.",
    symptoms: ["Sore Throat", "Pain In Eye", "Coryza", "Swollen Eye"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'herniated_disk',
    name: "Herniated Disk",
    category: 'Digestive',
    description: "A clinical condition characterized by arm pain and low back pain, indexed in our 250+ condition dataset.",
    symptoms: ["Arm Pain", "Low Back Pain", "Paresthesia", "Back Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'breast_infection_mastitis',
    name: "Breast Infection (mastitis)",
    category: 'Infectious',
    description: "A clinical condition characterized by skin growth and chills, indexed in our 250+ condition dataset.",
    symptoms: ["Skin Growth", "Chills", "Mouth Dryness", "Pain Or Soreness Of Breast"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'pulmonary_embolism',
    name: "Pulmonary Embolism",
    category: 'Cardiovascular',
    description: "A clinical condition characterized by leg pain and sharp chest pain, indexed in our 250+ condition dataset.",
    symptoms: ["Leg Pain", "Sharp Chest Pain", "Cough", "Side Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'conduct_disorder',
    name: "Conduct Disorder",
    category: 'General Clinical',
    description: "A clinical condition characterized by abusing alcohol and lack of growth, indexed in our 250+ condition dataset.",
    symptoms: ["Abusing Alcohol", "Lack Of Growth", "Hostile Behavior", "Temper Problems"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'epididymitis',
    name: "Epididymitis",
    category: 'General Clinical',
    description: "A clinical condition characterized by mass in scrotum and painful urination, indexed in our 250+ condition dataset.",
    symptoms: ["Mass In Scrotum", "Painful Urination", "Retention Of Urine", "Sharp Abdominal Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'molluscum_contagiosum',
    name: "Molluscum Contagiosum",
    category: 'General Clinical',
    description: "A clinical condition characterized by acne or pimples and abnormal appearing skin, indexed in our 250+ condition dataset.",
    symptoms: ["Acne Or Pimples", "Abnormal Appearing Skin", "Knee Lump Or Mass", "Itching Of Skin"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'benign_vaginal_discharge_leukorrhea',
    name: "Benign Vaginal Discharge (leukorrhea)",
    category: 'Reproductive',
    description: "A clinical condition characterized by painful urination and suprapubic pain, indexed in our 250+ condition dataset.",
    symptoms: ["Painful Urination", "Suprapubic Pain", "Vaginal Discharge", "Vaginal Redness"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'laryngitis',
    name: "Laryngitis",
    category: 'ENT & Sensory',
    description: "A clinical condition characterized by throat feels tight and difficulty speaking, indexed in our 250+ condition dataset.",
    symptoms: ["Throat Feels Tight", "Difficulty Speaking", "Sore Throat", "Fever"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'diaper_rash',
    name: "Diaper Rash",
    category: 'Dermatological',
    description: "A clinical condition characterized by temper problems and skin rash, indexed in our 250+ condition dataset.",
    symptoms: ["Temper Problems", "Skin Rash", "Diarrhea", "Fever"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'gastroduodenal_ulcer',
    name: "Gastroduodenal Ulcer",
    category: 'Digestive',
    description: "A clinical condition characterized by changes in stool appearance and blood in stool, indexed in our 250+ condition dataset.",
    symptoms: ["Changes In Stool Appearance", "Blood In Stool", "Vomiting Blood", "Upper Abdominal Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'inguinal_hernia',
    name: "Inguinal Hernia",
    category: 'Digestive',
    description: "A clinical condition characterized by symptoms of the scrotum and testes and lower abdominal pain, indexed in our 250+ condition dataset.",
    symptoms: ["Symptoms Of The Scrotum And Testes", "Lower Abdominal Pain", "Groin Pain", "Groin Mass"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'eczema',
    name: "Eczema",
    category: 'Dermatological',
    description: "A clinical condition characterized by itching of skin and skin lesion, indexed in our 250+ condition dataset.",
    symptoms: ["Itching Of Skin", "Skin Lesion", "Acne Or Pimples", "Skin Swelling"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'paronychia',
    name: "Paronychia",
    category: 'General Clinical',
    description: "A clinical condition characterized by sinus congestion and hand or finger swelling, indexed in our 250+ condition dataset.",
    symptoms: ["Sinus Congestion", "Hand Or Finger Swelling", "Abnormal Appearing Skin", "Foot Or Toe Swelling"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'white_blood_cell_disease',
    name: "White Blood Cell Disease",
    category: 'General Clinical',
    description: "A clinical condition characterized by chills and diarrhea, indexed in our 250+ condition dataset.",
    symptoms: ["Chills", "Diarrhea", "Heartburn", "Fever"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'spondylolisthesis',
    name: "Spondylolisthesis",
    category: 'Musculoskeletal',
    description: "A clinical condition characterized by leg cramps or spasms and hip pain, indexed in our 250+ condition dataset.",
    symptoms: ["Leg Cramps Or Spasms", "Hip Pain", "Low Back Pain", "Back Pain"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  },
  {
    id: 'conjunctivitis_due_to_virus',
    name: "Conjunctivitis Due to Virus",
    category: 'Infectious',
    description: "A clinical condition characterized by lacrimation and diminished vision, indexed in our 250+ condition dataset.",
    symptoms: ["Lacrimation", "Diminished Vision", "Nasal Congestion", "Pain In Eye"],
    riskFactors: "Clinical history, environmental exposures, or underlying physiological predisposition.",
    precautions: [
      "Record daily symptom intensity and note onset patterns",
      "Maintain adequate rest, hydration, and wholesome nutrition",
      "Review persistent symptoms with a qualified medical specialist"
],
    whenToSeeDoctor: "Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen."
  }
];

export const DISEASE_CATEGORIES = ["All", "Common", "Chronic", "Infectious", "Cardiovascular", "Respiratory", "Digestive", "Neurological", "Endocrine", "Musculoskeletal", "Dermatological", "Mental Health", "Urological", "ENT & Sensory", "Reproductive", "Lifestyle"];
