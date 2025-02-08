import { getAIResponse } from "../api/openai";


export const callOpenAI = async () => {
    const aiResponse = await getAIResponse("This is a test! Can you response by saying Hello World!");
    return aiResponse;
};