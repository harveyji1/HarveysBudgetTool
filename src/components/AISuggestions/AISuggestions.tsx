import React from 'react';
import './AISuggestions.css';

interface AISuggestionsProps {
    aiResponse: string;  // Receive aiResponse from App.tsx
}

const AISuggestions: React.FC<AISuggestionsProps> = ({ aiResponse }) => {
    return (
        <div id="aiSuggestions">
            <h1 className='aiHeader'>AI Suggestions:</h1>
            {/* Conditionally render the response */}
            {aiResponse ? <p className = "suggestedText">{aiResponse}</p> : <p className = "suggestedText">Fill out the Calculator and click the "Get AI Suggestions" Button!</p>}
        </div>
    );
};

export default AISuggestions;