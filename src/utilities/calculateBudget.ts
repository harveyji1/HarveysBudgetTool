export interface CategoryField {
    id: string;
    label: string;
    value: string;
  }
  
  export interface Category {
    name: string;
    description?: string;
    fields: CategoryField[];
  }
  
  export function calculateBudget(categories: Category[]) {
    const income = categories.find(category => category.name === 'Income')?.fields.find(field => field.id === 'incomeTotal')?.value || '0';
    const fixedExpenses = categories
      .find(category => category.name === 'Fixed Expenses')?.fields
      .reduce((total, field) => total + (parseFloat(field.value) || 0), 0) || 0;
  
    const remainingBudget = parseFloat(income) - fixedExpenses;
  
    return {
      income: parseFloat(income),
      fixedExpenses,
      remainingBudget,
    };
  }

  export default calculateBudget;