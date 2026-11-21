import React, { useState, useEffect } from 'react';
import {
  Search,
  CheckCircle2,
  X,
  Copy,
  Check,
  Flame,
  ShieldCheck,
  AlertTriangle,
  Lock,
  Zap,
  TrendingUp,
  ExternalLink
} from 'lucide-react';

// --- PROPRIETARY KLIPI BRAND LOGO MARK (Film-Cut K with Play Caret) ---
const KlipiLogo = ({ size = 'w-9 h-9' }) => (
  <div className={`${size} relative rounded-xl bg-gradient-to-b from-[#181924] to-[#0D0E14] border border-white/[0.12] p-1.5 flex items-center justify-center shadow-md shadow-black/50 group-hover:border-[#00F090]/50 transition-all duration-300 shrink-0`}>
    <svg viewBox="0 0 28 28" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Vertical Spine (Film Strip / 9:16 Video Frame Stem) */}
      <rect x="4" y="4" width="4" height="20" rx="2" fill="#FFFFFF" />
      {/* Upper Sliced Film Blade */}
      <path d="M10.5 13L18.5 4.5H23L14 14L10.5 13Z" fill="#00F090" />
      {/* Lower Sliced Film Blade (Play Angle) */}
      <path d="M12.5 12L21.5 23.5H17L9.5 13.5L12.5 12Z" fill="#00F090" fillOpacity="0.88" />
      {/* Precision Cut Play Caret Notch */}
      <path d="M14.5 11.5L18.5 14L14.5 16.5V11.5Z" fill="#0D0E14" />
    </svg>
  </div>
);

// --- RECENT VERIFIED PAYOUT ACTIVITY (Content Rewards live social proof ticker) ---
const RECENT_LIVE_ACTIVITIES = [
  { id: 1, type: 'payout', user: '@farouk_clips', amount: '187.50 DT', method: 'D17', creator: '@kamelgaming.tn', views: '75K', time: '2m ago' },
  { id: 2, type: 'deposit', user: '@yalladelivery.tn', amount: '3,000 DT', method: 'Escrow', desc: 'Pre-funded Promo Code Bounty Pool', time: '8m ago' },
  { id: 3, type: 'payout', user: '@sarra.edit', amount: '300.00 DT', method: 'Flouci', creator: '@tunisianfounders', views: '100K', time: '14m ago' },
  { id: 4, type: 'payout', user: '@mehdi_fx', amount: '450.00 DT', method: 'Bank RIB', creator: '@derbycafe.tn', views: '180K', time: '29m ago' },
  { id: 5, type: 'deposit', user: '@kamelgaming.tn', amount: '2,000 DT', method: 'Escrow', desc: 'Pre-funded Season 4 Kick Stream Pool', time: '41m ago' },
  { id: 6, type: 'payout', user: '@amine_reels', amount: '95.00 DT', method: 'D17', creator: '@sami.irl', views: '43K', time: '52m ago' },
];

// --- INITIAL TUNISIAN BOUNTIES WITH RICH VISUAL BANNERS & METRICS ---
const INITIAL_BOUNTIES = [
  {
    id: 'b1',
    creator: 'Kamel Gaming TN',
    handle: '@kamelgaming.tn',
    verified: true,
    category: 'Gaming & Kick',
    audience: '142K on Kick',
    payoutRate: '100% Payout Rate',
    totalPaidOut: '3,840 DT',
    bannerGradient: 'from-purple-900/80 via-[#1A1429] to-[#111218]',
    bannerBorder: 'border-purple-500/20',
    avatarBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    tagBg: 'bg-purple-500/15 text-purple-300 border-purple-500/25',
    initials: 'KG',
    themeBadge: 'GTA RP & Kick Live',
    title: 'Kick Ranked Rage & Funny Moments (Season 4 Heist)',
    cpmTnd: 2.5,
    minViews: 2000,
    maxPerClipTnd: 250,
    totalPoolTnd: 2000,
    remainingPoolTnd: 1420,
    platforms: ['TikTok', 'Reels', 'Shorts'],
    rules: [
      'Must keep @kamelgaming.tn watermark visible in top corner',
      'Minimum 2,000 organic views to unlock payout',
      'Include #KamelTN in video caption',
      '48h anti-bot hold before D17/Flouci disbursement'
    ],
    hotTimestamps: [
      { time: '01:14:22', label: '1v5 Clutch + Mic Drop', spike: '+420 msg/min' },
      { time: '02:48:05', label: 'Chat Troll Donation Reaction', spike: '+380 msg/min' },
      { time: '03:19:40', label: 'Surprise Guest Call-in', spike: '+510 msg/min' },
    ],
  },
  {
    id: 'b2',
    creator: 'Tunisian Founders Pod',
    handle: '@tunisianfounders',
    verified: true,
    category: 'Podcasts',
    audience: '85K on YouTube',
    payoutRate: '100% Payout Rate',
    totalPaidOut: '2,420 DT',
    bannerGradient: 'from-blue-900/80 via-[#131B2E] to-[#111218]',
    bannerBorder: 'border-blue-500/20',
    avatarBg: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    tagBg: 'bg-blue-500/15 text-blue-300 border-blue-500/25',
    initials: 'TF',
    themeBadge: 'Tech & Startups',
    title: 'Viral Clips: Ep. 18 — Building SaaS from Tunis to $10K MRR',
    cpmTnd: 3.0,
    minViews: 1500,
    maxPerClipTnd: 300,
    totalPoolTnd: 1500,
    remainingPoolTnd: 1180,
    platforms: ['TikTok', 'Reels'],
    rules: [
      'Add clean Arabic/French dynamic subtitles',
      'Tag @tunisianfounders in caption & bio link',
      'No misleading clickbait overlays',
      'Views verified via TikTok & IG API'
    ],
    hotTimestamps: [
      { time: '00:24:10', label: 'Why Stripe & Local Payments Matter', spike: 'High Retention' },
      { time: '00:52:33', label: 'First $10K MRR Breakdown', spike: 'Top Replay' },
    ],
  },
  {
    id: 'b3',
    creator: 'YallaDelivery TN',
    handle: '@yalladelivery.tn',
    verified: true,
    category: 'Apps & Brands',
    audience: '210K on TikTok',
    payoutRate: '100% Payout Rate',
    totalPaidOut: '5,100 DT',
    bannerGradient: 'from-emerald-900/80 via-[#11241C] to-[#111218]',
    bannerBorder: 'border-emerald-500/20',
    avatarBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    tagBg: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
    initials: 'YD',
    themeBadge: 'Consumer App & Food',
    title: 'Promo Code "KLIPI10" — Street Food & Late Night Cravings',
    cpmTnd: 4.0,
    minViews: 3000,
    maxPerClipTnd: 400,
    totalPoolTnd: 3000,
    remainingPoolTnd: 2350,
    platforms: ['TikTok', 'Reels', 'Shorts'],
    rules: [
      'Show promo code KLIPI10 on screen for at least 3 seconds',
      'Tunisia audience targeting (FR/Derja captions)',
      'Max 3 clips per creator account',
      'Verified payout via D17 or Bank Transfer'
    ],
    hotTimestamps: [
      { time: '00:04:15', label: 'B-Roll Pack: TND 10 Discount Reveal', spike: 'Brand Kit' },
      { time: '00:11:50', label: 'Fastest 15-Min Delivery Challenge', spike: 'Brand Kit' },
    ],
  },
  {
    id: 'b4',
    creator: 'Derby Café Sports',
    handle: '@derbycafe.tn',
    verified: true,
    category: 'Sports',
    audience: '95K on IG & FB',
    payoutRate: '100% Payout Rate',
    totalPaidOut: '1,960 DT',
    bannerGradient: 'from-rose-900/80 via-[#24131A] to-[#111218]',
    bannerBorder: 'border-rose-500/20',
    avatarBg: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    tagBg: 'bg-rose-500/15 text-rose-300 border-rose-500/25',
    initials: 'DC',
    themeBadge: 'Football & Live Debates',
    title: 'Champions League Live Watch-Along Reactions & Studio Debates',
    cpmTnd: 2.0,
    minViews: 2500,
    maxPerClipTnd: 200,
    totalPoolTnd: 1200,
    remainingPoolTnd: 640,
    platforms: ['TikTok', 'Reels'],
    rules: [
      'Include match score ticker overlay',
      'Must be uploaded within 24h of final whistle',
      'No copyrighted UEFA broadcast audio tracks'
    ],
    hotTimestamps: [
      { time: '01:48:12', label: '90+4 Last-Minute Goal Studio Eruption', spike: '+690 msg/min' },
      { time: '02:05:30', label: 'Post-Match Tactical Rant', spike: '+410 msg/min' },
    ],
  },
  {
    id: 'b5',
    creator: 'Sami IRL Tunis',
    handle: '@sami.irl',
    verified: false,
    category: 'Gaming & Kick',
    audience: '58K on Kick',
    payoutRate: '98% Payout Rate',
    totalPaidOut: '880 DT',
    bannerGradient: 'from-sky-900/80 via-[#12202E] to-[#111218]',
    bannerBorder: 'border-sky-500/20',
    avatarBg: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    tagBg: 'bg-sky-500/15 text-sky-300 border-sky-500/25',
    initials: 'SI',
    themeBadge: 'IRL Street Vlogs',
    title: 'La Goulette to Sidi Bou Said Night IRL Stream Highlights',
    cpmTnd: 2.2,
    minViews: 1500,
    maxPerClipTnd: 180,
    totalPoolTnd: 800,
    remainingPoolTnd: 590,
    platforms: ['TikTok', 'Shorts'],
    rules: [
      'Keep @sami.irl Kick handle pinned in comments',
      'Vertical 9:16 crop only (no black bars)'
    ],
    hotTimestamps: [
      { time: '00:39:18', label: 'Street Musician Improv Duet', spike: '+340 msg/min' },
      { time: '01:55:02', label: 'Midnight Brik Taste Test', spike: '+295 msg/min' },
    ],
  },
  {
    id: 'b6',
    creator: 'Konnect Pay TN',
    handle: '@konnect.network',
    verified: true,
    category: 'Apps & Brands',
    audience: '45K on LinkedIn',
    payoutRate: '100% Payout Rate',
    totalPaidOut: '3,200 DT',
    bannerGradient: 'from-indigo-900/80 via-[#18162E] to-[#111218]',
    bannerBorder: 'border-indigo-500/20',
    avatarBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    tagBg: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/25',
    initials: 'KP',
    themeBadge: 'Fintech & Payments',
    title: 'Freelancers Getting Paid Fast in Tunisia — Creator Clips',
    cpmTnd: 3.5,
    minViews: 2000,
    maxPerClipTnd: 350,
    totalPoolTnd: 2500,
    remainingPoolTnd: 1980,
    platforms: ['TikTok', 'Reels', 'Shorts'],
    rules: [
      'Use official Konnect app screen-recording assets',
      'Tag @konnect.network in description',
      'Highlight zero-bureaucracy instant cashouts'
    ],
    hotTimestamps: [
      { time: '00:02:40', label: 'Instant Payment Link Demo', spike: 'Brand Kit' },
    ],
  },
];

const INITIAL_TRACKED_CLIPS = [
  {
    id: 'tc1',
    bountyTitle: 'Kick Ranked Rage & Funny Moments',
    creator: '@kamelgaming.tn',
    platform: 'TikTok',
    url: 'tiktok.com/@tnclips/video/7439102',
    views: 18400,
    earnedTnd: 46.0,
    status: 'Verified & Paid',
  },
  {
    id: 'tc2',
    bountyTitle: 'Viral Clips: Ep. 18 — Building SaaS',
    creator: '@tunisianfounders',
    platform: 'Reels',
    url: 'instagram.com/reel/DC9x82Lp',
    views: 6200,
    earnedTnd: 18.6,
    status: 'Tracking Views',
  },
];

const INITIAL_SUBMISSIONS = [
  {
    id: 'sub1',
    clipperHandle: '@med_clips_tn',
    platform: 'TikTok',
    clipUrl: 'https://tiktok.com/@med_clips_tn/video/7441029',
    views: 34200,
    payoutTnd: 85.5,
    trustScore: 98,
    fraudFlag: null,
    status: 'Pending',
  },
  {
    id: 'sub2',
    clipperHandle: '@fastviews_bot99',
    platform: 'TikTok',
    clipUrl: 'https://tiktok.com/@fastviews_bot99/video/7441088',
    views: 48000,
    payoutTnd: 120.0,
    trustScore: 18,
    fraudFlag: 'SMM Spike: +45K views in 14m, 0.04% engagement',
    status: 'Pending',
  },
  {
    id: 'sub3',
    clipperHandle: '@sarah.edits.tn',
    platform: 'Reels',
    clipUrl: 'https://instagram.com/reel/DD12kLm9',
    views: 14500,
    payoutTnd: 36.25,
    trustScore: 95,
    fraudFlag: null,
    status: 'Approved',
  },
];

export default function ClipBountyApp() {
  const [activeTab, setActiveTab] = useState('discover'); // 'discover' | 'campaigns'
  const [walletTnd, setWalletTnd] = useState(142.5);

  // Discover state
  const [bounties, setBounties] = useState(INITIAL_BOUNTIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBounty, setSelectedBounty] = useState(null);
  const [estimatedViews, setEstimatedViews] = useState(25000);
  const [clipUrlInput, setClipUrlInput] = useState('');
  const [clipPlatform, setClipPlatform] = useState('TikTok');
  const [copiedTimestamp, setCopiedTimestamp] = useState(null);
  const [trackedClips, setTrackedClips] = useState(INITIAL_TRACKED_CLIPS);
  const [showTrackedStrip, setShowTrackedStrip] = useState(true);
  const [submitSuccessToast, setSubmitSuccessToast] = useState('');

  // Live Payout Ticker State
  const [activeTickerIdx, setActiveTickerIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTickerIdx((prev) => (prev + 1) % RECENT_LIVE_ACTIVITIES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Cashout modal state
  const [cashoutOpen, setCashoutOpen] = useState(false);
  const [cashoutMethod, setCashoutMethod] = useState('D17');
  const [cashoutDestination, setCashoutDestination] = useState('');
  const [cashoutAmount, setCashoutAmount] = useState('100');
  const [cashoutDone, setCashoutDone] = useState(false);

  // Streamer Studio state
  const [escrowRemaining, setEscrowRemaining] = useState(1420);
  const [fraudBlockedTnd, setFraudBlockedTnd] = useState(310);
  const [submissions, setSubmissions] = useState(INITIAL_SUBMISSIONS);
  const [newCampaign, setNewCampaign] = useState({
    title: '',
    category: 'Gaming & Kick',
    cpmTnd: '2.5',
    totalPoolTnd: '500',
    minViews: '2000',
    maxPerClipTnd: '150',
  });

  const categories = ['All', 'Gaming & Kick', 'Podcasts', 'Apps & Brands', 'Sports'];

  const filteredBounties = bounties.filter((b) => {
    const matchesCat = selectedCategory === 'All' || b.category === selectedCategory;
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.handle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCopyTimestamp = (time) => {
    navigator.clipboard?.writeText(time);
    setCopiedTimestamp(time);
    setTimeout(() => setCopiedTimestamp(null), 1800);
  };

  const handleClipSubmit = (e) => {
    e.preventDefault();
    if (!clipUrlInput.trim() || !selectedBounty) return;

    const newClip = {
      id: `tc-${Date.now()}`,
      bountyTitle: selectedBounty.title,
      creator: selectedBounty.handle,
      platform: clipPlatform,
      url: clipUrlInput.replace(/^https?:\/\//, ''),
      views: 1200,
      earnedTnd: 0,
      status: 'Tracking Views',
    };

    setTrackedClips([newClip, ...trackedClips]);
    setClipUrlInput('');
    setSelectedBounty(null);
    setSubmitSuccessToast('Clip submitted! View tracking active.');
    setTimeout(() => setSubmitSuccessToast(''), 3500);
  };

  const handleSubmissionDecision = (id, decision) => {
    const target = submissions.find((s) => s.id === id);
    if (!target || target.status !== 'Pending') return;

    setSubmissions(
      submissions.map((s) => (s.id === id ? { ...s, status: decision } : s))
    );

    if (decision === 'Approved') {
      setEscrowRemaining((prev) => Math.max(0, +(prev - target.payoutTnd).toFixed(2)));
    } else if (decision === 'Rejected') {
      setFraudBlockedTnd((prev) => +(prev + target.payoutTnd).toFixed(2));
    }
  };

  const handleCreateCampaign = (e) => {
    e.preventDefault();
    if (!newCampaign.title.trim()) return;
    const pool = Math.max(50, Number(newCampaign.totalPoolTnd) || 500);
    const cpm = Math.max(0.5, Number(newCampaign.cpmTnd) || 2.5);

    const created = {
      id: `b-${Date.now()}`,
      creator: 'Kamel Gaming TN',
      handle: '@kamelgaming.tn',
      verified: true,
      category: newCampaign.category,
      audience: '142K on Kick',
      payoutRate: '100% Payout Rate',
      totalPaidOut: '0 DT',
      bannerGradient: 'from-purple-900/80 via-[#1A1429] to-[#111218]',
      bannerBorder: 'border-purple-500/20',
      avatarBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      tagBg: 'bg-purple-500/15 text-purple-300 border-purple-500/25',
      initials: 'KG',
      themeBadge: 'New Live Bounty',
      title: newCampaign.title.trim(),
      cpmTnd: cpm,
      minViews: Number(newCampaign.minViews) || 2000,
      maxPerClipTnd: Number(newCampaign.maxPerClipTnd) || 150,
      totalPoolTnd: pool,
      remainingPoolTnd: pool,
      platforms: ['TikTok', 'Reels', 'Shorts'],
      rules: [
        'Keep @kamelgaming.tn watermark visible in top corner',
        `Minimum ${newCampaign.minViews} organic views required`,
      ],
      hotTimestamps: [
        { time: '00:45:10', label: 'Auto-Detected Chat Spike Moment', spike: '+450 msg/min' },
      ],
    };

    setBounties([created, ...bounties]);
    setEscrowRemaining((prev) => prev + pool);
    setNewCampaign({
      title: '',
      category: 'Gaming & Kick',
      cpmTnd: '2.5',
      totalPoolTnd: '500',
      minViews: '2000',
      maxPerClipTnd: '150',
    });
    setActiveTab('discover');
    setSubmitSuccessToast('Bounty published with pre-funded escrow!');
    setTimeout(() => setSubmitSuccessToast(''), 3500);
  };

  const handleCashoutSubmit = (e) => {
    e.preventDefault();
    const amt = Number(cashoutAmount);
    if (!amt || amt <= 0 || amt > walletTnd || !cashoutDestination.trim()) return;
    setWalletTnd((prev) => +(prev - amt).toFixed(2));
    setCashoutDone(true);
    setTimeout(() => {
      setCashoutDone(false);
      setCashoutOpen(false);
      setCashoutDestination('');
    }, 1800);
  };

  const calculatedEstimate = selectedBounty
    ? Math.min(
        selectedBounty.maxPerClipTnd,
        +((estimatedViews / 1000) * selectedBounty.cpmTnd).toFixed(2)
      )
    : 0;

  const currentActivity = RECENT_LIVE_ACTIVITIES[activeTickerIdx];

  return (
    <div className="min-h-screen bg-[#08080C] text-[#F3F4F6] font-sans antialiased selection:bg-[#00F090]/20 selection:text-white">
      {/* Toast Notification */}
      {submitSuccessToast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 bg-[#111218] text-white text-sm font-medium px-4 py-3 rounded-xl shadow-2xl border border-[#00F090]/30 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#00F090] shrink-0" />
          <span>{submitSuccessToast}</span>
        </div>
      )}

      {/* 56px Sticky Top Navigation */}
      <header className="sticky top-0 z-30 h-16 bg-[#08080C]/90 backdrop-blur-md border-b border-white/[0.06] px-4 sm:px-6">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <a href="/" className="flex items-center gap-3 group">
              <KlipiLogo size="w-8 h-8" />
              <div className="flex items-center">
                <span
                  className="text-2xl font-black tracking-[-0.04em] text-white group-hover:text-[#00F090] transition duration-200"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  klipi
                </span>
                <span className="w-2 h-2 rounded-sm bg-[#00F090] ml-1 shadow-[0_0_8px_#00F090]" />
              </div>
            </a>

            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 px-3 py-1.5 rounded-lg transition"
            >
              ← Back to Overview
            </a>

            <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#00F090] bg-[#00F090]/10 border border-[#00F090]/20 px-2.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F090] live-dot" />
              Marketplace Demo
            </span>
          </div>

          {/* Segmented Switcher (Discover vs Streamer Studio) */}
          <nav className="flex items-center bg-[#12131A] p-1 rounded-xl border border-white/[0.06]">
            <button
              onClick={() => setActiveTab('discover')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === 'discover'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Discover Bounties
            </button>
            <button
              onClick={() => setActiveTab('campaigns')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === 'campaigns'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Streamer Studio
            </button>
          </nav>

          {/* Right: TND Wallet Pill */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2.5 bg-[#12131A] border border-white/[0.08] rounded-xl pl-3.5 pr-1.5 py-1.5">
              <span className="text-xs font-bold text-white font-mono-num">
                {walletTnd.toFixed(2)} <span className="text-[#00F090] font-semibold">DT</span>
              </span>
              <button
                onClick={() => setCashoutOpen(true)}
                className="bg-[#00F090] hover:bg-[#00D680] text-[#041F16] text-xs font-black px-3 py-1 rounded-lg transition shadow-sm"
              >
                Cashout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* --- CONTENT REWARDS BENCHMARK: SUBTLE LIVE PAYOUT TICKER --- */}
      <div className="bg-[#0B0C10] border-b border-white/[0.05] py-2 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#00F090] bg-[#00F090]/10 border border-[#00F090]/25 px-2 py-0.5 rounded shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F090] live-dot" />
              Live Activity
            </span>
            <div className="text-slate-300 truncate font-mono-num text-[11px] sm:text-xs">
              {currentActivity.type === 'payout' ? (
                <>
                  <span className="text-[#00F090] font-bold">{currentActivity.user}</span> received{' '}
                  <span className="text-white font-bold">{currentActivity.amount}</span> via{' '}
                  <span className="text-white font-semibold">{currentActivity.method}</span>{' '}
                  <span className="text-slate-500">({currentActivity.views} views • {currentActivity.creator})</span>
                </>
              ) : (
                <>
                  <span className="text-[#00F090] font-bold">{currentActivity.user}</span> pre-funded{' '}
                  <span className="text-white font-bold">{currentActivity.amount}</span> in escrow (
                  {currentActivity.desc})
                </>
              )}
              <span className="text-slate-500 ml-2">({currentActivity.time})</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4 shrink-0 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#00F090]" /> 100% Pre-funded Escrow
            </span>
            <span className="text-white/20">•</span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> D17 & Flouci Instant Rails
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'discover' ? (
          <>
            {/* Discover Header with Integrated Stats Ribbon */}
            <div className="mb-6 space-y-4">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Discover Active Clip Bounties
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                    Browse pre-funded campaigns from verified Tunisian streamers and brands. Create clips, submit your video link, and get paid directly to your D17 or Flouci wallet.
                  </p>
                </div>

                {/* Sleek Horizontal Trust Ribbon */}
                <div className="flex items-center gap-2 bg-[#12131A] border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs">
                  <span className="w-2 h-2 rounded-full bg-[#00F090] live-dot" />
                  <span className="text-slate-400">Total Active Escrow:</span>
                  <span className="text-white font-bold font-mono-num">11,800 DT</span>
                </div>
              </div>

              {/* Minimal Trust Features Bar (Slim, not bulky) */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
                <div className="bg-[#101117] border border-white/[0.05] rounded-xl p-2.5 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#00F090]/10 border border-[#00F090]/20 flex items-center justify-center shrink-0">
                    <Lock className="w-3.5 h-3.5 text-[#00F090]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-white truncate">100% Escrow Guarantee</p>
                    <p className="text-[10px] text-slate-400 truncate">Pool locked before launch</p>
                  </div>
                </div>

                <div className="bg-[#101117] border border-white/[0.05] rounded-xl p-2.5 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-white truncate">Direct D17 & Flouci</p>
                    <p className="text-[10px] text-slate-400 truncate">Min 10 DT • Zero bank fees</p>
                  </div>
                </div>

                <div className="bg-[#101117] border border-white/[0.05] rounded-xl p-2.5 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-400/10 border border-blue-400/20 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-white truncate">48h Anti-Fraud Hold</p>
                    <p className="text-[10px] text-slate-400 truncate">SMM bot protection</p>
                  </div>
                </div>

                <div className="bg-[#101117] border border-white/[0.05] rounded-xl p-2.5 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-purple-400/10 border border-purple-400/20 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-white truncate">100% Payout Rate</p>
                    <p className="text-[10px] text-slate-400 truncate">Verified Tunisian creators</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Toolbar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 bg-[#12131A] p-1 rounded-xl border border-white/[0.06]">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition ${
                      selectedCategory === cat
                        ? 'bg-white text-black shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search streamer, game or brand..."
                  className="w-full bg-[#12131A] border border-white/[0.08] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F090]"
                />
              </div>
            </div>

            {/* Active Tracked Clips Collapsible Bar */}
            {trackedClips.length > 0 && (
              <div className="mb-6 bg-[#111218] border border-white/[0.06] rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      My Tracked Clips ({trackedClips.length})
                    </span>
                    <span className="text-[10px] text-[#00F090] bg-[#00F090]/10 border border-[#00F090]/20 px-2 py-0.5 rounded-full font-semibold">
                      Auto-Syncing
                    </span>
                  </div>
                  <button
                    onClick={() => setShowTrackedStrip(!showTrackedStrip)}
                    className="text-xs text-slate-400 hover:text-white transition"
                  >
                    {showTrackedStrip ? 'Hide' : 'Show'}
                  </button>
                </div>

                {showTrackedStrip && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {trackedClips.map((clip) => (
                      <div
                        key={clip.id}
                        className="bg-black/40 border border-white/[0.06] rounded-xl px-4 py-3 flex items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                              {clip.platform}
                            </span>
                            <p className="text-xs font-semibold text-white truncate">
                              {clip.bountyTitle}
                            </p>
                          </div>
                          <p className="text-[11px] text-slate-400 truncate mt-0.5">{clip.url}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-xs font-bold font-mono-num text-white">
                            {clip.views.toLocaleString()} views
                          </div>
                          <div className="flex items-center justify-end gap-1.5 mt-0.5">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                clip.status === 'Verified & Paid'
                                  ? 'bg-[#00F090]/10 text-[#00F090] border border-[#00F090]/20'
                                  : 'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                              }`}
                            >
                              {clip.status}
                            </span>
                            {clip.earnedTnd > 0 && (
                              <span className="text-xs font-bold text-[#00F090] font-mono-num">
                                +{clip.earnedTnd.toFixed(2)} DT
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* --- BENCHMARKED BOUNTY CARDS (WITH COVER BANNERS LIKE CONTENT REWARDS) --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBounties.map((bounty) => {
                const pctLeft = Math.round((bounty.remainingPoolTnd / bounty.totalPoolTnd) * 100);
                return (
                  <div
                    key={bounty.id}
                    onClick={() => {
                      setSelectedBounty(bounty);
                      setEstimatedViews(25000);
                    }}
                    className="group bg-[#111218] border border-white/[0.07] hover:border-white/20 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between"
                  >
                    <div>
                      {/* 16:9 Stylized Campaign Cover Banner */}
                      <div className={`relative h-36 sm:h-40 banner-pattern bg-gradient-to-br ${bounty.bannerGradient} p-3.5 flex flex-col justify-between border-b ${bounty.bannerBorder}`}>
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${bounty.tagBg}`}>
                            {bounty.themeBadge}
                          </span>

                          <span className="bg-[#08080C]/85 backdrop-blur-md border border-[#00F090]/30 text-[#00F090] text-xs font-extrabold px-2.5 py-1 rounded-lg font-mono-num shadow-sm">
                            {bounty.cpmTnd.toFixed(2)} DT / 1K
                          </span>
                        </div>

                        {/* Subtle banner title overlay */}
                        <div className="flex items-end justify-between">
                          <span className="text-[10px] font-semibold text-white/60 uppercase tracking-wider">
                            {bounty.category}
                          </span>
                          <span className="text-[10px] bg-black/40 backdrop-blur-sm text-slate-300 px-2 py-0.5 rounded font-mono-num">
                            Cap: {bounty.maxPerClipTnd} DT
                          </span>
                        </div>
                      </div>

                      {/* Card Content Area */}
                      <div className="p-4 space-y-3">
                        {/* Streamer Profile Row */}
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl border flex items-center justify-center font-bold text-xs shrink-0 ${bounty.avatarBg}`}>
                            {bounty.initials}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-bold text-white truncate group-hover:text-[#00F090] transition">
                                {bounty.creator}
                              </span>
                              {bounty.verified && (
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#00F090] shrink-0" />
                              )}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-slate-400">
                              <span className="text-[11px] font-mono-num text-slate-300">{bounty.audience}</span>
                              <span>•</span>
                              <span className="text-[11px] text-[#00F090] font-medium">{bounty.payoutRate}</span>
                            </div>
                          </div>
                        </div>

                        {/* Campaign Title */}
                        <h3 className="text-sm font-semibold text-slate-100 leading-snug line-clamp-2 pt-0.5">
                          {bounty.title}
                        </h3>

                        {/* Platforms & Min Views */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          {bounty.platforms.map((p) => (
                            <span
                              key={p}
                              className="text-[10px] font-semibold bg-white/5 border border-white/5 text-slate-300 px-2 py-0.5 rounded"
                            >
                              {p}
                            </span>
                          ))}
                          <span className="text-[10px] text-slate-400 ml-auto font-mono-num">
                            Min {bounty.minViews.toLocaleString()} views
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Escrow Progress Footer */}
                    <div className="p-4 pt-3 border-t border-white/[0.06] bg-[#0E0F15] space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-mono-num">
                        <span className="font-semibold text-slate-300 text-[11px]">
                          {bounty.remainingPoolTnd.toLocaleString()} DT{' '}
                          <span className="font-normal text-slate-500">
                            / {bounty.totalPoolTnd.toLocaleString()} DT in escrow
                          </span>
                        </span>
                        <span className="font-bold text-[#00F090] text-[11px]">{pctLeft}% left</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#00F090] rounded-full transition-all duration-300"
                          style={{ width: `${pctLeft}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          /* Streamer Studio */
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bounty-card rounded-2xl p-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Escrow Pool Remaining</span>
                <div className="text-2xl font-black font-mono-num text-white mt-1">
                  {escrowRemaining.toLocaleString()} <span className="text-sm text-[#00F090]">DT</span>
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">Locked in Klipi escrow contract</span>
              </div>
              <div className="bounty-card rounded-2xl p-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Views Generated</span>
                <div className="text-2xl font-black font-mono-num text-white mt-1">
                  96.9K
                </div>
                <span className="text-[11px] text-[#00F090] mt-1 block">+18.4K organic views today</span>
              </div>
              <div className="bounty-card rounded-2xl p-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Fraud Dinars Blocked</span>
                <div className="text-2xl font-black font-mono-num text-emerald-400 mt-1">
                  {fraudBlockedTnd.toFixed(2)} <span className="text-sm">DT</span>
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">Saved from SMM bot spikes</span>
              </div>
              <div className="bounty-card rounded-2xl p-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Clippers</span>
                <div className="text-2xl font-black font-mono-num text-white mt-1">
                  14
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">Producing across TikTok & Reels</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Clipper Submissions Table */}
              <div className="lg:col-span-2 bounty-card rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold text-white">Incoming Submissions</h2>
                    <p className="text-xs text-slate-400">
                      Automatic anti-fraud scoring filters fake views before disbursement.
                    </p>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300 font-mono-num">
                    {submissions.length} Total
                  </span>
                </div>

                <div className="space-y-2.5">
                  {submissions.map((sub) => (
                    <div
                      key={sub.id}
                      className="bg-black/30 border border-white/[0.06] rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{sub.clipperHandle}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5">
                            {sub.platform}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              sub.trustScore >= 80
                                ? 'bg-[#00F090]/10 text-[#00F090] border border-[#00F090]/20'
                                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            }`}
                          >
                            Trust: {sub.trustScore}%
                          </span>
                        </div>
                        <a
                          href={sub.clipUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-slate-400 hover:text-white truncate block flex items-center gap-1"
                        >
                          {sub.clipUrl} <ExternalLink className="w-3 h-3 inline" />
                        </a>
                        {sub.fraudFlag && (
                          <div className="flex items-center gap-1.5 text-xs text-amber-400 mt-1">
                            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                            <span>{sub.fraudFlag}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-4 shrink-0 justify-between sm:justify-end">
                        <div className="text-right font-mono-num">
                          <div className="text-sm font-bold text-white">
                            {sub.payoutTnd.toFixed(2)} DT
                          </div>
                          <div className="text-xs text-slate-400">
                            {sub.views.toLocaleString()} views
                          </div>
                        </div>

                        {sub.status === 'Pending' ? (
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleSubmissionDecision(sub.id, 'Approved')}
                              className="bg-[#00F090] hover:bg-[#00D680] text-[#041F16] text-xs font-black px-3 py-1.5 rounded-lg transition"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleSubmissionDecision(sub.id, 'Rejected')}
                              className="bg-white/5 hover:bg-rose-500/10 text-rose-400 border border-white/10 hover:border-rose-500/30 text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span
                            className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                              sub.status === 'Approved'
                                ? 'bg-[#00F090]/10 text-[#00F090]'
                                : 'bg-white/5 text-slate-500'
                            }`}
                          >
                            {sub.status}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Launch New Bounty */}
              <div className="bounty-card rounded-2xl p-5 space-y-4">
                <div>
                  <h2 className="text-sm font-bold text-white mb-0.5">Launch New Bounty</h2>
                  <p className="text-xs text-slate-400">
                    Lock Dinars in escrow to mobilize Tunisian clippers.
                  </p>
                </div>

                <form onSubmit={handleCreateCampaign} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Campaign Title
                    </label>
                    <input
                      type="text"
                      required
                      value={newCampaign.title}
                      onChange={(e) => setNewCampaign({ ...newCampaign, title: e.target.value })}
                      placeholder="e.g. Kick Stream Ranked Clutches"
                      className="w-full bg-black/40 border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00F090]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Category
                      </label>
                      <select
                        value={newCampaign.category}
                        onChange={(e) => setNewCampaign({ ...newCampaign, category: e.target.value })}
                        className="w-full bg-black/40 border border-white/[0.1] rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-[#00F090]"
                      >
                        <option>Gaming & Kick</option>
                        <option>Podcasts</option>
                        <option>Apps & Brands</option>
                        <option>Sports</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Total Pool (DT)
                      </label>
                      <input
                        type="number"
                        min="50"
                        value={newCampaign.totalPoolTnd}
                        onChange={(e) => setNewCampaign({ ...newCampaign, totalPoolTnd: e.target.value })}
                        className="w-full bg-black/40 border border-white/[0.1] rounded-xl px-3 py-2 text-xs font-mono-num text-white focus:outline-none focus:border-[#00F090]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Rate (DT / 1K views)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0.5"
                        value={newCampaign.cpmTnd}
                        onChange={(e) => setNewCampaign({ ...newCampaign, cpmTnd: e.target.value })}
                        className="w-full bg-black/40 border border-white/[0.1] rounded-xl px-3 py-2 text-xs font-mono-num text-white focus:outline-none focus:border-[#00F090]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Max Cap / Clip (DT)
                      </label>
                      <input
                        type="number"
                        min="20"
                        value={newCampaign.maxPerClipTnd}
                        onChange={(e) => setNewCampaign({ ...newCampaign, maxPerClipTnd: e.target.value })}
                        className="w-full bg-black/40 border border-white/[0.1] rounded-xl px-3 py-2 text-xs font-mono-num text-white focus:outline-none focus:border-[#00F090]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#00F090] hover:bg-[#00D680] text-[#041F16] text-xs font-black py-2.5 rounded-xl transition shadow-md mt-2 flex items-center justify-center gap-1.5"
                  >
                    <Lock className="w-3.5 h-3.5" /> Fund Escrow & Publish Bounty
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Slide-Over Campaign Brief & Submission Drawer */}
      {selectedBounty && (
        <div className="fixed inset-0 z-40 flex justify-end bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#0E0F15] h-full border-l border-white/10 shadow-2xl flex flex-col justify-between overflow-y-auto animate-slide-left">
            <div>
              {/* Drawer Hero Banner */}
              <div className={`relative h-36 bg-gradient-to-br ${selectedBounty.bannerGradient} p-5 flex flex-col justify-between border-b ${selectedBounty.bannerBorder}`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md border ${selectedBounty.tagBg}`}>
                    {selectedBounty.category}
                  </span>
                  <button
                    onClick={() => setSelectedBounty(null)}
                    className="w-8 h-8 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-end justify-between">
                  <span className="text-xs bg-[#08080C]/90 text-[#00F090] font-black px-3 py-1 rounded-lg border border-[#00F090]/30 font-mono-num">
                    {selectedBounty.cpmTnd.toFixed(2)} DT / 1,000 views
                  </span>
                  <span className="text-xs text-white/80 font-mono-num">
                    Cap: {selectedBounty.maxPerClipTnd} DT
                  </span>
                </div>
              </div>

              {/* Drawer Body Content */}
              <div className="p-6 space-y-5">
                <div>
                  <h2 className="text-xl font-black text-white leading-snug">
                    {selectedBounty.title}
                  </h2>
                  <div className="flex items-center gap-2 mt-2">
                    <div className={`w-6 h-6 rounded-md border flex items-center justify-center text-[10px] font-bold ${selectedBounty.avatarBg}`}>
                      {selectedBounty.initials}
                    </div>
                    <span className="text-xs text-white font-bold">{selectedBounty.creator}</span>
                    <span className="text-xs text-slate-400 font-mono-num">({selectedBounty.handle})</span>
                    <span className="text-xs text-[#00F090] font-semibold">• {selectedBounty.audience}</span>
                  </div>
                </div>

                {/* Verified Escrow Protection Banner */}
                <div className="bg-[#12131C] border border-white/[0.08] rounded-xl p-3.5 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00F090]/10 border border-[#00F090]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Lock className="w-4 h-4 text-[#00F090]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white">100% Escrow Backed Campaign</h4>
                      <span className="text-[10px] font-bold text-[#00F090] bg-[#00F090]/10 px-1.5 py-0.5 rounded">
                        VERIFIED
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                      <strong className="text-white font-mono-num">{selectedBounty.remainingPoolTnd.toLocaleString()} DT</strong> is pre-deposited in escrow. Payouts are guaranteed upon reaching verified views.
                    </p>
                  </div>
                </div>

                {/* Hot VOD Timestamps */}
                <div className="bg-black/40 border border-white/[0.08] rounded-2xl p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-amber-400" /> Hot VOD Timestamps (Chat Spikes)
                    </span>
                    <span className="text-[11px] text-slate-400">Click to copy</span>
                  </div>
                  <div className="space-y-2">
                    {selectedBounty.hotTimestamps.map((ts) => (
                      <div
                        key={ts.time}
                        onClick={() => handleCopyTimestamp(ts.time)}
                        className="bg-white/5 border border-white/5 hover:border-[#00F090]/30 rounded-xl px-3 py-2 flex items-center justify-between cursor-pointer transition"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="font-mono-num text-xs font-bold bg-[#00F090] text-[#041F16] px-2 py-0.5 rounded">
                            {ts.time}
                          </span>
                          <span className="text-xs font-medium text-slate-200 truncate">
                            {ts.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[11px] text-[#00F090] font-bold font-mono-num">{ts.spike}</span>
                          {copiedTimestamp === ts.time ? (
                            <Check className="w-3.5 h-3.5 text-[#00F090]" />
                          ) : (
                            <Copy className="w-3.5 h-3.5 text-slate-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rules & Anti-Bot Policy */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Campaign Rules & Verification
                  </h3>
                  <ul className="space-y-2">
                    {selectedBounty.rules.map((rule, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00F090] shrink-0 mt-0.5" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Payout Simulator */}
                <div className="bg-[#00F090]/5 border border-[#00F090]/15 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white">Estimated Payout</span>
                    <span className="text-base font-black text-[#00F090] font-mono-num">
                      {calculatedEstimate.toFixed(2)} DT
                    </span>
                  </div>
                  <input
                    type="range"
                    min={selectedBounty.minViews}
                    max={150000}
                    step={1000}
                    value={estimatedViews}
                    onChange={(e) => setEstimatedViews(Number(e.target.value))}
                    className="w-full accent-[#00F090] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono-num">
                    <span>{estimatedViews.toLocaleString()} views</span>
                    <span>Cap: {selectedBounty.maxPerClipTnd} DT / clip</span>
                  </div>
                </div>

                {/* Payout Channels Accepted */}
                <div>
                  <span className="text-[11px] text-slate-400 font-semibold block mb-1.5">Direct Cashout Rails</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg text-slate-300 font-mono-num">
                      D17 (La Poste)
                    </span>
                    <span className="text-[11px] bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg text-slate-300 font-mono-num">
                      Flouci Wallet
                    </span>
                    <span className="text-[11px] bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg text-slate-300 font-mono-num">
                      Bank RIB (20-digit)
                    </span>
                  </div>
                </div>

                {/* Submit URL Form */}
                <form onSubmit={handleClipSubmit} className="space-y-3 pt-3 border-t border-white/[0.08]">
                  <label className="block text-xs font-bold text-white">
                    Submit Published Clip URL
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={clipPlatform}
                      onChange={(e) => setClipPlatform(e.target.value)}
                      className="border border-white/10 bg-black/40 text-white rounded-xl px-2.5 py-2 text-xs font-bold focus:outline-none"
                    >
                      {selectedBounty.platforms.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                    <input
                      type="url"
                      required
                      value={clipUrlInput}
                      onChange={(e) => setClipUrlInput(e.target.value)}
                      placeholder="https://www.tiktok.com/@you/video/..."
                      className="flex-1 border border-white/10 bg-black/40 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F090]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#00F090] hover:bg-[#00D680] text-[#041F16] text-xs font-black py-3 rounded-xl transition shadow-lg shadow-[#00F090]/15"
                  >
                    Submit Clip & Start View Tracking
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cashout Modal */}
      {cashoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#111218] border border-white/10 rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-black text-white">Withdraw Earnings (TND)</h3>
                <p className="text-xs text-slate-400">
                  Available balance: <strong className="text-[#00F090] font-mono-num">{walletTnd.toFixed(2)} DT</strong>
                </p>
              </div>
              <button
                onClick={() => setCashoutOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {cashoutDone ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-[#00F090] mx-auto" />
                <p className="text-sm font-bold text-white">Transfer Initiated!</p>
                <p className="text-xs text-slate-400">
                  Disbursed via {cashoutMethod}. Arrives in your Tunisian account shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCashoutSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Payout Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['D17', 'Flouci', 'RIB / CIB'].map((m) => (
                      <button
                        type="button"
                        key={m}
                        onClick={() => setCashoutMethod(m)}
                        className={`py-2 rounded-xl text-xs font-bold border transition ${
                          cashoutMethod === m
                            ? 'bg-[#00F090] text-[#041F16] border-[#00F090]'
                            : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/20'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {cashoutMethod === 'RIB / CIB' ? '20-Digit Tunisian RIB' : `${cashoutMethod} Mobile Phone Number`}
                  </label>
                  <input
                    type="text"
                    required
                    value={cashoutDestination}
                    onChange={(e) => setCashoutDestination(e.target.value)}
                    placeholder={cashoutMethod === 'RIB / CIB' ? '08 000 0000000000000 00' : '+216 20 000 000'}
                    className="w-full border border-white/10 bg-black/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00F090]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Amount (DT)
                  </label>
                  <input
                    type="number"
                    min="10"
                    max={walletTnd}
                    step="0.5"
                    required
                    value={cashoutAmount}
                    onChange={(e) => setCashoutAmount(e.target.value)}
                    className="w-full border border-white/10 bg-black/40 rounded-xl px-3 py-2 text-xs font-mono-num text-white focus:outline-none focus:border-[#00F090]"
                  />
                </div>

                <div className="p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-[11px] text-slate-400 space-y-1">
                  <div className="flex justify-between">
                    <span>Withdrawal Fee</span>
                    <span className="text-[#00F090] font-mono-num">0.00 DT (Free)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Arrival</span>
                    <span className="text-white">Instant / Same-day</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#00F090] hover:bg-[#00D680] text-[#041F16] text-xs font-black py-3 rounded-xl transition shadow-lg shadow-[#00F090]/15"
                >
                  Confirm {cashoutAmount || 0} DT Payout via {cashoutMethod}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
