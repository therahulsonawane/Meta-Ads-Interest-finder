import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()

  return (
    <header style={{
      height: 64,
      backgroundColor: 'rgba(17,24,39,0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 28px',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #2563EB, #7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 12px rgba(124,58,237,0.35)' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        </div>
        <span style={{ color: '#F8FAFC', fontWeight: 700, fontSize: 15, letterSpacing: '-0.01em' }}>AdInterest <span style={{ color: '#818CF8' }}>Pro</span></span>
      </Link>

      <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <NavLink to="/generator" current={location.pathname}>Generator</NavLink>
        <NavLink to="/dashboard" current={location.pathname}>Dashboard</NavLink>
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Link to="/login" style={{ fontSize: 13, color: '#64748B', textDecoration: 'none', padding: '7px 12px', borderRadius: 7, fontWeight: 500 }}>Sign in</Link>
        <Link to="/generator" style={{ fontSize: 13, fontWeight: 600, background: 'linear-gradient(135deg, #2563EB, #7C3AED)', color: 'white', textDecoration: 'none', padding: '8px 16px', borderRadius: 8, boxShadow: '0 2px 8px rgba(124,58,237,0.3)' }}>
          Get started
        </Link>
      </div>
    </header>
  )
}

function NavLink({ to, current, children }) {
  const isActive = current === to
  return (
    <Link to={to} style={{
      fontSize: 13,
      padding: '7px 13px',
      borderRadius: 7,
      textDecoration: 'none',
      fontWeight: isActive ? 600 : 500,
      color: isActive ? '#F1F5F9' : '#64748B',
      backgroundColor: isActive ? 'rgba(129,140,248,0.1)' : 'transparent',
      transition: 'all 0.15s',
      letterSpacing: '-0.01em',
    }}>
      {children}
    </Link>
  )
}
