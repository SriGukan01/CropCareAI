/**
 * Real, accurate agricultural data for all 38 PlantVillage classes
 * Includes English, Tamil (தமிழ்), and Hindi (हिन्दी) translations.
 */

const diseasesData = [
  // --- 1. Apple (4 classes) ---
  {
    cropName: "Apple",
    classLabel: "Apple___Apple_scab",
    name: "Apple Scab",
    isHealthy: false,
    severityNote: "High severity. Spreads rapidly in cool, wet spring seasons and defoliates trees.",
    description: "Apple scab is caused by the fungus Venturia inaequalis. It produces olive-green to black velvety spots on leaves and fruit, causing premature leaf fall and cracked, deformed apples.",
    symptoms: [
      "Velvety olive-green to black circular lesions on leaf surfaces",
      "Yellowing and curling of infected foliage followed by defoliation",
      "Scabby, corky, dark brown lesions on the fruit skin",
      "Deformed, stunted, or cracked mature fruit"
    ],
    causes: [
      "Fungal pathogen Venturia inaequalis overwintering in fallen leaves",
      "Extended periods of leaf wetness (6-9 hours) during spring bud break",
      "Moderate temperatures (15°C to 24°C) with persistent rain or high humidity"
    ],
    prevention: [
      "Plant scab-resistant cultivars such as Liberty, Prima, or Enterprise",
      "Rake, destroy, or compost fallen leaves in autumn to eliminate primary inoculum",
      "Prune canopy annually to facilitate rapid airflow and sunlight penetration",
      "Avoid overhead sprinkler irrigation that keeps leaves wet"
    ],
    organicTreatment: [
      "Foliar spray with liquid copper hydroxide at green tip and pre-bloom",
      "Sulfur-based fungicides or potassium bicarbonate applications",
      "Neem oil spray as a preventive bio-fungicide during early spring"
    ],
    chemicalTreatment: [
      "Myclobutanil or Mancozeb sprays during primary ascospore release",
      "Captan fungicide spray scheduled before predicted rain events",
      "Flusilazole or Difenoconazole for systemic curative control"
    ],
    bestPractices: [
      "Calibrate spray equipment for complete canopy coverage",
      "Maintain a 7-10 day spray cycle throughout damp spring weather"
    ],
    translations: {
      en: {
        name: "Apple Scab",
        description: "Apple scab is caused by the fungus Venturia inaequalis. It produces olive-green to black velvety spots on leaves.",
        symptoms: ["Olive-green velvety leaf spots", "Premature defoliation", "Scabby fruit lesions"],
        causes: ["Venturia inaequalis fungus", "Cool wet spring weather"],
        prevention: ["Rake fallen leaves", "Plant resistant varieties", "Prune for airflow"],
        organicTreatment: ["Liquid copper spray", "Sulfur fungicide", "Neem oil"],
        chemicalTreatment: ["Mancozeb", "Captan", "Myclobutanil"],
        bestPractices: ["Ensure uniform canopy coverage", "Follow weather-based spray scheduling"],
        severityNote: "High severity. Defoliates trees if untreated."
      },
      ta: {
        name: "ஆப்பிள் செதில் நோய் (Apple Scab)",
        description: "வென்டூரியா இனெக்குவாலிஸ் பூஞ்சையால் ஏற்படும் இந்த நோய் இலைகளில் ஆலிவ்-பச்சை முதல் கருப்பு நிற திட்டுகளை ஏற்படுத்துகிறது.",
        symptoms: ["இலைகளில் ஆலிவ்-பச்சை வெல்வெட் புள்ளிகள்", "இலைகள் முன்கூட்டியே உதிர்தல்", "பழங்களில் விரிசல் மற்றும் செதில் தழும்புகள்"],
        causes: ["பூஞ்சை வித்துக்கள்", "குளிர்ந்த ஈரப்பதமான வசந்த காலம்"],
        prevention: ["உதிர்ந்த இலைகளை அகற்றி அழிக்கவும்", "காற்றோட்டத்திற்கு மரங்களை கவாத்து செய்யவும்", "நோய் எதிர்ப்பு ரகங்களை நடவும்"],
        organicTreatment: ["தாமிர (காப்பர்) பூஞ்சைக் கொல்லி", "கந்தகத் தூள் தெளிப்பு", "வேப்பெண்ணெய் கரைசல்"],
        chemicalTreatment: ["மேன்கோசெப் (Mancozeb)", "கேப்டான் (Captan)"],
        bestPractices: ["மழைக்கு முன் தடுப்பு மருந்து தெளிக்கவும்"],
        severityNote: "அதிக தீவிரம். சிகிச்சையளிக்கப்படாவிட்டால் இலைகள் முழுமையாக உதிரும்."
      },
      hi: {
        name: "सेब का स्कैब रोग (Apple Scab)",
        description: "वेंचुरिया इनेक्वलिस कवक के कारण पत्तों और फलों पर जैतून-हरे से काले मखमली धब्बे पड़ जाते हैं।",
        symptoms: ["पत्तों पर मखमली गहरे हरे धब्बे", "पत्तों का समय से पहले गिरना", "फलों पर खुरदुरे चकत्ते और दरारें"],
        causes: ["वेंचुरिया कवक", "ठंडा और नम वसंत मौसम"],
        prevention: ["गिरे पत्तों को जलाएं या नष्ट करें", "हवा के बहाव हेतु छंटाई करें", "प्रतिरोधी किस्में लगाएं"],
        organicTreatment: ["कॉपर कवकनाशी", "सल्फर पाउडर का छिड़काव", "नीम तेल"],
        chemicalTreatment: ["मैनकोजेब", "कैप्टन", "माइक्लोबुटानिल"],
        bestPractices: ["बारिश से पहले कवकनाशी छिड़कें"],
        severityNote: "गंभीर असर। समय पर उपचार न करने पर फल और पत्ते नष्ट हो जाते हैं।"
      }
    }
  },
  {
    cropName: "Apple",
    classLabel: "Apple___Black_rot",
    name: "Black Rot",
    isHealthy: false,
    severityNote: "Moderate to high. Can lead to cankers on woody limbs and mummified rotting fruit.",
    description: "Caused by the fungus Botryosphaeria obtusa. Shows as 'frog-eye' leaf spots, branch cankers, and a firm black fruit rot.",
    symptoms: [
      "Small purple flecks on leaves enlarging into frog-eye leaf spots with brown centers",
      "Sunken, reddish-brown cankers on branches and tree bark",
      "Dark brown to black rotting fruit turning into shriveled, mummified hanging fruit"
    ],
    causes: [
      "Botryosphaeria obtusa fungus",
      "Spore dissemination from dead wood, fire blight strikes, and mummified fruit"
    ],
    prevention: [
      "Prune out dead wood, cankers, and fire-blight infected shoots during winter dormancy",
      "Remove and destroy all mummified fruit from the tree and orchard floor",
      "Prevent mechanical and insect injury to fruit and bark"
    ],
    organicTreatment: [
      "Lime sulfur application during dormant season",
      "Bio-fungicides containing Bacillus amyloliquefaciens"
    ],
    chemicalTreatment: [
      "Thiophanate-methyl or Captan sprays starting at tight cluster stage",
      "Pristine (pyraclostrobin + boscalid) applied pre-harvest"
    ],
    bestPractices: [
      "Burn or deeply bury all pruned infected branches",
      "Avoid wounding fruit during orchard maintenance"
    ],
    translations: {
      en: {
        name: "Black Rot",
        description: "Botryosphaeria obtusa causes frog-eye leaf spots and mummified black fruit.",
        symptoms: ["Frog-eye spots on foliage", "Branch cankers", "Mummified black fruit"],
        causes: ["Botryosphaeria fungus", "Dead tree wood and warm humid conditions"],
        prevention: ["Prune dead twigs in winter", "Remove mummified fruit"],
        organicTreatment: ["Lime sulfur dormant spray", "Bacillus subtilis bio-fungicide"],
        chemicalTreatment: ["Captan", "Thiophanate-methyl", "Pyraclostrobin"],
        bestPractices: ["Sanitize pruning tools between cuts", "Maintain tree vigor"],
        severityNote: "Moderate to high. Damages branches and rots fruit."
      },
      ta: {
        name: "ஆப்பிள் கரு அழுகல் (Black Rot)",
        description: "போட்ரியோஸ்பேரியா பூஞ்சையால் ஏற்படும் இந்த நோய் தவளைக் கண் போன்ற புள்ளிகளையும் பழ அழுகலையும் உண்டாக்குகிறது.",
        symptoms: ["இலைகளில் தவளைக்கண் போன்ற புள்ளிகள்", "கிளைகளில் புண்கள்", "பழங்கள் காய்ந்து கருப்பாக மாறுதல்"],
        causes: ["பூஞ்சை தொற்று", "மரத்தின் காய்ந்த குச்சிகள்"],
        prevention: ["காய்ந்த கிளைகளை கவாத்து செய்யவும்", "அழுகிய பழங்களை சேகரித்து அழிக்கவும்"],
        organicTreatment: ["சுண்ணாம்பு கந்தகக் கரைசல்", "பேசில்லஸ் நுண்ணுயிர் தெளிப்பு"],
        chemicalTreatment: ["கேப்டான்", "தயோபனேட்-மெத்தில்"],
        bestPractices: ["கவாத்து கருவிகளை கிருமி நீக்கம் செய்யவும்"],
        severityNote: "மிதமான முதல் தீவிர பாதிப்பு."
      },
      hi: {
        name: "सेब का काला सड़न रोग (Black Rot)",
        description: "बोट्रियोस्फेरिया कवक के कारण पत्तियों पर मेंढक की आंख जैसे धब्बे और सड़े हुए फल दिखते हैं।",
        symptoms: ["पत्तियों पर वृत्ताकार धब्बे", "शाखाओं पर घाव/कैंकर", "फल का काला पड़कर सूखना"],
        causes: ["बोट्रियोस्फेरिया फंगस", "गर्म आर्द्र वातावरण"],
        prevention: ["सूखी टहनियों को काटें", "सड़े फलों को बगीचे से हटाएं"],
        organicTreatment: ["लाइम सल्फर", "बैसिलस कवकनाशी"],
        chemicalTreatment: ["कैप्टन", "थायोफैनेट-मिथाइल"],
        bestPractices: ["कटाई के औजारों को साफ रखें"],
        severityNote: "मध्यम से उच्च गंभीरता।"
      }
    }
  },
  {
    cropName: "Apple",
    classLabel: "Apple___Cedar_apple_rust",
    name: "Cedar Apple Rust",
    isHealthy: false,
    severityNote: "Moderate severity. Requires alternate host (Eastern Red Cedar) to complete its lifecycle.",
    description: "Caused by Gymnosporangium juniperi-virginianae. Bright yellow-orange spots develop on upper leaf surfaces, with tube-like spore horns underneath.",
    symptoms: [
      "Bright yellow-orange or reddish spots on upper apple leaf surface",
      "Raised brownish bumps with tubular fungal structures (aecia) on leaf undersides",
      "Premature leaf drop in severe seasons and reduced fruit size"
    ],
    causes: [
      "Gymnosporangium juniperi-virginianae fungus",
      "Proximity to infected juniper or red cedar trees within 1-2 miles",
      "Warm wet weather in early spring when cedar galls release gelatinous spores"
    ],
    prevention: [
      "Remove Eastern red cedar trees in the immediate vicinity of the apple orchard",
      "Plant rust-resistant apple varieties (e.g., Redfree, Freedom, Liberty)",
      "Prune galls from ornamental junipers before spring rains"
    ],
    organicTreatment: [
      "Sulfur or liquid copper applied as flower petals drop",
      "Serenade (Bacillus subtilis) preventative sprays"
    ],
    chemicalTreatment: [
      "Myclobutanil (Immunox) applied from pink bud stage through petal fall",
      "Mancozeb or Propiconazole applications"
    ],
    bestPractices: [
      "Scout nearby windbreak cedars for gelatinous orange galls in early spring",
      "Apply protective fungicides before rainfall during the pink bud stage"
    ],
    translations: {
      en: {
        name: "Cedar Apple Rust",
        description: "Fungal pathogen causing vivid orange-yellow leaf spots, cycling between cedars and apples.",
        symptoms: ["Bright orange spots on leaves", "Spore tubes on undersides", "Early leaf drop"],
        causes: ["Gymnosporangium fungus", "Proximity to juniper/cedar trees"],
        prevention: ["Remove nearby cedar galls", "Plant rust-resistant cultivars"],
        organicTreatment: ["Sulfur spray", "Bacillus subtilis"],
        chemicalTreatment: ["Myclobutanil", "Mancozeb", "Propiconazole"],
        bestPractices: ["Monitor nearby cedar windbreaks", "Time sprays with bud bloom"],
        severityNote: "Moderate. Severe defoliation occurs if junipers are nearby."
      },
      ta: {
        name: "ஆப்பிள் சிடார் துரு நோய் (Cedar Apple Rust)",
        description: "இலைகளில் பிரகாசமான மஞ்சள்-ஆரஞ்சு நிற புள்ளிகளை ஏற்படுத்தும் பூஞ்சை நோய்.",
        symptoms: ["இலைகளில் பிரகாசமான ஆரஞ்சு புள்ளிகள்", "இலையின் பின்புறம் குழாய் வடிவ வளர்ச்சி", "இலை உதிர்தல்"],
        causes: ["ஜிம்னோஸ்பொராங்கியம் பூஞ்சை", "அருகிலுள்ள சிடார் மரங்கள்"],
        prevention: ["அருகிலுள்ள சிடார் மரங்களை அகற்றவும்", "எதிர்ப்புத்திறன் கொண்ட ரகங்களை நடவும்"],
        organicTreatment: ["கந்தகக் கரைசல்", "பேசில்லஸ் உயிரி மருந்து"],
        chemicalTreatment: ["மைக்குளோபுட்டானில்", "மேன்கோசெப்"],
        bestPractices: ["வசந்த கால மழைக்கு முன் தெளிக்கவும்"],
        severityNote: "மிதமான தீவிரம்."
      },
      hi: {
        name: "सेब का जंग/रतुआ रोग (Cedar Apple Rust)",
        description: "चमकीले नारंगी-पीले धब्बे पैदा करने वाला फफूंद जनित रोग।",
        symptoms: ["पत्तियों पर चमकीले नारंगी धब्बे", "पत्ती के निचले हिस्से में उभार", "पत्तियों का गिरना"],
        causes: ["जिम्नोस्पोरेंजियम कवक", "निकटवर्ती जुनिपर/देवदार के पेड़"],
        prevention: ["निकटवर्ती देवदार पेड़ों से गिल्टियां हटाएं", "रोगरोधी पौधे लगाएं"],
        organicTreatment: ["सल्फर स्प्रे", "बैसिलस सबटिलिस"],
        chemicalTreatment: ["माइक्लोबुटानिल", "मैनकोजेब"],
        bestPractices: ["फूल आने के समय समयबद्ध छिड़काव करें"],
        severityNote: "मध्यम स्तर का नुकसान।"
      }
    }
  },
  {
    cropName: "Apple",
    classLabel: "Apple___healthy",
    name: "Apple Healthy",
    isHealthy: true,
    severityNote: "Optimal plant health. Continue routine cultural management.",
    description: "The apple foliage is vibrant green, free of foliar pathogens, showing robust vegetative vigor and photosynthetic efficiency.",
    symptoms: [
      "Uniform, deep green foliage without lesions, necrotic spots, or curling",
      "Clean leaf margins and healthy terminal shoots",
      "Normal fruit development without scab or rot"
    ],
    causes: [
      "Balanced soil nutrients and moisture",
      "Proper orchard sanitation and pest management"
    ],
    prevention: [
      "Maintain annual pruning to preserve sunlight and ventilation",
      "Ensure balanced N-P-K fertilization and calcium foliar feeds",
      "Continue periodic scouting for early pest or fungal signs"
    ],
    organicTreatment: [
      "Prophylactic compost tea and seaweed foliar sprays for enhanced immunity"
    ],
    chemicalTreatment: [
      "No chemical fungicides or bactericides required"
    ],
    bestPractices: [
      "Maintain clean orchard floor weed-free strip",
      "Monitor soil moisture with tensiometers"
    ],
    translations: {
      en: {
        name: "Apple (Healthy)",
        description: "Foliage exhibits vigorous health with no detected biotic pathology.",
        symptoms: ["Deep green foliage", "Intact leaf margins", "Strong vegetative growth"],
        causes: ["Optimal agricultural conditions and sound agronomy"],
        prevention: ["Continue standard fertilization and pruning protocols"],
        organicTreatment: ["Seaweed extract or compost tea foliar tonic"],
        chemicalTreatment: ["None required"],
        bestPractices: ["Routine scouting and drip irrigation balance"],
        severityNote: "Healthy condition."
      },
      ta: {
        name: "ஆப்பிள் (ஆரோக்கியமானது)",
        description: "இலைகள் எவ்வித பூஞ்சை அல்லது பாக்டீரியா தொற்றுமின்றி செழுமையாக உள்ளன.",
        symptoms: ["அடர் பச்சை இலைகள்", "நோய்த்தொற்று இல்லை", "நல்ல வளர்ச்சி"],
        causes: ["சரியான பராமரிப்பு மற்றும் ஊட்டச்சத்து மேலாண்மை"],
        prevention: ["வழக்கமான உரம் மற்றும் நீர் பாசனத்தை தொடரவும்"],
        organicTreatment: ["கடற்பாசி உரம் தெளிக்கவும்"],
        chemicalTreatment: ["தேவை இல்லை"],
        bestPractices: ["தொடர்ந்து கண்காணிக்கவும்"],
        severityNote: "ஆரோக்கியமான நிலை."
      },
      hi: {
        name: "सेब (स्वस्थ पत्ता)",
        description: "पत्तियां पूरी तरह से स्वस्थ हैं, कोई रोग या संक्रमण नहीं है।",
        symptoms: ["गहरा हरा रंग", "कोई धब्बे या सड़न नहीं", "मजबूत शाखाएं"],
        causes: ["उत्कृष्ट पोषण और समय पर पानी"],
        prevention: ["नियमित खाद और छंटाई जारी रखें"],
        organicTreatment: ["जैविक टॉनिक या समुद्री शैवाल अर्क"],
        chemicalTreatment: ["कोई आवश्यकता नहीं"],
        bestPractices: ["समय-समय पर निरीक्षण करते रहें"],
        severityNote: "स्वस्थ फसल।"
      }
    }
  },

  // --- 2. Blueberry (1 class) ---
  {
    cropName: "Blueberry",
    classLabel: "Blueberry___healthy",
    name: "Blueberry Healthy",
    isHealthy: true,
    severityNote: "Optimal plant health. Maintain acidic soil pH (4.5 - 5.5).",
    description: "The blueberry foliage displays optimal chlorophyll saturation, robust cane elongation, and no signs of mummy berry or anthracnose.",
    symptoms: ["Lush green leaves without chlorosis", "Firm, healthy twigs", "No tip dieback"],
    causes: ["Well-maintained acidic soil and balanced micro-nutrients"],
    prevention: ["Maintain pine bark mulch and acidic pH", "Drip irrigate with acidified water if necessary"],
    organicTreatment: ["Feather meal and sulfur amendments for soil health"],
    chemicalTreatment: ["None required"],
    bestPractices: ["Keep roots moist and well mulched"],
    translations: {
      en: {
        name: "Blueberry (Healthy)",
        description: "Foliage is vigorous, vibrant green, and disease-free.",
        symptoms: ["Healthy dark green leaves", "No wilting or spotting"],
        causes: ["Optimal acidic soil conditions"],
        prevention: ["Maintain 4.5-5.5 pH and organic mulch"],
        organicTreatment: ["Compost mulch and organic sulfur"],
        chemicalTreatment: ["None required"],
        bestPractices: ["Monitor soil pH semi-annually"],
        severityNote: "Healthy condition."
      },
      ta: {
        name: "புளூபெர்ரி (ஆரோக்கியமானது)",
        description: "இலைகள் நல்ல ஆரோக்கியத்துடன், பூச்சி அல்லது நோய் தாக்குதலின்றி உள்ளன.",
        symptoms: ["பச்சை நிற இலைகள்", "புள்ளிகள் இல்லை"],
        causes: ["சரியான அமில மண் பராமரிப்பு"],
        prevention: ["மண்ணின் கார அமிலத்தன்மையை 4.5-5.5 இல் பராமரிக்கவும்"],
        organicTreatment: ["கரிம தழைக்கூளம்"],
        chemicalTreatment: ["தேவை இல்லை"],
        bestPractices: ["ஈரப்பதத்தை பராமரிக்கவும்"],
        severityNote: "ஆரோக்கியமானது."
      },
      hi: {
        name: "ब्लूबेरी (स्वस्थ)",
        description: "पत्तियां चमकदार और पूर्णतः रोगमुक्त हैं।",
        symptoms: ["स्वस्थ हरी पत्तियां", "कोई धब्बा नहीं"],
        causes: ["अनुकूल अम्लीय मिट्टी"],
        prevention: ["मिट्टी का pH 4.5-5.5 बनाए रखें"],
        organicTreatment: ["जैविक मल्च"],
        chemicalTreatment: ["कोई नहीं"],
        bestPractices: ["उचित नमी बनाए रखें"],
        severityNote: "स्वस्थ स्थिति।"
      }
    }
  },

  // --- 3. Cherry (2 classes) ---
  {
    cropName: "Cherry",
    classLabel: "Cherry_(including_sour)___Powdery_mildew",
    name: "Powdery Mildew",
    isHealthy: false,
    severityNote: "Moderate severity. Causes leaf distortion and blemishes on cherry fruit skin.",
    description: "Caused by Podosphaera clandestina. Manifests as a white talcum-powder-like coating on young foliage, causing upward leaf curling and stunted shoot growth.",
    symptoms: [
      "White powdery fungal patches on undersides and tops of young leaves",
      "Upward curling, puckering, and crisping of foliage",
      "Stunted new shoot terminals and reduced cherry fruit sugar content"
    ],
    causes: [
      "Podosphaera clandestina fungal spores",
      "High relative humidity combined with warm, shaded canopy conditions (18°C - 28°C)"
    ],
    prevention: [
      "Prune cherry tree canopy to improve airflow and sunlight penetration",
      "Avoid excess nitrogen fertilizer which stimulates overly succulent tender shoots",
      "Select open orchard sites with good air drainage"
    ],
    organicTreatment: [
      "Potassium bicarbonate (MilStop) foliar spray",
      "Diluted milk spray (40% milk / 60% water) or horticultural oils",
      "Wettable sulfur spray before high temperatures exceed 30°C"
    ],
    chemicalTreatment: [
      "Myclobutanil (Rally) or Quinoxyfen (Quintec) preventative sprays",
      "Triflumizole (Procure) applications during early shoot emergence"
    ],
    bestPractices: [
      "Begin fungicide applications when young green tips first emerge",
      "Never apply sulfur when temperature exceeds 30°C to avoid phototoxicity"
    ],
    translations: {
      en: {
        name: "Powdery Mildew",
        description: "Podosphaera fungal disease creating white talcum powder coating on foliage.",
        symptoms: ["White powdery film", "Upward curled leaves", "Stunted terminal shoots"],
        causes: ["Podosphaera fungus", "High humidity and dense shaded canopy"],
        prevention: ["Canopy pruning", "Avoid over-fertilizing with nitrogen"],
        organicTreatment: ["Potassium bicarbonate", "Horticultural oil", "Sulfur"],
        chemicalTreatment: ["Myclobutanil", "Quinoxyfen", "Triflumizole"],
        bestPractices: ["Start sprays at bud emergence", "Ensure adequate air circulation"],
        severityNote: "Moderate. Distorts leaf tips and affects fruit."
      },
      ta: {
        name: "செர்ரி சாம்பல் நோய் (Powdery Mildew)",
        description: "இலைகளில் வெள்ளை மாவு போன்ற பூஞ்சை படலத்தை உருவாக்கும் நோய்.",
        symptoms: ["இலைகளில் வெள்ளை மாவு பூச்சு", "இலைகள் மேல்நோக்கி சுருங்குதல்", "வளர்ச்சி குன்றுதல்"],
        causes: ["பொடோஸ்பீரா பூஞ்சை", "அதிக ஈரப்பதம் மற்றும் நிழல்"],
        prevention: ["மரங்களை கவாத்து செய்யவும்", "அதிக தழைச்சத்தை தவிர்க்கவும்"],
        organicTreatment: ["பொட்டாசியம் பைகார்பனேட்", "வேப்பெண்ணெய்", "கந்தகம்"],
        chemicalTreatment: ["மைக்குளோபுட்டானில்", "ஹெக்சாகோனசோல்"],
        bestPractices: ["இலைகள் துளிர்க்கும் போதே தெளிக்கவும்"],
        severityNote: "மிதமான தீவிரம்."
      },
      hi: {
        name: "चेरी का चूर्णिल आसिता (Powdery Mildew)",
        description: "पत्तों पर सफेद पाउडर जैसी परत जम जाती है, जिससे पत्ते मुड़ जाते हैं।",
        symptoms: ["सफेद चूर्ण की परत", "पत्तियों का ऊपर मुड़ना", "नई टहनियों का रुकना"],
        causes: ["फफूंद संक्रमण", "अधिक नमी व छायादार जगह"],
        prevention: ["पेड़ों की छंटाई करें", "अधिक नाइट्रोजन खाद से बचें"],
        organicTreatment: ["पोटेशियम बाइकार्बोनेट", "हॉर्टिकल्चर ऑयल", "सल्फर"],
        chemicalTreatment: ["माइक्लोबुटानिल", "हेक्साकोनाजोल"],
        bestPractices: ["शुरुआती कलियों पर छिड़काव करें"],
        severityNote: "मध्यम नुकसान।"
      }
    }
  },
  {
    cropName: "Cherry",
    classLabel: "Cherry_(including_sour)___healthy",
    name: "Cherry Healthy",
    isHealthy: true,
    severityNote: "Optimal plant health. Foliage is intact and vibrant.",
    description: "Cherry leaves are healthy, deep emerald green with clean serrated margins and free from fungal leaf spot, shothole, or mildew.",
    symptoms: ["Glossy green leaves", "No shot-hole perforations or powdery mildew", "Vigorous shoot growth"],
    causes: ["Good orchard hygiene, balanced watering, and sunny conditions"],
    prevention: ["Routine annual pruning and balanced micro-nutrient fertilizing"],
    organicTreatment: ["Preventive neem spray or compost extracts"],
    chemicalTreatment: ["None required"],
    bestPractices: ["Maintain mulch under drip line and scout periodically"],
    translations: {
      en: {
        name: "Cherry (Healthy)",
        description: "Optimal foliage showing excellent vigor and no diseases.",
        symptoms: ["Lush green leaves", "Clean margins", "Strong branching"],
        causes: ["Proper cultural practices and nutrition"],
        prevention: ["Continue standard pruning and hygiene"],
        organicTreatment: ["Compost extract"],
        chemicalTreatment: ["None required"],
        bestPractices: ["Routine inspection"],
        severityNote: "Healthy condition."
      },
      ta: {
        name: "செர்ரி (ஆரோக்கியமானது)",
        description: "இலைகள் நல்ல ஆரோக்கியத்துடன் எவ்வித நோய்த்தொற்றுமின்றி உள்ளன.",
        symptoms: ["பளபளப்பான பச்சை இலைகள்", "புள்ளிகள் இல்லை"],
        causes: ["சரியான பராமரிப்பு"],
        prevention: ["வழக்கமான கவாத்து தொடரவும்"],
        organicTreatment: ["இயற்கை உரம்"],
        chemicalTreatment: ["தேவை இல்லை"],
        bestPractices: ["கண்காணிப்பு"],
        severityNote: "ஆரோக்கியமானது."
      },
      hi: {
        name: "चेरी (स्वस्थ)",
        description: "पत्तियां पूरी तरह से हरी और रोगमुक्त हैं।",
        symptoms: ["चमकदार हरी पत्तियां", "कोई रोग नहीं"],
        causes: ["उचित देखभाल और पोषण"],
        prevention: ["सामान्य देखभाल जारी रखें"],
        organicTreatment: ["जैविक खाद"],
        chemicalTreatment: ["कोई नहीं"],
        bestPractices: ["नियमित जांच"],
        severityNote: "स्वस्थ फसल।"
      }
    }
  },

  // --- 4. Corn (Maize) (4 classes) ---
  {
    cropName: "Corn",
    classLabel: "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot",
    name: "Gray Leaf Spot",
    isHealthy: false,
    severityNote: "High severity. Can devastate yields during grain-fill period.",
    description: "Caused by Cercospora zeae-maydis. Causes long, rectangular, tan-to-gray lesions running parallel to leaf veins, blighting large canopy areas.",
    symptoms: [
      "Rectangular tan to gray lesions with distinct parallel vein boundaries",
      "Lesions coalesce, blighting entire leaf blades",
      "Stalk lodging and premature drydown before grain maturity"
    ],
    causes: [
      "Cercospora zeae-maydis fungus",
      "Continuous no-till corn rotations leaving crop residue",
      "Extended periods of warm (25°C-32°C), overcast, humid weather"
    ],
    prevention: [
      "Crop rotation with non-host crops such as soybean or alfalfa",
      "Plant corn hybrids with high Gray Leaf Spot resistance ratings",
      "Till infected residue under to accelerate organic matter decomposition"
    ],
    organicTreatment: [
      "Bio-fungicides based on Trichoderma harzianum or Bacillus subtilis",
      "Foliar silica spray to reinforce plant epidermal cell walls"
    ],
    chemicalTreatment: [
      "Azoxystrobin + Difenoconazole or Pyraclostrobin at VT-R1 growth stages",
      "Propiconazole foliar application when lesions reach the ear leaf"
    ],
    bestPractices: [
      "Scout the lower third of the canopy prior to tasseling",
      "Apply fungicides if lesions appear on the third leaf below the ear before tassel"
    ],
    translations: {
      en: {
        name: "Gray Leaf Spot",
        description: "Cercospora fungal disease producing long rectangular lesions along corn leaf veins.",
        symptoms: ["Rectangular tan-gray lesions", "Parallel vein borders", "Severe canopy blight"],
        causes: ["Cercospora fungus", "Warm humid weather and surface crop residue"],
        prevention: ["Rotate with soybeans", "Plant resistant hybrids", "Residue tillage"],
        organicTreatment: ["Trichoderma bio-fungicide", "Silica foliar spray"],
        chemicalTreatment: ["Azoxystrobin", "Pyraclostrobin", "Propiconazole"],
        bestPractices: ["Scout ear leaves before tasseling", "Time sprays during VT-R1"],
        severityNote: "High. Devastates grain fill yield if unmanaged."
      },
      ta: {
        name: "மக்காச்சோள சாம்பல் இலைப்புள்ளி (Gray Leaf Spot)",
        description: "செர்கோஸ்போரா பூஞ்சையால் ஏற்படும் இந்த நோய் இலைகளில் நீண்ட செவ்வக வடிவ சாம்பல் நிற புள்ளிகளை உருவாக்குகிறது.",
        symptoms: ["செவ்வக சாம்பல் நிற புள்ளிகள்", "நரம்புகளுக்கு இடையே பரவும் புள்ளிகள்", "இலைகள் காய்ந்து போதல்"],
        causes: ["செர்கோஸ்போரா பூஞ்சை", "அதிக வெப்பம் மற்றும் ஈரப்பதம்"],
        prevention: ["பயிர் சுழற்சி (சோயாபீன்ஸ்)", "எதிர்ப்புத்திறன் கொண்ட கலப்பினங்கள்"],
        organicTreatment: ["ட்ரைக்கோடெர்மா விரிடி", "பயோ-பூஞ்சைக் கொல்லி"],
        chemicalTreatment: ["அசாக்ஸிஸ்ட்ரோபின்", "புரோபிகோனசோல்"],
        bestPractices: ["பூக்கும் பருவத்தில் கீழ் இலைகளை கண்காணிக்கவும்"],
        severityNote: "அதிக தீவிரம். மகசூலை வெகுவாக குறைக்கும்."
      },
      hi: {
        name: "मक्का का ग्रे लीफ स्पॉट (Gray Leaf Spot)",
        description: "सर्कोस्पोरा कवक से पत्तियों पर आयताकार भूरे-धूसर धब्बे बनते हैं जो नसों के समानांतर फैलते हैं।",
        symptoms: ["आयताकार धूसर धब्बे", "पत्तियों का झुलसना", "दाने भरने से पहले सूखना"],
        causes: ["सर्कोस्पोरा फंगस", "गर्म और आर्द्र मौसम"],
        prevention: ["फसल चक्र अपनाएं", "प्रतिरोधी बीज बोएं", "खेत की गहरी जुताई"],
        organicTreatment: ["ट्राइकोडर्मा", "सिलिका स्प्रे"],
        chemicalTreatment: ["एजॉक्सीस्ट्रोबिन", "प्रोपिकोनाजोल"],
        bestPractices: ["भुट्टा बनने से पहले निरीक्षण करें"],
        severityNote: "गंभीर। पैदावार में भारी गिरावट लाता है।"
      }
    }
  },
  {
    cropName: "Corn",
    classLabel: "Corn_(maize)___Common_rust_",
    name: "Common Rust",
    isHealthy: false,
    severityNote: "Moderate severity. Favors cool, moist conditions.",
    description: "Caused by Puccinia sorghi. Characterized by golden-brown to cinnamon-brown pustules scattered across both upper and lower leaf surfaces.",
    symptoms: [
      "Circular to elongate cinnamon-brown powdery pustules (uredinia) on leaves",
      "Pustules rupture epidermal surface releasing rusty powdery spores",
      "Yellowing and chlorosis surrounding clustered pustules"
    ],
    causes: [
      "Puccinia sorghi fungus whose spores blow in on storm fronts",
      "Cool temperatures (16°C - 23°C) and high relative humidity (>95%)"
    ],
    prevention: [
      "Plant corn hybrids with Rp gene-specific or general rust resistance",
      "Plant early in the season to avoid late-season airborne spore showers"
    ],
    organicTreatment: [
      "Sulfur dusting or wettable sulfur suspensions",
      "Copper oxychloride foliar sprays"
    ],
    chemicalTreatment: [
      "Foliar triazole or strobilurin fungicides (e.g., Pyraclostrobin, Tebuconazole)",
      "Mancozeb application at first sign of pustules on upper leaves"
    ],
    bestPractices: [
      "Monitor weather patterns and regional rust movement alerts",
      "Treat sweet corn early as market ear appearance is critical"
    ],
    translations: {
      en: {
        name: "Common Rust",
        description: "Puccinia fungal pathogen causing powdery cinnamon-brown pustules on both leaf sides.",
        symptoms: ["Cinnamon-brown powdery pustules", "Ruptured epidermis", "Leaf chlorosis"],
        causes: ["Puccinia sorghi fungus", "Cool moist weather and airborne spore fronts"],
        prevention: ["Rust-resistant hybrid seeds", "Early planting dates"],
        organicTreatment: ["Wettable sulfur", "Copper oxychloride"],
        chemicalTreatment: ["Tebuconazole", "Pyraclostrobin", "Mancozeb"],
        bestPractices: ["Check regional rust alerts", "Apply fungicide at early emergence"],
        severityNote: "Moderate. Cool damp seasons exacerbate spore spread."
      },
      ta: {
        name: "மக்காச்சோள துரு நோய் (Common Rust)",
        description: "பக்சீனியா பூஞ்சையால் ஏற்படும் இந்த நோய் இலைகளில் பழுப்பு நிற துரு போன்ற கொப்புளங்களை உண்டாக்குகிறது.",
        symptoms: ["இலையின் இருபுறமும் துரு போன்ற கொப்புளங்கள்", "தூள் போன்ற வித்துக்கள்", "இலைகள் மஞ்சள் நிறமாதல்"],
        causes: ["பக்சீனியா பூஞ்சை", "குளிர்ந்த ஈரப்பதமான காற்று"],
        prevention: ["துரு எதிர்ப்பு கலப்பின விதைகள்", "பருவத்தின் தொடக்கத்திலேயே விதைக்கவும்"],
        organicTreatment: ["கந்தகத் தூள்", "காப்பர் ஆக்சிகுளோரைடு"],
        chemicalTreatment: ["டெபுகோனசோல்", "மேன்கோசெப்"],
        bestPractices: ["கொப்புளங்கள் தோன்றியவுடன் தெளிக்கவும்"],
        severityNote: "மிதமான தீவிரம்."
      },
      hi: {
        name: "मक्का का सामान्य रतुआ/जंग (Common Rust)",
        description: "पुक्सीनिया कवक के कारण पत्तियों के दोनों तरफ भूरे-लाल रंग के फफोले (पुस्ट्यूल) बन जाते हैं।",
        symptoms: ["दालचीनी जैसे भूरे फफोले", "धूल जैसा पाउडर", "पत्तियों का पीला पड़ना"],
        causes: ["पुक्सीनिया फंगस", "ठंडा और नम मौसम"],
        prevention: ["रोगरोधी बीज चुनें", "समय पर बुवाई करें"],
        organicTreatment: ["घुलनशील गंधक (सल्फर)", "कॉपर ऑक्सीक्लोराइड"],
        chemicalTreatment: ["टेबुकोनाजोल", "मैनकोजेब"],
        bestPractices: ["शुरुआती लक्षण दिखते ही कवकनाशी डालें"],
        severityNote: "मध्यम नुकसान।"
      }
    }
  },
  {
    cropName: "Corn",
    classLabel: "Corn_(maize)___Northern_Leaf_Blight",
    name: "Northern Leaf Blight",
    isHealthy: false,
    severityNote: "High severity. Large cigar-shaped lesions destroy photosynthetic tissue rapidly.",
    description: "Caused by Exserohilum turcicum. Produces large, elongated, cigar-shaped grayish-green to tan lesions that can spread rapidly during damp conditions.",
    symptoms: [
      "Long, elliptical, cigar-shaped lesions (2.5 to 15 cm long) on foliage",
      "Lesions start grayish-green and dry to tan with dark sporulation zones",
      "Extensive leaf death and premature senescence of the canopy"
    ],
    causes: [
      "Exserohilum turcicum fungus overwintering on infested corn debris",
      "Moderate temperatures (18°C - 27°C) with persistent heavy dew and rain showers"
    ],
    prevention: [
      "Select hybrids with single-gene (Ht genes) and multigenic blight resistance",
      "Rotate corn with soybeans, wheat, or non-grass crops",
      "Incorporate crop residue with chisel plowing where feasible"
    ],
    organicTreatment: [
      "Foliar applications of copper hydroxide",
      "Biological control with Bacillus velezensis strains"
    ],
    chemicalTreatment: [
      "Strobilurin + Triazole premixes (e.g. Quadris Top, Headline AMP)",
      "Propiconazole or Azoxystrobin applications before silking"
    ],
    bestPractices: [
      "Assess disease incidence around V14 to R1 growth stages",
      "Prioritize fungicide applications if blight reaches ear leaves before pollination"
    ],
    translations: {
      en: {
        name: "Northern Leaf Blight",
        description: "Exserohilum fungus causing large cigar-shaped grayish lesions on corn leaves.",
        symptoms: ["Large cigar-shaped tan lesions", "Rapid leaf dieback", "Premature canopy senescence"],
        causes: ["Exserohilum turcicum", "Moderate temperatures with heavy dew"],
        prevention: ["Plant resistant hybrids (Ht genes)", "Crop rotation", "Residue incorporation"],
        organicTreatment: ["Copper hydroxide", "Bacillus velezensis bio-spray"],
        chemicalTreatment: ["Azoxystrobin + Difenoconazole", "Propiconazole"],
        bestPractices: ["Scout at V14-R1 stage", "Protect upper canopy ear leaves"],
        severityNote: "High. Cigar-shaped lesions rapidly destroy photosynthesis."
      },
      ta: {
        name: "மக்காச்சோள வடக்கு இலை கருகல் (Northern Leaf Blight)",
        description: "எக்ஸ்ஸெரோஹைலம் பூஞ்சையால் ஏற்படும் இந்த நோய் சுருட்டு வடிவ நீண்ட சாம்பல் நிற கருகல் புள்ளிகளை உருவாக்குகிறது.",
        symptoms: ["சுருட்டு வடிவ நீண்ட கருகல் புள்ளிகள்", "இலைகள் வேகமாக காய்ந்து போதல்", "முன்கூட்டியே முதிர்ச்சி அடைதல்"],
        causes: ["பூஞ்சை தொற்று", "ஈரப்பதம் மற்றும் பனிப்பொழிவு"],
        prevention: ["எதிர்ப்புத்திறன் கொண்ட கலப்பினங்கள்", "பயிர் சுழற்சி"],
        organicTreatment: ["காப்பர் ஹைட்ராக்சைடு", "பயோ-கட்டுப்பாட்டு நுண்ணுயிரிகள்"],
        chemicalTreatment: ["அசாக்ஸிஸ்ட்ரோபின்", "புரோபிகோனசோல்"],
        bestPractices: ["பூக்கும் முன் கருகல் புள்ளிகளை கண்காணிக்கவும்"],
        severityNote: "மிக அதிக தீவிரம்."
      },
      hi: {
        name: "मक्का का उत्तरी पत्ता झुलसा (Northern Leaf Blight)",
        description: "सिगार के आकार के बड़े धूसर-भूरे धब्बे जो पत्तियों को तेजी से झुलसा देते हैं।",
        symptoms: ["सिगार के आकार के लंबे धब्बे", "पत्तियों का सूखना", "पैदावार में कमी"],
        causes: ["एक्सरओहिलम कवक", "भारी ओस और मध्यम तापमान"],
        prevention: ["रोगरोधी बीज बोएं", "फसल चक्र अपनाएं"],
        organicTreatment: ["कॉपर हाइड्रॉक्साइड", "बैसिलस स्प्रे"],
        chemicalTreatment: ["एजॉक्सीस्ट्रोबिन", "प्रोपिकोनाजोल"],
        bestPractices: ["परागण से पहले ऊपरी पत्तियों की रक्षा करें"],
        severityNote: "अत्यधिक गंभीर।"
      }
    }
  },
  {
    cropName: "Corn",
    classLabel: "Corn_(maize)___healthy",
    name: "Corn Healthy",
    isHealthy: true,
    severityNote: "Optimal plant health. Foliage is upright and productive.",
    description: "Corn foliage shows vigorous upright arching blades, rich dark green color, healthy venation, and clean ear development.",
    symptoms: ["Broad dark-green leaf blades", "No lesions or pustules", "Strong stalk integrity"],
    causes: ["Adequate soil nitrogen, balanced water, and sunny growing conditions"],
    prevention: ["Maintain balanced side-dress nitrogen fertilizer and weed control"],
    organicTreatment: ["Humic acid and fish emulsion foliar spray"],
    chemicalTreatment: ["None required"],
    bestPractices: ["Maintain plant density and scout weekly"],
    translations: {
      en: {
        name: "Corn (Healthy)",
        description: "Healthy maize canopy with excellent chlorophyll density.",
        symptoms: ["Broad dark-green leaves", "Intact leaf margins", "Strong stalk"],
        causes: ["Optimal agronomic conditions and balanced fertility"],
        prevention: ["Continue weed management and balanced nutrition"],
        organicTreatment: ["Fish emulsion / seaweed tonic"],
        chemicalTreatment: ["None required"],
        bestPractices: ["Weekly field scouting"],
        severityNote: "Healthy condition."
      },
      ta: {
        name: "மக்காச்சோளம் (ஆரோக்கியமானது)",
        description: "மக்காச்சோள இலைகள் கரும்பச்சை நிறத்துடன், நோய்களின்றி செழிப்பாக உள்ளன.",
        symptoms: ["அகன்ற பச்சை இலைகள்", "புள்ளிகள் ஏதுமில்லை"],
        causes: ["சரியான தழைச்சத்து மற்றும் நீர் நிர்வாகம்"],
        prevention: ["களை நிர்வாகம் மற்றும் சமச்சீர் உரமிடுதல்"],
        organicTreatment: ["மண்புழு உரக் கரைசல்"],
        chemicalTreatment: ["தேவை இல்லை"],
        bestPractices: ["வழக்கமான கண்காணிப்பு"],
        severityNote: "ஆரோக்கியமானது."
      },
      hi: {
        name: "मक्का (स्वस्थ)",
        description: "पत्तियां चौड़ी, गहरी हरी और पूरी तरह से निरोगी हैं।",
        symptoms: ["गहरा हरा रंग", "कोई दाग-धब्बा नहीं", "मजबूत तना"],
        causes: ["उचित नाइट्रोजन और सिंचाई"],
        prevention: ["खरपतवार नियंत्रण और संतुलित खाद जारी रखें"],
        organicTreatment: ["जीवामृत या जैविक खाद"],
        chemicalTreatment: ["कोई नहीं"],
        bestPractices: ["साप्ताहिक निरीक्षण"],
        severityNote: "स्वस्थ फसल।"
      }
    }
  },

  // --- 5. Grape (4 classes) ---
  {
    cropName: "Grape",
    classLabel: "Grape___Black_rot",
    name: "Grape Black Rot",
    isHealthy: false,
    severityNote: "High severity. Can destroy 100% of grape clusters under wet conditions.",
    description: "Caused by Guignardia bidwellii. Circular reddish-brown spots appear on leaves with black fruiting bodies (pycnidia), and grapes turn into hard black shriveled mummies.",
    symptoms: [
      "Circular reddish-brown leaf spots with tiny black pinpoint dots inside",
      "Infected berries turn pale, then soft, and shrivel into black hard mummies",
      "Black oval lesions on young vine shoots"
    ],
    causes: [
      "Guignardia bidwellii fungus",
      "Overwintering mummies on the vine or vineyard floor releasing ascospores during warm rains"
    ],
    prevention: [
      "Meticulously remove all mummified grape clusters during winter pruning",
      "Prune and train vine canopy to maximize air movement and fast drying",
      "Keep vineyard floor mowed and clean"
    ],
    organicTreatment: [
      "Copper sulfate or Bordeaux mixture applied pre-bloom",
      "Serenade Max (Bacillus subtilis) preventative applications"
    ],
    chemicalTreatment: [
      "Myclobutanil (Rally) or Mancozeb sprays from early shoot development to post-bloom",
      "Kresoxim-methyl or Tebuconazole applications"
    ],
    bestPractices: [
      "Protect clusters critically from immediate pre-bloom until 4-5 weeks post-bloom",
      "Collect and bury or burn all mummified fruit"
    ],
    translations: {
      en: {
        name: "Grape Black Rot",
        description: "Guignardia fungus causing reddish-brown leaf spots and mummifying grape berries.",
        symptoms: ["Reddish-brown leaf spots with black rings", "Berries shrivel into black mummies"],
        causes: ["Guignardia bidwellii", "Warm rainy spring seasons"],
        prevention: ["Remove mummified berries", "Canopy shoot positioning for airflow"],
        organicTreatment: ["Bordeaux mixture", "Copper spray", "Bacillus bio-fungicide"],
        chemicalTreatment: ["Myclobutanil", "Mancozeb", "Tebuconazole"],
        bestPractices: ["Spray during pre-bloom to 4 weeks post-bloom", "Destroy infected vine debris"],
        severityNote: "High. Can wipe out entire grape harvest if not controlled."
      },
      ta: {
        name: "திராட்சை கரு அழுகல் (Grape Black Rot)",
        description: "கிக்னார்டியா பூஞ்சையால் ஏற்படும் இந்த நோய் இலைகளில் பழுப்பு நிற புள்ளிகளையும் பழங்களை கருப்பாக சுருங்கவும் செய்கிறது.",
        symptoms: ["இலைகளில் சிவப்பு-பழுப்பு புள்ளிகள்", "பழங்கள் கருப்பாக சுருங்கி காய்ந்து போதல்"],
        causes: ["பூஞ்சை தொற்று", "ஈரப்பதம் மற்றும் மழை"],
        prevention: ["காய்ந்த திராட்சை கொத்துக்களை அகற்றவும்", "காற்றோட்டத்திற்கு பந்தல் அமைப்பை பராமரிக்கவும்"],
        organicTreatment: ["போர்டோ கலவை (Bordeaux mixture)", "காப்பர் பூஞ்சைக் கொல்லி"],
        chemicalTreatment: ["மைக்குளோபுட்டானில்", "மேன்கோசெப்"],
        bestPractices: ["பூ பூக்கும் முன் மற்றும் பின் கட்டாயம் மருந்து தெளிக்கவும்"],
        severityNote: "மிக அதிக தீவிரம்."
      },
      hi: {
        name: "अंगूर का काला सड़न रोग (Grape Black Rot)",
        description: "पत्तियों पर लाल-भूरे धब्बे और अंगूर के दाने काले होकर सूख जाते हैं।",
        symptoms: ["पत्तियों पर काले बिंदुओं वाले भूरे धब्बे", "अंगूर के गुच्छों का सूखकर काला होना"],
        causes: ["गिग्नार्डिया कवक", "गर्म और बारिश का मौसम"],
        prevention: ["सूखे अंगूरों को बेल से हटाकर नष्ट करें", "हवा के बहाव के लिए छंटाई करें"],
        organicTreatment: ["बोर्डो मिश्रण", "कॉपर कवकनाशी"],
        chemicalTreatment: ["माइक्लोबुटानिल", "मैनकोजेब"],
        bestPractices: ["फूल आने से 4 हफ्ते बाद तक सुरक्षात्मक छिड़काव करें"],
        severityNote: "अत्यधिक गंभीर।"
      }
    }
  },
  {
    cropName: "Grape",
    classLabel: "Grape___Esca_(Black_Measles)",
    name: "Esca (Black Measles)",
    isHealthy: false,
    severityNote: "High severity. Chronic trunk disease that causes apoplexy and vine decline.",
    description: "A complex vascular disease caused by Phaeomoniella chlamydospora and Phaeoacremonium aleophilum. Causes 'tiger-stripe' interveinal chlorosis and necrosis on leaves and speckled berries.",
    symptoms: [
      "'Tiger-stripe' chlorotic and necrotic patterns between leaf veins",
      "Berries develop dark purplish-brown measles-like flecks on skin",
      "Sudden summer apoplexy where vines rapidly wilt and collapse"
    ],
    causes: [
      "Fungal complex entering through large winter pruning wounds",
      "Older vines (>8-10 years) stressed by high fruit load or drought"
    ],
    prevention: [
      "Avoid making large pruning cuts during damp or rainy weather",
      "Paint pruning wounds immediately with sealants or biocontrol agents (Trichoderma)",
      "Delayed late-winter pruning when healing responses are faster"
    ],
    organicTreatment: [
      "Foliar applications of copper and chelated micronutrients to bolster tolerance",
      "Trichoderma-based wound protectants (e.g., Esquive WP)"
    ],
    chemicalTreatment: [
      "No single curative chemical exists; trunk renewal and sanitizing cuts are required",
      "Pruning wound sealants containing pyraclostrobin or thiophanate-methyl"
    ],
    bestPractices: [
      "Disinfect shears with alcohol or bleach solution between suspect vines",
      "Retrain new suckers to replace decayed trunks"
    ],
    translations: {
      en: {
        name: "Esca (Black Measles)",
        description: "Complex fungal trunk disease displaying tiger-stripe foliage patterns and spotted fruit.",
        symptoms: ["Tiger-stripe leaf chlorosis", "Dark flecked measles berries", "Sudden vine apoplexy"],
        causes: ["Fungal complex entering pruning wounds", "Vascular trunk wood decay"],
        prevention: ["Seal pruning cuts", "Delay pruning to late dry winter", "Clean shears"],
        organicTreatment: ["Trichoderma wound paste", "Foliar nutrient balancing"],
        chemicalTreatment: ["Fungicidal pruning wound sealants"],
        bestPractices: ["Trunk renewal pruning", "Disinfect tools between vines"],
        severityNote: "High. Trunk vascular disease causing long-term vine decline."
      },
      ta: {
        name: "திராட்சை எஸ்கா நோய் / பிளாக் மீசில்ஸ்",
        description: "மரத்தண்டு வாஸ்குலார் நோயான இது இலைகளில் புலி வரி போன்ற மஞ்சள்-பழுப்பு வடிவங்களை உருவாக்குகிறது.",
        symptoms: ["இலைகளில் புலி வரி போன்ற திட்டுகள்", "பழங்களில் அம்மை போன்ற புள்ளிகள்", "கொடி திடீரென வாடி இறத்தல்"],
        causes: ["கவாத்து காயங்கள் வழியே நுழையும் பூஞ்சை"],
        prevention: ["கவாத்து காயங்களுக்கு மருந்து பூசவும்", "மழைக்காலத்தில் கவாத்து செய்வதை தவிர்க்கவும்"],
        organicTreatment: ["ட்ரைக்கோடெர்மா காயம் பூச்சு", "நுண்ணூட்டச்சத்து தெளிப்பு"],
        chemicalTreatment: ["பூஞ்சைக் கொல்லி காயம் முத்திரை (Sealant)"],
        bestPractices: ["கத்தரிக்கோலை கிருமி நீக்கம் செய்யவும்"],
        severityNote: "மிக அதிக தீவிரம்."
      },
      hi: {
        name: "अंगूर का एस्का / ब्लैक मीजल्स रोग",
        description: "तने का फफूंद जनित रोग जिससे पत्तियों पर 'बाघ की धारियों' जैसे निशान पड़ते हैं।",
        symptoms: ["पत्तियों पर धारियां", "अंगूर पर खसरे जैसे काले धब्बे", "बेल का अचानक सूखना"],
        causes: ["छंटाई के घावों से फंगस का प्रवेश"],
        prevention: ["छंटाई के घावों पर पेस्ट लगाएं", "सूखे मौसम में ही छंटाई करें"],
        organicTreatment: ["ट्राइकोडर्मा घाव लेप", "संतुलित पोषण"],
        chemicalTreatment: ["कवकनाशी घाव सीलेंट"],
        bestPractices: ["उपकरणों को विसंक्रमित करें"],
        severityNote: "गंभीर। तने को खोखला कर देता है।"
      }
    }
  },
  {
    cropName: "Grape",
    classLabel: "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",
    name: "Isariopsis Leaf Blight",
    isHealthy: false,
    severityNote: "Moderate severity. Causes late-season premature defoliation.",
    description: "Caused by Pseudocercospora vitis (Isariopsis clavispora). Produces large, irregular dark brown lesions with defined margins on older leaves.",
    symptoms: [
      "Irregular dark brown or black angular leaf spots on mature leaves",
      "Foliar yellow halos surrounding dark necrotic lesions",
      "Late-season premature defoliation impairing vine carbohydrate reserves"
    ],
    causes: [
      "Pseudocercospora vitis fungus",
      "High humidity, poor canopy airflow, and warm late-summer conditions"
    ],
    prevention: [
      "Summer canopy leaf pulling in the fruiting zone to increase airflow",
      "Ensure proper vine spacing and trellising",
      "Post-harvest sanitation of fallen leaves"
    ],
    organicTreatment: [
      "Copper hydroxide or copper oxychloride foliar spray",
      "Sulfur dusting during mild temperatures"
    ],
    chemicalTreatment: [
      "Mancozeb or Chlorothalonil application",
      "Azoxystrobin or Difenoconazole for systemic curative intervention"
    ],
    bestPractices: [
      "Maintain active protection through late season until leaf drop",
      "Combine canopy management with targeted low-volume spraying"
    ],
    translations: {
      en: {
        name: "Isariopsis Leaf Blight",
        description: "Pseudocercospora fungus causing irregular brown lesions on older grape leaves.",
        symptoms: ["Angular dark brown spots", "Chlorotic halos", "Premature autumn defoliation"],
        causes: ["Pseudocercospora vitis", "Late season humidity and dense canopy"],
        prevention: ["Leaf removal in fruit zone", "Good vine trellising", "Post-harvest cleanup"],
        organicTreatment: ["Copper oxychloride", "Sulfur spray"],
        chemicalTreatment: ["Mancozeb", "Chlorothalonil", "Difenoconazole"],
        bestPractices: ["Protect canopy through post-harvest", "Ensure good sun penetration"],
        severityNote: "Moderate. Accelerates premature leaf drop."
      },
      ta: {
        name: "திராட்சை இலைக் கருகல் (Isariopsis Leaf Spot)",
        description: "முதிர்ந்த இலைகளில் ஒழுங்கற்ற கரும்பழுப்பு நிற கருகல் புள்ளிகளை உண்டாக்கும் பூஞ்சை நோய்.",
        symptoms: ["ஒழுங்கற்ற கரும்பழுப்பு புள்ளிகள்", "மஞ்சள் வளையங்கள்", "இலைகள் முன்கூட்டியே உதிர்தல்"],
        causes: ["பூஞ்சை தொற்று", "அதிக ஈரப்பதம்"],
        prevention: ["இலைகளை கவாத்து செய்து காற்றோட்டம் அமைத்தல்"],
        organicTreatment: ["காப்பர் பூஞ்சைக் கொல்லி", "கந்தகம்"],
        chemicalTreatment: ["மேன்கோசெப்", "குளோரோதலோனில்"],
        bestPractices: ["அறுவடைக்கு பின்னரும் செடிகளை பாதுகாக்கவும்"],
        severityNote: "மிதமான தீவிரம்."
      },
      hi: {
        name: "अंगूर का पत्ता झुलसा (Isariopsis Leaf Spot)",
        description: "पुरानी पत्तियों पर अनियमित गहरे भूरे धब्बे जो पत्तियों को समय से पहले गिरा देते हैं।",
        symptoms: ["कोणीय गहरे भूरे धब्बे", "पत्तियों का पीला पड़ना", "समय से पहले पतझड़"],
        causes: ["स्यूडोसर्कोस्पोरा कवक", "सघन छांव और नमी"],
        prevention: ["हवा के लिए पत्तों की छंटाई", "सफाई रखें"],
        organicTreatment: ["कॉपर कवकनाशी", "सल्फर"],
        chemicalTreatment: ["मैनकोजेब", "क्लोरोथैलोनिल"],
        bestPractices: ["फसल कटाई के बाद भी बेल की देखभाल करें"],
        severityNote: "मध्यम नुकसान।"
      }
    }
  },
  {
    cropName: "Grape",
    classLabel: "Grape___healthy",
    name: "Grape Healthy",
    isHealthy: true,
    severityNote: "Optimal plant health. Foliage is intact and vibrant.",
    description: "Grape leaves exhibit lush green fan-shaped blades, healthy venation, strong tendril growth, and no signs of downy mildew, powdery mildew, or black rot.",
    symptoms: ["Vibrant green leaves", "No spots, lesions, or powdery residues", "Strong shoot extension"],
    causes: ["Optimal sunlight, balanced fertilization, and good vineyard sanitation"],
    prevention: ["Maintain good canopy shoot positioning and regular scouting"],
    organicTreatment: ["Seaweed extract and silica foliar sprays for cuticle strength"],
    chemicalTreatment: ["None required"],
    bestPractices: ["Monitor canopy microclimate with weather sensors"],
    translations: {
      en: {
        name: "Grape (Healthy)",
        description: "Healthy vine foliage exhibiting strong vigor and disease resistance.",
        symptoms: ["Uniform emerald leaves", "Clean leaf surfaces", "Active tendril growth"],
        causes: ["Excellent cultural management and sunlight exposure"],
        prevention: ["Continue canopy management and balanced drip irrigation"],
        organicTreatment: ["Seaweed extract spray"],
        chemicalTreatment: ["None required"],
        bestPractices: ["Weekly scouting and canopy tucking"],
        severityNote: "Healthy condition."
      },
      ta: {
        name: "திராட்சை (ஆரோக்கியமானது)",
        description: "திராட்சை இலைகள் எந்தவித நோய்களுமின்றி கரும்பச்சை நிறத்துடன் செழிப்பாக உள்ளன.",
        symptoms: ["பச்சை இலைகள்", "புள்ளிகள் இல்லை", "நல்ல வளர்ச்சி"],
        causes: ["சரியான பராமரிப்பு மற்றும் சூரிய வெளிச்சம்"],
        prevention: ["பந்தல் மற்றும் நீர் பாசனத்தை சீராக பராமரிக்கவும்"],
        organicTreatment: ["கடற்பாசி உரம்"],
        chemicalTreatment: ["தேவை இல்லை"],
        bestPractices: ["தொடர்ந்து கண்காணிக்கவும்"],
        severityNote: "ஆரோக்கியமானது."
      },
      hi: {
        name: "अंगूर (स्वस्थ)",
        description: "पत्तियां पूरी तरह से हरी, चमकदार और रोगमुक्त हैं।",
        symptoms: ["गहरा हरा रंग", "कोई दाग या फफूंद नहीं", "मजबूत बेल"],
        causes: ["उत्कृष्ट देखभाल और धूप"],
        prevention: ["नियमित छंटाई और पोषण जारी रखें"],
        organicTreatment: ["जैविक टॉनिक"],
        chemicalTreatment: ["कोई नहीं"],
        bestPractices: ["साप्ताहिक निरीक्षण"],
        severityNote: "स्वस्थ स्थिति।"
      }
    }
  },

  // --- 6. Orange (1 class) ---
  {
    cropName: "Orange",
    classLabel: "Orange___Haunglongbing_(Citrus_greening)",
    name: "Citrus Greening (Huanglongbing)",
    isHealthy: false,
    severityNote: "Critical severity. Incurable bacterial disease threatening citrus worldwide.",
    description: "Caused by the fastidious bacterium Candidatus Liberibacter asiaticus, vectored by the Asian citrus psyllid (Diaphorina citri). Produces blotchy mottle chlorosis, yellow shoots, and lopsided bitter green fruit.",
    symptoms: [
      "Asymmetric blotchy mottle yellowing across leaf veins (unlike symmetric zinc deficiency)",
      "Yellow shoot terminals standing out against green canopy",
      "Stunted, lopsided fruit that fails to color and remains bitter",
      "Root dieback and progressive tree decline"
    ],
    causes: [
      "Candidatus Liberibacter asiaticus bacteria",
      "Transmission by Asian citrus psyllid insects (Diaphorina citri)",
      "Infected nursery budding or grafting material"
    ],
    prevention: [
      "Plant only certified disease-free citrus nursery trees from screenhouses",
      "Strict quarantine controls prohibiting citrus transport from infested zones",
      "Aggressive vector control of the Asian citrus psyllid"
    ],
    organicTreatment: [
      "Releasing parasitoid wasps (Tamarixia radiata) for biological psyllid control",
      "Kaolin clay foliar sprays to deter psyllid feeding",
      "Enhanced nutritional foliar programs to sustain tree life"
    ],
    chemicalTreatment: [
      "Systemic neonicotinoids (Imidacloprid) or pyrethroids for psyllid suppression",
      "Trunk injection of oxytetracycline under official agricultural authorization"
    ],
    bestPractices: [
      "Scout new citrus flush leaves continuously for psyllid nymphs",
      "Promptly remove and destroy severely symptomatic trees to reduce infection reservoirs"
    ],
    translations: {
      en: {
        name: "Citrus Greening (Huanglongbing)",
        description: "Devastating bacterial disease vectored by psyllids, causing asymmetric blotchy mottle.",
        symptoms: ["Asymmetric blotchy mottle", "Yellow shoot tips", "Lopsided bitter fruit", "Tree decline"],
        causes: ["Candidatus Liberibacter bacteria", "Asian citrus psyllid vector"],
        prevention: ["Plant certified disease-free trees", "Control psyllid vectors", "Screenhouse nurseries"],
        organicTreatment: ["Tamarixia radiata wasps", "Kaolin clay spray", "Nutritional support"],
        chemicalTreatment: ["Imidacloprid for psyllid", "Authorized bactericide injection"],
        bestPractices: ["Scout for psyllid nymphs", "Eradicate confirmed infected trees"],
        severityNote: "Critical. Incurable bacterial infection causing tree death."
      },
      ta: {
        name: "ஆரஞ்சு சிட்ரஸ் கிரீனிங் நோய் (Huanglongbing)",
        description: "பாக்டீரியாவால் ஏற்படும் இந்த கொடிய நோய் இலைகளில் சமச்சீரற்ற மஞ்சள் நிற திட்டுகளை உருவாக்குகிறது.",
        symptoms: ["சமச்சீரற்ற மஞ்சள் திட்டுகள்", "மஞ்சள் நிற தளிர்கள்", "வடிவம் மாறிய கசப்பான பழங்கள்", "மரம் காய்ந்து போதல்"],
        causes: ["பாக்டீரியா தொற்று", "சிட்ரஸ் அசுவினி / இலைப்பேன் பூச்சிகள்"],
        prevention: ["சான்றளிக்கப்பட்ட நாற்றுகளை நடவும்", "பூச்சி பரவலை கட்டுப்படுத்தவும்"],
        organicTreatment: ["கயோலின் களிமண் தெளிப்பு", "ஒட்டுண்ணி குளவிகள்"],
        chemicalTreatment: ["இமிடாக்குளோப்ரிட் பூச்சிக்கொல்லி"],
        bestPractices: ["நோயுற்ற மரங்களை வெட்டி அகற்றவும்"],
        severityNote: "மிகவும் ஆபத்தானது. மரத்தை முழுமையாக கொல்லும்."
      },
      hi: {
        name: "संतरे का सिट्रस ग्रीनिंग रोग (HLB)",
        description: "बैक्टीरिया जनित विनाशकारी रोग जिससे पत्तियों पर असमान पीले धब्बे और फल कड़वे हो जाते हैं।",
        symptoms: ["पत्तियों पर असमान पीलापन", "पीली टहनियां", "टेढ़े-मेढ़े कड़वे फल", "पेड़ का सूखना"],
        causes: ["कैंडीडेटस लिबेरीबैक्टर बैक्टीरिया", "सिट्रस सिल्ला कीट"],
        prevention: ["प्रमाणित रोगमुक्त पौधे लगाएं", "सिल्ला कीट का नियंत्रण"],
        organicTreatment: ["केओलिन क्ले स्प्रे", "परजीवी ततैया का उपयोग"],
        chemicalTreatment: ["इमिडाक्लोप्रिड कीटनाशक"],
        bestPractices: ["संक्रमित पेड़ों को तुरंत उखाड़ें"],
        severityNote: "अत्यधिक विनाशकारी। लाइलाज बीमारी।"
      }
    }
  },

  // --- 7. Peach (2 classes) ---
  {
    cropName: "Peach",
    classLabel: "Peach___Bacterial_spot",
    name: "Bacterial Spot",
    isHealthy: false,
    severityNote: "High severity. Causes severe shot-hole defoliation and pitted fruit lesions.",
    description: "Caused by Xanthomonas arboricola pv. pruni. Small angular water-soaked leaf spots turn purple-black and fall out, creating a 'shot-hole' appearance.",
    symptoms: [
      "Small angular water-soaked lesions turning dark reddish-purple to black",
      "Dead centers drop out leaving a ragged shot-hole appearance",
      "Deep sunken, pitted, oozing gum lesions on peach fruit skin"
    ],
    causes: [
      "Xanthomonas arboricola pv. pruni bacteria",
      "Wind-driven rain, blowing sand, and warm humid weather (24°C - 30°C)"
    ],
    prevention: [
      "Select resistant cultivars (e.g. Candor, Biscoe, Reliance)",
      "Establish windbreaks to minimize wind-driven sand abrasion",
      "Avoid overhead irrigation and excess nitrogen"
    ],
    organicTreatment: [
      "Low-rate fixed copper sprays applied during dormant and bud-swell stages",
      "Bacillus subtilis foliar applications"
    ],
    chemicalTreatment: [
      "Oxytetracycline (Mycoshield) sprays applied weekly during active fruit growth",
      "Copper bactericide applied at low rates to avoid phytotoxicity"
    ],
    bestPractices: [
      "Never apply high rates of copper to peach leaves once emerged due to leaf burning",
      "Scout orchard after windy thunderstorms"
    ],
    translations: {
      en: {
        name: "Peach Bacterial Spot",
        description: "Xanthomonas bacterial disease creating angular lesions and shot-hole leaf drops.",
        symptoms: ["Angular purple spots", "Shot-hole perforated leaves", "Pitted fruit cracks"],
        causes: ["Xanthomonas bacteria", "Wind-driven rains and warm humidity"],
        prevention: ["Plant resistant peach varieties", "Establish windbreaks"],
        organicTreatment: ["Low-rate copper dormant spray", "Bacillus subtilis"],
        chemicalTreatment: ["Oxytetracycline", "Copper bactericides"],
        bestPractices: ["Avoid heavy copper on tender foliage", "Scout after summer storms"],
        severityNote: "High. Defoliates canopy and disfigures fruit."
      },
      ta: {
        name: "பீச் பாக்டீரியா புள்ளி நோய் (Bacterial Spot)",
        description: "சாந்தோமோனாஸ் பாக்டீரியாவால் ஏற்படும் இந்த நோய் இலைகளில் துளைகளையும் பழங்களில் பள்ளங்களையும் உருவாக்குகிறது.",
        symptoms: ["ஊதா-கருப்பு கோணப் புள்ளிகள்", "இலைகளில் துளைகள் விழுதல்", "பழங்களில் விரிசல் மற்றும் பிசின் வடிதல்"],
        causes: ["பாக்டீரியா தொற்று", "காற்றுடன் கூடிய மழை"],
        prevention: ["எதிர்ப்புத்திறன் கொண்ட ரகங்களை நடவும்", "காற்றுத்தடுப்பு மரங்களை வளர்க்கவும்"],
        organicTreatment: ["குறைந்த அளவு காப்பர் தெளிப்பு", "பேசில்லஸ் உயிரி மருந்து"],
        chemicalTreatment: ["ஆக்சிடெட்ராசைக்ளின்"],
        bestPractices: ["இளந்தளிர்கள் மீது அதிக காப்பர் தெளிக்க வேண்டாம்"],
        severityNote: "அதிக தீவிரம்."
      },
      hi: {
        name: "आड़ू का जीवाणु धब्बा रोग (Bacterial Spot)",
        description: "जैंथोमोनास बैक्टीरिया के कारण पत्तियों पर गोल छेद (शॉट-होल) और फलों पर गड्ढे पड़ जाते हैं।",
        symptoms: ["कोणीय बैंगनी-काले धब्बे", "पत्तियों में छेद होना", "फलों पर गहरे घाव और गोंद निकलना"],
        causes: ["जीवाणु संक्रमण", "हवा के साथ बारिश"],
        prevention: ["प्रतिरोधी किस्में लगाएं", "हवा रोधक पेड़ लगाएं"],
        organicTreatment: ["हल्का कॉपर स्प्रे", "बैसिलस सबटिलिस"],
        chemicalTreatment: ["ऑक्सीटेट्रासाइक्लिन", "कॉपर जीवाणुनाशक"],
        bestPractices: ["कोमल पत्तियों पर तेज कॉपर न डालें"],
        severityNote: "गंभीर। फल और पत्तों दोनों को नुकसान।"
      }
    }
  },
  {
    cropName: "Peach",
    classLabel: "Peach___healthy",
    name: "Peach Healthy",
    isHealthy: true,
    severityNote: "Optimal plant health. Foliage is vigorous and vibrant.",
    description: "Peach leaves are long, lanceolate, vibrant glossy green with clean serration, free from leaf curl, bacterial spot, or peach scab.",
    symptoms: ["Vigorous lanceolate foliage", "Smooth unblemished leaf blades", "Clean shoot growth"],
    causes: ["Optimal sunlight, proper pruning, and good soil drainage"],
    prevention: ["Annual dormant copper spray for leaf curl prevention and balanced fertilization"],
    organicTreatment: ["Compost tea and organic fish hydrolosate"],
    chemicalTreatment: ["None required"],
    bestPractices: ["Maintain open-center tree architecture for sunlight"],
    translations: {
      en: {
        name: "Peach (Healthy)",
        description: "Optimal foliage showing excellent vigor and no diseases.",
        symptoms: ["Long glossy green leaves", "No shot-holes or curling"],
        causes: ["Good orchard hygiene and drainage"],
        prevention: ["Maintain standard open-center pruning"],
        organicTreatment: ["Compost tonic"],
        chemicalTreatment: ["None required"],
        bestPractices: ["Scout periodically"],
        severityNote: "Healthy condition."
      },
      ta: {
        name: "பீச் (ஆரோக்கியமானது)",
        description: "பீச் மர இலைகள் நோய்த்தாக்குதலின்றி செழுமையாகவும் பளபளப்பாகவும் உள்ளன.",
        symptoms: ["நீண்ட பச்சை இலைகள்", "துளைகள் இல்லை"],
        causes: ["சரியான பராமரிப்பு"],
        prevention: ["வழக்கமான கவாத்து தொடரவும்"],
        organicTreatment: ["இயற்கை உரம்"],
        chemicalTreatment: ["தேவை இல்லை"],
        bestPractices: ["கண்காணிப்பு"],
        severityNote: "ஆரோக்கியமானது."
      },
      hi: {
        name: "आड़ू (स्वस्थ)",
        description: "पत्तियां पूरी तरह से हरी, चमकदार और रोगमुक्त हैं।",
        symptoms: ["लंबी हरी पत्तियां", "कोई छेद या धब्बा नहीं"],
        causes: ["उत्कृष्ट देखभाल"],
        prevention: ["नियमित छंटाई जारी रखें"],
        organicTreatment: ["जैविक खाद"],
        chemicalTreatment: ["कोई नहीं"],
        bestPractices: ["निरीक्षण जारी रखें"],
        severityNote: "स्वस्थ स्थिति।"
      }
    }
  },

  // --- 8. Bell Pepper (2 classes) ---
  {
    cropName: "Bell Pepper",
    classLabel: "Pepper,_bell___Bacterial_spot",
    name: "Pepper Bacterial Spot",
    isHealthy: false,
    severityNote: "High severity. Causes severe defoliation and sunscald on exposed fruit.",
    description: "Caused by Xanthomonas euvesicatoria. Small circular to irregular water-soaked spots appear on leaves, turning dark brown with yellow halos, causing extensive leaf shedding.",
    symptoms: [
      "Small, angular, water-soaked lesions turning brown on leaf undersides",
      "Yellowing of affected leaves and severe premature defoliation",
      "Cracked, blister-like raised scab lesions on bell pepper fruit"
    ],
    causes: [
      "Xanthomonas bacteria surviving on contaminated seeds and crop debris",
      "Warm temperatures (24°C - 30°C) with frequent rainfall or overhead sprinkler splash"
    ],
    prevention: [
      "Use certified disease-free hot-water treated pepper seeds",
      "Select resistant pepper cultivars (Races 1-10 resistance)",
      "Strictly avoid overhead irrigation; use drip irrigation exclusively",
      "Implement a 2-3 year crop rotation with non-solanaceous crops"
    ],
    organicTreatment: [
      "Fixed copper bactericide tank-mixed with Bacillus amyloliquefaciens",
      "Foliar sprays of copper octanoate (soap)"
    ],
    chemicalTreatment: [
      "Copper hydroxide tank-mixed with Mancozeb (synergistic bactericidal effect)",
      "Actigard (acibenzolar-S-methyl) plant defense inducer"
    ],
    bestPractices: [
      "Do not enter or cultivate pepper fields while foliage is wet",
      "Destroy and bury all crop residues promptly after the final harvest"
    ],
    translations: {
      en: {
        name: "Pepper Bacterial Spot",
        description: "Xanthomonas bacterial pathogen causing leaf spotting, defoliation, and fruit scabs.",
        symptoms: ["Water-soaked brown spots", "Extensive leaf dropping", "Blister fruit scabs"],
        causes: ["Xanthomonas bacteria", "Warm rainy weather and overhead splashing"],
        prevention: ["Certified seed", "Resistant hybrids", "Drip irrigation only", "Crop rotation"],
        organicTreatment: ["Copper soap spray", "Bacillus bio-bactericide"],
        chemicalTreatment: ["Copper hydroxide + Mancozeb mix", "Actigard inducer"],
        bestPractices: ["Never work in wet fields", "Plow down residue post-harvest"],
        severityNote: "High. Rapid defoliation causes fruit sunscald."
      },
      ta: {
        name: "குடைமிளகாய் பாக்டீரியா புள்ளி நோய்",
        description: "சாந்தோமோனாஸ் பாக்டீரியாவால் ஏற்படும் இந்நோய் இலைகளில் நீர் கசிந்த புள்ளிகளையும் இலை உதிர்வையும் ஏற்படுத்துகிறது.",
        symptoms: ["நீர் கசிந்த கரும்பழுப்பு புள்ளிகள்", "கடுமையான இலை உதிர்தல்", "காய்களில் கொப்புளங்கள்"],
        causes: ["பாக்டீரியா தொற்று", "மழைத்துளி தெறிப்பு மற்றும் ஈரப்பதம்"],
        prevention: ["சான்றளிக்கப்பட்ட விதைகள்", "சொட்டு நீர் பாசனம் மட்டும் பயன்படுத்தவும்", "பயிர் சுழற்சி"],
        organicTreatment: ["காப்பர் பூஞ்சைக் கொல்லி", "பேசில்லஸ் உயிரி மருந்து"],
        chemicalTreatment: ["காப்பர் ஹைட்ராக்சைடு + மேன்கோசெப் கலவை"],
        bestPractices: ["ஈரமான செடிகளை தொடவோ வேலை செய்யவோ கூடாது"],
        severityNote: "அதிக தீவிரம்."
      },
      hi: {
        name: "शिमला मिर्च का जीवाणु धब्बा रोग",
        description: "जैंथोमोनास बैक्टीरिया के कारण पत्तियों पर पानी जैसे धब्बे बनते हैं और पत्ते झड़ जाते हैं।",
        symptoms: ["पानी जैसे भूरे धब्बे", "पत्तियों का गिरना", "मिर्च पर फफोले जैसे निशान"],
        causes: ["जीवाणु संक्रमण", "ऊपर से पानी का छिड़काव"],
        prevention: ["रोगमुक्त बीज", "ड्रिप सिंचाई अपनाएं", "फसल चक्र"],
        organicTreatment: ["कॉपर स्प्रे", "बैसिलस जीवाणुनाशक"],
        chemicalTreatment: ["कॉपर हाइड्रॉक्साइड + मैनकोजेब मिश्रण"],
        bestPractices: ["गीले खेत में काम न करें"],
        severityNote: "गंभीर। पत्ते गिरने से फल धूप से झुलस जाते हैं।"
      }
    }
  },
  {
    cropName: "Bell Pepper",
    classLabel: "Pepper,_bell___healthy",
    name: "Pepper Bell Healthy",
    isHealthy: true,
    severityNote: "Optimal plant health. Foliage is vigorous and productive.",
    description: "Bell pepper foliage is deep green, crisp, erect, with healthy branching nodes and free from bacterial spot, phytophthora blight, or tobacco mosaic virus.",
    symptoms: ["Deep green glossy leaves", "Firm stems and healthy flowers", "No discoloration or wilting"],
    causes: ["Well-drained soil, balanced calcium and potassium fertilization"],
    prevention: ["Maintain consistent drip irrigation and mulch to maintain root zone moisture"],
    organicTreatment: ["Compost tea and foliar calcium spray to prevent blossom end rot"],
    chemicalTreatment: ["None required"],
    bestPractices: ["Stake heavy bearing plants to avoid lodging"],
    translations: {
      en: {
        name: "Bell Pepper (Healthy)",
        description: "Healthy pepper plant showing robust vegetative vigor and clean foliage.",
        symptoms: ["Dark green foliage", "Clean unspotted leaves", "Healthy bloom"],
        causes: ["Balanced nutrition and drip moisture"],
        prevention: ["Continue drip watering and mulching"],
        organicTreatment: ["Calcium foliar spray"],
        chemicalTreatment: ["None required"],
        bestPractices: ["Support plants with stakes"],
        severityNote: "Healthy condition."
      },
      ta: {
        name: "குடைமிளகாய் (ஆரோக்கியமானது)",
        description: "குடைமிளகாய் இலைகள் எந்தவித நோய்களுமின்றி கரும்பச்சை நிறத்துடன் செழிப்பாக உள்ளன.",
        symptoms: ["அடர் பச்சை இலைகள்", "புள்ளிகள் இல்லை", "நல்ல பூ மலர்ச்சி"],
        causes: ["சரியான ஊட்டச்சத்து மற்றும் சொட்டு நீர்"],
        prevention: ["நீர் பாசனத்தை சீராக தொடரவும்"],
        organicTreatment: ["கால்சியம் சத்து தெளிப்பு"],
        chemicalTreatment: ["தேவை இல்லை"],
        bestPractices: ["தாங்கு குச்சிகள் நடவும்"],
        severityNote: "ஆரோக்கியமானது."
      },
      hi: {
        name: "शिमला मिर्च (स्वस्थ)",
        description: "पत्तियां हरी, चमकदार और पूरी तरह से निरोगी हैं।",
        symptoms: ["गहरा हरा रंग", "कोई दाग या पीलापन नहीं", "स्वस्थ फूल"],
        causes: ["संतुलित खाद और ड्रिप सिंचाई"],
        prevention: ["नियमित सिंचाई जारी रखें"],
        organicTreatment: ["कैल्शियम टॉनिक"],
        chemicalTreatment: ["कोई नहीं"],
        bestPractices: ["पौधों को सहारा दें"],
        severityNote: "स्वस्थ फसल।"
      }
    }
  },

  // --- 9. Potato (3 classes) ---
  {
    cropName: "Potato",
    classLabel: "Potato___Early_blight",
    name: "Potato Early Blight",
    isHealthy: false,
    severityNote: "Moderate to high severity. Can significantly reduce tuber sizing.",
    description: "Caused by Alternaria solani. Produces dark brown circular spots with characteristic concentric target-board rings on older foliage.",
    symptoms: [
      "Dark brown to black circular lesions with concentric rings (target-like pattern)",
      "Yellow chlorotic halos surrounding lesions on lower leaves",
      "Defoliation starting from the lower canopy progressing upward",
      "Sunken corky dry rot lesions on potato tubers"
    ],
    causes: [
      "Alternaria solani fungus surviving in soil debris",
      "Alternating dry and wet weather conditions with temperatures between 24°C and 29°C",
      "Nutrient-stressed or aging potato vines"
    ],
    prevention: [
      "Implement a 3-4 year crop rotation away from solanaceous crops",
      "Maintain optimal nitrogen and potassium fertilization to prevent premature senescence",
      "Use certified disease-free seed tubers"
    ],
    organicTreatment: [
      "Copper hydroxide or copper oxychloride foliar sprays",
      "Bio-fungicides with Bacillus subtilis or Trichoderma viride"
    ],
    chemicalTreatment: [
      "Azoxystrobin, Pyraclostrobin, or Chlorothalonil sprays",
      "Difenoconazole (Score) applied at early row closure"
    ],
    bestPractices: [
      "Time fungicide applications before the potato canopy closes across rows",
      "Avoid sprinkler irrigation late in the afternoon"
    ],
    translations: {
      en: {
        name: "Potato Early Blight",
        description: "Alternaria fungal pathogen causing concentric target-board ring spots on older leaves.",
        symptoms: ["Concentric ring target spots", "Yellowing of lower foliage", "Corky tuber lesions"],
        causes: ["Alternaria solani", "Stressed plants and alternating wet/dry weather"],
        prevention: ["3-year crop rotation", "Optimal vine nutrition", "Certified seed tubers"],
        organicTreatment: ["Copper fungicide", "Bacillus subtilis"],
        chemicalTreatment: ["Chlorothalonil", "Azoxystrobin", "Difenoconazole"],
        bestPractices: ["Spray before row closure", "Morning irrigation only"],
        severityNote: "Moderate to high. Targets aging foliage and reduces tuber yield."
      },
      ta: {
        name: "உருளைக்கிழங்கு முன் பருவ கருகல் (Early Blight)",
        description: "ஆல்டர்னேரியா பூஞ்சையால் ஏற்படும் இந்த நோய் இலைகளில் வளைய வடிவிலான கரும்பழுப்பு புள்ளிகளை உருவாக்குகிறது.",
        symptoms: ["இலைகளில் வளைய வடிவிலான புள்ளிகள்", "அடி இலைகள் மஞ்சள் நிறமாதல்", "இலைகள் காய்ந்து போதல்"],
        causes: ["பூஞ்சை தொற்று", "மாறி மாறி வரும் வறண்ட மற்றும் ஈரப்பத வானிலை"],
        prevention: ["பயிர் சுழற்சி முறை", "சான்றளிக்கப்பட்ட விதைக்கிழங்குகள்", "சமச்சீர் உரமிடுதல்"],
        organicTreatment: ["காப்பர் பூஞ்சைக் கொல்லி", "ட்ரைக்கோடெர்மா விரிடி"],
        chemicalTreatment: ["குளோரோதலோனில்", "அசாக்ஸிஸ்ட்ரோபின்"],
        bestPractices: ["வரிசைகள் மூடும் முன் மருந்து தெளிக்கவும்"],
        severityNote: "மிதமான முதல் அதிக தீவிரம்."
      },
      hi: {
        name: "आलू का अगेती झुलसा रोग (Early Blight)",
        description: "अल्टरनेरिया कवक के कारण पत्तियों पर गोल छल्लेदार (टारगेट जैसे) भूरे धब्बे पड़ते हैं।",
        symptoms: ["छल्लेदार भूरे धब्बे", "निचली पत्तियों का पीला पड़ना", "कंदों पर धब्बे"],
        causes: ["अल्टरनेरिया फंगस", "मौसम में नमी और गर्मी का बदलाव"],
        prevention: ["3 साल का फसल चक्र", "प्रमाणित बीज कंद", "संतुलित पोषण"],
        organicTreatment: ["कॉपर कवकनाशी", "बैसिलस सबटिलिस"],
        chemicalTreatment: ["क्लोरोथैलोनिल", "एजॉक्सीस्ट्रोबिन"],
        bestPractices: ["पंक्तियां मिलने से पहले छिड़काव करें"],
        severityNote: "मध्यम से उच्च नुकसान।"
      }
    }
  },
  {
    cropName: "Potato",
    classLabel: "Potato___Late_blight",
    name: "Potato Late Blight",
    isHealthy: false,
    severityNote: "Critical severity. Historically responsible for the Irish Potato Famine; destroys fields in days.",
    description: "Caused by the oomycete Phytophthora infestans. Produces large, water-soaked, dark necrotic lesions with white fungal down on leaf undersides, rapidly melting entire canopies and rotting tubers.",
    symptoms: [
      "Large, irregular water-soaked pale-green to black lesions on leaves and petioles",
      "Delicate white fungal down (sporangia) on the undersides of lesions during humid mornings",
      "Foul rotting odor and complete canopy collapse within 7 to 10 days",
      "Granular brown dry rot spreading into tuber flesh"
    ],
    causes: [
      "Phytophthora infestans oomycete pathogen",
      "Cool (10°C - 20°C) and excessively wet, foggy, or rainy weather (>90% humidity)"
    ],
    prevention: [
      "Plant certified blight-resistant varieties (e.g. Defender, Sarpo Mira)",
      "Destroy cull piles of leftover potatoes before the planting season",
      "Hill up soil well around rows to prevent spores washing into tubers",
      "Kill vines chemically or mechanically 2 weeks prior to harvest"
    ],
    organicTreatment: [
      "Regular preventative sprays of copper hydroxide / Bordeaux mixture",
      "Bio-fungicides containing Bacillus amyloliquefaciens"
    ],
    chemicalTreatment: [
      "Systemic oomycides: Metalaxyl / Mefenoxam + Mancozeb (Ridomil Gold)",
      "Cymoxanil, Dimethomorph, or Fluopicolide during active disease outbreaks"
    ],
    bestPractices: [
      "Follow local late blight forecast decision support tools (e.g. BlightCast)",
      "Maintain a 5-7 day protective spray interval during rainy weather"
    ],
    translations: {
      en: {
        name: "Potato Late Blight",
        description: "Devastating oomycete pathogen causing rapid canopy collapse and tuber rot.",
        symptoms: ["Water-soaked dark lesions", "White sporulation on leaf undersides", "Canopy collapse", "Foul rot"],
        causes: ["Phytophthora infestans", "Cool wet foggy conditions (>90% humidity)"],
        prevention: ["Resistant varieties", "Eliminate cull piles", "Deep hilling", "Kill vines pre-harvest"],
        organicTreatment: ["Copper hydroxide", "Bordeaux mixture"],
        chemicalTreatment: ["Metalaxyl + Mancozeb (Ridomil)", "Dimethomorph", "Fluopicolide"],
        bestPractices: ["Track blight forecasts", "5-7 day spray cycle in wet spells"],
        severityNote: "Critical. Can wipe out entire potato fields within a week."
      },
      ta: {
        name: "உருளைக்கிழங்கு பின் பருவ கருகல் (Late Blight)",
        description: "பைட்டோப்தோரா பூஞ்சையால் ஏற்படும் இந்த கொடிய நோய் முழு பயிரையும் சில நாட்களில் அழுகச் செய்து அழித்துவிடும்.",
        symptoms: ["இலைகளில் கரும்பச்சை நீர் கசிந்த திட்டுகள்", "இலையின் அடியில் வெள்ளை பூஞ்சை படலம்", "முழு செடியும் அழுகி நாற்றமெடுத்தல்"],
        causes: ["பைட்டோப்தோரா இன்பெஸ்டான்ஸ்", "குளிர்ந்த மழை மற்றும் மூடுபனி"],
        prevention: ["நோய் எதிர்ப்பு ரகங்கள்", "பழைய அழுகிய உருளை கழிவுகளை அழிக்கவும்", "பாத்திகளில் மண் அணைக்கவும்"],
        organicTreatment: ["போர்டோ கலவை", "காப்பர் ஹைட்ராக்சைடு"],
        chemicalTreatment: ["மெட்டலாக்ஸிலின் + மேன்கோசெப் (ரிடோமில்)", "டைமெத்தோமார்ப்"],
        bestPractices: ["மழைக்காலத்தில் 5-7 நாட்களுக்கு ஒருமுறை மருந்து தெளிக்கவும்"],
        severityNote: "மிகவும் ஆபத்தானது. சில நாட்களில் முழு பயிரையும் அழிக்கும்."
      },
      hi: {
        name: "आलू का पछेती झुलसा रोग (Late Blight)",
        description: "फाइटोफ्थोरा कवक के कारण कुछ ही दिनों में पूरा खेत सड़कर नष्ट हो जाता है।",
        symptoms: ["पत्तियों पर पानी जैसे काले धब्बे", "पत्ती के नीचे सफेद फफूंद", "सड़ांध की बदबू", "कंदों का सड़ना"],
        causes: ["फाइटोफ्थोरा कवक", "ठंडा, नम और कोहरे वाला मौसम"],
        prevention: ["प्रतिरोधी किस्में", "आलू के पुराने कचरे को नष्ट करें", "मेड़ों पर अच्छी मिट्टी चढ़ाएं"],
        organicTreatment: ["बोर्डो मिश्रण", "कॉपर कवकनाशी"],
        chemicalTreatment: ["मेटालेक्सिल + मैनकोजेब (रिडोमिल)", "डाइमेथोमॉर्फ"],
        bestPractices: ["मौसम की चेतावनी पर 5-7 दिन में छिड़काव करें"],
        severityNote: "अत्यधिक विनाशकारी। भारी अकाल का कारण रहा है।"
      }
    }
  },
  {
    cropName: "Potato",
    classLabel: "Potato___healthy",
    name: "Potato Healthy",
    isHealthy: true,
    severityNote: "Optimal plant health. Foliage is dense and productive.",
    description: "Potato foliage exhibits lush dark-green compound leaves, sturdy stems, robust flower clusters, and no signs of blight or virus.",
    symptoms: ["Vigorous green compound leaves", "No spots, lesions, or curling", "Healthy root stolon growth"],
    causes: ["Well-balanced N-P-K, proper soil hilling, and good drainage"],
    prevention: ["Maintain adequate soil moisture and scout weekly for Colorado potato beetles"],
    organicTreatment: ["Foliar seaweed extract and compost tea"],
    chemicalTreatment: ["None required"],
    bestPractices: ["Keep tubers well covered with soil to avoid greening"],
    translations: {
      en: {
        name: "Potato (Healthy)",
        description: "Optimal foliage showing excellent vigor and no diseases.",
        symptoms: ["Dark green compound foliage", "Sturdy stems", "Clean leaf surfaces"],
        causes: ["Optimal agronomy and balanced nutrition"],
        prevention: ["Continue routine hilling and moisture control"],
        organicTreatment: ["Seaweed extract"],
        chemicalTreatment: ["None required"],
        bestPractices: ["Prevent tuber sun exposure"],
        severityNote: "Healthy condition."
      },
      ta: {
        name: "உருளைக்கிழங்கு (ஆரோக்கியமானது)",
        description: "உருளைக்கிழங்கு செடிகள் எவ்வித கருகல் நோயுமின்றி பச்சைப்பசேலென ஆரோக்கியமாக உள்ளன.",
        symptoms: ["செழுமையான பச்சை இலைகள்", "புள்ளிகள் இல்லை", "நல்ல தண்டு வளர்ச்சி"],
        causes: ["சரியான மண் அணைப்பு மற்றும் உரமிடுதல்"],
        prevention: ["மண் ஈரப்பதத்தை சீராக பராமரிக்கவும்"],
        organicTreatment: ["கடற்பாசி உரம்"],
        chemicalTreatment: ["தேவை இல்லை"],
        bestPractices: ["கிழங்குகள் வெளியில் தெரியாமல் மண் அணைக்கவும்"],
        severityNote: "ஆரோக்கியமானது."
      },
      hi: {
        name: "आलू (स्वस्थ)",
        description: "पत्तियां घनी, हरी और पूरी तरह से रोगमुक्त हैं।",
        symptoms: ["गहरा हरा रंग", "कोई दाग या झुलसा नहीं", "मजबूत पौधे"],
        causes: ["संतुलित खाद और अच्छी सिंचाई"],
        prevention: ["नियमित मिट्टी चढ़ाना जारी रखें"],
        organicTreatment: ["जैविक टॉनिक"],
        chemicalTreatment: ["कोई नहीं"],
        bestPractices: ["कंदों को धूप से बचाएं"],
        severityNote: "स्वस्थ स्थिति।"
      }
    }
  },

  // --- 10. Raspberry (1 class) ---
  {
    cropName: "Raspberry",
    classLabel: "Raspberry___healthy",
    name: "Raspberry Healthy",
    isHealthy: true,
    severityNote: "Optimal plant health. Canes and leaves are vigorous.",
    description: "Raspberry canes and leaves display deep green serrated foliage, vigorous primocane growth, and complete absence of anthracnose, spur blight, or root rot.",
    symptoms: ["Vibrant green leaves with whitish undersides", "Clean smooth canes", "No spur lesions"],
    causes: ["Good air circulation, trellising, and well-drained organic soil"],
    prevention: ["Annual cane thinning after fruiting and drip irrigation"],
    organicTreatment: ["Organic compost mulch and mycorrhizal fungi"],
    chemicalTreatment: ["None required"],
    bestPractices: ["Prune spent floricanes immediately post-harvest"],
    translations: {
      en: {
        name: "Raspberry (Healthy)",
        description: "Optimal foliage showing excellent vigor and no diseases.",
        symptoms: ["Lush green leaves", "Clean canes", "Active shoot growth"],
        causes: ["Good trellis management and drainage"],
        prevention: ["Annual cane pruning"],
        organicTreatment: ["Compost mulch"],
        chemicalTreatment: ["None required"],
        bestPractices: ["Remove spent floricanes"],
        severityNote: "Healthy condition."
      },
      ta: {
        name: "ராஸ்பெர்ரி (ஆரோக்கியமானது)",
        description: "ராஸ்பெர்ரி செடிகள் நல்ல ஆரோக்கியத்துடன், பூச்சி அல்லது நோய் தாக்குதலின்றி உள்ளன.",
        symptoms: ["பச்சை நிற இலைகள்", "திடமான தண்டுகள்"],
        causes: ["சரியான கவாத்து மற்றும் வடிகால்"],
        prevention: ["பழம் பறித்த பின் பழைய தண்டுகளை அகற்றவும்"],
        organicTreatment: ["கரிம உரம்"],
        chemicalTreatment: ["தேவை இல்லை"],
        bestPractices: ["கண்காணிப்பு"],
        severityNote: "ஆரோக்கியமானது."
      },
      hi: {
        name: "रसभरी (स्वस्थ)",
        description: "पत्तियां पूरी तरह से हरी, चमकदार और रोगमुक्त हैं।",
        symptoms: ["स्वस्थ हरी पत्तियां", "मजबूत तना"],
        causes: ["उचित देखभाल और जल निकासी"],
        prevention: ["पुरानी टहनियों की कटाई जारी रखें"],
        organicTreatment: ["जैविक खाद"],
        chemicalTreatment: ["कोई नहीं"],
        bestPractices: ["नियमित निरीक्षण"],
        severityNote: "स्वस्थ फसल।"
      }
    }
  },

  // --- 11. Soybean (1 class) ---
  {
    cropName: "Soybean",
    classLabel: "Soybean___healthy",
    name: "Soybean Healthy",
    isHealthy: true,
    severityNote: "Optimal plant health. Foliage is dense and nitrogen-fixing.",
    description: "Soybean foliage exhibits healthy trifoliate dark-green leaves, robust nodulation on root systems, and no evidence of frogeye leaf spot, rust, or sudden death syndrome.",
    symptoms: ["Uniform trifoliate green leaves", "Sturdy branching and pod set", "No chlorosis or pustules"],
    causes: ["Balanced soil fertility, active rhizobial inoculation, and weed control"],
    prevention: ["Crop rotation with corn and regular scouting for defoliating insects"],
    organicTreatment: ["Biological rhizobium inoculant and foliar micronutrients"],
    chemicalTreatment: ["None required"],
    bestPractices: ["Scout canopy during R1 to R5 reproductive stages"],
    translations: {
      en: {
        name: "Soybean (Healthy)",
        description: "Optimal trifoliate foliage showing excellent photosynthetic health.",
        symptoms: ["Vibrant trifoliate foliage", "Clean unspotted leaves", "Strong pod set"],
        causes: ["Adequate nodulation and balanced agronomy"],
        prevention: ["Continue rotation and pest monitoring"],
        organicTreatment: ["Micronutrient foliar spray"],
        chemicalTreatment: ["None required"],
        bestPractices: ["Scout during R3-R5 pod fill"],
        severityNote: "Healthy condition."
      },
      ta: {
        name: "சோயாபீன்ஸ் (ஆரோக்கியமானது)",
        description: "சோயாபீன்ஸ் இலைகள் நல்ல ஆரோக்கியத்துடன், நோய்களின்றி செழிப்பாக உள்ளன.",
        symptoms: ["அடர் பச்சை மூவிலைகள்", "புள்ளிகள் ஏதுமில்லை", "நல்ல காய் பிடித்தல்"],
        causes: ["ரைசோபியம் பாக்டீரியா மற்றும் சமச்சீர் உரம்"],
        prevention: ["பயிர் சுழற்சி மற்றும் பூச்சி கண்காணிப்பு"],
        organicTreatment: ["நுண்ணூட்டச்சத்து தெளிப்பு"],
        chemicalTreatment: ["தேவை இல்லை"],
        bestPractices: ["காய் பிடிக்கும் தருணத்தில் கண்காணிக்கவும்"],
        severityNote: "ஆரோக்கியமானது."
      },
      hi: {
        name: "सोयाबीन (स्वस्थ)",
        description: "पत्तियां पूरी तरह से हरी, चमकदार और रोगमुक्त हैं।",
        symptoms: ["गहरा हरा रंग", "कोई धब्बे या जंग नहीं", "अच्छी फलियां"],
        causes: ["संतुलित खाद और राइजोबियम जीवाणु"],
        prevention: ["फसल चक्र और कीट नियंत्रण जारी रखें"],
        organicTreatment: ["सूक्ष्म पोषक तत्व"],
        chemicalTreatment: ["कोई नहीं"],
        bestPractices: ["फलियां बनते समय नियमित जांच करें"],
        severityNote: "स्वस्थ फसल।"
      }
    }
  },

  // --- 12. Squash (1 class) ---
  {
    cropName: "Squash",
    classLabel: "Squash___Powdery_mildew",
    name: "Squash Powdery Mildew",
    isHealthy: false,
    severityNote: "Moderate to high severity. Can cause premature senescence and sunscalded squash.",
    description: "Caused by Podosphaera xanthii (syn. Sphaerotheca fuliginea). White powdery talcum-like fungal growth rapidly covers both upper and lower leaf surfaces, causing leaves to yellow, dry, and die prematurely.",
    symptoms: [
      "Circular white powdery talcum patches expanding across leaf surfaces and petioles",
      "Yellowing and browning of older leaves progressing to premature leaf death",
      "Fruit ripening prematurely with reduced sugar content and sunscald damage"
    ],
    causes: [
      "Podosphaera xanthii fungal spores blown in on air currents",
      "Dense canopy shading combined with warm temperatures (20°C - 28°C) and high humidity"
    ],
    prevention: [
      "Plant powdery mildew-resistant squash hybrids (PM-tolerant varieties)",
      "Ensure wide plant spacing to maximize air circulation and sunlight penetration",
      "Avoid excess nitrogen fertilizer that promotes dense, succulent vegetative canopies"
    ],
    organicTreatment: [
      "Potassium bicarbonate (MilStop / Armicarb) foliar spray",
      "Neem oil or narrow-range horticultural oil sprays",
      "Bio-fungicides with Bacillus amyloliquefaciens"
    ],
    chemicalTreatment: [
      "Triflumizole (Procure) or Quinoxyfen (Quintec)",
      "Chlorothalonil applied preventatively before symptoms spread",
      "Cyflufenamid or Metrafenone for systemic control"
    ],
    bestPractices: [
      "Spray both upper and lower leaf surfaces thoroughly",
      "Apply fungicides at the very first sign of small white spots on lower leaves"
    ],
    translations: {
      en: {
        name: "Squash Powdery Mildew",
        description: "Podosphaera fungus causing white talcum patches on squash leaves.",
        symptoms: ["White talcum patches", "Yellowing and drying foliage", "Sunscald on exposed fruit"],
        causes: ["Podosphaera xanthii", "Warm weather and dense shaded canopies"],
        prevention: ["PM-resistant cultivars", "Wide plant spacing", "Avoid excess nitrogen"],
        organicTreatment: ["Potassium bicarbonate", "Neem oil", "Bacillus bio-spray"],
        chemicalTreatment: ["Chlorothalonil", "Triflumizole", "Cyflufenamid"],
        bestPractices: ["Ensure lower leaf coverage", "Spray at first white spot appearance"],
        severityNote: "Moderate to high. Shuts down photosynthesis rapidly."
      },
      ta: {
        name: "பூசணி சாம்பல் நோய் (Powdery Mildew)",
        description: "பொடோஸ்பீரா பூஞ்சையால் ஏற்படும் இந்த நோய் இலைகளில் வெள்ளை மாவு போன்ற படலத்தை உருவாக்குகிறது.",
        symptoms: ["இலைகளில் வெள்ளை மாவு போன்ற படலம்", "இலைகள் காய்ந்து போதல்", "காய்கள் முதிர்வதற்கு முன் சுருங்குதல்"],
        causes: ["பூஞ்சை தொற்று", "வெப்பம் மற்றும் காற்றில் ஈரப்பதம்"],
        prevention: ["நோய் எதிர்ப்பு ரகங்கள்", "செடிகளுக்கு இடையே போதிய இடைவெளி"],
        organicTreatment: ["பொட்டாசியம் பைகார்பனேட்", "வேப்பெண்ணெய் கரைசல்", "கந்தகம்"],
        chemicalTreatment: ["குளோரோதலோனில்", "டிரைடிமர்ப்"],
        bestPractices: ["இலைகளின் அடியிலும் படுமாறு மருந்து தெளிக்கவும்"],
        severityNote: "மிதமான முதல் அதிக தீவிரம்."
      },
      hi: {
        name: "कद्दू/स्क्वैश का चूर्णिल आसिता (Powdery Mildew)",
        description: "पत्तियों पर सफेद पाउडर जैसी परत जम जाती है जिससे पत्ते सूखकर गिर जाते हैं।",
        symptoms: ["सफेद चूर्ण के धब्बे", "पत्तियों का सूखना", "फलों में मिठास की कमी व धूप से जलना"],
        causes: ["फफूंद संक्रमण", "घनी छाया और नमी"],
        prevention: ["प्रतिरोधी किस्में लगाएं", "उचित दूरी पर पौधे लगाएं"],
        organicTreatment: ["पोटेशियम बाइकार्बोनेट", "नीम तेल"],
        chemicalTreatment: ["क्लोरोथैलोनिल", "माइक्लोबुटानिल"],
        bestPractices: ["पत्ती के दोनों तरफ अच्छी तरह छिड़काव करें"],
        severityNote: "मध्यम से उच्च नुकसान।"
      }
    }
  },

  // --- 13. Strawberry (2 classes) ---
  {
    cropName: "Strawberry",
    classLabel: "Strawberry___Leaf_scorch",
    name: "Strawberry Leaf Scorch",
    isHealthy: false,
    severityNote: "Moderate severity. Destroys foliage and lowers next-season yield.",
    description: "Caused by Diplocarpon earlianum. Numerous small, irregular purplish-red spots appear on leaves, enlarging into brown necrotic areas with purple margins, giving the foliage a scorched, burned appearance.",
    symptoms: [
      "Small irregular dark purple or reddish spots on upper leaf surfaces",
      "Spots coalesce into large brown patches causing margins to curl and scorch",
      "Calyx (green cap) infection causing browning and unmarketable fruit"
    ],
    causes: [
      "Diplocarpon earlianum fungus overwintering on infected foliage",
      "Frequent overhead sprinkler irrigation and prolonged leaf wetness"
    ],
    prevention: [
      "Plant scorch-resistant strawberry cultivars",
      "Use drip irrigation to keep crowns and foliage dry",
      "Mow and destroy diseased leaves post-harvest during bed renovation"
    ],
    organicTreatment: [
      "Copper hydroxide or liquid copper octanoate foliar spray",
      "Bacillus amyloliquefaciens bio-fungicide"
    ],
    chemicalTreatment: [
      "Captan or Thiram preventative sprays",
      "Thiophanate-methyl or Azoxystrobin applications during flower bud emergence"
    ],
    bestPractices: [
      "Renovate strawberry beds promptly after harvest to remove infected leaves",
      "Space plants adequately to encourage fast drying"
    ],
    translations: {
      en: {
        name: "Strawberry Leaf Scorch",
        description: "Diplocarpon fungus causing purplish spots and burned scorched foliar margins.",
        symptoms: ["Purplish-red irregular spots", "Brown scorched leaf margins", "Brown dry fruit calyx"],
        causes: ["Diplocarpon earlianum", "Prolonged leaf wetness and overhead watering"],
        prevention: ["Scorch-resistant varieties", "Drip irrigation only", "Post-harvest bed renovation"],
        organicTreatment: ["Copper soap", "Bacillus bio-fungicide"],
        chemicalTreatment: ["Captan", "Thiophanate-methyl", "Azoxystrobin"],
        bestPractices: ["Renovate beds post-harvest", "Ensure rapid canopy drying"],
        severityNote: "Moderate. Burns foliage and reduces crown vigor."
      },
      ta: {
        name: "ஸ்ட்ராபெர்ரி இலை தீக்கல் நோய் (Leaf Scorch)",
        description: "டிப்ளோகார்பான் பூஞ்சையால் ஏற்படும் இந்த நோய் இலைகளில் ஊதா-சிவப்பு புள்ளிகளையும் தீய்ந்தது போன்ற விளிம்புகளையும் உண்டாக்குகிறது.",
        symptoms: ["ஊதா-சிவப்பு நிற புள்ளிகள்", "இலை விளிம்புகள் தீய்ந்து கருகிப் போதல்", "பழக் காம்புகள் காய்ந்து போதல்"],
        causes: ["பூஞ்சை தொற்று", "இலைகளில் நீண்ட நேரம் தங்கும் தண்ணீர்"],
        prevention: ["எதிர்ப்புத்திறன் கொண்ட ரகங்கள்", "சொட்டு நீர் பாசனம்", "பழைய இலைகளை கவாத்து செய்தல்"],
        organicTreatment: ["காப்பர் பூஞ்சைக் கொல்லி", "பேசில்லஸ் உயிரி மருந்து"],
        chemicalTreatment: ["கேப்டான்", "தயோபனேட்-மெத்தில்"],
        bestPractices: ["அறுவடைக்கு பின் படுக்கைகளை தூய்மைப்படுத்தவும்"],
        severityNote: "மிதமான தீவிரம்."
      },
      hi: {
        name: "स्ट्रॉबेरी का पत्ता झुलसा (Leaf Scorch)",
        description: "पत्तियों पर बैंगनी-लाल धब्बे बनते हैं और पत्ते जले हुए से दिखने लगते हैं।",
        symptoms: ["बैंगनी-लाल अनियमित धब्बे", "पत्तियों के किनारों का झुलसना", "फलों की टोपी (केलिक्स) का सूखना"],
        causes: ["फफूंद संक्रमण", "पत्तियों पर अधिक देर तक पानी ठहरना"],
        prevention: ["प्रतिरोधी किस्में", "ड्रिप सिंचाई", "कटाई के बाद पुराने पत्तों की छंटाई"],
        organicTreatment: ["कॉपर कवकनाशी", "बैसिलस स्प्रे"],
        chemicalTreatment: ["कैप्टन", "थायोफैनेट-मिथाइल"],
        bestPractices: ["फसल के बाद क्यारियों की सफाई करें"],
        severityNote: "मध्यम नुकसान।"
      }
    }
  },
  {
    cropName: "Strawberry",
    classLabel: "Strawberry___healthy",
    name: "Strawberry Healthy",
    isHealthy: true,
    severityNote: "Optimal plant health. Foliage is lush and crowns are vigorous.",
    description: "Strawberry foliage features bright, deep emerald trifoliate leaves, strong runners, intact calyxes, and vibrant flowers free from scorch, angular leaf spot, or powdery mildew.",
    symptoms: ["Vivid emerald green leaves", "No purple spots or necrotic margins", "Strong runners and blooms"],
    causes: ["Well-drained raised beds, organic mulch, and drip irrigation"],
    prevention: ["Pine straw or plastic mulch to keep fruit and leaves off bare soil"],
    organicTreatment: ["Fish hydrolysate and kelp meal foliar tonic"],
    chemicalTreatment: ["None required"],
    bestPractices: ["Maintain runner management and crown spacing"],
    translations: {
      en: {
        name: "Strawberry (Healthy)",
        description: "Healthy strawberry plants with optimal vegetative vigor and disease resistance.",
        symptoms: ["Lush green leaves", "Clean unblemished crowns", "Vibrant blossom set"],
        causes: ["Raised beds, plastic mulch, and balanced nutrition"],
        prevention: ["Continue drip irrigation and runner pruning"],
        organicTreatment: ["Seaweed foliar spray"],
        chemicalTreatment: ["None required"],
        bestPractices: ["Keep mulch clean"],
        severityNote: "Healthy condition."
      },
      ta: {
        name: "ஸ்ட்ராபெர்ரி (ஆரோக்கியமானது)",
        description: "ஸ்ட்ராபெர்ரி இலைகள் எந்தவித நோய்களுமின்றி கரும்பச்சை நிறத்துடன் செழிப்பாக உள்ளன.",
        symptoms: ["பளபளப்பான பச்சை இலைகள்", "புள்ளிகள் இல்லை", "நல்ல பூ மற்றும் காய் வளர்ச்சி"],
        causes: ["மேட்டுப்பாத்தி மற்றும் சொட்டு நீர் பாசனம்"],
        prevention: ["தழைக்கூளம் மற்றும் நீர் நிர்வாகத்தை தொடரவும்"],
        organicTreatment: ["கடற்பாசி உரம்"],
        chemicalTreatment: ["தேவை இல்லை"],
        bestPractices: ["செடிகளை சுத்தமாக வைத்திருக்கவும்"],
        severityNote: "ஆரோக்கியமானது."
      },
      hi: {
        name: "स्ट्रॉबेरी (स्वस्थ)",
        description: "पत्तियां पूरी तरह से हरी, चमकदार और रोगमुक्त हैं।",
        symptoms: ["गहरा हरा रंग", "कोई दाग या झुलसा नहीं", "मजबूत पौधे"],
        causes: ["उठावदार क्यारियां और ड्रिप सिंचाई"],
        prevention: ["नियमित मल्चिंग और पोषण जारी रखें"],
        organicTreatment: ["जैविक टॉनिक"],
        chemicalTreatment: ["कोई नहीं"],
        bestPractices: ["नियमित देखरेख"],
        severityNote: "स्वस्थ फसल।"
      }
    }
  },

  // --- 14. Tomato (10 classes) ---
  {
    cropName: "Tomato",
    classLabel: "Tomato___Bacterial_spot",
    name: "Tomato Bacterial Spot",
    isHealthy: false,
    severityNote: "High severity. Spreads rapidly in rain storms, defoliating plants and scarring fruit.",
    description: "Caused by Xanthomonas species (X. vesicatoria, X. perforans). Produces small, greasy water-soaked spots on leaves that turn dark brown with yellow halos, causing heavy defoliation and blister-like fruit scabs.",
    symptoms: [
      "Small, dark, greasy, water-soaked spots (1-3 mm) on foliage with yellow margins",
      "Leaves turn yellow, wither, and drop prematurely",
      "Raised black scabby spots with white halos on green fruit"
    ],
    causes: [
      "Xanthomonas bacterial pathogen",
      "Contaminated seed, infected transplants, and wind-driven rain",
      "Warm temperatures (24°C - 30°C) with frequent rain or overhead sprinkler irrigation"
    ],
    prevention: [
      "Use certified disease-free, hot-water-treated tomato seed",
      "Implement a 3-year crop rotation away from peppers and tomatoes",
      "Use drip irrigation to prevent water splashing onto foliage"
    ],
    organicTreatment: [
      "Copper hydroxide mixed with Bacillus amyloliquefaciens bio-bactericide",
      "Copper octanoate (soap) sprays applied early in the morning"
    ],
    chemicalTreatment: [
      "Tank mix of Copper hydroxide and Mancozeb (synergistic action)",
      "Actigard (acibenzolar-S-methyl) systemic acquired resistance inducer"
    ],
    bestPractices: [
      "Never prune, stake, or harvest plants while foliage is damp",
      "Sanitize staking stakes and wire supports before reuse"
    ],
    translations: {
      en: {
        name: "Tomato Bacterial Spot",
        description: "Xanthomonas bacteria causing greasy water-soaked leaf spots and scabby fruit.",
        symptoms: ["Greasy water-soaked spots", "Yellowing and defoliation", "Scabby raised fruit lesions"],
        causes: ["Xanthomonas bacteria", "Warm rainy weather and splashing water"],
        prevention: ["Certified seed", "3-year crop rotation", "Drip irrigation only"],
        organicTreatment: ["Copper soap", "Bacillus bio-spray"],
        chemicalTreatment: ["Copper hydroxide + Mancozeb tank mix", "Actigard"],
        bestPractices: ["Avoid working in wet fields", "Disinfect stakes between seasons"],
        severityNote: "High. Rapid leaf loss leads to fruit sunscald."
      },
      ta: {
        name: "தக்காளி பாக்டீரியா புள்ளி நோய் (Bacterial Spot)",
        description: "சாந்தோமோனாஸ் பாக்டீரியாவால் ஏற்படும் இந்த நோய் இலைகளில் எண்ணெய் பசை போன்ற கரும் புள்ளிகளையும் காய்களில் செதில் தழும்புகளையும் உண்டாக்குகிறது.",
        symptoms: ["எண்ணெய் பசை போன்ற சிறு புள்ளிகள்", "இலைகள் மஞ்சள் நிறமாகி உதிர்தல்", "காய்களில் சொறி போன்ற புள்ளிகள்"],
        causes: ["பாக்டீரியா தொற்று", "மழைத்துளி தெறிப்பு மற்றும் ஈரப்பதம்"],
        prevention: ["சான்றளிக்கப்பட்ட விதைகள்", "சொட்டு நீர் பாசனம்", "பயிர் சுழற்சி முறை"],
        organicTreatment: ["காப்பர் பூஞ்சைக் கொல்லி", "பேசில்லஸ் உயிரி மருந்து"],
        chemicalTreatment: ["காப்பர் ஹைட்ராக்சைடு + மேன்கோசெப் கலவை"],
        bestPractices: ["செடிகள் ஈரமாக இருக்கும் போது களையெடுக்கவோ வேலை செய்யவோ கூடாது"],
        severityNote: "அதிக தீவிரம்."
      },
      hi: {
        name: "टमाटर का जीवाणु धब्बा रोग (Bacterial Spot)",
        description: "जैंथोमोनास बैक्टीरिया के कारण पत्तियों पर चिपचिपे काले धब्बे और फलों पर पपड़ीदार निशान पड़ते हैं।",
        symptoms: ["पानी जैसे चिपचिपे काले धब्बे", "पत्तियों का गिरना", "टमाटर पर उभरे हुए खुरदुरे धब्बे"],
        causes: ["जीवाणु संक्रमण", "हवा के साथ बारिश और नमी"],
        prevention: ["रोगमुक्त प्रमाणित बीज", "ड्रिप सिंचाई", "फसल चक्र"],
        organicTreatment: ["कॉपर स्प्रे", "बैसिलस जीवाणुनाशक"],
        chemicalTreatment: ["कॉपर हाइड्रॉक्साइड + मैनकोजेब मिश्रण"],
        bestPractices: ["गीले पौधों पर काम न करें"],
        severityNote: "गंभीर। पत्ते झड़ने से फल धूप से खराब हो जाते हैं।"
      }
    }
  },
  {
    cropName: "Tomato",
    classLabel: "Tomato___Early_blight",
    name: "Tomato Early Blight",
    isHealthy: false,
    severityNote: "High severity. Common foliar disease that severely limits production.",
    description: "Caused by Alternaria solani. Produces dark brown circular spots with characteristic concentric rings ('bullseye' or target-like pattern) surrounded by chlorotic yellow halos, starting on the oldest lower leaves.",
    symptoms: [
      "Concentric circular bullseye ring spots on lower leaves",
      "Yellowing (chlorosis) surrounding lesions leading to leaf withering and drop",
      "Dark, sunken, leathery cankers on stems at soil line (collar rot)",
      "Dark leathery concentric spots at the fruit stem end"
    ],
    causes: [
      "Alternaria solani fungus surviving in infected plant debris and soil",
      "Warm temperatures (24°C - 30°C) with alternating wet periods and heavy dew"
    ],
    prevention: [
      "Mulch soil around plants to prevent soil splashing onto bottom leaves",
      "Prune off the lowest 12-18 inches of leaves once plants are established",
      "Rotate with non-solanaceous crops for at least 3 years"
    ],
    organicTreatment: [
      "Copper hydroxide or liquid copper octanoate foliar spray",
      "Bio-fungicides containing Bacillus subtilis or Trichoderma"
    ],
    chemicalTreatment: [
      "Chlorothalonil, Azoxystrobin, or Difenoconazole",
      "Mancozeb applied at 7-10 day intervals starting at early bloom"
    ],
    bestPractices: [
      "Stake and prune plants to improve aeration",
      "Always water at the base of the plant using drip tape"
    ],
    translations: {
      en: {
        name: "Tomato Early Blight",
        description: "Alternaria fungus causing concentric bullseye rings on lower tomato foliage.",
        symptoms: ["Bullseye concentric rings", "Lower foliage yellowing", "Stem collar rot", "Fruit rot"],
        causes: ["Alternaria solani", "Warm humid weather and soil splashing"],
        prevention: ["Mulch under plants", "Prune lower bottom leaves", "Crop rotation"],
        organicTreatment: ["Copper fungicide", "Bacillus subtilis bio-spray"],
        chemicalTreatment: ["Chlorothalonil", "Azoxystrobin", "Mancozeb"],
        bestPractices: ["Stake and prune for aeration", "Water at root level only"],
        severityNote: "High. Progressive defoliation from bottom up."
      },
      ta: {
        name: "தக்காளி முன் பருவ கருகல் (Early Blight)",
        description: "ஆல்டர்னேரியா பூஞ்சையால் ஏற்படும் இந்த நோய் இலைகளில் வளைய வளையமாக கரும்பழுப்பு புள்ளிகளை உருவாக்குகிறது.",
        symptoms: ["இலைகளில் வளைய வடிவ கருகல் புள்ளிகள்", "அடி இலைகள் மஞ்சள் நிறமாகி உதிர்தல்", "தண்டு அழுகல்"],
        causes: ["பூஞ்சை தொற்று", "மண் தெறித்தல் மற்றும் காற்றில் ஈரப்பதம்"],
        prevention: ["தழைக்கூளம் அமைத்தல்", "கீழ் இலைகளை கவாத்து செய்தல்", "பயிர் சுழற்சி"],
        organicTreatment: ["காப்பர் பூஞ்சைக் கொல்லி", "ட்ரைக்கோடெர்மா விரிடி"],
        chemicalTreatment: ["குளோரோதலோனில்", "மேன்கோசெப்"],
        bestPractices: ["செடிகளுக்கு முட்டுக்கொடுத்து காற்றோட்டமாக வளர்க்கவும்"],
        severityNote: "அதிக தீவிரம்."
      },
      hi: {
        name: "टमाटर का अगेती झुलसा (Early Blight)",
        description: "अल्टरनेरिया कवक के कारण निचली पत्तियों पर गोल छल्लेदार (बैल की आंख जैसे) धब्बे पड़ते हैं।",
        symptoms: ["छल्लेदार भूरे धब्बे", "निचले पत्तों का सूखना", "तने पर घाव", "फलों पर काले धब्बे"],
        causes: ["अल्टरनेरिया फंगस", "गर्म और नम मौसम, मिट्टी का छिटकना"],
        prevention: ["जमीन पर मल्चिंग करें", "निचली पत्तियों की छंटाई करें", "फसल चक्र"],
        organicTreatment: ["कॉपर कवकनाशी", "बैसिलस सबटिलिस"],
        chemicalTreatment: ["क्लोरोथैलोनिल", "मैनकोजेब"],
        bestPractices: ["पौधों को सहारा दें और जड़ों में पानी दें"],
        severityNote: "गंभीर। नीचे से ऊपर की ओर पत्ते नष्ट होते हैं।"
      }
    }
  },
  {
    cropName: "Tomato",
    classLabel: "Tomato___Late_blight",
    name: "Tomato Late Blight",
    isHealthy: false,
    severityNote: "Critical severity. Highly destructive; can destroy an entire field within 3 to 5 days.",
    description: "Caused by Phytophthora infestans. Manifests as large, irregular, greasy water-soaked greenish-black lesions on leaves and stems, with delicate white fungal down on leaf undersides, followed by greasy brown rotten fruit.",
    symptoms: [
      "Large, greasy, dark brown to purplish-black water-soaked lesions on leaves and stems",
      "Fine white fuzzy sporulation on leaf undersides in humid mornings",
      "Large, firm, greasy brown lesions on green and ripening tomato fruit",
      "Sudden, catastrophic canopy wilting resembling frost damage"
    ],
    causes: [
      "Phytophthora infestans oomycete pathogen",
      "Cool (15°C - 21°C), excessively wet, rainy, or persistently foggy conditions"
    ],
    prevention: [
      "Plant blight-resistant tomato varieties (e.g. Mountain Magic, Defiant, Iron Lady)",
      "Destroy volunteer tomatoes and eliminate nearby infected potato cull piles",
      "Ensure broad spacing between rows and stake plants for maximum airflow"
    ],
    organicTreatment: [
      "Preventative copper hydroxide / Bordeaux mixture sprays before rain events",
      "Bio-fungicides containing Bacillus amyloliquefaciens"
    ],
    chemicalTreatment: [
      "Metalaxyl / Mefenoxam + Mancozeb (Ridomil Gold)",
      "Cymoxanil (Curzate), Dimethomorph (Acrobat), or Mandipropamid (Revus)"
    ],
    bestPractices: [
      "Monitor regional late blight forecasting networks",
      "Remove and bag infected plants immediately upon discovery to prevent spore flight"
    ],
    translations: {
      en: {
        name: "Tomato Late Blight",
        description: "Phytophthora oomycete causing rapid black water-soaked lesions and field collapse.",
        symptoms: ["Large greasy dark lesions", "White fuzz on undersides", "Greasy brown fruit rot", "Rapid wilting"],
        causes: ["Phytophthora infestans", "Cool wet foggy conditions"],
        prevention: ["Plant resistant varieties", "Eradicate volunteers", "Wide row spacing"],
        organicTreatment: ["Bordeaux mixture", "Copper hydroxide"],
        chemicalTreatment: ["Metalaxyl + Mancozeb", "Cymoxanil", "Dimethomorph"],
        bestPractices: ["Follow blight alerts", "Bag and destroy infected vines immediately"],
        severityNote: "Critical. Can wipe out entire crops within days."
      },
      ta: {
        name: "தக்காளி பின் பருவ கருகல் (Late Blight)",
        description: "பைட்டோப்தோரா பூஞ்சையால் ஏற்படும் இந்த கொடிய நோய் முழு பயிரையும் சில நாட்களில் அழுகச் செய்து அழித்துவிடும்.",
        symptoms: ["பெரிய நீர் கசிந்த கரும்பச்சை திட்டுகள்", "இலையின் அடியில் வெள்ளை பூஞ்சை", "காய்களில் பழுப்பு நிற அழுகல்"],
        causes: ["பூஞ்சை தொற்று", "குளிர்ந்த மழை மற்றும் மூடுபனி"],
        prevention: ["நோய் எதிர்ப்பு ரகங்கள்", "நல்ல காற்றோட்டமான இடைவெளி"],
        organicTreatment: ["போர்டோ கலவை", "காப்பர் ஹைட்ராக்சைடு"],
        chemicalTreatment: ["மெட்டலாக்ஸிலின் + மேன்கோசெப்", "டைமெத்தோமார்ப்"],
        bestPractices: ["பாதிக்கப்பட்ட செடிகளை பிளாஸ்டிக் பையில் கட்டி உடனே அழிக்கவும்"],
        severityNote: "மிகவும் ஆபத்தானது. 3-5 நாட்களில் முழு வயலையும் அழிக்கும்."
      },
      hi: {
        name: "टमाटर का पछेती झुलसा (Late Blight)",
        description: "फाइटोफ्थोरा कवक के कारण कुछ ही दिनों में पूरी फसल सड़कर बर्बाद हो जाती है।",
        symptoms: ["पानी जैसे काले-भूरे धब्बे", "पत्ती के नीचे सफेद फफूंद", "टमाटरों का सड़ना", "पौधों का अचानक मुरझाना"],
        causes: ["फाइटोफ्थोरा कवक", "ठंडा, नम और कोहरे का मौसम"],
        prevention: ["प्रतिरोधी किस्में", "पौधों में पर्याप्त दूरी रखें"],
        organicTreatment: ["बोर्डो मिश्रण", "कॉपर कवकनाशी"],
        chemicalTreatment: ["मेटालेक्सिल + मैनकोजेब", "डाइमेथोमॉर्फ"],
        bestPractices: ["संक्रमित पौधों को तुरंत उखाड़कर नष्ट करें"],
        severityNote: "अत्यधिक विनाशकारी। कुछ दिनों में पूरी फसल खत्म।"
      }
    }
  },
  {
    cropName: "Tomato",
    classLabel: "Tomato___Leaf_Mold",
    name: "Tomato Leaf Mold",
    isHealthy: false,
    severityNote: "Moderate severity. Common in greenhouses and high tunnels with poor ventilation.",
    description: "Caused by Passalora fulva (syn. Cladosporium fulvum). Pale green to yellowish spots appear on the upper surface of leaves, accompanied by olive-green to velvety brown mold growth on the corresponding underside.",
    symptoms: [
      "Pale green to yellow diffuse chlorotic spots on upper leaf surfaces",
      "Olive-green to brown velvety fungal growth covering the underside of spots",
      "Infected foliage curls, withers, and drops prematurely from bottom to top"
    ],
    causes: [
      "Passalora fulva fungus",
      "High relative humidity (>85%) and warm temperatures (21°C - 24°C) inside greenhouses or dense canopies"
    ],
    prevention: [
      "Maximize greenhouse and high-tunnel ventilation and reduce humidity below 80%",
      "Increase row and plant spacing and prune lower suckers to enhance airflow",
      "Plant leaf mold-resistant tomato varieties (Cf gene resistance)"
    ],
    organicTreatment: [
      "Copper octanoate or copper hydroxide spray",
      "Potassium bicarbonate or bio-fungicides with Bacillus subtilis"
    ],
    chemicalTreatment: [
      "Chlorothalonil, Mancozeb, or Difenoconazole",
      "Cyazofamid or Azoxystrobin applications"
    ],
    bestPractices: [
      "Use horizontal airflow (HAF) fans inside tunnels",
      "Never wet foliage when watering plants"
    ],
    translations: {
      en: {
        name: "Tomato Leaf Mold",
        description: "Passalora fungus creating yellow upper spots with olive-brown velvety mold underneath.",
        symptoms: ["Yellow upper leaf blotches", "Olive-green velvety mold underneath", "Premature defoliation"],
        causes: ["Passalora fulva", "High humidity (>85%) in greenhouses"],
        prevention: ["Ventilate greenhouses", "Prune lower suckers", "Plant Cf-resistant varieties"],
        organicTreatment: ["Copper soap", "Potassium bicarbonate", "Bacillus bio-spray"],
        chemicalTreatment: ["Chlorothalonil", "Mancozeb", "Difenoconazole"],
        bestPractices: ["Run airflow fans in high tunnels", "Drip irrigate only"],
        severityNote: "Moderate. Thrives in humid enclosed structures."
      },
      ta: {
        name: "தக்காளி இலை பூஞ்சை நோய் (Leaf Mold)",
        description: "பசலோரா பூஞ்சையால் ஏற்படும் இந்த நோய் இலைகளின் மேற்பகுதியில் மஞ்சள் புள்ளிகளையும் அடியில் ஆலிவ்-பச்சை வெல்வெட் பூஞ்சையையும் உருவாக்குகிறது.",
        symptoms: ["மேல் இலையில் மஞ்சள் திட்டுகள்", "அடி இலையில் பச்சை-பழுப்பு வெல்வெட் பூஞ்சை", "இலை சுருங்கி உதிர்தல்"],
        causes: ["பசுமைக்குடிலில் அதிக ஈரப்பதம் (>85%)"],
        prevention: ["பசுமைக்குடிலில் காற்றோட்டத்தை அதிகரிக்கவும்", "எதிர்ப்புத்திறன் கொண்ட ரகங்களை நடவும்"],
        organicTreatment: ["காப்பர் சோப் கரைசல்", "பொட்டாசியம் பைகார்பனேட்"],
        chemicalTreatment: ["குளோரோதலோனில்", "மேன்கோசெப்"],
        bestPractices: ["காற்றோட்ட விசிறிகளை இயக்கவும்"],
        severityNote: "மிதமான தீவிரம்."
      },
      hi: {
        name: "टमाटर का लीफ मोल्ड रोग",
        description: "पत्तियों के ऊपर पीले धब्बे और नीचे जैतून-हरे रंग की मखमली फफूंद जम जाती है।",
        symptoms: ["पत्ती के ऊपर पीले धब्बे", "पत्ती के नीचे मखमली फफूंद", "पत्तियों का मुड़कर गिरना"],
        causes: ["पसालोरा कवक", "पॉलीहाउस में अत्यधिक नमी (>85%)"],
        prevention: ["पॉलीहाउस में वेंटिलेशन बढ़ाएं", "निचली पत्तियों की छंटाई करें"],
        organicTreatment: ["कॉपर कवकनाशी", "पोटेशियम बाइकार्बोनेट"],
        chemicalTreatment: ["क्लोरोथैलोनिल", "मैनकोजेब"],
        bestPractices: ["हवा का प्रवाह बनाए रखें"],
        severityNote: "मध्यम नुकसान। ग्रीनहाउस में अधिक फैलता है।"
      }
    }
  },
  {
    cropName: "Tomato",
    classLabel: "Tomato___Septoria_leaf_spot",
    name: "Septoria Leaf Spot",
    isHealthy: false,
    severityNote: "High severity. Causes severe progressive defoliation, reducing fruit yields.",
    description: "Caused by Septoria lycopersici. Produces numerous small, circular spots (1.5-3 mm) with gray or tan centers, dark brown borders, and tiny black fruiting bodies (pycnidia) inside.",
    symptoms: [
      "Numerous tiny circular spots with tan/gray centers and dark brown margins",
      "Tiny black specks (pycnidia) visible inside centers of spots with a hand lens",
      "Extensive leaf yellowing and severe defoliation starting at the base and moving upward"
    ],
    causes: [
      "Septoria lycopersici fungus overwintering on solanaceous weed hosts and tomato debris",
      "Wet, humid weather with temperatures between 20°C and 25°C"
    ],
    prevention: [
      "Prune bottom foliage and mulch around the base of plants to block soil splashing",
      "Clean up and destroy all tomato crop debris at the end of every season",
      "Control solanaceous weeds such as horse nettle and nightshade around fields"
    ],
    organicTreatment: [
      "Liquid copper or copper hydroxide foliar sprays every 7-10 days",
      "Bacillus subtilis biological fungicides"
    ],
    chemicalTreatment: [
      "Chlorothalonil (Bravo / Daconil) applied preventatively",
      "Mancozeb or Azoxystrobin applications"
    ],
    bestPractices: [
      "Water early in the day so foliage dries quickly",
      "Begin fungicide applications before spots spread to mid-canopy"
    ],
    translations: {
      en: {
        name: "Septoria Leaf Spot",
        description: "Septoria fungus producing numerous small circular spots with gray centers and black specks.",
        symptoms: ["Small spots with tan centers and dark margins", "Tiny black pycnidia specks", "Severe defoliation"],
        causes: ["Septoria lycopersici", "Warm wet weather and water splashing from soil"],
        prevention: ["Mulch plants", "Prune lower leaves", "Control nightshade weeds", "Crop rotation"],
        organicTreatment: ["Copper hydroxide", "Bacillus subtilis"],
        chemicalTreatment: ["Chlorothalonil", "Mancozeb", "Azoxystrobin"],
        bestPractices: ["Morning watering only", "Early preventative spraying"],
        severityNote: "High. Strips foliage progressively from base upward."
      },
      ta: {
        name: "தக்காளி செப்டோரியா இலைப்புள்ளி (Septoria Leaf Spot)",
        description: "செப்டோரியா பூஞ்சையால் ஏற்படும் இந்த நோய் சாம்பல் நிற மையமும் கரும் விளிம்பும் கொண்ட பல சிறு புள்ளிகளை உண்டாக்குகிறது.",
        symptoms: ["சாம்பல் மையத்துடன் கூடிய சிறு வட்டப் புள்ளிகள்", "புள்ளிகளுக்குள் சிறு கருப்பு வித்துக்கள்", "கடுமையான இலை உதிர்தல்"],
        causes: ["பூஞ்சை தொற்று", "மண் தெறித்தல் மற்றும் மழை"],
        prevention: ["தழைக்கூளம் அமைத்தல்", "கீழ் இலைகளை கவாத்து செய்தல்", "பயிர் சுழற்சி"],
        organicTreatment: ["காப்பர் பூஞ்சைக் கொல்லி", "பேசில்லஸ் உயிரி மருந்து"],
        chemicalTreatment: ["குளோரோதலோனில்", "மேன்கோசெப்"],
        bestPractices: ["காலையில் மட்டும் பாசனம் செய்யவும்"],
        severityNote: "அதிக தீவிரம்."
      },
      hi: {
        name: "टमाटर का सेप्टोरिया पत्ता धब्बा (Septoria Leaf Spot)",
        description: "पत्तियों पर छोटे-छोटे गोल धब्बे जिनका केंद्र धूसर और किनारे गहरे भूरे होते हैं।",
        symptoms: ["धूसर केंद्र वाले छोटे गोल धब्बे", "धब्बों के अंदर काले बिंदु", "पत्तियों का तेजी से झड़ना"],
        causes: ["सेप्टोरिया फंगस", "गर्म नम मौसम और पानी का छिटकना"],
        prevention: ["मल्चिंग करें", "निचली पत्तियों को काटें", "खरपतवार हटाएं"],
        organicTreatment: ["कॉपर कवकनाशी", "बैसिलस स्प्रे"],
        chemicalTreatment: ["क्लोरोथैलोनिल", "मैनकोजेब"],
        bestPractices: ["केवल सुबह के समय पानी दें"],
        severityNote: "गंभीर। नीचे से ऊपर की ओर पत्ते साफ कर देता है।"
      }
    }
  },
  {
    cropName: "Tomato",
    classLabel: "Tomato___Spider_mites Two-spotted_spider_mite",
    name: "Two-Spotted Spider Mite",
    isHealthy: false,
    severityNote: "High severity. Destructive pest during hot, dry, dusty seasons.",
    description: "Caused by infestation of Tetranychus urticae. Mites pierce leaf cells to suck out chlorophyll, causing fine pale stippling, chlorosis, delicate silken webbing, and bronzed, scorched foliage.",
    symptoms: [
      "Fine yellow or pale stippling flecks across the upper leaf surfaces",
      "Delicate silken webbing visible on leaf undersides and branch crotches",
      "Leaves turn bronze, dry out, become brittle, and drop off",
      "Tiny moving red/yellow specks visible under magnification"
    ],
    causes: [
      "Tetranychus urticae mites",
      "Hot (above 30°C), dry, drought-stressed, and dusty conditions",
      "Overuse of broad-spectrum synthetic pyrethroids that kill natural mite predators"
    ],
    prevention: [
      "Maintain adequate irrigation to avoid plant drought stress",
      "Wash down dusty roadways and field margins to suppress mite dispersal",
      "Avoid indiscriminate use of broad-spectrum insecticides that kill beneficial predatory mites"
    ],
    organicTreatment: [
      "Release predatory mites (Phytoseiulus persimilis or Neoseiulus californicus)",
      "Insecticidal soap, potassium salts of fatty acids, or 1% horticultural mineral oil",
      "Neem oil (azadirachtin) sprays targeting leaf undersides"
    ],
    chemicalTreatment: [
      "Selective miticides / acaricides: Abamectin, Bifenazate (Acramite), or Spiromesifen (Oberon)",
      "Etoxazole or Hexythiazox mite growth regulators"
    ],
    bestPractices: [
      "Ensure thorough spray coverage of the undersides of leaves",
      "Rotate miticide modes of action (IRAC groups) to prevent rapid resistance"
    ],
    translations: {
      en: {
        name: "Two-Spotted Spider Mite",
        description: "Tetranychus mite pests causing fine pale stippling, silken webbing, and foliar bronzing.",
        symptoms: ["Fine yellow stippling", "Silken webbing under leaves", "Foliar bronzing", "Tiny moving mites"],
        causes: ["Spider mites", "Hot dry dusty weather and predator elimination"],
        prevention: ["Maintain good irrigation", "Supress dust on roads", "Preserve beneficial predators"],
        organicTreatment: ["Predatory mites (Phytoseiulus)", "Insecticidal soap", "Neem oil"],
        chemicalTreatment: ["Abamectin", "Bifenazate", "Spiromesifen"],
        bestPractices: ["Spray undersides of leaves thoroughly", "Rotate miticide classes"],
        severityNote: "High. Rapid population explosions under hot dry conditions."
      },
      ta: {
        name: "தக்காளி செம்பேன் / சிலந்திப் பேன் (Two-Spotted Spider Mite)",
        description: "டெட்ரானைக்கஸ் பேன்களால் ஏற்படும் இந்த பூச்சித் தாக்குதல் இலைகளில் மஞ்சள் புள்ளிகள், சிலந்தி வலை மற்றும் இலை கருகலை ஏற்படுத்துகிறது.",
        symptoms: ["இலைகளில் சிறு மஞ்சள் புள்ளிகள்", "இலையின் அடியில் மெல்லிய சிலந்தி வலை", "இலைகள் செம்பழுப்பு நிறமாகி காய்ந்து போதல்"],
        causes: ["செம்பேன் பூச்சிகள்", "வெப்பமான வறண்ட வானிலை மற்றும் தூசி"],
        prevention: ["வறட்சியை தவிர்க்க சீரான நீர் பாசனம்", "தூசி படிவதை தடுத்தல்"],
        organicTreatment: ["வேப்பெண்ணெய் கரைசல்", "பூச்சிக்கொல்லி சோப்", "இரைவிழுங்கி பேன்கள்"],
        chemicalTreatment: ["அபாமெக்டின் (Abamectin)", "ஸ்பைரோமெசிபென்"],
        bestPractices: ["இலைகளின் அடியில் நனையும்படி மருந்து தெளிக்கவும்"],
        severityNote: "அதிக தீவிரம்."
      },
      hi: {
        name: "टमाटर का दो-धब्बों वाला मकड़ी कीट (Spider Mite)",
        description: "पत्तियों से रस चूसने वाले सूक्ष्म कीट जो पत्तियों पर बारीक पीले धब्बे और जाले बना देते हैं।",
        symptoms: ["पत्तियों पर बारीक पीले धब्बे", "पत्ती के नीचे महीन जाला", "पत्तियों का कांस्य रंग होकर सूखना"],
        causes: ["मकड़ी कीट (माइट्स)", "गर्म, सूखा और धूल भरा मौसम"],
        prevention: ["समय पर सिंचाई करें", "खेत के पास धूल कम रखें", "कीटनाशकों का अंधाधुंध उपयोग न करें"],
        organicTreatment: ["नीम का तेल", "कीटनाशक साबुन घोल", "परभक्षी माइट्स"],
        chemicalTreatment: ["एबामाेक्टिन", "बायफेनाजेट"],
        bestPractices: ["पत्तियों के निचले हिस्से पर अच्छी तरह छिड़काव करें"],
        severityNote: "गंभीर। गर्म मौसम में बहुत तेजी से फैलता है।"
      }
    }
  },
  {
    cropName: "Tomato",
    classLabel: "Tomato___Target_Spot",
    name: "Tomato Target Spot",
    isHealthy: false,
    severityNote: "High severity. Attacks leaves, stems, and fruit in warm humid regions.",
    description: "Caused by Corynespora cassiicola. Produces circular brown lesions with faint concentric rings and light brown or tan centers on leaves, causing premature defoliation and sunken fruit craters.",
    symptoms: [
      "Circular to irregular brown lesions with light centers and concentric target rings",
      "Lesions surrounded by chlorotic halos, coalescing to cause large blighted zones",
      "Dark sunken circular craters with cracked centers on tomato fruit"
    ],
    causes: [
      "Corynespora cassiicola fungus",
      "Warm temperatures (25°C - 32°C) combined with high relative humidity and free moisture"
    ],
    prevention: [
      "Avoid overhead irrigation and use drip watering exclusively",
      "Space plants generously and prune suckers to maintain airy canopy",
      "Rotate with non-host crops and eradicate weed hosts (such as wild legumes)"
    ],
    organicTreatment: [
      "Copper hydroxide foliar sprays applied preventatively",
      "Bio-fungicides based on Bacillus subtilis or Streptomyces"
    ],
    chemicalTreatment: [
      "Fluxapyroxad + Pyraclostrobin (Priaxor)",
      "Azoxystrobin + Difenoconazole or Chlorothalonil"
    ],
    bestPractices: [
      "Apply protective fungicides before dense canopy closure",
      "Destroy infected crop debris immediately after harvest"
    ],
    translations: {
      en: {
        name: "Tomato Target Spot",
        description: "Corynespora fungus producing target-like concentric lesions on leaves and fruit.",
        symptoms: ["Concentric brown target lesions", "Extensive foliar blight", "Sunken circular fruit craters"],
        causes: ["Corynespora cassiicola", "Warm temperatures and high humidity"],
        prevention: ["Drip irrigation only", "Prune for aeration", "Crop rotation"],
        organicTreatment: ["Copper hydroxide", "Bacillus bio-fungicide"],
        chemicalTreatment: ["Priaxor", "Chlorothalonil", "Azoxystrobin"],
        bestPractices: ["Spray before canopy closes", "Clear crop debris post-harvest"],
        severityNote: "High. Damages both vegetative canopy and fruit marketability."
      },
      ta: {
        name: "தக்காளி இலக்கு புள்ளி நோய் (Target Spot)",
        description: "கோரினெஸ்போரா பூஞ்சையால் ஏற்படும் இந்த நோய் இலைகளில் வட்டமான வளையப் புள்ளிகளையும் காய்களில் பள்ளங்களையும் உண்டாக்குகிறது.",
        symptoms: ["வளைய வடிவ கரும்பழுப்பு புள்ளிகள்", "இலைகள் காய்ந்து விழுதல்", "காய்களில் பள்ளங்கள் விழுதல்"],
        causes: ["பூஞ்சை தொற்று", "அதிக வெப்பம் மற்றும் ஈரப்பதம்"],
        prevention: ["சொட்டு நீர் பாசனம்", "செடிகளுக்கு இடையே இடைவெளி", "பயிர் சுழற்சி"],
        organicTreatment: ["காப்பர் ஹைட்ராக்சைடு", "பேசில்லஸ் உயிரி மருந்து"],
        chemicalTreatment: ["குளோரோதலோனில்", "அசாக்ஸிஸ்ட்ரோபின்"],
        bestPractices: ["செடிகள் அடர்ந்து வளர்வதற்கு முன் மருந்து தெளிக்கவும்"],
        severityNote: "அதிக தீவிரம்."
      },
      hi: {
        name: "टमाटर का टारगेट स्पॉट रोग",
        description: "पत्तियों और फलों पर गोल छल्लेदार गहरे धब्बे बनते हैं जिससे भारी नुकसान होता है।",
        symptoms: ["छल्लेदार भूरे धब्बे", "पत्तियों का झुलसना", "टमाटरों पर गहरे गोल गड्ढे"],
        causes: ["कोरीनेस्पोरा कवक", "गर्म और आर्द्र मौसम"],
        prevention: ["ड्रिप सिंचाई", "छंटाई कर हवा का बहाव रखें", "फसल चक्र"],
        organicTreatment: ["कॉपर कवकनाशी", "बैसिलस स्प्रे"],
        chemicalTreatment: ["क्लोरोथैलोनिल", "एजॉक्सीस्ट्रोबिन"],
        bestPractices: ["शाखाएं फैलने से पहले छिड़काव करें"],
        severityNote: "गंभीर। पत्तों और फलों दोनों को नुकसान।"
      }
    }
  },
  {
    cropName: "Tomato",
    classLabel: "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
    name: "Tomato Yellow Leaf Curl Virus (TYLCV)",
    isHealthy: false,
    severityNote: "Critical severity. Can cause up to 100% yield loss if plants are infected early.",
    description: "A devastating begomovirus transmitted by silverleaf whiteflies (Bemisia tabaci). Causes severe stunting, erect bushy growth, upward leaf curling, and bright marginal yellowing, with flower abortion and no fruit set.",
    symptoms: [
      "Severe stunting and dwarfing of plants with an erect, bushy appearance",
      "Upward cupping and curling of leaf margins with marked interveinal yellowing (chlorosis)",
      "Reduced leaf blade size (shoestring appearance)",
      "Heavy flower drop and almost complete failure to set fruit"
    ],
    causes: [
      "Tomato yellow leaf curl begomovirus (TYLCV)",
      "Vector transmission by silverleaf whiteflies (Bemisia tabaci)",
      "Warm tropical and subtropical dry seasons favorable for whitefly surges"
    ],
    prevention: [
      "Plant TYLCV-resistant tomato cultivars (e.g. Tygress, Charger, Invictus)",
      "Protect young seedling nurseries with fine 50-mesh insect-proof netting",
      "Use reflective silver plastic mulches to disorient and repel incoming whiteflies",
      "Implement a crop-free host break period of at least 2 months"
    ],
    organicTreatment: [
      "Yellow sticky traps placed above the canopy to capture adult whiteflies",
      "Foliar sprays of insecticidal soap or neem oil (azadirachtin) to suppress whitefly nymphs",
      "Encourage natural predators such as Encarsia formosa parasitic wasps"
    ],
    chemicalTreatment: [
      "Systemic neonicotinoids (Imidacloprid, Thiamethoxam) at transplanting",
      "Cyantraniliprole, Pyriproxyfen, or Spiromesifen for whitefly population control"
    ],
    bestPractices: [
      "Rogue out and destroy symptomatic virus-infected plants immediately in sealed bags",
      "Monitor yellow sticky traps weekly for early whitefly arrivals"
    ],
    translations: {
      en: {
        name: "Tomato Yellow Leaf Curl Virus (TYLCV)",
        description: "Begomovirus vectored by whiteflies causing extreme stunting, cupped yellow leaves, and flower drop.",
        symptoms: ["Extreme stunting", "Upward leaf cupping", "Bright yellow margins", "Flower abortion and no fruit"],
        causes: ["TYLCV begomovirus", "Silverleaf whitefly vector (Bemisia tabaci)"],
        prevention: ["TYLCV-resistant hybrids", "50-mesh insect netting", "Reflective silver mulch"],
        organicTreatment: ["Yellow sticky traps", "Neem oil", "Encarsia predatory wasps"],
        chemicalTreatment: ["Imidacloprid at transplant", "Cyantraniliprole", "Pyriproxyfen"],
        bestPractices: ["Rogue infected plants immediately", "Monitor whitefly populations weekly"],
        severityNote: "Critical. Near total yield loss if plants are infected before flowering."
      },
      ta: {
        name: "தக்காளி இலைச்சுருட்டல் வைரஸ் நோய் (TYLCV)",
        description: "வெள்ளைப் பூச்சிகளால் பரப்பப்படும் இந்த கொடிய வைரஸ் நோய் செடிகளின் வளர்ச்சியை குன்றச் செய்து, இலைகளை மேல்நோக்கி சுருட்டி மஞ்சள் நிறமாக்குகிறது.",
        symptoms: ["செடி வளர்ச்சி குன்றுதல்", "இலைகள் மேல்நோக்கி கிண்ணம் போல் சுருங்குதல்", "இலை விளிம்புகள் மஞ்சள் நிறமாதல்", "பூக்கள் உதிர்ந்து காய் பிடிக்காமல் போதல்"],
        causes: ["வைரஸ் தொற்று", "வெள்ளைப் பூச்சிகள் (Whiteflies) வழியே பரவுதல்"],
        prevention: ["வைரஸ் எதிர்ப்பு கலப்பின ரகங்கள்", "50-மெஷ் பூச்சி வலை நாற்றங்கால்", "வெள்ளி நிற பிளாஸ்டிக் தழைக்கூளம்"],
        organicTreatment: ["மஞ்சள் நிற ஒட்டும் பொறிகள்", "வேப்பெண்ணெய் தெளிப்பு"],
        chemicalTreatment: ["இமிடாக்குளோப்ரிட்", "தயாமெத்தாக்சாம்"],
        bestPractices: ["நோயுற்ற செடிகளை பிடுங்கி உடனே அழிக்கவும்"],
        severityNote: "மிகவும் ஆபத்தானது. 100% வரை மகசூல் இழப்பை உண்டாக்கும்."
      },
      hi: {
        name: "टमाटर का पीला पत्ती मरोड़ वायरस (TYLCV)",
        description: "सफेद मक्खी द्वारा फैलाया जाने वाला अत्यंत घातक वायरस जिससे पौधे बौने रह जाते हैं और फल नहीं लगते।",
        symptoms: ["पौधे का बौना होना", "पत्तियों का ऊपर की ओर मुड़ना", "पत्तियों का पीला पड़ना", "फूलों का झड़ना और फल न लगना"],
        causes: ["TYLCV वायरस", "सफेद मक्खी (Whitefly)"],
        prevention: ["प्रतिरोधी किस्में लगाएं", "50-मेश वाली कीट जाली में नर्सरी उगाएं", "सिल्वर रिफ्लेक्टिव मल्च"],
        organicTreatment: ["पीले चिपचिपे कार्ड (ट्रैप)", "नीम तेल स्प्रे"],
        chemicalTreatment: ["इमिडाक्लोप्रिड", "थियामेथोक्सम"],
        bestPractices: ["संक्रमित पौधों को तुरंत उखाड़कर नष्ट करें"],
        severityNote: "अत्यधिक विनाशकारी। शत-प्रतिशत फसल बर्बाद कर सकता है।"
      }
    }
  },
  {
    cropName: "Tomato",
    classLabel: "Tomato___Tomato_mosaic_virus",
    name: "Tomato Mosaic Virus (ToMV)",
    isHealthy: false,
    severityNote: "High severity. Highly stable mechanically transmitted tobamovirus.",
    description: "Caused by Tomato mosaic virus (ToMV). Produces mottled dark and light green mosaic patterns on foliage, leaf distortion or 'fern-leaf' filiform symptoms, stunted plants, and internal brown ring rot in fruit.",
    symptoms: [
      "Mottled alternating light and dark green mosaic patterns on foliage",
      "Leaf wrinkling, puckering, and strap-like 'fern leaf' narrowing",
      "Stunted vine growth and overall reduced plant vigor",
      "Internal browning and uneven ripening in harvested tomatoes"
    ],
    causes: [
      "Tomato mosaic virus (ToMV, a tobamovirus)",
      "Mechanical transmission on hands, pruning tools, and grafting knives",
      "Contaminated seed and residues in tobacco products (smokers handling plants)"
    ],
    prevention: [
      "Plant certified mosaic-resistant cultivars (varieties with Tm-2 or Tm-2^2 resistance)",
      "Strict prohibition of smoking or tobacco usage in greenhouses and tomato fields",
      "Workers must wash hands with milk or trisodium phosphate (TSP) before touching plants",
      "Thoroughly steam-sterilize or disinfect potting soil and seedling trays"
    ],
    organicTreatment: [
      "Skim milk spray (20% solution) to inactivate mechanically spreading virus particles on tools",
      "Chitosan foliar sprays to stimulate systemic defense pathways"
    ],
    chemicalTreatment: [
      "No chemical viricides exist to cure viral plant infections",
      "Sanitize pruning tools with 10% household bleach or 20% non-fat dry milk solution between cuts"
    ],
    bestPractices: [
      "Rogue out and incinerate infected tomato plants immediately",
      "Never smoke or chew tobacco before handling tomato plants"
    ],
    translations: {
      en: {
        name: "Tomato Mosaic Virus (ToMV)",
        description: "Tobamovirus causing mottled light/dark green patterns, fern leaves, and internal fruit browning.",
        symptoms: ["Green mosaic mottling", "Wrinkled fern-like leaves", "Stunted plants", "Internal fruit browning"],
        causes: ["Tomato mosaic virus (ToMV)", "Mechanical contact and tobacco residue"],
        prevention: ["ToMV-resistant cultivars", "Prohibit smoking near crops", "Disinfect hands with milk"],
        organicTreatment: ["Skim milk tool dips", "Chitosan defense spray"],
        chemicalTreatment: ["No chemical cure; sanitize tools with bleach/milk"],
        bestPractices: ["Rogue infected plants immediately", "Wash hands before working"],
        severityNote: "High. Highly contagious by touch."
      },
      ta: {
        name: "தக்காளி மொசைக் வைரஸ் நோய் (ToMV)",
        description: "கை விரல்கள் மற்றும் கருவிகள் மூலம் எளிதில் பரவும் வைரஸ் நோய். இலைகளில் வெளிறிய மற்றும் அடர் பச்சை வண்ணப் புள்ளிகளை உருவாக்குகிறது.",
        symptoms: ["இலைகளில் மொசைக் போன்ற பச்சை திட்டுகள்", "இலைகள் சுருங்கி பெரணி இலை போல் மாறுதல்", "காய்களின் உள்ளே பழுப்பு நிறமாதல்"],
        causes: ["ToMV வைரஸ்", "தொடுதல், கவாத்து கருவிகள் மற்றும் புகையிலை பழக்கம்"],
        prevention: ["வைரஸ் எதிர்ப்பு ரகங்கள்", "தோட்டத்தில் புகைபிடிப்பதை தடை செய்தல்", "பால் கரைசலில் கைகளை கழுவுதல்"],
        organicTreatment: ["பால் கரைசலில் கவாத்து கருவிகளை நனைத்தல்"],
        chemicalTreatment: ["ரசாயன மருந்துகள் இல்லை; கருவிகளை பிளீச்சிங் கரைசலில் சுத்தம் செய்யவும்"],
        bestPractices: ["பாதிக்கப்பட்ட செடிகளை பிடுங்கி எரிக்கவும்"],
        severityNote: "அதிக தீவிரம். தொடுதல் மூலம் மிக வேகமாக பரவும்."
      },
      hi: {
        name: "टमाटर का मोजेक वायरस (ToMV)",
        description: "हाथों और औजारों से फैलने वाला अत्यधिक संक्रामक वायरस जिससे पत्तियों पर मोजेक जैसे हल्के-गहरे हरे धब्बे पड़ते हैं।",
        symptoms: ["हल्के और गहरे हरे मोजेक धब्बे", "पत्तियों का सिकुड़ना और फर्न जैसी होना", "फलों के अंदर भूरापन"],
        causes: ["ToMV वायरस", "छूने से, औजारों से और तंबाकू के उपयोग से"],
        prevention: ["प्रतिरोधी किस्में लगाएं", "खेत में बीड़ी-सिगरेट पीना वर्जित करें", "हाथों को दूध या साबुन से धोएं"],
        organicTreatment: ["दूध के घोल में औजार डुबोना", "काइटोसन स्प्रे"],
        chemicalTreatment: ["कोई रासायनिक इलाज नहीं; औजारों को ब्लीच से साफ करें"],
        bestPractices: ["संक्रमित पौधों को उखाड़कर तुरंत जलाएं"],
        severityNote: "गंभीर। छूने मात्र से आसानी से फैलता है।"
      }
    }
  },
  {
    cropName: "Tomato",
    classLabel: "Tomato___healthy",
    name: "Tomato Healthy",
    isHealthy: true,
    severityNote: "Optimal plant health. Foliage is lush, sturdy, and actively producing fruit.",
    description: "The tomato plant exhibits lush, rich green compound foliage, robust thick stems, prolific healthy flower clusters, and smooth unblemished fruit without any sign of blight, spot, wilt, or viral mosaic.",
    symptoms: [
      "Vibrant dark green compound foliage with healthy serrated margins",
      "Stout main stems and vigorous lateral branching",
      "Abundant bright yellow blossoms with strong fruit set"
    ],
    causes: [
      "Balanced soil nutrients (adequate nitrogen, phosphorus, potassium, and calcium)",
      "Consistent drip irrigation, proper trellising, and full sun exposure"
    ],
    prevention: [
      "Continue consistent root watering and avoid wetting foliage",
      "Prune non-bearing suckers to maintain open canopy airflow",
      "Mulch soil around plants to retain steady moisture and moderate temperature"
    ],
    organicTreatment: [
      "Prophylactic applications of compost tea or liquid seaweed to reinforce plant immunity",
      "Foliar calcium feed to prevent blossom end rot"
    ],
    chemicalTreatment: [
      "No chemical fungicides or insecticides required"
    ],
    bestPractices: [
      "Scout lower leaves weekly for early signs of disease",
      "Ensure sturdy stakes or cages support heavy fruit clusters"
    ],
    translations: {
      en: {
        name: "Tomato (Healthy)",
        description: "Vibrant tomato foliage exhibiting robust health and disease resistance.",
        symptoms: ["Deep emerald compound leaves", "Thick sturdy stems", "Healthy flower and fruit set"],
        causes: ["Optimal sunlight, balanced fertility, and consistent drip irrigation"],
        prevention: ["Maintain drip watering, sucker pruning, and mulching"],
        organicTreatment: ["Seaweed foliar tonic and calcium feed"],
        chemicalTreatment: ["None required"],
        bestPractices: ["Weekly scouting and fruit staking"],
        severityNote: "Healthy condition."
      },
      ta: {
        name: "தக்காளி (ஆரோக்கியமானது)",
        description: "தக்காளி செடிகள் எந்தவித நோய்களுமின்றி கரும்பச்சை நிறத்துடன், பூத்து காய் பிடித்து செழிப்பாக உள்ளன.",
        symptoms: ["அடர் பச்சை இலைகள்", "திடமான தண்டு", "நல்ல பூ மற்றும் காய் வளர்ச்சி"],
        causes: ["சரியான சொட்டு நீர் பாசனம் மற்றும் ஊட்டச்சத்து மேலாண்மை"],
        prevention: ["சீரான நீர் பாய்ச்சுதல் மற்றும் பக்கக் கிளைகளை கவாத்து செய்தல்"],
        organicTreatment: ["கடற்பாசி உரம் மற்றும் கால்சியம் சத்து தெளிப்பு"],
        chemicalTreatment: ["தேவை இல்லை"],
        bestPractices: ["வாரந்தோறும் கண்காணித்து முட்டுக் கொடுக்கவும்"],
        severityNote: "ஆரோக்கியமானது."
      },
      hi: {
        name: "टमाटर (स्वस्थ)",
        description: "टमाटर के पौधे पूरी तरह से हरे, तंदुरुस्त और रोगमुक्त हैं, जिन पर स्वस्थ फल और फूल लगे हैं।",
        symptoms: ["गहरा हरा रंग", "मजबूत तना", "स्वस्थ फूल और फल"],
        causes: ["संतुलित खाद, उचित धूप और ड्रिप सिंचाई"],
        prevention: ["नियमित सिंचाई और अनावश्यक शाखाओं की छंटाई जारी रखें"],
        organicTreatment: ["समुद्री शैवाल टॉनिक और कैल्शियम"],
        chemicalTreatment: ["कोई नहीं"],
        bestPractices: ["साप्ताहिक निरीक्षण और पौधों को सहारा दें"],
        severityNote: "स्वस्थ फसल।"
      }
    }
  }
];

module.exports = diseasesData;
