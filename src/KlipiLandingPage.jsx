import React, { useState, useEffect, useMemo } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  Copy,
  Check,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  Wallet,
  Scissors,
  TrendingUp,
  ChevronDown,
  Download,
  X,
  Lock,
  Eye,
  Clock,
  Users,
  Zap,
  ExternalLink,
  Smartphone,
  SlidersHorizontal
} from 'lucide-react';
import { supabase } from './supabaseClient';

// Helper to generate a clean referral code like KLIPI-4829
const generateRefCode = (handle) => {
  const clean = handle.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 5) || 'USER';
  const num = Math.floor(1000 + Math.random() * 9000);
  return `${clean}-${num}`;
};

// Inside your form onSubmit handler:
const handleJoinWaitlist = async (e) => {
  e.preventDefault();
  setSubmitting(true);
  setErrorMsg('');

  const refParam = new URLSearchParams(window.location.search).get('ref');
  const myRefCode = generateRefCode(handle);

  const { error } = await supabase.from('waitlist').insert([
    {
      role, // 'clipper' or 'streamer'
      handle: handle.trim(),
      contact: contact.trim(),
      payout_or_budget: extraField.trim(),
      referral_code: myRefCode,
      referred_by: refParam || null,
    },
  ]);

  if (error) {
    setSubmitting(false);
    if (error.code === '23505') {
      setErrorMsg('This WhatsApp number or email is already on the Klipi waitlist!');
    } else {
      setErrorMsg('Something went wrong. Please try again.');
    }
    return;
  }

  // Fetch live queue position
  const { data: stats } = await supabase.rpc('get_waitlist_stats');
  setQueuePosition((stats?.total || 1) + 140); // Optional seed offset or exact stats.total
  setGeneratedReferralLink(`${window.location.origin}/?ref=${myRefCode}`);
  setSubmitting(false);
  setSubmitted(true);
};
// --- MINIMALIST PLATFORM SVG ICONS ---
const TikTokIcon = ({ className = 'w-3.5 h-3.5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const InstagramIcon = ({ className = 'w-3.5 h-3.5' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const ShortsIcon = ({ className = 'w-3.5 h-3.5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.77 10.32l-1.2-.5L18 9.06a3.74 3.74 0 0 0-3.5-6.62L6.94a3.74 3.74 0 0 0 .23 6.74l1.2.49L6 14.93a3.75 3.75 0 0 0 3.5 6.63l8.5-4.5a3.74 3.74 0 0 0-.23-6.74zM10 14.65v-5.3L15 12l-5 2.65z" />
  </svg>
);

// --- SIGNATURE KLIPI RAZOR-SLICED PLAY WEDGE LOGO ---
const KlipiLogoMark = ({ size = 'w-7 h-7' }) => (
  <svg viewBox="0 0 32 32" fill="none" className={`${size} shrink-0`}>
    <rect width="32" height="32" rx="8" fill="#09090B" />
    <path d="M11.5 9.2L22.2 15.6L11.5 18.4V9.2Z" fill="#FFFFFF" />
    <path d="M11.5 20.2L20.8 17.8L11.5 23.2V20.2Z" fill="#10B981" />
  </svg>
);

// --- INITIAL SAMPLE WAITLIST LEADS (TUNISIA) ---
const SEED_WAITLIST = [
  {
    id: 'wl-1',
    role: 'Clipper',
    name: 'Yassine Ben Ali (@yassine.clips)',
    contact: '+216 24 819 302',
    platform: 'TikTok',
    detail: 'D17 (La Poste)',
    perk: '+15% Bonus CPM on First 3 Clips',
    refCode: 'KLIPI-YAS92',
    joinedAt: '2026-11-18 19:14'
  },
  {
    id: 'wl-2',
    role: 'Streamer / Brand',
    name: 'Rayen Gaming (@rayengamingtn)',
    contact: 'rayen@gamingtn.com',
    platform: 'Kick',
    detail: '1,500 – 3,000 DT / mo',
    perk: '0% Platform Fee for 30 Days',
    refCode: 'KLIPI-RAY44',
    joinedAt: '2026-11-18 21:05'
  },
  {
    id: 'wl-3',
    role: 'Clipper',
    name: 'Nourhene Trabelsi (@nour.edits)',
    contact: 'nourhene.tr@gmail.com',
    platform: 'Instagram Reels',
    detail: 'Flouci Wallet',
    perk: '+15% Bonus CPM on First 3 Clips',
    refCode: 'KLIPI-NOU18',
    joinedAt: '2026-11-19 10:42'
  },
  {
    id: 'wl-4',
    role: 'Streamer / Brand',
    name: 'GoRide Tunisia (@goride.tn)',
    contact: '+216 55 410 988',
    platform: 'TikTok',
    detail: '3,000+ DT / mo',
    perk: '0% Platform Fee for 30 Days',
    refCode: 'KLIPI-GOR71',
    joinedAt: '2026-11-19 13:20'
  }
];

const FAQ_ITEMS = [
  {
    q: 'What is the minimum number of views needed to earn Dinars (DT)?',
    a: 'Each streamer or brand sets a clear minimum threshold—typically between 1,500 and 3,000 organic views per clip. Once your clip crosses that threshold and passes our view-velocity check, every 1,000 views earns you the campaign’s published CPM rate up to the per-clip cap.'
  },
  {
    q: 'How does Klipi block fake views and SMM bot panels?',
    a: 'Every submitted TikTok, Reel, or Short goes through a 3-signal check before funds unlock: (1) continuous view-velocity curve tracking to spot unnatural vertical spikes, (2) view-to-like/comment ratio scoring, and (3) mandatory mention/hashtag verification. Flagged clips are blocked automatically so honest clippers and creators stay protected.'
  },
  {
    q: 'How and when do Tunisian clippers withdraw their earnings?',
    a: 'Once a clip’s 48-hour verification hold completes and the streamer approves, your balance moves to Available TND (DT). You can cash out starting from 10 DT directly to D17 (La Poste), Flouci, a Tunisian bank RIB/CIB, or mobile top-up (Ooredoo, Orange, Tunisie Telecom).'
  },
  {
    q: 'What happens if a streamer’s campaign ends with unspent money in escrow?',
    a: 'Any unspent TND remaining in a campaign pool when the timer ends or when a streamer closes the campaign is 100% refundable back to the streamer’s wallet or original payment method—you only ever pay for verified views delivered.'
  },
  {
    q: 'Do I need thousands of followers to start clipping on Klipi?',
    a: 'No. On TikTok, Reels, and Shorts, a brand-new 0-follower theme page can hit 50,000+ views with a strong 3-second hook. Klipi pays strictly for verified video performance, not your follower count.'
  }
];

export default function App() {
  // Waitlist Persistence in localStorage
  const [waitlist, setWaitlist] = useState(() => {
    try {
      const saved = localStorage.getItem('klipi_tn_waitlist_v1');
      return saved ? JSON.parse(saved) : SEED_WAITLIST;
    } catch {
      return SEED_WAITLIST;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('klipi_tn_waitlist_v1', JSON.stringify(waitlist));
    } catch {
      // ignore storage errors in restricted environments
    }
  }, [waitlist]);

  // Hero Waitlist Form State
  const [role, setRole] = useState('Clipper'); // 'Clipper' | 'Streamer / Brand'
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [platform, setPlatform] = useState('TikTok');
  const [detailField, setDetailField] = useState('D17 (La Poste)');
  const [submittedEntry, setSubmittedEntry] = useState(null);
  const [copiedRef, setCopiedRef] = useState(false);

  // Sync default conditional select when role switches
  const handleRoleSwitch = (nextRole) => {
    setRole(nextRole);
    setSubmittedEntry(null);
    if (nextRole === 'Clipper') {
      setPlatform('TikTok');
      setDetailField('D17 (La Poste)');
    } else {
      setPlatform('Kick');
      setDetailField('500 – 1,500 DT / mo');
    }
  };

  // Interactive Product Preview Tabs ('marketplace' | 'fraud' | 'wallet')
  const [previewTab, setPreviewTab] = useState('marketplace');
  const [selectedMockBounty, setSelectedMockBounty] = useState(0);
  const [mockReviewState, setMockReviewState] = useState({
    sub1: 'Pending',
    sub2: 'Flagged'
  });
  const [selectedRail, setSelectedRail] = useState('D17');

  // How It Works Role Toggle
  const [howRole, setHowRole] = useState('Clipper');

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(0);

  // Founder Admin Waitlist Drawer
  const [founderDrawerOpen, setFounderDrawerOpen] = useState(false);

  // Dynamic Founding Spots Counters
  const clipperSpotsLeft = useMemo(() => {
    const clipperCount = waitlist.filter((w) => w.role === 'Clipper').length;
    return Math.max(12, 150 - clipperCount);
  }, [waitlist]);

  const streamerSpotsLeft = useMemo(() => {
    const streamerCount = waitlist.filter((w) => w.role === 'Streamer / Brand').length;
    return Math.max(4, 40 - streamerCount);
  }, [waitlist]);

  // Handle Waitlist Submission
  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !contact.trim()) return;

    const cleanPrefix = fullName
      .trim()
      .replace(/[^a-zA-Z0-9]/g, '')
      .slice(0, 3)
      .toUpperCase() || 'TN';
    const randomNum = Math.floor(10 + Math.random() * 89);

    const newEntry = {
      id: `wl-${Date.now()}`,
      role,
      name: fullName.trim(),
      contact: contact.trim(),
      platform,
      detail: detailField,
      perk:
        role === 'Clipper'
          ? '+15% Bonus CPM on First 3 Clips'
          : '0% Platform Fee for 30 Days',
      refCode: `KLIPI-${cleanPrefix}${randomNum}`,
      joinedAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
    };

    setWaitlist((prev) => [newEntry, ...prev]);
    setSubmittedEntry({
      ...newEntry,
      position: waitlist.length + 138 // Realistic early-access queue number
    });
  };

  // Copy Referral Link
  const handleCopyReferral = () => {
    if (!submittedEntry) return;
    const shareUrl = `https://klipi.tn/?ref=${submittedEntry.refCode}`;
    navigator.clipboard?.writeText(shareUrl);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  // Export Waitlist CSV for Founder
  const handleExportCsv = () => {
    const headers = ['ID', 'Role', 'Name / Handle', 'Email or WhatsApp', 'Main Platform', 'Cashout / Budget', 'Founding Perk', 'Referral Code', 'Joined At'];
    const rows = waitlist.map((item) => [
      item.id,
      item.role,
      `"${item.name.replace(/"/g, '""')}"`,
      `"${item.contact.replace(/"/g, '""')}"`,
      item.platform,
      `"${item.detail.replace(/"/g, '""')}"`,
      `"${item.perk}"`,
      item.refCode,
      item.joinedAt
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `klipi_tn_waitlist_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Smooth scroll helper
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Interactive Mockup Data
  const mockBounties = [
    {
      creator: 'Rayen Gaming',
      category: 'Gaming & Kick',
      cpm: '2.50 DT',
      minViews: '2K views',
      remaining: '1,420 DT',
      total: '2,000 DT',
      pct: 71,
      title: 'Clip funny rage moments & 1v5 clutches from last night’s Kick stream',
      spike: '01:14:20 • GTA RP Heist Finale (Chat +420%)'
    },
    {
      creator: 'Coffee & Code Podcast',
      category: 'Podcasts & Tech',
      cpm: '1.80 DT',
      minViews: '3K views',
      remaining: '2,340 DT',
      total: '3,000 DT',
      pct: 78,
      title: 'High-retention founder stories & salary debates from Episode #68',
      spike: '00:22:15 • Building SaaS from Tunis (Chat +290%)'
    },
    {
      creator: 'GoRide Tunisia',
      category: 'Apps & Brands',
      cpm: '3.20 DT',
      minViews: '1.5K views',
      remaining: '3,180 DT',
      total: '4,000 DT',
      pct: 80,
      title: 'Creative reels showing instant campus rides & student promo codes',
      spike: 'Official B-Roll & Promo Pack Included'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#09090B] font-sans antialiased selection:bg-emerald-100 selection:text-emerald-950">
      {/* =====================================================================
          STICKY GLASSMORPHIC TOP NAVBAR
         ===================================================================== */}
      <header className="sticky top-0 z-40 h-16 bg-white/85 backdrop-blur-md border-b border-[#E5E7EB]">
        <div className="max-w-6xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Brand Mark */}
          <a
            href="#top"
            className="flex items-center gap-2.5 focus:outline-none"
          >
            <KlipiLogoMark />
            <div className="flex items-baseline">
              <span className="text-[20px] font-extrabold tracking-[-0.04em] text-[#09090B]">
                klipi
              </span>
              <span className="text-[13px] font-bold tracking-tight text-[#10B981]">
                .tn
              </span>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-[#52525B]">
            <button
              onClick={() => scrollToSection('preview')}
              className="hover:text-[#09090B] transition-colors"
            >
              Product Preview
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="hover:text-[#09090B] transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('deals')}
              className="hover:text-[#09090B] transition-colors"
            >
              Early Access Deals
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="hover:text-[#09090B] transition-colors"
            >
              FAQ
            </button>
          </nav>

          {/* Primary CTA */}
          <div className="flex items-center gap-2.5">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-medium text-[#52525B] bg-[#F9FAFB] border border-[#E5E7EB] px-2.5 py-1 rounded-full tabular-nums">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              {waitlist.length + 137} joined
            </span>
            <button
              onClick={() => scrollToSection('waitlist-form')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#09090B] hover:bg-zinc-800 text-white text-xs font-semibold transition-colors"
            >
              <span>Join Waitlist</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================================
          HERO SECTION + EMBEDDED WORKING EARLY ACCESS WAITLIST
         ===================================================================== */}
      <section id="top" className="pt-12 pb-16 sm:pt-16 sm:pb-24 border-b border-[#E5E7EB]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left 6 Cols: Value Proposition */}
            <div className="lg:col-span-6 space-y-6 pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5E7EB] text-xs font-medium text-[#09090B] shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span>Tunisia Creator Economy • Early Access Open</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.035em] text-[#09090B] leading-[1.08]">
                Turn viral stream clips into{' '}
                <span className="text-[#10B981]">real Dinars (DT).</span>
              </h1>

              <p className="text-base sm:text-lg text-[#52525B] leading-relaxed max-w-xl">
                Tunisian streamers, podcasters, and brands fund verified TND bounty pools. Clippers (15–40) post short clips on TikTok, Reels & Shorts and get paid per 1,000 organic views—straight to{' '}
                <span className="font-semibold text-[#09090B]">D17, Flouci, or CIB.</span>
              </p>

              {/* Key Trust Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-2 max-w-lg">
                <div className="bg-white border border-[#E5E7EB] rounded-xl p-3.5">
                  <div className="text-lg sm:text-xl font-bold text-[#10B981] tabular-nums">
                    1.50–3.50 DT
                  </div>
                  <div className="text-[11px] font-medium text-[#52525B] mt-0.5">
                    Avg. payout / 1K views
                  </div>
                </div>
                <div className="bg-white border border-[#E5E7EB] rounded-xl p-3.5">
                  <div className="text-lg sm:text-xl font-bold text-[#09090B] tabular-nums">
                    100% Escrow
                  </div>
                  <div className="text-[11px] font-medium text-[#52525B] mt-0.5">
                    Funds locked before clipping
                  </div>
                </div>
                <div className="bg-white border border-[#E5E7EB] rounded-xl p-3.5">
                  <div className="text-lg sm:text-xl font-bold text-[#09090B] tabular-nums">
                    D17 & Flouci
                  </div>
                  <div className="text-[11px] font-medium text-[#52525B] mt-0.5">
                    Fast local TND cashouts
                  </div>
                </div>
              </div>

              {/* Supported Platforms Strip */}
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-[#52525B]">
                <span className="font-medium">Supported platforms:</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-[#E5E7EB] font-medium text-[#09090B]">
                  <TikTokIcon className="w-3.5 h-3.5" /> TikTok
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-[#E5E7EB] font-medium text-[#09090B]">
                  <InstagramIcon className="w-3.5 h-3.5" /> Reels
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-[#E5E7EB] font-medium text-[#09090B]">
                  <ShortsIcon className="w-3.5 h-3.5" /> Shorts
                </span>
              </div>
            </div>

            {/* Right 6 Cols: Interactive Hero Waitlist Card */}
            <div id="waitlist-form" className="lg:col-span-6">
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-7 shadow-sm">
                {submittedEntry ? (
                  /* --- VIP EARLY ACCESS PASS (POST-SUBMIT STATE) --- */
                  <div className="space-y-5">
                    <div className="flex items-start justify-between gap-3 pb-4 border-b border-[#E5E7EB]">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] border border-emerald-200 flex items-center justify-center text-[#10B981]">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#10B981]">
                            Founding Access Reserved
                          </span>
                          <h3 className="text-base font-bold text-[#09090B]">
                            You’re on the Klipi.tn Waitlist!
                          </h3>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-md bg-[#09090B] text-white text-xs font-bold tabular-nums">
                        Queue #{submittedEntry.position}
                      </span>
                    </div>

                    {/* Digital Founding Member Card */}
                    <div className="rounded-xl bg-[#09090B] text-white p-5 space-y-4 relative overflow-hidden">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <KlipiLogoMark size="w-6 h-6" />
                          <span className="text-sm font-bold tracking-tight">
                            klipi<span className="text-[#10B981]">.tn</span> Founding Pass
                          </span>
                        </div>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-white/10 text-emerald-300">
                          {submittedEntry.role}
                        </span>
                      </div>

                      <div>
                        <div className="text-xs text-zinc-400">Member</div>
                        <div className="text-base font-bold">{submittedEntry.name}</div>
                        <div className="text-xs text-zinc-400 mt-0.5">
                          {submittedEntry.platform} • {submittedEntry.detail}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                        <div>
                          <div className="text-[10px] uppercase tracking-wider text-zinc-400">
                            Unlocked Early Bird Deal
                          </div>
                          <div className="text-xs font-bold text-[#10B981]">
                            {submittedEntry.perk}
                          </div>
                        </div>
                        <span className="text-[11px] font-mono text-zinc-400">
                          {submittedEntry.refCode}
                        </span>
                      </div>
                    </div>

                    {/* Referral Jump-the-Queue Box */}
                    <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#09090B]">
                          Jump +15 spots in the queue
                        </span>
                        <span className="text-[11px] text-[#52525B]">
                          Share with Tunisian creators
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          readOnly
                          value={`https://klipi.tn/?ref=${submittedEntry.refCode}`}
                          className="w-full h-9 px-3 bg-white border border-[#E5E7EB] rounded-lg text-xs font-mono text-[#52525B]"
                        />
                        <button
                          type="button"
                          onClick={handleCopyReferral}
                          className="h-9 px-3.5 rounded-lg bg-[#09090B] hover:bg-zinc-800 text-white text-xs font-semibold inline-flex items-center gap-1.5 shrink-0 transition-colors"
                        >
                          {copiedRef ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-[#10B981]" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSubmittedEntry(null);
                        setFullName('');
                        setContact('');
                      }}
                      className="text-xs font-medium text-[#52525B] hover:text-[#09090B] underline"
                    >
                      Register another account or teammate
                    </button>
                  </div>
                ) : (
                  /* --- WAITLIST REGISTRATION FORM --- */
                  <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-[#09090B]">
                          Request Early Access
                        </h2>
                        <span className="text-[11px] font-semibold text-[#10B981] bg-[#ECFDF5] border border-emerald-200 px-2 py-0.5 rounded-full">
                          Founding Perks Active
                        </span>
                      </div>
                      <p className="text-xs text-[#52525B]">
                        Lock in launch discounts & priority onboarding before public release.
                      </p>
                    </div>

                    {/* Role Segmented Toggle */}
                    <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
                      <button
                        type="button"
                        onClick={() => handleRoleSwitch('Clipper')}
                        className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                          role === 'Clipper'
                            ? 'bg-[#09090B] text-white shadow-2xs'
                            : 'text-[#52525B] hover:text-[#09090B]'
                        }`}
                      >
                        <Scissors className="w-3.5 h-3.5" />
                        <span>I’m a Clipper (Earn DT)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRoleSwitch('Streamer / Brand')}
                        className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                          role === 'Streamer / Brand'
                            ? 'bg-[#09090B] text-white shadow-2xs'
                            : 'text-[#52525B] hover:text-[#09090B]'
                        }`}
                      >
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>Streamer / Brand</span>
                      </button>
                    </div>

                    {/* Dynamic Founding Deal Callout */}
                    <div className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg bg-[#ECFDF5]/80 border border-emerald-200/80 text-xs">
                      <span className="font-semibold text-[#065F46]">
                        {role === 'Clipper'
                          ? '🎁 Perk: +15% Bonus CPM on your first 3 clips'
                          : '🎁 Perk: 0% Platform Fee for your first 30 days'}
                      </span>
                      <span className="text-[11px] font-bold text-[#10B981] tabular-nums shrink-0">
                        {role === 'Clipper'
                          ? `${clipperSpotsLeft} spots left`
                          : `${streamerSpotsLeft} spots left`}
                      </span>
                    </div>

                    {/* Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#09090B] mb-1">
                          {role === 'Clipper' ? 'Name or TikTok/IG Handle' : 'Creator or Brand Name'}
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder={
                            role === 'Clipper' ? 'e.g. Ala (@ala.clips)' : 'e.g. Rayen Gaming'
                          }
                          className="w-full h-10 px-3 bg-white border border-[#E5E7EB] rounded-lg text-xs text-[#09090B] placeholder-[#52525B]/60 focus:outline-none focus:border-[#09090B]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#09090B] mb-1">
                          WhatsApp (+216) or Email
                        </label>
                        <input
                          type="text"
                          required
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                          placeholder="e.g. 22 345 678 or name@mail.com"
                          className="w-full h-10 px-3 bg-white border border-[#E5E7EB] rounded-lg text-xs text-[#09090B] placeholder-[#52525B]/60 focus:outline-none focus:border-[#09090B]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#09090B] mb-1">
                          {role === 'Clipper' ? 'Main Clipping Platform' : 'Main Stream / Content Channel'}
                        </label>
                        <select
                          value={platform}
                          onChange={(e) => setPlatform(e.target.value)}
                          className="w-full h-10 px-3 bg-white border border-[#E5E7EB] rounded-lg text-xs font-medium text-[#09090B] focus:outline-none focus:border-[#09090B]"
                        >
                          {role === 'Clipper' ? (
                            <>
                              <option value="TikTok">TikTok</option>
                              <option value="Instagram Reels">Instagram Reels</option>
                              <option value="YouTube Shorts">YouTube Shorts</option>
                            </>
                          ) : (
                            <>
                              <option value="Kick">Kick</option>
                              <option value="Twitch">Twitch</option>
                              <option value="YouTube">YouTube / Podcast</option>
                              <option value="TikTok / Brand">TikTok / Brand Campaign</option>
                            </>
                          )}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#09090B] mb-1">
                          {role === 'Clipper'
                            ? 'Preferred TND Cashout'
                            : 'Est. Monthly Bounty Budget'}
                        </label>
                        <select
                          value={detailField}
                          onChange={(e) => setDetailField(e.target.value)}
                          className="w-full h-10 px-3 bg-white border border-[#E5E7EB] rounded-lg text-xs font-medium text-[#09090B] focus:outline-none focus:border-[#09090B]"
                        >
                          {role === 'Clipper' ? (
                            <>
                              <option value="D17 (La Poste)">D17 (La Poste)</option>
                              <option value="Flouci Wallet">Flouci Wallet</option>
                              <option value="CIB / Bank RIB">CIB / Bank RIB</option>
                              <option value="Telecom Recharge">Telecom Recharge (Ooredoo/Orange/TT)</option>
                            </>
                          ) : (
                            <>
                              <option value="200 – 500 DT / mo">200 – 500 DT / mo</option>
                              <option value="500 – 1,500 DT / mo">500 – 1,500 DT / mo</option>
                              <option value="1,500 – 3,000 DT / mo">1,500 – 3,000 DT / mo</option>
                              <option value="3,000+ DT / mo">3,000+ DT / mo</option>
                            </>
                          )}
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full h-11 rounded-lg bg-[#09090B] hover:bg-zinc-800 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 shadow-2xs"
                    >
                      <span>
                        {role === 'Clipper'
                          ? 'Claim Founding Clipper Spot'
                          : 'Claim 0% Fee Streamer / Brand Access'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <p className="text-[11px] text-center text-[#52525B]">
                      No spam. We’ll message you on WhatsApp or email when your invite wave opens.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          INTERACTIVE PROTOTYPE SCREENSHOTS / LIVE UI SHOWCASE
         ===================================================================== */}
      <section id="preview" className="py-16 sm:py-24 border-b border-[#E5E7EB]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#10B981]">
              Interactive Product Preview
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.03em] text-[#09090B]">
              Inside the Klipi.tn Web App
            </h2>
            <p className="text-sm text-[#52525B]">
              Click through the three core screens of our working prototype—built for speed, transparent TND escrow, and automated bot protection.
            </p>
          </div>

          {/* 3 Crisp Showcase Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'marketplace', label: '1. Clipper Bounty Marketplace' },
              { id: 'fraud', label: '2. Streamer Escrow & AI Fraud Shield' },
              { id: 'wallet', label: '3. Instant TND Wallet & Cashout' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setPreviewTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all ${
                  previewTab === tab.id
                    ? 'bg-[#09090B] text-white border-[#09090B]'
                    : 'bg-white text-[#52525B] border-[#E5E7EB] hover:text-[#09090B]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* High-Resolution Browser Frame Mockup */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
            {/* Browser Top Chrome */}
            <div className="h-11 px-4 bg-[#F9FAFB] border-b border-[#E5E7EB] flex items-center justify-between gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
              </div>
              <div className="px-3 py-1 rounded-md bg-white border border-[#E5E7EB] text-[11px] font-mono text-[#52525B] flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-[#10B981]" />
                <span>
                  https://app.klipi.tn/
                  {previewTab === 'marketplace'
                    ? 'discover'
                    : previewTab === 'fraud'
                    ? 'studio/reviews'
                    : 'wallet'}
                </span>
              </div>
              <span className="text-[11px] font-medium text-[#52525B] hidden sm:inline">
                Interactive Preview
              </span>
            </div>

            {/* Simulated App Top Bar */}
            <div className="h-12 px-5 bg-white border-b border-[#E5E7EB] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <KlipiLogoMark size="w-6 h-6" />
                <span className="text-sm font-extrabold tracking-tight text-[#09090B]">
                  klipi<span className="text-[#10B981]">.tn</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-[#ECFDF5] border border-emerald-200 text-[11px] font-bold text-[#10B981] tabular-nums">
                  142.50 DT Available
                </span>
              </div>
            </div>

            {/* TAB 1: CLIPPER BOUNTY MARKETPLACE SCREENSHOT */}
            {previewTab === 'marketplace' && (
              <div className="p-5 sm:p-7 bg-[#F9FAFB] space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-[#09090B]">
                      Active Tunisian Bounties (Click any card to inspect)
                    </h3>
                    <p className="text-xs text-[#52525B]">
                      Escrow verified • Auto-tracking views every 15 minutes
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="px-2.5 py-1 rounded-md bg-[#09090B] text-white font-medium">
                      All Categories
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-white border border-[#E5E7EB] text-[#52525B]">
                      Gaming & Kick
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-white border border-[#E5E7EB] text-[#52525B] hidden sm:inline">
                      Apps & Brands
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {mockBounties.map((b, idx) => {
                    const isSelected = selectedMockBounty === idx;
                    return (
                      <div
                        key={b.creator}
                        onClick={() => setSelectedMockBounty(idx)}
                        className={`bg-white rounded-xl p-4 border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                          isSelected
                            ? 'border-[#09090B] ring-1 ring-[#09090B]'
                            : 'border-[#E5E7EB] hover:border-zinc-300'
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-1">
                                <span className="text-xs font-bold text-[#09090B]">
                                  {b.creator}
                                </span>
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                              </div>
                              <span className="text-[11px] text-[#52525B]">{b.category}</span>
                            </div>
                            <span className="px-2 py-0.5 rounded bg-[#ECFDF5] border border-emerald-200 text-[11px] font-bold text-[#10B981] tabular-nums">
                              {b.cpm} / 1K
                            </span>
                          </div>

                          <p className="text-xs font-medium text-[#09090B] leading-snug">
                            {b.title}
                          </p>

                          <div className="px-2.5 py-1.5 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] text-[11px] text-[#52525B] flex items-center gap-1.5">
                            <Zap className="w-3 h-3 text-[#10B981] shrink-0" />
                            <span className="truncate">{b.spike}</span>
                          </div>
                        </div>

                        <div className="space-y-1.5 pt-2 border-t border-[#E5E7EB]">
                          <div className="flex justify-between text-[11px] tabular-nums">
                            <span className="font-semibold text-[#09090B]">
                              {b.remaining}{' '}
                              <span className="font-normal text-[#52525B]">/ {b.total}</span>
                            </span>
                            <span className="text-[#52525B]">{b.pct}% left</span>
                          </div>
                          <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#10B981] rounded-full"
                              style={{ width: `${b.pct}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: STREAMER ESCROW & AI FRAUD SHIELD SCREENSHOT */}
            {previewTab === 'fraud' && (
              <div className="p-5 sm:p-7 bg-[#F9FAFB] space-y-5">
                {/* Top KPI Mini-Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-white border border-[#E5E7EB] rounded-xl p-3.5">
                    <div className="text-[11px] text-[#52525B]">Active Escrow</div>
                    <div className="text-lg font-bold text-[#09090B] tabular-nums mt-0.5">
                      1,420.00 DT
                    </div>
                  </div>
                  <div className="bg-white border border-[#E5E7EB] rounded-xl p-3.5">
                    <div className="text-[11px] text-[#52525B]">Verified Organic Views</div>
                    <div className="text-lg font-bold text-[#09090B] tabular-nums mt-0.5">
                      163,700
                    </div>
                  </div>
                  <div className="bg-white border border-[#E5E7EB] rounded-xl p-3.5">
                    <div className="text-[11px] text-[#52525B]">Fraud Blocked</div>
                    <div className="text-lg font-bold text-[#10B981] tabular-nums mt-0.5">
                      155.00 DT
                    </div>
                  </div>
                  <div className="bg-white border border-[#E5E7EB] rounded-xl p-3.5">
                    <div className="text-[11px] text-[#52525B]">Avg. Cost / 1K Views</div>
                    <div className="text-lg font-bold text-[#09090B] tabular-nums mt-0.5">
                      2.35 DT
                    </div>
                  </div>
                </div>

                {/* Interactive Review Table */}
                <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB] text-[11px] font-semibold text-[#52525B]">
                          <th className="py-2.5 px-4">Clipper</th>
                          <th className="py-2.5 px-4">Views</th>
                          <th className="py-2.5 px-4">Payout</th>
                          <th className="py-2.5 px-4">AI Fraud Score</th>
                          <th className="py-2.5 px-4 text-right">Interactive Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E5E7EB]">
                        <tr>
                          <td className="py-3 px-4 font-semibold text-[#09090B]">
                            @yassine.clips <span className="text-[#52525B] font-normal">• TikTok</span>
                          </td>
                          <td className="py-3 px-4 tabular-nums font-medium">34,200</td>
                          <td className="py-3 px-4 tabular-nums font-bold text-[#10B981]">
                            85.50 DT
                          </td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#ECFDF5] text-[#10B981] border border-emerald-200">
                              <ShieldCheck className="w-3 h-3" /> Organic 98/100
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            {mockReviewState.sub1 === 'Pending' ? (
                              <button
                                onClick={() =>
                                  setMockReviewState((s) => ({ ...s, sub1: 'Approved' }))
                                }
                                className="px-2.5 py-1 rounded-md bg-[#09090B] text-white text-[11px] font-semibold hover:bg-zinc-800"
                              >
                                Approve & Release DT
                              </button>
                            ) : (
                              <span className="text-[11px] font-bold text-[#10B981]">
                                ✓ Paid from Escrow
                              </span>
                            )}
                          </td>
                        </tr>

                        <tr>
                          <td className="py-3 px-4 font-semibold text-[#09090B]">
                            @botfarm_99 <span className="text-[#52525B] font-normal">• TikTok</span>
                          </td>
                          <td className="py-3 px-4 tabular-nums font-medium">62,000</td>
                          <td className="py-3 px-4 tabular-nums font-bold text-[#52525B] line-through">
                            155.00 DT
                          </td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                              <AlertCircle className="w-3 h-3" /> Bot Spike 18/100
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            {mockReviewState.sub2 === 'Flagged' ? (
                              <button
                                onClick={() =>
                                  setMockReviewState((s) => ({ ...s, sub2: 'Blocked' }))
                                }
                                className="px-2.5 py-1 rounded-md bg-white border border-[#E5E7EB] text-red-600 text-[11px] font-semibold hover:bg-red-50"
                              >
                                Reject & Keep Escrow
                              </button>
                            ) : (
                              <span className="text-[11px] font-semibold text-[#52525B]">
                                Blocked • 155 DT Saved
                              </span>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: INSTANT TND WALLET & CASHOUT SCREENSHOT */}
            {previewTab === 'wallet' && (
              <div className="p-5 sm:p-7 bg-[#F9FAFB]">
                <div className="max-w-xl mx-auto bg-white border border-[#E5E7EB] rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                    <div>
                      <span className="text-xs text-[#52525B]">Available Clipper Balance</span>
                      <div className="text-2xl font-extrabold text-[#10B981] tabular-nums">
                        142.50 DT
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-[#F9FAFB] border border-[#E5E7EB] text-[11px] font-medium text-[#52525B]">
                      Min withdrawal: 10.00 DT
                    </span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-[#09090B]">
                      Choose Local Payout Rail (Click to preview)
                    </span>
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        { id: 'D17', name: 'D17 (La Poste)', fee: '0.50 DT fee • Same day' },
                        { id: 'Flouci', name: 'Flouci Wallet', fee: '0.00 DT fee • Instant' },
                        { id: 'CIB', name: 'Bank Transfer (RIB/CIB)', fee: '1.00 DT fee • 24h' },
                        { id: 'Telecom', name: 'Mobile Top-Up', fee: 'Ooredoo / Orange / TT' }
                      ].map((rail) => (
                        <button
                          key={rail.id}
                          type="button"
                          onClick={() => setSelectedRail(rail.id)}
                          className={`p-3 rounded-lg border text-left transition-all ${
                            selectedRail === rail.id
                              ? 'border-[#09090B] bg-[#F9FAFB]'
                              : 'border-[#E5E7EB] bg-white hover:bg-[#F9FAFB]'
                          }`}
                        >
                          <div className="text-xs font-bold text-[#09090B]">{rail.name}</div>
                          <div className="text-[11px] text-[#52525B] mt-0.5">{rail.fee}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#ECFDF5]/70 border border-emerald-200 flex items-center justify-between text-xs">
                    <span className="text-[#065F46] font-medium">
                      Selected rail: <strong>{selectedRail}</strong>
                    </span>
                    <span className="font-bold text-[#10B981] tabular-nums">
                      Net payout: {selectedRail === 'Flouci' || selectedRail === 'Telecom' ? '142.50 DT' : selectedRail === 'D17' ? '142.00 DT' : '141.50 DT'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================================
          HOW KLIPI WORKS (3-STEP FLOW TOGGLE)
         ===================================================================== */}
      <section id="how-it-works" className="py-16 sm:py-24 border-b border-[#E5E7EB]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#10B981]">
                Simple Workflow
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.03em] text-[#09090B]">
                How Klipi Works
              </h2>
            </div>

            {/* Audience Switcher */}
            <div className="inline-flex p-1 rounded-xl bg-white border border-[#E5E7EB] self-start">
              <button
                onClick={() => setHowRole('Clipper')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  howRole === 'Clipper'
                    ? 'bg-[#09090B] text-white'
                    : 'text-[#52525B] hover:text-[#09090B]'
                }`}
              >
                For Clippers (15–40)
              </button>
              <button
                onClick={() => setHowRole('Streamer')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  howRole === 'Streamer'
                    ? 'bg-[#09090B] text-white'
                    : 'text-[#52525B] hover:text-[#09090B]'
                }`}
              >
                For Streamers & Brands
              </button>
            </div>
          </div>

          {howRole === 'Clipper' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: '01',
                  title: 'Pick a funded TND bounty',
                  desc: 'Browse active campaigns from Tunisian streamers, podcasts, and apps. Check the rate per 1,000 views, minimum view threshold, and grab Hot VOD timestamps.'
                },
                {
                  step: '02',
                  title: 'Edit & post on TikTok, Reels or Shorts',
                  desc: 'Cut the funniest or highest-retention 30–60s moment, add clean captions, tag the creator’s required handle, and paste your published link into Klipi.'
                },
                {
                  step: '03',
                  title: 'Get verified & cash out in Dinars',
                  desc: 'Our engine tracks your organic view growth automatically. Once verified, withdraw your TND balance straight to D17, Flouci, or CIB.'
                }
              ].map((item) => (
                <div
                  key={item.step}
                  className="bg-white border border-[#E5E7EB] rounded-2xl p-6 space-y-3"
                >
                  <span className="inline-block text-xs font-mono font-bold text-[#10B981] bg-[#ECFDF5] border border-emerald-200 px-2.5 py-1 rounded-md">
                    Step {item.step}
                  </span>
                  <h3 className="text-base font-bold text-[#09090B]">{item.title}</h3>
                  <p className="text-xs text-[#52525B] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: '01',
                  title: 'Fund a bounty pool in TND (DT)',
                  desc: 'Set your total budget (starting from 200 DT), your payout rate per 1,000 views, minimum views required, and max payout per single clip.'
                },
                {
                  step: '02',
                  title: 'Dozens of clippers distribute your content',
                  desc: 'Independent Tunisian clippers slice your VODs and distribute your best moments across dozens of active TikTok, Reels, and Shorts pages simultaneously.'
                },
                {
                  step: '03',
                  title: 'Pay only for verified organic views',
                  desc: 'AI view-velocity checks block fake SMM bot views before escrow releases. Unspent budget at the end of your campaign is 100% refundable.'
                }
              ].map((item) => (
                <div
                  key={item.step}
                  className="bg-white border border-[#E5E7EB] rounded-2xl p-6 space-y-3"
                >
                  <span className="inline-block text-xs font-mono font-bold text-[#09090B] bg-[#F9FAFB] border border-[#E5E7EB] px-2.5 py-1 rounded-md">
                    Step {item.step}
                  </span>
                  <h3 className="text-base font-bold text-[#09090B]">{item.title}</h3>
                  <p className="text-xs text-[#52525B] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          EARLY ACCESS FOUNDING DEALS (2 COMPARISON CARDS)
         ===================================================================== */}
      <section id="deals" className="py-16 sm:py-24 border-b border-[#E5E7EB]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#10B981]">
              Limited Launch Cohort
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.03em] text-[#09090B]">
              Early Access Founding Deals
            </h2>
            <p className="text-sm text-[#52525B]">
              Join the waitlist today to lock in permanent founding perks when we open our first Tunisian wave.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Founding Clipper Card */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-[#ECFDF5] border border-emerald-200 text-xs font-bold text-[#10B981]">
                    Founding Clipper Pass
                  </span>
                  <span className="text-xs font-bold text-[#09090B] tabular-nums">
                    {clipperSpotsLeft} / 150 spots left
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-[#09090B]">
                    +15% Bonus CPM on First 3 Clips
                  </h3>
                  <p className="text-xs text-[#52525B] mt-1">
                    For short-form editors & clippers aged 15–40 across Tunisia.
                  </p>
                </div>

                <ul className="space-y-2.5 pt-2 border-t border-[#E5E7EB] text-xs text-[#09090B]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span>+15% extra Dinars paid by Klipi on your first 3 verified clips</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span>Zero-fee Flouci & D17 withdrawals during launch month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span>Early access to high-paying launch bounties before public release</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => {
                  handleRoleSwitch('Clipper');
                  scrollToSection('waitlist-form');
                }}
                className="w-full h-10 rounded-lg bg-[#09090B] hover:bg-zinc-800 text-white text-xs font-semibold transition-colors"
              >
                Claim Founding Clipper Spot
              </button>
            </div>

            {/* Founding Streamer / Brand Card */}
            <div className="bg-white border border-[#09090B] rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 relative">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-[#09090B] text-white text-xs font-bold">
                    Founding Streamer / Brand
                  </span>
                  <span className="text-xs font-bold text-[#10B981] tabular-nums">
                    {streamerSpotsLeft} / 40 spots left
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-[#09090B]">
                    0% Platform Fee for 30 Days
                  </h3>
                  <p className="text-xs text-[#52525B] mt-1">
                    For Kick/Twitch streamers, podcasters, and Tunisian consumer apps.
                  </p>
                </div>

                <ul className="space-y-2.5 pt-2 border-t border-[#E5E7EB] text-xs text-[#09090B]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span>100% of your TND budget goes directly to clippers (0% Klipi fee)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span>Featured placement at the top of the Clipper Marketplace</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span>White-glove VOD timestamp setup & AI anti-fraud protection</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => {
                  handleRoleSwitch('Streamer / Brand');
                  scrollToSection('waitlist-form');
                }}
                className="w-full h-10 rounded-lg bg-[#10B981] hover:bg-emerald-600 text-white text-xs font-semibold transition-colors"
              >
                Claim 0% Fee Streamer / Brand Access
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          BUILT FOR TRUST & SCALE (3 FEATURE PILLARS)
         ===================================================================== */}
      <section className="py-16 sm:py-24 border-b border-[#E5E7EB]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#10B981]">
              Infrastructure
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.03em] text-[#09090B]">
              Built for Trust & Scale in Tunisia
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#ECFDF5] border border-emerald-200 flex items-center justify-center text-[#10B981]">
                <Lock className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-[#09090B]">
                Automated Escrow Protection
              </h3>
              <p className="text-xs text-[#52525B] leading-relaxed">
                Clippers never have to chase creators in DMs for payment. Campaign funds are locked upfront and released automatically once view thresholds are met.
              </p>
            </div>

            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] flex items-center justify-center text-[#09090B]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-[#09090B]">
                AI View-Velocity Anti-Fraud
              </h3>
              <p className="text-xs text-[#52525B] leading-relaxed">
                We analyze view growth curves and engagement ratios over a 48-hour verification hold to block fake SMM panel views before a single Dinar leaves escrow.
              </p>
            </div>

            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#ECFDF5] border border-emerald-200 flex items-center justify-center text-[#10B981]">
                <Wallet className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-[#09090B]">
                Local TND Payout Rails
              </h3>
              <p className="text-xs text-[#52525B] leading-relaxed">
                No international cards or PayPal workarounds needed. Earn in Tunisian Dinars (DT) and withdraw directly to D17, Flouci, or any Tunisian bank RIB.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          FAQ ACCORDION
         ===================================================================== */}
      <section id="faq" className="py-16 sm:py-24 border-b border-[#E5E7EB]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#10B981]">
              Questions & Answers
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.03em] text-[#09090B]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={item.q}
                  className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-[#F9FAFB]/60 transition-colors"
                  >
                    <span className="text-xs sm:text-sm font-bold text-[#09090B]">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#52525B] shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs text-[#52525B] leading-relaxed border-t border-[#E5E7EB]/60 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          BOTTOM CTA + FOOTER WITH DISCREET FOUNDER ADMIN DRAWER TRIGGER
         ===================================================================== */}
      <footer className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
          {/* Final Banner */}
          <div className="rounded-2xl bg-[#09090B] text-white p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                Ready to clip or launch your first TND bounty?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400">
                Reserve your spot on the klipi.tn early access list and lock in founding member rewards.
              </p>
            </div>
            <button
              onClick={() => scrollToSection('waitlist-form')}
              className="px-5 py-3 rounded-lg bg-[#10B981] hover:bg-emerald-600 text-white text-xs font-bold transition-colors inline-flex items-center gap-2 shrink-0"
            >
              <span>Join Early Access Waitlist</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Footer Bottom Bar */}
          <div className="pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#52525B]">
            <div className="flex items-center gap-2">
              <KlipiLogoMark size="w-5 h-5" />
              <span className="font-bold text-[#09090B]">klipi.tn</span>
              <span>• Built for Tunisia’s Creator Economy</span>
            </div>

            <div className="flex items-center gap-4">
              <span>Tunis • Sousse • Sfax</span>
              <button
                type="button"
                onClick={() => setFounderDrawerOpen(true)}
                className="text-[11px] font-medium text-[#52525B] hover:text-[#09090B] underline underline-offset-2"
              >
                Founder View: Export Waitlist CSV ({waitlist.length})
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          FOUNDER ADMIN / WAITLIST DRAWER (CSV EXPORT + LEAD INSPECTOR)
         ===================================================================== */}
      {founderDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/35 backdrop-blur-[1px]">
          <div
            className="fixed inset-0"
            onClick={() => setFounderDrawerOpen(false)}
          />
          <aside className="relative z-10 w-full max-w-2xl bg-white h-full border-l border-[#E5E7EB] flex flex-col justify-between overflow-y-auto shadow-2xl">
            <div className="p-6 space-y-5">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#10B981]">
                    Founder Lead Console
                  </span>
                  <h3 className="text-lg font-bold text-[#09090B]">
                    Klipi.tn Waitlist Signups ({waitlist.length})
                  </h3>
                  <p className="text-xs text-[#52525B]">
                    All signups are saved in your browser and ready to export as a CSV for WhatsApp/Email outreach.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleExportCsv}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#10B981] hover:bg-emerald-600 text-white text-xs font-semibold transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFounderDrawerOpen(false)}
                    className="p-2 rounded-lg text-[#52525B] hover:bg-zinc-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Summary Counts */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
                  <div className="text-xs text-[#52525B]">Clippers Ready</div>
                  <div className="text-xl font-bold text-[#09090B] tabular-nums mt-0.5">
                    {waitlist.filter((w) => w.role === 'Clipper').length}
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
                  <div className="text-xs text-[#52525B]">Streamers & Brands</div>
                  <div className="text-xl font-bold text-[#10B981] tabular-nums mt-0.5">
                    {waitlist.filter((w) => w.role === 'Streamer / Brand').length}
                  </div>
                </div>
              </div>

              {/* Leads Table */}
              <div className="border border-[#E5E7EB] rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB] text-[11px] font-semibold text-[#52525B]">
                        <th className="py-2.5 px-3.5">Role</th>
                        <th className="py-2.5 px-3.5">Name / Handle</th>
                        <th className="py-2.5 px-3.5">Contact</th>
                        <th className="py-2.5 px-3.5">Rail / Budget</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E7EB]">
                      {waitlist.map((lead) => (
                        <tr key={lead.id} className="hover:bg-[#F9FAFB]/70">
                          <td className="py-2.5 px-3.5 whitespace-nowrap">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                lead.role === 'Clipper'
                                  ? 'bg-zinc-100 text-[#09090B]'
                                  : 'bg-[#ECFDF5] text-[#10B981]'
                              }`}
                            >
                              {lead.role}
                            </span>
                          </td>
                          <td className="py-2.5 px-3.5 font-semibold text-[#09090B]">
                            {lead.name}
                            <div className="text-[10px] font-normal text-[#52525B]">
                              {lead.platform} • {lead.refCode}
                            </div>
                          </td>
                          <td className="py-2.5 px-3.5 text-[#52525B] tabular-nums">
                            {lead.contact}
                          </td>
                          <td className="py-2.5 px-3.5 text-[#09090B] font-medium">
                            {lead.detail}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}