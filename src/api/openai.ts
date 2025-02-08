import axios from "axios";

// Dynamically set the API base URL based on the environment
const API_BASE_URL = process.env.NODE_ENV === "production"
    ? "https://ai-budget-tool-api-f9ecgjbrcna9ancf.centralus-01.azurewebsites.net/api/openai" // Azure production URL
    : "http://localhost:5075/api/openai";

export const getAIResponse = async (prompt: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/chat`, { prompt });
        return response.data.response;
    } catch (error) {
        console.error("Error fetching AI response:", error);
        return "Error connecting to AI service.";
    }
};