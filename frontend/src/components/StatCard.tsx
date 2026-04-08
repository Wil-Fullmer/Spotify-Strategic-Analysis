interface StatCardProps {
  label: string
  value: string
  sub?: string
  accent?: boolean
  delta?: string
  deltaPositive?: boolean
}

export default function StatCard({ label, value, sub, accent, delta, deltaPositive }: StatCardProps) {
  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-2"
      style={{
        background: 'var(--color-card)',
        border: '1px solid var(--color-border)',
      }}
    >
      <span style={{ color: 'var(--color-text-dim)', fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {label}
      </span>
      <span
        style={{
          fontSize: '2rem',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          color: accent ? 'var(--color-accent)' : 'var(--color-text)',
          lineHeight: 1,
        }}
      >
        {value}
      </span>
      <div className="flex items-center gap-2" style={{ minHeight: '1.2em' }}>
        {delta && (
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: deltaPositive ? 'var(--color-accent)' : '#f87171',
            }}
          >
            {deltaPositive ? '▲' : '▼'} {delta}
          </span>
        )}
        {sub && (
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)' }}>
            {sub}
          </span>
        )}
      </div>
    </div>
  )
}
