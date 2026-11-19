import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  SlidersHorizontal,
  X,
  Copy,
  Check,
  ArrowUpRight,
  Plus,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Wallet,
  Sparkles,
  ExternalLink,
  Flame,
  Eye,
  DollarSign,
  TrendingUp,
} from 'lucide-react';

// --- 3 Custom Minimalist Geometric SVG Logo Options for Klipi (klipi.tn) ---
const KlipiLogo = ({ variant = 1 }) => {
  if (variant === 1) {
    // Option 1: Razor-Sliced Play Wedge
    return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="28" height="28" rx="7" fill="#09090B" />
        <path d="M9.5 7.5L17.5 12.2L9.5 16.9V7.5Z" fill="#FFFFFF" />
        <path d="M11.5 19.2L20.5 14L11.5 21.5V19.2Z" fill="#10B981" />
        <line x1="7" y1="18.5" x2="21" y2="10.5" stroke="#09090B" strokeWidth="1.8" />
      </svg>
    );
  }
  if (variant === 2) {
    // Option 2: Timeline Razor K-Monogram
    return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="28" height="28" rx="7" fill="#09090B" />
        <rect x="8" y="7" width="3" height="14" rx="1" fill="#FFFFFF" />
        <path d="M12.5 13.5L19 7H22.5L15.5 14L22.5 21H19L12.5 14.5V13.5Z" fill="#10B981" />
      </svg>
    );
  }
  // Option 3: Rounded Frame Aperture
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="28" rx="7" fill="#10B981" />
      <rect x="4" y="4" width="20" height="20" rx="5" fill="#09090B" />
      <path d="M11.5 9.5L19 14L11.5 18.5V9.5Z" fill="#FFFFFF" />
      <circle cx="19.5" cy="8.5" r="1.5" fill="#10B981" />
    </svg>
  );
};

// --- Initial Tunisian Marketplace Bounties ---
const INITIAL_BOUNTIES = [
  {
    id: 'b1',
    creator: 'Kamel Gaming TN',
    handle: '@kamelgaming.tn',
    verified: true,
    category: 'Gaming & Kick',
    avatarBg: 'bg-zinc-900 text-white',
    initials: 'KG',
    title: 'Kick Ranked Rage & Funny Moments (Season 4)',
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
    ],
    hotTimestamps: [
      { time: '01:14:22', label: '1v5 Clutch + Mic Drop', spike: '420 msg/min' },
      { time: '02:48:05', label: 'Chat Troll Donation Reaction', spike: '380 msg/min' },
      { time: '03:19:40', label: 'Surprise Guest Call-in', spike: '510 msg/min' },
    ],
  },
  {
    id: 'b2',
    creator: 'Tunisian Tech & Startup Pod',
    handle: '@tunisianfounders',
    verified: true,
    category: 'Podcasts',
    avatarBg: 'bg-emerald-700 text-white',
    initials: 'TF',
    title: 'Viral Clips: Ep. 18 — Building SaaS from Tunis to Europe',
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
    ],
    hotTimestamps: [
      { time: '00:24:10', label: 'Why Stripe & Local Payments Matter', spike: 'High Retention' },
      { time: '00:52:33', label: 'First $10K MRR Breakdown', spike: 'Top Replay' },
    ],
  },
  {
    id: 'b3',
    creator: 'YallaDelivery Tunisia',
    handle: '@yalladelivery.tn',
    verified: true,
    category: 'Apps & Brands',
    avatarBg: 'bg-amber-600 text-white',
    initials: 'YD',
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
    avatarBg: 'bg-rose-600 text-white',
    initials: 'DC',
    title: 'Champions League Live Watch-Along Reactions',
    cpmTnd: 2.0,
    minViews: 2500,
    maxPerClipTnd: 200,
    totalPoolTnd: 1200,
    remainingPoolTnd: 640,
    platforms: ['TikTok', 'Reels'],
    rules: [
      'Include match score ticker overlay',
      'Must be uploaded within 24h of final whistle',
      'No copyrighted UEFA broadcast audio tracks',
    ],
    hotTimestamps: [
      { time: '01:48:12', label: '90+4 Last-Minute Goal Studio Eruption', spike: '690 msg/min' },
      { time: '02:05:30', label: 'Post-Match Tactical Rant', spike: '410 msg/min' },
    ],
  },
  {
    id: 'b5',
    creator: 'Sami IRL Tunis',
    handle: '@sami.irl',
    verified: false,
    category: 'Gaming & Kick',
    avatarBg: 'bg-sky-700 text-white',
    initials: 'SI',
    title: 'La Goulette to Sidi Bou Said Night IRL Stream Highlights',
    cpmTnd: 2.2,
    minViews: 1500,
    maxPerClipTnd: 180,
    totalPoolTnd: 800,
    remainingPoolTnd: 590,
    platforms: ['TikTok', 'Shorts'],
    rules: [
      'Keep @sami.irl Kick handle pinned in comments',
      'Vertical 9:16 crop only (no black bars)',
    ],
    hotTimestamps: [
      { time: '00:39:18', label: 'Street Musician Improv Duet', spike: '340 msg/min' },
      { time: '01:55:02', label: 'Midnight Brik Taste Test', spike: '295 msg/min' },
    ],
  },
  {
    id: 'b6',
    creator: 'Konnect Pay TN',
    handle: '@konnect.network',
    verified: true,
    category: 'Apps & Brands',
    avatarBg: 'bg-indigo-700 text-white',
    initials: 'KP',
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
  const [logoVariant, setLogoVariant] = useState(1); // 1 | 2 | 3
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
  const [submitSuccessToast, setSubmitSuccessToast] = useState('');

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
    setSubmitSuccessToast('Clip submitted! View tracking started.');
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
      avatarBg: 'bg-zinc-900 text-white',
      initials: 'KG',
      title: newCampaign.title.trim(),
      cpmTnd: cpm,
      minViews: Number(newCampaign.minViews) || 2000,
      maxPerClipTnd: Number(newCampaign.maxPerClipTnd) || 150,
      totalPoolTnd: pool,
      remainingPoolTnd: pool,
      platforms: ['TikTok', 'Reels', 'Shorts'],
      rules: [
        'Keep @kamelgaming.tn watermark visible',
        `Minimum ${newCampaign.minViews} organic views required`,
      ],
      hotTimestamps: [
        { time: '00:45:10', label: 'Auto-Detected Chat Spike Moment', spike: '450 msg/min' },
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
    setSubmitSuccessToast('Live bounty published to marketplace!');
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

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-zinc-950 font-sans antialiased">
      {/* Toast Notification */}
      {submitSuccessToast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 bg-zinc-950 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg border border-zinc-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{submitSuccessToast}</span>
        </div>
      )}

      {/* 56px Sticky Top Navigation */}
      <header className="sticky top-0 z-30 h-14 bg-white/95 backdrop-blur border-b border-zinc-200 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between gap-4">
          {/* Left: Klipi Brand + Live 3-Logo Switcher */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <KlipiLogo variant={logoVariant} />
              <span className="font-bold tracking-tight text-lg text-zinc-950">
                klipi<span className="text-emerald-600">.tn</span>
              </span>
            </div>

            {/* Subtle 1-2-3 Logo Variant Toggle for User Validation */}
            <div
              className="hidden sm:flex items-center bg-zinc-100 border border-zinc-200 rounded-md p-0.5 text-[11px] font-medium"
              title="Switch logo concept"
            >
              {[1, 2, 3].map((v) => (
                <button
                  key={v}
                  onClick={() => setLogoVariant(v)}
                  className={`px-1.5 py-0.5 rounded transition ${
                    logoVariant === v
                      ? 'bg-white text-zinc-950 shadow-xs font-semibold'
                      : 'text-zinc-500 hover:text-zinc-800'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Center: 2-Mode Segmented Switcher */}
          <nav className="flex items-center bg-zinc-100 p-1 rounded-lg border border-zinc-200/80">
            <button
              onClick={() => setActiveTab('discover')}
              className={`px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-medium transition ${
                activeTab === 'discover'
                  ? 'bg-white text-zinc-950 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Discover Bounties
            </button>
            <button
              onClick={() => setActiveTab('campaigns')}
              className={`px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-medium transition ${
                activeTab === 'campaigns'
                  ? 'bg-white text-zinc-950 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              My Campaigns
            </button>
          </nav>

          {/* Right: TND Wallet Pill */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-lg pl-3 pr-1.5 py-1">
              <span className="text-xs sm:text-sm font-semibold tabular-nums text-zinc-900">
                {walletTnd.toFixed(2)} <span className="text-emerald-600">DT</span>
              </span>
              <button
                onClick={() => setCashoutOpen(true)}
                className="bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-medium px-2.5 py-1 rounded-md transition"
              >
                Cashout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'discover' ? (
          <>
            {/* Clipper Active Tracked Clips Strip */}
            <section className="mb-6">
              <div className="flex items-center justify-between mb-2.5">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  My Tracked Clips ({trackedClips.length})
                </h2>
                <span className="text-xs text-zinc-500">Auto-syncs TikTok, Reels & Shorts every 15m</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {trackedClips.map((clip) => (
                  <div
                    key={clip.id}
                    className="bg-white border border-zinc-200 rounded-xl px-4 py-3 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-zinc-100 text-zinc-700">
                          {clip.platform}
                        </span>
                        <p className="text-sm font-medium text-zinc-900 truncate">
                          {clip.bountyTitle}
                        </p>
                      </div>
                      <p className="text-xs text-zinc-500 truncate mt-0.5">{clip.url}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-sm font-semibold tabular-nums text-zinc-950">
                        {clip.views.toLocaleString()} views
                      </div>
                      <div className="flex items-center justify-end gap-1.5 mt-0.5">
                        <span
                          className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                            clip.status === 'Verified & Paid'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {clip.status}
                        </span>
                        {clip.earnedTnd > 0 && (
                          <span className="text-xs font-semibold text-emerald-600 tabular-nums">
                            +{clip.earnedTnd.toFixed(2)} DT
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Search & Category Filter Toolbar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap border transition ${
                      selectedCategory === cat
                        ? 'bg-zinc-950 text-white border-zinc-950'
                        : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300 hover:text-zinc-950'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search streamer or campaign..."
                  className="w-full bg-white border border-zinc-200 rounded-lg pl-9 pr-3 py-1.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400"
                />
              </div>
            </div>

            {/* 3-Column Bounty Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBounties.map((bounty) => {
                const pctLeft = Math.round((bounty.remainingPoolTnd / bounty.totalPoolTnd) * 100);
                return (
                  <div
                    key={bounty.id}
                    onClick={() => {
                      setSelectedBounty(bounty);
                      setEstimatedViews(25000);
                    }}
                    className="group bg-white border border-zinc-200 hover:border-zinc-400 rounded-xl p-4 flex flex-col justify-between cursor-pointer transition shadow-2xs"
                  >
                    <div>
                      {/* Card Header */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${bounty.avatarBg}`}
                          >
                            {bounty.initials}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1">
                              <span className="text-sm font-semibold text-zinc-900 truncate">
                                {bounty.creator}
                              </span>
                              {bounty.verified && (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              )}
                            </div>
                            <span className="text-xs text-zinc-500 block truncate">
                              {bounty.handle}
                            </span>
                          </div>
                        </div>

                        {/* Emerald CPM Badge */}
                        <span className="shrink-0 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-2.5 py-1 rounded-md tabular-nums">
                          {bounty.cpmTnd.toFixed(2)} DT / 1K
                        </span>
                      </div>

                      {/* Campaign Title */}
                      <h3 className="text-sm font-medium text-zinc-900 leading-snug mb-3 line-clamp-2 group-hover:text-zinc-950">
                        {bounty.title}
                      </h3>

                      {/* Platform Pills & Threshold */}
                      <div className="flex flex-wrap items-center gap-1.5 mb-4">
                        {bounty.platforms.map((p) => (
                          <span
                            key={p}
                            className="text-[11px] font-medium bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded"
                          >
                            {p}
                          </span>
                        ))}
                        <span className="text-[11px] text-zinc-500 ml-auto tabular-nums">
                          Min {bounty.minViews.toLocaleString()} views • Max {bounty.maxPerClipTnd} DT
                        </span>
                      </div>
                    </div>

                    {/* Escrow Progress Footer */}
                    <div className="pt-3 border-t border-zinc-100">
                      <div className="flex items-center justify-between text-xs mb-1.5 tabular-nums">
                        <span className="font-semibold text-zinc-900">
                          {bounty.remainingPoolTnd.toLocaleString()} DT{' '}
                          <span className="font-normal text-zinc-500">
                            / {bounty.totalPoolTnd.toLocaleString()} DT left
                          </span>
                        </span>
                        <span className="font-medium text-emerald-600">{pctLeft}% left</span>
                      </div>
                      <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
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
          /* STREAMER / BRAND STUDIO ("My Campaigns") */
          <div className="space-y-6">
            {/* 4-KPI Strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-white border border-zinc-200 rounded-xl p-4">
                <span className="text-xs font-medium text-zinc-500">Escrow Pool Remaining</span>
                <div className="text-2xl font-bold tabular-nums text-zinc-950 mt-1">
                  {escrowRemaining.toLocaleString()} <span className="text-sm text-emerald-600">DT</span>
                </div>
                <span className="text-[11px] text-zinc-500 mt-1 block">Protected in TND escrow</span>
              </div>
              <div className="bg-white border border-zinc-200 rounded-xl p-4">
                <span className="text-xs font-medium text-zinc-500">Verified Organic Views</span>
                <div className="text-2xl font-bold tabular-nums text-zinc-950 mt-1">412,800</div>
                <span className="text-[11px] text-emerald-600 mt-1 block">+18.4% vs last stream</span>
              </div>
              <div className="bg-white border border-zinc-200 rounded-xl p-4">
                <span className="text-xs font-medium text-zinc-500">Active Clippers</span>
                <div className="text-2xl font-bold tabular-nums text-zinc-950 mt-1">34</div>
                <span className="text-[11px] text-zinc-500 mt-1 block">Across TikTok, Reels & Shorts</span>
              </div>
              <div className="bg-white border border-zinc-200 rounded-xl p-4">
                <span className="text-xs font-medium text-zinc-500">Bot Fraud Blocked</span>
                <div className="text-2xl font-bold tabular-nums text-rose-600 mt-1">
                  {fraudBlockedTnd.toFixed(0)} <span className="text-sm">DT</span>
                </div>
                <span className="text-[11px] text-zinc-500 mt-1 block">Saved by velocity & ratio shield</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Submissions Review Queue Table */}
              <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-xl overflow-hidden">
                <div className="px-4 py-3.5 border-b border-zinc-200 flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-semibold text-zinc-950">Clip Submissions Queue</h2>
                    <p className="text-xs text-zinc-500">
                      Approve organic clips to release escrow or reject flagged SMM bot spikes
                    </p>
                  </div>
                  <span className="text-xs font-medium bg-zinc-100 text-zinc-700 px-2.5 py-1 rounded-md">
                    {submissions.filter((s) => s.status === 'Pending').length} Pending
                  </span>
                </div>

                <div className="divide-y divide-zinc-100">
                  {submissions.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold text-zinc-900">
                            {sub.clipperHandle}
                          </span>
                          <span className="text-[11px] font-medium bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded">
                            {sub.platform}
                          </span>
                          {sub.trustScore >= 80 ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                              <ShieldCheck className="w-3 h-3" /> Organic {sub.trustScore}/100
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-full">
                              <AlertTriangle className="w-3 h-3" /> Flagged {sub.trustScore}/100
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-zinc-500 truncate">{sub.clipUrl}</p>

                        {sub.fraudFlag && (
                          <p className="text-xs text-rose-600 font-medium">{sub.fraudFlag}</p>
                        )}
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                        <div className="text-left sm:text-right tabular-nums">
                          <div className="text-sm font-bold text-zinc-950">
                            {sub.payoutTnd.toFixed(2)} DT
                          </div>
                          <div className="text-xs text-zinc-500">
                            {sub.views.toLocaleString()} views
                          </div>
                        </div>

                        {sub.status === 'Pending' ? (
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleSubmissionDecision(sub.id, 'Approved')}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleSubmissionDecision(sub.id, 'Rejected')}
                              className="bg-white hover:bg-rose-50 text-rose-600 border border-zinc-200 hover:border-rose-200 text-xs font-medium px-3 py-1.5 rounded-lg transition"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span
                            className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                              sub.status === 'Approved'
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-zinc-100 text-zinc-500'
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

              {/* Launch New Bounty Form */}
              <div className="bg-white border border-zinc-200 rounded-xl p-4">
                <h2 className="text-sm font-semibold text-zinc-950 mb-1">Launch New Bounty</h2>
                <p className="text-xs text-zinc-500 mb-4">
                  Deposit TND into escrow and let Tunisian clippers distribute your stream.
                </p>

                <form onSubmit={handleCreateCampaign} className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 mb-1">
                      Campaign Title
                    </label>
                    <input
                      type="text"
                      required
                      value={newCampaign.title}
                      onChange={(e) => setNewCampaign({ ...newCampaign, title: e.target.value })}
                      placeholder="e.g., Kick Night Stream Best Moments"
                      className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-zinc-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-medium text-zinc-700 mb-1">
                        Category
                      </label>
                      <select
                        value={newCampaign.category}
                        onChange={(e) =>
                          setNewCampaign({ ...newCampaign, category: e.target.value })
                        }
                        className="w-full border border-zinc-200 rounded-lg px-2.5 py-2 text-sm bg-white focus:outline-none focus:border-zinc-400"
                      >
                        <option>Gaming & Kick</option>
                        <option>Podcasts</option>
                        <option>Apps & Brands</option>
                        <option>Sports</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-700 mb-1">
                        Total Pool (DT)
                      </label>
                      <input
                        type="number"
                        min="50"
                        value={newCampaign.totalPoolTnd}
                        onChange={(e) =>
                          setNewCampaign({ ...newCampaign, totalPoolTnd: e.target.value })
                        }
                        className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm tabular-nums focus:outline-none focus:border-zinc-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-medium text-zinc-700 mb-1">
                        Rate (DT / 1K views)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0.5"
                        value={newCampaign.cpmTnd}
                        onChange={(e) =>
                          setNewCampaign({ ...newCampaign, cpmTnd: e.target.value })
                        }
                        className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm tabular-nums focus:outline-none focus:border-zinc-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-700 mb-1">
                        Max Cap / Clip (DT)
                      </label>
                      <input
                        type="number"
                        min="20"
                        value={newCampaign.maxPerClipTnd}
                        onChange={(e) =>
                          setNewCampaign({ ...newCampaign, maxPerClipTnd: e.target.value })
                        }
                        className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm tabular-nums focus:outline-none focus:border-zinc-400"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-zinc-950 hover:bg-zinc-800 text-white text-sm font-medium py-2.5 rounded-lg transition mt-2"
                  >
                    Fund Escrow & Publish Bounty
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Slide-Over Campaign Details & Submission Drawer */}
      {selectedBounty && (
        <div className="fixed inset-0 z-40 flex justify-end bg-zinc-950/30 backdrop-blur-[1px]">
          <div className="w-full max-w-lg bg-white h-full border-l border-zinc-200 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="p-6 space-y-5">
              {/* Drawer Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                      {selectedBounty.cpmTnd.toFixed(2)} DT / 1,000 views
                    </span>
                    <span className="text-xs text-zinc-500">{selectedBounty.category}</span>
                  </div>
                  <h2 className="text-lg font-bold text-zinc-950 mt-2 leading-snug">
                    {selectedBounty.title}
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    by {selectedBounty.creator} ({selectedBounty.handle})
                  </p>
                </div>
                <button
                  onClick={() => setSelectedBounty(null)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Hot VOD Chat-Spike Timestamps */}
              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-semibold text-zinc-900 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-amber-500" /> Hot VOD Timestamps (Chat Spikes)
                  </span>
                  <span className="text-[11px] text-zinc-500">Click to copy timecode</span>
                </div>
                <div className="space-y-2">
                  {selectedBounty.hotTimestamps.map((ts) => (
                    <div
                      key={ts.time}
                      onClick={() => handleCopyTimestamp(ts.time)}
                      className="bg-white border border-zinc-200 hover:border-zinc-400 rounded-lg px-3 py-2 flex items-center justify-between cursor-pointer transition"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="font-mono text-xs font-semibold bg-zinc-900 text-white px-2 py-0.5 rounded">
                          {ts.time}
                        </span>
                        <span className="text-xs font-medium text-zinc-800 truncate">
                          {ts.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[11px] text-emerald-700 font-medium">{ts.spike}</span>
                        {copiedTimestamp === ts.time ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-zinc-400" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mandatory Rules */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                  Campaign Rules
                </h3>
                <ul className="space-y-1.5">
                  {selectedBounty.rules.map((rule, idx) => (
                    <li key={idx} className="text-xs text-zinc-700 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Interactive Earnings Estimator Slider */}
              <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-zinc-800">Payout Simulator</span>
                  <span className="text-base font-bold text-emerald-700 tabular-nums">
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
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-zinc-500 mt-1 tabular-nums">
                  <span>{estimatedViews.toLocaleString()} views</span>
                  <span>Cap: {selectedBounty.maxPerClipTnd} DT / clip</span>
                </div>
              </div>

              {/* Submit Clip Form */}
              <form onSubmit={handleClipSubmit} className="space-y-3 pt-2 border-t border-zinc-200">
                <label className="block text-xs font-semibold text-zinc-900">
                  Submit Your Published Clip URL
                </label>
                <div className="flex gap-2">
                  <select
                    value={clipPlatform}
                    onChange={(e) => setClipPlatform(e.target.value)}
                    className="border border-zinc-200 rounded-lg px-2.5 py-2 text-sm bg-white font-medium text-zinc-800"
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
                    className="flex-1 border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-zinc-400"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-zinc-950 hover:bg-zinc-800 text-white text-sm font-medium py-2.5 rounded-lg transition"
                >
                  Submit Clip & Start View Tracking
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Local Tunisian Cashout Modal (D17 / Flouci / RIB) */}
      {cashoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/40 p-4">
          <div className="bg-white border border-zinc-200 rounded-2xl max-w-md w-full p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-zinc-950">Withdraw Earnings (TND)</h3>
                <p className="text-xs text-zinc-500">
                  Available balance: <strong className="text-emerald-600">{walletTnd.toFixed(2)} DT</strong>
                </p>
              </div>
              <button
                onClick={() => setCashoutOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {cashoutDone ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <p className="text-sm font-semibold text-zinc-950">Transfer Initiated!</p>
                <p className="text-xs text-zinc-500">
                  Sent to your {cashoutMethod} account. Arrives within minutes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCashoutSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1.5">
                    Payout Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['D17', 'Flouci', 'RIB / CIB'].map((m) => (
                      <button
                        type="button"
                        key={m}
                        onClick={() => setCashoutMethod(m)}
                        className={`py-2 rounded-lg text-xs font-semibold border transition ${
                          cashoutMethod === m
                            ? 'bg-zinc-950 text-white border-zinc-950'
                            : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    {cashoutMethod === 'RIB / CIB'
                      ? '20-Digit Tunisian RIB'
                      : `${cashoutMethod} Phone Number`}
                  </label>
                  <input
                    type="text"
                    required
                    value={cashoutDestination}
                    onChange={(e) => setCashoutDestination(e.target.value)}
                    placeholder={cashoutMethod === 'RIB / CIB' ? '08 000 000...' : '+216 20 000 000'}
                    className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-zinc-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    Amount (DT)
                  </label>
                  <input
                    type="number"
                    min="20"
                    max={walletTnd}
                    step="0.5"
                    required
                    value={cashoutAmount}
                    onChange={(e) => setCashoutAmount(e.target.value)}
                    className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm tabular-nums focus:outline-none focus:border-zinc-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2.5 rounded-lg transition"
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