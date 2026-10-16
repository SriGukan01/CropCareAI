import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      appName: 'CropCare',
      nav: {
        home: 'Home',
        predict: 'Scan Leaf',
        library: 'Disease Library',
        dashboard: 'Field Dashboard',
        about: 'About Project',
        history: 'History',
        admin: 'Admin Portal',
        login: 'Login',
        register: 'Register',
        logout: 'Logout'
      },
      hero: {
        title: 'Smart Plant Disease Detection & Crop Health Assistant',
        subtitle: 'Diagnose plant leaf diseases in seconds using deep learning, explore verified organic remedies, calculate spray dosages by farm size, and monitor regional outbreak risks across 14 commercial crops.',
        ctaPredict: 'Diagnose Leaf Now',
        ctaLibrary: 'Browse 38 Diseases',
        accuracyStat: '98.4% Validation Accuracy',
        classesStat: '38 Botanical Classes',
        speedStat: '<1.2s Fast Diagnosis'
      },
      howItWorks: {
        title: 'How CropCare AI Works',
        step1Title: '1. Take or Upload Photo',
        step1Desc: 'Upload a well-lit photo of the affected plant leaf using your camera or drag-and-drop.',
        step2Title: '2. Deep Learning Analysis',
        step2Desc: 'MobileNetV2 neural networks scan cellular visual patterns and highlight focal lesions with Grad-CAM.',
        step3Title: '3. Actionable Agronomy Guide',
        step3Desc: 'Receive immediate disease identification, organic remedies, fungicide options, and exportable PDF reports.'
      },
      predict: {
        title: 'Leaf Disease Diagnosis',
        subtitle: 'Upload a clear, close-up photograph of a crop leaf showing lesions or discoloration.',
        tabSingle: 'Single Image',
        tabBatch: 'Batch Analysis (Up to 5)',
        dragDrop: 'Drag and drop your leaf photo here, or',
        browseFiles: 'Browse Files',
        cameraCapture: 'Take Photo with Camera',
        supportedFormats: 'Supports JPG, PNG, WEBP (Max 5MB)',
        analyzeBtn: 'Diagnose Crop Disease',
        analyzing: 'Extracting CNN Features...',
        selectImages: 'Selected Images',
        changeImage: 'Change Photo',
        batchLimitNote: 'You can upload up to 5 images for batch leaf health screening.'
      },
      result: {
        title: 'Diagnostic Findings',
        healthyBadge: 'Healthy Foliage',
        diseaseBadge: 'Disease Detected',
        confidenceScore: 'Model Confidence',
        originalImage: 'Original Leaf Photo',
        gradcamHeatmap: 'Explainable AI (Grad-CAM Heatmap)',
        gradcamNote: 'Highlighted areas show where the model focused during classification.',
        topPredictions: 'Top Diagnostic Probabilities',
        uncertainTitle: 'Uncertain Prediction Result',
        uncertainDesc: 'The model has low confidence in this image. Please ensure good lighting, avoid blur, and submit a close-up photo of an actual crop leaf.',
        downloadPdf: 'Download PDF Report',
        shareResult: 'Share Diagnosis',
        analyzeAnother: 'Analyze Another Leaf',
        feedbackPrompt: 'Was this diagnostic prediction accurate?',
        feedbackCorrect: 'Correct Diagnosis',
        feedbackWrong: 'Incorrect Diagnosis',
        selectCorrectLabel: 'Select Actual Disease (if known)',
        feedbackSubmitted: 'Thank you! Your feedback helps train future model iterations.',
        tabs: {
          overview: 'Overview',
          symptoms: 'Symptoms',
          causes: 'Causes',
          prevention: 'Prevention',
          organic: 'Organic Remedies',
          chemical: 'Chemical Options',
          bestPractices: 'Best Practices'
        }
      },
      batch: {
        title: 'Batch Analysis Results',
        summaryTitle: 'Batch Screening Summary',
        totalAnalyzed: 'Total Analyzed',
        healthyCount: 'Healthy Leaves',
        diseasedCount: 'Diseased Leaves',
        mostCommon: 'Predominant Condition'
      },
      history: {
        title: 'Your Diagnostic History',
        subtitle: 'Review past leaf scans, treatment logs, and download archival PDF reports.',
        filterStatus: 'All Statuses',
        filterHealthy: 'Healthy Only',
        filterDiseased: 'Diseased Only',
        searchPlaceholder: 'Search by crop or disease...',
        emptyTitle: 'No scans found',
        emptyDesc: 'You have not uploaded any crop scans yet, or no records match your filter criteria.',
        date: 'Date Scanned',
        confidence: 'Confidence',
        actions: 'Actions',
        viewDetails: 'View',
        delete: 'Delete'
      },
      library: {
        title: 'Botanical Disease Library',
        subtitle: 'Explore 38 plant disease and healthy classes across 14 commercial agricultural crops.',
        searchPlaceholder: 'Search diseases, symptoms, or crops...',
        allCrops: 'All Crops',
        viewGuide: 'View Treatment Guide'
      },
      about: {
        title: 'About The CNN Diagnostic System',
        pipelineTitle: 'Deep Learning Inference Pipeline',
        stepInput: '1. Input Leaf Image (224x224x3)',
        stepConv: '2. Convolutional Layers',
        stepRelu: '3. ReLU Activation',
        stepPool: '4. Spatial Pooling',
        stepFeat: '5. MobileNetV2 Bottleneck Features',
        stepGap: '6. Global Average Pooling',
        stepDense: '7. Fully Connected Head',
        stepSoftmax: '8. Softmax Output (38 Classes)',
        stepFinal: '9. Final Disease & Heatmap',
        explainabilityTitle: 'Explainable AI & Grad-CAM',
        explainabilityDesc: 'Gradient-weighted Class Activation Mapping (Grad-CAM) computes the gradients of the target class score relative to the final convolutional feature maps, creating an intuitive heatmap overlay illustrating where the neural network concentrated its attention.',
        limitationsTitle: 'Agricultural Limitations & Field Use',
        limitationsDesc: 'The neural network is trained on the PlantVillage benchmark dataset. Controlled background laboratory conditions may exhibit variance when deployed in outdoor ambient light or complex weed canopies. This platform serves as a rapid preliminary screening instrument and should always be corroborated by local agricultural extension officers or certified agronomists.'
      },
      admin: {
        title: 'Agricultural Admin Dashboard',
        totalPredictions: 'Total Predictions',
        totalUsers: 'Registered Users',
        avgConfidence: 'Avg. Confidence',
        feedbackAccuracy: 'Feedback Accuracy',
        mostDetected: 'Most Detected Diseases',
        cropDistribution: 'Crop Distribution',
        predictionsTrend: 'Predictions Over Time',
        manageDiseases: 'Manage Diseases',
        manageCrops: 'Manage Crops',
        feedbackViewer: 'Feedback Submissions',
        exportDataset: 'Export Retraining Dataset (.ZIP)'
      }
    }
  },
  ta: {
    translation: {
      appName: 'CropCare (பயிர் பாதுகாப்பு)',
      nav: {
        home: 'முகப்பு',
        predict: 'இலை ஆய்வு',
        library: 'நோய் களஞ்சியம்',
        dashboard: 'கள டேஷ்போர்டு',
        about: 'திட்டம் பற்றி',
        history: 'முந்தைய பதிவுகள்',
        admin: 'நிர்வாக பக்கம்',
        login: 'உள்நுழைக',
        register: 'பதிவு செய்க',
        logout: 'வெளியேறு'
      },
      hero: {
        title: 'செயற்கை நுண்ணறிவு மூலம் பயிர் நோய் கண்டறிதல்',
        subtitle: 'ஆழமான நரம்பியல் நெட்வொர்க் (CNN) மூலம் பயிர் இலை நோய்களை நொடிகளில் கண்டறிந்து, இயற்கை மற்றும் ரசாயன தடுப்பு முறைகளை அறிந்து கொள்ளுங்கள்.',
        ctaPredict: 'இலையை ஆய்வு செய்க',
        ctaLibrary: 'நோய்களை அறிக',
        accuracyStat: '98.4% துல்லியம்',
        classesStat: '38 பயிர் பிரிவுகள்',
        speedStat: '<1.2 வினாடி வேகம்'
      },
      howItWorks: {
        title: 'செயல்படும் விதம்',
        step1Title: '1. இலை படம் பதிவேற்றவும்',
        step1Desc: 'பாதிக்கப்பட்ட பயிர் இலையின் தெளிவான புகைப்படத்தை கேமரா வழியே எடுக்கவும்.',
        step2Title: '2. நரம்பியல் வலைப்பின்னல் பகுப்பாய்வு',
        step2Desc: 'MobileNetV2 மாதிரி இலை திசுக்களை ஆராய்ந்து Grad-CAM வரைபடத்தை உருவாக்குகிறது.',
        step3Title: '3. தீர்வு மற்றும் சிகிச்சை அறிக்கை',
        step3Desc: 'உடனடி நோய் பெயர், இயற்கை சிகிச்சைகள் மற்றும் PDF அறிக்கையை பதிவிறக்கவும்.'
      },
      predict: {
        title: 'பயிர் இலை நோய் கண்டறிதல்',
        subtitle: 'பாதிக்கப்பட்ட இலையின் தெளிவான புகைப்படத்தை இங்கு பதிவேற்றவும்.',
        tabSingle: 'ஒற்றை படம்',
        tabBatch: 'தொகுதி ஆய்வு (5 படங்கள் வரை)',
        dragDrop: 'இலை படத்தை இங்கே இழுத்து விடவும், அல்லது',
        browseFiles: 'கோப்பை தேர்ந்தெடுக்கவும்',
        cameraCapture: 'கேமரா மூலம் படம் எடுக்கவும்',
        supportedFormats: 'JPG, PNG, WEBP (அதிகபட்சம் 5MB)',
        analyzeBtn: 'நோயை கண்டறி',
        analyzing: 'ஆய்வு செய்யப்படுகிறது...',
        selectImages: 'தேர்ந்தெடுக்கப்பட்ட படங்கள்',
        changeImage: 'படத்தை மாற்றவும்',
        batchLimitNote: 'ஒரே நேரத்தில் 5 இலைகள் வரை ஆய்வு செய்யலாம்.'
      },
      result: {
        title: 'பரிசோதனை முடிவுகள்',
        healthyBadge: 'ஆரோக்கியமான இலை',
        diseaseBadge: 'நோய் கண்டறியப்பட்டுள்ளது',
        confidenceScore: 'AI மாதிரி துல்லிய சதவீதம்',
        originalImage: 'அசல் இலை புகைப்படம்',
        gradcamHeatmap: 'Grad-CAM வெப்ப வரைபடம்',
        gradcamNote: 'வண்ணமிட்ட பகுதிகள் AI மாதிரி கவனம் செலுத்திய இடங்களை காட்டுகின்றன.',
        topPredictions: 'முக்கிய வாய்ப்புள்ள நோய்கள்',
        uncertainTitle: 'நிச்சயமற்ற கணிப்பு',
        uncertainDesc: 'இந்த படத்தில் நோய் கண்டறிதல் துல்லியம் குறைவாக உள்ளது. தயவுசெய்து நல்ல வெளிச்சத்தில் தெளிவான இலையின் புகைப்படத்தை பதிவேற்றவும்.',
        downloadPdf: 'PDF அறிக்கை பதிவிறக்கு',
        shareResult: 'பகிர்க',
        analyzeAnother: 'மற்றொரு இலையை ஆய்வு செய்',
        feedbackPrompt: 'இந்த கணிப்பு சரியானதா?',
        feedbackCorrect: 'ஆம், சரியானது',
        feedbackWrong: 'இல்லை, தவறானது',
        selectCorrectLabel: 'சரியான நோயை தேர்வு செய்யவும்',
        feedbackSubmitted: 'நன்றி! உங்கள் கருத்து AI மாதிரியை மேலும் துல்லியமாக்க உதவும்.',
        tabs: {
          overview: 'விவரம்',
          symptoms: 'அறிகுறிகள்',
          causes: 'காரணங்கள்',
          prevention: 'தடுப்பு முறைகள்',
          organic: 'இயற்கை மருத்துவம்',
          chemical: 'ரசாயன மருந்துகள்',
          bestPractices: 'சிறந்த வழிகாட்டுதல்கள்'
        }
      },
      batch: {
        title: 'தொகுதி ஆய்வு முடிவுகள்',
        summaryTitle: 'தொகுதி சுருக்கம்',
        totalAnalyzed: 'ஆய்வு செய்யப்பட்டவை',
        healthyCount: 'ஆரோக்கியமானவை',
        diseasedCount: 'நோயுற்றவை',
        mostCommon: 'அதிகமாக கண்டறியப்பட்ட நோய்'
      },
      history: {
        title: 'முந்தைய மருத்துவ பதிவுகள்',
        subtitle: 'நீங்கள் ஆய்வு செய்த இலைகள் மற்றும் அவற்றின் சிகிச்சை அறிக்கைகள்.',
        filterStatus: 'அனைத்து நிலைகளும்',
        filterHealthy: 'ஆரோக்கியமானவை மட்டும்',
        filterDiseased: 'நோயுற்றவை மட்டும்',
        searchPlaceholder: 'பயிர் அல்லது நோய் தேட...',
        emptyTitle: 'பதிவுகள் எதுவும் இல்லை',
        emptyDesc: 'நீங்கள் இன்னும் எந்த இலைகளையும் ஆய்வு செய்யவில்லை.',
        date: 'தேதி',
        confidence: 'துல்லியம்',
        actions: 'செயல்கள்',
        viewDetails: 'பார்க்க',
        delete: 'நீக்கு'
      },
      library: {
        title: 'தாவர நோய் களஞ்சியம்',
        subtitle: '14 பயிர்களின் 38 நோய் மற்றும் ஆரோக்கிய நிலைகளை ஆராயுங்கள்.',
        searchPlaceholder: 'நோய், அறிகுறிகள் அல்லது பயிரை தேட...',
        allCrops: 'அனைத்து பயிர்களும்',
        viewGuide: 'சிகிச்சை முறையை காண்க'
      },
      about: {
        title: 'CNN மாதிரி கட்டமைப்பு பற்றி',
        pipelineTitle: 'ஆழமான கற்றல் பாய்வு',
        stepInput: '1. இலை படம் (224x224x3)',
        stepConv: '2. கன்வொலூஷன் அடுக்குகள்',
        stepRelu: '3. ReLU தூண்டல்',
        stepPool: '4. பூலிங்',
        stepFeat: '5. பண்பு பிரித்தெடுத்தல்',
        stepGap: '6. குளோபல் சராசரி பூலிங்',
        stepDense: '7. அடர்ந்த அடுக்குகள்',
        stepSoftmax: '8. சாப்ட்மேக்ஸ் (38 வகுப்புகள்)',
        stepFinal: '9. முடிவு மற்றும் வரைபடம்',
        explainabilityTitle: 'விளக்கக்கூடிய AI (Grad-CAM)',
        explainabilityDesc: 'Grad-CAM தொழில்நுட்பம் நரம்பியல் வலைப்பின்னல் இலையின் எந்த பகுதியை அடிப்படையாக கொண்டு இந்த முடிவை எடுத்தது என்பதை வண்ண வெப்ப வரைபடமாக காட்டுகிறது.',
        limitationsTitle: 'வேளாண் பயன்பாட்டு வரம்புகள்',
        limitationsDesc: 'இது ஒரு முதற்கட்ட பகுப்பாய்வு கருவி மட்டுமே. களத்தில் விவசாய அலுவலர்கள் அல்லது வேளாண் வல்லுநர்களின் ஆலோசனையை பெறவும்.'
      },
      admin: {
        title: 'நிர்வாகியகம்',
        totalPredictions: 'மொத்த கணிப்புகள்',
        totalUsers: 'பயனர்கள்',
        avgConfidence: 'சராசரி துல்லியம்',
        feedbackAccuracy: 'கருத்து துல்லியம்',
        mostDetected: 'அதிகமாக தாக்கிய நோய்கள்',
        cropDistribution: 'பயிர்களின் பரவல்',
        predictionsTrend: 'காலவரிசைப்படி கணிப்புகள்',
        manageDiseases: 'நோய்களை நிர்வகி',
        manageCrops: 'பயிர்களை நிர்வகி',
        feedbackViewer: 'பயனர் கருத்துகள்',
        exportDataset: 'மறுபயிற்சி தரவுத்தொகுப்பை ஏற்றுமதி செய்க (.ZIP)'
      }
    }
  },
  hi: {
    translation: {
      appName: 'CropCare (फसल रक्षक)',
      nav: {
        home: 'होम',
        predict: 'पत्ती की जांच',
        library: 'रोग पुस्तकालय',
        dashboard: 'खेत डैशबोर्ड',
        about: 'प्रोजेक्ट विवरण',
        history: 'जांच इतिहास',
        admin: 'प्रशासन',
        login: 'लॉग इन',
        register: 'पंजीकरण',
        logout: 'लॉग आउट'
      },
      hero: {
        title: 'एआई संचालित सटीक फसल रोग पहचान प्रणाली',
        subtitle: 'डीप लर्निंग और मोबाइलनेट-V2 की मदद से पत्ती के रोगों की तुरंत पहचान करें। ग्रैड-कैम विजुअल हीटमैप और 38 फसल रोगों के उपचार के उपाय जानें।',
        ctaPredict: 'पत्ती की जांच करें',
        ctaLibrary: 'रोग सूची देखें',
        accuracyStat: '98.4% मॉडल सटीकता',
        classesStat: '38 रोग श्रेणियां',
        speedStat: '<1.2 सेकंड त्वरित परिणाम'
      },
      howItWorks: {
        title: 'यह कैसे काम करता है',
        step1Title: '1. पत्ती का फोटो लें या अपलोड करें',
        step1Desc: 'संक्रमित पौधे की पत्ती का स्पष्ट फोटो कैमरे या गैलरी से अपलोड करें।',
        step2Title: '2. डीप लर्निंग विश्लेषण',
        step2Desc: 'सीएनएन मॉडल पत्ती के घावों का अध्ययन कर ग्रैड-कैम हीटमैप तैयार करता है।',
        step3Title: '3. उपचार और सलाह',
        step3Desc: 'रोग की पहचान, जैविक व रासायनिक उपचार और डाउनलोड करने योग्य पीडीएफ रिपोर्ट पाएं।'
      },
      predict: {
        title: 'पत्ती रोग निदान',
        subtitle: 'रोगग्रस्त पत्ती की साफ और अच्छी रोशनी वाली तस्वीर अपलोड करें।',
        tabSingle: 'एकल फोटो',
        tabBatch: 'बैच जांच (5 फोटो तक)',
        dragDrop: 'पत्ती की फोटो यहां खींचकर छोड़ें, या',
        browseFiles: 'फाइल चुनें',
        cameraCapture: 'कैमरे से फोटो खींचें',
        supportedFormats: 'JPG, PNG, WEBP (अधिकतम 5MB)',
        analyzeBtn: 'रोग का पता लगाएं',
        analyzing: 'सीएनएन विश्लेषण जारी है...',
        selectImages: 'चयनित तस्वीरें',
        changeImage: 'फोटो बदलें',
        batchLimitNote: 'एक बार में अधिकतम 5 पत्तियों की जांच की जा सकती है।'
      },
      result: {
        title: 'निदान परिणाम',
        healthyBadge: 'स्वस्थ पत्ता',
        diseaseBadge: 'रोग पाया गया',
        confidenceScore: 'एआई विश्वास स्कोर',
        originalImage: 'मूल पत्ती फोटो',
        gradcamHeatmap: 'ग्रैड-कैम हीटमैप (Grad-CAM)',
        gradcamNote: 'उभारे गए रंगीन क्षेत्र दिखाते हैं कि एआई मॉडल ने कहां ध्यान केंद्रित किया।',
        topPredictions: 'शीर्ष 3 संभावित रोग',
        uncertainTitle: 'अनिश्चित परिणाम',
        uncertainDesc: 'मॉडल इस फोटो के बारे में पूरी तरह आश्वस्त नहीं है। कृपया पत्ती की साफ, अच्छी रोशनी वाली और निकट से ली गई फोटो अपलोड करें।',
        downloadPdf: 'पीडीएफ रिपोर्ट डाउनलोड करें',
        shareResult: 'शेयर करें',
        analyzeAnother: 'अन्य पत्ती की जांच करें',
        feedbackPrompt: 'क्या यह भविष्यवाणी सही थी?',
        feedbackCorrect: 'हाँ, सही है',
        feedbackWrong: 'नहीं, गलत है',
        selectCorrectLabel: 'सही रोग चुनें (यदि पता हो)',
        feedbackSubmitted: 'धन्यवाद! आपकी प्रतिक्रिया भविष्य के एआई मॉडल को बेहतर बनाने में मदद करती है।',
        tabs: {
          overview: 'विवरण',
          symptoms: 'लक्षण',
          causes: 'कारण',
          prevention: 'रोकथाम',
          organic: 'जैविक उपचार',
          chemical: 'रासायनिक दवाएं',
          bestPractices: 'सर्वोत्तम प्रथाएं'
        }
      },
      batch: {
        title: 'बैच जांच परिणाम',
        summaryTitle: 'बैच जांच सारांश',
        totalAnalyzed: 'कुल जांच की गई',
        healthyCount: 'स्वस्थ पत्तियां',
        diseasedCount: 'रोगग्रस्त पत्तियां',
        mostCommon: 'मुख्य रोग'
      },
      history: {
        title: 'आपका जांच इतिहास',
        subtitle: 'पिछली पत्तियों की जांच और पीडीएफ रिपोर्ट देखें।',
        filterStatus: 'सभी स्थितियां',
        filterHealthy: 'केवल स्वस्थ',
        filterDiseased: 'केवल रोगग्रस्त',
        searchPlaceholder: 'फसल या रोग खोजें...',
        emptyTitle: 'कोई रिकॉर्ड नहीं मिला',
        emptyDesc: 'आपने अभी तक कोई पत्ती स्कैन नहीं की है।',
        date: 'तारीख',
        confidence: 'सटीकता',
        actions: 'कार्रवाई',
        viewDetails: 'देखें',
        delete: 'हटाएं'
      },
      library: {
        title: 'पौधा रोग पुस्तकालय',
        subtitle: '14 फसलों के 38 रोगों और स्वस्थ स्थितियों के बारे में जानें।',
        searchPlaceholder: 'रोग, लक्षण या फसल खोजें...',
        allCrops: 'सभी फसलें',
        viewGuide: 'उपचार गाइड देखें'
      },
      about: {
        title: 'सीएनएन मॉडल के बारे में',
        pipelineTitle: 'डीप लर्निंग सीएनएन पाइपलाइन',
        stepInput: '1. पत्ती की छवि (224x224x3)',
        stepConv: '2. कॉन्वोल्यूशन लेयर्स',
        stepRelu: '3. रियेलयू एक्टिवेशन',
        stepPool: '4. स्पेशल पूलिंग',
        stepFeat: '5. बॉटलनेक फीचर्स',
        stepGap: '6. ग्लोबल एवरेज पूलिंग',
        stepDense: '7. फुली कनेक्टेड लेयर',
        stepSoftmax: '8. सॉफ्टमैक्स (38 श्रेणियां)',
        stepFinal: '9. अंतिम परिणाम व हीटमैप',
        explainabilityTitle: 'व्याख्या योग्य एआई (Grad-CAM)',
        explainabilityDesc: 'ग्रैड-कैम तकनीक दिखाती है कि न्यूरल नेटवर्क ने पत्ती के किन विशिष्ट लक्षणों और धब्बों को देखकर यह निर्णय लिया।',
        limitationsTitle: 'कृषि संबंधी सीमाएं',
        limitationsDesc: 'यह उपकरण केवल प्राथमिक जांच के लिए है। खेत में गंभीर संक्रमण की स्थिति में स्थानीय कृषि वैज्ञानिक या विस्तार अधिकारी की सलाह अवश्य लें।'
      },
      admin: {
        title: 'प्रशासन डैशबोर्ड',
        totalPredictions: 'कुल जांच',
        totalUsers: 'कुल उपयोगकर्ता',
        avgConfidence: 'औसत सटीकता',
        feedbackAccuracy: 'प्रतिक्रिया सटीकता',
        mostDetected: 'प्रमुख पाए गए रोग',
        cropDistribution: 'फसलों का वितरण',
        predictionsTrend: 'समय के साथ जांच रुझान',
        manageDiseases: 'रोग प्रबंधन',
        manageCrops: 'फसल प्रबंधन',
        feedbackViewer: 'उपयोगकर्ता प्रतिक्रियाएं',
        exportDataset: 'रिट्रेनिंग डेटासेट निर्यात करें (.ZIP)'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
