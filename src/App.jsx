import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Dashboard from './components/Dashboard.jsx'
import TaskTable from './components/TaskTable.jsx'
import DocumentLibrary from './components/DocumentLibrary.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import { fetchDashboardData } from './data/dashboardData.js'
import { fetchPackages } from './data/packagesData.js'
import { fetchDocumentsData } from './data/documentsData.js'
import { fetchAboutData } from './data/aboutData.js'
import { fetchStaff } from './data/staffData.js'
import { fetchFooterData } from './data/footerData.js'
import { scrollToSection } from './utils/scrollToSection.js'

function App() {
  const [dashboardData, setDashboardData] = useState(null)
  const [packages, setPackages] = useState(null)
  const [documents, setDocuments] = useState(null)
  const [about, setAbout] = useState(null)
  const [staff, setStaff] = useState(null)
  const [footer, setFooter] = useState(null)

  function loadDocuments() {
    return fetchDocumentsData()
      .then(setDocuments)
      .catch((error) => {
        console.error('Failed to load documents:', error)
        setDocuments([])
      })
  }

  useEffect(() => {
    fetchDashboardData().then(setDashboardData)
    fetchAboutData().then(setAbout)
    fetchFooterData().then(setFooter)

    fetchPackages()
      .then(setPackages)
      .catch((error) => {
        console.error('Failed to load packages:', error)
        setPackages([])
      })

    loadDocuments()

    fetchStaff()
      .then(setStaff)
      .catch((error) => {
        console.error('Failed to load staff:', error)
        setStaff([])
      })
  }, [])

  return (
    <>
      <Navbar />
      <Hero
        projectName="Riverside Tower"
        statusSummary="On schedule — framing complete, drywall starts next week."
        onViewProgress={() => scrollToSection('dashboard')}
      />
      <Dashboard data={dashboardData} packages={packages} />
      <TaskTable packages={packages} />
      <DocumentLibrary documents={documents} onDocumentUploaded={loadDocuments} />
      <About company={about?.company} team={staff} />
      <Contact
        onSubmit={(form) => {
          console.log('Contact form submitted:', form)
        }}
      />
      <Footer
        company={footer?.company}
        socialLinks={footer?.socialLinks}
        onSocialClick={(link) => {
          console.log('Social link clicked:', link.label)
        }}
      />
    </>
  )
}

export default App
