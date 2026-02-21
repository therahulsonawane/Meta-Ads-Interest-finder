import { Link } from 'react-router-dom'

const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    badge: 'AI-Powered',
    title: 'AI-Generated Interests',
    description: 'GPT-4 analyzes your business profile and generates hyper-relevant Meta ad interests your competitors haven\'t found yet.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    badge: 'Real-Time',
    title: 'Meta API Validated',
    description: 'Every interest is verified against the Meta Marketing API in real time — no phantom audiences, no wasted budget.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    badge: 'Actionable',
    title: 'Audience Size Data',
    description: 'Know the exact reach potential of each interest before you spend a single dollar on your campaign.',
  },
]

export default function Landing() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A0F1E', display: 'flex', flexDirection: 'column', fontFamily: "'Inter', sans-serif" }}>

      {/* Navbar */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 56px', height: 68, borderBottom: '1px solid rgba(255,255,255,0.06)', backgroundColor: 'rgba(10,15,30,0.8)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: 'linear-gradient(135deg, #2563EB, #7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 16px rgba(124,58,237,0.4)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <span style={{ color: '#F8FAFC', fontWeight: 700, fontSize: 16, letterSpacing: '-0.01em' }}>AdInterest <span style={{ color: '#818CF8' }}>Pro</span></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link to="/login" style={{ color: '#94A3B8', fontSize: 14, textDecoration: 'none', padding: '8px 14px', borderRadius: 8, fontWeight: 500 }}>Sign in</Link>
          <Link to="/generator" style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)', color: 'white', fontSize: 14, fontWeight: 600, textDecoration: 'none', padding: '9px 20px', borderRadius: 9, boxShadow: '0 4px 14px rgba(124,58,237,0.35)' }}>
            Get started free →
          </Link>
        </div>
      </header>

      <main style={{ flex: 1 }}>

        {/* Hero */}
        <section style={{ padding: '96px 56px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 500, background: 'radial-gradient(ellipse, rgba(124,58,237,0.15) 0%, transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', maxWidth: 720, margin: '0 auto' }}>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: 'rgba(129,140,248,0.1)', border: '1px solid rgba(129,140,248,0.2)', borderRadius: 99, padding: '5px 14px 5px 8px', marginBottom: 36 }}>
              <div style={{ backgroundColor: '#818CF8', borderRadius: 99, padding: '2px 8px', fontSize: 11, fontWeight: 700, color: 'white', letterSpacing: '0.04em', textTransform: 'uppercase' }}>New</div>
              <span style={{ fontSize: 13, color: '#A5B4FC', fontWeight: 500 }}>GPT-4o powered interest scoring</span>
            </div>

            <h1 style={{ fontSize: 58, fontWeight: 800, color: '#F8FAFC', lineHeight: 1.1, margin: '0 0 22px', letterSpacing: '-0.03em' }}>
              Generate & Validate{' '}
              <span style={{ background: 'linear-gradient(135deg, #60A5FA 0%, #818CF8 50%, #A78BFA 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Meta Ad Interests
              </span>
              <br />in Seconds
            </h1>

            <p style={{ fontSize: 18, color: '#64748B', lineHeight: 1.75, margin: '0 auto 44px', maxWidth: 520, fontWeight: 400 }}>
              AI-powered targeting intelligence for performance marketers. Stop guessing — start winning.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
              <Link to="/generator" id="cta-start-generating" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #2563EB, #7C3AED)', color: 'white', textDecoration: 'none', fontWeight: 600, fontSize: 15, padding: '14px 28px', borderRadius: 11, boxShadow: '0 8px 32px rgba(124,58,237,0.4), 0 0 0 1px rgba(124,58,237,0.2)' }}>
                Start Generating Free
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#64748B', fontSize: 14, fontWeight: 500, textDecoration: 'none', padding: '14px 22px', borderRadius: 11, border: '1px solid rgba(255,255,255,0.08)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" /></svg>
                Watch demo
              </Link>
            </div>

            <p style={{ fontSize: 12, color: '#334155', marginTop: 20 }}>No credit card required · 50 free generations</p>
          </div>
        </section>

        {/* Social Proof Bar */}
        <section style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'rgba(255,255,255,0.02)', padding: '28px 56px' }}>
          <div style={{ maxWidth: 860, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, textAlign: 'center' }}>
            {[
              { value: '10K+', label: 'Interests generated', sub: 'across all campaigns' },
              { value: '98.4%', label: 'Validation accuracy', sub: 'vs. Meta API results' },
              { value: '5× faster', label: 'Research time', sub: 'than manual methods' },
            ].map((s, i) => (
              <div key={s.label} style={{ padding: '8px 32px', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <p style={{ fontSize: 30, fontWeight: 800, color: '#F8FAFC', margin: '0 0 2px', letterSpacing: '-0.02em' }}>{s.value}</p>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#94A3B8', margin: '0 0 2px' }}>{s.label}</p>
                <p style={{ fontSize: 11, color: '#334155', margin: 0 }}>{s.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section style={{ padding: '88px 56px', maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#818CF8', margin: '0 0 14px' }}>Why teams choose us</p>
            <h2 style={{ fontSize: 38, fontWeight: 800, color: '#F8FAFC', margin: '0 0 14px', letterSpacing: '-0.02em' }}>Built for performance marketers</h2>
            <p style={{ fontSize: 16, color: '#475569', maxWidth: 460, margin: '0 auto', lineHeight: 1.7 }}>Everything you need to dominate Meta ad targeting — without the guesswork.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
            {features.map((f) => (
              <div key={f.title} style={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 28, position: 'relative', overflow: 'hidden' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(129,140,248,0.3)'; e.currentTarget.style.boxShadow = '0 0 32px rgba(124,58,237,0.1)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow = 'none' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: 120, height: 120, background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 11, background: 'linear-gradient(135deg, rgba(37,99,235,0.2), rgba(124,58,237,0.2))', border: '1px solid rgba(129,140,248,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#818CF8' }}>
                    {f.icon}
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#818CF8', backgroundColor: 'rgba(129,140,248,0.1)', border: '1px solid rgba(129,140,248,0.15)', padding: '3px 10px', borderRadius: 99, letterSpacing: '0.03em' }}>{f.badge}</span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#F1F5F9', margin: '0 0 10px', letterSpacing: '-0.01em' }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.7, margin: 0 }}>{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '0 56px 96px' }}>
          <div style={{ maxWidth: 700, margin: '0 auto', background: 'linear-gradient(135deg, rgba(37,99,235,0.15), rgba(124,58,237,0.2))', border: '1px solid rgba(129,140,248,0.2)', borderRadius: 20, padding: '56px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 400, height: 300, background: 'radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#818CF8', margin: '0 0 14px', position: 'relative' }}>Get started today</p>
            <h2 style={{ fontSize: 34, fontWeight: 800, color: '#F8FAFC', margin: '0 0 12px', letterSpacing: '-0.02em', position: 'relative' }}>Ready to scale your Meta ads?</h2>
            <p style={{ fontSize: 15, color: '#64748B', margin: '0 auto 32px', maxWidth: 420, lineHeight: 1.7, position: 'relative' }}>Join hundreds of marketers finding winning audiences in seconds.</p>
            <Link to="/generator" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #2563EB, #7C3AED)', color: 'white', textDecoration: 'none', fontWeight: 600, fontSize: 15, padding: '13px 28px', borderRadius: 10, boxShadow: '0 8px 24px rgba(124,58,237,0.35)', position: 'relative' }}>
              Start Generating Free
            </Link>
          </div>
        </section>
      </main>

      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '22px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 22, height: 22, borderRadius: 6, background: 'linear-gradient(135deg, #2563EB, #7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#F8FAFC' }}>AdInterest Pro</span>
        </div>
        <p style={{ fontSize: 12, color: '#334155', margin: 0 }}>© 2026 AdInterest Pro · Not affiliated with Meta Platforms, Inc.</p>
      </footer>
    </div>
  )
}
