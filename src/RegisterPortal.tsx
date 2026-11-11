import React, { useState, useMemo } from 'react';
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
} from 'lucide-react';
import { BANGLADESH_DIVISIONS } from './data/bangladeshGeo';

type Language = 'bn' | 'en';
type PackageId = 'pkg_6m' | 'pkg_12m';
type PaymentVerificationType = 'trx_id' | 'phone_digits';
type WindowsVersion = 'win11' | 'win10' | '';
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
    title:
      lang === 'bn'
        ? 'বাংলা ভয়েস টাইপিং ও ইসলামিক ডকুমেন্টিংয়ের আধুনিক রূপান্তর'
        : 'The Intelligent Future of Bangla Voice Typing & Islamic Documents',
    subtitle:
      lang === 'bn'
        ? 'মাইক্রোসফট ওয়ার্ডে সরাসরি রিয়েল-টাইম বাংলা ভয়েস টাইপিং, ৫০০+ প্রামাণ্য ইসলামিক ও আরবি ক্যালিগ্রাফি শর্টকাট এবং আধুনিক বানান ও বাক্য কারেক্টর — টাইপোম্যাটিক এর সাথে কাজ করুন সম্পূর্ণ নিশ্চিন্তে ও দ্রুততম গতিতে।'
        : 'Continuous real-time Bangla voice-to-text directly in MS Word, 500+ authentic Arabic & Islamic calligraphy ligatures, and contextual spell and sentence correction — all in one unified desktop suite.',
    formHeader: lang === 'bn' ? 'রেজিস্ট্রেশন ও সাবস্ক্রিপশন ফরম' : 'Registration & Subscription Form',
    formNote:
      lang === 'bn'
        ? 'গুরুত্বপূর্ণ বিজ্ঞপ্তি: আপনার আবেদন ও বিকাশ পেমেন্ট তথ্য সাবমিট করার পর আমাদের অ্যাডমিন টিম তা দ্রুত পর্যালোচনা করে আপনার সাথে হোয়াটসঅ্যাপ বা ফোনে যোগাযোগ করে সফটওয়্যার অ্যাক্টিভেশন কী বুঝিয়ে দেবে।'
        : 'Important: Once submitted, our authorized administrative team verifies your bKash payment and reaches out via WhatsApp or phone with your official activation key and installation package.',
    metrics: [
      {
        value: '৯৯.২%',
        valueEn: '99.2%',
        labelBn: 'স্পিচ নির্ভুলতা',
        labelEn: 'Speech Accuracy',
        descBn: 'উন্নত বাংলা কথ্য ভাষা মডেল',
        descEn: 'Trained on authentic Bangla speech',
      },
      {
        value: '০ ল্যাগ',
        valueEn: '0 Lag',
        labelBn: 'এমএস ওয়ার্ড সিঙ্ক',
        labelEn: 'Direct Word Sync',
        descBn: 'সরাসরি ডকুমেন্টে রিয়েল-টাইম টাইপিং',
        descEn: 'Zero typing latency in Microsoft Word',
      },
      {
        value: '৫০০+',
        valueEn: '500+',
        labelBn: 'আরবি ক্যালিগ্রাফি',
        labelEn: 'Arabic Ligatures',
        descBn: 'দরুদ, আয়াত ও ইসলামিক প্রতীক শর্টকাট',
        descEn: 'One-click Durood & Quranic ligatures',
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
    audiencesLabel: lang === 'bn' ? 'যাদের জন্য বিশেষভাবে ডিজাইন করা:' : 'Specially Crafted For:',
    audiences: [
      { bn: 'লেখক ও গবেষক', en: 'Authors & Researchers' },
      { bn: 'মাদ্রাসা ও ইসলামিক স্কলার', en: 'Islamic Scholars & Madrashahs' },
      { bn: 'সাংবাদিক ও কলামিস্ট', en: 'Journalists & Columnists' },
      { bn: 'প্রকাশনা ও প্রুফরিডার', en: 'Publishers & Proofreaders' },
      { bn: 'অফিস ও ডকুমেন্ট প্রফেশনাল', en: 'Office & Document Pros' },
    ],
    features: [
      {
        icon: Mic,
        title: lang === 'bn' ? 'বাংলা ভয়েস টাইপিং' : 'Bangla Voice Typing',
        desc:
          lang === 'bn'
            ? 'মাইক্রোফোনে স্বাভাবিক বাংলায় কথা বলুন, স্বয়ংক্রিয়ভাবে নির্ভুল টেক্সট টাইপ হবে এমএস ওয়ার্ড সহ যেকোনো উইন্ডোতে।'
            : 'Speak naturally in Bangla; watch words appear with high accuracy directly inside Microsoft Word and desktop apps.',
      },
      {
        icon: Feather,
        title: lang === 'bn' ? 'ইসলামিক ও আরবি ক্যালিগ্রাফি' : 'Islamic Calligraphy',
        desc:
          lang === 'bn'
            ? 'দরুদ শরিফ, আয়াত, সাহাবা ও ইসলামিক প্রতীকের এক-ক্লিকে ইনসার্ট শর্টকাট — বই ও প্রবন্ধ লেখার জন্য অপরিহার্য।'
            : 'One-key insertion of authentic Arabic symbols, Durood Sharif ligatures, and Quranic phrases without formatting mess.',
      },
      {
        icon: Sparkles,
        title: lang === 'bn' ? 'স্মার্ট বানান কারেক্টর' : 'Smart Spell Corrector',
        desc:
          lang === 'bn'
            ? 'প্রফেশনাল ডকুমেন্ট সম্পাদনায় বাংলা ব্যাকরণ ও বানান সংশোধন, যা আপনার লেখার মান বহুগুণ বাড়িয়ে তুলবে।'
            : 'Context-aware Bangla spell and syntax correction inside Word to eliminate typographical errors in seconds.',
      },
      {
        icon: ShieldCheck,
        title: lang === 'bn' ? 'অফলাইন ও হার্ডওয়্যার সিকিউরড' : 'Offline & Hardware Bound',
        desc:
          lang === 'bn'
            ? 'ইন্টারনেট বিঘ্নিত হলেও প্রয়োজনীয় টাইপিং চালু থাকে। সিঙ্গেল ডিভাইস সিকিউরিটি ও কোনো ডেটা লিকেজ নয়।'
            : 'Unbreakable cryptographic device binding and reliable offline typing resilience for uninterrupted workflow.',
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
          lang === 'bn' ? 'বাংলা ভয়েস টাইপিং (উচ্চ নির্ভুলতা)' : 'High Accuracy Bangla Voice-to-Text',
          lang === 'bn' ? '৫০০+ ইসলামিক ও আরবি ক্যালিগ্রাফি শর্টকাট' : '500+ Arabic & Islamic Ligatures',
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
          lang === 'bn' ? 'আনলিমিটেড বাংলা ভয়েস টাইপিং (এমএস ওয়ার্ড সিঙ্ক)' : 'Unlimited Word Voice Typing',
          lang === 'bn' ? '৫০০+ প্রামাণ্য ইসলামিক ক্যালিগ্রাফি শর্টকাট' : '500+ Authentic Islamic Shortcuts',
          lang === 'bn' ? 'স্মার্ট বাংলা বানান ও ব্যাকরণ কারেক্টর' : 'Smart Bangla Spell & Grammar Corrector',
          lang === 'bn' ? '১ বছরের প্রায়োরিটি ভিআইপি সাপোর্ট' : '1 Year Priority VIP Updates & Support',
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
      windowsTitle: lang === 'bn' ? 'আপনার কম্পিউটারে কোন উইন্ডোজ সংস্করণ রয়েছে?' : 'Which Windows version do you use?',
      windowsDesc: lang === 'bn' ? 'সফটওয়্যারের উপযুক্ত সংস্করণ ও লাইব্রেরি কনফিগার করতে এটি আবশ্যক।' : 'Required to ensure proper 64-bit desktop runtime compatibility.',
      win11Title: 'Windows 11',
      win11Desc: lang === 'bn' ? 'উইন্ডোজ ১১ (আধুনিক সংস্করণ)' : 'Windows 11 (Modern 64-bit)',
      win10Title: 'Windows 10',
      win10Desc: lang === 'bn' ? 'উইন্ডোজ ১০ (স্ট্যান্ডার্ড সংস্করণ)' : 'Windows 10 (Standard 64-bit)',
      wifiTitle: lang === 'bn' ? 'আপনার কম্পিউটারে ওয়াইফাই বা ইন্টারনেট সংযোগ আছে কি?' : 'Does your PC have WiFi or Internet access?',
      wifiDesc: lang === 'bn' ? 'ভয়েস রিকগনিশন মডেল ও লাইসেন্স সেটআপের জন্য এটি জানা প্রয়োজন।' : 'Used for speech model setup & license activation verification.',
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
          ? 'অনুগ্রহ করে আপনার পিসির উইন্ডোজ সংস্করণ (Windows 10 নাকি Windows 11) নির্বাচন করুন।'
          : 'Please select whether your PC runs Windows 10 or Windows 11.'
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

      const windowsLabel = windowsVersion === 'win11' ? 'Windows 11' : 'Windows 10';
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
        `উইন্ডোজ সংস্করণ: ${windowsLabel}`,
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
                <span className="text-base sm:text-xl font-black tracking-wider text-slate-950 truncate">TYPOMATIC</span>
                <span className="hidden sm:inline-block px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-full bg-teal-50 text-teal-800 border border-teal-200/90">
                  {lang === 'bn' ? 'আর্লি অ্যাক্সেস ও সাবস্ক্রিপশন' : 'Early Access & Subscription'}
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-500 font-semibold truncate flex items-center gap-1.5">
                <span className="text-teal-700 font-bold">HM Innovations</span>
                <span className="text-slate-300">&bull;</span>
                <span className="truncate">{lang === 'bn' ? 'বাংলা ও আরবি প্রোডাক্টিভিটি স্যুট' : 'Bangla & Arabic Productivity Suite'}</span>
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
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 px-2">
          {/* Badge with subtle ping indicator */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200/90 text-teal-800 text-xs font-bold mb-4 sm:mb-5 shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600" />
            </span>
            <span>{t.badge}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-950 leading-[1.2] mb-4 sm:mb-5">
            {t.title}
          </h1>

          <p className="text-xs sm:text-base text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto mb-6 sm:mb-8">
            {t.subtitle}
          </p>

          {/* Target Audience Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-1">
            <span className="text-[11px] sm:text-xs font-bold text-slate-400 mr-1 sm:mr-2">
              {t.audiencesLabel}
            </span>
            {t.audiences.map((aud, i) => (
              <span
                key={i}
                className="px-2.5 py-1 text-[11px] sm:text-xs font-semibold rounded-lg bg-white border border-slate-200/80 text-slate-700 shadow-2xs"
              >
                {lang === 'bn' ? aud.bn : aud.en}
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

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 max-w-5xl mx-auto mb-10 sm:mb-14 w-full">
          {t.features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="portal-feature-card rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 mb-3 shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5 leading-snug">{feat.title}</h2>
                  <p className="text-xs text-slate-500 leading-relaxed">{feat.desc}</p>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-teal-700">
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'সরাসরি ইন্টিগ্রেটেড' : 'Built-in Native'}</span>
                </div>
              </div>
            );
          })}
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

                {/* ---------------- STEP 3: PC & SYSTEM SPECIFICATIONS (WINDOWS & WIFI) ---------------- */}
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
                    {/* 1. Windows Version Question */}
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

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Windows 11 */}
                        <button
                          type="button"
                          onClick={() => setWindowsVersion('win11')}
                          className={`flex items-center justify-between p-3.5 rounded-2xl border-2 text-left transition cursor-pointer ${
                            windowsVersion === 'win11'
                              ? 'border-teal-600 bg-white ring-4 ring-teal-500/10 shadow-sm'
                              : 'border-slate-200 bg-white/70 hover:bg-white text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                                windowsVersion === 'win11'
                                  ? 'bg-teal-50 text-teal-700 border border-teal-200'
                                  : 'bg-slate-100 text-slate-500'
                              }`}
                            >
                              <Monitor className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-950">
                                {t.fields.win11Title}
                              </p>
                              <p className="text-[11px] text-slate-500 font-medium">
                                {t.fields.win11Desc}
                              </p>
                            </div>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition ${
                              windowsVersion === 'win11'
                                ? 'border-teal-600 bg-teal-600 text-white'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {windowsVersion === 'win11' && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </button>

                        {/* Windows 10 */}
                        <button
                          type="button"
                          onClick={() => setWindowsVersion('win10')}
                          className={`flex items-center justify-between p-3.5 rounded-2xl border-2 text-left transition cursor-pointer ${
                            windowsVersion === 'win10'
                              ? 'border-teal-600 bg-white ring-4 ring-teal-500/10 shadow-sm'
                              : 'border-slate-200 bg-white/70 hover:bg-white text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                                windowsVersion === 'win10'
                                  ? 'bg-teal-50 text-teal-700 border border-teal-200'
                                  : 'bg-slate-100 text-slate-500'
                              }`}
                            >
                              <Laptop className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-950">
                                {t.fields.win10Title}
                              </p>
                              <p className="text-[11px] text-slate-500 font-medium">
                                {t.fields.win10Desc}
                              </p>
                            </div>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition ${
                              windowsVersion === 'win10'
                                ? 'border-teal-600 bg-teal-600 text-white'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {windowsVersion === 'win10' && <Check className="w-3 h-3 stroke-[3]" />}
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
