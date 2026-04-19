import { useEffect, useRef, useState } from 'react'

function useCountUp(target: number, duration = 1300, active = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    const start = performance.now()
    const tick = (now: number) => {
      const t     = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(eased * target)
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, target, duration])
  return val
}

interface DataPoint { q: string; v: number }

interface HeroStatCardProps {
  label:   string
  delta:   string
  up:      boolean
  target:  number
  fmt:     (v: number) => string
  data:    DataPoint[]
  color?:  string
  delay?:  number
  hovered: boolean
}

export default function HeroStatCard({
  label, delta, up, target, fmt, data, color = '#1db954', delay = 0, hovered,
}: HeroStatCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setTimeout(() => setVis(true), delay) },
      { threshold: 0.35 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])

  const counted = useCountUp(target, 1300, vis)

  return (
    <div
      ref={ref}
      className="glass"
      style={{
        padding:       '20px 20px 18px',
        minWidth:      190,
        flex:          '1 1 0',
        opacity:       vis ? 1 : 0,
        transform:     vis ? 'translateY(0)' : 'translateY(20px)',
        transition:    `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms, border-color 0.2s ease, box-shadow 0.2s ease`,
        display:       'flex',
        flexDirection: 'column',
        gap:           4,
        textAlign:     'left',
        cursor:        'default',
        ...(hovered ? {
          borderColor: 'rgba(29,185,84,0.5)',
          boxShadow:   '0 4px 32px rgba(0,0,0,0.45), 0 0 28px rgba(29,185,84,0.18)',
        } : {}),
      }}
    >
      <span style={{
        fontSize:      '0.63rem',
        color:         'var(--text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.09em',
        fontWeight:    600,
      }}>
        {label}
      </span>

      <div style={{
        fontSize:           '2rem',
        fontWeight:         900,
        letterSpacing:      '-0.04em',
        lineHeight:         1.05,
        color,
        fontVariantNumeric: 'tabular-nums',
        minHeight:          '2.15rem',
      }}>
        {fmt(counted)}
      </div>

      <span style={{ fontSize: '0.7rem', fontWeight: 600, color: up ? '#1db954' : '#f87171' }}>
        {up ? '↑' : '↓'} {delta}
      </span>

      <div style={{
        overflow:   'hidden',
        maxHeight:  hovered ? `${data.length * 28 + 32}px` : '0px',
        opacity:    hovered ? 1 : 0,
        transition: 'max-height 0.35s ease, opacity 0.25s ease',
        marginTop:  hovered ? 14 : 0,
      }}>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 10 }} />
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {data.map((d, i) => {
              const isLatest = i === data.length - 1
              return (
                <tr key={d.q} style={{
                  opacity:    hovered ? 1 : 0,
                  transform:  hovered ? 'translateX(0)' : 'translateX(-6px)',
                  transition: `opacity 0.25s ease ${i * 35}ms, transform 0.25s ease ${i * 35}ms`,
                }}>
                  <td style={{
                    padding:    '4px 0',
                    fontSize:   '0.72rem',
                    color:      isLatest ? color : 'var(--text-muted)',
                    fontWeight: isLatest ? 700 : 400,
                    width:      '50%',
                  }}>
                    {d.q}
                  </td>
                  <td style={{
                    padding:            '4px 0',
                    fontSize:           '0.72rem',
                    color:              isLatest ? color : 'var(--text-dim)',
                    fontWeight:         isLatest ? 700 : 400,
                    textAlign:          'right',
                    fontVariantNumeric: 'tabular-nums',
                  }}>
                    {fmt(d.v)}
                    {isLatest && (
                      <span style={{
                        display:       'inline-block',
                        width:         6,
                        height:        6,
                        borderRadius:  '50%',
                        background:    color,
                        marginLeft:    6,
                        verticalAlign: 'middle',
                        boxShadow:     `0 0 6px ${color}`,
                      }} />
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
