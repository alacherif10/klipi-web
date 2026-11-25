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
    category: 'تطبيقات SaaS',
    title: 'كيف تقبل D17 والبطاقات في دقيقتين (من منظور التطبيق)',
    cpm: 15.0,
    budgetTotal: 2500,
    budgetRemaining: 1840,
    verifiedViews: '44,000',
    platforms: ['TikTok', 'Reels', 'Shorts'],
    rules: [
      'سجّل شاشة الهاتف الحقيقية لعملية الدفع في أقل من 15 ثانية',
      'أضف تعليقاً ديناميكياً بالدارجة أو الفرنسية (بأسلوب CapCut)',
      'تاغ @konnect.network و#FintechTunisie',
    ],
    hotTimestamps: [
      { time: '00:02:14', label: 'تأكيد دفع QR D17 فوري', spike: '+380 حفظ' },
      { time: '00:05:40', label: 'جولة صرف للمستقل', spike: '+290 مشاركة' },
    ],
  },
  {
    id: 'bounty-2',
    brand: 'Kamel Gaming',
    handle: '@kamel.kick',
    category: 'Kick و Twitch',
    title: 'أفضل لحظات Kick Valorant و Just Chatting في الليل',
    cpm: 12.0,
    budgetTotal: 1500,
    budgetRemaining: 1120,
    verifiedViews: '31,500',
    platforms: ['TikTok', 'Reels'],
    rules: [
      'مدة الكليب بين 18 و45 ثانية مع خطاف عالي الطاقة في أول ثانيتين',
      'أضف كاميرا المذيع + بوب-أب الترجمة',
      'اذكر @kamel.kick في التعليق',
    ],
    hotTimestamps: [
      { time: '01:14:22', label: '1v4 Ace Clutch + انفجار الشات', spike: '+640 رسالة/دقيقة' },
      { time: '02:08:10', label: 'لحظة غضب مضحكة بالدارجة', spike: '+510 رسالة/دقيقة' },
    ],
  },
  {
    id: 'bounty-3',
    brand: 'Tunisian Founders',
    handle: '@tunisianfounders',
    category: 'بودكاست',
    title: 'دروس الستارتاب وقصص المؤسسين بلا فلتر (الحلقة 14)',
    cpm: 14.0,
    budgetTotal: 1500,
    budgetRemaining: 1290,
    verifiedViews: '15,000',
    platforms: ['TikTok', 'Shorts', 'Reels'],
    rules: [
      'ركّز على النصائح العملية أو الاقتباسات الجريئة المثيرة للجدل',
      'قطع تكبير ديناميكية أو شاشة مقسمة كل 3 ثوانٍ',
      'تصدير عمودي 720p على الأقل (9:16)',
    ],
    hotTimestamps: [
      { time: '00:24:18', label: 'لماذا Bootstrap في تونس أفضل من التمويل المبكر', spike: '+420 كليب' },
      { time: '00:49:05', label: 'تحليل أول 1,000 دينار MRR', spike: '+315 حفظ' },
    ],
  },
  {
    id: 'bounty-4',
    brand: 'Yalla Delivery',
    handle: '@yalladelivery.tn',
    category: 'علامات تجارية',
    title: 'رغبات منتصف الليل وتحدي التوصيل في 20 دقيقة',
    cpm: 10.0,
    budgetTotal: 3000,
    budgetRemaining: 2450,
    verifiedViews: '55,000',
    platforms: ['TikTok', 'Reels'],
    rules: [
      'سجّل فتح الطلبية الحقيقية بأسلوب POV أو ردة فعل ليلية',
      'اذكر كود الخصم YALLA10 على الشاشة',
      'إضاءة طبيعية وصوت أصيل',
    ],
    hotTimestamps: [
      { time: '00:00:08', label: 'صوت الجرس وكشف الصندوق الساخن', spike: '+720 مشاهدة/ساعة' },
    ],
  },
  {
    id: 'bounty-5',
    brand: 'Kafon Audio Drop',
    handle: '@kafon.officiel',
    category: 'موسيقى وصوتيات',
    title: 'أغنية الصيف الجديدة — رقص رائج، فلوق وتعديلات سيارة',
    cpm: 18.0,
    budgetTotal: 2000,
    budgetRemaining: 1640,
    verifiedViews: '20,000',
    platforms: ['TikTok', 'Reels'],
    rules: [
      'استخدم مقتطف الأغنية الرسمي ابتداءً من إسقاطة 00:42',
      'تناسب لايف ستايل، تعديلات سيارة، POV الشارع، أو مقاطع كوميدية',
      '1,000 مشاهدة عضوية كحد أدنى للتأهل للمدفوعات',
    ],
    hotTimestamps: [
      { time: '00:00:42', label: 'إسقاطة بيت الجوقة الرئيسي', spike: '+950 استخدام' },
    ],
  },
  {
    id: 'bounty-6',
    brand: 'Derby Café Menzah',
    handle: '@derbycafe.tn',
    category: 'علامات تجارية',
    title: 'أجواء يوم المباراة وردود فعل الأهداف في الدقيقة الأخيرة',
    cpm: 11.0,
    budgetTotal: 1000,
    budgetRemaining: 780,
    verifiedViews: '20,000',
    platforms: ['TikTok', 'Reels'],
    rules: [
      'أضف علامة مياه Derby Café وتاغ الموقع (المنزه)',
      'أبرز احتفال الجمهور بالهدف أو النقاش الحار بين المشجعين',
      'ارفع الفيديو خلال 24 ساعة من صافرة النهاية',
    ],
    hotTimestamps: [
      { time: '01:48:12', label: 'انفجار هدف الدقيقة 90+4', spike: '+690 رسالة/دقيقة' },
    ],
  },
];

const CATEGORY_TABS = [
  'الكل',
  'Kick و Twitch',
  'تطبيقات SaaS',
  'بودكاست',
  'موسيقى وصوتيات',
  'علامات تجارية',
];


const SAMPLE_WAITLIST_ROWS = [
  { id: 'res-1', handle: '@farouk_clips', role: 'مونتير فيديو', focus: 'بودكاست وألعاب', channel: 'D17 (La Poste)', status: 'محجوز' },
  { id: 'res-2', handle: '@yalladelivery.tn', role: 'علامة تجارية نموذجية', focus: 'توصيل الطعام', channel: 'مجمع 3,000 د.ت', status: 'نموذج بونتي' },
  { id: 'res-3', handle: '@sarra.edit', role: 'مونتير فيديو', focus: 'مقابلات وتقنية', channel: 'Flouci Wallet', status: 'محجوز' },
  { id: 'res-4', handle: '@tunisianfounders', role: 'برنامج نموذجي', focus: 'بودكاست أعمال', channel: 'مجمع 1,500 د.ت', status: 'نموذج بونتي' },
  { id: 'res-5', handle: '@amine_ugc', role: 'منشئ UGC', focus: 'موسيقى وتطبيقات POV', channel: 'Flouci Wallet', status: 'محجوز' },
  { id: 'res-6', handle: '@konnect.network', role: 'تطبيق SaaS نموذجي', focus: 'مدفوعات Fintech', channel: 'مجمع 2,500 د.ت', status: 'نموذج بونتي' },
];

const FAQ_ITEMS = [
  {
    id: 'faq-1',
    q: 'كيف يعمل كليبي مقارنة بـ Content Rewards؟',
    a: 'تماماً مثل Content Rewards، تطلق العلامات التجارية والتطبيقات والبودكاست والموسيقيون ومذيعو Kick/Twitch مجمعات بونتي بأموال محجوزة في ضمان (Escrow). يقوم المونتيرون ومنشئو المحتوى بنشر كليبات قصيرة أو مقاطع أصلية على TikTok وReels، ويحصلون على مدفوعات تلقائية بالدينار التونسي لكل 1,000 مشاهدة موثّقة.',
  },
  {
    id: 'faq-2',
    q: 'ما أنواع المحتوى التي يمكنني إنشاؤها أو قصّها؟',
    a: 'يستضيف كليبي تنسيقين: (1) بونتيات القص: نزّل الطوابع الزمنية المحددة مسبقاً من بثوث Kick/Twitch أو البودكاست وعدّلها إلى مقاطع قصيرة رائجة. (2) بونتيات UGC والصوتيات: صوّر جولة في تطبيق، POV علامة تجارية، أو استخدم مقطعاً موسيقياً لفنان.',
  },
  {
    id: 'faq-3',
    q: 'كيف يحمي ضمان Escrow المنشئين؟',
    a: 'تتطلب كل حملة تمويل 100٪ من ميزانية البونتي في الضمان قبل أن يبدأ المنشئون بالتعديل. لا يمكن سحب الأموال في منتصف الحملة. بمجرد اجتياز الكليب لتدقيق 48 ساعة المضادة للبوت، يُضمن صرف الدينار التونسي.',
  },
  {
    id: 'faq-4',
    q: 'كيف ومتى أتقاضى راتبي بدون PayPal؟',
    a: 'اسحب مباشرة إلى D17 (La Poste Tunisienne)، أو Flouci Wallet، أو أي RIB بنكي تونسي من 20 رقماً (BIAT، Attijari، BNA، STB) ابتداءً من 10 د.ت. يحصل منشئو الموجة 1 المؤسسون على 0.00 د.ت رسوم سحب.',
  },
  {
    id: 'faq-5',
    q: 'أنا مذيع أو علامة تجارية أو تطبيق أو بودكاست في تونس. كيف أطلق بونتي؟',
    a: 'بدّل نموذج قائمة الانتظار أدناه إلى "علامة تجارية، مذيع، أو تطبيق"، أخبرنا بميزانيتك المستهدفة، وسنطابقك مع مونتيرين تونسيين محترفين في CapCut وPremiere في الموجة 1.',
  },
];

export default function KlipiLandingPageAr({ onNavigate, colorMode, onToggleColorMode }) {
  const [heroViews, setHeroViews] = useState(50000);
  const heroCpmRate = 12.0;

  const [selectedCat, setSelectedCat] = useState('الكل');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBounty, setSelectedBounty] = useState(null);
  const [drawerViews, setDrawerViews] = useState(25000);
  const [copiedTimestamp, setCopiedTimestamp] = useState(null);

  const [role, setRole] = useState('Creator');
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [detailField, setDetailField] = useState('D17 (La Poste Tunisienne)');
  const [categoryInterest, setCategoryInterest] = useState('مونتاج فيديو وترجمة');
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
      setCategoryInterest('مونتاج فيديو وترجمة');
    } else {
      setDetailField('300 – 800 د.ت / حملة');
      setCategoryInterest('مقاطع بث مباشر / ألعاب');
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
      setErrorMsg('الرجاء ملء اسمك ورقم WhatsApp.');
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
          setErrorMsg('رقم WhatsApp أو الاسم هذا مسجّل بالفعل في قائمة الانتظار!');
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
    navigator.clipboard?.writeText(`${window.location.origin}/ar?ref=${code}`);
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
      const matchesCat = selectedCat === 'الكل' || b.category === selectedCat;
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
        header: 'المنشئ / العلامة',
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
        header: 'الدور',
        width: proportional(1, { minWidth: 110 }),
      },
      {
        key: 'channel',
        header: 'المدفوعات / الضمان',
        width: proportional(1.2, { minWidth: 130 }),
      },
      {
        key: 'status',
        header: 'الحالة',
        width: pixel(130),
        renderCell: (row) => (
          <Badge
            label={row.status}
            variant={row.status === 'محجوز' ? 'success' : 'info'}
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
          headingHref="/ar"
        />
      }
      centerContent={
        <HStack gap={1}>
          <TopNavItem label="البونتيات" href="#pilot-bounties" />
          <TopNavItem label="كيف يعمل" href="#how-it-works" />
          <TopNavItem label="قائمة الانتظار" href="#waitlist" />
          <TopNavItem label="الأسئلة الشائعة" href="#faq" />
        </HStack>
      }
      endContent={
        <HStack gap={2} vAlign="center">
          <Button
            label={colorMode === 'dark' ? 'وضع فاتح' : 'وضع داكن'}
            isIconOnly
            variant="ghost"
            icon={colorMode === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            onClick={onToggleColorMode}
          />
          <Button
            label="English"
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('/')}
          />
          <Button
            label="العرض التجريبي"
            variant="secondary"
            size="sm"
            icon={<Play className="w-3.5 h-3.5" />}
            onClick={() => onNavigate('/demo')}
          />
          <Button
            label="انضم للقائمة"
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
      title="الموجة 1 من المؤسسين مفتوحة — 0٪ رسوم سحب لأول 100 منشئ ومذيع"
      description="بونتيات TND مضمونة بـ Escrow تُدفع مباشرةً عبر D17 أو Flouci أو RIB بنكي تونسي من 20 رقماً."
      endContent={
        <Button
          label="احجز مكانك"
          size="sm"
          variant="secondary"
          onClick={() => jumpToWaitlist('Creator')}
        />
      }
    />
  );

  return (
    <div dir="rtl" style={{ fontFamily: "'Cairo', 'Figtree', sans-serif" }}>
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
                  <Badge label="منصة كليبي #1 في تونس" variant="success" />
                  <Badge
                    label={`${liveStats.total || 0} تسجيل مباشر`}
                    variant="neutral"
                  />
                </HStack>

                <Heading level={1} type="display-1">
                  اقصّ بثوث Kick والعلامات التجارية. اكسب بالدينار التونسي.
                </Heading>

                <Text type="large" color="secondary">
                  مذيعو Kick وTwitch التونسيون، وتطبيقات SaaS، والبودكاست، والعلامات التجارية يموّلون مجمعات بونتي TND مضمونة بـ Escrow. يقوم المونتيرون ومنشئو المحتوى بنشر مقاطع قصيرة على TikTok وReels ويصرفون لكل 1,000 مشاهدة موثّقة عبر D17 أو Flouci أو RIB بنكي — بدون PayPal.
                </Text>

                <HStack gap={3} wrap="wrap">
                  <Button
                    label="احجز تصريح المؤسس المنشئ"
                    variant="primary"
                    size="lg"
                    endContent={<ArrowRight className="w-4 h-4" />}
                    onClick={() => jumpToWaitlist('Creator')}
                  />
                  <Button
                    label="أطلق مجمع مذيع / علامة تجارية"
                    variant="secondary"
                    size="lg"
                    onClick={() => jumpToWaitlist('Brand')}
                  />
                  <Button
                    label="العرض التجريبي التفاعلي (/demo)"
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
                        محاكي الأرباح المباشر
                      </Text>
                      <Heading level={3}>احسب أرباح كليبك</Heading>
                    </VStack>
                    <Badge label="12 د.ت / 1K مشاهدة" variant="green" />
                  </HStack>

                  <Divider />

                  <VStack gap={2}>
                    <Slider
                      label="المشاهدات الموثّقة على TikTok / Reels"
                      min={5000}
                      max={250000}
                      step={5000}
                      value={heroViews}
                      onChange={(val) => setHeroViews(Array.isArray(val) ? val[0] : val)}
                      formatValue={(v) => `${v.toLocaleString()} مشاهدة`}
                      valueDisplay="text"
                    />
                  </VStack>

                  <Card>
                    <VStack gap={2} padding={4}>
                      <HStack hAlign="between" vAlign="center">
                        <Text type="supporting" color="secondary">
                          صرف Escrow المضمون
                        </Text>
                        <Text
                          type="display-3"
                          color="accent"
                          weight="bold"
                          hasTabularNumbers
                        >
                          {((heroViews / 1000) * heroCpmRate).toLocaleString()} د.ت
                        </Text>
                      </HStack>
                      <ProgressBar
                        label="استخدام المجمع"
                        isLabelHidden
                        value={Math.min(100, Math.round((heroViews / 250000) * 100))}
                        variant="success"
                      />
                    </VStack>
                  </Card>

                  <HStack gap={2} wrap="wrap">
                    <Badge label="D17 فوري" variant="success" />
                    <Badge label="Flouci Wallet" variant="info" />
                    <Badge label="RIB من 20 رقماً" variant="neutral" />
                    <Badge label="تدقيق 48 ساعة ضد البوت" variant="neutral" />
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
                <Badge label="مواصفات الإطلاق النموذجية" variant="info" />
                <Heading level={2} type="display-2">
                  بونتيات الإطلاق التجريبي
                </Heading>
                <Text color="secondary">
                  بريفات تجريبية لمذيعي Kick، وتطبيقات SaaS التونسية، والبودكاست، وإصدارات الموسيقى، والعلامات التجارية المحلية. افحص أي بريف للاطلاع على الطوابع الزمنية والقواعد.
                </Text>
              </VStack>

              <TextInput
                label="ابحث في البونتيات"
                isLabelHidden
                placeholder="ابحث عن علامة تجارية، مذيع، أو تطبيق..."
                startIcon={<Search className="w-4 h-4" />}
                hasClear
                value={searchQuery}
                onChange={(val) => setSearchQuery(val)}
                width={280}
              />
            </HStack>

            <SegmentedControl
              label="تصفية فئات البونتي"
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
                          <Badge label={`${bounty.cpm} د.ت / 1K`} variant="success" />
                        </HStack>

                        <Heading level={4}>{bounty.brand}</Heading>
                        <Text type="supporting" color="secondary">
                          {bounty.handle}
                        </Text>
                        <Text weight="medium">{bounty.title}</Text>
                      </VStack>

                      <VStack gap={2}>
                        <ProgressBar
                          label="المتبقي من Escrow"
                          value={100 - pctUsed}
                          hasValueLabel
                          formatValueLabel={() =>
                            `${bounty.budgetRemaining.toLocaleString()} / ${bounty.budgetTotal.toLocaleString()} د.ت متبقٍ`
                          }
                          variant="accent"
                        />

                        <HStack hAlign="between" vAlign="center">
                          <Text type="supporting" color="secondary">
                            {bounty.platforms.join(' • ')}
                          </Text>
                          <Button
                            label="افحص البريف"
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
              <Badge label="بروتوكول Escrow" variant="neutral" />
              <Heading level={2} type="display-2">
                مبني على الثقة من الجانبين
              </Heading>
              <Text color="secondary">
                لا مهام تحرير بدون أجر. لا مشاهدات مزورة بالبوت. كل حملة تمر عبر Escrow موثّق وتدقيق تفاعل 48 ساعة.
              </Text>
            </VStack>

            <Grid columns={{ minWidth: 280, max: 3 }} gap={4}>
              <Card>
                <VStack gap={2} padding={4}>
                  <Scissors className="w-5 h-5" />
                  <Heading level={4}>1. اختر بثاً أو بريفاً</Heading>
                  <Text color="secondary">
                    تصفّح المجمعات الممولة من مذيعي Kick والبودكاست وعلامات SaaS. استحضر الطوابع الزمنية المحددة مسبقاً وعدّلها في CapCut أو Premiere.
                  </Text>
                </VStack>
              </Card>
              <Card>
                <VStack gap={2} padding={4}>
                  <ShieldCheck className="w-5 h-5" />
                  <Heading level={4}>2. تحقق 48 ساعة ضد البوت</Heading>
                  <Text color="secondary">
                    أرسل رابط TikTok أو Reels أو Shorts الخاص بك. تفحص طبقة التحقق لدينا سرعة المشاهدات والتعليقات ومدة المشاهدة لحماية مجمعات المنشئين.
                  </Text>
                </VStack>
              </Card>
              <Card>
                <VStack gap={2} padding={4}>
                  <Wallet className="w-5 h-5" />
                  <Heading level={4}>3. صرف فوري بالدينار التونسي</Heading>
                  <Text color="secondary">
                    اسحب الأرباح الموثّقة ابتداءً من 10 د.ت مباشرةً إلى D17 (La Poste) أو Flouci Wallet أو أي RIB بنكي تونسي من 20 رقماً.
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
                <Badge label="قائمة المؤسسين الشفافة" variant="neutral" />
                <Heading level={2} type="display-3">
                  قائمة انتظار المؤسسين ونماذج البريفات التجريبية
                </Heading>
                <Text color="secondary">
                  البريفات التجريبية مُصنَّفة صراحةً إلى جانب حجوزات المحررين المؤسسين.
                </Text>
              </VStack>
              <Badge
                label={`${liveStats.total || 0} تسجيل سحابي حقيقي`}
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
              <Badge label="الموجة 1 — المؤسسون" variant="success" icon={<Sparkles className="w-3.5 h-3.5" />} />
              <Heading level={2} type="display-2" justify="center">
                احجز تصريح الوصول الأولوي
              </Heading>
              <Text color="secondary" justify="center">
                أول 100 منشئ ومذيع معتمدين يحصلون على أولوية مطابقة البونتي و0.00 د.ت رسوم سحب.
              </Text>
            </VStack>

            <Card>
              <VStack gap={4} padding={6}>
                {submittedEntry ? (
                  <VStack gap={4} hAlign="center">
                    <Badge label="تذكرة المؤسس النشطة" variant="success" />
                    <Heading level={3} justify="center">
                      أنت في قائمة المؤسسين!
                    </Heading>
                    <Text color="secondary" justify="center">
                      تذكرة محجوزة لـ <Text weight="bold">{submittedEntry.handle}</Text> ({submittedEntry.role}) • {submittedEntry.detail}
                    </Text>

                    {cloudSaved ? (
                      <Badge label="موثّق في قاعدة البيانات السحابية (Supabase)" variant="green" icon={<Check className="w-3.5 h-3.5" />} />
                    ) : (
                      <Badge label="تذكرة محفوظة محلياً" variant="warning" />
                    )}

                    <Card>
                      <HStack gap={3} padding={3} hAlign="between" vAlign="center">
                        <Text type="code" weight="bold" color="accent">
                          {submittedEntry.refCode}
                        </Text>
                        <Button
                          label={copiedRef ? 'تم النسخ' : 'نسخ رابط الدعوة'}
                          size="sm"
                          variant="secondary"
                          icon={copiedRef ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          onClick={() => handleCopyRef(submittedEntry.refCode)}
                        />
                      </HStack>
                    </Card>

                    <Button
                      label="تسجيل اسم مستخدم آخر"
                      variant="ghost"
                      size="sm"
                      onClick={() => setSubmittedEntry(null)}
                    />
                  </VStack>
                ) : (
                  <form onSubmit={handleWaitlistSubmit}>
                    <FormLayout direction="vertical">
                      <SegmentedControl
                        label="اختر دورك"
                        layout="fill"
                        value={role}
                        onChange={(val) => handleRoleSwitch(val)}
                      >
                        <SegmentedControlItem value="Creator" label="أنا منشئ / مونتير" />
                        <SegmentedControlItem value="Brand" label="أنا علامة تجارية، مذيع، أو تطبيق" />
                      </SegmentedControl>

                      {errorMsg && (
                        <Banner status="error" title={errorMsg} />
                      )}

                      <TextInput
                        id="waitlist-handle-input"
                        label={role === 'Creator' ? 'الاسم الكامل أو اسم المنشئ / المحرر' : 'اسم العلامة التجارية، المذيع، البودكاست أو التطبيق'}
                        placeholder={role === 'Creator' ? 'مثال: @farouk_clips' : 'مثال: Kamel Gaming / Konnect'}
                        value={fullName}
                        onChange={(val) => setFullName(val)}
                        isRequired
                      />

                      <TextInput
                        label="رقم WhatsApp (للدعوة والإعداد في الموجة 1)"
                        type="tel"
                        inputMode="tel"
                        placeholder="+216 20 000 000"
                        value={contact}
                        onChange={(val) => setContact(val)}
                        isRequired
                      />

                      <Grid columns={{ minWidth: 220, max: 2 }} gap={3}>
                        <Selector
                          label={role === 'Creator' ? 'الشكل الأساسي' : 'نوع الحملة'}
                          value={categoryInterest}
                          onChange={(val) => setCategoryInterest(val)}
                          options={
                            role === 'Creator'
                              ? [
                                  'مونتاج فيديو وترجمة',
                                  'UGC ومراجعات المنتجات أمام الكاميرا',
                                  'تسجيل شاشة تطبيق POV',
                                  'تعديلات موسيقية وأصوات رائجة',
                                  'مقاطع بث الألعاب المباشر',
                                ]
                              : [
                                  'مقاطع بث مباشر / ألعاب',
                                  'ترويج تطبيق موبايل / SaaS',
                                  'UGC تجارة إلكترونية / توصيل طعام',
                                  'قص بودكاست ومقابلات',
                                  'إطلاق مقطع موسيقي / صوتي',
                                ]
                          }
                        />

                        <Selector
                          label={role === 'Creator' ? 'قناة الصرف' : 'الميزانية التجريبية المستهدفة'}
                          value={detailField}
                          onChange={(val) => setDetailField(val)}
                          options={
                            role === 'Creator'
                              ? [
                                  'D17 (La Poste Tunisienne)',
                                  'Flouci Wallet',
                                  'RIB بنكي / CIB (20 رقماً)',
                                ]
                              : [
                                  '300 – 800 د.ت / حملة',
                                  '800 – 2,000 د.ت / حملة',
                                  '2,000 – 5,000 د.ت / حملة',
                                  '+5,000 د.ت / حملة',
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
                        label="احجز تصريح العضو المؤسس"
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
              <Badge label="الأسئلة الشائعة" variant="neutral" />
              <Heading level={2} type="display-3">
                أسئلة مطروحة بكثرة
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
                klipi.tn • سوق Content Rewards والبونتي الأول في تونس
              </Text>
            </HStack>
            <HStack gap={3}>
              <Button
                label="العرض التجريبي التفاعلي"
                variant="ghost"
                size="sm"
                onClick={() => onNavigate('/demo')}
              />
              <Button
                label="English"
                variant="ghost"
                size="sm"
                onClick={() => onNavigate('/')}
              />
              <Button
                label="انضم للقائمة"
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
          label={selectedBounty ? `بريف بونتي ${selectedBounty.brand}` : 'بريف البونتي'}
          side="end"
          width={460}
          padding={5}
        >
          {selectedBounty && (
            <VStack gap={4}>
              <HStack hAlign="between" vAlign="center">
                <HStack gap={2} vAlign="center">
                  <Badge label={selectedBounty.category} variant="info" />
                  <Badge label={`${selectedBounty.cpm} د.ت / 1K مشاهدة`} variant="success" />
                </HStack>
                <Button
                  label="إغلاق"
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
                  {selectedBounty.handle} • {selectedBounty.platforms.join('، ')}
                </Text>
                <Text weight="medium">{selectedBounty.title}</Text>
              </VStack>

              <Divider />

              <VStack gap={2}>
                <Text type="label" weight="bold">قواعد الحملة</Text>
                {selectedBounty.rules.map((rule, i) => (
                  <HStack key={i} gap={2} vAlign="start">
                    <Check className="w-4 h-4 shrink-0 mt-0.5" />
                    <Text type="supporting" color="secondary">{rule}</Text>
                  </HStack>
                ))}
              </VStack>

              <VStack gap={2}>
                <Text type="label" weight="bold">الطوابع الزمنية المحددة مسبقاً</Text>
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
                        label={copiedTimestamp === ts.time ? 'تم النسخ' : 'نسخ'}
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
                  label="احسب الأرباح على هذا البريف"
                  min={5000}
                  max={150000}
                  step={5000}
                  value={drawerViews}
                  onChange={(val) => setDrawerViews(Array.isArray(val) ? val[0] : val)}
                  formatValue={(v) => `${v.toLocaleString()} مشاهدة`}
                  valueDisplay="text"
                />
                <HStack hAlign="between" vAlign="center">
                  <Text color="secondary">الصرف المتوقع</Text>
                  <Text type="large" color="accent" weight="bold" hasTabularNumbers>
                    {((drawerViews / 1000) * selectedBounty.cpm).toLocaleString()} د.ت
                  </Text>
                </HStack>
              </VStack>

              <Button
                label="تقدّم لقص هذا البريف"
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
    </div>
  );
}
