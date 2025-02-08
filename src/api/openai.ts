import axios from "axios";

const API_BASE_URL = "http://localhost:5075/api/openai"; // Update if your backend uses a different port

export const getAIResponse = async (prompt: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/chat`, { prompt });
        return response.data.response;
    } catch (error) {
        console.error("Error fetching AI response:", error);
        return "Error connecting to AI service.";
    }
};