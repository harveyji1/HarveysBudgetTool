import './AddCategory.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import { DropdownButton } from 'react-bootstrap';

interface AddCategoryProps {
  onAddCategory: (categoryName: string, sector: string) => void;
}

function AddCategory({ onAddCategory }: AddCategoryProps) {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newSector, setNewSector] = useState('Set the Sector');
  const [error, setError] = useState<string | null>(null); // State for error message

  const handleAdd = () => {
    if (newCategoryName.trim() === '') {
      setError('Please enter a category name.');
      return;
    }
    if (newSector === 'Set the Sector') {
      setError('Please choose a sector.');
      return;
    }

    // If no errors, proceed with adding the category
    onAddCategory(newCategoryName.trim(), newSector);
    setNewCategoryName(''); // Clear input after adding
    setError(null); // Clear error message
  };

  return (
    <div className="addCategory">
      <Form.Group>
        <div className="formField">
          <DropdownButton id="dropdown-basic-button" title={newSector}>
            <Dropdown.Item onClick={() => setNewSector('Income')}>Income</Dropdown.Item>
            <Dropdown.Item onClick={() => setNewSector('Fixed Expenses')}>Fixed Expenses</Dropdown.Item>
            <Dropdown.Item onClick={() => setNewSector('Non-Fixed Expenses')}>Non-Fixed Expenses</Dropdown.Item>
          </DropdownButton>
          <Form.Control
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Enter category name"
          />
        </div>
      </Form.Group>
      {error && <p className="error-text">{error}</p>} {/* Show error message if present */}
      <Button onClick={handleAdd} className="mt-2">
        Add Category
      </Button>
    </div>
  );
}

export default AddCategory;
