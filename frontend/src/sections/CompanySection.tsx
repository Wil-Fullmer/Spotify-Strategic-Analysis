import React, { useEffect, useRef, useState } from 'react'
import GlassCard from '../components/GlassCard'

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.01 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, vis }
}

const milestones = [
  { year: '2006', text: 'Founded in Stockholm by Daniel Ek & Martin Lorentzon as a response to rampant music piracy.' },
  { year: '2008', text: 'Launched in Europe with a freemium model, combining free ad-supported listening with paid subscriptions, establishing Spotify\'s core growth strategy.' },
  { year: '2011', text: 'Expanded into the U.S. market, significantly accelerating global growth and industry influence.' },
  { year: '2014', text: 'Acquired Echo Nest, a music intelligence company, laying the foundation for personalization.' },
  { year: '2018', text: 'Direct listing on NYSE at a $26.5B valuation. First major tech company to skip a traditional IPO.' },
  { year: '2019', text: 'Strategic expansion into podcasting through major acquisitions (Gimlet, Anchor, Parcast), aiming to diversify revenue beyond music.' },
  { year: '2023', text: 'Shifted from a "growth-at-all-costs" strategy to operational efficiency, including workforce reductions and cost restructuring.' },
  { year: '2025', text: 'Achieved first full year of sustained profitability, generating over €17B in revenue and reaching 751M users, marking a turning point toward scalable profitability.' },
]

const businessCards = [
  {
    icon: '📈',
    title: 'Growth Engine',
    body1: "Spotify's freemium model serves as a powerful growth engine, allowing the company to attract hundreds of millions of users through its free ad-supported tier. This strategy lowers barriers to entry and fuels global adoption, with free users forming a large conversion funnel into premium subscribers.",
    body2: 'This model has enabled Spotify to scale to over 751 million users worldwide, establishing its dominance in the streaming market.',
  },
  {
    icon: '💰',
    title: 'Revenue Model',
    body1: 'Spotify generates the majority of its revenue through premium subscriptions, which account for nearly 89% of total revenue. With approximately 290 million subscribers and an average monthly ARPU of €4.63, premium is the company\'s primary source of monetization.',
    body2: 'However, high royalty and licensing costs significantly limit profit margins, making it difficult for Spotify to fully capitalize on its scale.',
  },
  {
    icon: '🏆',
    title: 'Competitive Advantage',
    body1: "Spotify's competitive advantage lies in its data-driven personalization and two-sided platform. By connecting listeners with creators, Spotify creates strong network effects, more users attract more content, and more content attracts more users.",
    body2: 'Its use of AI-powered recommendations, such as Discover Weekly, enhances user engagement and differentiates Spotify from competitors in an increasingly crowded market.',
  },
  {
    icon: '⚖️',
    title: 'Strategic Tension',
    body1: 'Despite its massive global scale, Spotify faces a key tension between growth and profitability. While the platform continues to expand its user base and content offerings, high licensing costs and competitive pressure limit its ability to generate strong margins.',
    body2: "This tension between scale and profitability defines Spotify's current strategic challenge.",
  },
]

const missionCards = [
  {
    icon: '🎯',
    title: 'Mission',
    body: 'To unlock the potential of human creativity by giving millions of artists the opportunity to live off their work and billions of fans the ability to enjoy and be inspired by it.',
  },
  {
    icon: '🌍',
    title: 'Vision',
    body: "To become the world's leading audio platform, expanding beyond music into podcasts, audiobooks, and personalized content powered by data and AI.",
  },
  {
    icon: '🤝',
    title: 'Culture',
    body: 'Spotify operates with a "Band" mindset, emphasizing collaboration, creativity, and autonomy. Teams are empowered to innovate quickly while staying aligned with a shared purpose.',
  },
  {
    icon: '💡',
    title: 'Core Values',
    values: ['Innovation', 'Collaboration', 'Passion', 'Sincerity', 'Playfulness'],
  },
]

function HoverCard({ isHovered, onEnter, onLeave, icon, title, children }: {
  isHovered: boolean
  onEnter: () => void
  onLeave: () => void
  icon: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        padding: '28px 24px',
        borderRadius: 12,
        background: isHovered
          ? 'linear-gradient(180deg, rgba(29,185,84,0.12) 0%, rgba(29,185,84,0.03) 100%)'
          : 'linear-gradient(180deg, rgba(29,185,84,0.05) 0%, transparent 60%)',
        backdropFilter: 'blur(12px)',
        border: isHovered ? '1px solid rgba(29,185,84,0.4)' : '1px solid rgba(255,255,255,0.06)',
        borderTopWidth: 2,
        borderTopColor: isHovered ? '#1db954' : 'rgba(29,185,84,0.4)',
        boxShadow: isHovered ? '0 8px 32px rgba(29,185,84,0.15)' : 'none',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.25s ease',
        cursor: 'default',
      }}
    >
      <div style={{
        fontSize: '1.8rem',
        marginBottom: 12,
        transform: isHovered ? 'scale(1.2)' : 'scale(1)',
        transition: 'transform 0.25s ease',
        display: 'inline-block',
      }}>
        {icon}
      </div>
      <h3 style={{
        margin: '0 0 10px',
        fontSize: '0.95rem',
        fontWeight: 700,
        color: isHovered ? 'var(--accent)' : 'var(--text)',
        letterSpacing: '-0.02em',
        transition: 'color 0.25s ease',
      }}>
        {title}
      </h3>
      {children}
    </div>
  )
}

function BusinessCards() {
  const [hovered, setHovered] = useState<number | null>(null)
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
      {businessCards.map((c, i) => (
        <HoverCard key={c.title} isHovered={hovered === i} onEnter={() => setHovered(i)} onLeave={() => setHovered(null)} icon={c.icon} title={c.title}>
          <p style={{ margin: '0 0 10px', fontSize: '0.82rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>{c.body1}</p>
          <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>{c.body2}</p>
        </HoverCard>
      ))}
    </div>
  )
}

function MissionCards() {
  const [hovered, setHovered] = useState<number | null>(null)
  return (
    <div style={{ margin: '32px 0' }}>
      <h2 style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)', margin: '0 0 20px' }}>
        Mission, Vision & Culture
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {missionCards.map((c, i) => (
          <HoverCard key={c.title} isHovered={hovered === i} onEnter={() => setHovered(i)} onLeave={() => setHovered(null)} icon={c.icon} title={c.title}>
            {c.body && <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-dim)', lineHeight: 1.7 }}>{c.body}</p>}
            {c.values && (
              <ul className="values-list">
                {c.values.map(v => <li key={v}>{v}</li>)}
              </ul>
            )}
          </HoverCard>
        ))}
      </div>
    </div>
  )
}

function RevenueSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [animated, setAnimated] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [hoveredBar, setHoveredBar] = useState<string | null>(null)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnimated(true) }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const tabs = ['Revenue Mix', 'Competitive Edge', 'Premium Plans', 'Margin Challenge']

  const bars = [
    { key: 'premium', label: 'Premium Subscriptions', pct: 89, color: '#1DB954' },
    { key: 'ads',     label: 'Ad-Supported',          pct: 11, color: '#4a4a5a' },
  ]

  const plans = [
    { name: 'Individual', price: '€11.99/mo', desc: 'For one listener' },
    { name: 'Duo',        price: '€15.99/mo', desc: 'For 2 people' },
    { name: 'Family',     price: '€19.99/mo', desc: 'Up to 6 accounts' },
    { name: 'Student',    price: '€5.99/mo',  desc: 'Verified students' },
  ]

  const edges = [
    { icon: '🤖', label: 'AI Personalization', text: 'Discover Weekly, Daily Mix, and Radio generate billions of streams monthly through machine learning.' },
    { icon: '🌍', label: 'Global Scale',        text: 'Present in 180+ markets — more than any competitor. Network effects compound with each new market.' },
    { icon: '🎙️', label: 'Audio Ecosystem',    text: 'Music, podcasts, and audiobooks in one app. Reduces churn and increases session time.' },
    { icon: '📊', label: 'Data Advantage',      text: '750M+ users generate first-party behavioral data competitors cannot replicate.' },
    { icon: '🔁', label: 'Freemium Funnel',     text: 'Free tier lowers acquisition cost; ~39% of MAUs are paid subscribers.' },
  ]

  const stats = [
    { label: 'Gross Margin',       value: '33.1%', note: 'Up from 25% in 2020',      color: '#1DB954' },
    { label: 'Royalty Cost Share', value: '~70%',  note: 'Of premium revenue',        color: '#f87171' },
    { label: 'Operating Margin',   value: '15.5%', note: 'Q4 2025',                   color: '#1DB954' },
    { label: 'Net Income 2025',    value: '€2.6B', note: 'First sustained profit year',color: '#1DB954' },
  ]

  return (
    <div id="revenue" style={{ marginTop: 48 }} ref={ref}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', background: 'rgba(29,185,84,0.1)', padding: '4px 10px', borderRadius: 4, display: 'inline-block', marginBottom: 12 }}>
          Revenue & Edge
        </span>
        <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)', margin: 0 }}>
          Revenue Model & Profitability Dynamics
        </h2>
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {tabs.map((t, i) => (
          <button key={t} onClick={() => setActiveTab(i)} style={{
            padding: '8px 18px', borderRadius: 999, fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
            border: activeTab === i ? '1px solid #1DB954' : '1px solid rgba(255,255,255,0.1)',
            background: activeTab === i ? 'rgba(29,185,84,0.15)' : 'rgba(255,255,255,0.04)',
            color: activeTab === i ? '#1DB954' : 'var(--text-dim)',
            transition: 'all 0.2s ease',
          }}>
            {t}
          </button>
        ))}
      </div>

      {/* Tab panels */}
      <GlassCard style={{ padding: '32px 36px', minHeight: 280 }}>

        {/* Tab 0 — Revenue Mix */}
        {activeTab === 0 && (
          <div>
            <p style={{ margin: '0 0 24px', fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: 1.7 }}>
              Spotify's revenue is split between premium subscriptions and advertising. Premium dominates, but both segments face pressure from high content licensing costs.
            </p>
            {bars.map(b => (
              <div key={b.key} style={{ marginBottom: 20 }}
                onMouseEnter={() => setHoveredBar(b.key)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.84rem', color: 'var(--text-dim)' }}>
                  <span>{b.label}</span>
                  <span style={{ color: hoveredBar === b.key ? b.color : 'var(--text-dim)', fontWeight: 700, transition: 'color 0.2s' }}>{b.pct}%</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 8, height: 14, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: 8, background: b.color,
                    width: animated ? `${b.pct}%` : '0%',
                    transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1)',
                    boxShadow: hoveredBar === b.key ? `0 0 12px ${b.color}` : 'none',
                  }} />
                </div>
              </div>
            ))}
            <p style={{ margin: '8px 0 0', fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              Hover each bar to highlight. Data based on FY 2025 earnings.
            </p>
          </div>
        )}

        {/* Tab 1 — Competitive Edge */}
        {activeTab === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {edges.map(e => (
              <div key={e.label} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '14px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', transition: 'border-color 0.2s, background 0.2s' }}
                onMouseEnter={el => { (el.currentTarget as HTMLDivElement).style.borderColor = 'rgba(29,185,84,0.35)'; (el.currentTarget as HTMLDivElement).style.background = 'rgba(29,185,84,0.05)' }}
                onMouseLeave={el => { (el.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.06)'; (el.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)' }}
              >
                <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{e.icon}</span>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{e.label}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-dim)', lineHeight: 1.55 }}>{e.text}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2 — Premium Plans */}
        {activeTab === 2 && (
          <div>
            <p style={{ margin: '0 0 20px', fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: 1.7 }}>
              Spotify offers tiered pricing to maximize conversion. Strategic price increases in 2023–2024 boosted ARPU, though pricing power remains constrained by competition.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
              {plans.map(p => (
                <div key={p.name} style={{ padding: '20px 20px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', transition: 'all 0.2s' }}
                  onMouseEnter={el => { (el.currentTarget as HTMLDivElement).style.borderColor = '#1DB954'; (el.currentTarget as HTMLDivElement).style.background = 'rgba(29,185,84,0.07)' }}
                  onMouseLeave={el => { (el.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)'; (el.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.04)' }}
                >
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{p.name}</div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: '#1DB954', marginBottom: 4 }}>{p.price}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3 — Margin Challenge */}
        {activeTab === 3 && (
          <div>
            <p style={{ margin: '0 0 20px', fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: 1.7 }}>
              Despite strong top-line growth, Spotify's margins remain under pressure from royalty obligations. 2025 marks a turning point as operating leverage begins to show.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {stats.map(s => (
                <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)' }}>{s.label}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>{s.note}</div>
                  </div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: s.color }}>{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </GlassCard>

      <p className="insight" style={{ marginTop: 24 }}>
        <strong>Spotify generates massive revenue at scale, but capturing that value as profit is the defining challenge.</strong>
      </p>
    </div>
  )
}

export default function CompanySection() {
  const header = useReveal()
  const cards  = useReveal()

  return (
    <section id="company" className="section">
      <div ref={header.ref} className={`reveal${header.vis ? ' visible' : ''}`} style={{ marginBottom: 64 }}>
        <div className="act-badge">Act 01</div>
        <h2 className="section-title">The Company</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 48, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <p className="section-sub">
              Spotify was founded in 2006 in Stockholm by Daniel Ek and Martin Lorentzon in response to widespread
              music piracy. By introducing a freemium streaming model, Spotify transformed how consumers access
              music, shifting the industry from ownership to on-demand access.
            </p>
            <p className="section-sub" style={{ marginTop: 16 }}>
              Today, Spotify is the world's largest audio streaming platform, serving over 751 million monthly
              active users and 290 million premium subscribers across more than 180 markets. Its growth has been
              driven by a data-powered personalization strategy and a scalable two-sided platform connecting
              listeners and creators.
            </p>
          </div>
          <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div style={{
              padding: 4,
              borderRadius: 16,
              background: 'linear-gradient(135deg, #1db954, #0f7a35)',
            }}>
              <img
                src="/daniel_ek.png"
                alt="Daniel Ek"
                style={{
                  width: 220,
                  height: 260,
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  borderRadius: 13,
                  display: 'block',
                }}
              />
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700, color: 'var(--text)' }}>Daniel Ek</p>
              <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: 'var(--accent)' }}>Co-founder & CEO</p>
            </div>
          </div>
        </div>
      </div>

      {/* Business model cards */}
      <div ref={cards.ref} className={`reveal${cards.vis ? ' visible' : ''}`}>

        {/* 1. Company cards */}
        <BusinessCards />


        {/* 2. Mission, Vision & Culture */}
        <MissionCards />

        {/* 3. Why Spotify Matters */}
        <GlassCard style={{ margin: '48px 0 32px', padding: '40px 48px', borderLeft: '4px solid var(--accent)', background: 'linear-gradient(135deg, rgba(29,185,84,0.07) 0%, rgba(29,185,84,0.02) 100%)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -20, right: 32, fontSize: '10rem', fontWeight: 900, color: 'rgba(29,185,84,0.06)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>♪</div>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--accent)', margin: '0 0 20px' }}>
            Why Spotify Matters
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text)', lineHeight: 1.75, maxWidth: 780, margin: '0 0 14px', fontWeight: 500 }}>
            Spotify didn't just disrupt music streaming, it redefined the entire industry. By combining scale,
            data, and personalization, Spotify transformed music from a product into a service, fundamentally
            changing how consumers discover and engage with content.
          </p>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-dim)', lineHeight: 1.75, maxWidth: 780, margin: 0 }}>
            This shift positioned Spotify not just as a streaming platform, but as a central player in the global audio ecosystem.
          </p>
        </GlassCard>

        {/* 4. How Spotify Creates Value */}
        <div id="value" style={{ marginTop: 48 }}>
          <div style={{ marginBottom: 28 }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', background: 'rgba(29,185,84,0.1)', padding: '4px 10px', borderRadius: 4, display: 'inline-block', marginBottom: 12 }}>
              Business Model
            </span>
            <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)', margin: 0 }}>
              How Spotify Creates Value
            </h2>
          </div>
          <div className="value-grid">
            <div className="value-card">
              <div className="value-card-inner">
                <div className="value-card-front" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
                  <span style={{ fontSize: '2rem' }}>🎵</span>
                  <h3 style={{ textAlign: 'center', margin: 0 }}>Products & Services</h3>
                  <span className="flip-hint" style={{ position: 'static', marginTop: 8 }}>Hover to explore →</span>
                </div>
                <div className="value-card-back">
                  <h3>Products & Services</h3>
                  <ul>
                    <li>Music streaming across 100M+ tracks</li>
                    <li>Podcasts and exclusive audio content</li>
                    <li>Audiobooks and expanding non-music offerings</li>
                    <li>Premium subscriptions (ad-free, offline, enhanced features)</li>
                    <li>Advertising platform for free-tier users</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="value-card">
              <div className="value-card-inner">
                <div className="value-card-front highlight" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
                  <span style={{ fontSize: '2rem' }}>🔍</span>
                  <h3 style={{ textAlign: 'center', margin: 0 }}>Problems Addressed</h3>
                  <span className="flip-hint" style={{ position: 'static', marginTop: 8 }}>Hover to explore →</span>
                </div>
                <div className="value-card-back">
                  <h3>Problems Addressed</h3>
                  <ul>
                    <li>Provides a legal and convenient alternative to piracy</li>
                    <li>Solves content discovery through AI-driven personalization</li>
                    <li>Delivers seamless access across devices</li>
                    <li>Aggregates diverse audio content into one ecosystem</li>
                    <li>Enables monetization for creators and rights holders</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="value-card">
              <div className="value-card-inner">
                <div className="value-card-front" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
                  <span style={{ fontSize: '2rem' }}>🌍</span>
                  <h3 style={{ textAlign: 'center', margin: 0 }}>B2C: Listeners Worldwide</h3>
                  <span className="flip-hint" style={{ position: 'static', marginTop: 8 }}>Hover to explore →</span>
                </div>
                <div className="value-card-back">
                  <h3>B2C: Listeners Worldwide</h3>
                  <p style={{ margin: 0, color: '#d4f0dd', lineHeight: 1.7, fontSize: '0.84rem' }}>
                    Spotify serves over 751 million users globally, including ~290 million premium subscribers.
                    Its freemium model attracts users at scale and converts them into paying customers over time.
                  </p>
                </div>
              </div>
            </div>
            <div className="value-card">
              <div className="value-card-inner">
                <div className="value-card-front" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
                  <span style={{ fontSize: '2rem' }}>📊</span>
                  <h3 style={{ textAlign: 'center', margin: 0 }}>B2B: Advertisers & Creators</h3>
                  <span className="flip-hint" style={{ position: 'static', marginTop: 8 }}>Hover to explore →</span>
                </div>
                <div className="value-card-back">
                  <h3>B2B: Advertisers & Creators</h3>
                  <p style={{ margin: 0, color: '#d4f0dd', lineHeight: 1.7, fontSize: '0.84rem' }}>
                    Spotify enables brands to target users through data-driven advertising while providing creators
                    with global distribution, analytics, and monetization tools.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Revenue Model */}
        <RevenueSection />

        {/* 6. Key Milestones */}
        <div style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)', margin: '0 0 20px' }}>
            Key Milestones
          </h2>
          <GlassCard style={{ padding: '32px 36px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px 32px' }}>
              {milestones.map(m => (
                <div key={m.year}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', marginBottom: 6, letterSpacing: '0.05em' }}>{m.year}</div>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-dim)', lineHeight: 1.55 }}>{m.text}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* 7. Leadership & Strategic Shift */}
        <div id="strategy-shift" style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)', margin: '0 0 24px' }}>
            Leadership & Strategic Shift
          </h2>
          <GlassCard style={{ padding: '32px 36px' }}>
            <p style={{ margin: '0 0 16px', fontSize: '0.92rem', color: 'var(--text-dim)', lineHeight: 1.75 }}>
              Under CEO Daniel Ek, Spotify has recently shifted from a "growth-at-all-costs" strategy to a focus
              on profitability and operational efficiency. This transition became especially clear in 2023, when
              the company reduced its workforce and restructured costs to improve margins.
            </p>
            <p style={{ margin: '0 0 20px', fontSize: '0.92rem', color: 'var(--text-dim)', lineHeight: 1.75 }}>
              While Spotify continues to invest in growth areas such as podcasts and global expansion, management
              has placed greater emphasis on disciplined pricing, cost control, and converting free users into
              premium subscribers.
            </p>
            <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)', padding: '16px 20px', borderLeft: '3px solid var(--accent)', background: 'rgba(29,185,84,0.05)', borderRadius: '0 8px 8px 0' }}>
              This shift marks a turning point, from prioritizing scale to prioritizing sustainable profitability.
            </p>
          </GlassCard>
        </div>


      </div>
    </section>
  )
}
