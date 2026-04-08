import { useEffect, useRef, useState } from 'react'
import GlassCard from '../components/GlassCard'

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, vis }
}

const milestones = [
  { year: '2006', text: 'Founded in Stockholm by Daniel Ek & Martin Lorentzon as a response to rampant music piracy.' },
  { year: '2008', text: 'Launched in Europe with a freemium model — free ad-supported listening alongside premium subscriptions.' },
  { year: '2011', text: 'US launch. Spotify Connect introduced — working across every device, every ecosystem.' },
  { year: '2014', text: 'Acquired Echo Nest, a music intelligence company — laying the foundation for personalization.' },
  { year: '2018', text: 'Direct listing on NYSE at a $26.5B valuation. First major tech company to skip a traditional IPO.' },
  { year: '2019', text: 'Aggressive push into podcasting — acquired Gimlet, Anchor, and Parcast for ~$400M.' },
  { year: '2023', text: 'Laid off 17% of workforce. Pivoted from growth-at-all-costs to operational efficiency.' },
  { year: '2025', text: '$2.6B net income. First year of sustained profitability. 751M MAUs. Free Cash Flow: $3.4B.' },
]

export default function CompanySection() {
  const header = useReveal()
  const cards  = useReveal()

  return (
    <section id="company" className="section">
      <div ref={header.ref} className={`reveal${header.vis ? ' visible' : ''}`} style={{ marginBottom: 64 }}>
        <div className="act-badge">Act 01</div>
        <h2 className="section-title">The Company</h2>
        <p className="section-sub">
          Spotify didn't invent music streaming. It invented the sustainable version of it —
          converting an industry ravaged by piracy into a platform serving three quarters of a billion people.
        </p>
      </div>

      {/* Business model cards */}
      <div ref={cards.ref} className={`reveal${cards.vis ? ' visible' : ''}`}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
          {[
            {
              icon: '♪',
              title: 'Freemium Core',
              body: 'Ad-supported free tier is the top of the funnel — not an afterthought. It converts listeners into premium subscribers at scale.',
            },
            {
              icon: '◉',
              title: 'Premium Subscription',
              body: '290M paid subscribers at ~€4.5/month average ARPU. Premium represents 88% of total revenue and is the margin engine.',
            },
            {
              icon: '▶',
              title: 'Two-Sided Platform',
              body: 'Spotify sits between 100M+ tracks/episodes and 751M listeners — extracting value from both sides through discovery and monetization tools.',
            },
          ].map(c => (
            <GlassCard key={c.title} style={{ padding: '28px 24px' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 12 }}>{c.icon}</div>
              <h3 style={{ margin: '0 0 10px', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>{c.title}</h3>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>{c.body}</p>
            </GlassCard>
          ))}
        </div>

        {/* Timeline */}
        <GlassCard style={{ padding: '32px 36px' }}>
          <h3 style={{ margin: '0 0 28px', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
            Key Milestones
          </h3>
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
    </section>
  )
}
