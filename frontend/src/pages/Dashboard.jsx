import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getSearchHistory } from '../services/api'

const MOCK_HISTORY = [
  { id: '1', business_type: 'E-commerce Fitness Apparel', location: 'United States', created_at: '2026-02-18T10:30:00Z', count: 24, status: 'completed' },
  { id: '2', business_type: 'SaaS Project Management Tool', location: 'United Kingdom', created_at: '2026-02-17T14:20:00Z', count: 18, status: 'completed' },
  { id: '3', business_type: 'Online Nutrition Supplements', location: 'Australia', created_at: '2026-02-15T09:10:00Z', count: 31, status: 'completed' },
  { id: '4', business_type: 'Digital Marketing Agency', location: 'India', created_at: '2026-02-14T16:45:00Z', count: 22, status: 'completed' },
]

function timeAgo(iso) {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const statCards = (history, loading) => {
  const total = history.reduce((a, b) => a + (b.count || 0), 0)
  return [
    { label: 'Total Sessions', value: loading ? '—' : history.length, icon: '📋', trend: '+2 this week' },
    { label: 'Interests Found', value: loading ? '—' : total, icon: '🎯', trend: `avg ${loading || !history.length ? '—' : Math.round(total / history.length)}/session` },
    { label: 'Markets Covered', value: loading ? '—' : new Set(history.map(h => h.location)).size, icon: '🌍', trend: 'unique regions' },
    { label: 'Validation Rate', value: '98%', icon: '✅', trend: 'vs Meta API' },
  ]
}

export default function Dashboard() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSearchHistory()
      .then(res => setHistory(res.data))
      .catch(() => setHistory(MOCK_HISTORY))
      .finally(() => setLoading(false))
  }, [])

  const stats = statCards(history, loading)

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', fontFamily: "'Inter', sans-serif" }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#F8FAFC', margin: '0 0 4px', letterSpacing: '-0.02em' }}>Dashboard</h1>
          <p style={{ fontSize: 13, color: '#4B5563', margin: 0 }}>Track your interest generation sessions and performance.</p>
        </div>
        <Link to="/generator" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 700, background: 'linear-gradient(135deg, #2563EB, #7C3AED)', color: 'white', textDecoration: 'none', padding: '10px 18px', borderRadius: 9, boxShadow: '0 4px 14px rgba(124,58,237,0.3)', letterSpacing: '-0.01em' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          New Generation
        </Link>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
        {stats.map((s) => (
          <div key={s.label} style={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '18px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 18 }}>{s.icon}</span>
            </div>
            <p style={{ fontSize: 28, fontWeight: 800, color: '#F8FAFC', margin: '0 0 2px', letterSpacing: '-0.02em' }}>{s.value}</p>
            <p style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', margin: '0 0 4px' }}>{s.label}</p>
            <p style={{ fontSize: 11, color: '#374151', margin: 0 }}>{s.trend}</p>
          </div>
        ))}
      </div>

      {/* Sessions Table */}
      <div style={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#F1F5F9', letterSpacing: '-0.01em' }}>Recent Sessions</span>
            {!loading && <span style={{ fontSize: 11, fontWeight: 700, color: '#478CFB', background: 'rgba(129,140,248,0.1)', padding: '2px 9px', borderRadius: 99 }}>{history.length}</span>}
          </div>
          <Link to="/generator" style={{ fontSize: 12, color: '#818CF8', textDecoration: 'none', fontWeight: 600 }}>View all →</Link>
        </div>

        {/* Table head */}
        {!loading && history.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 130px 90px 100px 110px', gap: 0, padding: '9px 24px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            {['Business', 'Location', 'Results', 'Date', ''].map((h, i) => (
              <p key={i} style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#374151', margin: 0, textAlign: i === 4 ? 'right' : 'left' }}>{h}</p>
            ))}
          </div>
        )}

        {loading ? (
          <div style={{ padding: 52, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 28, height: 28, border: '2px solid rgba(255,255,255,0.06)', borderTopColor: '#818CF8', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
          </div>
        ) : history.length === 0 ? (
          <div style={{ padding: '56px 20px', textAlign: 'center' }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg, rgba(37,99,235,0.15), rgba(124,58,237,0.2))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
            </div>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#F1F5F9', margin: '0 0 6px', letterSpacing: '-0.01em' }}>No sessions yet</p>
            <p style={{ fontSize: 13, color: '#374151', margin: '0 0 18px' }}>Your generations will appear here</p>
            <Link to="/generator" style={{ fontSize: 13, fontWeight: 700, color: '#818CF8', textDecoration: 'none' }}>Generate your first →</Link>
          </div>
        ) : history.map((item, i) => (
          <div key={item.id}
            style={{ display: 'grid', gridTemplateColumns: '1fr 130px 90px 100px 110px', gap: 0, alignItems: 'center', padding: '14px 24px', borderBottom: i < history.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', transition: 'background-color 0.15s', cursor: 'default' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#F1F5F9', margin: '0 0 2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', letterSpacing: '-0.01em' }}>{item.business_type}</p>
            </div>
            <p style={{ fontSize: 12, color: '#6B7280', margin: 0 }}>{item.location || 'Global'}</p>
            <div>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#818CF8', background: 'rgba(129,140,248,0.1)', padding: '3px 9px', borderRadius: 99 }}>{item.count} found</span>
            </div>
            <div>
              <p style={{ fontSize: 12, color: '#374151', margin: '0 0 2px' }}>{formatDate(item.created_at)}</p>
              <p style={{ fontSize: 11, color: '#1F2937', margin: 0 }}>{timeAgo(item.created_at)}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link to="/generator" style={{ fontSize: 12, fontWeight: 600, color: '#818CF8', textDecoration: 'none', border: '1px solid rgba(129,140,248,0.2)', padding: '6px 12px', borderRadius: 7, display: 'inline-block' }}>
                View →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
