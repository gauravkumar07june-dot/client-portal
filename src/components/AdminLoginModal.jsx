import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useAuth } from '../context/AuthContext.jsx'
import './AdminLoginModal.css'

function CloseIcon() {
  return (
    <svg className="login-close-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M5 5l10 10M15 5 5 15"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  )
}

function SpinnerIcon() {
  return (
    <svg className="login-submit-icon login-spinner" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle
        cx="10"
        cy="10"
        r="7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="35 12"
      />
    </svg>
  )
}

function AdminLoginModal({ open, onClose }) {
  const { signIn } = useAuth()
  const emailRef = useRef(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('idle') // idle | signing-in | error
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open) return
    setEmail('')
    setPassword('')
    setStatus('idle')
    setError('')
    const focusTimer = setTimeout(() => emailRef.current?.focus(), 50)
    return () => clearTimeout(focusTimer)
  }, [open])

  useEffect(() => {
    if (!open) return
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('signing-in')
    setError('')

    const { error: signInError } = await signIn(email, password)

    if (signInError) {
      setStatus('error')
      setError(signInError.message || 'Invalid email or password.')
      return
    }

    setStatus('idle')
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="login-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
        >
          <motion.div
            className="login-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Admin login"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="login-modal-header">
              <h2>Admin Login</h2>
              <button type="button" className="login-close" onClick={onClose} aria-label="Close">
                <CloseIcon />
              </button>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              <label className="login-field">
                <span>Email</span>
                <input
                  ref={emailRef}
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  disabled={status === 'signing-in'}
                  required
                />
              </label>
              <label className="login-field">
                <span>Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  disabled={status === 'signing-in'}
                  required
                />
              </label>

              {error && (
                <p className="login-error" role="alert">
                  {error}
                </p>
              )}

              <button type="submit" className="login-submit" disabled={status === 'signing-in'}>
                {status === 'signing-in' ? 'Signing in…' : 'Log In'}
                {status === 'signing-in' && <SpinnerIcon />}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AdminLoginModal
