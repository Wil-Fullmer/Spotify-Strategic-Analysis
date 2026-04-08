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

const forces = [
  { label: 'Supplier Power',    score: 4, note: 'Major labels (Universal, Sony, Warner) control ~75% of licensed content. Royalty rates are non-negotiable at scale.' },
  { label: 'Buyer Power',       score: 2, note: 'Individual subscribers have low switching leverage, but churn sensitivity is high during price increases.' },
  { label: 'Threat of Entry',   score: 2, note: 'High capital + content licensing barriers. But Big Tech (Apple, Amazon, YouTube) entered and now competes on bundling.' },
  { label: 'Substitutes',       score: 3, note: 'YouTube (free, visual), radio, piracy, TikTok. Free alternatives remain a ceiling on premium conversion rates.' },
  { label: 'Rivalry',           score: 5, note: 'Apple Music, Amazon Music, YouTube Music, Tidal. Competition is intense — differentiation rests on UX and personalization.' },
]

export default function ProblemSection() {
  const header = useReveal()
  const grid   = useReveal()

  return (
    <section id="problem" className="section">
      <div ref={header.ref} className={`reveal${header.vis ? ' visible' : ''}`} style={{ marginBottom: 64 }}>
        <div className="act-badge">Act 02</div>
        <h2 className="section-title">The Problem</h2>
        <p className="section-sub">
          Spotify has achieved something rare: profitable scale in a structurally difficult industry.
          But the path to sustained margin expansion runs directly through a set of forces it doesn't fully control.
        </p>
      </div>

      <div ref={grid.ref} className={`reveal${grid.vis ? ' visible' : ''}`}>
        {/* Competitive forces */}
        <GlassCard style={{ padding: '32px 36px', marginBottom: 24 }}>
          <h3 style={{ margin: '0 0 8px', fontSize: '1rem', fontWeight: 700, color: 'var(--text)' }}>Competitive Landscape</h3>
          <p style={{ margin: '0 0 28px', fontSize: '0.82rem', color: 'var(--text-dim)' }}>
            Five forces analysis — threat level 1 (low) to 5 (high)
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {forces.map(f => (
              <div key={f.label} style={{ display: 'grid', gridTemplateColumns: '160px 1fr 200px', gap: 20, alignItems: 'center' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text)' }}>{f.label}</span>
                <div style={{ height: 6, borderRadius: 100, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width:  `${f.score * 20}%`,
                    borderRadius: 100,
                    background: f.score >= 4
                      ? 'linear-gradient(90deg, #f87171, #ef4444)'
                      : f.score === 3
                        ? 'linear-gradient(90deg, #fbbf24, #f59e0b)'
                        : 'linear-gradient(90deg, #1db954, #17a349)',
                    transition: 'width 1s ease 0.3s',
                  }} />
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', lineHeight: 1.45 }}>{f.note}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Strategic tensions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <GlassCard style={{ padding: '28px 24px' }}>
            <h3 style={{ margin: '0 0 12px', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)' }}>
              The Royalty Ceiling
            </h3>
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-dim)', lineHeight: 1.65 }}>
              Spotify pays out ~70% of revenue to rights holders. Every percentage point of gross margin
              improvement has to come from either pricing power, new revenue streams, or negotiating
              better terms — each of which creates its own risk. Content cost remains the single largest
              structural constraint on profitability.
            </p>
          </GlassCard>
          <GlassCard style={{ padding: '28px 24px' }}>
            <h3 style={{ margin: '0 0 12px', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)' }}>
              The Advertising Gap
            </h3>
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-dim)', lineHeight: 1.65 }}>
              Ad revenue declined 4% Y/Y in Q4 2025, dragged by the restructuring of the podcast
              ad business. On a like-for-like basis, advertising grew ~7% — but Spotify remains
              far behind its potential given 476M ad-supported listeners. Monetizing this audience
              at even a fraction of YouTube's per-user rate represents billions in untapped upside.
            </p>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}
