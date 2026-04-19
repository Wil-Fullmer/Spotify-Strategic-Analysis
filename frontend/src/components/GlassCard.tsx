interface GlassCardProps {
  children: React.ReactNode
  className?: string
  accent?: boolean
  style?: React.CSSProperties
}

export default function GlassCard({ children, className = '', accent, style }: GlassCardProps) {
  return (
    <div className={`glass${accent ? ' glass-accent' : ''} ${className}`} style={style}>
      {children}
    </div>
  )
}
