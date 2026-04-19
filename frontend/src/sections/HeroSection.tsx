import { useState } from 'react'
import HeroStatCard from '../components/HeroStatCard'
import { quarterlyKPIs } from '../data/spotify'

// Build sparkline data slices from quarterly history
const qLabels = quarterlyKPIs.map(({ quarter }) => {
  // Shorten label: "Q1 2025" -> "Q1'25"
  const [qPart, yPart] = quarter.split(' ')
  return `${qPart}'${yPart.slice(2)}`
})

const mauData    = quarterlyKPIs.map((q, i) => ({ q: qLabels[i], v: q.mau }))
const revData    = quarterlyKPIs.map((q, i) => ({ q: qLabels[i], v: q.totalRevenue }))
const marginData = quarterlyKPIs.map((q, i) => ({ q: qLabels[i], v: q.grossMargin }))
// LTM FCF: rolling 4-quarter sum
const fcfData    = quarterlyKPIs.map((_q, i) => {
  const window = quarterlyKPIs.slice(Math.max(0, i - 3), i + 1)
  return { q: qLabels[i], v: window.reduce((s, w) => s + w.fcf, 0) }
})

const stats = [
  {
    label:  'Monthly Active Users',
    delta:  '11% Y/Y',
    up:     true,
    target: 751,
    fmt:    (v: number) => `${Math.round(v)}M`,
    data:   mauData,
  },
  {
    label:  'Q4 Revenue',
    delta:  '7% Y/Y · 13% FXN',
    up:     true,
    target: 4531,
    fmt:    (v: number) => `€${Math.round(v).toLocaleString()}M`,
    data:   revData,
  },
  {
    label:  'Gross Margin',
    delta:  '+0.9pp Y/Y',
    up:     true,
    target: 33.1,
    fmt:    (v: number) => `${v.toFixed(1)}%`,
    data:   marginData,
  },
  {
    label:  'LTM Free Cash Flow',
    delta:  '2.5× vs LTM 2024',
    up:     true,
    target: 2507,
    fmt:    (v: number) => `€${Math.round(v).toLocaleString()}M`,
    data:   fcfData,
  },
]

export default function HeroSection() {
  const [groupHovered, setGroupHovered] = useState(false)

  return (
    <section
      id="hero"
      style={{
        minHeight:      '100vh',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        textAlign:      'center',
        padding:        '120px 32px 80px',
        position:       'relative',
      }}
    >
      {/* Logo */}
      <div style={{ marginBottom: 32 }}>
        <svg width="56" height="56" viewBox="0 0 168 168" fill="none">
          <circle cx="84" cy="84" r="84" fill="#1db954" />
          <path d="M120 107c-25-15-65-17-90-9-4 1-7-1-8-5s1-7 5-8c29-9 73-7 101 11 3 2 4 7 2 10s-7 4-10 1z" fill="#fff" />
          <path d="M131 84c-28-17-72-21-101-11-4 1-8-1-9-6s1-8 5-9c33-11 81-7 113 13 4 2 5 7 3 11s-7 5-11 2z" fill="#fff" />
          <path d="M122 62c-23-14-61-18-84-10-3 1-7-1-8-4s1-7 5-8c27-9 69-5 95 11 3 2 4 6 2 9s-7 4-10 2z" fill="#fff" />
        </svg>
      </div>

      <div className="act-badge" style={{ marginBottom: 24 }}>Strategic Analysis</div>

      <h1 style={{
        fontSize:      'clamp(3rem, 8vw, 6.5rem)',
        fontWeight:    900,
        letterSpacing: '-0.05em',
        lineHeight:    0.95,
        margin:        '0 0 28px',
        color:         'var(--text)',
        maxWidth:      800,
      }}>
        The Sound of{' '}
        <span style={{
          color:                'transparent',
          backgroundImage:      'linear-gradient(135deg, #1db954 0%, #17a349 50%, #0f7a35 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip:       'text',
        }}>
          Profit
        </span>
      </h1>

      <p style={{
        fontSize:   'clamp(1rem, 2vw, 1.25rem)',
        color:      'var(--text-dim)',
        maxWidth:   540,
        lineHeight: 1.6,
        margin:     '0 0 56px',
      }}>
        In 2025, Spotify did something analysts spent a decade doubting: it turned 750 million listeners
        into a profitable business. This analysis examines how they got there, what structural forces
        still threaten it, and what the right moves are from here.
      </p>

      {/* Animated stat cards */}
      <div
        onMouseEnter={() => setGroupHovered(true)}
        onMouseLeave={() => setGroupHovered(false)}
        style={{
          display:    'flex',
          gap:        14,
          flexWrap:   'wrap',
          justifyContent: 'center',
          marginBottom: 64,
          width:      '100%',
          maxWidth:   1100,
        }}
      >
        {stats.map((s, i) => (
          <HeroStatCard key={s.label} {...s} delay={i * 120} hovered={groupHovered} />
        ))}
      </div>

      {/* Scroll cue */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Scroll to explore
        </span>
        <div style={{
          width:      1,
          height:     48,
          background: 'linear-gradient(to bottom, var(--accent), transparent)',
          animation:  'pulseBar 2s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @keyframes pulseBar {
          0%, 100% { opacity: 0.4; transform: scaleY(1);    }
          50%       { opacity: 1;   transform: scaleY(1.15); }
        }
      `}</style>
    </section>
  )
}
