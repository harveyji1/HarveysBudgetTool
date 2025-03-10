import React from "react";
import { ReturnedCategory } from "./../../models/Category";
import './StructuredBudget.css';

interface StructuredBudgetProps {
    categories?: ReturnedCategory[]; // Optional to handle cases where it's undefined initially
}

const StructuredBudget: React.FC<StructuredBudgetProps> = ({ categories = [] }) => {
    return (
        <div className="structuredBudget">
            <h5 className='structuredBudgetHeader' >Generated Budget</h5>
            <ul className="structuredBudgetContainer">
                {categories.length > 0 ? (
                    categories.map((category, index) => (
                        <li key={index}>
                            <strong>{category.name}:</strong> ${category.amount.toFixed(2)}
                        </li>
                    ))
                ) : (
                    <p className="structuredText">No budget categories available.</p>
                )} 
            </ul>
        </div>
    );
};

export default StructuredBudget;