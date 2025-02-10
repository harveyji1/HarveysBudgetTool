import React from 'react';
import './AISuggestions.css';

interface AISuggestionsProps {
    aiResponse: string | null;
}

const AISuggestions: React.FC<AISuggestionsProps> = ({ aiResponse }) => {
    return (
        <div id="aiSuggestions">
            <h1 className='aiHeader'>AI Suggestions:</h1>
            <h5 className='aiSubHeader'>Powered by Open AI: GPT 3.5 Mini</h5>

            {/* Show Loading if aiResponse is empty or null */}
            {aiResponse === null ? (
                <p className="suggestedText">Analyzing Budget...</p>
            ) : aiResponse ? (
                <p className="suggestedText">{aiResponse}</p>
            ) : (
                <p className="suggestedText">
                    Fill out the Calculator and click the "Get AI Suggestions" button!
                </p>
            )}
        </div>
    );
};

export default AISuggestions;