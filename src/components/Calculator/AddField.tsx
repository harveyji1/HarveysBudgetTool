import './AddField.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import { DropdownButton } from 'react-bootstrap';

interface AddFieldProps {
  onAddField: (categoryName: string, sector: string) => void;
}

function AddField({ onAddField }: AddFieldProps) {
  const [newFieldName, setNewFieldName] = useState('');
  const [newCategory, setNewCategory] = useState('Set the Category');
  const [error, setError] = useState<string | null>(null); // State for error message

  const handleAdd = () => {
    if (newFieldName.trim() === '') {
      setError('Please enter a field name.');
      return;
    }
    if (newCategory === 'Set the Category') {
      setError('Please choose a category.');
      return;
    }

    // If no errors, proceed with adding the category
    onAddField(newFieldName.trim(), newCategory);
    setNewFieldName(''); // Clear input after adding
    setError(null); // Clear error message
  };

  return (
    <div className="addFieldContainer">
      <h3 className='categoryHeader'>Add a Field</h3>
      <h6 className='categoryDesc'>Add fields to customize for your budget</h6>
      <div className='addFieldOptions'>
      <Form.Group>
        <div className="formField">
          <DropdownButton id="dropdown-basic-button" title={newCategory}>
            <Dropdown.Item onClick={() => setNewCategory('Income')}>Income</Dropdown.Item>
            <Dropdown.Item onClick={() => setNewCategory('Fixed Expenses')}>Fixed Expenses</Dropdown.Item>
            <Dropdown.Item onClick={() => setNewCategory('Non-Fixed Expenses')}>Non-Fixed Expenses</Dropdown.Item>
          </DropdownButton>
          <Form.Control
            type="text"
            value={newFieldName}
            onChange={(e) => setNewFieldName(e.target.value)}
            placeholder="Enter field name"
          />
        </div>
      </Form.Group>
      {error && <p className="error-text">{error}</p>} {/* Show error message if present */}
      <Button onClick={handleAdd} className="mt-2">
        Add Field
      </Button>
      </div>
    </div>
  );
}

export default AddField;
