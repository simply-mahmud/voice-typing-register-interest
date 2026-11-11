import React, { useState } from 'react';
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
} from 'lucide-react';

type Language = 'bn' | 'en';

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
  const [successData, setSuccessData] = useState<{ requestId: string; message: string } | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  // Honeypot field
  const [website, setWebsite] = useState('');

  const t = {
    badge: lang === 'bn' ? 'এইচএম ইনোভেশনস • অফিশিয়াল আর্লি অ্যাক্সেস ও প্রি-রেজিস্ট্রেশন' : 'HM Innovations • Official Early Access & Pre-Registration',
    title:
      lang === 'bn'
        ? 'বাংলা ভয়েস টাইপিং ও ইসলামিক ডকুমেন্টিংয়ের আধুনিক রূপান্তর'
        : 'The Intelligent Future of Bangla Voice Typing & Islamic Documents',
    subtitle:
      lang === 'bn'
        ? 'মাইক্রোসফট ওয়ার্ডে সরাসরি রিয়েল-টাইম বাংলা ভয়েস টাইপিং, ৫০০+ প্রামাণ্য ইসলামিক ও আরবি ক্যালিগ্রাফি শর্টকাট এবং আধুনিক এআই বানান কারেক্টর — টাইপোম্যাটিক এর সাথে কাজ করুন সম্পূর্ণ নিশ্চিন্তে ও দ্রুততম গতিতে।'
        : 'Continuous real-time Bangla voice-to-text directly in MS Word, 500+ authentic Arabic & Islamic calligraphy ligatures, and contextual AI spell correction — all in one unified desktop suite.',
    formHeader: lang === 'bn' ? 'আর্লি অ্যাক্সেস নিবন্ধন ফরম' : 'Early Access Registration Form',
    formNote:
      lang === 'bn'
        ? 'গুরুত্বপূর্ণ বিজ্ঞপ্তি: এটি একটি গ্রাহক আগ্রহ নিবন্ধন পোর্টাল। এটি কোনো স্বয়ংক্রিয় সাধারণ অ্যাকাউন্ট নয়। আপনার আবেদনটি আমাদের অ্যাডমিন টিম পর্যালোচনা করে সরাসরি হোয়াটসঅ্যাপ বা ফোনে যোগাযোগ করবে।'
        : 'Important: This is a customer interest inquiry form. It does not automatically provision an instant account. An authorized administrator will review your submission and contact you via WhatsApp or phone.',
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
        title: lang === 'bn' ? 'স্মার্ট এআই কারেক্টর' : 'Smart AI Corrector',
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
    fields: {
      fullName: lang === 'bn' ? 'আপনার পূর্ণ নাম' : 'Full Name',
      fullNamePlaceholder: lang === 'bn' ? 'যেমন: মাওলানা আব্দুল্লাহ বা মোঃ রফিকুল ইসলাম' : 'e.g. Md. Abdullah or Rafiqul Islam',
      email: lang === 'bn' ? 'ইমেইল ঠিকানা' : 'Email Address',
      emailPlaceholder: lang === 'bn' ? 'name@example.com' : 'user@example.com',
      phone: lang === 'bn' ? 'মোবাইল / হোয়াটসঅ্যাপ নম্বর' : 'Phone / WhatsApp Number',
      phonePlaceholder: lang === 'bn' ? '+8801XXXXXXXXX' : '+8801712345678',
      company: lang === 'bn' ? 'প্রতিষ্ঠান / মাদ্রাসা / প্রকাশনা (ঐচ্ছিক)' : 'Institution / Madrashah / Publishing (Optional)',
      companyPlaceholder: lang === 'bn' ? 'যেমন: দারুল উলুম মাদ্রাসা বা দৈনিক পত্রিকা' : 'e.g. Darul Uloom / Daily Newspaper',
      location: lang === 'bn' ? 'জেলা / শহর / অবস্থান (ঐচ্ছিক)' : 'District / City / Location (Optional)',
      locationPlaceholder: lang === 'bn' ? 'যেমন: ঢাকা, চট্টগ্রাম, সিলেট ইত্যাদি' : 'e.g. Dhaka, Chittagong, Sylhet',
      message: lang === 'bn' ? 'আপনার টাইপিং প্রয়োজন বা কোনো বিশেষ বার্তা (ঐচ্ছিক)' : 'Your Typing Workflow or Specific Needs (Optional)',
      messagePlaceholder:
        lang === 'bn'
          ? 'প্রতিদিন কতটুকু লেখালেখি করেন বা আপনার কাজের ধরন সম্পর্কে সংক্ষিপ্তভাবে জানাতে পারেন...'
          : 'Briefly tell us about your daily typing workload or specific workflow needs...',
      consent:
        lang === 'bn'
          ? 'আমি নিশ্চিত করছি যে প্রদত্ত তথ্য সঠিক এবং টাইপোম্যাটিক অ্যাডমিন টিমকে আমার সাথে যোগাযোগ ও সফটওয়্যার সংক্রান্ত তথ্য প্রদানের সম্মতি দিচ্ছি।'
          : 'I confirm that the provided information is accurate and agree to be contacted by the Typomatic team for early access and setup.',
      submit: lang === 'bn' ? 'আর্লি অ্যাক্সেসের জন্য আবেদন করুন' : 'Submit Early Access Request',
      submitting: lang === 'bn' ? 'আবেদন জমা দেওয়া হচ্ছে...' : 'Submitting Application...',
      privacyReassurance:
        lang === 'bn'
          ? 'আপনার তথ্য ১০০% সুরক্ষিত • কোনো বাণিজ্যিক স্প্যাম নেই • অ্যাডমিন টিম সরাসরি যোগাযোগ করবে'
          : '100% Data Confidentiality • Zero Spam • Direct Administrative Review',
    },
    success: {
      title: lang === 'bn' ? 'আপনার আবেদন সফলভাবে গৃহীত হয়েছে!' : 'Application Submitted Successfully!',
      subtitle:
        lang === 'bn'
          ? 'টাইপোম্যাটিক-এ আগ্রহ প্রকাশের জন্য আন্তরিক ধন্যবাদ। আপনার আবেদনটি আমাদের অ্যাডমিন রিভিউ কিউতে যুক্ত হয়েছে।'
          : 'Thank you for expressing interest in Typomatic. Your request has been queued for administrative onboarding.',
      status: lang === 'bn' ? 'স্ট্যাটাস: পর্যালোচনায় অপেক্ষমাণ (PENDING REVIEW)' : 'Status: Under Admin Review (PENDING REVIEW)',
      refId: lang === 'bn' ? 'আপনার ট্র্যাকিং রেফারেন্স আইডি:' : 'Your Tracking Reference ID:',
      step1Title: lang === 'bn' ? '১. তথ্য ও রিকোয়ারমেন্ট যাচাইকরণ' : '1. Profile & Workflow Verification',
      step1Desc: lang === 'bn' ? 'আমাদের টিম আপনার তথ্য ও ব্যবহারের উদ্দেশ্য পর্যবেক্ষণ করবে।' : 'Our team reviews your submission details and typing requirements.',
      step2Title: lang === 'bn' ? '২. অ্যাডমিন সরাসরি যোগাযোগ' : '2. Administrative Outreach',
      step2Desc: lang === 'bn' ? 'আবেদন অনুমোদনের পর হোয়াটসঅ্যাপ বা ফোনে আপনার সাথে যোগাযোগ করা হবে।' : 'Once reviewed, we will contact you via WhatsApp or phone to finalize setup.',
      step3Title: lang === 'bn' ? '৩. ইনস্টলেশন ও ডেস্কটপ লাইসেন্স' : '3. Desktop License & Setup Guide',
      step3Desc: lang === 'bn' ? 'আপনার মেশিনের জন্য সিকিউরড অ্যাক্টিভেশন কী ও ইনস্টলার গাইড হস্তান্তর করা হবে।' : 'Your hardware-bound license key and installer will be securely delivered.',
      buttonReset: lang === 'bn' ? 'আরেকটি আবেদন জমা দিন' : 'Submit Another Request',
    },
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
    if (!consent) {
      setErrorMessage(lang === 'bn' ? 'আবেদন জমা দিতে সম্মতি বক্সে টিক দিন।' : 'Please accept the consent checkbox to continue.');
      return;
    }

    setSubmitting(true);

    try {
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
          location: location.trim(),
          interestType: 'full_suite', // Defaulted to full suite to maintain backend schema compatibility
          message: message.trim(),
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
    setLocation('');
    setMessage('');
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
                  {lang === 'bn' ? 'আর্লি অ্যাক্সেস' : 'Early Access'}
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
        <div className="max-w-2xl mx-auto w-full">
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
                    1
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">{t.success.step1Title}</h3>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-relaxed">{t.success.step1Desc}</p>
                  </div>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">{t.success.step2Title}</h3>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-relaxed">{t.success.step2Desc}</p>
                  </div>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
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
            <div className="portal-card rounded-3xl p-5 sm:p-8 md:p-9 border border-slate-200/90 bg-white shadow-xl shadow-slate-200/60">
              <div className="mb-6 sm:mb-7">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h2 className="text-lg sm:text-2xl font-black text-slate-950">
                    {t.formHeader}
                  </h2>
                  <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200/80">
                    {lang === 'bn' ? 'ফ্রি প্রি-রেজিস্ট্রেশন' : 'Free Pre-Registration'}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-teal-50/80 border border-teal-200/90 text-teal-950 text-xs leading-relaxed flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <span>{t.formNote}</span>
                </div>
              </div>

              {errorMessage && (
                <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs leading-relaxed flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-bold text-rose-800">{lang === 'bn' ? 'আবেদন জমায় সমস্যা' : 'Submission Error'}</p>
                    <p className="mt-0.5 text-rose-700">{errorMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-4.5">
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
                      className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100 transition shadow-xs"
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
                      className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100 transition shadow-xs"
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
                      className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100 transition shadow-xs"
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
                      className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100 transition shadow-xs"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-teal-700" />
                    <span>{t.fields.location}</span>
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={t.fields.locationPlaceholder}
                    maxLength={128}
                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100 transition shadow-xs"
                  />
                </div>

                {/* Message / Requirements */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-teal-700" />
                    <span>{t.fields.message}</span>
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.fields.messagePlaceholder}
                    maxLength={2048}
                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100 transition resize-none shadow-xs"
                  />
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
                    className="w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-gradient-to-r from-teal-700 to-emerald-700 hover:from-teal-800 hover:to-emerald-800 active:from-teal-900 active:to-emerald-900 text-white font-bold text-sm sm:text-base shadow-lg shadow-teal-700/20 flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
