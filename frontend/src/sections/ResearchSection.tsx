import { useEffect, useRef, useState } from 'react'
import {
  PieChart, Pie, Cell, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import GlassCard from '../components/GlassCard'
import { reviewSentiment, reviewThemes, reviewQuotes, surveyQuotes, platformDist, switchTriggers } from '../data/survey'

const ACCENT = '#1db954'
const RED    = '#f87171'
const TDIM   = '#8a8a96'
const DIM    = '#155e30'

const TT: React.CSSProperties = {
  background:     'rgba(17,17,19,0.95)',
  border:         '1px solid rgba(255,255,255,0.1)',
  borderRadius:   12,
  color:          '#f0f0f2',
  fontSize:       12,
  padding:        '10px 14px',
  backdropFilter: 'blur(12px)',
}

function PhotoBanner({ photos }: { photos: string[] }) {
  const [idx, setIdx] = useState(0)
  const [fading, setFading] = useState(false)
  useEffect(() => {
    const t = setInterval(() => {
      setFading(true)
      setTimeout(() => { setIdx(i => (i + 1) % photos.length); setFading(false) }, 300)
    }, 4000)
    return () => clearInterval(t)
  }, [photos.length])
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 280, overflow: 'hidden' }}>
      <img src={photos[idx]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: fading ? 0 : 1, transition: 'opacity 0.3s ease' }} />
      <div style={{ position: 'absolute', bottom: 10, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 5 }}>
        {photos.map((_, i) => (
          <div key={i} onClick={() => setIdx(i)} style={{ width: i === idx ? 16 : 6, height: 6, borderRadius: 3, background: i === idx ? '#1db954' : 'rgba(255,255,255,0.35)', cursor: 'pointer', transition: 'all 0.3s ease' }} />
        ))}
      </div>
    </div>
  )
}

const JOEY_TRACKS = [
  '21msqzd8uIdW8h70Qrons4',
  '1bFHoHRxtKTVuLP0JAD29f',
  '6GMmNYjH4W43S6RepEqUmv',
  '6FjprKnX5Ed4yuqcQwZTdv',
]

function TrackPlayer() {
  const [idx, setIdx] = useState(0)
  return (
    <div>
      <iframe
        key={JOEY_TRACKS[idx]}
        src={`https://open.spotify.com/embed/track/${JOEY_TRACKS[idx]}?utm_source=generator&theme=0`}
        width="100%" height="80" frameBorder={0}
        allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy" style={{ borderRadius: 12, display: 'block' }}
      />
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 8 }}>
        {JOEY_TRACKS.map((_, i) => (
          <div key={i} onClick={() => setIdx(i)} style={{ width: i === idx ? 16 : 6, height: 6, borderRadius: 3, background: i === idx ? '#1db954' : 'rgba(255,255,255,0.2)', cursor: 'pointer', transition: 'all 0.3s ease' }} />
        ))}
      </div>
    </div>
  )
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.08 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return { ref, vis }
}

const experts = [
  {
    initials: 'EC',
    photo:    `${import.meta.env.BASE_URL}evan_craig.png`,
    name:     'Evan Craig',
    title:    'Music Producer & Artist Mentor',
    org:      'Off Planet Music · Audio Editing & Recording',
    date:     'April 9, 2026',
    medium:   'In-Person Interview',
    quotes: [
      "A lot of first-time artists I work with don't realize Spotify is the first real proof of concept — getting your song live there makes it tangible in a way a SoundCloud link never does.",
      "The networking side is underrated. Once you're on Spotify you're in a conversation with curators and labels. It's a credibility layer.",
      "Spotify for Artists gives emerging producers real data — who's listening and where. That shapes everything from touring to marketing.",
    ],
  },
  {
    initials: 'JD',
    photo:    `${import.meta.env.BASE_URL}jim_doser.png`,
    name:     'Jim Doser',
    title:    'Head Audio Engineer & Studio Manager',
    org:      'Complex Studios LA · U. of Wyoming, B.S. Music Theory',
    date:     'March 18, 2026',
    medium:   'Video Call',
    quotes: [
      "The -14 LUFS normalization is smart — it levels the playing field so a bedroom producer isn't buried next to a major-label master.",
      "The EQ presets give real control over sound. For a platform this size, that kind of audio flexibility is genuinely impressive.",
      "320kbps on Premium is the right ceiling. They've optimized for real-world listening, not the spec sheet.",
    ],
  },
  {
    initials: 'HL',
    photo:    `${import.meta.env.BASE_URL}hannah_lubell.png`,
    name:     'Hannah Lubell',
    title:    'Independent Musician & Cover Artist',
    org:      'Denver, CO',
    date:     'April 8, 2026',
    medium:   'In-Person Interview',
    quotes: [
      "Discover Weekly genuinely changed how I find music. I've found artists I love from countries I've never thought about before.",
      "I tried Apple Music for a month and came back. Three years of playlists and listening history is not something you just abandon.",
      "The price went up and I complained, then I renewed immediately. That tells you everything about how locked in I am.",
    ],
  },
  {
    initials: 'JF',
    photo:    `${import.meta.env.BASE_URL}joey_farrington.png`,
    photos:   [`${import.meta.env.BASE_URL}joey_dj1.png`, `${import.meta.env.BASE_URL}joey_dj2.png`],
    primary:  true,
    name:     'Joey Farrington',
    title:    'Music Producer & DJ',
    org:      'CSU · B.S. Economics & Music Theory',
    date:     'April 5, 2026',
    medium:   'In-Person Interview',
    quotes: [
      "Spotify is the first platform where I actually see royalty checks. It's not life-changing money yet, but it validates the work in a way SoundCloud never did.",
      "When I send my profile to a label or a venue, having Spotify numbers carries real weight. It's become a professional credential.",
      "I've had listeners from countries I've never been to find my music through playlists. That kind of reach is impossible to replicate independently.",
    ],
  },
]

const SENTIMENT_COLORS = ['#1db954', '#4a4a5a', '#f87171']

const transcripts = [
  {
    name: 'Joey Farrington',
    title: 'Music Producer & DJ · April 5, 2026 · In-Person',
    exchanges: [
      { q: 'How has Spotify changed the financial reality for independent artists like yourself?', a: "It's the first platform where I actually see a royalty check hit my account. It's not life-changing money yet, but it validates the work. SoundCloud would tell me how many plays I had, but Spotify converts that into something real. That matters psychologically and practically." },
      { q: 'Does your Spotify presence affect how industry professionals perceive you?', a: "A hundred percent. When I reach out to a label rep or a venue, the first thing they ask for is your Spotify link. Having real monthly listener numbers functions like a professional credential now. It signals you're not just posting tracks on the internet — you're a working artist." },
      { q: 'Has the platform impacted your geographic reach?', a: "Massively. I've had listeners from Brazil, Germany, the Philippines find my music through playlists. I've never toured those markets. The playlist ecosystem does that distribution work. That kind of reach used to require a label or a manager with international connections." },
    ],
  },
  {
    name: 'Evan Craig',
    title: 'Music Producer & Artist Mentor · April 9, 2026 · In-Person',
    exchanges: [
      { q: "What do you tell first-time artists about Spotify's role in their career?", a: "I tell them it's the first real proof of concept. Getting your song live on Spotify makes it tangible — it has an official presence, a stream count, it exists in the same catalog as artists they admire. It's the difference between feeling like a hobbyist and feeling like an artist." },
      { q: "You called Spotify a credibility layer. How does that affect industry networking?", a: "Once you're on Spotify, you're inside a conversation curators and label A&Rs are already having. They use it as a scouting tool. Your pitch now includes a streaming profile with growth trends and listener demographics. That's what opens doors — not demos sent over email." },
      { q: 'How do your clients use the Spotify for Artists analytics in practice?', a: "The data shapes real decisions. If 40% of your listeners are in Atlanta, you route your first tour through Atlanta. If a playlist adds you and you see a spike from Germany, you chase that market. Artists who ignore it are leaving money on the table." },
    ],
  },
  {
    name: 'Jim Doser',
    title: 'Head Audio Engineer & Studio Manager · March 18, 2026 · Video Call',
    exchanges: [
      { q: "From an engineering standpoint, how does Spotify's audio normalization affect what you master for?", a: "The -14 LUFS target is smart policy. It levels the playing field — a bedroom producer isn't getting buried by a major-label master slammed to -8 LUFS. It forces the industry toward better mastering decisions rather than loudness wars. Commercial releases have actually improved on average." },
      { q: "How do you compare Spotify's audio quality approach to competitors?", a: "The EQ presets are a genuine differentiator. Apple Music went lossless, which is technically superior, but most consumers can't tell the difference on typical headphones. Spotify optimized for real-world listening conditions, not benchmark specs. That's the pragmatic call." },
      { q: "What's your read on the 320kbps ceiling for Premium?", a: "It's the right call for where the market is. 320kbps is transparent for the vast majority of listening scenarios. Going lossless would balloon bandwidth costs without delivering perceptible benefit to 95% of users. They made the engineering choice that matches the actual use case." },
    ],
  },
  {
    name: 'Hannah Lubell',
    title: 'Independent Musician & Cover Artist · April 8, 2026 · In-Person',
    exchanges: [
      { q: "How has Spotify's discovery changed how you engage with music?", a: "Discover Weekly honestly changed my relationship with music. I've found artists from countries I'd never have encountered otherwise. The algorithm surfaces things that feel curated but also genuinely unexpected — it understands something about my taste that I couldn't articulate myself." },
      { q: 'Have you ever seriously considered switching platforms?', a: "I tried Apple Music for about a month and went back. People underestimate how much of yourself is embedded in Spotify after a few years — playlists you've built, listening history that shapes every recommendation. Leaving doesn't just mean switching apps, it means starting your musical identity over." },
      { q: "When Spotify raised prices, how did that affect your decision to stay?", a: "Honestly? I complained and then renewed immediately. When a price increase doesn't actually change your behavior, the product has real pricing power. They've built something where the switching cost exceeds the cost increase — at least for me, and I suspect for a lot of people." },
    ],
  },
]

export default function ResearchSection() {
  const header    = useReveal()
  const expertRef = useReveal()
  const customerRef = useReveal()
  const reviewRef = useReveal()
  const [transcriptOpen, setTranscriptOpen] = useState(false)

  return (
    <section id="research" className="section">

      {/* Header */}
      <div ref={header.ref} className={`reveal${header.vis ? ' visible' : ''}`} style={{ marginBottom: 56 }}>
        <h2 className="section-title">The Research</h2>
        <p className="section-sub">
          Four independent expert interviews, 18 customer interviews, and an AI-powered analysis of
          1,636 reviews and posts — primary research that validates the strategic case laid out above.
        </p>
      </div>

      {/* ── Expert Interviews ── */}
      <div ref={expertRef.ref} className={`reveal${expertRef.vis ? ' visible' : ''}`} style={{ marginBottom: 48 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <h3 style={{ margin: 0, fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', fontWeight: 800, color: '#f0f0f2', letterSpacing: '-0.03em' }}>
            Expert Interviews
          </h3>
          <span style={{ fontSize: '0.68rem', fontWeight: 600, color: TDIM, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '2px 10px' }}>
            March – April 2026
          </span>
        </div>

        {/* Joey — full-width featured card */}
        {experts.filter(e => (e as any).primary).map(e => (
          <GlassCard key={e.name} style={{ padding: 0, overflow: 'hidden', border: '1px solid rgba(29,185,84,0.45)', background: 'linear-gradient(160deg, rgba(29,185,84,0.08) 0%, rgba(29,185,84,0.02) 100%)', marginBottom: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', minHeight: 320 }}>
              {/* Left: cycling banner */}
              <PhotoBanner photos={(e as any).photos} />

              {/* Right: bio + quotes + embed */}
              <div style={{ padding: '28px 28px 24px', display: 'flex', flexDirection: 'column', gap: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <img src={(e as any).photo} alt={e.name} style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', border: '1px solid rgba(29,185,84,0.6)', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: '#f0f0f2', marginBottom: 2 }}>{e.name}</div>
                    <div style={{ fontSize: '0.72rem', color: TDIM, lineHeight: 1.4 }}>{e.title}</div>
                    <div style={{ fontSize: '0.72rem', color: TDIM }}>{e.org}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 600, color: TDIM, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '2px 8px' }}>{e.date}</span>
                  <span style={{ fontSize: '0.65rem', fontWeight: 600, color: TDIM, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '2px 8px' }}>{e.medium}</span>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                  {e.quotes.map((q, i) => (
                    <p key={i} style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-dim)', lineHeight: 1.65, fontStyle: 'italic', paddingLeft: 12, borderLeft: '2px solid rgba(29,185,84,0.6)' }}>"{q}"</p>
                  ))}
                </div>

                {/* Spotify tracks */}
                <TrackPlayer />
              </div>
            </div>
          </GlassCard>
        ))}

        {/* Other 3 experts */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {experts.filter(e => !(e as any).primary).map(e => (
            <GlassCard key={e.name} style={{ padding: 0, overflow: 'hidden' }}>
              {(e as any).photos && <PhotoBanner photos={(e as any).photos} />}
              <div style={{ padding: '24px 24px 28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                  {(e as any).photo ? (
                    <img src={(e as any).photo} alt={e.name} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: '1px solid rgba(29,185,84,0.35)', flexShrink: 0 }} />
                  ) : (
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(29,185,84,0.3), rgba(29,185,84,0.1))', border: '1px solid rgba(29,185,84,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: ACCENT, flexShrink: 0 }}>
                      {e.initials}
                    </div>
                  )}
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f0f0f2', marginBottom: 2 }}>{e.name}</div>
                    <div style={{ fontSize: '0.72rem', color: TDIM, lineHeight: 1.4 }}>{e.title}</div>
                    <div style={{ fontSize: '0.72rem', color: TDIM }}>{e.org}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6, marginBottom: 18 }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 600, color: TDIM, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '2px 8px' }}>{e.date}</span>
                  <span style={{ fontSize: '0.65rem', fontWeight: 600, color: TDIM, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '2px 8px' }}>{e.medium}</span>
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {e.quotes.map((q, i) => (
                    <p key={i} style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-dim)', lineHeight: 1.65, fontStyle: 'italic', paddingLeft: 12, borderLeft: '2px solid rgba(29,185,84,0.25)' }}>"{q}"</p>
                  ))}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
        {/* Transcript toggle */}
        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={() => setTranscriptOpen(o => !o)}
            style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '5px 16px', fontSize: '0.7rem', color: TDIM, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, transition: 'border-color 0.2s, color 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(29,185,84,0.4)'; (e.currentTarget as HTMLButtonElement).style.color = '#c0c0cc' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLButtonElement).style.color = TDIM }}
          >
            <span style={{ fontSize: '0.6rem', transition: 'transform 0.3s', display: 'inline-block', transform: transcriptOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
            {transcriptOpen ? 'Hide' : 'View'} Interview Transcripts
          </button>
        </div>

        {/* Transcript panel */}
        {transcriptOpen && (
          <div style={{ marginTop: 16, borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 24, display: 'flex', flexDirection: 'column', gap: 28 }}>
            <p style={{ margin: '0 0 8px', fontSize: '0.65rem', color: TDIM, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
              Condensed Interview Transcripts
            </p>
            {transcripts.map(t => (
              <div key={t.name}>
                <div style={{ marginBottom: 14 }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#e0e0e8' }}>{t.name}</span>
                  <span style={{ fontSize: '0.68rem', color: TDIM, marginLeft: 10 }}>{t.title}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {t.exchanges.map((ex, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '14px 1fr', gap: '4px 10px', fontSize: '0.75rem', lineHeight: 1.6 }}>
                      <span style={{ color: ACCENT, fontWeight: 700, paddingTop: 1 }}>Q</span>
                      <span style={{ color: '#9a9aac', fontStyle: 'italic' }}>{ex.q}</span>
                      <span style={{ color: TDIM, fontWeight: 700, paddingTop: 1 }}>A</span>
                      <span style={{ color: '#c8c8d8' }}>{ex.a}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Customer Research ── */}
      <div ref={customerRef.ref} className={`reveal${customerRef.vis ? ' visible' : ''}`} style={{ marginBottom: 48 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <h3 style={{ margin: 0, fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', fontWeight: 800, color: '#f0f0f2', letterSpacing: '-0.03em' }}>
            Customer Interviews
          </h3>
          <span style={{ fontSize: '0.68rem', fontWeight: 600, color: TDIM, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '2px 10px' }}>
            18 interviews · April 2026
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <GlassCard style={{ padding: '28px 24px' }}>
            <h4 style={{ margin: '0 0 6px', fontSize: '0.88rem', fontWeight: 700, color: '#f0f0f2' }}>Platform Distribution</h4>
            <p style={{ margin: '0 0 16px', fontSize: '0.72rem', color: TDIM }}>Primary music platform</p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={platformDist} cx="50%" cy="45%" innerRadius={55} outerRadius={80}
                  dataKey="value" nameKey="name" animationDuration={1200}>
                  <Cell key="spotify"    fill={ACCENT} />
                  <Cell key="apple"      fill="#e8e8f0" />
                  <Cell key="both"       fill={DIM} />
                </Pie>
                <Tooltip contentStyle={TT} formatter={(v) => [`${v}%`, '']} />
                <Legend wrapperStyle={{ color: TDIM, fontSize: 11 }} formatter={(v, e: any) => `${v} ${e.payload.value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </GlassCard>

          <GlassCard style={{ padding: '28px 24px' }}>
            <h4 style={{ margin: '0 0 6px', fontSize: '0.88rem', fontWeight: 700, color: '#f0f0f2' }}>What Would Make You Switch?</h4>
            <p style={{ margin: '0 0 16px', fontSize: '0.72rem', color: TDIM }}>Switch triggers — Spotify users</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={switchTriggers} layout="vertical" margin={{ top: 4, right: 16, bottom: 0, left: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis type="number" stroke="#3a3a44" tick={{ fill: TDIM, fontSize: 11 }} allowDecimals={false} />
                <YAxis type="category" dataKey="label" stroke="#3a3a44" tick={{ fill: TDIM, fontSize: 10 }} width={148} />
                <Tooltip contentStyle={TT} formatter={(v) => [`${v} respondents`, '']} />
                <Bar dataKey="count" name="Respondents" fill={ACCENT} radius={[0, 5, 5, 0]} animationDuration={1000} />
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>
        </div>

        {/* Selected quotes */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {surveyQuotes.map((q, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '16px 20px' }}>
              <p style={{ margin: '0 0 8px', fontSize: '0.82rem', color: '#e0e0e8', lineHeight: 1.6, fontStyle: 'italic' }}>"{q.text}"</p>
              <span style={{ fontSize: '0.68rem', color: TDIM, fontWeight: 600 }}>— {q.attr}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Review Analysis ── */}
      <div ref={reviewRef.ref} className={`reveal${reviewRef.vis ? ' visible' : ''}`}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <h3 style={{ margin: 0, fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', fontWeight: 800, color: '#f0f0f2', letterSpacing: '-0.03em' }}>
            Review Analysis
          </h3>
          <span style={{ fontSize: '0.68rem', fontWeight: 600, color: TDIM, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '2px 10px' }}>
            1,247 App Store reviews + 389 Reddit posts · Claude API · April 2026
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16, marginBottom: 16 }}>
          <GlassCard style={{ padding: '28px 24px' }}>
            <h4 style={{ margin: '0 0 6px', fontSize: '0.88rem', fontWeight: 700, color: '#f0f0f2' }}>Overall Sentiment</h4>
            <p style={{ margin: '0 0 16px', fontSize: '0.72rem', color: TDIM }}>1,636 sources analyzed</p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={reviewSentiment} cx="50%" cy="45%" innerRadius={55} outerRadius={80}
                  dataKey="value" nameKey="name" animationDuration={1200}>
                  {reviewSentiment.map((_, i) => (
                    <Cell key={i} fill={SENTIMENT_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={TT} formatter={(v) => [`${v}%`, '']} />
                <Legend wrapperStyle={{ color: TDIM, fontSize: 11 }} formatter={(v, e: any) => `${v} ${e.payload.value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </GlassCard>

          <GlassCard style={{ padding: '28px 24px' }}>
            <h4 style={{ margin: '0 0 6px', fontSize: '0.88rem', fontWeight: 700, color: '#f0f0f2' }}>Top Themes by Mention Volume</h4>
            <p style={{ margin: '0 0 16px', fontSize: '0.72rem', color: TDIM }}>Green = positive · Red = negative</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={reviewThemes} layout="vertical" margin={{ top: 4, right: 16, bottom: 0, left: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis type="number" stroke="#3a3a44" tick={{ fill: TDIM, fontSize: 11 }} />
                <YAxis type="category" dataKey="theme" stroke="#3a3a44" tick={{ fill: TDIM, fontSize: 10 }} width={200} />
                <Tooltip contentStyle={TT} formatter={(v) => [`${v} mentions`, '']} />
                <Bar dataKey="count" name="Mentions" radius={[0, 5, 5, 0]} animationDuration={1000}>
                  {reviewThemes.map((entry, i) => (
                    <Cell key={i} fill={entry.sentiment === 'positive' ? ACCENT : RED} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>
        </div>

        {/* Review quotes */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 40 }}>
          {reviewQuotes.map((q, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '16px 20px' }}>
              <p style={{ margin: '0 0 8px', fontSize: '0.82rem', color: '#e0e0e8', lineHeight: 1.6, fontStyle: 'italic' }}>"{q.text}"</p>
              <span style={{ fontSize: '0.68rem', color: TDIM, fontWeight: 600 }}>— {q.source}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Research synthesis */}
      <GlassCard style={{ margin: '8px 0 0', padding: '40px 48px', borderLeft: '4px solid var(--accent)', background: 'linear-gradient(135deg, rgba(29,185,84,0.07) 0%, rgba(29,185,84,0.02) 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -20, right: 32, fontSize: '10rem', fontWeight: 900, color: 'rgba(29,185,84,0.06)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>♪</div>
        <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--accent)', margin: '0 0 20px' }}>
          What the Research Converges On
        </h2>
        <p style={{ fontSize: '1rem', color: 'var(--text)', lineHeight: 1.75, maxWidth: 780, margin: '0 0 14px', fontWeight: 500 }}>
          Spotify's personalization engine and ecosystem lock-in are genuinely valued — experts and users alike treat switching as a real cost, not just an inconvenience. At the same time, the creator side consistently surfaced the same theme: Spotify's platform data and credibility infrastructure have real leverage that isn't yet fully monetized.
        </p>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-dim)', lineHeight: 1.75, maxWidth: 780, margin: 0 }}>
          The advertising gap isn't a product failure — it's a deliberate under-investment that the data suggests users would tolerate closing, if done without degrading the experience. These findings directly inform the recommendations that follow.
        </p>
      </GlassCard>

    </section>
  )
}
