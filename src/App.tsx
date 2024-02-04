import { useEffect } from 'react'
import './App.css'

function App() {

  useEffect(() => {
    console.log("triggering app component")
  })

  return (
    <>
    Hello World
    </>
  )
}

export default App
