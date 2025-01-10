import './Calculator.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

function Calculator() {
  // Define categories and fields as data
  const [categories, setCategories] = useState([
    {
      name: 'Income',
      description: '',
      fields: [
        { label: 'Income (Total After Tax): ', value: '' },
      ],
    },
    {
      name: 'Fixed Expenses',
      description: 'Expenses that can not or will not change',
      fields: [
        { label: 'Rent/Mortgage: ', value: '' },
        { label: 'Car Payments: ', value: '' },
        { label: 'Debt Payments: ', value: '' },
        { label: 'Insurance: ', value: '' },
        { label: 'Investments: ', value: '' },
        { label: 'Tuition: ', value: '' },
        { label: 'Emergency Funds: ', value: '' },
      ],
    },
    {
      name: 'Non-Fixed Expenses',
      description: 'Expenses that you want to budget for',
      fields: [],
    },
  ]);

  const handleFieldChange = (categoryIndex: number, fieldIndex: number, value: string) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].fields[fieldIndex].value = value;
    setCategories(updatedCategories);
  };

  return (
    <Form className='calculatorForm'>
      <div className='calculatorInputs'>
        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex} className='category'>
            <h2 className='categoryHeader'>{category.name}</h2>
            {category.description && <h4 className='categoryDesc'>{category.description}</h4>}
            <Form.Group className='inputs'>
              {category.fields.map((field, fieldIndex) => (
                <div key={fieldIndex} className='formField'>
                  <Form.Label>{field.label}</Form.Label>
                  <Form.Control
                    type='number'
                    value={field.value}
                    onChange={(e) => handleFieldChange(categoryIndex, fieldIndex, e.target.value)}
                  />
                </div>
              ))}
            </Form.Group>
          </div>
        ))}
      </div>
      <Button type="submit">Calculate</Button>
    </Form>
  );
}

export default Calculator;
