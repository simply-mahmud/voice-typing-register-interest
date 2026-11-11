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
} from 'lucide-react';

type Language = 'bn' | 'en';

const INTEREST_OPTIONS: { id: string; labelBn: string; labelEn: string; icon: string }[] = [
  { id: 'full_suite', labelBn: 'সম্পূর্ণ টাইপোম্যাটিক স্যুট (ভয়েস + আরবি ক্যালিগ্রাফি + কারেক্টর)', labelEn: 'Full Typomatic Suite (Voice + Arabic Calligraphy + Corrector)', icon: '✨' },
  { id: 'voice_typing', labelBn: 'বাংলা ভয়েস টাইপিং সফটওয়্যার', labelEn: 'Bangla Voice-to-Text Software', icon: '🎙️' },
  { id: 'arabic_snippets', labelBn: 'ইসলামিক ও আরবি ক্যালিগ্রাফি ও দরুদ শর্টকাট', labelEn: 'Islamic & Arabic Calligraphy Shortcuts', icon: '📜' },
  { id: 'smart_corrector', labelBn: 'স্মার্ট বাংলা বানান ও বাক্য কারেক্টর (MS Word)', labelEn: 'Smart Bangla Spell & Grammar Corrector', icon: '✍️' },
  { id: 'font_selector', labelBn: 'প্রফেশনাল ফন্ট ও ইউনিকোড কনভার্টার', labelEn: 'Professional Fonts & Unicode Converter', icon: '🔤' },
  { id: 'enterprise', labelBn: 'প্রতিষ্ঠান / মাদ্রাসা / মাল্টি-ইউজার লাইসেন্স', labelEn: 'Institutional / Madrashah / Multi-User License', icon: '🏢' },
  { id: 'other', labelBn: 'অন্যান্য বিশেষ অনুসন্ধান', labelEn: 'Other Custom Requirements', icon: '💬' },
];

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
  const [interestType, setInterestType] = useState('full_suite');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  // Honeypot field
  const [website, setWebsite] = useState('');

  const t = {
    badge: lang === 'bn' ? 'অফিসিয়াল আর্লি অ্যাক্সেস ও আগ্রহ নিবন্ধন' : 'Official Early Access & Registration',
    title: lang === 'bn' ? 'টাইপোম্যাটিক-এ আপনার আগ্রহ প্রকাশ করুন' : 'Express Your Interest in Typomatic',
    subtitle:
      lang === 'bn'
        ? 'বাংলা ভয়েস টাইপিং, ইসলামিক ও আরবি ক্যালিগ্রাফি এবং ইন্টেলিজেন্ট ডকুমেন্ট অটোমেশনের প্রফেশনাল ডেস্কটপ সফটওয়্যার স্যুট।'
        : 'The next-generation productivity suite featuring Bangla voice typing, authentic Arabic calligraphy, and intelligent MS Word automation.',
    formHeader: lang === 'bn' ? 'গ্রাহক আগ্রহ নিবন্ধন ফরম' : 'Customer Interest Registration Form',
    formNote:
      lang === 'bn'
        ? 'গুরুত্বপূর্ণ বিজ্ঞপ্তি: এটি একটি প্রাথমিক আগ্রহ নিবন্ধন পোর্টাল। এটি কোনো স্বয়ংক্রিয় ইউজার অ্যাকাউন্ট তৈরি করবে না। আপনার আবেদনটি আমাদের অ্যাডমিন টিম পর্যালোচনা করে সরাসরি যোগাযোগ করবে।'
        : 'Important: This is a customer interest inquiry form. It does NOT automatically create or activate a user account. An authorized administrator will review your submission and contact you to provision your access.',
    features: [
      {
        icon: Mic,
        title: lang === 'bn' ? 'বাংলা ভয়েস টাইপিং' : 'Bangla Voice Typing',
        desc: lang === 'bn' ? 'উন্নত স্পিচ রিকগনিশন ও দ্রুত ডকুমেন্টিং' : 'Native continuous voice-to-text with MS Word sync',
      },
      {
        icon: Feather,
        title: lang === 'bn' ? 'ইসলামিক ক্যালিগ্রাফি' : 'Calligraphy Shortcuts',
        desc: lang === 'bn' ? 'দরুদ, আয়াত ও ইসলামিক প্রতীক শর্টকাট' : 'One-click authentic Arabic symbols & Durood ligatures',
      },
      {
        icon: Sparkles,
        title: lang === 'bn' ? 'স্মার্ট কারেক্টর' : 'Smart AI Corrector',
        desc: lang === 'bn' ? 'বানান সংশোধন ও প্রফেশনাল ফরম্যাটিং' : 'Deep contextual spelling & sentence correction in Word',
      },
      {
        icon: ShieldCheck,
        title: lang === 'bn' ? 'নিরাপদ সিঙ্গেল সেশন' : 'Hardware Bound',
        desc: lang === 'bn' ? 'লাইসেন্স এনক্রিপশন ও প্রিমিয়াম সাপোর্ট' : 'Enterprise fail-closed device binding & protection',
      },
    ],
    fields: {
      fullName: lang === 'bn' ? 'আপনার পূর্ণ নাম' : 'Full Name',
      fullNamePlaceholder: lang === 'bn' ? 'যেমন: মাওলানা আব্দুল্লাহ বা মোঃ রফিকুল ইসলাম' : 'e.g. Md. Abdullah or Rafiqul Islam',
      email: lang === 'bn' ? 'ইমেইল ঠিকানা' : 'Email Address',
      emailPlaceholder: lang === 'bn' ? 'name@example.com' : 'user@example.com',
      phone: lang === 'bn' ? 'মোবাইল / হোয়াটসঅ্যাপ নম্বর' : 'Phone / WhatsApp Number',
      phonePlaceholder: lang === 'bn' ? '+8801XXXXXXXXX' : '+8801712345678',
      company: lang === 'bn' ? 'প্রতিষ্ঠান / মাদ্রাসা / সংগঠন (ঐচ্ছিক)' : 'Institution / Madrashah / Company (Optional)',
      companyPlaceholder: lang === 'bn' ? 'যেমন: দারুল উলুম মাদ্রাসা বা দৈনিক পত্রিকা' : 'e.g. Darul Uloom / Publishing House',
      location: lang === 'bn' ? 'জেলা / শহর / অবস্থান (ঐচ্ছিক)' : 'District / City / Location (Optional)',
      locationPlaceholder: lang === 'bn' ? 'যেমন: ঢাকা, চট্টগ্রাম, সিলেট ইত্যাদি' : 'e.g. Dhaka, Chittagong, Sylhet',
      interest: lang === 'bn' ? 'আগ্রহের প্রধান সেবা বা ফিচার' : 'Primary Product / Service Interest',
      message: lang === 'bn' ? 'অতিরিক্ত বার্তা বা কোনো বিশেষ প্রয়োজন? (ঐচ্ছিক)' : 'Additional Message or Specific Requirements (Optional)',
      messagePlaceholder:
        lang === 'bn'
          ? 'আপনার প্রতিদিনের টাইপিং বা সফটওয়্যার ব্যবহারের প্রয়োজন সম্পর্কে কিছু লিখুন...'
          : 'Tell us about your daily typing workflow or specific feature requirements...',
      consent:
        lang === 'bn'
          ? 'আমি নিশ্চিত করছি যে প্রদত্ত তথ্য সঠিক এবং টাইপোম্যাটিক টিমকে আমার সাথে যোগাযোগ ও সেবা প্রদানের সম্মতি দিচ্ছি।'
          : 'I confirm that the provided information is accurate and I agree to be contacted by Typomatic for onboarding and software access.',
      submit: lang === 'bn' ? 'আগ্রহের আবেদন জমা দিন' : 'Submit Interest Request',
      submitting: lang === 'bn' ? 'জমা দেওয়া হচ্ছে...' : 'Submitting Application...',
    },
    success: {
      title: lang === 'bn' ? 'আপনার আবেদন সফলভাবে গৃহীত হয়েছে!' : 'Interest Request Submitted Successfully!',
      subtitle:
        lang === 'bn'
          ? 'টাইপোম্যাটিক-এ আগ্রহ প্রকাশের জন্য ধন্যবাদ। আপনার আবেদনটি পর্যালোচনা তালিকায় যুক্ত করা হয়েছে।'
          : 'Thank you for your interest in Typomatic. Your application has been logged into our review queue.',
      status: lang === 'bn' ? 'স্ট্যাটাস: পর্যালোচনায় অপেক্ষমাণ (PENDING)' : 'Status: Under Admin Review (PENDING)',
      refId: lang === 'bn' ? 'আপনার ট্র্যাকিং রেফারেন্স আইডি:' : 'Your Tracking Reference ID:',
      step1Title: lang === 'bn' ? '১. তথ্য যাচাইকরণ' : '1. Information Verification',
      step1Desc: lang === 'bn' ? 'আমাদের প্রতিনিধি আপনার আবেদন ও যোগাযোগের তথ্য পর্যবেক্ষণ করবে।' : 'Our team reviews your submission and verify your typing requirements.',
      step2Title: lang === 'bn' ? '২. অ্যাডমিন অনুমোদন ও যোগাযোগ' : '2. Admin Review & Outreach',
      step2Desc: lang === 'bn' ? 'আবেদন অনুমোদনের পর হোয়াটসঅ্যাপ বা ইমেইলে আপনার সাথে সরাসরি যোগাযোগ করা হবে।' : 'Once approved, we will reach out via WhatsApp/Email to schedule your onboarding.',
      step3Title: lang === 'bn' ? '৩. অ্যাকাউন্ট প্রস্তুতি ও ডেস্কটপ লাইসেন্স' : '3. Account Provisioning & Setup',
      step3Desc: lang === 'bn' ? 'আপনার অফিসিয়াল অ্যাকাউন্ট তৈরি করে ডেস্কটপ সফটওয়্যার সেটআপ গাইড প্রদান করা হবে।' : 'An official account is created and your desktop installation guide will be provided.',
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
      setErrorMessage(lang === 'bn' ? 'আবেদন জমা দিতে শর্তাবলীতে সম্মতি প্রদান করুন।' : 'Please accept the consent checkbox to continue.');
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
          interestType,
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
    setInterestType('full_suite');
    setMessage('');
    setConsent(false);
    setWebsite('');
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col justify-between selection:bg-teal-500/20 selection:text-teal-300">
      {/* Background aesthetic gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-teal-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-40 w-[600px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px]" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px]" />
      </div>

      {/* Top Navigation */}
      <header className="relative z-10 border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Typomatic" className="w-9 h-9 object-contain" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-wider text-white">TYPOMATIC</span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase rounded-full bg-teal-500/15 text-teal-300 border border-teal-500/30">
                  {lang === 'bn' ? 'আগ্রহ পোর্টাল' : 'Interest Portal'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Bengali & Arabic Desktop Productivity</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLang((prev) => (prev === 'bn' ? 'en' : 'bn'))}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-xs font-semibold text-slate-200 transition cursor-pointer"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-teal-400" />
              <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 flex-1 w-full flex flex-col justify-center">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-950/70 border border-teal-500/40 text-teal-300 text-xs font-semibold mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight sm:leading-tight mb-4">
            {t.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            {t.subtitle}
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-10 w-full">
          {t.features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="portal-glass rounded-2xl p-4 border border-slate-800 hover:border-teal-500/40 transition-colors duration-200"
              >
                <div className="w-8 h-8 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-2.5">
                  <Icon className="w-4 h-4" />
                </div>
                <h2 className="text-xs sm:text-sm font-bold text-white mb-1">{feat.title}</h2>
                <p className="text-[11px] text-slate-400 leading-normal">{feat.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Application Form or Success Container */}
        <div className="max-w-2xl mx-auto w-full">
          {successData ? (
            /* Success Confirmation State */
            <div className="portal-glass rounded-3xl p-6 sm:p-10 border border-emerald-500/30 bg-slate-900/90 shadow-2xl portal-glow animate-fade-in">
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-3xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
                  {t.success.title}
                </h2>
                <p className="text-sm text-slate-300">
                  {t.success.subtitle}
                </p>

                <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span>{t.success.status}</span>
                </div>
              </div>

              {/* Reference ID card */}
              <div className="rounded-2xl bg-slate-950/80 border border-slate-800 p-4 mb-6">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  {t.success.refId}
                </div>
                <div className="flex items-center justify-between gap-3">
                  <code className="text-sm sm:text-base font-mono font-bold text-teal-300 select-all break-all">
                    {successData.requestId}
                  </code>
                  <button
                    type="button"
                    onClick={handleCopyId}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition cursor-pointer shrink-0"
                  >
                    {copiedId ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">{lang === 'bn' ? 'কপি হয়েছে' : 'Copied'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{lang === 'bn' ? 'কপি' : 'Copy'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Next Steps List */}
              <div className="space-y-3 mb-8">
                <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-teal-500/20 text-teal-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-200">{t.success.step1Title}</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{t.success.step1Desc}</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-teal-500/20 text-teal-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-200">{t.success.step2Title}</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{t.success.step2Desc}</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-teal-500/20 text-teal-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-200">{t.success.step3Title}</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{t.success.step3Desc}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{t.success.buttonReset}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Main Input Form */
            <div className="portal-glass rounded-3xl p-6 sm:p-8 border border-slate-800 bg-slate-900/80 shadow-2xl portal-glow">
              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 flex items-center gap-2">
                  <span>{t.formHeader}</span>
                </h2>
                <div className="p-3 rounded-xl bg-teal-950/40 border border-teal-500/30 text-teal-200/90 text-xs leading-relaxed flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <span>{t.formNote}</span>
                </div>
              </div>

              {errorMessage && (
                <div className="mb-6 p-4 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs leading-relaxed flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-bold text-rose-300">{lang === 'bn' ? 'আবেদন জমায় সমস্যা' : 'Submission Error'}</p>
                    <p className="mt-0.5 text-rose-200/90">{errorMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
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

                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-teal-400" />
                    <span>{t.fields.fullName}</span>
                    <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t.fields.fullNamePlaceholder}
                    maxLength={128}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition"
                  />
                </div>

                {/* Email and Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-teal-400" />
                      <span>{t.fields.email}</span>
                      <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.fields.emailPlaceholder}
                      maxLength={256}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-teal-400" />
                      <span>{t.fields.phone}</span>
                      <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t.fields.phonePlaceholder}
                      maxLength={32}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition"
                    />
                  </div>
                </div>

                {/* Company and Location Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-teal-400" />
                      <span>{t.fields.company}</span>
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder={t.fields.companyPlaceholder}
                      maxLength={128}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-teal-400" />
                      <span>{t.fields.location}</span>
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder={t.fields.locationPlaceholder}
                      maxLength={128}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition"
                    />
                  </div>
                </div>

                {/* Primary Interest Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                    <span>{t.fields.interest}</span>
                    <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={interestType}
                    onChange={(e) => setInterestType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition cursor-pointer"
                  >
                    {INTEREST_OPTIONS.map((opt) => (
                      <option key={opt.id} value={opt.id} className="bg-slate-900 text-slate-100 py-1">
                        {opt.icon} {lang === 'bn' ? opt.labelBn : opt.labelEn}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message / Requirements */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
                    <span>{t.fields.message}</span>
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.fields.messagePlaceholder}
                    maxLength={2048}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition resize-none"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      required
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-slate-700 bg-slate-950 text-teal-600 focus:ring-teal-500 focus:ring-offset-slate-900 cursor-pointer"
                    />
                    <span className="text-xs text-slate-300 leading-relaxed font-normal">
                      {t.fields.consent}
                    </span>
                  </label>
                </div>

                {/* Submit Action */}
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-sm shadow-lg shadow-teal-900/30 flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
              </form>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">TYPOMATIC</span>
            <span>&bull;</span>
            <span>&copy; {new Date().getFullYear()} All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1.5 text-teal-400/90 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'নিরাপদ তথ্য এনক্রিপশন' : 'Encrypted & Fail-Closed Security'}</span>
            </span>
            <span>&bull;</span>
            <a
              href="mailto:support@attanjil.com"
              className="hover:text-teal-300 transition flex items-center gap-1"
            >
              <span>support@attanjil.com</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

