import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface AddCategoryProps {
  onAddCategory: (categoryName: string) => void;
}

function AddCategory({ onAddCategory }: AddCategoryProps) {
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleAdd = () => {
    if (newCategoryName.trim() !== '') {
      onAddCategory(newCategoryName.trim());
      setNewCategoryName(''); // Clear input after adding
    }
  };

  return (
    <div className="addCategory">
      <Form.Group>
        <Form.Label>Add a Fixed Expense Category</Form.Label>
        <Form.Control
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="Enter category name"
        />
      </Form.Group>
      <Button onClick={handleAdd} className="mt-2">
        Add Category
      </Button>
    </div>
  );
}

export default AddCategory;