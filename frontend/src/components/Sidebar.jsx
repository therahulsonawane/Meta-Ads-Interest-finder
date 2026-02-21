import { Link, useLocation } from 'react-router-dom'

const navItems = [
  {
    to: '/generator',
    label: 'Generator',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
  },
  {
    to: '/dashboard',
    label: 'Dashboard',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>,
  },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <aside style={{ width: 216, backgroundColor: '#111827', borderRight: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', padding: '20px 12px', minHeight: 'calc(100vh - 64px)', flexShrink: 0 }}>
      <div>
        <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#374151', padding: '4px 10px', marginBottom: 6 }}>Menu</p>
        {navItems.map((item) => {
          const isActive = location.pathname === item.to
          return (
            <Link key={item.to} to={item.to} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: isActive ? 600 : 500, color: isActive ? '#F1F5F9' : '#6B7280', backgroundColor: isActive ? 'rgba(129,140,248,0.12)' : 'transparent', border: isActive ? '1px solid rgba(129,140,248,0.2)' : '1px solid transparent', marginBottom: 2, letterSpacing: '-0.01em' }}>
              <span style={{ color: isActive ? '#818CF8' : '#4B5563' }}>{item.icon}</span>
              {item.label}
              {isActive && <div style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', backgroundColor: '#818CF8' }} />}
            </Link>
          )
        })}
      </div>

      <div style={{ marginTop: 'auto' }}>
        <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(129,140,248,0.15)', background: 'linear-gradient(135deg, rgba(37,99,235,0.12), rgba(124,58,237,0.18))' }}>
          <div style={{ padding: '16px 14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#818CF8' }} />
              <p style={{ fontSize: 12, fontWeight: 700, color: '#F1F5F9', margin: 0 }}>Pro Plan</p>
            </div>
            <p style={{ fontSize: 11, color: '#6B7280', margin: '0 0 12px', lineHeight: 1.5 }}>Unlimited generations & API validation</p>
            <button style={{ width: '100%', fontSize: 12, fontWeight: 700, background: 'linear-gradient(135deg, #2563EB, #7C3AED)', color: 'white', border: 'none', padding: '9px 0', borderRadius: 8, cursor: 'pointer', letterSpacing: '0.01em', fontFamily: 'Inter, sans-serif', boxShadow: '0 2px 8px rgba(124,58,237,0.3)' }}>
              Upgrade — $49/mo
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
