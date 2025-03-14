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

export interface ReturnedCategory {
  name: string;
  amount: number;
}