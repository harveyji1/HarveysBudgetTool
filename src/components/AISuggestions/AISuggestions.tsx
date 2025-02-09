import React from 'react';
import './AISuggestions.css';

interface AISuggestionsProps {
    aiResponse: string;  // Receive aiResponse from App.tsx
}

const AISuggestions: React.FC<AISuggestionsProps> = ({ aiResponse }) => {
    return (
        <div id="aiSuggestions">
            <h1 className='aiHeader'>AI Suggestions:</h1>
            <h5 className='aiSubHeader'>Powered by Open AI: GPT 3.5 Mini</h5>
            {aiResponse ? <p className = "suggestedText">{aiResponse}</p> : <p className = "suggestedText">Fill out the Calculator and click the "Get AI Suggestions" Button!</p>}
        </div>
    );
};

export default AISuggestions;