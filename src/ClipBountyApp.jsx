import React, { useState, useMemo, useCallback } from 'react';
import { AppShell } from '@astryxdesign/core/AppShell';
import { TopNav, TopNavHeading } from '@astryxdesign/core/TopNav';
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
import { ProgressBar } from '@astryxdesign/core/ProgressBar';
import { TextInput } from '@astryxdesign/core/TextInput';
import { Selector } from '@astryxdesign/core/Selector';
import { SegmentedControl, SegmentedControlItem } from '@astryxdesign/core/SegmentedControl';
import { Table, proportional, pixel } from '@astryxdesign/core/Table';
import { Drawer } from '@astryxdesign/core/Drawer';
import { Dialog } from '@astryxdesign/core/Dialog';
import { Divider } from '@astryxdesign/core/Divider';
import { FormLayout } from '@astryxdesign/core/FormLayout';
import {
  ArrowLeft,
  Check,
  Copy,
  Sun,
  Moon,
  Wallet,
  Search,
  Clock,
  Plus,
  Send,
  X,
} from 'lucide-react';

const INITIAL_CAMPAIGNS = [
  {
    id: 'camp-1',
    creator: 'Kamel Gaming',
    handle: '@kamel.kick',
    category: 'Kick & Twitch',
    title: 'Late-Night Valorant Immortal Clutches & Rage',
    cpm: 12.0,
    budgetTotal: 1500,
    budgetRemaining: 1120,
    platforms: ['TikTok', 'Reels'],
    vodTimestamps: [
      { time: '01:14:22', label: '1v4 Ace Clutch + Chat Eruption', spike: '+640 msg/min' },
      { time: '02:08:10', label: 'Funny Darija rage moment', spike: '+510 msg/min' },
    ],
  },
  {
    id: 'camp-2',
    creator: 'Konnect Pay',
    handle: '@konnect.network',
    category: 'SaaS & Apps',
    title: 'Accept D17 & Cards in 2 Minutes (App POV)',
    cpm: 15.0,
    budgetTotal: 2500,
    budgetRemaining: 1840,
    platforms: ['TikTok', 'Reels', 'Shorts'],
    vodTimestamps: [
      { time: '00:02:14', label: 'Instant QR D17 payment confirmation', spike: '+380 saves' },
      { time: '00:05:40', label: 'Freelancer payout walkthrough', spike: '+290 shares' },
    ],
  },
  {
    id: 'camp-3',
    creator: 'Tunisian Founders',
    handle: '@tunisianfounders',
    category: 'Podcasts',
    title: 'Startup Lessons & Unfiltered Founder Stories',
    cpm: 14.0,
    budgetTotal: 1500,
    budgetRemaining: 1290,
    platforms: ['TikTok', 'Shorts'],
    vodTimestamps: [
      { time: '00:24:18', label: 'Bootstrapping in Tunis vs raising early', spike: '+420 clips' },
    ],
  },
];

const INITIAL_SUBMISSIONS = [
  {
    id: 'sub-1',
    clipper: '@farouk_clips',
    campaign: 'Late-Night Valorant Immortal Clutches',
    url: 'https://tiktok.com/@farouk_clips/video/741920',
    views: 18400,
    payout: 220.8,
    fraudScore: 'Clean (98%)',
    status: 'Pending',
  },
  {
    id: 'sub-2',
    clipper: '@sarra.edit',
    campaign: 'Accept D17 & Cards in 2 Minutes',
    url: 'https://instagram.com/reel/C9xK21',
    views: 12000,
    payout: 180.0,
    fraudScore: 'Clean (99%)',
    status: 'Approved',
  },
  {
    id: 'sub-3',
    clipper: '@bot_test_tn',
    campaign: 'Late-Night Valorant Immortal Clutches',
    url: 'https://tiktok.com/@bot_test_tn/video/1102',
    views: 42000,
    payout: 0,
    fraudScore: 'Flagged Spike',
    status: 'Pending',
  },
];

export default function ClipBountyApp({ onNavigate, colorMode, onToggleColorMode }) {
  const [workspaceMode, setWorkspaceMode] = useState('clipper');
  const [campaigns, setCampaigns] = useState(INITIAL_CAMPAIGNS);
  const [submissions, setSubmissions] = useState(INITIAL_SUBMISSIONS);
  const [walletTnd, setWalletTnd] = useState(180.0);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [clipUrl, setClipUrl] = useState('');
  const [clipSubmitMsg, setClipSubmitMsg] = useState('');
  const [copiedTime, setCopiedTime] = useState(null);

  // Cashout Dialog state
  const [cashoutOpen, setCashoutOpen] = useState(false);
  const [cashoutMethod, setCashoutMethod] = useState('D17 (La Poste Tunisienne)');
  const [cashoutDest, setCashoutDest] = useState('');
  const [cashoutAmount, setCashoutAmount] = useState('100');
  const [cashoutDone, setCashoutDone] = useState(false);

  // Launch new bounty state (Streamer Studio)
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Kick & Twitch');
  const [newCpm, setNewCpm] = useState('12');
  const [newBudget, setNewBudget] = useState('500');

  const filteredCampaigns = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return campaigns.filter(
      (c) =>
        !q ||
        c.creator.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q),
    );
  }, [campaigns, searchQuery]);

  const handleSubmissionDecision = useCallback((id, decision) => {
    setSubmissions((prev) => {
      const target = prev.find((s) => s.id === id);
      if (decision === 'Approved' && target && target.payout > 0) {
        setWalletTnd((w) => Number((w + target.payout).toFixed(2)));
      }
      return prev.map((s) => (s.id === id ? { ...s, status: decision } : s));
    });
  }, []);

  const handleSubmitClip = (e) => {
    e.preventDefault();
    if (!clipUrl.trim() || !selectedCampaign) return;
    const newSub = {
      id: `sub-${Date.now()}`,
      clipper: '@you_demo',
      campaign: selectedCampaign.title,
      url: clipUrl.trim(),
      views: 1500,
      payout: Number((1.5 * selectedCampaign.cpm).toFixed(2)),
      fraudScore: 'Auditing (48h)',
      status: 'Pending',
    };
    setSubmissions((prev) => [newSub, ...prev]);
    setClipUrl('');
    setClipSubmitMsg('Clip queued for 48h anti-bot audit! Switch to Streamer Studio to approve it.');
  };

  const handleCreateCampaign = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const budgetNum = Math.max(100, Number(newBudget) || 500);
    const cpmNum = Math.max(5, Number(newCpm) || 12);
    setCampaigns((prev) => [
      {
        id: `camp-${Date.now()}`,
        creator: 'Your Channel',
        handle: '@your_channel',
        category: newCategory,
        title: newTitle.trim(),
        cpm: cpmNum,
        budgetTotal: budgetNum,
        budgetRemaining: budgetNum,
        platforms: ['TikTok', 'Reels'],
        vodTimestamps: [{ time: '00:12:40', label: 'Highlight marker', spike: 'Live' }],
      },
      ...prev,
    ]);
    setNewTitle('');
  };

  const handleCashoutSubmit = (e) => {
    e.preventDefault();
    const amt = Number(cashoutAmount) || 0;
    if (amt < 10 || amt > walletTnd) return;
    setWalletTnd((w) => Number((w - amt).toFixed(2)));
    setCashoutDone(true);
  };

  const submissionColumns = useMemo(
    () => [
      {
        key: 'clipper',
        header: 'Editor & Clip',
        width: proportional(1.8, { minWidth: 180 }),
        renderCell: (row) => (
          <VStack gap={0.5}>
            <Text weight="semibold">{row.clipper}</Text>
            <Text type="supporting" color="secondary">{row.campaign}</Text>
          </VStack>
        ),
      },
      {
        key: 'views',
        header: 'Views',
        width: pixel(100),
        renderCell: (row) => (
          <Text hasTabularNumbers>{row.views.toLocaleString()}</Text>
        ),
      },
      {
        key: 'fraudScore',
        header: 'Audit',
        width: pixel(120),
        renderCell: (row) => (
          <Badge
            label={row.fraudScore}
            variant={row.fraudScore.includes('Flagged') ? 'error' : 'info'}
          />
        ),
      },
      {
        key: 'status',
        header: 'Decision',
        width: pixel(190),
        renderCell: (row) =>
          row.status === 'Pending' ? (
            <HStack gap={1.5}>
              <Button
                label="Approve"
                size="sm"
                variant="primary"
                onClick={() => handleSubmissionDecision(row.id, 'Approved')}
              />
              <Button
                label="Reject"
                size="sm"
                variant="destructive"
                onClick={() => handleSubmissionDecision(row.id, 'Rejected')}
              />
            </HStack>
          ) : (
            <Badge
              label={row.status}
              variant={row.status === 'Approved' ? 'success' : 'neutral'}
            />
          ),
      },
    ],
    [handleSubmissionDecision],
  );

  const topNav = (
    <TopNav
      heading={
        <TopNavHeading
          logo={
            <img
              src="/klipi-logo.png"
              alt="Klipi"
              className="h-8 w-auto object-contain"
            />
          }
          subheading="Sandbox"
          headingHref="/"
        />
      }
      centerContent={
        <SegmentedControl
          label="Switch workspace mode"
          value={workspaceMode}
          onChange={(val) => setWorkspaceMode(val)}
        >
          <SegmentedControlItem value="clipper" label="Clipper Marketplace" />
          <SegmentedControlItem value="streamer" label="Streamer / Brand Studio" />
        </SegmentedControl>
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
            label={`${walletTnd.toFixed(2)} DT`}
            variant="secondary"
            size="sm"
            icon={<Wallet className="w-4 h-4" />}
            onClick={() => {
              setCashoutDone(false);
              setCashoutOpen(true);
            }}
          />
          <Button
            label="Back to Landing"
            variant="ghost"
            size="sm"
            icon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => onNavigate('/')}
          />
        </HStack>
      }
    />
  );

  return (
    <AppShell
      height="auto"
      topNav={topNav}
      banner={
        <Banner
          status="info"
          container="section"
          title="Interactive Prototype Mode — Simulated Escrow & Payouts"
          description="Submit a test clip in Clipper Marketplace, then switch to Streamer Studio to approve it and watch your D17 wallet balance update."
        />
      }
    >
      <Section variant="section" paddingBlock={6}>
        <VStack maxWidth={1200} paddingInline={4} gap={6} className="mx-auto">
          {workspaceMode === 'clipper' ? (
            <>
              <HStack hAlign="between" vAlign="end" wrap="wrap" gap={4}>
                <VStack gap={1}>
                  <Badge label="Clipper Workspace" variant="success" />
                  <Heading level={2} type="display-3">
                    Active Escrowed Bounties
                  </Heading>
                  <Text color="secondary">
                    Pick a stream or brief, grab pre-flagged timestamps, and submit your TikTok/Reels link.
                  </Text>
                </VStack>

                <TextInput
                  label="Search campaigns"
                  isLabelHidden
                  placeholder="Search campaigns..."
                  startIcon={<Search className="w-4 h-4" />}
                  hasClear
                  value={searchQuery}
                  onChange={(val) => setSearchQuery(val)}
                  width={260}
                />
              </HStack>

              <Grid columns={{ minWidth: 320, max: 3 }} gap={4}>
                {filteredCampaigns.map((camp) => {
                  const pctLeft = Math.round((camp.budgetRemaining / camp.budgetTotal) * 100);
                  return (
                    <Card key={camp.id}>
                      <VStack gap={3} padding={4} height="100%" vAlign="between">
                        <VStack gap={2}>
                          <HStack hAlign="between" vAlign="center">
                            <Badge label={camp.category} variant="neutral" />
                            <Badge label={`${camp.cpm} DT / 1K`} variant="success" />
                          </HStack>
                          <Heading level={4}>{camp.creator}</Heading>
                          <Text type="supporting" color="secondary">{camp.handle}</Text>
                          <Text weight="medium">{camp.title}</Text>
                        </VStack>

                        <VStack gap={2}>
                          <ProgressBar
                            label="Pool left"
                            value={pctLeft}
                            hasValueLabel
                            formatValueLabel={() =>
                              `${camp.budgetRemaining} / ${camp.budgetTotal} DT`
                            }
                            variant="accent"
                          />
                          <Button
                            label="Open Brief & Submit Clip"
                            variant="primary"
                            width="100%"
                            onClick={() => {
                              setSelectedCampaign(camp);
                              setClipSubmitMsg('');
                            }}
                          />
                        </VStack>
                      </VStack>
                    </Card>
                  );
                })}
              </Grid>
            </>
          ) : (
            <Grid columns={{ minWidth: 340, max: 2 }} gap={6} align="start">
              {/* Pending Submissions Table */}
              <VStack gap={3}>
                <VStack gap={1}>
                  <Badge label="Anti-Fraud Review Queue" variant="info" />
                  <Heading level={3}>Clip Submissions</Heading>
                  <Text color="secondary">
                    Approve authentic clips to release TND from escrow. Reject flagged view-bot spikes.
                  </Text>
                </VStack>

                <Card>
                  <Table
                    data={submissions}
                    columns={submissionColumns}
                    idKey="id"
                    density="balanced"
                    hasHover
                  />
                </Card>
              </VStack>

              {/* Launch New Bounty Form */}
              <Card>
                <VStack gap={4} padding={5}>
                  <VStack gap={1}>
                    <Heading level={3}>Launch New Bounty</Heading>
                    <Text color="secondary">
                      Lock TND in escrow and let Tunisian clippers distribute your stream or app.
                    </Text>
                  </VStack>

                  <form onSubmit={handleCreateCampaign}>
                    <FormLayout direction="vertical">
                      <TextInput
                        label="Campaign Title"
                        placeholder="e.g. Kick Night Stream Best Moments"
                        value={newTitle}
                        onChange={(val) => setNewTitle(val)}
                        isRequired
                      />

                      <Selector
                        label="Category"
                        value={newCategory}
                        onChange={(val) => setNewCategory(val)}
                        options={[
                          'Kick & Twitch',
                          'SaaS & Apps',
                          'Podcasts',
                          'Music & Audio',
                          'Brands',
                        ]}
                      />

                      <Grid columns={{ minWidth: 140, max: 2 }} gap={3}>
                        <TextInput
                          label="Rate (DT / 1K Views)"
                          type="text"
                          inputMode="numeric"
                          value={newCpm}
                          onChange={(val) => setNewCpm(val)}
                        />
                        <TextInput
                          label="Escrow Pool (DT)"
                          type="text"
                          inputMode="numeric"
                          value={newBudget}
                          onChange={(val) => setNewBudget(val)}
                        />
                      </Grid>

                      <Button
                        type="submit"
                        label="Fund Escrow & Launch Bounty"
                        variant="primary"
                        width="100%"
                        icon={<Plus className="w-4 h-4" />}
                      />
                    </FormLayout>
                  </form>
                </VStack>
              </Card>
            </Grid>
          )}
        </VStack>
      </Section>

      {/* =====================================================================
          CLIP SUBMISSION & TIMESTAMPS DRAWER
         ===================================================================== */}
      <Drawer
        isOpen={Boolean(selectedCampaign)}
        onOpenChange={(open) => {
          if (!open) setSelectedCampaign(null);
        }}
        label={selectedCampaign ? selectedCampaign.creator : 'Campaign'}
        side="end"
        width={460}
        padding={5}
      >
        {selectedCampaign && (
          <VStack gap={4}>
            <HStack hAlign="between" vAlign="center">
              <HStack gap={2} vAlign="center">
                <Badge label={selectedCampaign.category} variant="info" />
                <Badge label={`${selectedCampaign.cpm} DT / 1K`} variant="success" />
              </HStack>
              <Button
                label="Close drawer"
                isIconOnly
                variant="ghost"
                size="sm"
                icon={<X className="w-4 h-4" />}
                onClick={() => setSelectedCampaign(null)}
              />
            </HStack>

            <VStack gap={1}>
              <Heading level={3}>{selectedCampaign.creator}</Heading>
              <Text weight="medium">{selectedCampaign.title}</Text>
            </VStack>

            <Divider />

            <VStack gap={2}>
              <Text type="label" weight="bold">VOD Chat-Spike Timestamps</Text>
              {selectedCampaign.vodTimestamps.map((ts, i) => (
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
                      label={copiedTime === ts.time ? 'Copied' : 'Copy'}
                      size="sm"
                      variant="secondary"
                      icon={copiedTime === ts.time ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      onClick={() => {
                        navigator.clipboard?.writeText(ts.time);
                        setCopiedTime(ts.time);
                        setTimeout(() => setCopiedTime(null), 1500);
                      }}
                    />
                  </HStack>
                </Card>
              ))}
            </VStack>

            <Divider />

            <form onSubmit={handleSubmitClip}>
              <FormLayout direction="vertical">
                <TextInput
                  label="Paste Your TikTok / Reels Link"
                  placeholder="https://www.tiktok.com/@you/video/..."
                  value={clipUrl}
                  onChange={(val) => setClipUrl(val)}
                  isRequired
                />
                {clipSubmitMsg && (
                  <Banner status="success" title={clipSubmitMsg} />
                )}
                <Button
                  type="submit"
                  label="Submit Clip for 48h Audit"
                  variant="primary"
                  width="100%"
                  icon={<Send className="w-4 h-4" />}
                />
              </FormLayout>
            </form>
          </VStack>
        )}
      </Drawer>

      {/* =====================================================================
          TND CASHOUT DIALOG (D17 / FLOUCI / RIB)
         ===================================================================== */}
      <Dialog
        isOpen={cashoutOpen}
        onOpenChange={(open) => setCashoutOpen(open)}
        width={440}
        padding={5}
        purpose="form"
      >
        <VStack gap={4}>
          <HStack hAlign="between" vAlign="center">
            <Heading level={3}>Withdraw TND Earnings</Heading>
            <Badge label={`${walletTnd.toFixed(2)} DT Available`} variant="success" />
          </HStack>

          {cashoutDone ? (
            <VStack gap={3}>
              <Banner
                status="success"
                title="Payout Sent!"
                description={`Your withdrawal via ${cashoutMethod} has been queued with 0.00 DT Founding Fee.`}
              />
              <Button
                label="Close"
                variant="primary"
                width="100%"
                onClick={() => setCashoutOpen(false)}
              />
            </VStack>
          ) : (
            <form onSubmit={handleCashoutSubmit}>
              <FormLayout direction="vertical">
                <Selector
                  label="Payout Rail"
                  value={cashoutMethod}
                  onChange={(val) => setCashoutMethod(val)}
                  options={[
                    'D17 (La Poste Tunisienne)',
                    'Flouci Wallet',
                    'Bank RIB / CIB (20 digits)',
                  ]}
                />
                <TextInput
                  label={
                    cashoutMethod.includes('RIB')
                      ? '20-Digit Tunisian RIB'
                      : `${cashoutMethod} Phone Number`
                  }
                  placeholder={cashoutMethod.includes('RIB') ? '08 000 000...' : '+216 20 000 000'}
                  value={cashoutDest}
                  onChange={(val) => setCashoutDest(val)}
                  isRequired
                />
                <TextInput
                  label="Amount (DT)"
                  type="text"
                  inputMode="decimal"
                  value={cashoutAmount}
                  onChange={(val) => setCashoutAmount(val)}
                  isRequired
                />
                <HStack gap={2} hAlign="end">
                  <Button
                    label="Cancel"
                    variant="ghost"
                    onClick={() => setCashoutOpen(false)}
                  />
                  <Button
                    type="submit"
                    label={`Confirm ${cashoutAmount || 0} DT Payout`}
                    variant="primary"
                  />
                </HStack>
              </FormLayout>
            </form>
          )}
        </VStack>
      </Dialog>
    </AppShell>
  );
}
