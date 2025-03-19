import React from "react";
import { CategoryField } from "./../../models/Category";
import './StructuredBudget.css';

interface StructuredBudgetProps {
    categories?: CategoryField[]; // Optional to handle cases where it's undefined initially
}

const StructuredBudget: React.FC<StructuredBudgetProps> = ({ categories = [] }) => {
    return (
        <div className="structuredBudget">
            <h5 className='structuredBudgetHeader' >Generated Budget</h5>
            <ul className="structuredBudgetContainer">
                {categories.length > 0 ? (
                    categories.map((category, index) => (
                        <li key={index}>
                            <strong>{category.label}:</strong> ${category.value}
                        </li>
                    ))
                ) : (
                    <p className="structuredText">Generated Budget will appear here</p>
                )} 
            </ul>
        </div>
    );
};

export default StructuredBudget;