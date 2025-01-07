import './Calculator.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Calculator() {
    return(

        <Form className='calculatorForm'> 
          <div className='calculatorInputs'>
            <h2 className='categoryHeader'>Income</h2>
            <Form.Group className = "incomeInputs">
              <Form.Label>Income (Total After Tax): </Form.Label>
              <Form.Control type='number'/>
            </Form.Group>
            <h2 className='categoryHeader'>Fixed Expenses</h2>
            <h4 className='categoryDesc'>Expenses that can not or will not change</h4>
            <Form.Group className = "fixedExpenses">
              <Form.Label>Rent/Mortgage: </Form.Label>
              <Form.Control type='number'/>
              <Form.Label>Car Payments: </Form.Label>
              <Form.Control type='number'/>
              <Form.Label>Debt Payments: </Form.Label>
              <Form.Control type='number'/>
              <Form.Label>Insurance: </Form.Label>
              <Form.Control type='number'/>
              <Form.Label>Investments: </Form.Label>
              <Form.Control type='number'/>
              <Form.Label>Tuiton: </Form.Label>
              <Form.Control type='number'/>
              <Form.Label>Emergency Funds: </Form.Label>
              <Form.Control type='number'/>
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