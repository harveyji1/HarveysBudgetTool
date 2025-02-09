// import { useState } from 'react'
import NavBar from './components/NavBar/NavBar';
import Calculator from './components/Calculator/Calculator';
import AISuggestions from './components/AISuggestions/AISuggestions';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Contact from './components/Contact/Contact';
import { callOpenAI } from './utilities/callOpenai';
import { useState } from 'react';


function App() {

  const [aiResponse, setAiResponse] = useState<string>('');

  // Function to handle asking AI and setting the response
  const handleAskAIButtonClick = async (formattedData: string) => {
    const response = await callOpenAI(formattedData);
    setAiResponse(response);
  };

  return (
    <div>
      <NavBar/>
      <h1 className='siteTitle'>Harveys AI Budget Tool</h1>
      <Calculator onAskAI={handleAskAIButtonClick}/>
      <AISuggestions aiResponse={aiResponse} />
      <Contact/>
    </div>

  )
}

export default App
