import { motion } from 'motion/react'
import './Hero.css'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

function Hero({
  projectName = 'Riverside Tower',
  statusSummary = 'On schedule — framing complete, drywall starts next week.',
  onViewProgress,
}) {
  return (
    <section className="hero-section" id="hero">
      <div className="hero-grid" aria-hidden="true" />

      <motion.div
        className="hero-content"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.span className="hero-eyebrow" variants={item}>
          {projectName}
        </motion.span>

        <motion.h1 className="hero-title" variants={item}>
          See your project, in real time
        </motion.h1>

        <motion.p className="hero-status" variants={item}>
          <span className="hero-status-dot" aria-hidden="true" />
          {statusSummary}
        </motion.p>

        <motion.button
          type="button"
          className="hero-cta"
          variants={item}
          whileTap={{ scale: 0.97 }}
          onClick={onViewProgress}
        >
          View Progress
          <svg
            className="hero-cta-icon"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 10h12M11 5l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      </motion.div>
    </section>
  )
}

export default Hero
