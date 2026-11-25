import React, { useState, useEffect, useMemo } from 'react';
import { AppShell } from '@astryxdesign/core/AppShell';
import { TopNav, TopNavHeading, TopNavItem } from '@astryxdesign/core/TopNav';
import { Banner } from '@astryxdesign/core/Banner';
import { Section } from '@astryxdesign/core/Section';
import { VStack } from '@astryxdesign/core/VStack';
import { HStack } from '@astryxdesign/core/HStack';
import { Grid } from '@astryxdesign/core/Grid';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { Text } from '@astryxdesign/core/Text';
import { Badge } from '@astryxdesign/core/Badge';
import { Button } from '@astryxdesign/core/Button';
import { Slider } from '@astryxdesign/core/Slider';
import { ProgressBar } from '@astryxdesign/core/ProgressBar';
import { TextInput } from '@astryxdesign/core/TextInput';
import { Selector } from '@astryxdesign/core/Selector';
import { SegmentedControl, SegmentedControlItem } from '@astryxdesign/core/SegmentedControl';
import { Table, proportional, pixel } from '@astryxdesign/core/Table';
import { Drawer } from '@astryxdesign/core/Drawer';
import { Collapsible } from '@astryxdesign/core/Collapsible';
import { Divider } from '@astryxdesign/core/Divider';
import { FormLayout } from '@astryxdesign/core/FormLayout';
import {
  ArrowRight,
  Check,
  Copy,
  Sun,
  Moon,
  ShieldCheck,
  Sparkles,
  Wallet,
  Scissors,
  Clock,
  Play,
  ExternalLink,
  Search,
  X,
} from 'lucide-react';
import { supabase } from './supabaseClient';

const generateRefCode = (handle) => {
  const clean = handle.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 5) || 'USER';
  const num = Math.floor(1000 + Math.random() * 9000);
  return `KLIPI-${clean.slice(0, 3)}-${String(num).slice(0, 3)}`;
};

const PILOT_BOUNTIES = [
  {
    id: 'bounty-1',
    brand: 'Konnect Pay',
    handle: '@konnect.network',
    category: 'SaaS & Apps',
    title: 'How to accept D17 & Cards in 2 minutes (App POV)',
    cpm: 15.0,
    budgetTotal: 2500,
    budgetRemaining: 1840,
    verifiedViews: '44,000',
    platforms: ['TikTok', 'Reels', 'Shorts'],
    rules: [
      'Show real mobile screen recording of checkout flow in under 15s',
      'Add Darija or French dynamic captions (CapCut style)',
      'Tag @konnect.network and #FintechTunisie',
    ],
    hotTimestamps: [
      { time: '00:02:14', label: 'Instant QR D17 payment confirmation', spike: '+380 saves' },
      { time: '00:05:40', label: 'Freelancer payout walkthrough', spike: '+290 shares' },
    ],
  },
  {
    id: 'bounty-2',
    brand: 'Kamel Gaming',
    handle: '@kamel.kick',
    category: 'Kick & Twitch',
    title: 'Late-Night Kick Valorant & Just Chatting Best Moments',
    cpm: 12.0,
    budgetTotal: 1500,
    budgetRemaining: 1120,
    verifiedViews: '31,500',
    platforms: ['TikTok', 'Reels'],
    rules: [
      'Keep clip between 18s and 45s with high-energy hook in first 2s',
      'Include streamer webcam reaction + subtitle popups',
      'Credit @kamel.kick in caption',
    ],
    hotTimestamps: [
      { time: '01:14:22', label: '1v4 Ace Clutch + Chat Eruption', spike: '+640 msg/min' },
      { time: '02:08:10', label: 'Funny Darija rage moment', spike: '+510 msg/min' },
    ],
  },
  {
    id: 'bounty-3',
    brand: 'Tunisian Founders',
    handle: '@tunisianfounders',
    category: 'Podcasts',
    title: 'Startup Lessons & Unfiltered Founder Stories (Episode 14)',
    cpm: 14.0,
    budgetTotal: 1500,
    budgetRemaining: 1290,
    verifiedViews: '15,000',
    platforms: ['TikTok', 'Shorts', 'Reels'],
    rules: [
      'Focus on actionable advice or bold contrarian quotes',
      'Split-screen or dynamic zoom cuts every 3 seconds',
      'Minimum 720p vertical export (9:16)',
    ],
    hotTimestamps: [
      { time: '00:24:18', label: 'Why bootstrapping in Tunis beats raising too early', spike: '+420 clips' },
      { time: '00:49:05', label: 'First 1,000 DT MRR breakdown', spike: '+315 saves' },
    ],
  },
  {
    id: 'bounty-4',
    brand: 'Yalla Delivery',
    handle: '@yalladelivery.tn',
    category: 'Brands',
    title: 'Midnight Cravings & 20-Minute Delivery Challenge',
    cpm: 10.0,
    budgetTotal: 3000,
    budgetRemaining: 2450,
    verifiedViews: '55,000',
    platforms: ['TikTok', 'Reels'],
    rules: [
      'Film authentic POV unboxing or late-night order reaction',
      'Mention promo code YALLA10 on screen',
      'Natural lighting & genuine audio',
    ],
    hotTimestamps: [
      { time: '00:00:08', label: 'Doorbell ring & hot box reveal', spike: '+720 views/hr' },
    ],
  },
  {
    id: 'bounty-5',
    brand: 'Kafon Audio Drop',
    handle: '@kafon.officiel',
    category: 'Music & Audio',
    title: 'New Summer Track — Trending Dance, Vlog & Car Edits',
    cpm: 18.0,
    budgetTotal: 2000,
    budgetRemaining: 1640,
    verifiedViews: '20,000',
    platforms: ['TikTok', 'Reels'],
    rules: [
      'Use official track snippet starting at 00:42 drop',
      'Works for lifestyle, car edits, street POV, or comedy skits',
      'Minimum 1,000 organic views to qualify for payout',
    ],
    hotTimestamps: [
      { time: '00:00:42', label: 'Main chorus beat drop', spike: '+950 uses' },
    ],
  },
  {
    id: 'bounty-6',
    brand: 'Derby Café Menzah',
    handle: '@derbycafe.tn',
    category: 'Brands',
    title: 'Matchday Atmosphere & Last-Minute Goal Reactions',
    cpm: 11.0,
    budgetTotal: 1000,
    budgetRemaining: 780,
    verifiedViews: '20,000',
    platforms: ['TikTok', 'Reels'],
    rules: [
      'Include Derby Café logo watermark and location tag (Menzah)',
      'Highlight crowd goal celebration or heated fan debate',
      'Upload within 24h of final whistle',
    ],
    hotTimestamps: [
      { time: '01:48:12', label: '90+4 Last-Minute Goal Eruption', spike: '+690 msg/min' },
    ],
  },
];

const CATEGORY_TABS = [
  'All',
  'Kick & Twitch',
  'SaaS & Apps',
  'Podcasts',
  'Music & Audio',
  'Brands',
];

const SAMPLE_WAITLIST_ROWS = [
  { id: 'res-1', handle: '@farouk_clips', role: 'Video Editor', focus: 'Podcasts & Gaming', channel: 'D17 (La Poste)', status: 'Reserved' },
  { id: 'res-2', handle: '@yalladelivery.tn', role: 'Sample Brand', focus: 'Food Delivery App', channel: '3,000 DT Pool', status: 'Sample Brief' },
  { id: 'res-3', handle: '@sarra.edit', role: 'Video Editor', focus: 'Interviews & Tech', channel: 'Flouci Wallet', status: 'Reserved' },
  { id: 'res-4', handle: '@tunisianfounders', role: 'Sample Show', focus: 'Business Podcast', channel: '1,500 DT Pool', status: 'Sample Brief' },
  { id: 'res-5', handle: '@amine_ugc', role: 'UGC Creator', focus: 'Music & App POV', channel: 'Flouci Wallet', status: 'Reserved' },
  { id: 'res-6', handle: '@konnect.network', role: 'Sample SaaS', focus: 'Fintech Payments', channel: '2,500 DT Pool', status: 'Sample Brief' },
];

const FAQ_ITEMS = [
  {
    id: 'faq-1',
    q: 'How does Klipi work compared to Content Rewards?',
    a: 'Just like Content Rewards, brands, apps, podcasts, musicians, and Kick/Twitch streamers launch bounty pools with cash locked in escrow. Video editors and UGC creators post short clips or original videos on TikTok & Reels, and earn automatic payouts in Dinars per 1,000 verified views.',
  },
  {
    id: 'faq-2',
    q: 'What types of content can I create or clip?',
    a: 'Klipi hosts two formats: (1) Clipping Bounties: download pre-flagged timestamps from Kick/Twitch streams or podcasts and edit them into viral short videos. (2) UGC & Audio Bounties: film an app walkthrough, brand POV, or use an artist track.',
  },
  {
    id: 'faq-3',
    q: 'How does the Escrow guarantee protect creators?',
    a: 'Every campaign requires 100% of the bounty budget to be pre-funded in escrow before creators start editing. Funds cannot be pulled mid-campaign. Once your clip clears the 48h anti-bot audit, your TND payout is guaranteed.',
  },
  {
    id: 'faq-4',
    q: 'How and when do I get paid without PayPal?',
    a: 'Withdraw directly to D17 (La Poste Tunisienne), Flouci Wallet, or any 20-digit Tunisian Bank RIB (BIAT, Attijari, BNA, STB) starting from 10 DT. Wave 1 founding creators receive 0.00 DT withdrawal fees.',
  },
  {
    id: 'faq-5',
    q: 'I run a stream, brand, app, or podcast in Tunisia. How do I launch a bounty?',
    a: 'Switch the waitlist form below to "Brand, Streamer, or App", tell us your target budget, and we will match you with vetted Tunisian CapCut and Premiere editors in Wave 1.',
  },
];

export default function KlipiLandingPage({ onNavigate, colorMode, onToggleColorMode }) {
  const [heroViews, setHeroViews] = useState(50000);
  const heroCpmRate = 12.0;

  const [selectedCat, setSelectedCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBounty, setSelectedBounty] = useState(null);
  const [drawerViews, setDrawerViews] = useState(25000);
  const [copiedTimestamp, setCopiedTimestamp] = useState(null);

  // Waitlist form state
  const [role, setRole] = useState('Creator');
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [detailField, setDetailField] = useState('D17 (La Poste Tunisienne)');
  const [categoryInterest, setCategoryInterest] = useState('Video Editing & Subtitles');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedEntry, setSubmittedEntry] = useState(null);
  const [cloudSaved, setCloudSaved] = useState(null);
  const [copiedRef, setCopiedRef] = useState(false);
  const [liveStats, setLiveStats] = useState({ total: 0, clippers: 0, streamers: 0 });

  useEffect(() => {
    supabase.rpc('get_waitlist_stats').then(({ data }) => {
      if (data) setLiveStats(data);
    });
  }, []);

  useEffect(() => {
    if (window.location.hash === '#waitlist' || window.location.hash === '#waitlist-form') {
      setTimeout(() => {
        const el = document.getElementById('waitlist');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 350);
    }
  }, []);

  const handleRoleSwitch = (nextRole) => {
    setRole(nextRole);
    setSubmittedEntry(null);
    setErrorMsg('');
    if (nextRole === 'Creator') {
      setDetailField('D17 (La Poste Tunisienne)');
      setCategoryInterest('Video Editing & Subtitles');
    } else {
      setDetailField('300 – 800 DT / campaign');
      setCategoryInterest('Live Stream / Gaming Highlights');
    }
  };

  const jumpToWaitlist = (targetRole = 'Creator') => {
    handleRoleSwitch(targetRole);
    const el = document.getElementById('waitlist');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        const input = document.getElementById('waitlist-handle-input');
        if (input) input.focus();
      }, 450);
    }
  };

  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();
    if (!fullName.trim() || !contact.trim()) {
      setErrorMsg('Please fill in both your handle and WhatsApp number.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    const refCode = generateRefCode(fullName.trim());
    const refParam = new URLSearchParams(window.location.search).get('ref');

    try {
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
        if (sbError.code === '23505') {
          setErrorMsg('This WhatsApp number or handle is already registered on the waitlist!');
          setSubmitting(false);
          return;
        }
        setCloudSaved(false);
      } else {
        setCloudSaved(true);
        supabase.rpc('get_waitlist_stats').then(({ data }) => {
          if (data) setLiveStats(data);
        });
      }
    } catch {
      setCloudSaved(false);
    }

    setSubmittedEntry({
      role,
      handle: fullName.trim(),
      contact: contact.trim(),
      detail: `${detailField} • ${categoryInterest}`,
      refCode,
    });
    setSubmitting(false);
  };

  const handleCopyRef = (code) => {
    navigator.clipboard?.writeText(`${window.location.origin}?ref=${code}`);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handleCopyTimestamp = (time) => {
    navigator.clipboard?.writeText(time);
    setCopiedTimestamp(time);
    setTimeout(() => setCopiedTimestamp(null), 1800);
  };

  const filteredBounties = useMemo(() => {
    return PILOT_BOUNTIES.filter((b) => {
      const matchesCat = selectedCat === 'All' || b.category === selectedCat;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        b.brand.toLowerCase().includes(q) ||
        b.title.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [selectedCat, searchQuery]);

  const tableColumns = useMemo(
    () => [
      {
        key: 'handle',
        header: 'Creator / Brand',
        width: proportional(1.5, { minWidth: 150 }),
        renderCell: (row) => (
          <VStack gap={0.5}>
            <Text weight="semibold">{row.handle}</Text>
            <Text type="supporting" color="secondary">{row.focus}</Text>
          </VStack>
        ),
      },
      {
        key: 'role',
        header: 'Role',
        width: proportional(1, { minWidth: 110 }),
      },
      {
        key: 'channel',
        header: 'Payout / Escrow',
        width: proportional(1.2, { minWidth: 130 }),
      },
      {
        key: 'status',
        header: 'Status',
        width: pixel(130),
        renderCell: (row) => (
          <Badge
            label={row.status}
            variant={row.status === 'Reserved' ? 'success' : 'info'}
          />
        ),
      },
    ],
    [],
  );

  const logoSrc = colorMode === 'light' ? '/klipi-logo-light.png' : '/klipi-logo.png';

  const topNav = (
    <TopNav
      heading={
        <TopNavHeading
          logo={
            <img
              src={logoSrc}
              alt="Klipi"
              className="h-8 w-auto object-contain"
            />
          }
          headingHref="/"
        />
      }
      centerContent={
        <HStack gap={1}>
          <TopNavItem label="Bounties" href="#pilot-bounties" />
          <TopNavItem label="How It Works" href="#how-it-works" />
          <TopNavItem label="Waitlist" href="#waitlist" />
          <TopNavItem label="FAQ" href="#faq" />
        </HStack>
      }
      endContent={
        <HStack gap={2} vAlign="center">
          <Button
            label={colorMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            isIconOnly
            variant="ghost"
            icon={colorMode === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            onClick={onToggleColorMode}
          />
          <Button
            label="Interactive Demo"
            variant="secondary"
            size="sm"
            icon={<Play className="w-3.5 h-3.5" />}
            onClick={() => onNavigate('/demo')}
          />
          <Button
            label="Join Waitlist"
            variant="primary"
            size="sm"
            endContent={<ArrowRight className="w-3.5 h-3.5" />}
            onClick={() => jumpToWaitlist('Creator')}
          />
        </HStack>
      }
    />
  );

  const banner = (
    <Banner
      status="success"
      container="section"
      title="Wave 1 Founding Cohort Open — 0% Withdrawal Fees for the First 100 Creators & Streamers"
      description="Live escrowed TND bounties paid directly via D17, Flouci, or 20-digit Tunisian Bank RIB."
      endContent={
        <Button
          label="Claim Spot"
          size="sm"
          variant="secondary"
          onClick={() => jumpToWaitlist('Creator')}
        />
      }
    />
  );

  return (
    <AppShell height="auto" topNav={topNav} banner={banner}>
      {/* =====================================================================
          HERO SECTION
         ===================================================================== */}
      <Section variant="section" dividers={['bottom']} paddingBlock={8}>
        <VStack maxWidth={1200} paddingInline={4} gap={6} className="mx-auto">
          <Grid columns={{ minWidth: 340, max: 2 }} gap={8} align="center">
            {/* Hero Pitch */}
            <VStack gap={4} align="start">
              <HStack gap={2} wrap="wrap">
                <Badge label="Tunisia's #1 Content Rewards" variant="success" />
                <Badge
                  label={`${liveStats.total || 0} Live Signups`}
                  variant="neutral"
                />
              </HStack>

              <Heading level={1} type="display-1">
                Clip Kick streams & brand drops. Get paid in Dinars.
              </Heading>

              <Text type="large" color="secondary">
                Tunisian Kick & Twitch streamers, SaaS apps, podcasts, and brands fund pre-escrowed TND bounty pools. Video editors and UGC creators post shorts on TikTok & Reels and cash out per 1,000 verified views via D17, Flouci, or Bank RIB — no PayPal needed.
              </Text>

              <HStack gap={3} wrap="wrap">
                <Button
                  label="Claim Founding Creator Pass"
                  variant="primary"
                  size="lg"
                  endContent={<ArrowRight className="w-4 h-4" />}
                  onClick={() => jumpToWaitlist('Creator')}
                />
                <Button
                  label="Launch a Streamer / Brand Pool"
                  variant="secondary"
                  size="lg"
                  onClick={() => jumpToWaitlist('Brand')}
                />
                <Button
                  label="Open Interactive App (/demo)"
                  variant="ghost"
                  size="lg"
                  icon={<ExternalLink className="w-4 h-4" />}
                  onClick={() => onNavigate('/demo')}
                />
              </HStack>
            </VStack>

            {/* Interactive Earnings Simulator Card */}
            <Card>
              <VStack gap={4} padding={5}>
                <HStack hAlign="between" vAlign="center">
                  <VStack gap={0.5}>
                    <Text type="label" color="accent" weight="bold">
                      LIVE PAYOUT SIMULATOR
                    </Text>
                    <Heading level={3}>Estimate Your Clip Earnings</Heading>
                  </VStack>
                  <Badge label="12 DT / 1K Views" variant="green" />
                </HStack>

                <Divider />

                <VStack gap={2}>
                  <Slider
                    label="Verified TikTok / Reels Views"
                    min={5000}
                    max={250000}
                    step={5000}
                    value={heroViews}
                    onChange={(val) => setHeroViews(Array.isArray(val) ? val[0] : val)}
                    formatValue={(v) => `${v.toLocaleString()} views`}
                    valueDisplay="text"
                  />
                </VStack>

                <Card>
                  <VStack gap={2} padding={4}>
                    <HStack hAlign="between" vAlign="center">
                      <Text type="supporting" color="secondary">
                        Guaranteed Escrow Payout
                      </Text>
                      <Text
                        type="display-3"
                        color="accent"
                        weight="bold"
                        hasTabularNumbers
                      >
                        {((heroViews / 1000) * heroCpmRate).toLocaleString()} DT
                      </Text>
                    </HStack>
                    <ProgressBar
                      label="Pool utilization"
                      isLabelHidden
                      value={Math.min(100, Math.round((heroViews / 250000) * 100))}
                      variant="success"
                    />
                  </VStack>
                </Card>

                <HStack gap={2} wrap="wrap">
                  <Badge label="D17 Instant" variant="success" />
                  <Badge label="Flouci Wallet" variant="info" />
                  <Badge label="20-Digit RIB" variant="neutral" />
                  <Badge label="48h Anti-Bot Audit" variant="neutral" />
                </HStack>
              </VStack>
            </Card>
          </Grid>
        </VStack>
      </Section>

      {/* =====================================================================
          PILOT BOUNTIES CATALOG
         ===================================================================== */}
      <Section id="pilot-bounties" variant="muted" dividers={['bottom']} paddingBlock={8}>
        <VStack maxWidth={1200} paddingInline={4} gap={6} className="mx-auto">
          <HStack hAlign="between" vAlign="end" wrap="wrap" gap={4}>
            <VStack gap={1.5} maxWidth={620}>
              <Badge label="Sample Launch Specifications" variant="info" />
              <Heading level={2} type="display-2">
                Upcoming Pilot Bounties
              </Heading>
              <Text color="secondary">
                Demonstration briefs for Kick streamers, Tunisian SaaS apps, podcasts, music drops, and local brands. Inspect any brief to preview timestamps and rules.
              </Text>
            </VStack>

            <TextInput
              label="Search bounties"
              isLabelHidden
              placeholder="Search brand, streamer, or app..."
              startIcon={<Search className="w-4 h-4" />}
              hasClear
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              width={280}
            />
          </HStack>

          <SegmentedControl
            label="Filter bounty categories"
            value={selectedCat}
            onChange={(val) => setSelectedCat(val)}
          >
            {CATEGORY_TABS.map((cat) => (
              <SegmentedControlItem key={cat} value={cat} label={cat} />
            ))}
          </SegmentedControl>

          <Grid columns={{ minWidth: 320, max: 3 }} gap={4}>
            {filteredBounties.map((bounty) => {
              const pctUsed = Math.round(
                ((bounty.budgetTotal - bounty.budgetRemaining) / bounty.budgetTotal) * 100,
              );
              return (
                <Card key={bounty.id}>
                  <VStack gap={3} padding={4} height="100%" vAlign="between">
                    <VStack gap={2}>
                      <HStack hAlign="between" vAlign="center">
                        <Badge label={bounty.category} variant="neutral" />
                        <Badge label={`${bounty.cpm} DT / 1K`} variant="success" />
                      </HStack>

                      <Heading level={4}>{bounty.brand}</Heading>
                      <Text type="supporting" color="secondary">
                        {bounty.handle}
                      </Text>
                      <Text weight="medium">{bounty.title}</Text>
                    </VStack>

                    <VStack gap={2}>
                      <ProgressBar
                        label="Escrow Remaining"
                        value={100 - pctUsed}
                        hasValueLabel
                        formatValueLabel={() =>
                          `${bounty.budgetRemaining.toLocaleString()} / ${bounty.budgetTotal.toLocaleString()} DT left`
                        }
                        variant="accent"
                      />

                      <HStack hAlign="between" vAlign="center">
                        <Text type="supporting" color="secondary">
                          {bounty.platforms.join(' • ')}
                        </Text>
                        <Button
                          label="Inspect Brief"
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            setSelectedBounty(bounty);
                            setDrawerViews(25000);
                          }}
                        />
                      </HStack>
                    </VStack>
                  </VStack>
                </Card>
              );
            })}
          </Grid>
        </VStack>
      </Section>

      {/* =====================================================================
          HOW IT WORKS + ESCROW ARCHITECTURE
         ===================================================================== */}
      <Section id="how-it-works" variant="section" dividers={['bottom']} paddingBlock={8}>
        <VStack maxWidth={1200} paddingInline={4} gap={6} className="mx-auto">
          <VStack gap={1.5} maxWidth={640}>
            <Badge label="Escrow Protocol" variant="neutral" />
            <Heading level={2} type="display-2">
              Built for Trust on Both Sides
            </Heading>
            <Text color="secondary">
              No unpaid editing gigs. No fake botted views. Every campaign runs through verified escrow and 48-hour engagement audits.
            </Text>
          </VStack>

          <Grid columns={{ minWidth: 280, max: 3 }} gap={4}>
            <Card>
              <VStack gap={2} padding={4}>
                <Scissors className="w-5 h-5" />
                <Heading level={4}>1. Pick a Stream or Brief</Heading>
                <Text color="secondary">
                  Browse funded pools from Kick streamers, podcasts, and SaaS brands. Grab pre-flagged chat-spike timestamps and edit in CapCut or Premiere.
                </Text>
              </VStack>
            </Card>
            <Card>
              <VStack gap={2} padding={4}>
                <ShieldCheck className="w-5 h-5" />
                <Heading level={4}>2. 48h Anti-Bot Verification</Heading>
                <Text color="secondary">
                  Submit your TikTok, Reels, or Shorts URL. Our verification layer checks view velocity, comments, and watch retention to protect creator pools.
                </Text>
              </VStack>
            </Card>
            <Card>
              <VStack gap={2} padding={4}>
                <Wallet className="w-5 h-5" />
                <Heading level={4}>3. Instant TND Cashout</Heading>
                <Text color="secondary">
                  Withdraw verified earnings starting at 10 DT directly to D17 (La Poste), Flouci Wallet, or any 20-digit Tunisian Bank RIB.
                </Text>
              </VStack>
            </Card>
          </Grid>
        </VStack>
      </Section>

      {/* =====================================================================
          FOUNDING COHORT TABLE
         ===================================================================== */}
      <Section variant="muted" dividers={['bottom']} paddingBlock={8}>
        <VStack maxWidth={1200} paddingInline={4} gap={5} className="mx-auto">
          <HStack hAlign="between" vAlign="end" wrap="wrap" gap={4}>
            <VStack gap={1}>
              <Badge label="Transparent Cohort Roster" variant="neutral" />
              <Heading level={2} type="display-3">
                Founding Waitlist & Sample Pilot Briefs
              </Heading>
              <Text color="secondary">
                Sample launch briefs are explicitly tagged alongside founding editor reservations.
              </Text>
            </VStack>
            <Badge
              label={`${liveStats.total || 0} Real Cloud Signups`}
              variant="success"
            />
          </HStack>

          <Card>
            <Table
              data={SAMPLE_WAITLIST_ROWS}
              columns={tableColumns}
              idKey="id"
              density="balanced"
              hasHover
            />
          </Card>
        </VStack>
      </Section>

      {/* =====================================================================
          WAITLIST APPLICATION SECTION (#waitlist)
         ===================================================================== */}
      <Section id="waitlist" variant="section" dividers={['bottom']} paddingBlock={10}>
        <VStack id="waitlist-form" maxWidth={760} paddingInline={4} gap={6} className="mx-auto">
          <VStack gap={2} hAlign="center">
            <Badge label="Wave 1 Founding Cohort" variant="success" icon={<Sparkles className="w-3.5 h-3.5" />} />
            <Heading level={2} type="display-2" justify="center">
              Claim Your Priority Access Pass
            </Heading>
            <Text color="secondary" justify="center">
              First 100 approved creators & streamers receive priority bounty matching and 0.00 DT withdrawal fees.
            </Text>
          </VStack>

          <Card>
            <VStack gap={4} padding={6}>
              {submittedEntry ? (
                <VStack gap={4} hAlign="center">
                  <Badge label="Active Founding Ticket" variant="success" />
                  <Heading level={3} justify="center">
                    You&apos;re On The Founding Roster!
                  </Heading>
                  <Text color="secondary" justify="center">
                    Pass reserved for <Text weight="bold">{submittedEntry.handle}</Text> ({submittedEntry.role}) • {submittedEntry.detail}
                  </Text>

                  {cloudSaved ? (
                    <Badge label="Cloud Database Verified (Supabase)" variant="green" icon={<Check className="w-3.5 h-3.5" />} />
                  ) : (
                    <Badge label="Local Ticket Stored" variant="warning" />
                  )}

                  <Card>
                    <HStack gap={3} padding={3} hAlign="between" vAlign="center">
                      <Text type="code" weight="bold" color="accent">
                        {submittedEntry.refCode}
                      </Text>
                      <Button
                        label={copiedRef ? 'Copied Link' : 'Copy Invite Link'}
                        size="sm"
                        variant="secondary"
                        icon={copiedRef ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        onClick={() => handleCopyRef(submittedEntry.refCode)}
                      />
                    </HStack>
                  </Card>

                  <Button
                    label="Register Another Handle"
                    variant="ghost"
                    size="sm"
                    onClick={() => setSubmittedEntry(null)}
                  />
                </VStack>
              ) : (
                <form onSubmit={handleWaitlistSubmit}>
                  <FormLayout direction="vertical">
                    <SegmentedControl
                      label="Select your role"
                      layout="fill"
                      value={role}
                      onChange={(val) => handleRoleSwitch(val)}
                    >
                      <SegmentedControlItem value="Creator" label="I'm a Creator / Clipper" />
                      <SegmentedControlItem value="Brand" label="I'm a Brand, Streamer, or App" />
                    </SegmentedControl>

                    {errorMsg && (
                      <Banner status="error" title={errorMsg} />
                    )}

                    <TextInput
                      id="waitlist-handle-input"
                      label={role === 'Creator' ? 'Full Name or Creator / Editor Handle' : 'Brand, Streamer, Podcast or App Name'}
                      placeholder={role === 'Creator' ? 'e.g. @farouk_clips' : 'e.g. Kamel Gaming / Konnect'}
                      value={fullName}
                      onChange={(val) => setFullName(val)}
                      isRequired
                    />

                    <TextInput
                      label="WhatsApp Number (for Wave 1 invite & onboarding)"
                      type="tel"
                      inputMode="tel"
                      placeholder="+216 20 000 000"
                      value={contact}
                      onChange={(val) => setContact(val)}
                      isRequired
                    />

                    <Grid columns={{ minWidth: 220, max: 2 }} gap={3}>
                      <Selector
                        label={role === 'Creator' ? 'Primary Format' : 'Campaign Type'}
                        value={categoryInterest}
                        onChange={(val) => setCategoryInterest(val)}
                        options={
                          role === 'Creator'
                            ? [
                                'Video Editing & Subtitles',
                                'UGC & On-Camera Product Reviews',
                                'App Screen Recording POVs',
                                'Music & Trending Sound Edits',
                                'Gaming Stream Highlights',
                              ]
                            : [
                                'Live Stream / Gaming Highlights',
                                'Mobile App / SaaS Promotion',
                                'E-commerce / Food Delivery UGC',
                                'Podcast & Interview Clipping',
                                'Music Track / Sound Launch',
                              ]
                        }
                      />

                      <Selector
                        label={role === 'Creator' ? 'Payout Channel' : 'Target Pilot Budget'}
                        value={detailField}
                        onChange={(val) => setDetailField(val)}
                        options={
                          role === 'Creator'
                            ? [
                                'D17 (La Poste Tunisienne)',
                                'Flouci Wallet',
                                'Bank RIB / CIB (20 digits)',
                              ]
                            : [
                                '300 – 800 DT / campaign',
                                '800 – 2,000 DT / campaign',
                                '2,000 – 5,000 DT / campaign',
                                '5,000+ DT / campaign',
                              ]
                        }
                      />
                    </Grid>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      width="100%"
                      isLoading={submitting}
                      label="Claim Founding Member Pass"
                      endContent={<ArrowRight className="w-4 h-4" />}
                    />
                  </FormLayout>
                </form>
              )}
            </VStack>
          </Card>
        </VStack>
      </Section>

      {/* =====================================================================
          FAQ SECTION
         ===================================================================== */}
      <Section id="faq" variant="muted" dividers={['bottom']} paddingBlock={8}>
        <VStack maxWidth={860} paddingInline={4} gap={5} className="mx-auto">
          <VStack gap={1}>
            <Badge label="FAQ" variant="neutral" />
            <Heading level={2} type="display-3">
              Frequently Asked Questions
            </Heading>
          </VStack>

          <VStack gap={2}>
            {FAQ_ITEMS.map((item, idx) => (
              <Card key={item.id}>
                <Collapsible
                  defaultIsOpen={idx === 0}
                  trigger={
                    <Heading level={5}>{item.q}</Heading>
                  }
                >
                  <VStack paddingBlockStart={2}>
                    <Text color="secondary">{item.a}</Text>
                  </VStack>
                </Collapsible>
              </Card>
            ))}
          </VStack>
        </VStack>
      </Section>

      {/* =====================================================================
          FOOTER
         ===================================================================== */}
      <Section variant="section" paddingBlock={6}>
        <HStack maxWidth={1200} paddingInline={4} hAlign="between" vAlign="center" wrap="wrap" gap={4} className="mx-auto">
          <HStack gap={2} vAlign="center">
            <img src={logoSrc} alt="Klipi" className="h-6 w-auto object-contain" />
            <Text type="supporting" color="secondary">
              klipi.tn • Tunisia&apos;s Content Rewards &amp; Bounty Marketplace
            </Text>
          </HStack>
          <HStack gap={3}>
            <Button
              label="Open Interactive Demo"
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('/demo')}
            />
            <Button
              label="Join Waitlist"
              variant="secondary"
              size="sm"
              onClick={() => jumpToWaitlist('Creator')}
            />
          </HStack>
        </HStack>
      </Section>

      {/* =====================================================================
          BOUNTY BRIEF INSPECTOR DRAWER
         ===================================================================== */}
      <Drawer
        isOpen={Boolean(selectedBounty)}
        onOpenChange={(open) => {
          if (!open) setSelectedBounty(null);
        }}
        label={selectedBounty ? `${selectedBounty.brand} Bounty Brief` : 'Bounty Brief'}
        side="end"
        width={460}
        padding={5}
      >
        {selectedBounty && (
          <VStack gap={4}>
            <HStack hAlign="between" vAlign="center">
              <HStack gap={2} vAlign="center">
                <Badge label={selectedBounty.category} variant="info" />
                <Badge label={`${selectedBounty.cpm} DT / 1K Views`} variant="success" />
              </HStack>
              <Button
                label="Close drawer"
                isIconOnly
                variant="ghost"
                size="sm"
                icon={<X className="w-4 h-4" />}
                onClick={() => setSelectedBounty(null)}
              />
            </HStack>

            <VStack gap={1}>
              <Heading level={3}>{selectedBounty.brand}</Heading>
              <Text type="supporting" color="secondary">
                {selectedBounty.handle} • {selectedBounty.platforms.join(', ')}
              </Text>
              <Text weight="medium">{selectedBounty.title}</Text>
            </VStack>

            <Divider />

            <VStack gap={2}>
              <Text type="label" weight="bold">Campaign Rules</Text>
              {selectedBounty.rules.map((rule, i) => (
                <HStack key={i} gap={2} vAlign="start">
                  <Check className="w-4 h-4 shrink-0 mt-0.5" />
                  <Text type="supporting" color="secondary">{rule}</Text>
                </HStack>
              ))}
            </VStack>

            <VStack gap={2}>
              <Text type="label" weight="bold">Pre-Flagged Timestamps</Text>
              {selectedBounty.hotTimestamps.map((ts, i) => (
                <Card key={i}>
                  <HStack padding={3} hAlign="between" vAlign="center" gap={2}>
                    <VStack gap={0.5}>
                      <HStack gap={1.5} vAlign="center">
                        <Clock className="w-3.5 h-3.5" />
                        <Text type="code" weight="bold">{ts.time}</Text>
                        <Badge label={ts.spike} variant="green" />
                      </HStack>
                      <Text type="supporting" color="secondary">{ts.label}</Text>
                    </VStack>
                    <Button
                      label={copiedTimestamp === ts.time ? 'Copied' : 'Copy'}
                      size="sm"
                      variant="secondary"
                      onClick={() => handleCopyTimestamp(ts.time)}
                    />
                  </HStack>
                </Card>
              ))}
            </VStack>

            <Divider />

            <VStack gap={2}>
              <Slider
                label="Estimate Earnings on This Brief"
                min={5000}
                max={150000}
                step={5000}
                value={drawerViews}
                onChange={(val) => setDrawerViews(Array.isArray(val) ? val[0] : val)}
                formatValue={(v) => `${v.toLocaleString()} views`}
                valueDisplay="text"
              />
              <HStack hAlign="between" vAlign="center">
                <Text color="secondary">Estimated Payout</Text>
                <Text type="large" color="accent" weight="bold" hasTabularNumbers>
                  {((drawerViews / 1000) * selectedBounty.cpm).toLocaleString()} DT
                </Text>
              </HStack>
            </VStack>

            <Button
              label="Apply to Clip This Brief"
              variant="primary"
              size="lg"
              width="100%"
              endContent={<ArrowRight className="w-4 h-4" />}
              onClick={() => {
                setSelectedBounty(null);
                jumpToWaitlist('Creator');
              }}
            />
          </VStack>
        )}
      </Drawer>
    </AppShell>
  );
}
