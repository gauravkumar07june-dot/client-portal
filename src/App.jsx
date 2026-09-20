import { useEffect, useRef, useState } from 'react'
import Hero from './components/Hero.jsx'
import Dashboard from './components/Dashboard.jsx'
import { fetchDashboardData } from './data/dashboardData.js'

function App() {
  const [dashboardData, setDashboardData] = useState(null)
  const dashboardRef = useRef(null)

  useEffect(() => {
    fetchDashboardData().then(setDashboardData)
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
    </>
  )
}

export default App
