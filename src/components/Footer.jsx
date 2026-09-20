import { useState } from 'react'
import siteConfig from '../config/site.js'
import { useAuth } from '../context/AuthContext.jsx'
import AdminLoginModal from './AdminLoginModal.jsx'
import './Footer.css'

const SOCIAL_ICON_PATHS = {
  linkedin:
    'M4.5 3.5a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5ZM3 8.75h3V17H3V8.75Zm5.5 0h2.88v1.14h.04c.4-.75 1.38-1.55 2.83-1.55 3.02 0 3.58 1.99 3.58 4.57V17h-3v-3.63c0-.87-.02-1.98-1.21-1.98-1.21 0-1.4.94-1.4 1.92V17h-3V8.75Z',
  instagram:
    'M7 3h6a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm0 1.6A2.4 2.4 0 0 0 4.6 7v6A2.4 2.4 0 0 0 7 15.4h6a2.4 2.4 0 0 0 2.4-2.4V7A2.4 2.4 0 0 0 13 4.6H7Zm3 2.65a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5Zm0 1.6a2.15 2.15 0 1 0 0 4.3 2.15 2.15 0 0 0 0-4.3Zm3.9-2.25a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8Z',
  x: 'M4 3h3.3l3.1 4.15L13.8 3H16l-4.9 6.4L16.4 17h-3.3l-3.5-4.65L5.6 17H3.4l5.3-6.9L4 3Z',
  facebook:
    'M12 4H10a3 3 0 0 0-3 3v2H5v3h2v7h3v-7h2.2l.4-3H10V7c0-.4.2-.7.8-.7H12V4Z',
}

function SocialIcon({ id }) {
  const path = SOCIAL_ICON_PATHS[id]
  if (!path) return null
  return (
    <svg className="footer-social-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d={path} />
    </svg>
  )
}

function Footer({ company, socialLinks = [], onSocialClick }) {
  const { isAuthenticated, user, authLoading, signOut } = useAuth()
  const [loginOpen, setLoginOpen] = useState(false)

  if (!company) return null

  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-main">
          <div className="footer-company">
            <span className="footer-company-name">{siteConfig.companyName}</span>
            <p className="footer-address">{company.address}</p>
            <a className="footer-link" href={`mailto:${siteConfig.contactEmail}`}>
              {siteConfig.contactEmail}
            </a>
            <a className="footer-link" href={`tel:${company.phone.replace(/[^+\d]/g, '')}`}>
              {company.phone}
            </a>
          </div>

          <ul className="footer-social">
            {socialLinks.map((link) => (
              <li key={link.id}>
                <button
                  type="button"
                  className="footer-social-link"
                  aria-label={link.label}
                  onClick={() => onSocialClick?.(link)}
                >
                  <SocialIcon id={link.id} />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-bottom">
          <span>
            © {year} {siteConfig.companyName}. All rights reserved.
          </span>
          {!authLoading && (
            <span className="footer-admin">
              {isAuthenticated ? (
                <>
                  Signed in as {user.email} ·{' '}
                  <button type="button" className="footer-admin-link" onClick={() => signOut()}>
                    Log out
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="footer-admin-link"
                  onClick={() => setLoginOpen(true)}
                >
                  Admin Login
                </button>
              )}
            </span>
          )}
        </div>
      </div>

      <AdminLoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </footer>
  )
}

export default Footer
