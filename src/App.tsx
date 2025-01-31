// import { useState } from 'react'
import NavBar from './components/NavBar/NavBar';
import Calculator from './components/Calculator/Calculator';
import AISuggestions from './components/AISuggestions/AISuggestions';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div>
      <NavBar/>
      <h1 className='siteTitle'>Harveys AI Budget Tool</h1>
      <Calculator/>
      <AISuggestions/>
    </div>

  )
}

export default App
