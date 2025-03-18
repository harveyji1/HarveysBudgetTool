import { getSuggestedBudget, getStructuredBudget } from "../api/openai";


export const callSuggestedBudget = async (budget: string) => {
    const aiResponse = await getSuggestedBudget(
        `This is my monthly budget: ${budget}
        Do you have any suggestions on how I should change it? Make specific changes, how much money should go where instead?`);
    return aiResponse;
};

export const callStructuredBudget = async(budget: string, previousSuggestion: string) => {
    const aiResponse = await getStructuredBudget(
        `This is my current budget: ${budget}. 
        And here are the suggestions I want you to apply to it: ${previousSuggestion} 
        Keep the income the same and return all the specific fields, not just the categories like the income and fixed expenses.
        Also, make sure all the expenses still add up to the income.`
    );

    console.log("Structured Budget Response:", aiResponse);

    return aiResponse;
}