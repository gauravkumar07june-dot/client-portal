import { useEffect, useRef, useState } from 'react'
import Hero from './components/Hero.jsx'
import Dashboard from './components/Dashboard.jsx'
import TaskTable from './components/TaskTable.jsx'
import DocumentLibrary from './components/DocumentLibrary.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import { fetchDashboardData } from './data/dashboardData.js'
import { fetchTasksData } from './data/tasksData.js'
import { fetchDocumentsData } from './data/documentsData.js'
import { fetchAboutData } from './data/aboutData.js'
import { fetchFooterData } from './data/footerData.js'

function App() {
  const [dashboardData, setDashboardData] = useState(null)
  const [tasks, setTasks] = useState([])
  const [documents, setDocuments] = useState([])
  const [about, setAbout] = useState(null)
  const [footer, setFooter] = useState(null)
  const dashboardRef = useRef(null)

  useEffect(() => {
    fetchDashboardData().then(setDashboardData)
    fetchTasksData().then(setTasks)
    fetchDocumentsData().then(setDocuments)
    fetchAboutData().then(setAbout)
    fetchFooterData().then(setFooter)
  }, [])

  return (
    <>
      <Hero
        projectName="Riverside Tower"
        statusSummary="On schedule — framing complete, drywall starts next week."
        onViewProgress={() => {
          dashboardRef.current?.scrollIntoView({ behavior: 'smooth' })
        }}
      />
      <div ref={dashboardRef}>
        <Dashboard data={dashboardData} />
      </div>
      <TaskTable tasks={tasks} />
      <DocumentLibrary
        documents={documents}
        onDownload={(doc) => {
          console.log('Download requested:', doc.name)
        }}
      />
      <About company={about?.company} team={about?.team} />
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
