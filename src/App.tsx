// import { useState } from 'react'
import NavBar from './components/NavBar/NavBar';
import Calculator from './components/Calculator/Calculator';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  // const [count, setCount] = useState(0)
  return (
    <div>
      <NavBar/>
      <Calculator/>
    </div>

  )
}

export default App
