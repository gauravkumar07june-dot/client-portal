import { motion } from 'motion/react'
import './DocumentLibrary.css'

const CATEGORY_ORDER = ['DPR', 'Submittals', 'Drawings']

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

function FileTypeIcon({ fileType }) {
  return (
    <svg className="doc-icon" viewBox="0 0 40 40" aria-hidden="true">
      <path
        className="doc-icon-body"
        d="M9 4h14l8 8v24a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
      />
      <path className="doc-icon-fold" d="M23 4v8h8" />
      <rect className="doc-icon-band" x="7" y="24" width="26" height="11" rx="2" />
      <text className="doc-icon-label" x="20" y="32" textAnchor="middle">
        {fileType}
      </text>
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg className="doc-download-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 3v9m0 0 3.5-3.5M10 12 6.5 8.5M4 14.5v1a1.5 1.5 0 0 0 1.5 1.5h9a1.5 1.5 0 0 0 1.5-1.5v-1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function DocumentRow({ doc, onDownload }) {
  return (
    <li className="doc-row">
      <FileTypeIcon fileType={doc.fileType} />
      <div className="doc-meta">
        <span className="doc-name">{doc.name}</span>
        <span className="doc-date">Uploaded {formatDate(doc.uploadedDate)}</span>
      </div>
      <button
        type="button"
        className="doc-download"
        onClick={() => onDownload?.(doc)}
        aria-label={`Download ${doc.name}`}
      >
        <DownloadIcon />
      </button>
    </li>
  )
}

function DocumentLibrary({ documents = [], onDownload }) {
  const groups = CATEGORY_ORDER.map((category) => ({
    category,
    items: documents.filter((doc) => doc.category === category),
  })).filter((group) => group.items.length > 0)

  return (
    <section className="docs-section">
      <div className="docs-inner">
        <motion.div
          className="docs-header"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <h2 className="docs-title">Document Library</h2>
          <p className="docs-subtitle">Reports, submittals, and drawings for this project.</p>
        </motion.div>

        {groups.map((group) => (
          <motion.div
            className="doc-group"
            key={group.category}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <div className="doc-group-header">
              <h3 className="doc-group-title">{group.category}</h3>
              <span className="doc-group-count">{group.items.length}</span>
            </div>
            <ul className="doc-list">
              {group.items.map((doc) => (
                <DocumentRow key={doc.id} doc={doc} onDownload={onDownload} />
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default DocumentLibrary
