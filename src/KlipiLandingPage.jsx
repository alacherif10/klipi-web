import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  Copy,
  Check,
  ShieldCheck,
  ChevronDown,
  X,
  Lock,
  Flame,
  Zap,
  Search,
  Users,
  Sparkles,
  Layers,
  Radio,
  Music,
  Smartphone,
  ShoppingBag,
  Gamepad2,
  Sliders,
  Award,
  Tv,
  Play
} from 'lucide-react';
import { supabase } from './supabaseClient';

// Helper to generate a clean referral code
const generateRefCode = (name) => {
  const clean = name.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 3) || 'TN';
  const rand = Math.floor(100 + Math.random() * 900);
  return `KLIPI-${clean}-${rand}`;
};

// --- PRE-LAUNCH VALIDATION TICKER (Multi-category activity stream) ---
const RECENT_ACTIVITIES = [
  { id: 1, user: '@farouk_clips', text: 'reserved spot #14 on Founding Creator Waitlist', badge: 'D17 Verified', time: '2m ago' },
  { id: 2, user: '@kamelgaming.tn', text: '[Pilot Spec] 2,000 DT Kick stream clipping pool blueprint', badge: 'Streamer Spec', time: '6m ago' },
  { id: 3, user: '@sarra.edit', text: 'reserved spot #15 on Founding Creator Waitlist', badge: 'Flouci Verified', time: '11m ago' },
  { id: 4, user: '@tunisianfounders', text: '[Pilot Spec] 1,500 DT podcast interview clips blueprint', badge: 'Podcast Spec', time: '18m ago' },
  { id: 5, user: '@amine_ugc', text: 'reserved spot #16 on Founding Creator Waitlist', badge: 'Bank RIB', time: '29m ago' },
  { id: 6, user: '@konnect.network', text: '[Pilot Spec] 2,500 DT fintech app demo & UGC blueprint', badge: 'SaaS Spec', time: '41m ago' },
  { id: 7, user: '@yalladelivery.tn', text: '[Pilot Spec] 3,000 DT food delivery POV video blueprint', badge: 'Brand Spec', time: '53m ago' },
];

// --- UPCOMING PILOT BOUNTIES (Brands, SaaS Apps, Podcasts, Music, Streamers) ---
const BOUNTIES_DATABASE = [
  {
    id: 'b1',
    creator: 'Konnect Pay TN',
    handle: '@konnect.network',
    bountyType: 'App Demo & UGC',
    category: 'Apps & SaaS',
    audience: '45K on LinkedIn & Web',
    statusBadge: 'Sample Launch Spec',
    coverImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=900&q=80',
    avatarBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    tagBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/35',
    accentColor: '#38BDF8',
    initials: 'KP',
    themeBadge: 'Fintech & Instant Payments',
    title: 'Freelancers Getting Paid Fast in Tunisia: App Screen Recording & POV',
    cpmTnd: 3.5,
    minViews: 2000,
    maxPerClipTnd: 350,
    targetPoolTnd: 2500,
    pledgedPoolTnd: 2500,
    platforms: ['TikTok', 'Reels', 'Shorts'],
    rules: [
      'Show the Konnect instant payment link in mobile screen recording',
      'Mention zero bureaucracy and instant cashout to Tunisian banks',
      'Tag @konnect.network and include link in bio/caption',
      'Views verified via official platform API'
    ],
    hotTimestamps: [
      { time: '00:03:10', label: 'Payment Link Generator Demo', spike: 'Feature Hook' },
      { time: '00:12:45', label: 'Instant Bank Payout Screen', spike: 'High Retention' },
    ],
  },
  {
    id: 'b2',
    creator: 'Yalla Delivery TN',
    handle: '@yalladelivery.tn',
    bountyType: 'Brand UGC Video',
    category: 'Brands & E-com',
    audience: 'Tunisia-wide App',
    statusBadge: 'Sample Launch Spec',
    coverImage: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=900&q=80',
    avatarBg: 'bg-[#00F59B]/20 text-[#00F59B] border-[#00F59B]/30',
    tagBg: 'bg-[#00F59B]/20 text-[#00F59B] border-[#00F59B]/35',
    accentColor: '#00F59B',
    initials: 'YD',
    themeBadge: 'Food Delivery & Promo Code',
    title: '15-Min Late Night Food Run: Funny Relatable Student POV',
    cpmTnd: 4.0,
    minViews: 3000,
    maxPerClipTnd: 450,
    targetPoolTnd: 3000,
    pledgedPoolTnd: 3000,
    platforms: ['TikTok', 'Reels'],
    rules: [
      'Authentic everyday POV video format in Tunisian Darija',
      'Show prompt food arrival & food unboxing (burger / tacos / pizza)',
      'Include promo code KLIPI in on-screen sticker & caption',
      'No bot traffic (verified by engagement & comment audit)'
    ],
    hotTimestamps: [
      { time: '00:05:12', label: 'Order Placement Screen Hook', spike: 'Hook Pattern' },
      { time: '00:14:45', label: 'Delivery Driver Doorstep Handover', spike: 'High Engagement' },
    ],
  },
  {
    id: 'b3',
    creator: 'Tunisian Founders Pod',
    handle: '@tunisianfounders',
    bountyType: 'Podcast Clipping',
    category: 'Podcasts & Shows',
    audience: '85K on YouTube & Spotify',
    statusBadge: 'Sample Launch Spec',
    coverImage: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=900&q=80',
    avatarBg: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    tagBg: 'bg-blue-500/20 text-blue-300 border-blue-500/35',
    accentColor: '#60A5FA',
    initials: 'TF',
    themeBadge: 'Business & Tech Interviews',
    title: 'Viral Clips: Ep. 18 — Building SaaS from Tunis to $10K MRR',
    cpmTnd: 3.0,
    minViews: 1500,
    maxPerClipTnd: 300,
    targetPoolTnd: 1500,
    pledgedPoolTnd: 1500,
    platforms: ['TikTok', 'Reels'],
    rules: [
      'Add clean Arabic/French dynamic animated subtitles',
      'Tag @tunisianfounders in caption & bio link',
      'Hook the viewer within the first 3 seconds with high-conviction quote',
      'Views verified via TikTok & IG API'
    ],
    hotTimestamps: [
      { time: '00:24:10', label: 'Why Stripe & Local Payments Matter in Tunisia', spike: 'High Retention' },
      { time: '00:52:33', label: 'First $10K MRR Breakdown & Pricing Mistake', spike: 'Top Replay' },
    ],
  },
  {
    id: 'b4',
    creator: 'Kafon x Tunis Trap Records',
    handle: '@kafon.music',
    bountyType: 'TikTok Sound Promo',
    category: 'Music & Sounds',
    audience: '1.2M on TikTok & YouTube',
    statusBadge: 'Sample Launch Spec',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=900&q=80',
    avatarBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    tagBg: 'bg-amber-500/20 text-amber-300 border-amber-500/35',
    accentColor: '#FBBF24',
    initials: 'KF',
    themeBadge: 'Trending Audio Launch',
    title: 'New Single "Sahbi" Audio Drop: Use Official Sound in POV & Edits',
    cpmTnd: 2.8,
    minViews: 2000,
    maxPerClipTnd: 280,
    targetPoolTnd: 1800,
    pledgedPoolTnd: 1800,
    platforms: ['TikTok', 'Reels'],
    rules: [
      'Must use the official sound "Sahbi - Kafon" as background audio',
      'Audio must play for at least 7 seconds in video',
      'Accepted formats: Car edits, workout POVs, travel vlogs, relatable humor',
      'Audio usage verified directly through TikTok Sound ID'
    ],
    hotTimestamps: [
      { time: '00:00:15', label: 'Bass Drop Chorus Hook', spike: 'Top Sound Segment' },
      { time: '00:00:42', label: 'Acoustic Guitar Bridge', spike: 'Vibe Segment' },
    ],
  },
  {
    id: 'b5',
    creator: 'Kamel Gaming TN',
    handle: '@kamelgaming.tn',
    bountyType: 'Stream Highlight Clipping',
    category: 'Gaming & Streamers',
    audience: '142K on Kick',
    statusBadge: 'Sample Launch Spec',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80',
    avatarBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    tagBg: 'bg-purple-500/20 text-purple-300 border-purple-500/35',
    accentColor: '#C084FC',
    initials: 'KG',
    themeBadge: 'GTA RP & Kick Live',
    title: 'Kick Ranked Rage & 1v5 Clutches (Season 4 Heist)',
    cpmTnd: 2.5,
    minViews: 2000,
    maxPerClipTnd: 250,
    targetPoolTnd: 2000,
    pledgedPoolTnd: 2000,
    platforms: ['TikTok', 'Reels', 'Shorts'],
    rules: [
      'Must keep @kamelgaming.tn watermark visible in top corner',
      'Include #KamelTN in video caption',
      'Fast-paced edits with zoom punches on facecam reactions',
      '48h anti-bot verification before D17/Flouci cashout'
    ],
    hotTimestamps: [
      { time: '01:14:22', label: '1v5 Clutch + Mic Drop', spike: '+420 msg/min' },
      { time: '02:48:05', label: 'Chat Troll Donation Reaction', spike: '+380 msg/min' },
      { time: '03:19:40', label: 'Surprise Guest Call-in', spike: '+510 msg/min' },
    ],
  },
  {
    id: 'b6',
    creator: 'Derby Café & Gaming',
    handle: '@derbycafe.tn',
    bountyType: 'Venue & Match UGC',
    category: 'Brands & E-com',
    audience: '32K on Facebook & IG',
    statusBadge: 'Sample Launch Spec',
    coverImage: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=80',
    avatarBg: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    tagBg: 'bg-rose-500/20 text-rose-300 border-rose-500/35',
    accentColor: '#FB7185',
    initials: 'DC',
    themeBadge: 'Sports Lounge & Match Debates',
    title: 'Champions League Live Watch-Along Reactions & Studio Debates',
    cpmTnd: 2.0,
    minViews: 2500,
    maxPerClipTnd: 200,
    targetPoolTnd: 1200,
    pledgedPoolTnd: 1200,
    platforms: ['TikTok', 'Reels'],
    rules: [
      'Include Derby Café logo watermark and location tag (Menzah)',
      'Highlight crowd goal celebration or tactical fan arguments',
      'Must be uploaded within 24h of final whistle'
    ],
    hotTimestamps: [
      { time: '01:48:12', label: '90+4 Last-Minute Goal Studio Eruption', spike: '+690 msg/min' },
      { time: '02:05:30', label: 'Post-Match Heated Fan Debate', spike: '+410 msg/min' },
    ],
  },
];

// --- FOUNDING WAITLIST RESERVATIONS (Transparent multi-category demand proof) ---
const RECENT_RESERVATIONS = [
  { id: 'res-1', handle: '@farouk_clips', role: 'Video Editor', focus: 'Podcasts & Gaming', channel: 'D17 (La Poste)', spot: '#47', status: 'Reserved' },
  { id: 'res-2', handle: '@yalladelivery.tn', role: 'Brand', focus: 'Food Delivery App', channel: '3,000 DT Pool', spot: 'Pilot Brand', status: 'Approved' },
  { id: 'res-3', handle: '@sarra.edit', role: 'Video Editor', focus: 'Interviews & Tech', channel: 'Flouci Wallet', spot: '#48', status: 'Reserved' },
  { id: 'res-4', handle: '@tunisianfounders', role: 'Podcast', focus: 'Business Podcast', channel: '1,500 DT Pool', spot: 'Pilot Podcast', status: 'Approved' },
  { id: 'res-5', handle: '@amine_ugc', role: 'UGC Creator', focus: 'Music & App POV', channel: 'Flouci Wallet', spot: '#49', status: 'Reserved' },
  { id: 'res-6', handle: '@konnect.network', role: 'SaaS / Brand', focus: 'Fintech Payments', channel: '2,500 DT Pool', spot: 'Pilot SaaS', status: 'Approved' },
];

const FAQ_ITEMS = [
  {
    q: 'How does Klipi work compared to Content Rewards?',
    a: 'Just like Content Rewards, brands, apps, podcasts, musicians, and streamers launch bounty pools with cash locked in escrow. Video editors and UGC creators create short clips or original videos on TikTok & Reels. When your video earns verified views, you get paid automatically in Dinars.'
  },
  {
    q: 'What types of content can I create or clip?',
    a: 'Klipi hosts two formats: (1) Clipping Bounties: You download pre-flagged moments from podcasts, interviews, or streams and edit them into viral short videos. (2) UGC & Audio Bounties: You test a mobile app on camera, film a POV for a brand, or use an artist\'s trending song in your video.'
  },
  {
    q: 'How does the Escrow guarantee protect creators?',
    a: 'Every campaign requires 100% of the bounty budget to be pre-funded in escrow before creators start editing. Funds cannot be pulled or refunded by the advertiser mid-campaign. When your approved video hits view milestones, your payout is guaranteed.'
  },
  {
    q: 'How and when do I get paid?',
    a: 'You can withdraw directly to your D17 (La Poste Tunisienne), Flouci Wallet, or any 20-digit Tunisian Bank RIB (Attijari, BIAT, BNA, STB, etc.) from just 10 DT. Founding creators who join the waitlist today receive 0.00 DT withdrawal fees forever.'
  },
  {
    q: 'I run a brand, app, or podcast in Tunisia. How do I launch a bounty?',
    a: "Switch the application form below to \"I'm a Brand, App, or Show\". Tell us what you want to promote, set your target bounty budget (e.g. 500 DT), and we will onboard you for our launch cohort to get hundreds of local creators posting for you."
  }
];

export default function KlipiLandingPage() {
  const [waitlist, setWaitlist] = useState(() => {
    try {
      const saved = localStorage.getItem('klipi_tn_waitlist_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Hero Simulator State
  const [heroViews, setHeroViews] = useState(50000);
  const heroCpmRate = 3.0;

  // Category filter state
  const [selectedCat, setSelectedCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBounty, setSelectedBounty] = useState(null);
  const [estimatedViews, setEstimatedViews] = useState(25000);
  const [copiedTimestamp, setCopiedTimestamp] = useState(null);

  // Form State
  const [role, setRole] = useState('Creator');
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [detailField, setDetailField] = useState('D17 (La Poste)');
  const [categoryInterest, setCategoryInterest] = useState('Video Editing & Subtitles');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedEntry, setSubmittedEntry] = useState(null);
  const [copiedRef, setCopiedRef] = useState(false);

  // Active Live Activity Index
  const [activityIndex, setActivityIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActivityIndex((prev) => (prev + 1) % RECENT_ACTIVITIES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Auto-scroll on initial load if URL has #waitlist or #waitlist-form
  useEffect(() => {
    if (window.location.hash === '#waitlist' || window.location.hash === '#waitlist-form') {
      setTimeout(() => {
        const el = document.getElementById('waitlist') || document.getElementById('waitlist-form');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 350);
    }
  }, []);

  const handleRoleSwitch = (nextRole) => {
    setRole(nextRole);
    setSubmittedEntry(null);
    setErrorMsg('');
    if (nextRole === 'Creator') {
      setDetailField('D17 (La Poste)');
      setCategoryInterest('Video Editing & Subtitles');
    } else {
      setDetailField('500 – 1,500 DT / campaign');
      setCategoryInterest('Mobile App / SaaS Promotion');
    }
  };

  const [openFaq, setOpenFaq] = useState(0);
  const [cloudSaved, setCloudSaved] = useState(null);

  // Smooth jump to waitlist with matching role and input focus ring (Point B)
  const jumpToWaitlist = (targetRole = 'Creator') => {
    handleRoleSwitch(targetRole);
    const el = document.getElementById('waitlist-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        const input = document.getElementById('waitlist-handle-input');
        if (input) {
          input.focus();
          input.classList.add('ring-2', 'ring-[#00F59B]', 'ring-offset-2', 'ring-offset-[#08090E]');
          setTimeout(() => {
            input.classList.remove('ring-2', 'ring-[#00F59B]', 'ring-offset-2', 'ring-offset-[#08090E]');
          }, 2500);
        }
      }, 500);
    }
  };

  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();
    if (!fullName.trim() || !contact.trim()) return;

    setSubmitting(true);
    setErrorMsg('');

    const refCode = generateRefCode(fullName.trim());
    const refParam = new URLSearchParams(window.location.search).get('ref');

    try {
      // Note: Map to roles that satisfy existing database check constraints
      const payload = {
        role: role === 'Creator' ? 'clipper' : 'streamer',
        handle: fullName.trim(),
        contact: contact.trim(),
        payout_or_budget: `[${role}] ${detailField} • ${categoryInterest}`,
        referral_code: refCode,
        referred_by: refParam || null,
      };

      const { error: sbError } = await supabase.from('waitlist').insert([payload]);

      if (sbError) {
        console.warn('Supabase waitlist notice:', sbError);
        if (sbError.code === '23505') {
          setErrorMsg('This WhatsApp number or handle is already registered on the waitlist!');
          setSubmitting(false);
          return;
        }
        setCloudSaved(false);
      } else {
        setCloudSaved(true);
      }
    } catch (err) {
      console.warn('Supabase connection notice:', err);
      setCloudSaved(false);
    }

    let queuePos = 50 + waitlist.length;

    const newEntry = {
      id: `wl-${Date.now()}`,
      role,
      handle: fullName.trim(),
      contact: contact.trim(),
      detail: `${detailField} • ${categoryInterest}`,
      refCode,
      queue: queuePos,
    };

    setWaitlist([newEntry, ...waitlist]);
    setSubmittedEntry(newEntry);
    setSubmitting(false);
  };

  const handleCopyRef = (code) => {
    const url = `${window.location.origin}?ref=${code}`;
    navigator.clipboard?.writeText(url);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handleCopyTimestamp = (time) => {
    navigator.clipboard?.writeText(time);
    setCopiedTimestamp(time);
    setTimeout(() => setCopiedTimestamp(null), 1800);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const categories = [
    { name: 'All', icon: Layers, count: 6 },
    { name: 'Apps & SaaS', icon: Smartphone, count: 1 },
    { name: 'Brands & E-com', icon: ShoppingBag, count: 2 },
    { name: 'Podcasts & Shows', icon: Radio, count: 1 },
    { name: 'Music & Sounds', icon: Music, count: 1 },
    { name: 'Gaming & Streamers', icon: Gamepad2, count: 1 }
  ];

  const filteredBounties = BOUNTIES_DATABASE.filter((b) => {
    const matchesCat = selectedCat === 'All' || b.category === selectedCat;
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.bountyType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const calculatedEstimate = selectedBounty
    ? Math.min(
        selectedBounty.maxPerClipTnd,
        +((estimatedViews / 1000) * selectedBounty.cpmTnd).toFixed(2)
      )
    : 0;

  const currentActivity = RECENT_ACTIVITIES[activityIndex];

  // Hero Simulator Output
  const simulatedHeroPayout = ((heroViews / 1000) * heroCpmRate).toFixed(2);

  return (
    <div className="min-h-screen bg-[#08090E] text-[#F8FAFC] font-sans antialiased selection:bg-[#00F59B]/25 selection:text-white">
      {/* =====================================================================
          TOP NAVIGATION BAR (Spatial Glass Header)
         ===================================================================== */}
      <header className="sticky top-0 z-40 h-16 bg-[#08090E]/90 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <a href="#top" className="flex items-center group py-0.5">
              <img
                src="/klipi-logo.png?v=4"
                alt="Klipi"
                className="h-10 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.04]"
              />
            </a>

            <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-slate-400">
              <button onClick={() => scrollToSection('pilot-bounties')} className="hover:text-white transition">Upcoming Bounties</button>
              <button onClick={() => scrollToSection('roster')} className="hover:text-white transition">Founding Roster</button>
              <button onClick={() => scrollToSection('how-it-works')} className="hover:text-white transition">How It Works</button>
              <button onClick={() => scrollToSection('brands')} className="hover:text-white transition">For Brands</button>
              <button onClick={() => scrollToSection('faq')} className="hover:text-white transition">FAQ</button>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#11131C] border border-white/[0.08] text-xs">
              <span className="w-2 h-2 rounded-full bg-[#00F59B] live-dot"></span>
              <span className="text-slate-400 font-medium hidden sm:inline">Status:</span>
              <span className="font-bold text-white font-mono text-[11px]">PRIVATE BETA</span>
            </div>

            <a
              href="/demo"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#00F59B] bg-[#00F59B]/10 hover:bg-[#00F59B]/20 border border-[#00F59B]/30 px-3.5 py-2 rounded-xl transition shadow-[0_0_12px_rgba(0,245,155,0.15)] group"
            >
              <Play className="w-3 h-3 fill-[#00F59B] group-hover:scale-110 transition-transform" />
              <span>Interactive Demo</span>
            </a>

            <button
              onClick={() => jumpToWaitlist('Creator')}
              className="px-4 py-2 rounded-xl bg-[#00F59B] hover:bg-[#00D680] text-[#052014] text-xs font-black transition-all duration-200 flex items-center gap-1.5 shadow-lg shadow-[#00F59B]/15 hover:shadow-[#00F59B]/30 hover:scale-[1.02] cursor-pointer"
            >
              <span>Join Waitlist</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================================
          TICKER BAR (Financial Exchange Style)
         ===================================================================== */}
      <div className="bg-[#0B0D13] border-b border-white/[0.06] py-2 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-3 min-w-0">
            <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-[#00F59B] bg-[#00F59B]/10 border border-[#00F59B]/25 px-2 py-0.5 rounded shrink-0 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F59B] live-dot"></span>
              LIVE PLEDGES
            </span>

            <div className="flex items-center gap-2 truncate text-slate-300 font-mono text-[11px] sm:text-xs">
              <span className="font-bold text-white truncate">{currentActivity.user}</span>
              <span className="text-slate-400 truncate">{currentActivity.text}</span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-3 shrink-0 text-slate-500 font-mono text-[11px]">
            <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-slate-300 font-medium">{currentActivity.badge}</span>
            <span>{currentActivity.time}</span>
          </div>
        </div>
      </div>

      {/* =====================================================================
          MIND-BLOWING ASYMMETRICAL HERO (EDITORIAL CREATOR FINANCIAL EXCHANGE)
         ===================================================================== */}
      <section id="top" className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-white/[0.08] ambient-glow overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left 7 Columns: Editorial Typographic Command Center */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#11131C] border border-white/[0.1] text-xs font-semibold text-slate-300 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#00F59B] live-dot"></span>
                  <span className="font-mono text-[11px] tracking-wide uppercase text-slate-300">Tunisia's 1st Content Bounty Protocol</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-[#00F59B] font-mono text-[11px]">100% Escrow</span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-[-0.04em] text-white leading-[1.02]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Post Clips & UGC.{' '}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00F59B] to-emerald-400">
                  Cash Out Dinars.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
                Tunisian brands, SaaS apps, <span className="text-white font-bold underline decoration-[#00F59B]/50 decoration-2 underline-offset-4">Kick & Twitch streamers</span>, podcasts, and music artists lock cash bounties in escrow. You turn their streams, moments, and products into viral TikToks & Reels. Every 1,000 verified views pays out straight to <strong className="text-white font-medium">D17, Flouci, or Bank RIB.</strong>
              </p>

              {/* Mind-Blowing Interactive Earnings Visualizer */}
              <div className="bg-[#0E1017] border border-white/[0.1] rounded-2xl p-5 space-y-4 shadow-xl">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#00F59B]" />
                    <span className="font-bold text-white uppercase tracking-wider text-[11px] font-mono">Interactive Payout Visualizer</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">Rate: 3.00 DT / 1K views</span>
                </div>

                <div className="space-y-2">
                  <input
                    type="range"
                    min={10000}
                    max={200000}
                    step={10000}
                    value={heroViews}
                    onChange={(e) => setHeroViews(Number(e.target.value))}
                    className="w-full accent-[#00F59B] cursor-pointer h-2 bg-white/10 rounded-lg"
                  />
                  <div className="flex items-center justify-between font-mono text-[11px] text-slate-400">
                    <span>10K views</span>
                    <span className="text-[#00F59B] font-bold">{heroViews.toLocaleString()} monthly views</span>
                    <span>200K views</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/[0.06] text-center font-mono">
                  <div className="bg-white/[0.02] p-2.5 rounded-xl border border-white/[0.04]">
                    <span className="text-[10px] text-slate-500 uppercase block">Projected Cashout</span>
                    <span className="text-lg sm:text-xl font-black text-[#00F59B] block mt-0.5">{simulatedHeroPayout} DT</span>
                  </div>
                  <div className="bg-white/[0.02] p-2.5 rounded-xl border border-white/[0.04]">
                    <span className="text-[10px] text-slate-500 uppercase block">Settlement Rail</span>
                    <span className="text-xs sm:text-sm font-bold text-white block mt-1">D17 / Flouci</span>
                  </div>
                  <div className="bg-white/[0.02] p-2.5 rounded-xl border border-white/[0.04]">
                    <span className="text-[10px] text-slate-500 uppercase block">Platform Fee</span>
                    <span className="text-xs sm:text-sm font-bold text-white block mt-1">0.00 DT (0%)</span>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={() => jumpToWaitlist('Creator')}
                  className="px-7 py-4 rounded-xl bg-[#00F59B] hover:bg-[#00D680] text-[#052014] font-black text-sm transition-all shadow-xl shadow-[#00F59B]/20 hover:scale-[1.02] flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>Claim Founding Creator Ticket</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => jumpToWaitlist('Brand')}
                  className="px-6 py-4 rounded-xl bg-[#12141D] hover:bg-[#181B26] text-white font-bold text-sm border border-white/[0.1] hover:border-white/[0.2] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Launch a Brand / Streamer Pool</span>
                </button>
                <a
                  href="/demo"
                  className="px-5 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white font-bold text-sm border border-white/[0.1] hover:border-[#38BDF8]/40 transition-all flex items-center justify-center gap-2 group"
                >
                  <Tv className="w-4 h-4 text-[#38BDF8] group-hover:scale-110 transition-transform" />
                  <span>Preview App UI (/demo)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>

              {/* 4 Technical Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 font-mono text-left">
                <div className="p-3 rounded-xl bg-[#0E1017] border border-white/[0.06]">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Founding Cap</span>
                  <span className="text-lg font-black text-white mt-0.5 block">100 Spots</span>
                  <span className="text-[10px] text-[#00F59B]">Cohort priority</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0E1017] border border-white/[0.06]">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Pilot Pledges</span>
                  <span className="text-lg font-black text-[#00F59B] mt-0.5 block">12,000 DT</span>
                  <span className="text-[10px] text-slate-400">Target pools</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0E1017] border border-white/[0.06]">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Lifetime Fee</span>
                  <span className="text-lg font-black text-white mt-0.5 block">0% Fees</span>
                  <span className="text-[10px] text-[#00F59B]">Early exemption</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0E1017] border border-white/[0.06]">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Min Cashout</span>
                  <span className="text-lg font-black text-white mt-0.5 block">10 DT</span>
                  <span className="text-[10px] text-slate-400">Direct to D17</span>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: The Spatial 3D Klipi Escrow Vault Pass */}
            <div className="lg:col-span-5 perspective-1000">
              <div className="hologram-card rounded-3xl border border-white/15 p-7 shadow-2xl space-y-6 transition-transform duration-500 hover:rotate-0 transform lg:-rotate-1 lg:rotate-y-3">
                
                {/* Vault Pass Top Bar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img src="/klipi-logo.png?v=4" alt="Klipi" className="h-7 w-auto object-contain" />
                    <div>
                      <span className="text-[10px] text-[#00F59B] font-mono block">ESCROW PROTOCOL</span>
                      <span className="text-[9px] text-slate-500 font-mono">SERIES TN-2026</span>
                    </div>
                  </div>
                  <div className="w-10 h-7 rounded-md bg-gradient-to-br from-amber-400/80 to-amber-600/40 border border-amber-300/40 flex items-center justify-center shadow-inner">
                    <span className="w-4 h-3 border border-amber-200/60 rounded-sm"></span>
                  </div>
                </div>

                {/* Vault Escrow Display */}
                <div className="p-5 rounded-2xl bg-black/60 border border-white/[0.08] space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Pilot Cohort Target</span>
                    <span className="text-[#38BDF8] font-bold flex items-center gap-1">
                      <Lock className="w-3 h-3" /> PILOT SPEC
                    </span>
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                    5,000 <span className="text-[#00F59B] text-2xl">DT</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#00F59B] h-full rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>

                {/* Live Settlement Telemetry */}
                <div className="space-y-2.5 font-mono text-xs">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Tunisian Settlement Rails</span>
                  
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#00F59B] live-dot"></span>
                      <span className="text-white text-xs font-semibold">D17 (La Poste)</span>
                    </div>
                    <span className="text-[11px] text-[#00F59B] font-bold">INSTANT SETTLE</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#38BDF8] live-dot"></span>
                      <span className="text-white text-xs font-semibold">Flouci Mobile Wallet</span>
                    </div>
                    <span className="text-[11px] text-[#38BDF8] font-bold">0.00 DT FEE</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                      <span className="text-white text-xs font-semibold">20-Digit Bank RIB</span>
                    </div>
                    <span className="text-[11px] text-amber-300 font-bold">BIAT / ATTIJARI</span>
                  </div>
                </div>

                {/* Security Stamping Footer */}
                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>SECURED BY 48H ANTI-BOT AUDIT</span>
                  <span className="text-slate-400">TUNIS, TN</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================================
          UPCOMING BOUNTIES CONSOLE (CONTENT REWARDS MULTI-CATEGORY)
         ===================================================================== */}
      <section id="pilot-bounties" className="py-16 sm:py-24 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="space-y-2 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/25 text-[#38BDF8] text-xs font-mono font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Sample Launch Specifications
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Upcoming Pilot Bounties for Launch Day
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
                Demonstration briefs for Kick streamers, SaaS fintech, podcasts, music drops, and food delivery. Real brand pools activate upon private beta launch.
              </p>
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search brand, app, sound..."
                className="w-full bg-[#11131C] border border-white/[0.1] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F59B] font-mono transition"
              />
            </div>
          </div>

          {/* Tactical Filter Console Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
            {categories.map((cat) => {
              const IconComponent = cat.icon;
              const isActive = selectedCat === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCat(cat.name)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-2 border ${
                    isActive
                      ? 'bg-white text-black border-white shadow-lg'
                      : 'bg-[#11131C] border-white/[0.08] text-slate-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                  <span>{cat.name}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                    isActive ? 'bg-black/10 text-black font-black' : 'bg-white/10 text-slate-400'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Ticket-Style Bounty Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBounties.map((bounty) => (
              <div
                key={bounty.id}
                onClick={() => {
                  setSelectedBounty(bounty);
                  setEstimatedViews(25000);
                }}
                className="group relative bg-[#0E1017] border border-white/[0.08] hover:border-[#00F59B]/40 rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between"
              >
                <div>
                  {/* Category Image Canvas */}
                  <div className="relative h-44 sm:h-48 overflow-hidden border-b border-white/[0.08]">
                    <img
                      src={bounty.coverImage}
                      alt={bounty.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E1017] via-[#0E1017]/60 to-black/40" />

                    <div className="relative z-10 h-full p-4 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border backdrop-blur-md shadow-md ${bounty.tagBg}`}>
                            {bounty.bountyType}
                          </span>
                          <span className="text-[9px] font-mono font-semibold text-slate-300 bg-black/60 border border-white/10 px-2 py-0.5 rounded backdrop-blur-md">
                            SAMPLE SPEC
                          </span>
                        </div>

                        <span className="bg-[#08090E]/90 backdrop-blur-md border border-[#00F59B]/40 text-[#00F59B] text-xs font-black px-3 py-1 rounded-xl font-mono shadow-xl">
                          {bounty.cpmTnd.toFixed(2)} DT / 1K
                        </span>
                      </div>

                      <div className="flex items-end justify-between">
                        <span className="text-[11px] font-semibold text-white drop-shadow flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00F59B]"></span>
                          {bounty.audience}
                        </span>
                        
                        {/* Audio Waveform Indicator for Music Bounties */}
                        {bounty.category === 'Music & Sounds' ? (
                          <div className="flex items-center gap-1 bg-black/70 backdrop-blur-md px-2 py-1 rounded-lg border border-amber-400/30">
                            <span className="w-1 h-3 bg-amber-400 rounded-full eq-bar-1"></span>
                            <span className="w-1 h-4 bg-amber-400 rounded-full eq-bar-2"></span>
                            <span className="w-1 h-2 bg-amber-400 rounded-full eq-bar-3"></span>
                            <span className="w-1 h-3.5 bg-amber-400 rounded-full eq-bar-4"></span>
                            <span className="text-[10px] font-mono text-amber-300 ml-1">OFFICIAL SOUND</span>
                          </div>
                        ) : (
                          <span className="text-[10px] bg-black/70 backdrop-blur-md text-slate-200 border border-white/10 px-2 py-0.5 rounded font-mono">
                            Cap: {bounty.maxPerClipTnd} DT
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-5 space-y-3.5 text-left">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center font-bold text-xs shrink-0 ${bounty.avatarBg}`}>
                        {bounty.initials}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-bold text-white truncate group-hover:text-[#00F59B] transition">
                            {bounty.creator}
                          </span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00F59B] shrink-0" />
                        </div>
                        <span className="text-xs text-slate-400 font-mono block truncate">
                          {bounty.handle} • {bounty.category}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-sm font-semibold text-slate-100 leading-snug line-clamp-2">
                      {bounty.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {bounty.platforms.map((p) => (
                        <span
                          key={p}
                          className="text-[10px] font-semibold bg-white/[0.04] border border-white/[0.08] text-slate-300 px-2 py-0.5 rounded"
                        >
                          {p}
                        </span>
                      ))}
                      <span className="text-[10px] text-slate-400 ml-auto font-mono">
                        Min {bounty.minViews.toLocaleString()} views
                      </span>
                    </div>
                  </div>
                </div>

                {/* Target Escrow Pool Gauge Footer */}
                <div className="p-5 pt-3.5 border-t border-white/[0.06] bg-[#0A0C12] space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-semibold text-slate-300 text-[11px]">
                      Planned Pool:{' '}
                      <span className="font-bold text-white">
                        {bounty.targetPoolTnd.toLocaleString()} DT
                      </span>
                    </span>
                    <span className="font-bold text-[#00F59B] text-[11px]">{bounty.statusBadge}</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#00F59B] to-emerald-400 rounded-full"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =====================================================================
          FOUNDING WAITLIST & PLEDGES LEDGER
         ===================================================================== */}
      <section id="roster" className="py-16 sm:py-24 border-b border-white/[0.08] bg-[#0A0C12]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 text-left">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#00F59B] bg-[#00F59B]/10 border border-[#00F59B]/25 px-3 py-1 rounded-full font-mono">
                Founding Member Registry
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Live Pledges & Waitlist Commitments
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Tunisian creators, brands, and video editors securing priority allocation for private beta launch.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#00F59B] font-mono bg-[#00F59B]/10 border border-[#00F59B]/25 px-4 py-2 rounded-xl">
              <Users className="w-4 h-4" />
              <span className="font-bold">{14 + waitlist.length} / 100 Founding Spots Claimed</span>
            </div>
          </div>

          <div className="bg-[#0E1017] border border-white/[0.08] rounded-3xl overflow-hidden shadow-xl">
            <div className="divide-y divide-white/[0.05]">
              {RECENT_RESERVATIONS.map((item) => (
                <div key={item.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition text-left">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm font-bold text-white font-mono">{item.handle}</span>
                      <span className="text-[10px] bg-[#00F59B]/10 border border-[#00F59B]/25 text-[#00F59B] px-2 py-0.5 rounded font-mono font-bold">{item.role}</span>
                      <span className="text-xs text-slate-400">• {item.focus}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 justify-between sm:justify-end font-mono">
                    <div className="text-right">
                      <span className="text-xs text-slate-300 font-medium block">{item.channel}</span>
                      <span className="text-[10px] text-slate-500 uppercase">Rail / Pledge</span>
                    </div>

                    <div className="text-right min-w-[95px]">
                      <span className="text-sm font-black text-[#00F59B] block">{item.spot}</span>
                      <span className="text-[10px] bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 rounded text-slate-400">{item.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          WHY KLIPI WORKS (THE 4 PILLARS)
         ===================================================================== */}
      <section id="how-it-works" className="py-16 sm:py-24 border-b border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00F59B] bg-[#00F59B]/10 border border-[#00F59B]/25 px-3 py-1 rounded-full font-mono">
              The Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Built for the Real Tunisian Creator Economy
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Clear financial rules and brand assets engineered specifically for local video editors and advertisers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="bg-[#0E1017] border border-white/[0.08] hover:border-white/15 rounded-3xl p-7 space-y-3.5 transition">
              <div className="w-11 h-11 rounded-2xl bg-[#00F59B]/10 border border-[#00F59B]/25 flex items-center justify-center text-[#00F59B]">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-white">100% Pre-Funded Escrow (No Ghosting)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Advertisers (brands, apps, podcasts, streamers) must deposit 100% of the bounty budget into Klipi escrow before campaigns go live. Funds are locked securely and cannot be retracted mid-campaign. When your video hits verified views, your payout in Dinars is guaranteed.
              </p>
            </div>

            <div className="bg-[#0E1017] border border-white/[0.08] hover:border-white/15 rounded-3xl p-7 space-y-3.5 transition">
              <div className="w-11 h-11 rounded-2xl bg-amber-400/10 border border-amber-400/25 flex items-center justify-center text-amber-400">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-white">Direct Tunisian Cashout Rails (D17 & Flouci)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                No foreign bank accounts, PayPal, or currency restrictions. Withdraw your earnings directly to your D17 (La Poste Tunisienne), Flouci Wallet, or any 20-digit Tunisian Bank RIB from as low as 10 DT with 0.00 DT fees for founding members.
              </p>
            </div>

            <div className="bg-[#0E1017] border border-white/[0.08] hover:border-white/15 rounded-3xl p-7 space-y-3.5 transition">
              <div className="w-11 h-11 rounded-2xl bg-purple-400/10 border border-purple-400/25 flex items-center justify-center text-purple-400">
                <Flame className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-lg font-black text-white">Ready Brand Kits, Screen Recordings & Audio Drops</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Never start from scratch. App creators supply raw screen recordings and promo codes, podcasters flag viral interview clips, and artists provide official TikTok sound tracks. Pick a campaign and start editing immediately.
              </p>
            </div>

            <div className="bg-[#0E1017] border border-white/[0.08] hover:border-white/15 rounded-3xl p-7 space-y-3.5 transition">
              <div className="w-11 h-11 rounded-2xl bg-blue-400/10 border border-blue-400/25 flex items-center justify-center text-blue-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-white">Real Views Only (48h Anti-Bot Verification)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our verification engine audits genuine Tunisian engagement (retention, comments, likes) and filters out bot farms. This protects advertiser marketing budgets and ensures high-quality editors and creators earn top Dinars.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          FOR BRANDS & ADVERTISERS (B2B VALUE PROP)
         ===================================================================== */}
      <section id="brands" className="py-16 sm:py-24 border-b border-white/[0.08] bg-[#0A0C12]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-[#0E1017] border border-white/[0.1] rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="space-y-4 max-w-xl text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-[#00F59B] bg-[#00F59B]/10 border border-[#00F59B]/25 px-3 py-1 rounded-full font-mono">
                For Brands, Startups & Shows
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-snug" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Stop paying agencies 3,000 DT for 2 videos. Get 50 creators talking about you.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Launch a 500 DT pilot bounty on Klipi. Within 48 hours, dozens of Tunisian video editors and UGC creators produce TikToks & Reels testing your app, clipping your podcast, or showing off your product. You only pay for verified views delivered.
              </p>
            </div>

            <div className="shrink-0 flex flex-col gap-3 w-full sm:w-auto">
              <button
                onClick={() => jumpToWaitlist('Brand')}
                className="px-6 py-4 rounded-xl bg-[#00F59B] hover:bg-[#00D680] text-[#052014] font-black text-xs transition shadow-xl shadow-[#00F59B]/20 cursor-pointer"
              >
                Launch a Pilot Bounty
              </button>
              <button
                onClick={() => jumpToWaitlist('Creator')}
                className="px-6 py-3.5 rounded-xl bg-[#141722] border border-white/10 hover:border-white/20 text-white text-xs font-bold text-center transition cursor-pointer"
              >
                Apply as a Creator / Clipper
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          MIND-BLOWING APPLICATION ENGINE: LIVE UPDATING FOUNDING PASS
         ===================================================================== */}
      <section id="waitlist" className="py-20 sm:py-28 border-b border-white/[0.08]">
        <div id="waitlist-form" className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-2 mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#00F59B] bg-[#00F59B]/10 border border-[#00F59B]/25 px-3.5 py-1 rounded-full font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              Founding Cohort Application
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Claim Your Priority Access Pass
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
              First 100 approved creators receive priority access to pilot bounties and lifetime 0% withdrawal fees.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Columns: Form Input Console */}
            <div className="lg:col-span-7 bg-[#0E1017] border border-white/[0.09] rounded-3xl p-6 sm:p-8 shadow-2xl text-left">
              {submittedEntry ? (
                <div className="bg-[#0B0C10] border border-[#00F59B]/40 rounded-2xl p-6 text-center space-y-4 animate-fade-in">
                  <CheckCircle2 className="w-14 h-14 text-[#00F59B] mx-auto" />
                  <div>
                    <h3 className="text-xl font-black text-white font-mono">You're On The Founding Roster!</h3>
                    <p className="text-xs text-slate-400 mt-1.5">
                      Your priority ticket <strong className="text-white font-mono">#{submittedEntry.queue}</strong> is locked. We will message your WhatsApp with pilot onboarding instructions.
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    {cloudSaved === true ? (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#00F59B] bg-[#00F59B]/10 border border-[#00F59B]/25 px-2.5 py-1 rounded-full">
                        <Check className="w-3 h-3" /> Cloud Database Verified (Supabase)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium text-amber-300 bg-amber-500/10 border border-amber-500/25 px-2.5 py-1 rounded-full">
                        <ShieldCheck className="w-3 h-3" /> Verified Local Ticket Stored
                      </span>
                    )}
                  </div>

                  <div className="bg-[#14151E] border border-white/10 rounded-xl p-4 flex items-center justify-between gap-2 font-mono text-xs">
                    <span className="text-[#00F59B] font-bold text-sm">{submittedEntry.refCode}</span>
                    <button
                      onClick={() => handleCopyRef(submittedEntry.refCode)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
                    >
                      {copiedRef ? <Check className="w-3.5 h-3.5 text-[#00F59B]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedRef ? 'Copied Link' : 'Copy Invite Link'}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                  {/* Role Switcher */}
                  <div className="grid grid-cols-2 gap-2 bg-[#08090E] p-1.5 rounded-2xl border border-white/[0.08]">
                    <button
                      type="button"
                      onClick={() => handleRoleSwitch('Creator')}
                      className={`py-2.5 text-xs font-bold rounded-xl transition-all ${
                        role === 'Creator'
                          ? 'bg-white text-black shadow-md'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      I'm a Creator / Clipper
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRoleSwitch('Brand')}
                      className={`py-2.5 text-xs font-bold rounded-xl transition-all ${
                        role !== 'Creator'
                          ? 'bg-white text-black shadow-md'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      I'm a Brand, Streamer, or App
                    </button>
                  </div>

                  {errorMsg && (
                    <div className="p-3 bg-rose-500/10 border border-rose-500/25 text-rose-400 text-xs rounded-xl flex items-center gap-2">
                      <X className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      {role === 'Creator' ? 'Full Name or Creator / Editor Handle' : 'Brand, App, Podcast or Channel Name'}
                    </label>
                    <input
                      id="waitlist-handle-input"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={role === 'Creator' ? 'e.g. Farouk Clips (@farouk_tn)' : 'e.g. Kamel Gaming / Yalla Delivery'}
                      className="w-full bg-black/40 border border-white/[0.1] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00F59B] font-mono transition duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      WhatsApp Number (for launch alert & onboarding)
                    </label>
                    <input
                      type="text"
                      required
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="+216 20 000 000"
                      className="w-full bg-black/40 border border-white/[0.1] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00F59B] font-mono transition"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        {role === 'Creator' ? 'Primary Format' : 'Campaign Type'}
                      </label>
                      {role === 'Creator' ? (
                        <select
                          value={categoryInterest}
                          onChange={(e) => setCategoryInterest(e.target.value)}
                          className="w-full bg-black/40 border border-white/[0.1] rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-[#00F59B] font-mono transition"
                        >
                          <option>Video Editing & Subtitles</option>
                          <option>UGC & On-Camera Product Reviews</option>
                          <option>App Screen Recording POVs</option>
                          <option>Music & Trending Sound Edits</option>
                          <option>Gaming Stream Highlights</option>
                        </select>
                      ) : (
                        <select
                          value={categoryInterest}
                          onChange={(e) => setCategoryInterest(e.target.value)}
                          className="w-full bg-black/40 border border-white/[0.1] rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-[#00F59B] font-mono transition"
                        >
                          <option>Mobile App / SaaS Promotion</option>
                          <option>E-commerce / Food Delivery UGC</option>
                          <option>Podcast & Interview Clipping</option>
                          <option>Music Track / Sound Launch</option>
                          <option>Live Stream / Gaming Highlights</option>
                        </select>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        {role === 'Creator' ? 'Payout Channel' : 'Target Pilot Budget'}
                      </label>
                      {role === 'Creator' ? (
                        <select
                          value={detailField}
                          onChange={(e) => setDetailField(e.target.value)}
                          className="w-full bg-black/40 border border-white/[0.1] rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-[#00F59B] font-mono transition"
                        >
                          <option>D17 (La Poste Tunisienne)</option>
                          <option>Flouci Wallet</option>
                          <option>Bank RIB / CIB (20 digits)</option>
                        </select>
                      ) : (
                        <select
                          value={detailField}
                          onChange={(e) => setDetailField(e.target.value)}
                          className="w-full bg-black/40 border border-white/[0.1] rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-[#00F59B] font-mono transition"
                        >
                          <option>300 – 800 DT / campaign</option>
                          <option>800 – 2,000 DT / campaign</option>
                          <option>2,000 – 5,000 DT / campaign</option>
                          <option>5,000+ DT / campaign</option>
                        </select>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#00F59B] hover:bg-[#00D680] text-[#052014] font-black text-xs py-4 rounded-xl transition shadow-xl shadow-[#00F59B]/20 flex items-center justify-center gap-2 mt-2"
                  >
                    <span>{submitting ? 'Generating Priority Pass...' : 'Claim Founding Member Pass'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

            {/* Right 5 Columns: Live Updating Holographic Founding Pass Preview */}
            <div className="lg:col-span-5 perspective-1000">
              <div className="hologram-card rounded-3xl border border-white/20 p-6 shadow-2xl space-y-5 text-left bg-gradient-to-br from-[#12141F] to-[#0A0B10]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img src="/klipi-logo.png?v=4" alt="Klipi" className="h-6 w-auto object-contain" />
                    <span className="text-xs font-black tracking-wider text-white font-mono">FOUNDING PASS</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#00F59B] bg-[#00F59B]/10 px-2 py-0.5 rounded border border-[#00F59B]/25">
                    PRIORITY #50
                  </span>
                </div>

                {/* Dynamic Card Member Data */}
                <div className="p-4 rounded-2xl bg-black/50 border border-white/[0.08] space-y-3 font-mono">
                  <div className="text-[10px] text-slate-500 uppercase">MEMBER IDENTITY</div>
                  <div className="text-lg font-bold text-white truncate">
                    {fullName.trim() || '@your_handle'}
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-white/[0.06]">
                    <span className="text-slate-400">ROLE</span>
                    <span className="text-[#00F59B] font-bold">{role.toUpperCase()}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">CHANNEL</span>
                    <span className="text-white font-bold">{detailField.split(' ')[0]}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">CATEGORY</span>
                    <span className="text-white truncate max-w-[140px]">{categoryInterest.split(' ')[0]}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>0% WITHDRAWAL FEE GUARANTEE</span>
                  <span className="text-[#00F59B]">ACTIVE TICKET</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================================
          FAQ ACCORDION
         ===================================================================== */}
      <section id="faq" className="py-16 sm:py-24 border-b border-white/[0.08]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-2 mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Frequently Asked Questions</h2>
            <p className="text-xs text-slate-400">Everything you need to know about the Content Rewards model, escrow, and D17 payouts.</p>
          </div>

          <div className="space-y-3 text-left">
            {FAQ_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#0E1017] border border-white/[0.08] rounded-2xl overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-bold text-white hover:text-[#00F59B] transition"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      openFaq === idx ? 'rotate-180 text-[#00F59B]' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-white/[0.04] pt-3.5">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          FOOTER
         ===================================================================== */}
      <footer className="py-12 bg-[#08090E] text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <a href="#top" className="flex items-center group">
              <img
                src="/klipi-logo.png?v=4"
                alt="Klipi"
                className="h-8 w-auto object-contain opacity-90 hover:opacity-100 transition"
              />
            </a>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="hidden sm:inline text-slate-400 font-mono text-xs">Content Bounty Protocol (Private Beta)</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-slate-400">Creator Escrow Protocol</span>
            <span>© 2026 Klipi. Pre-Launch Validation Phase.</span>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          SLIDE-OVER PILOT BRIEF DRAWER (WITH CATEGORY COVER IMAGE)
         ===================================================================== */}
      {selectedBounty && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#0E1017] h-full border-l border-white/10 shadow-2xl flex flex-col justify-between overflow-y-auto animate-slide-left text-left">
            <div>
              {/* Drawer Hero Banner with Image */}
              <div className="relative h-48 overflow-hidden border-b border-white/[0.08]">
                <img
                  src={selectedBounty.coverImage}
                  alt={selectedBounty.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1017] via-[#0E1017]/75 to-black/40" />

                <div className="relative z-10 h-full p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md border backdrop-blur-md shadow-sm ${selectedBounty.tagBg}`}>
                      {selectedBounty.category} • {selectedBounty.bountyType}
                    </span>
                    <button
                      onClick={() => setSelectedBounty(null)}
                      className="w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-slate-300 hover:text-white transition shadow-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-end justify-between">
                    <span className="text-xs bg-[#08090E]/90 text-[#00F59B] font-black px-3 py-1 rounded-lg border border-[#00F59B]/40 font-mono shadow-lg">
                      {selectedBounty.cpmTnd.toFixed(2)} DT / 1,000 views
                    </span>
                    <span className="text-xs text-white font-mono bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10">
                      Target Cap: {selectedBounty.maxPerClipTnd} DT
                    </span>
                  </div>
                </div>
              </div>

              {/* Drawer Body Content */}
              <div className="p-6 space-y-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#00F59B]/10 border border-[#00F59B]/20 text-[10px] font-bold text-[#00F59B] mb-2 uppercase tracking-wider font-mono">
                    Pilot Launch Campaign
                  </div>
                  <h2 className="text-xl font-black text-white leading-snug">
                    {selectedBounty.title}
                  </h2>
                  <div className="flex items-center gap-2 mt-2">
                    <div className={`w-6 h-6 rounded-md border flex items-center justify-center text-[10px] font-bold ${selectedBounty.avatarBg}`}>
                      {selectedBounty.initials}
                    </div>
                    <span className="text-xs text-white font-bold">{selectedBounty.creator}</span>
                    <span className="text-xs text-slate-400 font-mono">({selectedBounty.handle})</span>
                    <span className="text-xs text-[#00F59B] font-semibold">• {selectedBounty.audience}</span>
                  </div>
                </div>

                {/* Pre-Funded Escrow Guarantee Banner */}
                <div className="bg-[#12141F] border border-white/[0.08] rounded-xl p-3.5 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00F59B]/10 border border-[#00F59B]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Lock className="w-4 h-4 text-[#00F59B]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white">Escrow Guarantee on Launch</h4>
                      <span className="text-[10px] font-bold text-[#00F59B] bg-[#00F59B]/10 px-1.5 py-0.5 rounded font-mono">
                        PLANNED POOL
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                      <strong className="text-white font-mono">{selectedBounty.targetPoolTnd.toLocaleString()} DT</strong> will be pre-deposited by {selectedBounty.creator} upon private beta start.
                    </p>
                  </div>
                </div>

                {/* Brand Assets / Hot Timestamps */}
                <div className="bg-black/40 border border-white/[0.08] rounded-2xl p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-amber-400" /> Hook Segments & Brand Kit
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">Click to copy</span>
                  </div>
                  <div className="space-y-2">
                    {selectedBounty.hotTimestamps.map((ts) => (
                      <div
                        key={ts.time}
                        onClick={() => handleCopyTimestamp(ts.time)}
                        className="bg-white/[0.04] border border-white/[0.06] hover:border-[#00F59B]/30 rounded-xl px-3 py-2 flex items-center justify-between cursor-pointer transition"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="font-mono text-xs font-bold bg-[#00F59B] text-[#052014] px-2 py-0.5 rounded">
                            {ts.time}
                          </span>
                          <span className="text-xs font-medium text-slate-200 truncate">
                            {ts.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[11px] text-[#00F59B] font-bold font-mono">{ts.spike}</span>
                          {copiedTimestamp === ts.time ? (
                            <Check className="w-3.5 h-3.5 text-[#00F59B]" />
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
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-mono">
                    Campaign Brief & Guidelines
                  </h3>
                  <ul className="space-y-2">
                    {selectedBounty.rules.map((rule, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00F59B] shrink-0 mt-0.5" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Payout Simulator */}
                <div className="bg-[#00F59B]/5 border border-[#00F59B]/20 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white font-mono">Projected Launch Earnings</span>
                    <span className="text-base font-black text-[#00F59B] font-mono">
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
                    className="w-full accent-[#00F59B] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                    <span>{estimatedViews.toLocaleString()} views</span>
                    <span>Cap: {selectedBounty.maxPerClipTnd} DT / video</span>
                  </div>
                </div>

                {/* Cashout Rails */}
                <div>
                  <span className="text-[11px] text-slate-400 font-semibold block mb-1.5 font-mono">Direct Cashout Rails</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg text-slate-300 font-mono">
                      D17 (La Poste)
                    </span>
                    <span className="text-[11px] bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg text-slate-300 font-mono">
                      Flouci Wallet
                    </span>
                    <span className="text-[11px] bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg text-slate-300 font-mono">
                      Bank RIB (20-digit)
                    </span>
                  </div>
                </div>

                {/* CTA to Waitlist */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSelectedBounty(null);
                      scrollToSection('waitlist-form');
                    }}
                    className="w-full bg-[#00F59B] hover:bg-[#00D680] text-[#052014] text-xs font-black py-4 rounded-xl transition shadow-xl shadow-[#00F59B]/20 flex items-center justify-center gap-2"
                  >
                    <span>Join Waitlist for This Bounty</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
