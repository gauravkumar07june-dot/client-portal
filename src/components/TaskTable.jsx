import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import './TaskTable.css'

const STATUS_META = {
  on_track: { label: 'On Track', tone: 'good' },
  delayed: { label: 'Delayed', tone: 'critical' },
  completed: { label: 'Completed', tone: 'accent' },
}

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'on_track', label: 'On Track' },
  { key: 'delayed', label: 'Delayed' },
  { key: 'completed', label: 'Completed' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const viewport = { once: true, amount: 0.2 }

function formatDate(isoDate) {
  if (!isoDate) return '—'
  return new Date(isoDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function StatusBadge({ status }) {
  const meta = STATUS_META[status]
  if (!meta) return null
  return (
    <span className={`status-badge status-badge--${meta.tone}`}>
      <span className="status-badge-dot" aria-hidden="true" />
      {meta.label}
    </span>
  )
}

function TableSkeletonRows() {
  return (
    <tbody aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <tr key={i}>
          <td data-label="Package">
            <span className="skeleton-block" style={{ width: '70%', height: 14 }} />
          </td>
          <td data-label="Status">
            <span className="skeleton-block" style={{ width: 84, height: 22, borderRadius: 999 }} />
          </td>
          <td data-label="Owner">
            <span className="skeleton-block" style={{ width: '55%', height: 14 }} />
          </td>
          <td data-label="Target date">
            <span className="skeleton-block" style={{ width: '60%', height: 14 }} />
          </td>
        </tr>
      ))}
    </tbody>
  )
}

function TaskTable({ packages }) {
  const [filter, setFilter] = useState('all')
  const loading = packages === null

  const counts = useMemo(() => {
    if (!packages) return { all: 0, on_track: 0, delayed: 0, completed: 0 }
    const c = { all: packages.length, on_track: 0, delayed: 0, completed: 0 }
    packages.forEach((pkg) => {
      c[pkg.status] += 1
    })
    return c
  }, [packages])

  const filtered = !packages
    ? []
    : filter === 'all'
      ? packages
      : packages.filter((pkg) => pkg.status === filter)

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

        {!loading && packages.length > 0 && (
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
        )}

        <motion.div
          className="tasks-table-wrap"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {!loading && packages.length === 0 ? (
            <p className="tasks-empty">No packages yet.</p>
          ) : (
            <table className="tasks-table">
              <thead>
                <tr>
                  <th scope="col">Package</th>
                  <th scope="col">Status</th>
                  <th scope="col">Owner</th>
                  <th scope="col">Target date</th>
                </tr>
              </thead>
              {loading ? (
                <TableSkeletonRows />
              ) : (
                <tbody>
                  {filtered.map((pkg) => (
                    <tr key={pkg.id}>
                      <td data-label="Package">{pkg.name}</td>
                      <td data-label="Status">
                        <StatusBadge status={pkg.status} />
                      </td>
                      <td data-label="Owner">{pkg.owner}</td>
                      <td data-label="Target date">{formatDate(pkg.targetDate)}</td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          )}
          {!loading && packages.length > 0 && filtered.length === 0 && (
            <p className="tasks-empty">No packages match this filter.</p>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default TaskTable
