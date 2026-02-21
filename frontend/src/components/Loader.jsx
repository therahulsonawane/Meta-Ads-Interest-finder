export default function Loader({ size = 'md', text = 'Generating interests...' }) {
  const dim = size === 'sm' ? 20 : size === 'lg' ? 56 : 40

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '48px 20px' }}>
      <div style={{ position: 'relative', width: dim, height: dim }}>
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: '50%',
          border: `3px solid #1E3A8A`,
          borderTopColor: '#7C3AED',
          animation: 'spin 0.8s linear infinite',
        }} />
        <div style={{
          position: 'absolute', inset: 4,
          borderRadius: '50%',
          border: `2px solid rgba(124,58,237,0.15)`,
          borderTopColor: 'transparent',
          animation: 'spin 1.4s linear infinite reverse',
        }} />
      </div>
      {text && (
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 13, fontWeight: 500, color: '#94A3B8', margin: '0 0 8px' }}>{text}</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 5 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#7C3AED', animation: `bounce 0.9s ease-in-out infinite`, animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
