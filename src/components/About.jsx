import { motion } from 'motion/react'
import siteConfig from '../config/site.js'
import './About.css'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const teamContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const teamItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

const viewport = { once: true, amount: 0.3 }

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function TeamSkeleton() {
  return (
    <div className="team-grid" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <div className="team-card" key={i}>
          <span className="skeleton-block" style={{ width: 56, height: 56, borderRadius: '50%' }} />
          <span className="skeleton-block" style={{ width: '70%', height: 14 }} />
          <span className="skeleton-block" style={{ width: '55%', height: 20, borderRadius: 999 }} />
        </div>
      ))}
    </div>
  )
}

function About({ company, team }) {
  if (!company) return null

  const loading = team === null

  return (
    <section className="about-section">
      <div className="about-inner">
        <motion.div
          className="about-header"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <h2 className="about-title">About {siteConfig.companyName}</h2>
          <p className="about-description">{company.description}</p>
        </motion.div>

        {loading ? (
          <TeamSkeleton />
        ) : team.length === 0 ? (
          <p className="about-empty">No team members yet.</p>
        ) : (
          <motion.ul
            className="team-grid"
            variants={teamContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            {team.map((member) => (
              <motion.li className="team-card" key={member.id} variants={teamItem}>
                <span className="team-avatar" aria-hidden="true">
                  {getInitials(member.name)}
                </span>
                <span className="team-name">{member.name}</span>
                <span className="team-role">{member.role}</span>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>
    </section>
  )
}

export default About
