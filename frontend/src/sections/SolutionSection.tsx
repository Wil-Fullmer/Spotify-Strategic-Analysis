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

const recs = [
  {
    num: '01',
    title: 'Monetize the Ad-Supported Gap',
    body: 'With 476M ad-supported users and ad ARPU a fraction of premium, Spotify should aggressively build its programmatic ad platform — competing directly with YouTube on video podcasts and creator monetization. A $5 ARPU increase across the ad tier alone represents ~$2.4B in incremental annual revenue.',
    risk: 'Listener experience degradation if ad load increases without personalization guardrails.',
  },
  {
    num: '02',
    title: 'Own the Creator Monetization Stack',
    body: 'Spotify for Artists and Spotify for Podcasters are underutilized. A full creator monetization suite — direct fan payments, merch integration, live event ticketing — transforms Spotify from a distribution platform into an artist economy layer, reducing label dependency over time.',
    risk: 'Label pushback if Spotify is perceived as disintermediating the traditional music industry.',
  },
  {
    num: '03',
    title: 'Expand Audiobooks to Justify ARPU Growth',
    body: 'Audiobooks have driven double-digit listener growth since launch. Bundling books, music, and podcasts at a single price point creates switching costs that support sustained premium price increases — the most reliable path to gross margin expansion given the royalty ceiling.',
    risk: 'Publisher licensing costs could offset margin gains if content costs aren\'t carefully managed.',
  },
]

export default function SolutionSection() {
  const header = useReveal()
  const cards  = useReveal()
  const footer = useReveal()

  return (
    <section id="solution" className="section">
      <div ref={header.ref} className={`reveal${header.vis ? ' visible' : ''}`} style={{ marginBottom: 64 }}>
        <div className="act-badge">Act 04</div>
        <h2 className="section-title">The Solution</h2>
        <p className="section-sub">
          Spotify's profitability inflection is real — but fragile. The structural constraint is royalty
          rates. The path forward requires owning more of the value chain, not just distributing it.
        </p>
      </div>

      <div ref={cards.ref} className={`reveal${cards.vis ? ' visible' : ''}`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
          {recs.map(r => (
            <GlassCard key={r.num} style={{ padding: '28px 32px', display: 'grid', gridTemplateColumns: '64px 1fr 280px', gap: 28, alignItems: 'start' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'rgba(29,185,84,0.25)', letterSpacing: '-0.04em', lineHeight: 1 }}>
                {r.num}
              </span>
              <div>
                <h3 style={{ margin: '0 0 10px', fontSize: '1rem', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>{r.title}</h3>
                <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--text-dim)', lineHeight: 1.65 }}>{r.body}</p>
              </div>
              <div style={{ background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.15)', borderRadius: 12, padding: '12px 16px' }}>
                <p style={{ margin: '0 0 6px', fontSize: '0.65rem', fontWeight: 700, color: '#f87171', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Key Risk</p>
                <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-dim)', lineHeight: 1.55 }}>{r.risk}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Sources */}
      <div ref={footer.ref} className={`reveal${footer.vis ? ' visible' : ''}`}>
        <GlassCard style={{ padding: '20px 28px' }}>
          <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            <span style={{ color: 'var(--text-dim)', fontWeight: 600 }}>Sources: </span>
            Spotify Q1–Q4 2025 Shareholder Decks (February 2026) ·
            Q4 2025 Earnings Call Prepared Remarks · LSEG AllReports Financial Data (L8681T10) ·
            Porter's Five Forces applied to audio streaming industry dynamics.
            All financials in USD unless noted. EUR figures from quarterly shareholder decks.
          </p>
        </GlassCard>
      </div>
    </section>
  )
}
