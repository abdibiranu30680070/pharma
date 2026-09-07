export const itemDetails = {
  // Line 1: Pharmaceutical Products
  'Prescription Medicines': {
    category: 'Pharmaceutical Products',
    description: 'Essential prescription pharmaceuticals covering chronic illness therapies, antibiotics, anti-hypertensives, and hospital critical care formulas.',
    usages: ['Hospital inpatient therapies', 'Chronic condition management', 'Specialized clinical care'],
    specs: 'Imported from WHO-GMP certified global manufacturers across Europe, Asia, and India. Full EFDA registered dossiers.',
    precautions: 'Dispensed exclusively upon licensed physician prescription.',
    sku: 'RX-GEN-101',
    image: '/products/prod1.jpg'
  },
  'Over-the-Counter Drugs': {
    category: 'Pharmaceutical Products',
    description: 'Broad selection of over-the-counter analgesics, antipyretics, digestive aids, and vitamins for community pharmacy retail.',
    usages: ['Primary symptom relief', 'Community wellness', 'First-line therapy'],
    specs: 'Complies with EFDA OTC monograph standards and WHO GDSP quality guidelines.',
    precautions: 'Follow packaging dosage instructions and consult a pharmacist.',
    sku: 'OTC-DRG-202',
    image: '/products/prod2.jpg'
  },
  'Specialised Therapeutics': {
    category: 'Pharmaceutical Products',
    description: 'Targeted specialty pharmaceuticals for oncology, nephrology, endocrinology, and critical immunological therapies.',
    usages: ['Advanced clinical treatment', 'Specialist hospital wards', 'Targeted intervention'],
    specs: 'Stored in calibrated cold-chain storage with continuous Odoo ERP batch and telemetry tracking.',
    precautions: 'Strict administration protocols under specialized physician supervision.',
    sku: 'RX-SPC-303',
    image: '/products/prod3.jpg'
  },
  'Critical Care Essentials': {
    category: 'Pharmaceutical Products',
    description: 'Emergency and intensive care medicines including inotropes, anesthetics, emergency fluids, and resuscitation medications.',
    usages: ['ICU and Emergency resuscitation', 'Operating theaters', 'Acute care support'],
    specs: 'Batch-verified bioavailability with zero-fail supply chain continuity.',
    precautions: 'Restricted to clinical healthcare settings and certified emergency personnel.',
    sku: 'RX-CC-404',
    image: '/products/prod4.jpg'
  },
  'Antibiotics & Anti-Infectives': {
    category: 'Pharmaceutical Products',
    description: 'Broad and narrow-spectrum antimicrobial agents addressing bacterial, fungal, and parasitic infections.',
    usages: ['Infection management', 'Surgical prophylaxis', 'Systemic therapy'],
    specs: 'Sourced from WHO-GMP certified facilities. Full serialization and batch traceability.',
    precautions: 'Complete the entire prescribed course to avoid antimicrobial resistance.',
    sku: 'RX-ANT-505',
    image: '/products/prod5.jpg'
  },
  'Cardiovascular Formulations': {
    category: 'Pharmaceutical Products',
    description: 'Cardiovascular agents including ACE inhibitors, ARBs, beta-blockers, statins, and anti-platelet therapies.',
    usages: ['Hypertension control', 'Cardiovascular disease prevention', 'Post-infarction care'],
    specs: 'Strict shelf-life management through automated FEFO protocols.',
    precautions: 'Regular blood pressure and cardiac monitoring advised.',
    sku: 'RX-CRD-606',
    image: '/products/prod6.jpg'
  },
  'Diabetes & Metabolic Care': {
    category: 'Pharmaceutical Products',
    description: 'Comprehensive diabetes management line including recombinant human insulin, oral hypoglycemic agents, and glycemic stabilizers.',
    usages: ['Type 1 & Type 2 Diabetes treatment', 'Glycemic control optimization'],
    specs: 'Cold-chain maintained at 2°C – 8°C throughout transport and storage in our 1,200m² hub.',
    precautions: 'Store insulin in temperature-controlled environments away from direct light.',
    sku: 'RX-DIA-707',
    image: '/products/prod7.jpg'
  },

  // Line 2: Medical Disposables & Consumables
  'Blood Collection Tubes': {
    category: 'Medical Disposables & Consumables',
    description: 'Evacuated vacuum blood collection tubes (EDTA, Serum, Heparin, Coagulation, Glucose) for accurate clinical diagnostic draws.',
    usages: ['Phlebotomy and venous blood sampling', 'Clinical hematology and biochemistry testing'],
    specs: 'Sterile, vacuum-calibrated PET tubes. Targeted for local medical manufacturing backward integration.',
    precautions: 'Single-use only. Dispose in accordance with biomedical sharps waste protocols.',
    sku: 'MED-BCT-808',
    image: '/products/prod8.jpg'
  },
  'Specimen Containers': {
    category: 'Medical Disposables & Consumables',
    description: 'Leak-proof, sterile containers for urine, stool, sputum, and biopsy specimen transport and diagnostic preservation.',
    usages: ['Specimen collection and transport', 'Diagnostic pathology', 'Microbiological sampling'],
    specs: 'High-clarity medical-grade polypropylene with secure tamper-evident screw caps.',
    precautions: 'Sterility guaranteed until package seal is broken.',
    sku: 'MED-SPC-909',
    image: '/products/prod9.jpg'
  },
  'Surgical Supplies & Sutures': {
    category: 'Medical Disposables & Consumables',
    description: 'Absorbable and non-absorbable surgical sutures, surgical blades, sterile drapes, and operating theater supplies.',
    usages: ['Operating rooms', 'Minor surgery & wound closure', 'Trauma emergency units'],
    specs: 'Gamma sterilized, ISO 13485 and CE certified surgical Grade.',
    precautions: 'Ensure sterile field maintenance during procedure.',
    sku: 'MED-SUT-010',
    image: '/products/prod10.jpg'
  },
  'Personal Protective Equipment (PPE)': {
    category: 'Medical Disposables & Consumables',
    description: 'Medical face masks, isolation gowns, protective face shields, surgical caps, and protective shoe covers.',
    usages: ['Infection control', 'Healthcare worker protection', 'Laboratory biosafety'],
    specs: 'Multi-layer fluid-resistant filtration meeting international EN and ASTM safety benchmarks.',
    precautions: 'Single-use disposal after patient encounter or shift conclusion.',
    sku: 'MED-PPE-111',
    image: '/products/prod11.jpg'
  },
  'Infusion Sets & Syringes': {
    category: 'Medical Disposables & Consumables',
    description: 'Sterile disposable syringes with needles, scalp vein sets, and IV infusion sets with micro and macro drip chambers.',
    usages: ['Intravenous medication administration', 'Fluid replacement', 'Diagnostic drawing'],
    specs: 'Latex-free, non-pyrogenic, EO gas sterilized with ultra-sharp luer-lock needles.',
    precautions: 'Check packaging integrity before opening. Do not re-sterilize.',
    sku: 'MED-SYR-212',
    image: '/products/prod12.jpg'
  },
  'Examination & Surgical Gloves': {
    category: 'Medical Disposables & Consumables',
    description: 'Powder-free latex and nitrile medical examination and surgical gloves with textured fingertips for tactile sensitivity.',
    usages: ['Clinical examinations', 'Surgical procedures', 'Laboratory diagnostics'],
    specs: 'AQL 1.5 medical standard, high tensile elasticity and chemical permeation resistance.',
    precautions: 'Store in cool dry conditions away from ozone and UV radiation.',
    sku: 'MED-GLV-313',
    image: '/products/prod1.jpg'
  },

  // Line 3: Medical Equipment & Laboratory Solutions
  'Multi-Parameter Patient Monitors': {
    category: 'Medical Equipment & Laboratory Solutions',
    description: 'Advanced ICU and ward patient monitors tracking ECG, SpO2, NIBP, Respiration, Temperature, and optional EtCO2/IBP.',
    usages: ['ICU, CCU, and Operating Theater vital tracking', 'Post-operative recovery monitoring'],
    specs: 'High-resolution color displays with arrhythmia detection. Supported by full biomedical installation & maintenance.',
    precautions: 'Requires regular sensor calibration and technical servicing.',
    sku: 'EQP-MON-414',
    image: '/products/prod2.jpg'
  },
  'Diagnostic Equipment': {
    category: 'Medical Equipment & Laboratory Solutions',
    description: 'Precision clinical diagnostic apparatus including digital ECG machines, ultrasound units, Doppler devices, and pulse oximeters.',
    usages: ['Cardiology diagnostics', 'Obstetric & abdominal imaging', 'Point-of-care diagnosis'],
    specs: 'Certified under CE and ISO 13485 standards with warranty and spare parts availability.',
    precautions: 'Operate in accordance with user manuals and routine engineer calibration.',
    sku: 'EQP-DIA-515',
    image: '/products/prod3.jpg'
  },
  'Clinical Laboratory Units': {
    category: 'Medical Equipment & Laboratory Solutions',
    description: 'Automated clinical chemistry analyzers, hematology counters, centrifuges, and spectrophotometers for diagnostic labs.',
    usages: ['Pathology laboratories', 'Hospital blood banks', 'Diagnostic reference centers'],
    specs: 'High throughput, automated calibration, backed by our technical engineer maintenance team.',
    precautions: 'Ensure quality control standards and proper reagent handling.',
    sku: 'LAB-UNT-616',
    image: '/products/prod4.jpg'
  },
  'Scientific Apparatus': {
    category: 'Medical Equipment & Laboratory Solutions',
    description: 'Advanced binocular and digital microscopes, autoclaves, laboratory incubators, water baths, and precision analytical balances.',
    usages: ['Microbiological research', 'Medical education and training', 'Quality assurance testing'],
    specs: 'Optical precision lenses, digital data interfaces, robust stainless steel construction.',
    precautions: 'Maintain steady electrical supply with voltage stabilizers.',
    sku: 'LAB-SCI-717',
    image: '/products/prod5.jpg'
  },
  'Testing Kits & Reagents': {
    category: 'Medical Equipment & Laboratory Solutions',
    description: 'Rapid diagnostic test kits (infectious diseases, malaria, HIV, hepatitis, cardiac markers) and clinical biochemistry reagents.',
    usages: ['Rapid clinical screening', 'Confirmatory diagnostic testing', 'Point-of-care health camps'],
    specs: 'High sensitivity and specificity, cold-chain protected throughout delivery.',
    precautions: 'Observe recommended storage temperature ranges and expiry dates.',
    sku: 'LAB-RGT-818',
    image: '/products/prod6.jpg'
  },
  'Biomedical Maintenance & Calibration': {
    category: 'Medical Equipment & Laboratory Solutions',
    description: 'Comprehensive post-sales technical engineering, preventative maintenance, replacement parts, and precision calibration services.',
    usages: ['Hospital medical equipment maintenance', 'Preventive compliance checks', 'Emergency breakdown repair'],
    specs: 'Carried out by certified biomedical technical engineers adhering to manufacturer specs.',
    precautions: 'Schedule periodic routine servicing to prevent unexpected clinical equipment downtime.',
    sku: 'SRV-ENG-919',
    image: '/products/prod7.jpg'
  },

  // Line 4: Manufacturing & Commodity Export
  'Plastic Injection Moulded Disposables': {
    category: 'Local Manufacturing & Commodity Export',
    description: 'Under our Pillar II backward integration strategy: locally manufactured blood collection tubes, specimen cups, and caps using medical-grade polymers.',
    usages: ['National healthcare supply self-reliance', 'Import substitution for high-turnover consumables'],
    specs: 'Medical-grade plastic injection moulding with cleanroom quality assurance.',
    precautions: 'Targeted to meet EFDA and international standards upon production scaling.',
    sku: 'MFG-PLAS-001',
    image: '/products/prod8.jpg'
  },
  'Essential Liquid Formulations': {
    category: 'Local Manufacturing & Commodity Export',
    description: 'Formulation and compounding of essential liquid therapeutics, antiseptics, and oral rehydration solutions to advance national health security.',
    usages: ['Primary health centers', 'National emergency reserves', 'Community clinics'],
    specs: 'Formulated in compliance with WHO-GMP clean manufacturing standards.',
    precautions: 'Store in secure, temperature-monitored facilities.',
    sku: 'MFG-LIQ-002',
    image: '/products/prod9.jpg'
  },
  'Specialty Ethiopian Coffee Export': {
    category: 'Local Manufacturing & Commodity Export',
    description: 'Pillar I Forex Synergy: Premium washed and natural Ethiopian specialty coffee (Yirgacheffe, Sidama, Guji) exported to global buyers.',
    usages: ['Specialty roasters', 'International commodity trading houses in Europe, Asia, and Middle East'],
    specs: 'Grade 1 & Grade 2 specialty green coffee beans with full traceability and cup scoring.',
    precautions: 'Exported in GrainPro lined jute bags to preserve moisture and aroma integrity.',
    sku: 'EXP-COF-001',
    image: '/products/prod10.jpg'
  },
  'Cereals, Pulses & Oilseeds Export': {
    category: 'Local Manufacturing & Commodity Export',
    description: 'Export of high-grade sesame seeds, soy beans, chickpeas, and kidney beans generating sustainable foreign currency buffers.',
    usages: ['International food processing and oil milling industries across Europe and Asia'],
    specs: 'Machine-cleaned, 99.5% purity export grade meeting international phytosanitary standards.',
    precautions: 'Phytosanitary inspection and certificate issued per export consignment.',
    sku: 'EXP-AGR-002',
    image: '/products/prod11.jpg'
  },
};
