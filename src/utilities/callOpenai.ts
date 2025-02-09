import { getAIResponse } from "../api/openai";


export const callOpenAI = async (budget: string) => {
    const aiResponse = await getAIResponse("This is my monthly budget. Do you have any small suggestions on how I should change my budget?" + budget);
    return aiResponse;
};