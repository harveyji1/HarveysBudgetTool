import { useState } from "react";
import { ReturnedCategory } from "./../../models/Category";
import { getStructuredBudget } from "../../api/openai";

const StructuredBudget = (prompt: string) => {
    const [budgetCategories, setBudgetCategories] = useState<ReturnedCategory[]>([]);
  
    const fetchBudget = async () => {
      try {
        const response = await getStructuredBudget(prompt);
        console.log("API Response:", response);
  
        // Ensure the API response is correctly structured
        setBudgetCategories(response);
      } catch (error) {
        console.error("Error fetching budget:", error);
      }
    };
  
    return (
      <div>
        <h2>Generated Budget</h2>
        <button onClick={fetchBudget}>Generate Budget</button>
  
        <ul>
          {budgetCategories.map((category, index) => (
            <li key={index}>
              <strong>{category.name}:</strong> ${category.amount.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default StructuredBudget;