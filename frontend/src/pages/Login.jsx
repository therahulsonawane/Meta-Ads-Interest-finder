import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { loginUser } from '../services/api'
import api from '../services/api'

const inp = {
  width: '100%',
  backgroundColor: '#0D1117',
  border: '1px solid rgba(255,255,255,0.08)',
  color: '#F1F5F9',
  fontSize: 14,
  borderRadius: 9,
  padding: '12px 14px',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: "'Inter', sans-serif",
  lineHeight: 1.5,
}

export default function Login() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const switchMode = (next) => {
    setMode(next)
    setForm({ email: '', password: '', confirmPassword: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) { toast.error('Please fill in all fields'); return }

    if (mode === 'register') {
      if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return }
      if (form.password !== form.confirmPassword) { toast.error('Passwords do not match'); return }
    }

    setLoading(true)
    try {
      let res
      if (mode === 'login') {
        res = await loginUser({ email: form.email, password: form.password })
      } else {
        res = await api.post('/auth/register', { email: form.email, password: form.password })
      }
      localStorage.setItem('token', res.data.access_token)
      toast.success(mode === 'login' ? 'Welcome back!' : 'Account created! Welcome to AdInterest Pro 🎉')
      navigate('/generator')
    } catch (err) {
      toast.error(err.response?.data?.detail || (mode === 'login' ? 'Invalid credentials' : 'Registration failed'))
    } finally {
      setLoading(false)
    }
  }

  const isRegister = mode === 'register'

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A0F1E', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: "'Inter', sans-serif", position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 500, background: 'radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 420, position: 'relative' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 28 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg, #2563EB, #7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(124,58,237,0.4)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
            </div>
            <span style={{ fontSize: 18, fontWeight: 700, color: '#F8FAFC', letterSpacing: '-0.01em' }}>AdInterest <span style={{ color: '#818CF8' }}>Pro</span></span>
          </Link>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#F8FAFC', margin: '0 0 6px', letterSpacing: '-0.02em' }}>
            {isRegister ? 'Create your account' : 'Welcome back'}
          </h1>
          <p style={{ fontSize: 14, color: '#4B5563', margin: 0 }}>
            {isRegister ? '50 free generations included' : 'Sign in to your account'}
          </p>
        </div>

        {/* Toggle tabs */}
        <div style={{ display: 'flex', backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 11, padding: 4, marginBottom: 20, gap: 4 }}>
          {['login', 'register'].map((m) => (
            <button key={m} onClick={() => switchMode(m)} style={{ flex: 1, fontSize: 13, fontWeight: mode === m ? 700 : 500, color: mode === m ? '#F1F5F9' : '#6B7280', backgroundColor: mode === m ? '#1E293B' : 'transparent', border: mode === m ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent', borderRadius: 8, padding: '9px 0', cursor: 'pointer', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.01em', transition: 'all 0.15s' }}>
              {m === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          ))}
        </div>

        {/* Card */}
        <div style={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 32, boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)' }}>
          <form onSubmit={handleSubmit}>

            <div style={{ marginBottom: 16 }}>
              <label htmlFor="email" style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#6B7280', marginBottom: 7, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Email</label>
              <input id="email" name="email" type="email" autoComplete="email" value={form.email} onChange={handleChange} placeholder="you@company.com" style={inp} />
            </div>

            <div style={{ marginBottom: isRegister ? 16 : 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 }}>
                <label htmlFor="password" style={{ fontSize: 11, fontWeight: 700, color: '#6B7280', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Password</label>
                {!isRegister && <button type="button" style={{ fontSize: 12, color: '#818CF8', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontWeight: 500 }}>Forgot password?</button>}
              </div>
              <input id="password" name="password" type="password" autoComplete={isRegister ? 'new-password' : 'current-password'} value={form.password} onChange={handleChange} placeholder={isRegister ? 'Min. 6 characters' : '••••••••••'} style={inp} />
            </div>

            {isRegister && (
              <div style={{ marginBottom: 24 }}>
                <label htmlFor="confirmPassword" style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#6B7280', marginBottom: 7, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Confirm Password</label>
                <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" value={form.confirmPassword} onChange={handleChange} placeholder="Re-enter password" style={inp} />
              </div>
            )}

            <button
              id={isRegister ? 'register-submit' : 'login-submit'}
              type="submit"
              disabled={loading}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'linear-gradient(135deg, #2563EB, #7C3AED)', color: 'white', fontWeight: 700, fontSize: 14, padding: '13px 0', borderRadius: 10, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.65 : 1, fontFamily: "'Inter', sans-serif", letterSpacing: '-0.01em', boxShadow: '0 4px 16px rgba(124,58,237,0.35)' }}
            >
              {loading
                ? <><div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.25)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />{isRegister ? 'Creating account...' : 'Signing in...'}</>
                : isRegister ? 'Create Free Account →' : 'Sign in to AdInterest Pro'
              }
            </button>
          </form>

          {isRegister && (
            <div style={{ marginTop: 18, padding: 12, backgroundColor: 'rgba(129,140,248,0.06)', border: '1px solid rgba(129,140,248,0.12)', borderRadius: 9 }}>
              <p style={{ fontSize: 12, color: '#818CF8', fontWeight: 600, margin: '0 0 4px' }}>✓ Free plan includes:</p>
              <p style={{ fontSize: 11, color: '#374151', margin: 0, lineHeight: 1.6 }}>5 generations/day · AI-powered interests · Meta validation</p>
            </div>
          )}
        </div>

        <p style={{ textAlign: 'center', fontSize: 12, color: '#1F2937', marginTop: 20 }}>
          By continuing you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  )
}
