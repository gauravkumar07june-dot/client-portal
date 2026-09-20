import { useEffect, useRef, useState } from 'react'
import Hero from './components/Hero.jsx'
import Dashboard from './components/Dashboard.jsx'
import TaskTable from './components/TaskTable.jsx'
import DocumentLibrary from './components/DocumentLibrary.jsx'
import About from './components/About.jsx'
import { fetchDashboardData } from './data/dashboardData.js'
import { fetchTasksData } from './data/tasksData.js'
import { fetchDocumentsData } from './data/documentsData.js'
import { fetchAboutData } from './data/aboutData.js'

function App() {
  const [dashboardData, setDashboardData] = useState(null)
  const [tasks, setTasks] = useState([])
  const [documents, setDocuments] = useState([])
  const [about, setAbout] = useState(null)
  const dashboardRef = useRef(null)

  useEffect(() => {
    fetchDashboardData().then(setDashboardData)
    fetchTasksData().then(setTasks)
    fetchDocumentsData().then(setDocuments)
    fetchAboutData().then(setAbout)
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
    </>
  )
}

export default App
