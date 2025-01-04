import './Calculator.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Calculator() {
    return(
        <Form className='calculatorForm'>
          <div className='calculatorInputs'>
            <Form.Group className = "incomeInputs">
              <Form.Label>Income: </Form.Label>
              <Form.Control />
            </Form.Group>
            <h2> Fixed Expenses</h2>
            <Form.Group className = "fixedExpenses">
              <Form.Label>Rent/Housing: </Form.Label>
              <Form.Control />
              <Form.Label>Other Fixed Expenses: </Form.Label>
              <Form.Control />
            </Form.Group>
          </div>
        {/* <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button type="submit">
          Calculate
        </Button>
      </Form>
    )
}

export default Calculator;