import { useEffect, useRef, useState } from 'react'

interface StatPillProps {
  label:    string
  value:    string
  delta?:   string
  up?:      boolean
  accent?:  boolean
}

export default function StatPill({ label, value, delta, up, accent }: StatPillProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`glass${accent ? ' glass-accent' : ''} reveal${vis ? ' visible' : ''}`}
      style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 6 }}
    >
      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.09em', fontWeight: 600 }}>
        {label}
      </span>
      <span style={{
        fontSize:      '2.25rem',
        fontWeight:    800,
        letterSpacing: '-0.04em',
        lineHeight:    1,
        color:         accent ? 'var(--accent)' : 'var(--text)',
      }}>
        {value}
      </span>
      {delta && (
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: up ? 'var(--accent)' : 'var(--red)' }}>
          {up ? '↑' : '↓'} {delta}
        </span>
      )}
    </div>
  )
}
