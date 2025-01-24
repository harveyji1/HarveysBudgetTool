import './AddCategory.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import { DropdownButton } from 'react-bootstrap';


interface AddCategoryProps {
  onAddCategory: (categoryName: string) => void;
}

function AddCategory({ onAddCategory }: AddCategoryProps) {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newSector, setNewSector] = useState('Set the Sector');

  const handleAdd = () => {
    if (newCategoryName.trim() !== '') {
      onAddCategory(newCategoryName.trim());
      setNewCategoryName(''); // Clear input after adding
    }
  };

  return (
    <div className="addCategory">
      <Form.Group>
        <div className='formField'>
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
      <Button onClick={handleAdd} className="mt-2">
        Add Category
      </Button>
    </div>
  );
}

export default AddCategory;