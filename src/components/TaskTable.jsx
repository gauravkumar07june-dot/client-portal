import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import './TaskTable.css'

const STATUS_META = {
  'on-track': { label: 'On Track', tone: 'good' },
  delayed: { label: 'Delayed', tone: 'critical' },
  completed: { label: 'Completed', tone: 'accent' },
}

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'on-track', label: 'On Track' },
  { key: 'delayed', label: 'Delayed' },
  { key: 'completed', label: 'Completed' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const viewport = { once: true, amount: 0.2 }

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function StatusBadge({ status }) {
  const meta = STATUS_META[status]
  return (
    <span className={`status-badge status-badge--${meta.tone}`}>
      <span className="status-badge-dot" aria-hidden="true" />
      {meta.label}
    </span>
  )
}

function TaskTable({ tasks }) {
  const [filter, setFilter] = useState('all')

  const counts = useMemo(() => {
    const c = { all: tasks.length, 'on-track': 0, delayed: 0, completed: 0 }
    tasks.forEach((task) => {
      c[task.status] += 1
    })
    return c
  }, [tasks])

  const filtered = filter === 'all' ? tasks : tasks.filter((task) => task.status === filter)

  return (
    <section className="tasks-section">
      <div className="tasks-inner">
        <motion.div
          className="tasks-header"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <h2 className="tasks-title">Package Tracker</h2>
          <p className="tasks-subtitle">Status across every work package on the project.</p>
        </motion.div>

        <div className="tasks-filters" role="group" aria-label="Filter packages by status">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              className={`tasks-filter${filter === f.key ? ' is-active' : ''}`}
              onClick={() => setFilter(f.key)}
              aria-pressed={filter === f.key}
            >
              {f.label}
              <span className="tasks-filter-count">{counts[f.key]}</span>
            </button>
          ))}
        </div>

        <motion.div
          className="tasks-table-wrap"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <table className="tasks-table">
            <thead>
              <tr>
                <th scope="col">Package</th>
                <th scope="col">Status</th>
                <th scope="col">Owner</th>
                <th scope="col">Target date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((task) => (
                <tr key={task.id}>
                  <td data-label="Package">{task.packageName}</td>
                  <td data-label="Status">
                    <StatusBadge status={task.status} />
                  </td>
                  <td data-label="Owner">{task.owner}</td>
                  <td data-label="Target date">{formatDate(task.targetDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="tasks-empty">No packages match this filter.</p>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default TaskTable
