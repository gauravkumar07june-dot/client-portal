import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ALLOWED_EXTENSIONS, MAX_FILE_SIZE_MB, uploadDocument } from '../data/documentsData.js'
import { useAuth } from '../context/AuthContext.jsx'
import './DocumentLibrary.css'

const CATEGORY_ORDER = ['DPR', 'Submittals', 'Drawings']
const ACCEPT_ATTR = ALLOWED_EXTENSIONS.map((ext) => `.${ext}`).join(',')
const ALLOWED_LABEL = 'PDF, DOCX, XLSX, JPG, PNG, DWG'

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

function UploadIcon() {
  return (
    <svg className="upload-btn-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 13V4m0 0 3.5 3.5M10 4 6.5 7.5M4 14.5v1a1.5 1.5 0 0 0 1.5 1.5h9a1.5 1.5 0 0 0 1.5-1.5v-1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SpinnerIcon() {
  return (
    <svg className="upload-btn-icon upload-spinner" viewBox="0 0 20 20" fill="none" aria-hidden="true">
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

function DocumentRow({ doc }) {
  return (
    <li className="doc-row">
      <FileTypeIcon fileType={doc.fileType} />
      <div className="doc-meta">
        <span className="doc-name">{doc.name}</span>
        <span className="doc-date">Uploaded {formatDate(doc.uploadedDate)}</span>
      </div>
      <a
        className="doc-download"
        href={doc.downloadUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Download ${doc.name}`}
      >
        <DownloadIcon />
      </a>
    </li>
  )
}

function DocGroupSkeleton() {
  return (
    <div className="doc-group" aria-hidden="true">
      <div className="doc-group-header">
        <span className="skeleton-block" style={{ width: 100, height: 16 }} />
      </div>
      <ul className="doc-list">
        {[0, 1].map((i) => (
          <li className="doc-row" key={i}>
            <span className="skeleton-block doc-icon-skeleton" />
            <div className="doc-meta">
              <span className="skeleton-block" style={{ width: '60%', height: 14 }} />
              <span className="skeleton-block" style={{ width: '35%', height: 12 }} />
            </div>
            <span className="skeleton-block" style={{ width: 36, height: 36, borderRadius: 999 }} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function UploadPanel({ onClose, onUploaded }) {
  const fileInputRef = useRef(null)
  const [file, setFile] = useState(null)
  const [category, setCategory] = useState('DPR')
  const [status, setStatus] = useState('idle') // idle | uploading | error
  const [error, setError] = useState('')

  function handleFileChange(event) {
    setFile(event.target.files?.[0] ?? null)
    setError('')
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!file) {
      setError('Choose a file to upload.')
      return
    }

    setStatus('uploading')
    setError('')

    try {
      await uploadDocument({ file, category })
      await onUploaded?.()
      onClose()
    } catch (err) {
      setStatus('error')
      setError(err.message || 'Upload failed. Please try again.')
    }
  }

  return (
    <motion.form
      className="upload-panel"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="upload-fields">
        <label className="upload-field">
          <span>File</span>
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPT_ATTR}
            onChange={handleFileChange}
            disabled={status === 'uploading'}
          />
          <span className="upload-hint">
            Accepted: {ALLOWED_LABEL} · Max {MAX_FILE_SIZE_MB} MB
          </span>
        </label>

        <label className="upload-field">
          <span>Category</span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            disabled={status === 'uploading'}
          >
            {CATEGORY_ORDER.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      {error && (
        <p className="upload-error" role="alert">
          {error}
        </p>
      )}

      <div className="upload-actions">
        <button
          type="button"
          className="upload-cancel"
          onClick={onClose}
          disabled={status === 'uploading'}
        >
          Cancel
        </button>
        <button type="submit" className="upload-submit" disabled={status === 'uploading'}>
          {status === 'uploading' ? 'Uploading…' : 'Upload'}
          {status === 'uploading' ? <SpinnerIcon /> : <UploadIcon />}
        </button>
      </div>
    </motion.form>
  )
}

function DocumentLibrary({ documents, onDocumentUploaded }) {
  const { isAuthenticated } = useAuth()
  const loading = documents === null
  const [uploadOpen, setUploadOpen] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) setUploadOpen(false)
  }, [isAuthenticated])

  const groups = loading
    ? []
    : CATEGORY_ORDER.map((category) => ({
        category,
        items: documents.filter((doc) => doc.category === category),
      })).filter((group) => group.items.length > 0)

  return (
    <section className="docs-section" id="documents">
      <div className="docs-inner">
        <motion.div
          className="docs-header"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <div>
            <h2 className="docs-title">Document Library</h2>
            <p className="docs-subtitle">Reports, submittals, and drawings for this project.</p>
          </div>
          {isAuthenticated && (
            <button
              type="button"
              className="upload-toggle"
              onClick={() => setUploadOpen((open) => !open)}
              aria-expanded={uploadOpen}
            >
              <UploadIcon />
              Upload Document
            </button>
          )}
        </motion.div>

        <AnimatePresence>
          {isAuthenticated && uploadOpen && (
            <UploadPanel
              onClose={() => setUploadOpen(false)}
              onUploaded={onDocumentUploaded}
            />
          )}
        </AnimatePresence>

        {loading ? (
          <>
            <DocGroupSkeleton />
            <DocGroupSkeleton />
          </>
        ) : documents.length === 0 ? (
          <p className="docs-empty">No documents yet.</p>
        ) : (
          groups.map((group) => (
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
                  <DocumentRow key={doc.id} doc={doc} />
                ))}
              </ul>
            </motion.div>
          ))
        )}
      </div>
    </section>
  )
}

export default DocumentLibrary
