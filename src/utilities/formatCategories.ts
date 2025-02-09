import { Category } from "../models/Category";

  // Format categories and filter out empty or zero-value fields
  export function formatCategories(categories: Category[]): string{
    const formattedData: { [key: string]: { [key: string]: string } } = {};

    categories.forEach((category) => {
        const categoryData: { [key: string]: string } = {};

        category.fields.forEach((field) => {
            // Check if the field value is not empty or 0
            if (field.value && field.value !== "0") {
              categoryData[field.id] = field.value;
            }
          });

      if (Object.keys(categoryData).length > 0) {  // Only include category if it has data
        formattedData[category.name] = categoryData;
      }
    });

    return JSON.stringify(formattedData);
  };