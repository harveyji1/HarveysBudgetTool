// import { useState } from 'react'
import NavBar from './components/NavBar/NavBar';
// import Calculator from './components/Calculator/Calculator';
import './App.css'

function App() {
  // const [count, setCount] = useState(0)
  const items = ["Home","Product", "Service"];
  return (
    <div>
      <NavBar 
      brandName="My Brand" 
      navItems={items}/>
    </div>
    // <Calculator/>
  )
}

export default App
