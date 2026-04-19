import { useState, useEffect } from 'react'

const acts = [
  { label: 'The Company',  href: '#company'  },
  { label: 'The Problem',  href: '#problem'  },
  { label: 'The Evidence', href: '#evidence' },
  { label: 'The Research', href: '#research' },
  { label: 'The Solution', href: '#solution' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive]     = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = acts.map(a => a.href.slice(1))
    const observer = new IntersectionObserver(
      entries => {
        const vis = entries.filter(e => e.isIntersecting)
        if (vis.length) setActive(vis[0].target.id)
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  return (
    <header
      style={{
        position:   'fixed',
        top: 0, left: 0, right: 0,
        zIndex:     100,
        padding:    '0 32px',
        height:     56,
        display:    'flex',
        alignItems: 'center',
        gap:        32,
        transition: 'background 0.3s ease, border-color 0.3s ease',
        background: scrolled ? 'rgba(17,17,19,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      {/* Logo */}
      <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
        <svg width="20" height="20" viewBox="0 0 168 168" fill="none">
          <circle cx="84" cy="84" r="84" fill="#1db954" />
          <path d="M120 107c-25-15-65-17-90-9-4 1-7-1-8-5s1-7 5-8c29-9 73-7 101 11 3 2 4 7 2 10s-7 4-10 1z" fill="#fff" />
          <path d="M131 84c-28-17-72-21-101-11-4 1-8-1-9-6s1-8 5-9c33-11 81-7 113 13 4 2 5 7 3 11s-7 5-11 2z" fill="#fff" />
          <path d="M122 62c-23-14-61-18-84-10-3 1-7-1-8-4s1-7 5-8c27-9 69-5 95 11 3 2 4 6 2 9s-7 4-10 2z" fill="#fff" />
        </svg>
        <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#f0f0f2', letterSpacing: '-0.02em' }}>
          Spotify Strategy
        </span>
      </a>

      {/* Act links */}
      <nav style={{ display: 'flex', gap: 4, marginLeft: 'auto' }}>
        {acts.map((act, i) => {
          const isActive = active === act.href.slice(1)
          return (
            <a
              key={act.href}
              href={act.href}
              style={{
                padding:        '5px 14px',
                borderRadius:   100,
                fontSize:       '0.8rem',
                fontWeight:     isActive ? 600 : 400,
                color:          isActive ? '#1db954' : '#8a8a96',
                textDecoration: 'none',
                background:     isActive ? 'rgba(29,185,84,0.1)' : 'transparent',
                border:         `1px solid ${isActive ? 'rgba(29,185,84,0.25)' : 'transparent'}`,
                transition:     'all 0.2s ease',
              }}
            >
              {act.label}
            </a>
          )
        })}
      </nav>
    </header>
  )
}
