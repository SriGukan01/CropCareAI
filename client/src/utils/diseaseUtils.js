/**
 * Agricultural Disease Pathology Mapping Utility
 * Strips crop prefixes to provide clean disease-only diagnosis labels.
 */

export const CLASS_TO_DISEASE_NAME = {
  // Apple
  'Apple___Apple_scab': 'Apple Scab',
  'Apple___Black_rot': 'Black Rot',
  'Apple___Cedar_apple_rust': 'Cedar Apple Rust',
  'Apple___healthy': 'Healthy Foliage',

  // Blueberry
  'Blueberry___healthy': 'Healthy Foliage',

  // Cherry
  'Cherry_(including_sour)___Powdery_mildew': 'Powdery Mildew',
  'Cherry_(including_sour)___healthy': 'Healthy Foliage',

  // Corn / Maize
  'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot': 'Cercospora Leaf Spot / Gray Leaf Spot',
  'Corn_(maize)___Common_rust_': 'Common Rust',
  'Corn_(maize)___Northern_Leaf_Blight': 'Northern Leaf Blight',
  'Corn_(maize)___healthy': 'Healthy Foliage',

  // Grape
  'Grape___Black_rot': 'Black Rot',
  'Grape___Esca_(Black_Measles)': 'Esca (Black Measles)',
  'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)': 'Leaf Blight (Isariopsis Leaf Spot)',
  'Grape___healthy': 'Healthy Foliage',

  // Citrus / Orange
  'Orange___Haunglongbing_(Citrus_greening)': 'Huanglongbing (Citrus Greening)',

  // Peach
  'Peach___Bacterial_spot': 'Bacterial Spot',
  'Peach___healthy': 'Healthy Foliage',

  // Pepper (Bell)
  'Pepper,_bell___Bacterial_spot': 'Bacterial Spot',
  'Pepper,_bell___healthy': 'Healthy Foliage',

  // Potato
  'Potato___Early_blight': 'Early Blight',
  'Potato___Late_blight': 'Late Blight',
  'Potato___healthy': 'Healthy Foliage',

  // Raspberry
  'Raspberry___healthy': 'Healthy Foliage',

  // Soybean
  'Soybean___healthy': 'Healthy Foliage',

  // Squash
  'Squash___Powdery_mildew': 'Powdery Mildew',

  // Strawberry
  'Strawberry___Leaf_scorch': 'Leaf Scorch',
  'Strawberry___healthy': 'Healthy Foliage',

  // Tomato
  'Tomato___Bacterial_spot': 'Bacterial Spot',
  'Tomato___Early_blight': 'Early Blight',
  'Tomato___Late_blight': 'Late Blight',
  'Tomato___Leaf_Mold': 'Leaf Mold',
  'Tomato___Septoria_leaf_spot': 'Septoria Leaf Spot',
  'Tomato___Spider_mites Two-spotted_spider_mite': 'Two-Spotted Spider Mite',
  'Tomato___Target_Spot': 'Target Spot',
  'Tomato___Tomato_Yellow_Leaf_Curl_Virus': 'Yellow Leaf Curl Virus',
  'Tomato___Tomato_mosaic_virus': 'Mosaic Virus',
  'Tomato___healthy': 'Healthy Foliage'
};

/**
 * Returns disease-only label by stripping any crop prefix.
 * @param {string|object} raw - Raw class label string or prediction object
 * @returns {string} Clean disease name
 */
export const formatDiseaseName = (raw) => {
  if (!raw) return 'Unknown Pathology';

  const labelStr = typeof raw === 'object' ? (raw.disease || raw.label || '') : String(raw);

  if (CLASS_TO_DISEASE_NAME[labelStr]) {
    return CLASS_TO_DISEASE_NAME[labelStr];
  }

  // If label contains '___', strip crop prefix before '___'
  let diseasePart = labelStr;
  if (labelStr.includes('___')) {
    diseasePart = labelStr.split('___')[1];
  }

  // Handle generic crop prefixes if present (e.g. "Pepper Bacterial Spot" -> "Bacterial Spot")
  let cleaned = diseasePart
    .replace(/_/g, ' ')
    .replace(/,/g, '')
    .trim();

  const lower = cleaned.toLowerCase();
  if (lower === 'healthy') return 'Healthy Foliage';
  if (lower.includes('bacterial spot')) return 'Bacterial Spot';
  if (lower.includes('early blight')) return 'Early Blight';
  if (lower.includes('late blight')) return 'Late Blight';
  if (lower.includes('common rust')) return 'Common Rust';
  if (lower.includes('black rot')) return 'Black Rot';
  if (lower.includes('powdery mildew')) return 'Powdery Mildew';
  if (lower.includes('leaf scorch')) return 'Leaf Scorch';
  if (lower.includes('leaf mold')) return 'Leaf Mold';
  if (lower.includes('septoria leaf spot')) return 'Septoria Leaf Spot';
  if (lower.includes('target spot')) return 'Target Spot';
  if (lower.includes('yellow leaf curl')) return 'Yellow Leaf Curl Virus';
  if (lower.includes('mosaic virus')) return 'Mosaic Virus';
  if (lower.includes('spider mite')) return 'Two-Spotted Spider Mite';
  if (lower.includes('northern leaf blight')) return 'Northern Leaf Blight';
  if (lower.includes('isariopsis')) return 'Leaf Blight (Isariopsis Leaf Spot)';
  if (lower.includes('esca')) return 'Esca (Black Measles)';
  if (lower.includes('citrus greening') || lower.includes('haunglongbing')) return 'Huanglongbing (Citrus Greening)';
  if (lower.includes('apple scab')) return 'Apple Scab';
  if (lower.includes('cedar apple rust')) return 'Cedar Apple Rust';

  return cleaned
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
};

export default {
  CLASS_TO_DISEASE_NAME,
  formatDiseaseName
};
