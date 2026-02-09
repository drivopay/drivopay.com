"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'hi' | 'te' | 'ta' | 'kn' | 'ml';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

export const languages: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
];

// Translation strings
export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    wallet: 'Wallet',
    earnings: 'Earnings',
    expenses: 'Expenses',
    savings: 'Savings',
    loans: 'Loans',
    settings: 'Settings',

    // Common
    welcome: 'Welcome back',
    signIn: 'Sign in',
    signOut: 'Sign Out',
    getStarted: 'Get started',
    viewAll: 'View all',
    total: 'Total',
    today: 'Today',
    thisWeek: 'This week',
    thisMonth: 'This month',

    // Dashboard
    totalBalance: 'Total Balance',
    todayEarnings: 'Earnings',
    completedRides: 'Completed',
    rides: 'rides',
    quickActions: 'Quick Actions',
    recentTransactions: 'Recent Transactions',

    // Rewards
    rewardsCoupons: 'Rewards & Coupons',
    unlocked: 'Unlocked',
    locked: 'Locked',
    claimReward: 'Claim Reward',

    // Buttons
    withdraw: 'Withdraw',
    receive: 'Receive',
    apply: 'Apply',
    cancel: 'Cancel',
    save: 'Save',

    // Language
    selectLanguage: 'Select Language',
    language: 'Language',
  },
  hi: {
    // Navigation
    dashboard: 'डैशबोर्ड',
    wallet: 'वॉलेट',
    earnings: 'कमाई',
    expenses: 'खर्च',
    savings: 'बचत',
    loans: 'लोन',
    settings: 'सेटिंग्स',

    // Common
    welcome: 'वापसी पर स्वागत है',
    signIn: 'साइन इन करें',
    signOut: 'साइन आउट',
    getStarted: 'शुरू करें',
    viewAll: 'सभी देखें',
    total: 'कुल',
    today: 'आज',
    thisWeek: 'इस सप्ताह',
    thisMonth: 'इस महीने',

    // Dashboard
    totalBalance: 'कुल बैलेंस',
    todayEarnings: 'कमाई',
    completedRides: 'पूर्ण',
    rides: 'राइड्स',
    quickActions: 'त्वरित कार्य',
    recentTransactions: 'हाल की लेनदेन',

    // Rewards
    rewardsCoupons: 'पुरस्कार और कूपन',
    unlocked: 'अनलॉक',
    locked: 'लॉक',
    claimReward: 'पुरस्कार प्राप्त करें',

    // Buttons
    withdraw: 'निकालें',
    receive: 'प्राप्त करें',
    apply: 'आवेदन करें',
    cancel: 'रद्द करें',
    save: 'सहेजें',

    // Language
    selectLanguage: 'भाषा चुनें',
    language: 'भाषा',
  },
  te: {
    // Navigation
    dashboard: 'డాష్‌బోర్డ్',
    wallet: 'వాలెట్',
    earnings: 'ఆదాయం',
    expenses: 'ఖర్చులు',
    savings: 'పొదుపు',
    loans: 'రుణాలు',
    settings: 'సెట్టింగులు',

    // Common
    welcome: 'తిరిగి స్వాగతం',
    signIn: 'సైన్ ఇన్',
    signOut: 'సైన్ అవుట్',
    getStarted: 'ప్రారంభించండి',
    viewAll: 'అన్నీ చూడండి',
    total: 'మొత్తం',
    today: 'ఈరోజు',
    thisWeek: 'ఈ వారం',
    thisMonth: 'ఈ నెల',

    // Dashboard
    totalBalance: 'మొత్తం బ్యాలెన్స్',
    todayEarnings: 'ఆదాయం',
    completedRides: 'పూర్తయినవి',
    rides: 'రైడ్స్',
    quickActions: 'శీఘ్ర చర్యలు',
    recentTransactions: 'ఇటీవలి లావాదేవీలు',

    // Rewards
    rewardsCoupons: 'బహుమతులు & కూపన్లు',
    unlocked: 'అన్‌లాక్ చేయబడింది',
    locked: 'లాక్ చేయబడింది',
    claimReward: 'బహుమతిని పొందండి',

    // Buttons
    withdraw: 'తీసుకోండి',
    receive: 'స్వీకరించండి',
    apply: 'దరఖాస్తు చేయండి',
    cancel: 'రద్దు చేయండి',
    save: 'సేవ్ చేయండి',

    // Language
    selectLanguage: 'భాష ఎంచుకోండి',
    language: 'భాష',
  },
  ta: {
    // Navigation
    dashboard: 'டாஷ்போர்டு',
    wallet: 'வாலட்',
    earnings: 'வருமானம்',
    expenses: 'செலவுகள்',
    savings: 'சேமிப்பு',
    loans: 'கடன்கள்',
    settings: 'அமைப்புகள்',

    // Common
    welcome: 'மீண்டும் வரவேற்கிறோம்',
    signIn: 'உள்நுழைக',
    signOut: 'வெளியேறு',
    getStarted: 'தொடங்குங்கள்',
    viewAll: 'அனைத்தையும் பார்க்க',
    total: 'மொத்தம்',
    today: 'இன்று',
    thisWeek: 'இந்த வாரம்',
    thisMonth: 'இந்த மாதம்',

    // Dashboard
    totalBalance: 'மொத்த இருப்பு',
    todayEarnings: 'வருமானம்',
    completedRides: 'முடிந்தது',
    rides: 'சவாரிகள்',
    quickActions: 'விரைவு செயல்கள்',
    recentTransactions: 'சமீபத்திய பரிவர்த்தனைகள்',

    // Rewards
    rewardsCoupons: 'வெகுமதிகள் & கூப்பன்கள்',
    unlocked: 'திறக்கப்பட்டது',
    locked: 'பூட்டப்பட்டது',
    claimReward: 'வெகுமதியைப் பெறுங்கள்',

    // Buttons
    withdraw: 'எடுக்கவும்',
    receive: 'பெறவும்',
    apply: 'விண்ணப்பிக்கவும்',
    cancel: 'ரத்து செய்',
    save: 'சேமி',

    // Language
    selectLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்',
    language: 'மொழி',
  },
  kn: {
    // Navigation
    dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    wallet: 'ವಾಲೆಟ್',
    earnings: 'ಗಳಿಕೆಗಳು',
    expenses: 'ಖರ್ಚುಗಳು',
    savings: 'ಉಳಿತಾಯ',
    loans: 'ಸಾಲಗಳು',
    settings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',

    // Common
    welcome: 'ಮತ್ತೆ ಸ್ವಾಗತ',
    signIn: 'ಸೈನ್ ಇನ್',
    signOut: 'ಸೈನ್ ಔಟ್',
    getStarted: 'ಪ್ರಾರಂಭಿಸಿ',
    viewAll: 'ಎಲ್ಲವನ್ನೂ ವೀಕ್ಷಿಸಿ',
    total: 'ಒಟ್ಟು',
    today: 'ಇಂದು',
    thisWeek: 'ಈ ವಾರ',
    thisMonth: 'ಈ ತಿಂಗಳು',

    // Dashboard
    totalBalance: 'ಒಟ್ಟು ಬ್ಯಾಲೆನ್ಸ್',
    todayEarnings: 'ಗಳಿಕೆಗಳು',
    completedRides: 'ಪೂರ್ಣಗೊಂಡಿದೆ',
    rides: 'ರೈಡ್‌ಗಳು',
    quickActions: 'ತ್ವರಿತ ಕ್ರಮಗಳು',
    recentTransactions: 'ಇತ್ತೀಚಿನ ವಹಿವಾಟುಗಳು',

    // Rewards
    rewardsCoupons: 'ಬಹುಮಾನಗಳು & ಕೂಪನ್‌ಗಳು',
    unlocked: 'ಅನ್‌ಲಾಕ್ ಮಾಡಲಾಗಿದೆ',
    locked: 'ಲಾಕ್ ಮಾಡಲಾಗಿದೆ',
    claimReward: 'ಬಹುಮಾನ ಪಡೆಯಿರಿ',

    // Buttons
    withdraw: 'ಹಿಂಪಡೆಯಿರಿ',
    receive: 'ಸ್ವೀಕರಿಸಿ',
    apply: 'ಅನ್ವಯಿಸಿ',
    cancel: 'ರದ್ದುಮಾಡಿ',
    save: 'ಉಳಿಸಿ',

    // Language
    selectLanguage: 'ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    language: 'ಭಾಷೆ',
  },
  ml: {
    // Navigation
    dashboard: 'ഡാഷ്ബോർഡ്',
    wallet: 'വാലറ്റ്',
    earnings: 'വരുമാനം',
    expenses: 'ചെലവുകൾ',
    savings: 'സമ്പാദ്യം',
    loans: 'വായ്പകൾ',
    settings: 'സെറ്റിംഗുകൾ',

    // Common
    welcome: 'തിരിച്ചു വരവ്',
    signIn: 'സൈൻ ഇൻ',
    signOut: 'സൈൻ ഔട്ട്',
    getStarted: 'ആരംഭിക്കുക',
    viewAll: 'എല്ലാം കാണുക',
    total: 'ആകെ',
    today: 'ഇന്ന്',
    thisWeek: 'ഈ ആഴ്ച',
    thisMonth: 'ഈ മാസം',

    // Dashboard
    totalBalance: 'മൊത്തം ബാലൻസ്',
    todayEarnings: 'വരുമാനം',
    completedRides: 'പൂർത്തിയായി',
    rides: 'യാത്രകൾ',
    quickActions: 'പെട്ടെന്നുള്ള പ്രവർത്തനങ്ങൾ',
    recentTransactions: 'സമീപകാല ഇടപാടുകൾ',

    // Rewards
    rewardsCoupons: 'പുരസ്കാരങ്ങളും കൂപ്പണുകളും',
    unlocked: 'അൺലോക്ക് ചെയ്തു',
    locked: 'ലോക്ക് ചെയ്തു',
    claimReward: 'പുരസ്കാരം നേടുക',

    // Buttons
    withdraw: 'എടുക്കുക',
    receive: 'സ്വീകരിക്കുക',
    apply: 'അപേക്ഷിക്കുക',
    cancel: 'റദ്ദാക്കുക',
    save: 'സേവ് ചെയ്യുക',

    // Language
    selectLanguage: 'ഭാഷ തിരഞ്ഞെടുക്കുക',
    language: 'ഭാഷ',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  currentLanguage: LanguageOption;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const stored = localStorage.getItem('drivopay_language');
    if (stored && languages.find(l => l.code === stored)) {
      setLanguageState(stored as Language);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('drivopay_language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  const currentLanguage = languages.find(l => l.code === language) || languages[0];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, currentLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
