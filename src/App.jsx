import Hero from './components/Hero.jsx'

function App() {
  return (
    <Hero
      projectName="Riverside Tower"
      statusSummary="On schedule — framing complete, drywall starts next week."
      onViewProgress={() => {
        console.log('View Progress clicked')
      }}
    />
  )
}

export default App
