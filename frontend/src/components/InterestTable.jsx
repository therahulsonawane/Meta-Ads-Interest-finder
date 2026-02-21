import { useState } from 'react'
import Badge from './Badge'

export default function InterestTable({ interests = [] }) {
  const [copiedId, setCopiedId] = useState(null)

  const handleCopy = (name, idx) => {
    navigator.clipboard.writeText(name).then(() => {
      setCopiedId(idx)
      setTimeout(() => setCopiedId(null), 2000)
    })
  }

  const formatAudience = (size) => {
    if (!size) return '—'
    if (size >= 1_000_000) return `${(size / 1_000_000).toFixed(1)}M`
    if (size >= 1_000) return `${(size / 1_000).toFixed(0)}K`
    return size.toString()
  }

  if (!interests.length) return null

  return (
    <div className="overflow-hidden rounded-xl border border-[#334155]">
      <table className="w-full">
        <thead>
          <tr className="bg-[#0F172A] border-b border-[#334155]">
            <th className="text-left text-xs font-semibold uppercase tracking-wider text-[#475569] px-4 py-3">Interest</th>
            <th className="text-left text-xs font-semibold uppercase tracking-wider text-[#475569] px-4 py-3">Audience</th>
            <th className="text-left text-xs font-semibold uppercase tracking-wider text-[#475569] px-4 py-3">Status</th>
            <th className="text-right text-xs font-semibold uppercase tracking-wider text-[#475569] px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#334155]/50">
          {interests.map((item, idx) => (
            <tr key={idx} className="group hover:bg-[#0F172A]/50 transition-colors duration-150">
              <td className="px-4 py-3 text-sm font-medium text-[#F1F5F9]">{item.name}</td>
              <td className="px-4 py-3 text-sm text-[#7C3AED] font-medium">{formatAudience(item.audience_size)}</td>
              <td className="px-4 py-3">
                <Badge variant={item.validated ? 'success' : 'error'}>
                  {item.validated ? 'Validated' : 'Failed'}
                </Badge>
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => handleCopy(item.name, idx)}
                  className="text-xs font-medium text-[#94A3B8] hover:text-[#F1F5F9] transition-colors"
                >
                  {copiedId === idx ? (
                    <span className="text-[#10B981]">✓ Copied</span>
                  ) : 'Copy'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
