import { useEffect, useRef, useState } from 'react'
import GlassCard from '../components/GlassCard'

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.12 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, vis }
}

// Animated counter hook — only runs for numeric labels
function useCountUp(label: string, active: boolean) {
  const [display, setDisplay] = useState('')
  const rafRef = useRef<number>(0)

  useEffect(() => {
    // Extract leading number from label e.g. "$2.4B" → 2.4, "15%+" → 15
    const match = label.match(/[\d.]+/)
    if (!match || !active) { setDisplay(label); return }

    const target = parseFloat(match[0])
    const isDecimal = match[0].includes('.')
    const prefix = label.slice(0, label.indexOf(match[0]))
    const suffix = label.slice(label.indexOf(match[0]) + match[0].length)
    const duration = 1000
    const start = performance.now()

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      const val = target * eased
      setDisplay(`${prefix}${isDecimal ? val.toFixed(1) : Math.round(val)}${suffix}`)
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
    }

    setDisplay(`${prefix}0${suffix}`)
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [active, label])

  return display
}

const recs = [
  {
    num: '01',
    title: 'Monetize the Ad-Supported Gap',
    move: 'Build a full programmatic ad platform competing directly with YouTube on video podcasts and creator monetization. Spotify has 476M free-tier users and ad ARPU (average revenue per user) less than a quarter of premium — the infrastructure gap is solvable.',
    upsideLabel: '$2.4B',
    upsideNote: 'incremental annual revenue from a $5 ARPU lift across the ad tier alone',
    risk: 'Listener experience degrades if ad load increases without personalization guardrails.',
    expertCallback: { quote: 'The price went up and I complained, then I renewed immediately. That tells you everything about how locked in I am.', name: 'Hannah Lubell', title: 'Independent Musician & Cover Artist' },
  },
  {
    num: '02',
    title: 'Own the Creator Monetization Stack',
    move: 'Expand Spotify for Artists into a full creator economy layer — direct fan payments, merch integration, live event ticketing. Transform Spotify from a distribution platform into the infrastructure artists build their careers on.',
    upsideLabel: 'Structural leverage',
    upsideNote: 'Reduces label dependency over time, improving royalty negotiating position — the highest-value long-term move.',
    risk: 'Label pushback if Spotify is seen as disintermediating the traditional music industry.',
    expertCallback: { quote: 'When I send my profile to a label or a venue, having Spotify numbers carries real weight. It\'s become a professional credential.', name: 'Joey Farrington', title: 'Music Producer & DJ' },
  },
  {
    num: '03',
    title: 'Expand Audiobooks to Justify ARPU Growth',
    move: 'Bundle audiobooks with music and podcasts at a single price point to create switching costs that support sustained premium price increases — the most reliable path to gross margin expansion given the royalty ceiling.',
    upsideLabel: '15%+',
    upsideNote: 'Operating margin target becomes achievable as bundled ARPU grows without proportional royalty increases.',
    risk: 'Publisher licensing costs could offset margin gains if content costs aren\'t carefully managed.',
    expertCallback: { quote: 'I tried Apple Music for a month and came back. Three years of playlists and listening history is not something you just abandon.', name: 'Hannah Lubell', title: 'Independent Musician & Cover Artist' },
  },
]

const ACCENT = '#1db954'
const RED    = '#f87171'
const TDIM   = '#8a8a96'

function RecCard({ r, isOpen, onToggle }: {
  r: typeof recs[number]
  isOpen: boolean
  onToggle: () => void
}) {
  const upside = useCountUp(r.upsideLabel, isOpen)
  const isNumeric = /[\d.]/.test(r.upsideLabel)

  const steps = [
    { label: 'THE MOVE',   color: ACCENT, content: (
      <p style={{ margin: 0, fontSize: '0.85rem', color: '#c8c8d8', lineHeight: 1.7 }}>{r.move}</p>
    )},
    { label: 'THE UPSIDE', color: ACCENT, content: (
      <div>
        <div style={{ fontSize: isNumeric ? '2.4rem' : '1.4rem', fontWeight: 900, color: '#f0f0f2', letterSpacing: isNumeric ? '-0.04em' : '-0.02em', lineHeight: 1.1, marginBottom: 6 }}>
          {isNumeric ? upside : r.upsideLabel}
        </div>
        <p style={{ margin: 0, fontSize: '0.78rem', color: TDIM, lineHeight: 1.55 }}>{r.upsideNote}</p>
      </div>
    )},
    { label: 'THE RISK',   color: RED, content: (
      <div>
        <p style={{ margin: '0 0 16px', fontSize: '0.85rem', color: '#c8c8d8', lineHeight: 1.7 }}>{r.risk}</p>
        <div style={{ borderLeft: '2px solid rgba(29,185,84,0.35)', paddingLeft: 12 }}>
          <p style={{ margin: '0 0 6px', fontSize: '0.78rem', color: '#c0c0d0', lineHeight: 1.6, fontStyle: 'italic' }}>"{r.expertCallback.quote}"</p>
          <span style={{ fontSize: '0.65rem', color: TDIM, fontWeight: 600 }}>— {r.expertCallback.name} · {r.expertCallback.title}</span>
        </div>
      </div>
    )},
  ]

  return (
    <GlassCard style={{
      padding: 0,
      overflow: 'hidden',
      border: isOpen ? '1px solid rgba(29,185,84,0.35)' : '1px solid rgba(255,255,255,0.07)',
      transition: 'border-color 0.3s ease',
    }}>
      {/* Header */}
      <div
        onClick={onToggle}
        style={{
          display: 'flex', alignItems: 'center', gap: 20,
          padding: '22px 28px', cursor: 'pointer',
          background: isOpen ? 'rgba(29,185,84,0.05)' : 'transparent',
          transition: 'background 0.3s ease',
          userSelect: 'none',
        }}
        onMouseEnter={e => { if (!isOpen) (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.02)' }}
        onMouseLeave={e => { if (!isOpen) (e.currentTarget as HTMLDivElement).style.background = 'transparent' }}
      >
        <span style={{
          fontSize: '1.8rem', fontWeight: 900,
          color: isOpen ? 'rgba(29,185,84,0.5)' : 'rgba(255,255,255,0.12)',
          letterSpacing: '-0.04em', lineHeight: 1, flexShrink: 0,
          transition: 'color 0.3s ease',
          fontVariantNumeric: 'tabular-nums',
        }}>
          {r.num}
        </span>
        <h3 style={{
          margin: 0, flex: 1,
          fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
          fontWeight: 700, letterSpacing: '-0.02em',
          color: isOpen ? '#f0f0f2' : '#b0b0be',
          transition: 'color 0.3s ease',
        }}>
          {r.title}
        </h3>
        <span style={{
          fontSize: '0.7rem', color: isOpen ? ACCENT : TDIM,
          transition: 'transform 0.35s ease, color 0.3s ease',
          display: 'inline-block',
          transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
          flexShrink: 0,
        }}>▼</span>
      </div>

      {/* Body */}
      <div style={{
        maxHeight: isOpen ? 520 : 0,
        opacity: isOpen ? 1 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease',
      }}>
        <div style={{ padding: '4px 28px 32px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {steps.map((step, si) => (
            <div key={step.label} style={{
              display: 'grid', gridTemplateColumns: '10px 1fr', gap: '0 18px',
              marginTop: si === 0 ? 24 : 0,
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'translateY(0)' : 'translateY(8px)',
              transition: `opacity 0.35s ease ${si * 80}ms, transform 0.35s ease ${si * 80}ms`,
            }}>
              {/* Dot + line column */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: step.color, flexShrink: 0, marginTop: 3,
                  boxShadow: `0 0 8px ${step.color}66`,
                }} />
                {si < steps.length - 1 && (
                  <div style={{
                    flex: 1, width: 1,
                    borderLeft: '1px dashed rgba(255,255,255,0.1)',
                    margin: '4px 0',
                    minHeight: 24,
                  }} />
                )}
              </div>

              {/* Content column */}
              <div style={{ paddingBottom: si < steps.length - 1 ? 24 : 0 }}>
                <div style={{
                  fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em',
                  color: step.color, textTransform: 'uppercase', marginBottom: 8,
                }}>
                  {step.label}
                </div>
                {step.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  )
}

export default function SolutionSection() {
  const header = useReveal()
  const cards  = useReveal()
  const footer = useReveal()
  const [openIdx, setOpenIdx]     = useState<number>(0)
  const [sourcesOpen, setSourcesOpen] = useState(false)

  return (
    <section id="solution" className="section">
      <div ref={header.ref} className={`reveal${header.vis ? ' visible' : ''}`} style={{ marginBottom: 64 }}>
        <h2 className="section-title">The Solution</h2>
        <p className="section-sub">
          Spotify's profitability inflection is real — but fragile. The structural constraint is royalty
          rates. The path forward requires owning more of the value chain, not just distributing it.
        </p>
      </div>

      <div ref={cards.ref} className={`reveal${cards.vis ? ' visible' : ''}`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          {recs.map((r, i) => (
            <RecCard
              key={r.num}
              r={r}
              isOpen={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
            />
          ))}
        </div>
      </div>

      {/* Sources */}
      <div ref={footer.ref} className={`reveal${footer.vis ? ' visible' : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={() => setSourcesOpen(o => !o)}
            style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '5px 16px', fontSize: '0.7rem', color: TDIM, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, transition: 'border-color 0.2s, color 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(29,185,84,0.4)'; (e.currentTarget as HTMLButtonElement).style.color = '#c0c0cc' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLButtonElement).style.color = TDIM }}
          >
            <span style={{ fontSize: '0.6rem', transition: 'transform 0.3s', display: 'inline-block', transform: sourcesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
            {sourcesOpen ? 'Hide' : 'View'} Sources
          </button>
        </div>

        {sourcesOpen && (
          <GlassCard style={{ padding: '20px 28px', marginTop: 12 }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.9 }}>
              <span style={{ color: 'var(--text-dim)', fontWeight: 600 }}>Sources</span>
              <br />
              Spotify Q1–Q4 2025 Shareholder Decks · Q4 2025 Earnings Call Prepared Remarks ·
              LSEG AllReports Financial Data (L8681T10) ·{' '}
              <a href="https://finviz.com/quote.ashx?t=SPOT&p=d" target="_blank" rel="noopener noreferrer"
                style={{ color: 'var(--accent)', textDecoration: 'none' }}>
                Finviz SPOT (ROIC &amp; valuation metrics)
              </a>{' '}
              · MIDiA Research Global Music Subscription Market Report 2024 (competitor market share &amp; subscriber estimates) ·
              Apple Services disclosure, 2023 (Apple Music subscriber count) ·
              Expert interviews conducted March–April 2026 ·
              User survey research (n=18) · AI analysis of 1,636 App Store reviews and Reddit posts via Claude API.
              <br />
              <span style={{ color: '#5a5a6a' }}>
                All Spotify financials in USD unless noted. Quarterly EUR figures from Spotify shareholder decks.
                Competitor subscriber figures for Amazon Music and YouTube Music are industry estimates — neither company discloses standalone streaming financials.
              </span>
            </div>
          </GlassCard>
        )}
      </div>
    </section>
  )
}
