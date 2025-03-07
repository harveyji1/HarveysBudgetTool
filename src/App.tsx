// import { useState } from 'react'
import NavBar from './components/NavBar/NavBar';
import Calculator from './components/Calculator/Calculator';
import AISuggestions from './components/AISuggestions/AISuggestions';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Contact from './components/Contact/Contact';
import { callSuggestedBudget } from './utilities/callOpenai';
import { useState } from 'react';
// import StructuredBudget from './components/AISuggestions/StructuredBudget';


function App() {

  const [aiResponse, setAiResponse] = useState<string | null>('');

  // Function to handle asking AI and setting the response
  const handleAskAIButtonClick = async (formattedData: string) => {
    setAiResponse(null);
    const response = await callSuggestedBudget(formattedData);
    setAiResponse(response);
  };

  return (
    <div>
      <NavBar/>
      <h1 className='siteTitle'>{"Harvey's AI Budget Tool"}</h1>
      <Calculator onAskAI={handleAskAIButtonClick}/>
      <AISuggestions aiResponse={aiResponse} />
      <Contact/>
    </div>

  )
}

export default App
