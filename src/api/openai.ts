import axios from "axios";

// Dynamically set the API base URL based on the environment
const API_BASE_URL = process.env.NODE_ENV === "production"
    ? "https://ai-budget-tool-api-f9ecgjbrcna9ancf.centralus-01.azurewebsites.net/api/openai"
    : "http://localhost:5075/api/openai";

export const getSuggestedBudget = async (prompt: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/suggested-budget`, { prompt });
        return response.data.response;
    } catch (error) {
        console.error("Error fetching AI response:", error);
        return "Error connecting to AI service. Please try again later.";
    }
};

export const getStructuredBudget = async (prompt: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/structured-budget`, { prompt });
        return response.data.response;
    } catch (error) {
        console.error("Error fetching AI response:", error);
        return "Error connecting to AI service. Please try again later.";
    }
};