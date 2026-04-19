import { useEffect, useRef, useState } from 'react'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend, ReferenceLine,
} from 'recharts'
import GlassCard from '../components/GlassCard'
import StatPill from '../components/StatPill'
import { annualIncome, quarterlyKPIs, annualFCF, headcount, competitorSubs, marketShare } from '../data/spotify'

// ─── constants ────────────────────────────────────────────────
const ACCENT = '#1db954'
const DIM    = '#155e30'
const RED    = '#f87171'
const MUTED  = '#3a3a44'
const TDIM   = '#8a8a96'
// const TMUTED = '#4a4a56'

const TT: React.CSSProperties = {
  background:   'rgba(17,17,19,0.95)',
  border:       '1px solid rgba(255,255,255,0.1)',
  borderRadius: 12,
  color:        '#f0f0f2',
  fontSize:     12,
  padding:      '10px 14px',
  backdropFilter: 'blur(12px)',
}

const axis = { stroke: MUTED, tick: { fill: TDIM, fontSize: 11 } }
const grid = { strokeDasharray: '3 3', stroke: 'rgba(255,255,255,0.05)' }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fmtUSD  = (v: any) => [`$${Number(v).toLocaleString()}M`, '']
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fmtPct  = (v: any) => [`${Number(v).toFixed(1)}%`, '']
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const fmtEUR  = (v: any) => [`€${Number(v).toLocaleString()}M`, '']

// ─── Reveal hook ──────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [threshold])
  return { ref, vis }
}

// ─── Chart wrapper ─────────────────────────────────────────────
function ChartCard({
  title, sub, children, delay = 0,
}: { title: string; sub?: string; children: React.ReactNode; delay?: number }) {
  const { ref, vis } = useReveal(0.1)
  return (
    <div ref={ref} className={`reveal${vis ? ' visible' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      <GlassCard style={{ padding: '28px 24px 20px' }}>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, color: '#f0f0f2', letterSpacing: '-0.02em' }}>{title}</h3>
          {sub && <p style={{ margin: '4px 0 0', fontSize: '0.72rem', color: TDIM }}>{sub}</p>}
        </div>
        {children}
      </GlassCard>
    </div>
  )
}

// ─── Revenue per employee derived data ────────────────────────
const revenuePerEmp = annualIncome
  .filter(d => headcount.find(h => h.year === d.year))
  .map(d => {
    const hc = headcount.find(h => h.year === d.year)!
    return { year: d.year, revPerEmp: Math.round(d.revenue / hc.employees * 1000) }
  })

// Stacked quarterly revenue mix
const revMix = quarterlyKPIs.map(q => ({
  quarter:   q.quarter,
  Premium:   q.premiumRevenue,
  AdSupported: q.adRevenue,
  opMargin:  q.opMargin,
}))

export default function EvidenceSection() {
  const header = useReveal()
  const stats  = useReveal()

  return (
    <section id="evidence" className="section">
      {/* Header */}
      <div ref={header.ref} className={`reveal${header.vis ? ' visible' : ''}`} style={{ marginBottom: 56 }}>
        <h2 className="section-title">The Evidence</h2>
        <p className="section-sub">
          From loss-making growth machine to cash-generating platform. The royalty ceiling and advertising
          gap identified above show up clearly in the data — here's how a decade of investment in scale
          and personalization finally compounded into structural profitability.
        </p>
      </div>

      {/* KPI pills */}
      <div ref={stats.ref} className={`reveal${stats.vis ? ' visible' : ''}`}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12, marginBottom: 40 }}>
          <StatPill label="MAUs"              value="751M"   delta="11% Y/Y" up   accent />
          <StatPill label="Premium Subs"      value="290M"   delta="10% Y/Y" up        />
          <StatPill label="Annual Revenue"    value="$20.2B" delta="24% Y/Y" up        />
          <StatPill label="Gross Margin"      value="32%"    delta="+6pp vs 2022" up   />
          <StatPill label="Free Cash Flow"    value="$3.4B"  delta="43% FCF margin" up />
          <StatPill label="ROIC"              value="24.84%" delta="— Finviz"   neutral />
        </div>
      </div>

      {/* ── Row 1: Revenue + Margin ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '5fr 3fr', gap: 16, marginBottom: 16 }}>
        <ChartCard title="Revenue & Gross Profit" sub="USD millions — 2019 to 2025" delay={0}>
          <ResponsiveContainer width="100%" height={292}>
            <AreaChart data={annualIncome} margin={{ top: 8, right: 4, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="gRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor={ACCENT} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={ACCENT} stopOpacity={0}   />
                </linearGradient>
                <linearGradient id="gGP" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor={DIM} stopOpacity={0.6} />
                  <stop offset="100%" stopColor={DIM} stopOpacity={0}   />
                </linearGradient>
              </defs>
              <CartesianGrid {...grid} />
              <XAxis dataKey="year" {...axis} />
              <YAxis {...axis} tickFormatter={v => `$${(v / 1000).toFixed(0)}B`} width={44} />
              <Tooltip contentStyle={TT} formatter={fmtUSD} />
              <Legend wrapperStyle={{ color: TDIM, fontSize: 11 }} />
              <Area type="monotone" dataKey="revenue"     name="Revenue"     stroke={ACCENT} fill="url(#gRev)" strokeWidth={2.5} dot={false} animationDuration={1400} animationEasing="ease-out" />
              <Area type="monotone" dataKey="grossProfit" name="Gross Profit" stroke={DIM}    fill="url(#gGP)"  strokeWidth={2}   dot={false} animationDuration={1600} animationEasing="ease-out" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Margin Trajectory" sub="% — Gross and Operating margins" delay={80}>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={annualIncome} margin={{ top: 8, right: 4, bottom: 0, left: 0 }}>
              <CartesianGrid {...grid} />
              <XAxis dataKey="year" {...axis} />
              <YAxis {...axis} tickFormatter={v => `${v}%`} width={36} />
              <Tooltip contentStyle={TT} formatter={fmtPct} />
              <ReferenceLine y={0} stroke="rgba(255,255,255,0.1)" strokeDasharray="4 2" />
              <Legend wrapperStyle={{ color: TDIM, fontSize: 11 }} />
              <Line type="monotone" dataKey="grossMargin" name="Gross Margin"     stroke={ACCENT} strokeWidth={2.5} dot={{ r: 3.5, fill: ACCENT, strokeWidth: 0 }} animationDuration={1200} animationEasing="ease-out" />
              <Line type="monotone" dataKey="opMargin"    name="Operating Margin" stroke={RED}    strokeWidth={2}   dot={{ r: 3, fill: RED, strokeWidth: 0 }}       animationDuration={1400} animationEasing="ease-out" strokeDasharray="5 3" />
            </LineChart>
          </ResponsiveContainer>
          <p style={{ margin: '10px 0 0', fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            — Operating margin deducts R&D, S&M, and G&A from GP.
          </p>
        </ChartCard>
      </div>

      {/* ── Row 2: FCF + Quarterly revenue mix ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: 16, marginBottom: 16 }}>
        <ChartCard title="Free Cash Flow" sub="USD millions — annual" delay={0}>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={annualFCF} margin={{ top: 8, right: 4, bottom: 0, left: 0 }}>
              <CartesianGrid {...grid} vertical={false} />
              <XAxis dataKey="year" {...axis} />
              <YAxis {...axis} tickFormatter={v => `$${(v / 1000).toFixed(1)}B`} width={44} />
              <Tooltip contentStyle={TT} formatter={fmtUSD} />
              <Bar dataKey="fcf" name="Free Cash Flow" fill={ACCENT} radius={[5, 5, 0, 0]} animationDuration={1200} animationEasing="ease-out">
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Quarterly Revenue Mix" sub="EUR millions — Premium vs Ad-Supported, 2025" delay={80}>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={revMix} margin={{ top: 8, right: 4, bottom: 0, left: 0 }}>
              <CartesianGrid {...grid} vertical={false} />
              <XAxis dataKey="quarter" {...axis} />
              <YAxis yAxisId="rev"    {...axis} tickFormatter={v => `€${(v / 1000).toFixed(1)}B`} width={48} />
              <YAxis yAxisId="margin" {...axis} tickFormatter={v => `${v}%`} orientation="right" width={36} />
              <Tooltip contentStyle={TT} />
              <Legend wrapperStyle={{ color: TDIM, fontSize: 11 }} />
              <Bar yAxisId="rev" dataKey="Premium"     name="Premium (€M)"      fill={ACCENT} stackId="a" radius={[0,0,5,5]} animationDuration={1000} animationEasing="ease-out" />
              <Bar yAxisId="rev" dataKey="AdSupported" name="Ad-Supported (€M)" fill={DIM}    stackId="a" radius={[5,5,0,0]} animationDuration={1200} animationEasing="ease-out" />
              <Line yAxisId="margin" type="monotone" dataKey="opMargin" name="Op. Margin %" stroke={RED} strokeWidth={2} dot={{ r: 3, fill: RED, strokeWidth: 0 }} animationDuration={1400} animationEasing="ease-out" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* ── Row 3: MAU growth + Revenue per employee ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 16, marginBottom: 16 }}>
        <ChartCard title="Monthly Active User Growth" sub="Millions — quarterly 2025 snapshots vs prior year" delay={0}>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={quarterlyKPIs} margin={{ top: 8, right: 4, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="gMAU" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor={ACCENT} stopOpacity={0.25} />
                  <stop offset="100%" stopColor={ACCENT} stopOpacity={0}    />
                </linearGradient>
                <linearGradient id="gPS" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor={DIM} stopOpacity={0.5} />
                  <stop offset="100%" stopColor={DIM} stopOpacity={0}   />
                </linearGradient>
              </defs>
              <CartesianGrid {...grid} />
              <XAxis dataKey="quarter" {...axis} />
              <YAxis {...axis} tickFormatter={v => `${v}M`} width={44} />
              <Tooltip contentStyle={TT} formatter={(v) => [`${v}M`, '']} />
              <Legend wrapperStyle={{ color: TDIM, fontSize: 11 }} />
              <Area type="monotone" dataKey="mau"         name="Total MAUs"        stroke={ACCENT} fill="url(#gMAU)" strokeWidth={2.5} dot={{ r: 4, fill: ACCENT, strokeWidth: 0 }} animationDuration={1200} animationEasing="ease-out" />
              <Area type="monotone" dataKey="premiumSubs" name="Premium Subscribers" stroke={DIM}  fill="url(#gPS)"  strokeWidth={2}   dot={{ r: 3, fill: DIM, strokeWidth: 0 }}   animationDuration={1400} animationEasing="ease-out" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Revenue per Employee" sub="USD thousands — efficiency metric" delay={80}>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={revenuePerEmp} margin={{ top: 8, right: 4, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="gRPE" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor={ACCENT} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={ACCENT} stopOpacity={0}   />
                </linearGradient>
              </defs>
              <CartesianGrid {...grid} />
              <XAxis dataKey="year" {...axis} />
              <YAxis {...axis} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} width={44} />
              <Tooltip contentStyle={TT} formatter={(v) => [`$${Number(v).toLocaleString()}k`, 'Rev / Employee']} />
              <Area type="monotone" dataKey="revPerEmp" name="Rev per Employee" stroke={ACCENT} fill="url(#gRPE)" strokeWidth={2.5} dot={{ r: 4, fill: ACCENT, strokeWidth: 0 }} animationDuration={1200} animationEasing="ease-out" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* ── Row 4: Operating income quarterly ── */}
      <ChartCard title="Quarterly Operating Income — 2025 Profitability Inflection" sub="EUR millions" delay={0}>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={quarterlyKPIs} margin={{ top: 8, right: 4, bottom: 0, left: 0 }}>
            <CartesianGrid {...grid} vertical={false} />
            <XAxis dataKey="quarter" {...axis} />
            <YAxis yAxisId="oi"     {...axis} tickFormatter={v => `€${v}M`} width={56} />
            <YAxis yAxisId="margin" {...axis} tickFormatter={v => `${v}%`} orientation="right" width={36} />
            <Tooltip contentStyle={TT} />
            <Legend wrapperStyle={{ color: TDIM, fontSize: 11 }} />
            <Bar  yAxisId="oi"     dataKey="opIncome" name="Operating Income (€M)" fill={ACCENT} radius={[5,5,0,0]} animationDuration={1000} animationEasing="ease-out" />
            <Line yAxisId="margin" type="monotone" dataKey="opMargin" name="Op. Margin %" stroke={RED} strokeWidth={2.5} dot={{ r: 4, fill: RED, strokeWidth: 0 }} animationDuration={1400} animationEasing="ease-out" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* ── Competitive Comparison ── */}
      <div style={{ marginTop: 40 }}>
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ margin: '0 0 6px', fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', fontWeight: 800, color: '#f0f0f2', letterSpacing: '-0.03em' }}>
            Competitive Comparison
          </h3>
          <p style={{ margin: 0, fontSize: '0.78rem', color: TDIM }}>
            Spotify vs. Apple Music · Amazon Music · YouTube Music
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 16, marginBottom: 12 }}>
          <ChartCard title="User Base — Paid Subscribers vs. Free-Tier Users" sub="Millions · 2024–2025" delay={0}>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={competitorSubs} margin={{ top: 8, right: 4, bottom: 0, left: 0 }}>
                <CartesianGrid {...grid} vertical={false} />
                <XAxis dataKey="platform" {...axis} />
                <YAxis {...axis} tickFormatter={v => `${v}M`} width={44} />
                <Tooltip contentStyle={TT} formatter={(v) => [`${v}M users`, '']} />
                <Legend wrapperStyle={{ color: TDIM, fontSize: 11 }} />
                <Bar dataKey="paidSubs" name="Paid Subscribers" stackId="a" fill={ACCENT} radius={[0,0,0,0]} animationDuration={1000} animationEasing="ease-out" />
                <Bar dataKey="freeSubs" name="Free-Tier Users"   stackId="a" fill={DIM}    radius={[5,5,0,0]} animationDuration={1200} animationEasing="ease-out" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Global Streaming Market Share" sub="% of revenue · MIDiA Research 2024" delay={80}>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={marketShare} cx="50%" cy="45%" innerRadius={60} outerRadius={88}
                  dataKey="share" nameKey="platform" animationDuration={1200}>
                  <Cell fill={ACCENT} />
                  <Cell fill="#e8e8f0" />
                  <Cell fill="#f97316" />
                  <Cell fill="#f87171" />
                  <Cell fill={MUTED} />
                </Pie>
                <Tooltip contentStyle={TT} formatter={(v) => [`${v}%`, '']} />
                <Legend wrapperStyle={{ color: TDIM, fontSize: 11 }} formatter={(v, e: any) => `${v} ${e.payload.share}%`} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <p style={{ margin: 0, fontSize: '0.68rem', color: TDIM, lineHeight: 1.6 }}>
          Sources: Spotify Q4 2025 Shareholder Deck · Apple Services disclosure (2023) · MIDiA Research Global Music Subscription Market Report 2024 ·
          Amazon Music and YouTube Music subscriber figures are industry estimates; neither company discloses standalone streaming financials.
        </p>
      </div>

    </section>
  )
}
