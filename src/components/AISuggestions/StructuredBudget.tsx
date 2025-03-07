import React from "react";
import { ReturnedCategory } from "./../../models/Category";

interface StructuredBudgetProps {
    categories?: ReturnedCategory[]; // Optional to handle cases where it's undefined initially
}

const StructuredBudget: React.FC<StructuredBudgetProps> = ({ categories = [] }) => {
    return (
        <div>
            <h2 className='aiSubHeader' >Generated Budget</h2>
            <ul>
                {categories.length > 0 ? (
                    categories.map((category, index) => (
                        <li key={index}>
                            <strong>{category.name}:</strong> ${category.amount.toFixed(2)}
                        </li>
                    ))
                ) : (
                    <p className="suggestedText">No budget categories available.</p>
                )} 
            </ul>
        </div>
    );
};

export default StructuredBudget;