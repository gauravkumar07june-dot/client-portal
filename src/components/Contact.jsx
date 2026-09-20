import { useState } from 'react'
import { motion } from 'motion/react'
import './Contact.css'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const viewport = { once: true, amount: 0.3 }

// Placeholder demo number (555 = reserved fictional range) — swap for the real one.
const WHATSAPP_NUMBER = '15550102984'
const WHATSAPP_MESSAGE = 'Hi! I have a question about the project.'

function SendIcon() {
  return (
    <svg className="contact-submit-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4 10h12M11 5l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg className="whatsapp-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.03 2c-5.5 0-9.97 4.46-9.97 9.96 0 1.76.46 3.47 1.33 4.98L2 22l5.2-1.36a9.96 9.96 0 0 0 4.83 1.23h.01c5.5 0 9.97-4.46 9.97-9.96C22 6.46 17.53 2 12.03 2Zm5.86 14.07c-.25.7-1.24 1.29-2.02 1.45-.55.12-1.26.21-3.65-.78-2.99-1.24-4.94-4.26-5.1-4.46-.15-.2-1.22-1.62-1.22-3.1 0-1.47.77-2.19 1.05-2.49.28-.3.6-.37.8-.37.2 0 .4 0 .58.01.19.01.44-.07.68.53.25.6.85 2.08.92 2.23.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.18-.31.4-.44.54-.15.15-.3.31-.13.6.17.3.77 1.28 1.66 2.08 1.14 1.02 2.1 1.34 2.4 1.49.3.15.47.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.71.81 2 .96.3.15.5.22.57.35.07.13.07.75-.18 1.45Z" />
    </svg>
  )
}

function Contact({ onSubmit }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit?.(form)
    setSubmitted(true)
  }

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <section className="contact-section">
      <div className="contact-inner">
        <motion.div
          className="contact-header"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <h2 className="contact-title">Get in Touch</h2>
          <p className="contact-subtitle">
            Questions about the project? Send a message or reach out on WhatsApp.
          </p>
        </motion.div>

        <motion.div
          className="contact-grid"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <form className="contact-form" onSubmit={handleSubmit}>
            {submitted ? (
              <div className="contact-success">
                <p>
                  Thanks{form.name ? `, ${form.name.split(' ')[0]}` : ''} — your message has
                  been received. We&rsquo;ll get back to you shortly.
                </p>
              </div>
            ) : (
              <>
                <label className="contact-field">
                  <span>Name</span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                  />
                </label>
                <label className="contact-field">
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                </label>
                <label className="contact-field">
                  <span>Message</span>
                  <textarea
                    name="message"
                    rows="4"
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </label>
                <button type="submit" className="contact-submit">
                  Send Message
                  <SendIcon />
                </button>
              </>
            )}
          </form>

          <div className="contact-aside">
            <p className="contact-aside-label">Prefer a faster reply?</p>
            <a
              className="whatsapp-button"
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
              Chat on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
