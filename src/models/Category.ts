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