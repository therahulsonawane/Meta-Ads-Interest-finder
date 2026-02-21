import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { generateInterests } from '../services/api'
import InterestCard from '../components/InterestCard'
import Loader from '../components/Loader'

const CATEGORIES = [
  { key: 'core', label: 'Core Interests', color: '#818CF8' },
  { key: 'competitor', label: 'Competitor Interests', color: '#34D399' },
  { key: 'behavioral', label: 'Behavioral', color: '#F59E0B' },
  { key: 'psychological', label: 'Psychological', color: '#F472B6' },
]

const initialForm = { business_type: '', location: '', age_range: '', price_range: '', audience_description: '', competitors: '' }

const inp = { width: '100%', backgroundColor: '#0D1117', border: '1px solid rgba(255,255,255,0.07)', color: '#F1F5F9', fontSize: 13, borderRadius: 8, padding: '10px 12px', outline: 'none', boxSizing: 'border-box', fontFamily: "'Inter', sans-serif", lineHeight: 1.5 }

export default function Generator() {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.business_type.trim()) { toast.error('Business type is required'); return }
    setLoading(true); setError(null); setResults(null)
    try {
      const res = await generateInterests(form)
      setResults(res.data)
      toast.success('Interests generated successfully!')
    } catch (err) {
      const msg = err.response?.data?.detail || 'Failed to generate interests. Please try again.'
      setError(msg); toast.error(msg)
    } finally { setLoading(false) }
  }

  const totalCount = results ? Object.values(results).flat().length : 0

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', fontFamily: "'Inter', sans-serif" }}>

      {/* Page header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#F8FAFC', margin: '0 0 4px', letterSpacing: '-0.02em' }}>Interest Generator</h1>
        <p style={{ fontSize: 13, color: '#4B5563', margin: 0 }}>Describe your product and audience — AI will return validated Meta targeting interests.</p>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }}>

        {/* — Form Card — */}
        <div style={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden' }}>
          {/* Card header */}
          <div style={{ padding: '18px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'linear-gradient(135deg, #2563EB, #818CF8)', boxShadow: '0 0 6px rgba(129,140,248,0.5)' }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: '#F1F5F9', letterSpacing: '-0.01em' }}>Campaign Details</span>
            </div>
            <button onClick={() => { setForm(initialForm); setResults(null); setError(null) }} style={{ fontSize: 12, color: '#374151', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: "'Inter', sans-serif" }}>
              Clear all
            </button>
          </div>

          {/* Form body */}
          <form onSubmit={handleSubmit} style={{ padding: 24 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
              <FF label="Business Type" id="business_type" name="business_type" value={form.business_type} onChange={handleChange} placeholder="e.g. Fitness apparel brand" required />
              <FF label="Target Location" id="location" name="location" value={form.location} onChange={handleChange} placeholder="e.g. United States" />
              <FF label="Age Range" id="age_range" name="age_range" value={form.age_range} onChange={handleChange} placeholder="e.g. 25–44" />
              <FF label="Price Range" id="price_range" name="price_range" value={form.price_range} onChange={handleChange} placeholder="e.g. $50–$150" />
            </div>

            <div style={{ marginBottom: 14 }}>
              <label htmlFor="audience_description" style={{ display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#4B5563', marginBottom: 7 }}>Audience Description</label>
              <textarea id="audience_description" name="audience_description" value={form.audience_description} onChange={handleChange} rows={3} placeholder="Describe your ideal customer — lifestyle, values, pain points, income level..." style={{ ...inp, resize: 'none' }} />
            </div>

            <FF label="Competitors" id="competitors" name="competitors" value={form.competitors} onChange={handleChange} placeholder="e.g. Nike, Gymshark, Lululemon" />

            <button id="generate-submit" type="submit" disabled={loading} style={{ width: '100%', marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: loading ? 'rgba(37,99,235,0.4)' : 'linear-gradient(135deg, #2563EB, #7C3AED)', color: 'white', fontWeight: 700, fontSize: 14, padding: '13px 0', borderRadius: 10, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.01em', boxShadow: loading ? 'none' : '0 4px 16px rgba(124,58,237,0.35)', transition: 'all 0.2s' }}>
              {loading
                ? <><div style={{ width: 15, height: 15, border: '2px solid rgba(255,255,255,0.2)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} /> Generating...</>
                : <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg> Generate Interests</>
              }
            </button>
          </form>
        </div>

        {/* — Results Card — */}
        <div style={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, minHeight: 480, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Card header */}
          <div style={{ padding: '18px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: results ? '#34D399' : '#374151' }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: '#F1F5F9', letterSpacing: '-0.01em' }}>Generated Interests</span>
            </div>
            {results && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 12, color: '#818CF8', fontWeight: 600, backgroundColor: 'rgba(129,140,248,0.1)', padding: '3px 10px', borderRadius: 99 }}>{totalCount} interests</span>
                <button onClick={() => { navigator.clipboard.writeText(Object.values(results).flat().map(i => i.name).join('\n')); toast.success('All copied!') }} style={{ fontSize: 12, fontWeight: 600, color: '#4B5563', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>Copy all</button>
              </div>
            )}
          </div>

          {/* Body */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column' }}>
            {/* Empty */}
            {!loading && !results && !error && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '32px 20px' }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, background: 'linear-gradient(135deg, rgba(37,99,235,0.12), rgba(124,58,237,0.18))', border: '1px solid rgba(129,140,248,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                </div>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#F1F5F9', margin: '0 0 6px', letterSpacing: '-0.01em' }}>Generated interests will appear here.</p>
                <p style={{ fontSize: 13, color: '#374151', margin: 0 }}>Fill in the form on the left and click Generate</p>
              </div>
            )}

            {loading && <Loader text="AI is generating & validating interests..." />}

            {error && !loading && (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 12, padding: '24px 28px', textAlign: 'center', maxWidth: 300 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#F87171', margin: '0 0 8px' }}>Generation failed</p>
                  <p style={{ fontSize: 13, color: '#6B7280', margin: '0 0 16px', lineHeight: 1.6 }}>{error}</p>
                  <button onClick={() => setError(null)} style={{ fontSize: 13, color: '#818CF8', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>Try again</button>
                </div>
              </div>
            )}

            {results && !loading && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {CATEGORIES.map((cat) => {
                  const items = results[cat.key] || []
                  if (!items.length) return null
                  return (
                    <div key={cat.key}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                        <div style={{ width: 3, height: 14, borderRadius: 99, backgroundColor: cat.color }} />
                        <h3 style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em', color: '#6B7280', margin: 0 }}>{cat.label}</h3>
                        <span style={{ fontSize: 11, fontWeight: 700, color: cat.color, backgroundColor: `${cat.color}18`, padding: '2px 8px', borderRadius: 99 }}>{items.length}</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {items.map((interest, i) => <InterestCard key={i} interest={interest} accentColor={cat.color} />)}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function FF({ label, id, name, value, onChange, placeholder, required }) {
  return (
    <div>
      <label htmlFor={id} style={{ display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#4B5563', marginBottom: 7 }}>{label}{required && <span style={{ color: '#818CF8', marginLeft: 3 }}>*</span>}</label>
      <input id={id} name={name} type="text" value={value} onChange={onChange} placeholder={placeholder} required={required} style={inp} />
    </div>
  )
}
