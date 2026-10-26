import json
import re
import os

# 1. Read existing frontend/src/data/diseases.js
with open('frontend/src/data/diseases.js', 'r', encoding='utf-8') as f:
    orig_code = f.read()

# Extract existing IDs
existing_ids = set(re.findall(r"id:\s*'([^']+)'", orig_code))
print(f"Existing disease IDs count: {len(existing_ids)}")

# Load compiled dataset
with open('backend/src/data/diseasesDataset.json', 'r', encoding='utf-8') as f:
    dataset = json.load(f)

print(f"Dataset conditions count: {len(dataset)}")

# Generate new disease entries from dataset
new_entries = []
categories_set = set(['All', 'Common', 'Chronic', 'Infectious', 'Lifestyle'])

for key, item in dataset.items():
    item_id = item['id']
    if item_id in existing_ids:
        continue
    
    cat = item['category']
    categories_set.add(cat)
    
    clean_syms = [s.strip().title() for s in item['symptoms'][:4]]
    if len(clean_syms) == 0:
        clean_syms = ['Clinical Symptom Evaluation']
    
    primary_sym = item['symptoms'][0] if item['symptoms'] else 'clinical presentation'
    secondary_sym = f" and {item['symptoms'][1]}" if len(item['symptoms']) > 1 else ""
    
    desc = f"A clinical condition characterized by {primary_sym}{secondary_sym}, indexed in our 250+ condition dataset."
    
    entry = {
        'id': item_id,
        'name': item['name'],
        'category': cat,
        'description': desc,
        'symptoms': clean_syms,
        'riskFactors': 'Clinical history, environmental exposures, or underlying physiological predisposition.',
        'precautions': [
            'Record daily symptom intensity and note onset patterns',
            'Maintain adequate rest, hydration, and wholesome nutrition',
            'Review persistent symptoms with a qualified medical specialist'
        ],
        'whenToSeeDoctor': 'Seek clinical medical evaluation if symptoms are recurrent, acute, or progressively worsen.'
    }
    new_entries.append(entry)

print(f"Generated {len(new_entries)} new entries from dataset.")

# Find where DISEASES_DATA array ends
# Currently orig_code ends with:
# export const DISEASE_CATEGORIES = ['All', 'Common', 'Chronic', 'Infectious', 'Lifestyle'];

# Extract the array content up to the closing ]; of DISEASES_DATA
array_end_idx = orig_code.rfind('];')
if array_end_idx == -1:
    raise ValueError("Could not find array closing in diseases.js")

# Find the second to last ]; or the one before export const DISEASE_CATEGORIES
parts = orig_code.split('export const DISEASE_CATEGORIES =')
array_part = parts[0].strip()
if array_part.endswith(';'):
    array_part = array_part[:-1].strip()
if array_part.endswith(']'):
    array_part = array_part[:-1].strip()

# Format new entries as JavaScript objects
js_entries = []
for e in new_entries:
    syms_js = json.dumps(e['symptoms'])
    precautions_js = json.dumps(e['precautions'], indent=6)
    
    entry_code = f"""  {{
    id: '{e['id']}',
    name: {json.dumps(e['name'])},
    category: '{e['category']}',
    description: {json.dumps(e['description'])},
    symptoms: {syms_js},
    riskFactors: {json.dumps(e['riskFactors'])},
    precautions: {precautions_js},
    whenToSeeDoctor: {json.dumps(e['whenToSeeDoctor'])}
  }}"""
    js_entries.append(entry_code)

# Combine original array entries + new entries
merged_array = array_part + ',\n' + ',\n'.join(js_entries) + '\n];\n\n'

# Sorted clean categories list
ordered_cats = ['All', 'Common', 'Chronic', 'Infectious', 'Cardiovascular', 'Respiratory', 'Digestive', 'Neurological', 'Endocrine', 'Musculoskeletal', 'Dermatological', 'Mental Health', 'Urological', 'ENT & Sensory', 'Reproductive', 'Lifestyle']

categories_code = f"export const DISEASE_CATEGORIES = {json.dumps(ordered_cats)};\n"

full_code = merged_array + categories_code

with open('frontend/src/data/diseases.js', 'w', encoding='utf-8') as f:
    f.write(full_code)

print("Successfully written combined diseases to frontend/src/data/diseases.js!")
print(f"Total diseases now: {len(existing_ids) + len(new_entries)}")
