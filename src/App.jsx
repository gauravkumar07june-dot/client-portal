import { useEffect, useRef, useState } from 'react'
import Hero from './components/Hero.jsx'
import Dashboard from './components/Dashboard.jsx'
import TaskTable from './components/TaskTable.jsx'
import { fetchDashboardData } from './data/dashboardData.js'
import { fetchTasksData } from './data/tasksData.js'

function App() {
  const [dashboardData, setDashboardData] = useState(null)
  const [tasks, setTasks] = useState([])
  const dashboardRef = useRef(null)

  useEffect(() => {
    fetchDashboardData().then(setDashboardData)
    fetchTasksData().then(setTasks)
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
    </>
  )
}

export default App
