import React, { useState, useMemo, useEffect } from 'react';
import {
  Mic,
  Feather,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ArrowRight,
  Globe,
  Building2,
  MapPin,
  Mail,
  Phone,
  User,
  MessageSquare,
  RefreshCw,
  ExternalLink,
  Lock,
  CheckCheck,
  CreditCard,
  Smartphone,
  Hash,
  Send,
  Calendar,
  Monitor,
  Laptop,
  Wifi,
  WifiOff,
  Languages,
} from 'lucide-react';
import { BANGLADESH_DIVISIONS } from './data/bangladeshGeo';

type Language = 'bn' | 'en';
type PackageId = 'pkg_6m' | 'pkg_12m';
type PaymentVerificationType = 'trx_id' | 'phone_digits';
type WindowsVersion = 'win11' | 'win10' | 'win7' | '';
type WifiStatus = 'yes' | 'no' | '';

const DEMO_BKASH_NUMBER = '01700-000000';

function getPublicApiUrl(): string {
  const envUrl = (import.meta as any).env?.VITE_CONTROL_API_ORIGIN;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim()) {
    return `${envUrl.trim().replace(/\/+$/, '')}/v1/public/register-interest`;
  }
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return 'http://127.0.0.1:8787/v1/public/register-interest';
  }
  return 'https://voice-api.trustedsubstore.com/v1/public/register-interest';
}

interface BrandMorphEyebrowProps {
  lang: Language;
}

function BrandMorphEyebrow({ lang }: BrandMorphEyebrowProps) {
  const [isMerged, setIsMerged] = useState(true);

  useEffect(() => {
    // Snappy, energetic rhythm so visitors feel the transformation:
    // 2.2s on TYPOMATIC (grand brand view), 1.6s on TYPE + AUTOMATIC (equation view)
    const timeout = setTimeout(() => {
      setIsMerged((prev) => !prev);
    }, isMerged ? 2200 : 1600);

    return () => clearTimeout(timeout);
  }, [isMerged]);

  return (
    <div
      onClick={() => setIsMerged((prev) => !prev)}
      title={lang === 'bn' ? 'ক্লিক করে পরিবর্তন দেখুন: Type + Automatic = Typomatic' : 'Click to toggle animation: Type + Automatic = Typomatic'}
      className="group cursor-pointer inline-flex items-center justify-center select-none h-8 sm:h-9 relative px-2"
    >
      {/* Left Accent Bar */}
      <span
        style={{
          width: isMerged ? '24px' : '0px',
          opacity: isMerged ? 0.85 : 0,
          marginRight: isMerged ? '10px' : '0px',
        }}
        className="h-0.5 rounded-full transition-all duration-300 ease-out bg-gradient-to-r from-transparent to-teal-600 shrink-0"
      />

      {/* Morphing Wordmark - Strictly single horizontal line, zero height shift */}
      <span className="brand-morph-tag text-xs sm:text-sm md:text-base text-teal-700">
        {/* TYP (Always visible root) */}
        <span className="transition-colors duration-200">TYP</span>

        {/* E (Folds away when merged) */}
        <span
          style={{
            maxWidth: isMerged ? '0px' : '15px',
            opacity: isMerged ? 0 : 1,
            transform: isMerged ? 'translateX(-4px)' : 'translateX(0)',
          }}
          className="brand-morph-collapsible text-emerald-600"
        >
          E
        </span>

        {/* + (Folds away when merged) */}
        <span
          style={{
            maxWidth: isMerged ? '0px' : '18px',
            opacity: isMerged ? 0 : 1,
            transform: isMerged ? 'scale(0.3)' : 'scale(1)',
            marginLeft: isMerged ? '0px' : '5px',
            marginRight: isMerged ? '0px' : '5px',
          }}
          className="brand-morph-collapsible text-teal-500 font-extrabold"
        >
          +
        </span>

        {/* AUT (Folds away when merged) */}
        <span
          style={{
            maxWidth: isMerged ? '0px' : '40px',
            opacity: isMerged ? 0 : 1,
            transform: isMerged ? 'translateX(4px)' : 'translateX(0)',
          }}
          className="brand-morph-collapsible text-cyan-600"
        >
          AUT
        </span>

        {/* OMATIC (Always visible suffix) */}
        <span className="transition-colors duration-200">OMATIC</span>
      </span>

      {/* Right Accent Bar */}
      <span
        style={{
          width: isMerged ? '24px' : '0px',
          opacity: isMerged ? 0.85 : 0,
          marginLeft: isMerged ? '10px' : '0px',
        }}
        className="h-0.5 rounded-full transition-all duration-300 ease-out bg-gradient-to-r from-teal-600 to-transparent shrink-0"
      />
    </div>
  );
}

export function RegisterPortal() {
  const [lang, setLang] = useState<Language>('bn');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    requestId: string;
    message: string;
    packageId: PackageId;
    paymentType: PaymentVerificationType;
    refDetail: string;
    windowsVersionLabel: string;
    wifiStatusLabel: string;
  } | null>(null);
  const [copiedId, setCopiedId] = useState(false);
  const [copiedBkash, setCopiedBkash] = useState(false);

  // Form Fields - Step 1: Personal Info
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');

  // Form Fields - Step 2: Location
  const [selectedDivision, setSelectedDivision] = useState('dhaka');
  const [selectedDistrict, setSelectedDistrict] = useState('dhaka');
  const [selectedUpazila, setSelectedUpazila] = useState('mirpur');
  const [customUpazila, setCustomUpazila] = useState('');

  // Form Fields - Step 3: PC Specifications (Windows & WiFi)
  const [windowsVersion, setWindowsVersion] = useState<WindowsVersion>('win11');
  const [hasWifi, setHasWifi] = useState<WifiStatus>('yes');

  // Form Fields - Step 4: Package
  const [selectedPackage, setSelectedPackage] = useState<PackageId>('pkg_12m');

  // Form Fields - Step 5: Payment
  const [paymentVerificationType, setPaymentVerificationType] = useState<PaymentVerificationType>('trx_id');
  const [transactionId, setTransactionId] = useState('');
  const [senderLastDigits, setSenderLastDigits] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('4000');
  const [userNote, setUserNote] = useState('');
  const [consent, setConsent] = useState(false);

  // Honeypot field
  const [website, setWebsite] = useState('');

  // Keep browser tab and link viewer title in sync with current language
  useEffect(() => {
    document.title =
      lang === 'bn'
        ? 'Typomatic — শুধু ভয়েস টাইপিং নয়, লেখালেখির সম্পূর্ণ স্মার্ট সমাধান! | HM Innovations'
        : 'Typomatic — Not Just Voice Typing, Complete Smart Writing Suite! | HM Innovations';
  }, [lang]);

  // Derived Geographic Options
  const currentDivision = useMemo(() => {
    return BANGLADESH_DIVISIONS.find((d) => d.id === selectedDivision) || BANGLADESH_DIVISIONS[0];
  }, [selectedDivision]);

  const districtList = useMemo(() => {
    return currentDivision.districts;
  }, [currentDivision]);

  const currentDistrict = useMemo(() => {
    return districtList.find((d) => d.id === selectedDistrict) || districtList[0];
  }, [districtList, selectedDistrict]);

  const upazilaList = useMemo(() => {
    return currentDistrict ? currentDistrict.upazilas : [];
  }, [currentDistrict]);

  // Handle Division change: cascade to first district and upazila
  const handleDivisionChange = (divId: string) => {
    setSelectedDivision(divId);
    const divObj = BANGLADESH_DIVISIONS.find((d) => d.id === divId);
    if (divObj && divObj.districts.length > 0) {
      const firstDist = divObj.districts[0];
      setSelectedDistrict(firstDist.id);
      if (firstDist.upazilas.length > 0) {
        setSelectedUpazila(firstDist.upazilas[0].id);
      } else {
        setSelectedUpazila('');
      }
    }
  };

  // Handle District change: cascade to first upazila
  const handleDistrictChange = (distId: string) => {
    setSelectedDistrict(distId);
    const distObj = districtList.find((d) => d.id === distId);
    if (distObj && distObj.upazilas.length > 0) {
      setSelectedUpazila(distObj.upazilas[0].id);
    } else {
      setSelectedUpazila('');
    }
  };

  // Sync payment amount when package changes
  const handlePackageChange = (pkgId: PackageId) => {
    setSelectedPackage(pkgId);
    setPaymentAmount(pkgId === 'pkg_12m' ? '4000' : '2250');
  };

  const t = {
    badge: lang === 'bn' ? 'এইচএম ইনোভেশনস • অফিশিয়াল আর্লি অ্যাক্সেস ও প্রি-রেজিস্ট্রেশন' : 'HM Innovations • Official Early Access & Pre-Registration',
    brandName: 'Typomatic',
    title:
      lang === 'bn'
        ? 'শুধু ভয়েস টাইপিং নয়, লেখালেখির সম্পূর্ণ স্মার্ট সমাধান!'
        : 'Not Just Voice Typing — The Complete Smart Writing Suite!',
    subtitle:
      lang === 'bn'
        ? 'কিবোর্ডে টাইপ করার ঝামেলা, বানান সংশোধন কিংবা বিভিন্ন ভাষার ফন্ট নিয়ন্ত্রণ নিয়ে আর চিন্তা নয়। বাংলা, আরবি, ইংরেজি, উর্দু ও ফার্সি ভাষায় লেখালেখির প্রয়োজনীয় সব সুবিধা এবার এক সফটওয়্যারেই।'
        : 'No more worries about keyboard typing hassle, spell checking, or managing fonts of different languages. All essential writing features in Bengali, Arabic, English, Urdu, and Persian now in one single software.',
    hookTitle:
      lang === 'bn'
        ? 'লেখালেখি হোক আরও সহজ, দ্রুত ও নির্ভুল!'
        : 'Make Your Writing Easier, Faster & Flawless!',
    hookSubtitle:
      lang === 'bn'
        ? 'কম সময়, কম পরিশ্রম এবং এক সফটওয়্যারে বহুভাষিক লেখালেখির স্মার্ট অভিজ্ঞতা।'
        : 'Less time, less effort, and an intelligent multilingual writing experience — all in one software.',
    featuresSectionTitle:
      lang === 'bn' ? 'Typomatic - এর বিশেষ ফিচারসমূহ' : 'Typomatic Key Features',
    formHeader: lang === 'bn' ? 'রেজিস্ট্রেশন ও সাবস্ক্রিপশন ফরম' : 'Registration & Subscription Form',
    formNote:
      lang === 'bn'
        ? 'গুরুত্বপূর্ণ বিজ্ঞপ্তি: আপনার আবেদন ও বিকাশ পেমেন্ট তথ্য সাবমিট করার পর আমাদের অ্যাডমিন টিম তা দ্রুত পর্যালোচনা করে আপনার সাথে হোয়াটসঅ্যাপ বা ফোনে যোগাযোগ করে সফটওয়্যার অ্যাক্টিভেশন কী বুঝিয়ে দেবে।'
        : 'Important: Once submitted, our authorized administrative team verifies your bKash payment and reaches out via WhatsApp or phone with your official activation key and installation package.',
    metrics: [
      {
        value: 'আনলিমিটেড',
        valueEn: 'Unlimited',
        labelBn: 'ভয়েস টাইপিং ও কমান্ড',
        labelEn: 'Voice Typing & Commands',
        descBn: 'সীমাহীন ভয়েস টেক্সট ও দ্রুত ফরম্যাটিং',
        descEn: 'Continuous speech & instant formatting',
      },
      {
        value: '১-ক্লিকে',
        valueEn: '1-Click',
        labelBn: 'স্বয়ংক্রিয় বানান সংশোধন',
        labelEn: 'Auto Correction',
        descBn: 'টাইপিং ভুল ও অসংগতি নিমিষেই দূর',
        descEn: 'Fix typographical errors instantly',
      },
      {
        value: '৫টি ভাষা',
        valueEn: '5 Languages',
        labelBn: 'স্মার্ট ফন্ট কন্ট্রোল',
        labelEn: 'Smart Font Control',
        descBn: 'বাংলা, আরবি, ইংরেজি, উর্দু ও ফার্সি',
        descEn: 'Bengali, Arabic, English, Urdu & Persian',
      },
      {
        value: '১০০%',
        valueEn: '100%',
        labelBn: 'নিরাপদ ডিভাইস বাইন্ডিং',
        labelEn: 'Hardware Security',
        descBn: 'এনক্রিপ্টেড সেশন ও ডেটা প্রাইভেসি',
        descEn: 'Fail-closed single-device session',
      },
    ],
    languagesList: [
      { label: 'বাংলা', sub: 'Bengali' },
      { label: 'العربية', sub: 'Arabic' },
      { label: 'English', sub: 'English' },
      { label: 'اردو', sub: 'Urdu' },
      { label: 'فارسی', sub: 'Persian' },
    ],
    features: [
      {
        icon: Mic,
        badgeBn: 'ভয়েস ও কমান্ড',
        badgeEn: 'Voice & Commands',
        title:
          lang === 'bn'
            ? '১. Unlimited Voice Typing & Voice Commands'
            : '1. Unlimited Voice Typing & Voice Commands',
        desc:
          lang === 'bn'
            ? 'কোনো সীমাবদ্ধতা ছাড়াই ভয়েসের মাধ্যমে দ্রুত লিখুন। ভয়েস কমান্ড ব্যবহার করে লেখার প্রয়োজনীয় ফরম্যাটিং ও কমান্ড দিন এক নিমিষেই।'
            : 'Speak and write rapidly without any restrictions. Use intuitive voice commands to format, structure, and control text instantaneously.',
      },
      {
        icon: CheckCheck,
        badgeBn: '১-ক্লিকে সংশোধন',
        badgeEn: '1-Click Fix',
        title:
          lang === 'bn'
            ? '২. One-Click Auto Correction'
            : '2. One-Click Auto Correction',
        desc:
          lang === 'bn'
            ? 'ভয়েস টাইপিংয়ের সাধারণ বানান ভুল ও অসংগতি দূর করুন মাত্র এক ক্লিকে।'
            : 'Eliminate voice typing typographical errors, phonetic slips, and syntax discrepancies with just a single click.',
      },
      {
        icon: Languages,
        badgeBn: 'বহুভাষিক ফন্ট',
        badgeEn: 'Multilingual Font',
        title:
          lang === 'bn'
            ? '৩. Smart Font Control'
            : '3. Smart Font Control',
        desc:
          lang === 'bn'
            ? 'একই ফাইলে বাংলা, আরবি, ইংরেজি, উর্দু ও ফার্সি ভাষা ব্যবহার করুন নির্বিঘ্নে - ফন্ট পরিবর্তনের কোনো বাড়তি ঝামেলা ছাড়াই।'
            : 'Seamlessly write Bengali, Arabic, English, Urdu, and Persian in the same file without the hassle of manual font switching.',
      },
      {
        icon: Feather,
        badgeBn: 'ক্যালিগ্রাফি শর্টকাট',
        badgeEn: 'Calligraphy Shortcuts',
        title:
          lang === 'bn'
            ? '৪. Quick Arabic Shortcuts'
            : '4. Quick Arabic Shortcuts',
        desc:
          lang === 'bn'
            ? 'প্রয়োজনীয় আরবি শব্দ, বহুল ব্যবহৃত বাক্যাংশ ও নান্দনিক ক্যালিগ্রাফিক টেক্সটগুলো ডকুমেন্টে যুক্ত করুন তাৎক্ষণিকভাবে।'
            : 'Insert essential Arabic words, frequently used religious phrases, and authentic calligraphic ligatures into documents instantly.',
      },
    ],
    step1Title: lang === 'bn' ? '১. আপনার মৌলিক তথ্য' : '1. Personal Details',
    step2Title: lang === 'bn' ? '২. আপনার অবস্থান ও জেলা/উপজেলা' : '2. Location & Address',
    step3Title: lang === 'bn' ? '৩. কম্পিউটার ও ইন্টারনেট স্পেসিফিকেশন' : '3. PC & Internet Specifications',
    step4Title: lang === 'bn' ? '৪. প্যাকেজ নির্বাচন করুন' : '4. Choose Your Package',
    step5Title: lang === 'bn' ? '৫. বিকাশ পেমেন্ট ও তথ্য নিশ্চিতকরণ' : '5. bKash Payment & Verification',
    packages: {
      pkg_6m: {
        id: 'pkg_6m' as PackageId,
        title: lang === 'bn' ? '৬ মাসের প্যাকেজ' : '6 Months Package',
        duration: lang === 'bn' ? '৬ মাস মেয়াদী লাইসেন্স' : '6 Months Full License',
        price: '2250',
        priceDisplay: lang === 'bn' ? '২২৫০ টাকা' : '2,250 BDT',
        features: [
          lang === 'bn' ? 'সম্পূর্ণ টাইপোম্যাটিক প্রো লাইসেন্স' : 'Full Typomatic Pro Suite Access',
          lang === 'bn' ? 'আনলিমিটেড ভয়েস টাইপিং ও ভয়েস কমান্ড' : 'Unlimited Voice Typing & Commands',
          lang === 'bn' ? 'বাংলা, আরবি, ইংরেজি, উর্দু ও ফার্সি ফন্ট কন্ট্রোল' : '5-Language Font Control',
          lang === 'bn' ? 'ওয়ান-ক্লিক অটো কারেকশন সুবিধা' : 'One-Click Auto Correction',
          lang === 'bn' ? 'কুইক আরবি ও ইসলামিক ক্যালিগ্রাফি শর্টকাট' : 'Quick Arabic Calligraphy Shortcuts',
          lang === 'bn' ? '৬ মাসের ফ্রি আপডেট ও সাপোর্ট' : '6 Months Regular Updates & Support',
          lang === 'bn' ? '১টি পিসির জন্য লাইসেন্স কি' : 'Single PC License Activation',
        ],
      },
      pkg_12m: {
        id: 'pkg_12m' as PackageId,
        title: lang === 'bn' ? '১২ মাসের প্যাকেজ (১ বছর)' : '12 Months (1 Year Package)',
        duration: lang === 'bn' ? '১২ মাস / ১ বছর মেয়াদী লাইসেন্স' : '12 Months / 1 Year License',
        price: '4000',
        priceDisplay: lang === 'bn' ? '৪০০০ টাকা' : '4,000 BDT',
        originalPrice: lang === 'bn' ? '৪৫০০ টাকা' : '4,500 BDT',
        badge: lang === 'bn' ? 'সর্বোচ্চ সাশ্রয়ী • ৫০০ টাকা ছাড়' : 'Best Value • Save 500 BDT',
        features: [
          lang === 'bn' ? 'সম্পূর্ণ টাইপোম্যাটিক প্রো লাইসেন্স' : 'Full Typomatic Pro Suite Access',
          lang === 'bn' ? 'আনলিমিটেড ভয়েস টাইপিং ও অ্যাডভান্সড ভয়েস কমান্ড' : 'Unlimited Voice Typing & Commands',
          lang === 'bn' ? 'বাংলা, আরবি, ইংরেজি, উর্দু ও ফার্সি ফুল ফন্ট সাপোর্ট' : 'Full 5-Language Font Support',
          lang === 'bn' ? 'স্মার্ট ওয়ান-ক্লিক অটো কারেকশন' : 'One-Click Auto Correction',
          lang === 'bn' ? '৫০০+ প্রামাণ্য আরবি ক্যালিগ্রাফি ও দরুদ শর্টকাট' : '500+ Arabic Calligraphy Shortcuts',
          lang === 'bn' ? '১ বছরের সার্বক্ষণিক প্রায়োরিটি ভিআইপি সাপোর্ট' : '1 Year Priority VIP Updates & Support',
          lang === 'bn' ? '১টি পিসির জন্য লাইসেন্স কি' : 'Single PC License Activation',
        ],
      },
    },
    fields: {
      fullName: lang === 'bn' ? 'আপনার পূর্ণ নাম' : 'Full Name',
      fullNamePlaceholder: lang === 'bn' ? 'যেমন: মো: হাফিজুর রহমান' : 'e.g. Md. Hafizur Rahman',
      email: lang === 'bn' ? 'ইমেইল ঠিকানা' : 'Email Address',
      emailPlaceholder: lang === 'bn' ? 'name@example.com' : 'user@example.com',
      phone: lang === 'bn' ? 'মোবাইল / হোয়াটসঅ্যাপ নম্বর' : 'Phone / WhatsApp Number',
      phonePlaceholder: lang === 'bn' ? '+8801XXXXXXXXX' : '+8801712345678',
      company: lang === 'bn' ? 'প্রতিষ্ঠান / মাদ্রাসা / পেশা (ঐচ্ছিক)' : 'Institution / Madrashah / Profession (Optional)',
      companyPlaceholder: lang === 'bn' ? 'যেমন: জামিয়া ইসলামিয়া মেহেরপুর' : 'e.g. Jamia Islamia Meherpur',
      division: lang === 'bn' ? 'বিভাগ' : 'Division',
      district: lang === 'bn' ? 'জেলা' : 'District',
      upazila: lang === 'bn' ? 'উপজেলা / থানা' : 'Upazila / Thana',
      customUpazilaPlaceholder: lang === 'bn' ? 'আপনার থানা বা এলাকার নাম লিখুন...' : 'Enter your specific upazila/thana name...',
      
      // Step 3: PC & WiFi
      windowsTitle: lang === 'bn' ? 'আপনার কম্পিউটারের অপারেটিং সিস্টেম (উইন্ডোজ)' : 'Your PC Operating System (Windows)',
      windowsDesc: lang === 'bn' ? 'সফটওয়্যারের উপযুক্ত সংস্করণ ও লাইব্রেরি কনফিগার করতে এটি আবশ্যক।' : 'Required to ensure proper desktop runtime compatibility.',
      win11Title: 'Windows 11',
      win11Badge: lang === 'bn' ? 'সুপারিশকৃত' : 'Recommended',
      win11Desc: lang === 'bn' ? 'আধুনিক ৬৪-বিট সংস্করণ' : 'Modern 64-bit Edition',
      win10Title: 'Windows 10',
      win10Badge: lang === 'bn' ? 'সুপারিশকৃত' : 'Recommended',
      win10Desc: lang === 'bn' ? 'স্ট্যান্ডার্ড ৬৪-বিট সংস্করণ' : 'Standard 64-bit Edition',
      win7Title: 'Windows 7',
      win7Desc: lang === 'bn' ? 'উইন্ডোজ ৭ (বেসিক সাপোর্ট)' : 'Legacy Basic Support',

      wifiTitle: lang === 'bn' ? 'আপনার কম্পিউটারে ওয়াইফাই বা ইন্টারনেট সংযোগ আছে কি?' : 'Does your PC have WiFi or Internet access?',
      wifiDesc: lang === 'bn' ? 'ভয়েস মডেল ডাউনলোড ও লাইসেন্স সেটআপের জন্য এটি জানা প্রয়োজন।' : 'Used for speech model setup & license activation verification.',
      wifiYesTitle: lang === 'bn' ? 'হ্যাঁ, ওয়াইফাই / ব্রডব্যান্ড আছে' : 'Yes, have WiFi / Broadband',
      wifiYesDesc: lang === 'bn' ? 'সার্বক্ষণিক বা নিয়মিত ইন্টারনেট সংযোগ রয়েছে' : 'Continuous or regular internet access',
      wifiNoTitle: lang === 'bn' ? 'না, ওয়াইফাই নেই' : 'No WiFi Available',
      wifiNoDesc: lang === 'bn' ? 'মোবাইল ডেটা / মাঝে মাঝে বা অফলাইনে কাজ করি' : 'Mobile hotspot or offline workflow',

      bkashSendMoneyTitle: lang === 'bn' ? 'বিকাশ Send Money নির্দেশনা (Personal Account)' : 'bKash Send Money Guide (Personal)',
      bkashNumberLabel: lang === 'bn' ? 'বিকাশ নম্বর (Send Money):' : 'bKash Number (Send Money):',
      bkashCopy: lang === 'bn' ? 'নম্বর কপি করুন' : 'Copy Number',
      bkashCopied: lang === 'bn' ? 'কপি হয়েছে' : 'Copied',
      bkashStep1:
        lang === 'bn'
          ? 'আপনার বিকাশ অ্যাপ ওপেন করে "Send Money" নির্বাচন করুন।'
          : 'Open your bKash App and tap on "Send Money".',
      bkashStep2:
        lang === 'bn'
          ? `উপরের ডেমো বিকাশ নম্বরে নির্বাচিত প্যাকেজের টাকা পাঠান:`
          : `Send the package fee to the demo bKash number above:`,
      bkashStep3:
        lang === 'bn'
          ? 'টাকা পাঠানোর পর প্রাপ্ত ট্রানজেকশন আইডি (TrxID) দিন অথবা আপনার বিকাশ নম্বরের শেষ ৩ ডিজিট দিয়ে সাবমিট করুন।'
          : 'After sending money, provide the Transaction ID (TrxID) or your bKash number last 3 digits below.',
      verificationOptionA: lang === 'bn' ? 'আমার কাছে ট্রানজেকশন আইডি (TrxID) আছে' : 'I have a Transaction ID (TrxID)',
      verificationOptionB: lang === 'bn' ? 'ট্রানজেকশন আইডি নেই / মনে নেই' : 'Don\'t have TrxID (Number & Amount)',
      trxIdLabel: lang === 'bn' ? 'বিকাশ ট্রানজেকশন আইডি (TrxID)' : 'bKash Transaction ID (TrxID)',
      trxIdPlaceholder: lang === 'bn' ? 'যেমন: BL83K9LPQ1' : 'e.g. BL83K9LPQ1',
      lastDigitsLabel: lang === 'bn' ? 'বিকাশ নম্বরের শেষ ৩ ডিজিট' : 'Last 3 Digits of bKash Number',
      lastDigitsPlaceholder: lang === 'bn' ? 'যেমন: 789' : 'e.g. 789',
      amountSentLabel: lang === 'bn' ? 'প্রেরিত টাকার পরিমাণ (টাকা)' : 'Amount Sent (BDT)',
      amountSentPlaceholder: lang === 'bn' ? 'যেমন: ২২৫০ বা ৪০০০' : 'e.g. 2250 or 4000',
      message: lang === 'bn' ? 'অতিরিক্ত বার্তা বা কোনো বিশেষ প্রয়োজন (ঐচ্ছিক)' : 'Additional Message or Specific Notes (Optional)',
      messagePlaceholder:
        lang === 'bn'
          ? 'আপনার প্রতিদিনের টাইপিং প্রয়োজন বা সফটওয়্যার ব্যবহারের উদ্দেশ্য সম্পর্কে জানাতে পারেন...'
          : 'Briefly tell us about your daily typing workload or specific workflow needs...',
      consent:
        lang === 'bn'
          ? 'আমি নিশ্চিত করছি যে প্রদত্ত তথ্য ও বিকাশ পেমেন্ট বিবরণ সঠিক এবং টাইপোম্যাটিক টিমকে আমার সাথে যোগাযোগ ও লাইসেন্স হস্তান্তরের সম্মতি দিচ্ছি।'
          : 'I confirm that the provided information and bKash payment details are accurate and agree to be contacted for onboarding.',
      submit: lang === 'bn' ? 'রেজিস্ট্রেশন ও পেমেন্ট তথ্য জমা দিন' : 'Submit Registration & Payment Details',
      submitting: lang === 'bn' ? 'যাচাই ও জমা দেওয়া হচ্ছে...' : 'Verifying & Submitting...',
      privacyReassurance:
        lang === 'bn'
          ? 'আপনার তথ্য ১০০% সুরক্ষিত • কোনো গোপন চার্জ নেই • অ্যাডমিন টিম ভেরিফাই করে সরাসরি লাইসেন্স প্রদান করবে'
          : '100% Data Confidentiality • No Hidden Charges • Direct Admin License Delivery',
    },
    success: {
      title: lang === 'bn' ? 'আপনার আবেদন ও পেমেন্ট তথ্য সফলভাবে গৃহীত হয়েছে!' : 'Registration & Payment Details Received!',
      subtitle:
        lang === 'bn'
          ? 'টাইপোম্যাটিক-এ সাবস্ক্রাইব করার জন্য আন্তরিক ধন্যবাদ। আপনার পেমেন্ট ও তথ্য পর্যালোচনার জন্য অ্যাডমিন প্যানেলে তালিকাভুক্ত হয়েছে।'
          : 'Thank you for choosing Typomatic. Your payment and registration have been logged for priority administrative onboarding.',
      status: lang === 'bn' ? 'স্ট্যাটাস: পেমেন্ট ভেরিফিকেশন ও পর্যালোচনায় অপেক্ষমাণ (PENDING)' : 'Status: Under Admin Review & Verification (PENDING)',
      refId: lang === 'bn' ? 'আপনার ট্র্যাকিং রেফারেন্স আইডি:' : 'Your Tracking Reference ID:',
      packageChosen: lang === 'bn' ? 'নির্বাচিত প্যাকেজ:' : 'Selected Package:',
      pcSpecsLabel: lang === 'bn' ? 'পিসি ও সংযোগ বিবরণ:' : 'PC & Connectivity:',
      paymentDetailsLabel: lang === 'bn' ? 'প্রদত্ত পেমেন্ট বিবরণ:' : 'Payment Verification Info:',
      step1Title: lang === 'bn' ? '১. পেমেন্ট ও তথ্য ভেরিফিকেশন' : '1. bKash Payment & Info Verification',
      step1Desc: lang === 'bn' ? 'আমাদের অ্যাডমিন টিম বিকাশ স্টেটমেন্টের সাথে আপনার তথ্য মিলিয়ে নেবে।' : 'Our admin team cross-checks your bKash transaction or phone digits with statement.',
      step2Title: lang === 'bn' ? '২. সরাসরি হোয়াটসঅ্যাপ / ফোন যোগাযোগ' : '2. Administrative Outreach',
      step2Desc: lang === 'bn' ? 'ভেরিফিকেশন সম্পন্ন হলে আপনার সাথে হোয়াটসঅ্যাপে সরাসরি যোগাযোগ করা হবে।' : 'Once verified, our team will message you directly on WhatsApp to confirm details.',
      step3Title: lang === 'bn' ? '৩. ডেস্কটপ লাইসেন্স কি ও সেটআপ গাইড' : '3. Desktop License Key Delivery',
      step3Desc: lang === 'bn' ? 'আপনার পিসির জন্য লাইসেন্স অ্যাক্টিভেশন কোড ও সফটওয়্যার সেটআপ গাইড বুঝিয়ে দেওয়া হবে।' : 'Your official hardware-bound license activation key will be securely delivered.',
      buttonReset: lang === 'bn' ? 'আরেকটি আবেদন জমা দিন' : 'Submit Another Request',
    },
  };

  const handleCopyBkash = () => {
    navigator.clipboard.writeText(DEMO_BKASH_NUMBER.replace('-', ''));
    setCopiedBkash(true);
    setTimeout(() => setCopiedBkash(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Client-side quick checks
    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMessage(lang === 'bn' ? 'অনুগ্রহ করে আপনার সঠিক পূর্ণ নাম লিখুন (কমপক্ষে ২ অক্ষর)।' : 'Please enter your full name (at least 2 characters).');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setErrorMessage(lang === 'bn' ? 'অনুগ্রহ করে একটি সঠিক ইমেইল ঠিকানা দিন।' : 'Please enter a valid email address.');
      return;
    }
    const cleanPhone = phone.trim();
    if (!cleanPhone || cleanPhone.length < 6) {
      setErrorMessage(lang === 'bn' ? 'অনুগ্রহ করে আপনার সচল মোবাইল বা হোয়াটসঅ্যাপ নম্বর দিন।' : 'Please enter a valid phone or WhatsApp number (at least 6 digits).');
      return;
    }

    // Windows & WiFi mandatory validation
    if (!windowsVersion) {
      setErrorMessage(
        lang === 'bn'
          ? 'অনুগ্রহ করে আপনার পিসির অপারেটিং সিস্টেম (Windows 11, Windows 10 বা Windows 7) নির্বাচন করুন।'
          : 'Please select whether your PC runs Windows 11, Windows 10, or Windows 7.'
      );
      return;
    }
    if (!hasWifi) {
      setErrorMessage(
        lang === 'bn'
          ? 'অনুগ্রহ করে আপনার কম্পিউটারে ওয়াইফাই বা ইন্টারনেট সংযোগ আছে কি না তা নির্বাচন করুন।'
          : 'Please specify whether your computer has a WiFi connection.'
      );
      return;
    }

    // Payment validation
    if (paymentVerificationType === 'trx_id') {
      if (!transactionId.trim() || transactionId.trim().length < 4) {
        setErrorMessage(
          lang === 'bn'
            ? 'অনুগ্রহ করে আপনার বিকাশ ট্রানজেকশন আইডি (TrxID) সঠিকভাবে লিখুন অথবা ট্রানজেকশন আইডি না থাকলে দ্বিতীয় অপশনটি নির্বাচন করুন।'
            : 'Please enter a valid bKash Transaction ID (TrxID) or switch to the second option.'
        );
        return;
      }
    } else {
      if (!senderLastDigits.trim() || senderLastDigits.trim().length !== 3 || !/^\d{3}$/.test(senderLastDigits.trim())) {
        setErrorMessage(
          lang === 'bn'
            ? 'অনুগ্রহ করে আপনার বিকাশ নম্বরের শেষের সঠিক ৩টি ডিজিট লিখুন (যেমন: 789)।'
            : 'Please enter the exact last 3 numeric digits of your bKash payment phone number.'
        );
        return;
      }
      if (!paymentAmount.trim() || isNaN(Number(paymentAmount.trim())) || Number(paymentAmount.trim()) <= 0) {
        setErrorMessage(
          lang === 'bn'
            ? 'অনুগ্রহ করে প্রেরিত টাকার পরিমাণ সঠিকভাবে উল্লেখ করুন।'
            : 'Please enter a valid payment amount.'
        );
        return;
      }
    }

    if (!consent) {
      setErrorMessage(lang === 'bn' ? 'আবেদন জমা দিতে সম্মতি বক্সে টিক দিন।' : 'Please accept the consent checkbox to continue.');
      return;
    }

    setSubmitting(true);

    try {
      // Build location string: Upazila, District, Division
      const upazilaObj = upazilaList.find((u) => u.id === selectedUpazila);
      const districtObj = currentDistrict;
      const divisionObj = currentDivision;

      const upazilaName =
        selectedUpazila === 'other' && customUpazila.trim()
          ? customUpazila.trim()
          : upazilaObj?.nameBn || selectedUpazila;
      const districtName = districtObj?.nameBn || selectedDistrict;
      const divisionName = divisionObj?.nameBn || selectedDivision;

      const formattedLocation = `${upazilaName}, ${districtName}, ${divisionName}`;

      // Build payment summary
      const packageLabel =
        selectedPackage === 'pkg_12m'
          ? '১২ মাসের প্যাকেজ (৪০০০ টাকা)'
          : '৬ মাসের প্যাকেজ (২২৫০ টাকা)';

      const windowsLabel =
        windowsVersion === 'win11'
          ? 'Windows 11 (Recommended)'
          : windowsVersion === 'win10'
          ? 'Windows 10 (Recommended)'
          : 'Windows 7';

      const wifiLabel = hasWifi === 'yes' ? 'হ্যাঁ, ওয়াইফাই আছে' : 'না, ওয়াইফাই নেই';

      const paymentDetailText =
        paymentVerificationType === 'trx_id'
          ? `পদ্ধতি: TrxID | ট্রানজেকশন আইডি: ${transactionId.trim()}`
          : `পদ্ধতি: নম্বরের শেষ ৩ ডিজিট | শেষ ৩ ডিজিট: ${senderLastDigits.trim()} | পরিমাণ: ${paymentAmount.trim()} টাকা`;

      // Composite message stored cleanly in Appwrite
      const compositeMessageLines = [
        `[প্যাকেজ ও বিকাশ পেমেন্ট তথ্য]`,
        `প্যাকেজ: ${packageLabel}`,
        `পেমেন্ট মাধ্যম: বিকাশ Send Money (ব্যক্তিগত)`,
        paymentDetailText,
        `অপারেটিং সিস্টেম: ${windowsLabel}`,
        `ওয়াইফাই সংযোগ: ${wifiLabel}`,
        `ঠিকানা: ${formattedLocation}`,
        company.trim() ? `প্রতিষ্ঠান / পেশা: ${company.trim()}` : null,
        userNote.trim() ? `গ্রাহকের নোট: ${userNote.trim()}` : null,
      ].filter(Boolean);

      const compositeMessage = compositeMessageLines.join('\n');

      const url = getPublicApiUrl();
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Request-ID': `REQ-${Date.now().toString(36)}`,
        },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          phone: cleanPhone,
          company: company.trim(),
          location: formattedLocation,
          interestType: 'full_suite', // Safe default recognized by backend schema
          message: compositeMessage,
          consent: true,
          website: website.trim(), // Honeypot field
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(data.message || (lang === 'bn' ? 'আবেদনটি জমা করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।' : 'Failed to submit request. Please try again.'));
      }

      setSuccessData({
        requestId: data.requestId || `REQ-${Date.now()}`,
        message: data.message || '',
        packageId: selectedPackage,
        paymentType: paymentVerificationType,
        refDetail: paymentVerificationType === 'trx_id' ? transactionId.trim() : `${senderLastDigits.trim()} (${paymentAmount.trim()} TK)`,
        windowsVersionLabel: windowsLabel,
        wifiStatusLabel: wifiLabel,
      });
    } catch (err: any) {
      console.error('Registration submission error:', err);
      setErrorMessage(err.message || (lang === 'bn' ? 'নেটওয়ার্ক সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।' : 'Network connection error. Please try again.'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyId = () => {
    if (!successData?.requestId) return;
    navigator.clipboard.writeText(successData.requestId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleReset = () => {
    setSuccessData(null);
    setErrorMessage(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setSelectedDivision('dhaka');
    setSelectedDistrict('dhaka');
    setSelectedUpazila('mirpur');
    setCustomUpazila('');
    setWindowsVersion('win11');
    setHasWifi('yes');
    setSelectedPackage('pkg_12m');
    setPaymentVerificationType('trx_id');
    setTransactionId('');
    setSenderLastDigits('');
    setPaymentAmount('4000');
    setUserNote('');
    setConsent(false);
    setWebsite('');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between selection:bg-teal-600/15 selection:text-teal-900 overflow-x-hidden">
      {/* Background aesthetic ambient light gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] max-w-full h-[450px] bg-teal-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -right-32 w-[550px] max-w-full h-[450px] bg-emerald-500/8 rounded-full blur-[130px]" />
        <div className="absolute -bottom-32 -left-32 w-[550px] max-w-full h-[450px] bg-cyan-500/8 rounded-full blur-[130px]" />
      </div>

      {/* Top Navigation Bar */}
      <header className="relative z-20 border-b border-slate-200/90 bg-white/90 backdrop-blur-md sticky top-0 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 sm:h-20 flex items-center justify-between gap-3">
          {/* Brand Info with HM Innovations Logo */}
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className="relative group shrink-0">
              <img
                src="/hm-logo.png"
                alt="HM Innovations Logo"
                className="h-10 sm:h-12 w-auto object-contain shrink-0 transition-transform group-hover:scale-105 drop-shadow-sm"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="brand-header-wordmark text-base sm:text-xl font-black truncate">
                  TYPOMATIC
                </span>
                <span className="hidden sm:inline-block px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-full bg-teal-50 text-teal-800 border border-teal-200/90">
                  {lang === 'bn' ? 'আর্লি অ্যাক্সেস ও সাবস্ক্রিপশন' : 'Early Access & Subscription'}
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-500 font-semibold truncate flex items-center gap-1.5">
                <span className="text-teal-700 font-bold">HM Innovations</span>
                <span className="text-slate-300">&bull;</span>
                <span className="truncate">{lang === 'bn' ? 'লেখালেখির সম্পূর্ণ স্মার্ট সমাধান' : 'Complete Smart Writing Suite'}</span>
              </p>
            </div>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setLang((prev) => (prev === 'bn' ? 'en' : 'bn'))}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 active:bg-slate-100 text-xs font-bold text-slate-700 shadow-xs transition cursor-pointer"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-teal-600" />
              <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-14 flex-1 w-full flex flex-col justify-center">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14 px-2">
          {/* Badge with subtle ping indicator */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200/90 text-teal-800 text-xs font-bold mb-4 sm:mb-5 shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600" />
            </span>
            <span>{t.badge}</span>
          </div>

          {/* Brand & Main Headline with Type + Automatic -> Typomatic Animation */}
          <div className="mb-4 sm:mb-5">
            <div className="mb-2 sm:mb-2.5 flex items-center justify-center">
              <BrandMorphEyebrow lang={lang} />
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-950 leading-[1.25]">
              {lang === 'bn' ? (
                <>
                  শুধু ভয়েস টাইপিং নয়<span className="title-punct-comma">,</span> লেখালেখির সম্পূর্ণ স্মার্ট সমাধান<span className="title-punct-excl">!</span>
                </>
              ) : (
                t.title
              )}
            </h1>
          </div>

          {/* Subtitle / Value Proposition */}
          <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-normal max-w-3xl mx-auto mb-6 sm:mb-7">
            {t.subtitle}
          </p>

          {/* 5 Multilingual Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 pt-1">
            <span className="text-xs font-bold text-slate-400 mr-1 sm:mr-2">
              {lang === 'bn' ? 'সমর্থিত ৫টি ভাষা:' : 'Supported Languages:'}
            </span>
            {t.languagesList.map((langItem, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs font-bold rounded-xl bg-white border border-slate-200 shadow-2xs text-slate-800 flex items-center gap-1.5"
              >
                <span className="text-teal-700 font-black">{langItem.label}</span>
                <span className="text-[10px] text-slate-400 font-medium">({langItem.sub})</span>
              </span>
            ))}
          </div>
        </div>

        {/* 4 Trust Metrics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-10 sm:mb-14 w-full">
          {t.metrics.map((metric, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs hover:border-teal-400/80 hover:shadow-md transition text-center"
            >
              <div className="text-xl sm:text-2xl lg:text-3xl font-black text-teal-700 tracking-tight mb-1">
                {lang === 'bn' ? metric.value : metric.valueEn}
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 mb-0.5">
                {lang === 'bn' ? metric.labelBn : metric.labelEn}
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 leading-snug">
                {lang === 'bn' ? metric.descBn : metric.descEn}
              </div>
            </div>
          ))}
        </div>

        {/* Typomatic Key Features Grid */}
        <div className="max-w-5xl mx-auto mb-10 sm:mb-14 w-full">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-black text-slate-950">
              {t.featuresSectionTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {t.features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="portal-feature-card rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 shadow-2xs">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold">
                        {lang === 'bn' ? feat.badgeBn : feat.badgeEn}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-black text-slate-900 mb-2 leading-snug">
                      {feat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {feat.desc}
                    </p>
                  </div>
                  <div className="pt-3.5 mt-3.5 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-teal-700">
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span>{lang === 'bn' ? 'সরাসরি ইন্টিগ্রেটেড সুবিধা' : 'Native Built-in Power'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Inspiring Hook Callout Banner */}
        <div className="max-w-4xl mx-auto w-full mb-10 sm:mb-14">
          <div className="rounded-3xl bg-gradient-to-r from-teal-900 via-slate-900 to-emerald-950 text-white p-6 sm:p-8 text-center relative overflow-hidden shadow-xl border border-teal-800/40">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-bold mb-3 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>{lang === 'bn' ? 'স্মার্ট সমাধান' : 'Smart Writing Experience'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight mb-2 text-white">
                {t.hookTitle}
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-slate-300 font-normal leading-relaxed">
                {t.hookSubtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Application Form or Success Container */}
        <div className="max-w-3xl mx-auto w-full">
          {successData ? (
            /* Success Confirmation State */
            <div className="portal-card rounded-3xl p-6 sm:p-10 border border-emerald-200 bg-white shadow-xl shadow-emerald-500/5 animate-fade-in">
              <div className="text-center mb-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto mb-4 shadow-xs">
                  <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-950 mb-2">
                  {t.success.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
                  {t.success.subtitle}
                </p>

                <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span>{t.success.status}</span>
                </div>
              </div>

              {/* Package, PC Specs & Payment Summary Pill */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                <div className="rounded-2xl bg-teal-50/70 border border-teal-200/90 p-4">
                  <div className="text-[10px] font-bold text-teal-800 uppercase tracking-wider mb-1">
                    {t.success.packageChosen}
                  </div>
                  <div className="text-xs sm:text-sm font-black text-teal-950">
                    {successData.packageId === 'pkg_12m'
                      ? (lang === 'bn' ? '১২ মাসের প্যাকেজ (৪০০০ টাকা)' : '12 Months Package (4,000 BDT)')
                      : (lang === 'bn' ? '৬ মাসের প্যাকেজ (২২৫০ টাকা)' : '6 Months Package (2,250 BDT)')}
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    {t.success.pcSpecsLabel}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900">
                    {successData.windowsVersionLabel} &bull; {successData.wifiStatusLabel}
                  </div>
                </div>

                <div className="rounded-2xl bg-rose-50/70 border border-rose-200/90 p-4">
                  <div className="text-[10px] font-bold text-rose-800 uppercase tracking-wider mb-1">
                    {t.success.paymentDetailsLabel}
                  </div>
                  <div className="text-xs sm:text-sm font-mono font-bold text-rose-950 truncate">
                    {successData.refDetail}
                  </div>
                </div>
              </div>

              {/* Reference ID card */}
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 mb-6">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  {t.success.refId}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <code className="text-sm sm:text-base font-mono font-bold text-teal-800 select-all break-all">
                    {successData.requestId}
                  </code>
                  <button
                    type="button"
                    onClick={handleCopyId}
                    className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 active:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer shrink-0 shadow-xs"
                  >
                    {copiedId ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">{lang === 'bn' ? 'কপি হয়েছে' : 'Copied'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                        <span>{lang === 'bn' ? 'কপি করুন' : 'Copy ID'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Next Steps List */}
              <div className="space-y-2.5 sm:space-y-3 mb-7 sm:mb-8">
                <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {lang === 'bn' ? '১' : '1'}
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">{t.success.step1Title}</h3>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-relaxed">{t.success.step1Desc}</p>
                  </div>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {lang === 'bn' ? '২' : '2'}
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">{t.success.step2Title}</h3>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-relaxed">{t.success.step2Desc}</p>
                  </div>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {lang === 'bn' ? '৩' : '3'}
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">{t.success.step3Title}</h3>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-relaxed">{t.success.step3Desc}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-teal-700/15"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{t.success.buttonReset}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Main Input Form */
            <div className="portal-card rounded-3xl p-5 sm:p-8 md:p-10 border border-slate-200/90 bg-white shadow-xl shadow-slate-200/60">
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h2 className="text-lg sm:text-2xl font-black text-slate-950">
                    {t.formHeader}
                  </h2>
                  <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200/80">
                    {lang === 'bn' ? 'সরাসরি প্রোভিশনিং' : 'Direct Provisioning'}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-teal-50/80 border border-teal-200/90 text-teal-950 text-xs leading-relaxed flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <span>{t.formNote}</span>
                </div>
              </div>

              {errorMessage && (
                <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs leading-relaxed flex items-start gap-2.5 animate-shake">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-bold text-rose-800">{lang === 'bn' ? 'আবেদন জমায় সমস্যা' : 'Submission Error'}</p>
                    <p className="mt-0.5 text-rose-700">{errorMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                {/* Honeypot field (hidden from legitimate humans) */}
                <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                  <label htmlFor="hp_website">Leave this field blank</label>
                  <input
                    id="hp_website"
                    type="text"
                    name="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* ---------------- STEP 1: PERSONAL INFORMATION ---------------- */}
                <div className="rounded-2xl border border-slate-200/90 p-4 sm:p-5 bg-slate-50/40">
                  <div className="flex items-center gap-2 mb-3.5 sm:mb-4 pb-2 border-b border-slate-200">
                    <div className="w-6 h-6 rounded-lg bg-teal-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {lang === 'bn' ? '১' : '1'}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      {t.step1Title}
                    </h3>
                  </div>

                  <div className="space-y-3.5 sm:space-y-4">
                    {/* Full Name & Phone Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-teal-700" />
                          <span>{t.fields.fullName}</span>
                          <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder={t.fields.fullNamePlaceholder}
                          maxLength={128}
                          className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100 transition shadow-xs"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-teal-700" />
                          <span>{t.fields.phone}</span>
                          <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder={t.fields.phonePlaceholder}
                          maxLength={32}
                          className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100 transition shadow-xs"
                        />
                      </div>
                    </div>

                    {/* Email and Organization Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-teal-700" />
                          <span>{t.fields.email}</span>
                          <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={t.fields.emailPlaceholder}
                          maxLength={256}
                          className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100 transition shadow-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-teal-700" />
                          <span>{t.fields.company}</span>
                        </label>
                        <input
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder={t.fields.companyPlaceholder}
                          maxLength={128}
                          className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100 transition shadow-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ---------------- STEP 2: LOCATION (DIVISION, DISTRICT, UPAZILA) ---------------- */}
                <div className="rounded-2xl border border-slate-200/90 p-4 sm:p-5 bg-slate-50/40">
                  <div className="flex items-center gap-2 mb-3.5 sm:mb-4 pb-2 border-b border-slate-200">
                    <div className="w-6 h-6 rounded-lg bg-teal-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {lang === 'bn' ? '২' : '2'}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      {t.step2Title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                    {/* Division */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-teal-700" />
                        <span>{t.fields.division}</span>
                        <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={selectedDivision}
                        onChange={(e) => handleDivisionChange(e.target.value)}
                        className="w-full px-3 py-2.5 sm:py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100 transition cursor-pointer shadow-xs"
                      >
                        {BANGLADESH_DIVISIONS.map((div) => (
                          <option key={div.id} value={div.id}>
                            {lang === 'bn' ? div.nameBn : div.nameEn}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* District */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-teal-700" />
                        <span>{t.fields.district}</span>
                        <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={selectedDistrict}
                        onChange={(e) => handleDistrictChange(e.target.value)}
                        className="w-full px-3 py-2.5 sm:py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100 transition cursor-pointer shadow-xs"
                      >
                        {districtList.map((dist) => (
                          <option key={dist.id} value={dist.id}>
                            {lang === 'bn' ? dist.nameBn : dist.nameEn}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Upazila */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-teal-700" />
                        <span>{t.fields.upazila}</span>
                        <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={selectedUpazila}
                        onChange={(e) => setSelectedUpazila(e.target.value)}
                        className="w-full px-3 py-2.5 sm:py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100 transition cursor-pointer shadow-xs"
                      >
                        {upazilaList.map((upz) => (
                          <option key={upz.id} value={upz.id}>
                            {lang === 'bn' ? upz.nameBn : upz.nameEn}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Custom Upazila text field if "other" is selected */}
                  {selectedUpazila === 'other' && (
                    <div className="mt-3.5 animate-fade-in">
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {lang === 'bn' ? 'নির্দিষ্ট থানা বা উপজেলার নাম' : 'Specific Upazila / Thana Name'}
                        <span className="text-rose-500 ml-1">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={customUpazila}
                        onChange={(e) => setCustomUpazila(e.target.value)}
                        placeholder={t.fields.customUpazilaPlaceholder}
                        maxLength={128}
                        className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100 transition shadow-xs"
                      />
                    </div>
                  )}
                </div>

                {/* ---------------- STEP 3: PC & SYSTEM SPECIFICATIONS (WINDOWS 11, 10, 7 & WIFI) ---------------- */}
                <div className="rounded-2xl border border-slate-200/90 p-4 sm:p-5 bg-slate-50/40">
                  <div className="flex items-center gap-2 mb-3.5 sm:mb-4 pb-2 border-b border-slate-200">
                    <div className="w-6 h-6 rounded-lg bg-teal-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {lang === 'bn' ? '৩' : '3'}
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">
                        {t.step3Title}
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        {lang === 'bn' ? 'সফটওয়্যার উপযুক্তভাবে প্রস্তুত করতে নিচের দুটি তথ্য নির্বাচন আবশ্যক (Must)' : 'Both questions below are mandatory for proper configuration'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 sm:space-y-5">
                    {/* 1. Windows Version Question (Win 11, Win 10, Win 7) */}
                    <div>
                      <div className="mb-2">
                        <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <Monitor className="w-4 h-4 text-teal-700" />
                          <span>{t.fields.windowsTitle}</span>
                          <span className="text-rose-500 font-bold">*</span>
                        </label>
                        <p className="text-[10px] sm:text-[11px] text-slate-500">
                          {t.fields.windowsDesc}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {/* Windows 11 (Recommended) */}
                        <button
                          type="button"
                          onClick={() => setWindowsVersion('win11')}
                          className={`relative flex flex-col justify-between p-3.5 rounded-2xl border-2 text-left transition cursor-pointer ${
                            windowsVersion === 'win11'
                              ? 'border-teal-600 bg-white ring-4 ring-teal-500/10 shadow-sm'
                              : 'border-slate-200 bg-white/70 hover:bg-white text-slate-700'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div
                              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                                windowsVersion === 'win11'
                                  ? 'bg-teal-50 text-teal-700 border border-teal-200'
                                  : 'bg-slate-100 text-slate-500'
                              }`}
                            >
                              <Monitor className="w-4 h-4" />
                            </div>
                            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-black">
                              {t.fields.win11Badge}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-950">
                              {t.fields.win11Title}
                            </p>
                            <p className="text-[11px] text-slate-500 font-medium">
                              {t.fields.win11Desc}
                            </p>
                          </div>
                        </button>

                        {/* Windows 10 (Recommended) */}
                        <button
                          type="button"
                          onClick={() => setWindowsVersion('win10')}
                          className={`relative flex flex-col justify-between p-3.5 rounded-2xl border-2 text-left transition cursor-pointer ${
                            windowsVersion === 'win10'
                              ? 'border-teal-600 bg-white ring-4 ring-teal-500/10 shadow-sm'
                              : 'border-slate-200 bg-white/70 hover:bg-white text-slate-700'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div
                              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                                windowsVersion === 'win10'
                                  ? 'bg-teal-50 text-teal-700 border border-teal-200'
                                  : 'bg-slate-100 text-slate-500'
                              }`}
                            >
                              <Laptop className="w-4 h-4" />
                            </div>
                            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-black">
                              {t.fields.win10Badge}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-950">
                              {t.fields.win10Title}
                            </p>
                            <p className="text-[11px] text-slate-500 font-medium">
                              {t.fields.win10Desc}
                            </p>
                          </div>
                        </button>

                        {/* Windows 7 */}
                        <button
                          type="button"
                          onClick={() => setWindowsVersion('win7')}
                          className={`relative flex flex-col justify-between p-3.5 rounded-2xl border-2 text-left transition cursor-pointer ${
                            windowsVersion === 'win7'
                              ? 'border-teal-600 bg-white ring-4 ring-teal-500/10 shadow-sm'
                              : 'border-slate-200 bg-white/70 hover:bg-white text-slate-700'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div
                              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                                windowsVersion === 'win7'
                                  ? 'bg-teal-50 text-teal-700 border border-teal-200'
                                  : 'bg-slate-100 text-slate-500'
                              }`}
                            >
                              <Monitor className="w-4 h-4" />
                            </div>
                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                              Legacy
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-950">
                              {t.fields.win7Title}
                            </p>
                            <p className="text-[11px] text-slate-500 font-medium">
                              {t.fields.win7Desc}
                            </p>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* 2. WiFi Availability Question */}
                    <div>
                      <div className="mb-2">
                        <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <Wifi className="w-4 h-4 text-teal-700" />
                          <span>{t.fields.wifiTitle}</span>
                          <span className="text-rose-500 font-bold">*</span>
                        </label>
                        <p className="text-[10px] sm:text-[11px] text-slate-500">
                          {t.fields.wifiDesc}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Yes WiFi */}
                        <button
                          type="button"
                          onClick={() => setHasWifi('yes')}
                          className={`flex items-center justify-between p-3.5 rounded-2xl border-2 text-left transition cursor-pointer ${
                            hasWifi === 'yes'
                              ? 'border-teal-600 bg-white ring-4 ring-teal-500/10 shadow-sm'
                              : 'border-slate-200 bg-white/70 hover:bg-white text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                                hasWifi === 'yes'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : 'bg-slate-100 text-slate-500'
                              }`}
                            >
                              <Wifi className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-950">
                                {t.fields.wifiYesTitle}
                              </p>
                              <p className="text-[11px] text-slate-500 font-medium">
                                {t.fields.wifiYesDesc}
                              </p>
                            </div>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition ${
                              hasWifi === 'yes'
                                ? 'border-teal-600 bg-teal-600 text-white'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {hasWifi === 'yes' && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </button>

                        {/* No WiFi */}
                        <button
                          type="button"
                          onClick={() => setHasWifi('no')}
                          className={`flex items-center justify-between p-3.5 rounded-2xl border-2 text-left transition cursor-pointer ${
                            hasWifi === 'no'
                              ? 'border-amber-600 bg-white ring-4 ring-amber-500/10 shadow-sm'
                              : 'border-slate-200 bg-white/70 hover:bg-white text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                                hasWifi === 'no'
                                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                  : 'bg-slate-100 text-slate-500'
                              }`}
                            >
                              <WifiOff className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-950">
                                {t.fields.wifiNoTitle}
                              </p>
                              <p className="text-[11px] text-slate-500 font-medium">
                                {t.fields.wifiNoDesc}
                              </p>
                            </div>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition ${
                              hasWifi === 'no'
                                ? 'border-amber-600 bg-amber-600 text-white'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {hasWifi === 'no' && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ---------------- STEP 4: PACKAGE SELECTION ---------------- */}
                <div className="rounded-2xl border border-slate-200/90 p-4 sm:p-5 bg-slate-50/40">
                  <div className="flex items-center gap-2 mb-3.5 sm:mb-4 pb-2 border-b border-slate-200">
                    <div className="w-6 h-6 rounded-lg bg-teal-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {lang === 'bn' ? '৪' : '4'}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      {t.step4Title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* 6 Months Package */}
                    <div
                      onClick={() => handlePackageChange('pkg_6m')}
                      className={`relative rounded-2xl p-4 sm:p-5 border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        selectedPackage === 'pkg_6m'
                          ? 'border-teal-600 bg-white ring-4 ring-teal-500/10 shadow-md'
                          : 'border-slate-200 bg-white/70 hover:border-slate-300 hover:bg-white'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            {t.packages.pkg_6m.duration}
                          </span>
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
                              selectedPackage === 'pkg_6m'
                                ? 'border-teal-600 bg-teal-600 text-white'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {selectedPackage === 'pkg_6m' && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>

                        <div className="text-2xl sm:text-3xl font-black text-slate-950 mb-1">
                          {t.packages.pkg_6m.priceDisplay}
                        </div>
                        <p className="text-xs font-bold text-teal-800 mb-3">
                          {t.packages.pkg_6m.title}
                        </p>

                        <div className="space-y-1.5 border-t border-slate-100 pt-3">
                          {t.packages.pkg_6m.features.map((feat, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                              <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 12 Months Package (Featured / Best Value) */}
                    <div
                      onClick={() => handlePackageChange('pkg_12m')}
                      className={`relative rounded-2xl p-4 sm:p-5 border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        selectedPackage === 'pkg_12m'
                          ? 'border-teal-600 bg-white ring-4 ring-teal-500/15 shadow-lg'
                          : 'border-slate-200 bg-white/70 hover:border-slate-300 hover:bg-white'
                      }`}
                    >
                      {/* Best Value Ribbon */}
                      <div className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] font-black tracking-wider uppercase shadow-sm">
                        {t.packages.pkg_12m.badge}
                      </div>

                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-xs font-bold text-teal-800 uppercase tracking-wider flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            {t.packages.pkg_12m.duration}
                          </span>
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
                              selectedPackage === 'pkg_12m'
                                ? 'border-teal-600 bg-teal-600 text-white'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {selectedPackage === 'pkg_12m' && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>

                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-2xl sm:text-3xl font-black text-slate-950">
                            {t.packages.pkg_12m.priceDisplay}
                          </span>
                          {t.packages.pkg_12m.originalPrice && (
                            <span className="text-xs sm:text-sm text-slate-400 line-through font-semibold">
                              {t.packages.pkg_12m.originalPrice}
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-bold text-teal-800 mb-3">
                          {t.packages.pkg_12m.title}
                        </p>

                        <div className="space-y-1.5 border-t border-slate-100 pt-3">
                          {t.packages.pkg_12m.features.map((feat, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ---------------- STEP 5: BKASH PAYMENT & VERIFICATION ---------------- */}
                <div className="rounded-2xl border border-slate-200/90 p-4 sm:p-5 bg-slate-50/40">
                  <div className="flex items-center gap-2 mb-3.5 sm:mb-4 pb-2 border-b border-slate-200">
                    <div className="w-6 h-6 rounded-lg bg-teal-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {lang === 'bn' ? '৫' : '5'}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      {t.step5Title}
                    </h3>
                  </div>

                  {/* Demo bKash Send Money Instruction Box */}
                  <div className="rounded-2xl border-2 border-rose-200 bg-gradient-to-br from-rose-50/90 via-white to-pink-50/80 p-4 sm:p-5 mb-5 shadow-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pb-3 border-b border-rose-200/80">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-sm">
                          <Smartphone className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-black text-rose-950">
                            {t.fields.bkashSendMoneyTitle}
                          </h4>
                          <p className="text-[11px] text-rose-700 font-semibold">
                            {lang === 'bn' ? 'ব্যক্তিগত বিকাশ নম্বর (Send Money প্রযোজ্য)' : 'Personal bKash Account (Send Money)'}
                          </p>
                        </div>
                      </div>

                      {/* bKash Demo Number & Copy Pill */}
                      <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-rose-300 shadow-2xs self-start sm:self-auto">
                        <code className="text-sm sm:text-base font-mono font-black text-rose-700 select-all">
                          {DEMO_BKASH_NUMBER}
                        </code>
                        <button
                          type="button"
                          onClick={handleCopyBkash}
                          className="flex items-center gap-1 px-2 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-[11px] font-bold transition cursor-pointer"
                        >
                          {copiedBkash ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-700">{t.fields.bkashCopied}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>{t.fields.bkashCopy}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Step-by-Step bullets */}
                    <div className="space-y-2 text-xs text-rose-950">
                      <div className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-rose-200/90 text-rose-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          {lang === 'bn' ? '১' : '1'}
                        </span>
                        <span>{t.fields.bkashStep1}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-rose-200/90 text-rose-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          {lang === 'bn' ? '২' : '2'}
                        </span>
                        <span>
                          {t.fields.bkashStep2}{' '}
                          <strong className="text-rose-700 underline underline-offset-2">
                            {selectedPackage === 'pkg_12m' ? '৪০০০ টাকা' : '২২৫০ টাকা'}
                          </strong>
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-rose-200/90 text-rose-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          {lang === 'bn' ? '৩' : '3'}
                        </span>
                        <span>{t.fields.bkashStep3}</span>
                      </div>
                    </div>
                  </div>

                  {/* Two Payment Verification Options (Tabs) */}
                  <div className="mb-4">
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      {lang === 'bn' ? 'পেমেন্ট যাচাইয়ের পদ্ধতি নির্বাচন করুন:' : 'Choose Payment Verification Method:'}
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3.5">
                      {/* Option 1: TrxID */}
                      <button
                        type="button"
                        onClick={() => setPaymentVerificationType('trx_id')}
                        className={`flex items-center gap-2.5 p-3 rounded-xl border-2 text-left transition cursor-pointer ${
                          paymentVerificationType === 'trx_id'
                            ? 'border-teal-600 bg-white ring-2 ring-teal-500/10 shadow-xs'
                            : 'border-slate-200 bg-white/70 hover:bg-white text-slate-600'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            paymentVerificationType === 'trx_id'
                              ? 'border-teal-600 bg-teal-600 text-white'
                              : 'border-slate-300'
                          }`}
                        >
                          {paymentVerificationType === 'trx_id' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 leading-tight">
                            {t.fields.verificationOptionA}
                          </p>
                          <p className="text-[10px] text-slate-500 mt-0.5">
                            {lang === 'bn' ? 'এসএমএস থেকে TrxID দিন' : 'Paste transaction ID from SMS'}
                          </p>
                        </div>
                      </button>

                      {/* Option 2: Last 3 Digits + Amount */}
                      <button
                        type="button"
                        onClick={() => setPaymentVerificationType('phone_digits')}
                        className={`flex items-center gap-2.5 p-3 rounded-xl border-2 text-left transition cursor-pointer ${
                          paymentVerificationType === 'phone_digits'
                            ? 'border-teal-600 bg-white ring-2 ring-teal-500/10 shadow-xs'
                            : 'border-slate-200 bg-white/70 hover:bg-white text-slate-600'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            paymentVerificationType === 'phone_digits'
                              ? 'border-teal-600 bg-teal-600 text-white'
                              : 'border-slate-300'
                          }`}
                        >
                          {paymentVerificationType === 'phone_digits' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 leading-tight">
                            {t.fields.verificationOptionB}
                          </p>
                          <p className="text-[10px] text-slate-500 mt-0.5">
                            {lang === 'bn' ? 'নম্বরের শেষ ৩ ডিজিট ও পরিমাণ' : 'Last 3 digits & amount sent'}
                          </p>
                        </div>
                      </button>
                    </div>

                    {/* Dynamic Verification Input Fields */}
                    {paymentVerificationType === 'trx_id' ? (
                      /* Option A Input: TrxID */
                      <div className="bg-white rounded-xl p-3.5 border border-slate-300 shadow-2xs animate-fade-in">
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                          <CreditCard className="w-3.5 h-3.5 text-teal-700" />
                          <span>{t.fields.trxIdLabel}</span>
                          <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required={paymentVerificationType === 'trx_id'}
                          value={transactionId}
                          onChange={(e) => setTransactionId(e.target.value.toUpperCase())}
                          placeholder={t.fields.trxIdPlaceholder}
                          maxLength={32}
                          className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-300 text-slate-900 placeholder-slate-400 font-mono text-sm uppercase tracking-wider focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100 transition shadow-xs"
                        />
                        <p className="text-[10px] text-slate-500 mt-1">
                          {lang === 'bn'
                            ? 'বিকাশের কনফার্মেশন মেসেজে থাকা ৮-১০ অক্ষরের ট্রানজেকশন আইডিটি এখানে লিখুন।'
                            : 'Enter the 8-10 character Transaction ID from your bKash SMS.'}
                        </p>
                      </div>
                    ) : (
                      /* Option B Input: Last 3 Digits + Amount */
                      <div className="bg-white rounded-xl p-3.5 border border-slate-300 shadow-2xs space-y-3 animate-fade-in">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* Last 3 digits */}
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                              <Hash className="w-3.5 h-3.5 text-teal-700" />
                              <span>{t.fields.lastDigitsLabel}</span>
                              <span className="text-rose-500">*</span>
                            </label>
                            <input
                              type="text"
                              required={paymentVerificationType === 'phone_digits'}
                              value={senderLastDigits}
                              onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '').slice(0, 3);
                                setSenderLastDigits(val);
                              }}
                              placeholder={t.fields.lastDigitsPlaceholder}
                              maxLength={3}
                              className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-300 text-slate-900 placeholder-slate-400 font-mono text-sm tracking-widest focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100 transition shadow-xs"
                            />
                            <p className="text-[10px] text-slate-500 mt-1">
                              {lang === 'bn' ? 'যে বিকাশ নম্বর থেকে টাকা পাঠিয়েছেন তার শেষ ৩ সংখ্যা।' : 'Last 3 digits of sender phone.'}
                            </p>
                          </div>

                          {/* Amount Sent */}
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                              <Send className="w-3.5 h-3.5 text-teal-700" />
                              <span>{t.fields.amountSentLabel}</span>
                              <span className="text-rose-500">*</span>
                            </label>
                            <input
                              type="number"
                              required={paymentVerificationType === 'phone_digits'}
                              value={paymentAmount}
                              onChange={(e) => setPaymentAmount(e.target.value)}
                              placeholder={t.fields.amountSentPlaceholder}
                              min={1}
                              className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-300 text-slate-900 placeholder-slate-400 font-mono text-sm focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100 transition shadow-xs"
                            />
                            <p className="text-[10px] text-slate-500 mt-1">
                              {lang === 'bn' ? 'নির্বাচিত প্যাকেজের নির্ধারিত সমপরিমাণ টাকা।' : 'Exact amount sent in BDT.'}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Optional User Message */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-teal-700" />
                      <span>{t.fields.message}</span>
                    </label>
                    <textarea
                      rows={2}
                      value={userNote}
                      onChange={(e) => setUserNote(e.target.value)}
                      placeholder={t.fields.messagePlaceholder}
                      maxLength={1024}
                      className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100 transition resize-none shadow-xs"
                    />
                  </div>
                </div>

                {/* Consent Checkbox */}
                <div className="pt-1">
                  <label className="flex items-start gap-2.5 sm:gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      required
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer shrink-0"
                    />
                    <span className="text-xs text-slate-600 leading-relaxed font-medium">
                      {t.fields.consent}
                    </span>
                  </label>
                </div>

                {/* Submit Action */}
                <div className="pt-2 sm:pt-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-gradient-to-r from-teal-700 via-teal-800 to-emerald-700 hover:from-teal-800 hover:to-emerald-800 active:from-teal-900 active:to-emerald-900 text-white font-black text-sm sm:text-base shadow-xl shadow-teal-700/25 flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>{t.fields.submitting}</span>
                      </>
                    ) : (
                      <>
                        <span>{t.fields.submit}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                {/* Reassurance text */}
                <div className="pt-2 text-center">
                  <p className="text-[11px] text-slate-500 font-medium flex items-center justify-center gap-1.5">
                    <Lock className="w-3 h-3 text-teal-600 shrink-0" />
                    <span>{t.fields.privacyReassurance}</span>
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200/90 bg-white/80 backdrop-blur-md py-6 mt-12 sm:mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs text-slate-500 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">TYPOMATIC</span>
            <span>&bull;</span>
            <span className="font-medium">HM Innovations</span>
            <span>&bull;</span>
            <span>&copy; {new Date().getFullYear()} All Rights Reserved.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4 text-slate-500">
            <span className="flex items-center gap-1.5 text-teal-700 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>{lang === 'bn' ? 'নিরাপদ তথ্য এনক্রিপশন' : 'Encrypted & Hardware Bound'}</span>
            </span>
            <span className="hidden sm:inline">&bull;</span>
            <a
              href="mailto:support@attanjil.com"
              className="hover:text-teal-700 transition flex items-center gap-1 font-medium"
            >
              <span>support@attanjil.com</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
