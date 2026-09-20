import { motion } from 'motion/react'
import CountUp from './CountUp.jsx'
import './Dashboard.css'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const viewport = { once: true, amount: 0.3 }

function OverallProgressCard({ percent }) {
  return (
    <motion.div
      className="dash-card dash-card--overall"
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      <span className="dash-card-label">Overall project completion</span>
      <div className="dash-hero-figure">
        <CountUp value={percent} suffix="%" duration={1.6} />
      </div>
      <div className="dash-meter">
        <motion.div
          className="dash-meter-fill"
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          viewport={viewport}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.div>
  )
}

function BuildingProgressCard({ data }) {
  return (
    <motion.div
      className="dash-card dash-card--bar"
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      <span className="dash-card-label">Progress by building / package</span>
      <div className="bar-chart" role="img" aria-label="Percent complete by building or work package">
        {data.map((row, i) => (
          <div className="bar-row" key={row.id}>
            <span className="bar-label">{row.label}</span>
            <div className="bar-track">
              <motion.div
                className="bar-fill"
                initial={{ width: 0 }}
                whileInView={{ width: `${row.percent}%` }}
                viewport={viewport}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              />
            </div>
            <span className="bar-value">
              <CountUp value={row.percent} suffix="%" duration={1} />
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

const DONUT_RADIUS = 70
const DONUT_CIRCUMFERENCE = 2 * Math.PI * DONUT_RADIUS
const DONUT_GAP = 6

function buildDonutSegments(submittals) {
  const total = submittals.approved + submittals.underReview + submittals.rejected
  const entries = [
    { key: 'approved', label: 'Approved', value: submittals.approved, tone: 'good' },
    { key: 'underReview', label: 'Under review', value: submittals.underReview, tone: 'warning' },
    { key: 'rejected', label: 'Rejected', value: submittals.rejected, tone: 'critical' },
  ]

  let cumulative = 0
  const segments = entries.map((entry) => {
    const fraction = total === 0 ? 0 : entry.value / total
    const rawLength = fraction * DONUT_CIRCUMFERENCE
    const length = Math.max(rawLength - DONUT_GAP, 0)
    const segment = {
      ...entry,
      percent: total === 0 ? 0 : Math.round(fraction * 100),
      dasharray: `${length} ${DONUT_CIRCUMFERENCE - length}`,
      dashoffset: -cumulative,
    }
    cumulative += rawLength
    return segment
  })

  return { segments, total }
}

function SubmittalDonutCard({ submittals }) {
  const { segments, total } = buildDonutSegments(submittals)

  return (
    <motion.div
      className="dash-card dash-card--donut"
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      <span className="dash-card-label">Submittal status</span>
      <div className="donut-wrap">
        <svg
          className="donut-chart"
          viewBox="0 0 200 200"
          role="img"
          aria-label="Submittal status breakdown: approved, under review, and rejected"
        >
          <g transform="rotate(-90 100 100)">
            <circle
              className="donut-track"
              cx="100"
              cy="100"
              r={DONUT_RADIUS}
              fill="none"
              strokeWidth="24"
            />
            {segments.map((segment) => (
              <circle
                key={segment.key}
                className={`donut-segment donut-segment--${segment.tone}`}
                cx="100"
                cy="100"
                r={DONUT_RADIUS}
                fill="none"
                strokeWidth="24"
                strokeLinecap="round"
                strokeDasharray={segment.dasharray}
                strokeDashoffset={segment.dashoffset}
              />
            ))}
          </g>
        </svg>
        <div className="donut-center">
          <span className="donut-center-value">
            <CountUp value={total} duration={1.4} />
          </span>
          <span className="donut-center-label">Total submittals</span>
        </div>
      </div>
      <ul className="donut-legend">
        {segments.map((segment) => (
          <li key={segment.key} className="donut-legend-row">
            <span className={`donut-dot donut-dot--${segment.tone}`} aria-hidden="true" />
            <span className="donut-legend-label">{segment.label}</span>
            <span className="donut-legend-value">
              <CountUp value={segment.value} duration={1} />
              <span className="donut-legend-percent"> ({segment.percent}%)</span>
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

function MaterialDeliveryCard({ data }) {
  return (
    <motion.div
      className="dash-card dash-card--deliveries"
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      <span className="dash-card-label">Material delivery status</span>
      <div className="delivery-row">
        {data.map((item) => (
          <div className="delivery-tile" key={item.id}>
            <span className={`delivery-dot delivery-dot--${item.status}`} aria-hidden="true" />
            <span className="delivery-value">
              <CountUp value={item.count} duration={1} />
            </span>
            <span className="delivery-label">{item.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function Dashboard({ data }) {
  if (!data) return null

  return (
    <section className="dashboard-section">
      <div className="dashboard-inner">
        <motion.div
          className="dashboard-header"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <h2 className="dashboard-title">Project Dashboard</h2>
          <p className="dashboard-subtitle">A live snapshot of where things stand.</p>
        </motion.div>

        <div className="dashboard-grid">
          <OverallProgressCard percent={data.overallProgress} />
          <BuildingProgressCard data={data.buildingProgress} />
          <SubmittalDonutCard submittals={data.submittals} />
          <MaterialDeliveryCard data={data.materialDeliveries} />
        </div>
      </div>
    </section>
  )
}

export default Dashboard
