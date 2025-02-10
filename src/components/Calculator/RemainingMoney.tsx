import React from 'react';
import { Category } from '../../models/Category';
import { Form } from 'react-bootstrap';

interface RemainingMoneyProps {
  categories: Category[];
}

const RemainingMoney: React.FC<RemainingMoneyProps> = ({ categories }) => {
  const income = categories
    .find((cat) => cat.name === 'Income')
    ?.fields.reduce((sum, field) => sum + Number(field.value || 0), 0) || 0;

  const expenses = categories
    .filter((cat) => cat.name !== 'Income') // Exclude income
    .reduce((sum, cat) => {
      return sum + cat.fields.reduce((subSum, field) => subSum + Number(field.value || 0), 0);
    }, 0);

  const remainingBudget = income - expenses;

  return (
      <div className='formField'>
      <Form.Label className='fieldLabel'>
        Remaining Money: 
      </Form.Label>
        <Form.Control
          type='number'
          value={remainingBudget}
          // plaintext
          readOnly
        />
      </div>
  );
};

export default RemainingMoney;