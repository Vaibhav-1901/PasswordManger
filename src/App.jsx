import { useState } from 'react'
import Navbar from './components/Navbar'
import Manager from './components/Manager'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="min-h-[100vh] min-w-screen bg-gradient-to-br from-[#374151] to-[#6b7280]">

      <Navbar/>
      <Manager/>
    </div>
     
    </>
  )
}

export default App


