import { useState } from 'react'
import siteConfig from '../config/site.js'
import { scrollToSection } from '../utils/scrollToSection.js'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'Overview', targetId: 'hero' },
  { label: 'Progress', targetId: 'dashboard' },
  { label: 'Documents', targetId: 'documents' },
  { label: 'Contact', targetId: 'contact' },
]

function MenuIcon({ open }) {
  return (
    <svg className="navbar-menu-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      {open ? (
        <path
          d="M5 5l10 10M15 5 5 15"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M3 6h14M3 10h14M3 14h14"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      )}
    </svg>
  )
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  function handleLinkClick(targetId) {
    setMenuOpen(false)
    scrollToSection(targetId)
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-logo-wrap">
          <button type="button" className="navbar-logo" onClick={() => handleLinkClick('hero')}>
            {siteConfig.companyName}
          </button>
          <span className="navbar-hazard" aria-hidden="true" />
        </div>

        <ul className="navbar-links">
          {NAV_LINKS.map((link) => (
            <li key={link.targetId}>
              <button
                type="button"
                className="navbar-link"
                onClick={() => handleLinkClick(link.targetId)}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="navbar-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </div>

      {menuOpen && (
        <ul className="navbar-mobile-menu">
          {NAV_LINKS.map((link) => (
            <li key={link.targetId}>
              <button
                type="button"
                className="navbar-mobile-link"
                onClick={() => handleLinkClick(link.targetId)}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}

export default Navbar
