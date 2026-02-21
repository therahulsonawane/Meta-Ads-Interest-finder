export default function Badge({ variant = 'success', children }) {
  const variants = {
    success: 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30',
    error: 'bg-[#EF4444]/15 text-[#EF4444] border-[#EF4444]/30',
    pending: 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30',
    accent: 'bg-[#7C3AED]/15 text-[#7C3AED] border-[#7C3AED]/30',
  }

  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${variants[variant]}`}>
      {variant === 'success' && (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
      {variant === 'error' && (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      )}
      {children}
    </span>
  )
}
