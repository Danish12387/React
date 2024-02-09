import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MapChart from './Component/New'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <MapChart/>
      <h1>helo</h1>
    </div>
  )
}

export default App
