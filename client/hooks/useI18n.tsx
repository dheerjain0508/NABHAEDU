import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "en" | "hi" | "pa"; // English, Hindi, Punjabi

type Dict = Record<string, string>;

const en: Dict = {
  brand: "NABHA EDU",
  tagline: "Learn. Grow. Shine.",
  getStarted: "Get Started",
  explore: "Explore",
  attendance: "Attendance",
  downloads: "Downloads",
  complaints: "Concerns",
  mentor: "Mentor Portal",
  management: "Management",
  login: "Login",
  signup: "Sign up",
  logout: "Logout",
  language: "Language",
  theme: "Theme",
  system: "System",
  light: "Light",
  dark: "Dark",
  welcomeTitle: "Welcome to NABHA EDU",
  welcomeSub: "A modern learning community from pre‑primary to Sr. Secondary",
  markAttendance: "Mark Attendance",
  openCamera: "Open Camera",
  capture: "Capture",
  save: "Save",
  yourAttendance: "Your Attendance",
  notes: "Notes",
  videos: "Videos",
  addNote: "Add Note",
  title: "Title",
  url: "URL",
  add: "Add",
  youtubeLink: "YouTube Link",
  addVideo: "Add Video",
  complaintTitle: "Raise a Concern (Confidential)",
  category: "Category",
  student: "Student",
  teacher: "Teacher",
  other: "Other",
  message: "Message",
  submit: "Submit",
  success: "Submitted successfully",
  ncert: "NCERT Books",
  attendanceDesc: "Use your phone or laptop to capture a quick selfie and mark your presence.",
  downloadsDesc: "Access notes, videos, and assignments shared by your mentors.",
  ncertDesc: "Read NCERT books across classes right from your browser.",
  complaintsDesc: "Submit concerns privately. Only management can view submissions.",
  selectSubject: "Select a subject to view notes and online reading options.",
  notesFor: "Notes, sample papers and NCERT materials for {subject}.",
  open: "Open",
  events: "Events",
  calendar: "Calendar",
  noEvents: "No events",
  addEvent: "Add event",
  eventTitle: "Event title",
  eventDate: "Event date",
  eventDesc: "Event description",
  classes: "Classes",
  class: "Class",
  forgot: "Forgot password?",
  emailOrPhone: "Email or Phone",
  password: "Password",
  name: "Name",
  continue: "Continue",
  or: "or",
  withGoogle: "Continue with Google",
  role: "Role",
  studentRole: "Student",
  mentorRole: "Mentor",
  managementRole: "Management",
};

const hi: Dict = {
  brand: "नाभा ईडू",
  tagline: "सीखें. बढ़ें. चमकें.",
  getStarted: "शुरू करें",
  explore: "खोजे���",
  attendance: "उपस्थिति",
  downloads: "डाउनलोड",
  complaints: "शिकायतें",
  mentor: "मेंटोर पोर्टल",
  management: "प्रबंधन",
  login: "लॉगिन",
  signup: "साइन अप",
  logout: "लॉगआउट",
  language: "भाषा",
  theme: "थीम",
  system: "सिस्टम",
  light: "लाइट",
  dark: "डार्क",
  welcomeTitle: "नाभा ईडू में आपका स्वागत है",
  welcomeSub: "प्री-प्राइमरी से सीनियर सेकेंडरी तक का आधुनिक शिक्षण समुदाय",
  markAttendance: "उपस्थिति दर्ज करें",
  openCamera: "कैमरा खोलें",
  capture: "कैप्चर",
  save: "सेव करें",
  yourAttendance: "आपकी उपस्थिति",
  notes: "नोट्स",
  videos: "वीडियो",
  addNote: "नोट जोड���ें",
  title: "शीर्षक",
  url: "लिंक",
  add: "जोड़ें",
  youtubeLink: "यूट्यूब लिंक",
  addVideo: "वीडियो जोड़ें",
  complaintTitle: "शिकायत दर्ज करें (गोपनीय)",
  category: "श्रेणी",
  student: "विद्यार्थी",
  teacher: "शिक्षक",
  other: "अन्य",
  message: "संदेश",
  submit: "जमा करें",
  success: "सफलतापूर्वक जमा हुआ",
  ncert: "एनसीईआरटी किताबें",
  attendanceDesc: "अपने फोन या लैपटॉप से एक त्वरित सेल्फी लेकर अपनी उपस्थिति दर्ज करें।",
  downloadsDesc: "अपने मेंटर्स द्वारा साझा किए गए नोट्स, वीडियो और असाइनमेंट तक पहुंचें।",
  ncertDesc: "अपने ब्राउज़र से कक्षाओं के पार एनसीईआरटी पुस्तकें पढ़ें।",
  complaintsDesc: "गोपनीय रूप से चिंताएँ दर्ज ���रें। केवल प्रबंधन सबमिशन देख सकता है।",
  selectSubject: "नोट्स और ऑनलाइन पढ़ने के विकल्प द��खने के लिए एक विषय चुनें।",
  notesFor: "{subject} के लिए नोट्स, सैंपल पेपर और एनसीईआरटी सामग्री।",
  open: "खोलें",
  events: "इवेंट्स",
  calendar: "कैलेंडर",
  noEvents: "कोई इवेंट नहीं",
  addEvent: "इवेंट जोड़ें",
  eventTitle: "इवेंट शीर्षक",
  eventDate: "इवेंट तारीख",
  eventDesc: "इवेंट विवरण",
  classes: "कक्षाएँ",
  class: "कक्षा",
  forgot: "पासवर्ड भूल गए?",
  emailOrPhone: "ईमेल या फ़ोन",
  password: "पासवर्ड",
  name: "नाम",
  continue: "जारी रखें",
  or: "या",
  withGoogle: "गूगल से जारी रखें",
  role: "भूमिका",
  studentRole: "विद्यार्थी",
  mentorRole: "मेंटोर",
  managementRole: "प्रबंधन",
};

const pa: Dict = {
  brand: "ਨਾਭਾ ਐਡੂ",
  tagline: "ਸਿੱਖੋ. ਵਧੋ. ਚਮਕੋ.",
  getStarted: "ਸ਼ੁਰੂ ਕਰੋ",
  explore: "ਖੋਜੋ",
  attendance: "ਹਾਜ਼ਰੀ",
  downloads: "ਡਾਊਨਲੋਡ",
  complaints: "ਸ਼ਿਕਾਇਤਾਂ",
  mentor: "ਮੈਂਟਰ ਪੋਰਟਲ",
  management: "ਪ੍ਰਬੰਧਨ",
  login: "ਲਾਗਇਨ",
  signup: "ਸਾਈਨ ਅਪ",
  logout: "ਲਾਗਆਉਟ",
  language: "ਭਾਸ਼ਾ",
  theme: "ਥੀਮ",
  system: "ਸਿਸਟਮ",
  light: "ਲਾਈਟ",
  dark: "ਡਾਰਕ",
  welcomeTitle: "ਨਾਭਾ ਐਡੂ ਵਿੱਚ ਸੁਆਗਤ ਹੈ",
  welcomeSub: "ਪ੍ਰੀ-ਪ੍ਰਾਇਮਰੀ ਤੋਂ ਸੀਨੀਅਰ ਸੈਕੰਡਰੀ ਤੱਕ ਆਧੁਨਿਕ ਸਿੱਖਿਆ ਸਮੁਦਾਇ",
  markAttendance: "ਹਾਜ਼ਰੀ ਲਗਾਉ",
  openCamera: "ਕੈਮਰਾ ਖੋਲ੍ਹੋ",
  capture: "ਕੈਪਚਰ",
  save: "ਸੇਵ ਕਰੋ",
  yourAttendance: "ਤੁਹਾਡੀ ਹਾਜ਼ਰੀ",
  notes: "ਨੋਟਸ",
  videos: "ਵੀਡੀਓ",
  addNote: "ਨੋਟ ਜੋੜੋ",
  title: "ਸਿਰਲੇਖ",
  url: "ਲਿੰਕ",
  add: "ਜੋੜੋ",
  youtubeLink: "ਯੂਟਿਊਬ ਲਿੰਕ",
  addVideo: "ਵੀਡੀਓ ਜੋੜੋ",
  complaintTitle: "ਸ਼ਿਕਾਇਤ ਦਰਜ ਕਰੋ (ਗੁਪਤ)",
  category: "ਸ਼੍ਰੇਣੀ",
  student: "ਵਿਦਿਆਰਥੀ",
  teacher: "ਅਧਿਆਪਕ",
  other: "ਹੋਰ",
  message: "ਸੰਦੇਸ਼",
  submit: "ਜਮ੍ਹਾਂ ਕਰੋ",
  success: "ਸਫਲਤਾਪੂਰਵਕ ਜਮ੍ਹਾਂ ਹੋਇਆ",
  ncert: "ਐਨਸੀਈਆਰਟੀ ਕਿਤਾਬਾਂ",
  attendanceDesc: "ਆਪਣਾ ਫ਼ੋਨ ਜਾਂ ਲੈਪਟੌਪ ਵਰਤਕੇ ਇੱਕ ਛੋਟੀ ਸੈਲਫੀ ਖਿੱਚੋ ਅਤੇ ਆਪਣੀ ਹਾਜ਼ਰੀ ਦਰਜ ਕਰੋ।",
  downloadsDesc: "ਆਪਣੇ ਮੈਨਟਰਾਂ ਵੱਲੋਂ ਸਾਂਝੇ ਕੀਤੇ ਨੋਟਸ, ਵੀਡੀਓ ਅਤੇ ਅਸਾਈਨਮੈਂਟ ਤੱਕ ਪਹੁੰਚ ਕਰੋ।",
  ncertDesc: "ਆਪਣੇ ਬ੍ਰਾੁਜ਼ਰ 'ਚੋਂ ਕਲਾਸਾਂ ਦੀਆਂ NCERT ਕਿਤਾਬਾਂ ਪੜ੍ਹੋ।",
  complaintsDesc: "ਚਿੰਤਾਵਾਂ ਗ਼ੈਰ-ਜਨਰਲ ਢੰਗ ਨਾਲ ਜਮ੍ਹਾ ਕਰੋ। ਕੇਵਲ ਪ੍ਰਬੰਧਨ ਸਬਮਿਸ਼ਨ ਵੇਖ ਸਕਦਾ ਹੈ।",
  selectSubject: "ਨੋਟਸ ਅਤੇ ਆਨਲਾਈਨ ਪੜ੍ਹਨ ਦੇ ਵਿਕਲਪ ਵੇਖਣ ਲਈ ਇੱਕ ਵਿਸ਼ਾ ਚੁਣੋ।",
  notesFor: "{subject} ਲਈ ਨੋਟਸ, ਨਮੂਨਾ ਪੇਪਰ ਅਤੇ NCERT ਸਮੱਗਰੀ।",
  open: "ਖੋਲ੍ਹੋ",
  events: "ਘਟਨਾਵਾਂ",
  calendar: "ਕੈਲੇਂਡਰ",
  noEvents: "ਕੋਈ ਘਟਨਾ ਨਹੀਂ",
  addEvent: "ਘਟਨਾ ਜੋੜੋ",
  eventTitle: "ਘਟਨਾ ਸਿਰਲੇਖ",
  eventDate: "ਘਟਨਾ ਦੀ ਤਾਰੀਖ",
  eventDesc: "ਘਟਨਾ ਵੇਰਵਾ",
  classes: "ਕਲਾਸਾਂ",
  class: "ਕਲਾਸ",
  forgot: "ਪਾਸਵਰਡ ਭੁੱਲ ਗਏ?",
  emailOrPhone: "ਈਮੇਲ ਜਾਂ ਫੋਨ",
  password: "ਪਾਸਵਰਡ",
  name: "ਨਾਮ",
  continue: "ਜਾਰੀ ਰੱਖੋ",
  or: "ਜਾਂ",
  withGoogle: "ਗੂਗਲ ਨਾਲ ਜਾਰੀ ਰੱਖੋ",
  role: "ਭੂਮਿਕਾ",
  studentRole: "ਵਿਦਿਆਰਥੀ",
  mentorRole: "ਮੈਂਟਰ",
  managementRole: "ਪ੍ਰਬੰਧਨ",
};

const dicts: Record<Lang, Dict> = { en, hi, pa };

interface I18nValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nValue | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    const saved = window.localStorage.getItem("nabhaedu.lang") as Lang | null;
    return saved || "en";
  });

  useEffect(() => {
    try {
      window.localStorage.setItem("nabhaedu.lang", lang);
    } catch {}
  }, [lang]);

  const t = useMemo(() => {
    const d = dicts[lang] || dicts.en;
    return (key: string) => d[key] ?? dicts.en[key] ?? key;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang: setLangState, t }), [lang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
