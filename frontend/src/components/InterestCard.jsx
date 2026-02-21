import { useState } from 'react'

export default function InterestCard({ interest, accentColor = '#818CF8' }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(interest.name).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const formatAudience = (size) => {
    if (!size) return null
    if (size >= 1_000_000) return `${(size / 1_000_000).toFixed(1)}M`
    if (size >= 1_000) return `${Math.round(size / 1_000)}K`
    return size.toString()
  }

  const aud = formatAudience(interest.audience_size)

  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '10px 14px', backgroundColor: '#0D1117', borderRadius: 9, border: '1px solid rgba(255,255,255,0.06)', gap: 10 }}
      onMouseEnter={e => e.currentTarget.style.borderColor = `${accentColor}30`}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}>

      {/* Left: Name + audience */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#F1F5F9', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', letterSpacing: '-0.01em' }}>{interest.name}</p>
        {aud && <p style={{ fontSize: 11, color: '#374151', margin: '2px 0 0' }}>Audience: <span style={{ color: accentColor, fontWeight: 700 }}>{aud}</span></p>}
      </div>

      {/* Status badge */}
      <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 99, flexShrink: 0,
        backgroundColor: interest.validated ? 'rgba(52,211,153,0.1)' : 'rgba(248,113,113,0.1)',
        color: interest.validated ? '#34D399' : '#F87171',
        border: `1px solid ${interest.validated ? 'rgba(52,211,153,0.2)' : 'rgba(248,113,113,0.2)'}`,
      }}>
        {interest.validated ? '✓ Valid' : '✗ Failed'}
      </span>

      {/* Copy button */}
      <button onClick={handleCopy} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 600, padding: '5px 10px', borderRadius: 7, border: '1px solid rgba(255,255,255,0.07)', backgroundColor: '#111827', cursor: 'pointer', fontFamily: "'Inter', sans-serif", color: copied ? '#34D399' : '#6B7280', flexShrink: 0, transition: 'color 0.15s' }}>
        {copied ? (
          <><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg> Copied!</>
        ) : (
          <><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg> Copy</>
        )}
      </button>
    </div>
  )
}
