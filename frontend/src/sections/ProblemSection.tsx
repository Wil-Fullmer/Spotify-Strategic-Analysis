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
  { label: 'Buyer Power',       score: 2, note: 'Individual users have minimal bargaining power, though price increases trigger measurable churn — a soft ceiling on how aggressively Spotify can reprice.' },
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
            Competitive forces shaping Spotify's strategic environment — severity 1 (low) to 5 (high)
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
            <h3 style={{ margin: '0 0 14px', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)' }}>
              The Royalty Ceiling
            </h3>
            <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: '0.82rem', color: 'var(--text-dim)', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <li>~70% of revenue paid out to rights holders</li>
              <li>Every margin gain requires pricing power, new revenue streams, or renegotiation</li>
              <li>Pricing power is capped by competition; renegotiation risks catalog pullback; new streams take years to scale</li>
              <li>Content cost is the single largest structural constraint on profitability</li>
            </ul>
          </GlassCard>
          <GlassCard style={{ padding: '28px 24px' }}>
            <h3 style={{ margin: '0 0 14px', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)' }}>
              The Advertising Gap
            </h3>
            <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: '0.82rem', color: 'var(--text-dim)', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <li>Ad revenue declined 4% Y/Y in Q4 2025 (podcast restructuring)</li>
              <li>Like-for-like advertising still grew ~7%</li>
              <li>476M ad-supported users are severely undermonetized</li>
              <li>Closing even a fraction of the gap vs. YouTube represents billions in incremental annual revenue</li>
            </ul>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}
