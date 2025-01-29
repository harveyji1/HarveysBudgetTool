import './Calculator.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { calculateBudget} from '../../utilities/calculateBudget.ts';
import AddCategory from './AddCategory'; 
import { TiDelete } from 'react-icons/ti';
import { Category, CategoryField } from '../../models/Category.ts';

function Calculator() {
  // Define categories and fields as data
  const [categories, setCategories] = useState<Category[]>([
    {
      name: 'Income',
      description: '',
      fields: [
        { id: 'incomeTotal', label: 'Income: ', value: '' },
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

  const handleAddCategory = (newCategoryName: string, sectorName: string) => {
    const sectorIndex = categories.findIndex((cat) => cat.name === sectorName);
    if (sectorIndex !== -1) {
      const updatedCategories = [...categories];
      const newField = {
        id: newCategoryName.toLowerCase().replace(/\s+/g, ''),
        label: `${newCategoryName}: `,
        value: '',
      };
      updatedCategories[sectorIndex].fields.push(newField);
      setCategories(updatedCategories);
    } else {
      console.error(`Sector "${sectorName}" not found`);
    }
  };

  const handleFieldChange = (categoryIndex: number, fieldIndex: number, value: string) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].fields[fieldIndex].value = value;
    setCategories(updatedCategories);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const results = calculateBudget(categories);
    console.log('Calculation Results:', results);
  };

  return (
    <Form className='calculatorForm'>
      <div className='calculatorInputs'>
        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex} className='category'>
            <h3 className='categoryHeader'>{category.name}</h3>
            {category.description && <h6 className='categoryDesc'>{category.description}</h6>}
            <Form.Group className='inputs'>
              {category.fields.map((field: CategoryField, fieldIndex: number) => (
                <div key={fieldIndex} className='formField'>
                  <Form.Label className='categoryLabel'><TiDelete/>{field.label}</Form.Label>
                  <Form.Control
                    type='number'
                    value={field.value}
                    onChange={(e) => handleFieldChange(categoryIndex, fieldIndex, e.target.value)}
                  />
                </div>
              ))}
            </Form.Group>
            {category.name === 'Non-Fixed Expenses' && (
              <AddCategory onAddCategory={handleAddCategory} />
            )}
          </div>
        ))}
      </div>
      <Button onClick={handleSubmit}>Calculate</Button>
    </Form>
  );
}

export default Calculator;