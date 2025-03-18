import './Calculator.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { calculateRemaining, calculateIncome } from '../../utilities/calculateBudget.ts';
import AddField from './AddField.tsx'; 
import { TiDelete } from 'react-icons/ti';
import { Category, CategoryField } from '../../models/Category.ts';
import { formatCategories } from '../../utilities/formatCategories.ts';
import RemainingMoney from './RemainingMoney.tsx';


interface CalculatorProps {
  onAskAI: (formattedData: string) => void;
}

const Calculator: React.FC<CalculatorProps> = ({ onAskAI }) =>{
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [categories, setCategories] = useState<Category[]>([
    {
      name: 'Income',
      description: 'Your income after taxes',
      fields: [
        { id: 'salary', label: 'Salary: ', value: '' },
        { id: 'dividends', label: 'Dividends: ', value: '' },
      ],
    },
    {
      name: 'Fixed Expenses',
      description: "Expenses that don't change",
      fields: [
        { id: 'rent', label: 'Rent/Mortgage: ', value: '' },
        { id: 'carPayments', label: 'Car Payments: ', value: '' },
      ],
    },
    {
      name: 'Non-Fixed Expenses',
      description: 'Expenses that are flexible',
      fields: [
        { id: 'savings', label: 'Savings: ', value: '' },
        { id: 'food', label: 'Food: ', value: '' },
      ],
    },
  ]);

  const handleAddField = (newFieldName: string, categoryName: string) => {
    const sectorIndex = categories.findIndex((cat) => cat.name === categoryName);
    if (sectorIndex !== -1) {
      const updatedCategories = [...categories];
      const newField = {
        id: newFieldName.toLowerCase().replace(/\s+/g, ''),
        label: `${newFieldName}: `,
        value: '',
      };
      updatedCategories[sectorIndex].fields.push(newField);
      setCategories(updatedCategories);
    } else {
      console.error(`Category "${categoryName}" not found`);
    }
  };

  const handleDelete = (id: string, categoryName: string) => {
    const categoryIndex = categories.findIndex((cat) => cat.name === categoryName);
    if (categoryIndex !== -1) {
      const updatedCategories = [...categories];
      updatedCategories[categoryIndex].fields = updatedCategories[categoryIndex].fields.filter((item) => item.id !== id);
      setCategories(updatedCategories);
    }else {
      console.error(`Category "${categoryName}" not found`);
    }
  };

  const handleFieldChange = (categoryIndex: number, fieldIndex: number, value: string) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].fields[fieldIndex].value = value;
    setCategories(updatedCategories);
  };

  const handleAskAI = () => {
    const income = calculateIncome(categories[0]);
    const remaining = calculateRemaining(categories);
  
    if (income <= 0) {
      setErrorMessage("Income must be greater than zero.");
      return;
    }
  
    if (remaining !== 0) {
      setErrorMessage("Your budget must balance to zero before asking AI for suggestions.");
      return;
    }
  
    setErrorMessage(null); // Clear any previous errors
    const formattedData = formatCategories(categories);
    console.log(formattedData);
    onAskAI(formattedData);
    
    const aiSuggestionsSection = document.getElementById("aiSuggestions");
    if (aiSuggestionsSection) {
      aiSuggestionsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Form className='calculatorForm' id='calculator'>
      <div className='calculatorInputs'>
        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex} className='category'>
            <h3 className='categoryHeader'>{category.name}</h3>
            {category.description && <h6 className='categoryDesc'>{category.description}</h6>}
            <Form.Group className='inputs'>
              {category.fields.map((field: CategoryField, fieldIndex: number) => (
                <div key={fieldIndex} className='formField'>
                  <Form.Label className='fieldLabel'>
                    <TiDelete
                      className='deleteIcon'
                      onClick={() => handleDelete(field.id, category.name)}
                    />
                    {field.label}
                  </Form.Label>
                  <Form.Control
                    type='number'
                    min='0'
                    value={field.value}
                    onChange={(e) => handleFieldChange(categoryIndex, fieldIndex, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "-") {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
              ))}
            </Form.Group>
          </div>
        ))}
      </div>
      <AddField onAddField={handleAddField} />
      <RemainingMoney remainingMoney={calculateRemaining(categories)} />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <Button onClick={handleAskAI} className='aiSuggestButton'>Get AI Suggestions!</Button>
    </Form>
  );
}

export default Calculator;