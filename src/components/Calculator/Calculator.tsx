import './Calculator.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
//import { calculateBudget} from '../../utilities/calculateBudget.ts';
import AddField from './AddField.tsx'; 
import { TiDelete } from 'react-icons/ti';
import { Category, CategoryField } from '../../models/Category.ts';


interface CalculatorProps {
  onAskAI: () => void;  // Function passed from App.tsx to trigger AI request
}

const Calculator: React.FC<CalculatorProps> = ({ onAskAI }) =>{
  // Define categories and fields as data
  const [categories, setCategories] = useState<Category[]>([
    {
      name: 'Income',
      description: 'Your income after taxes',
      fields: [
        { id: 'incomeTotal', label: 'Salary: ', value: '' },
      ],
    },
    {
      name: 'Fixed Expenses',
      description: 'Expenses that can not or will not change',
      fields: [
        { id: 'rent', label: 'Rent/Mortgage: ', value: '' },
        { id: 'carPayments', label: 'Car Payments: ', value: '' },
        { id: 'debtPayments', label: 'Debt Payments: ', value: '' },
        { id: 'insurance', label: 'Insurance: ', value: '' },
        { id: 'investments', label: 'Investments: ', value: '' },
        { id: 'tuition', label: 'Tuition: ', value: '' },
        { id: 'emergencyFunds', label: 'Emergency Funds: ', value: '' },
      ],
    },
    {
      name: 'Non-Fixed Expenses',
      description: 'Expenses that you want to budget for',
      fields: [],
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

  // const handleSubmit = (event: React.FormEvent) => {
  //   event.preventDefault();
  //   const results = calculateBudget(categories);
  //   console.log('Calculation Results:', results);
  // };

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
                    value={field.value}
                    onChange={(e) => handleFieldChange(categoryIndex, fieldIndex, e.target.value)}
                  />
                </div>
              ))}
            </Form.Group>
            {category.name === 'Non-Fixed Expenses' && (
              <AddField onAddField={handleAddField} />
            )}
          </div>
        ))}
      </div>
      <div className='formField'>
      <Form.Label className='fieldLabel'>
        Remaining Money: 
      </Form.Label>
        <Form.Control
          type='number'
          //onChange={(e) => handleFieldChange(categoryIndex, fieldIndex, e.target.value)}
        />
      </div>
      <Button onClick={onAskAI} href="#aiSuggestions">Get AI Suggestions!</Button>
    </Form>
  );
}

export default Calculator;