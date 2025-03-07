import { getSuggestedBudget, getStructuredBudget } from "../api/openai";


export const callSuggestedBudget = async (budget: string) => {
    const aiResponse = await getSuggestedBudget("This is my monthly budget. Do you have any small suggestions on how I should change my budget?" + budget);
    return aiResponse;
};

export const callStructuredBudget = async(budget: string, previousSuggestion: string) => {
    const aiResponse = await getStructuredBudget(
        `This is my current budget: ${budget}. And here are the suggestions I want you to apply to it: ${previousSuggestion}`
    );

    console.log("Structured Budget Response:", aiResponse);

    return aiResponse;
}