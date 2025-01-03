// import { useState } from 'react'
import NavBar from './components/NavBar/NavBar';
// import Calculator from './components/Calculator/Calculator';
import './App.css'

function App() {
  // const [count, setCount] = useState(0)
  const items = ["Calculator","AI Suggestions", "Contact"];
  return (
    <div>
      <NavBar
        navItems={items}/>
    </div>
    // <Calculator/>
  )
}

export default App
