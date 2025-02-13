import { Category } from "../models/Category";

  export function calculateIncome(incomeCategory: Category | undefined){
    const totalIncome = incomeCategory?.fields.reduce((sum, field) => sum + Number(field.value || 0), 0) || 0;
    return(totalIncome)
  }
  
  export function calculateRemaining(categories: Category[]) {
    const income = calculateIncome(categories.find((cat) => cat.name === 'Income'));

  const expenses = categories.filter((cat) => cat.name !== 'Income').reduce((sum, cat) => {
    return sum + cat.fields.reduce((subSum, field) => subSum + Number(field.value || 0), 0);
  }, 0); // Exclude income


  return income - expenses;
  }

  export default calculateRemaining;