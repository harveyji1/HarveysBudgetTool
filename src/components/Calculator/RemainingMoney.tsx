import './RemainingMoney.css';
import { Form } from 'react-bootstrap';

interface RemainingMoneyProps {
  remainingMoney: number;
}

const RemainingMoney: React.FC<RemainingMoneyProps> = ({ remainingMoney }) => {

  return (
    <div className='remainingBudgetContainer'>
      <div className='formField'>
      <Form.Label className='fieldLabel'>
        Remaining Money: 
      </Form.Label>
        <Form.Control
          type='number'
          value={remainingMoney}
          readOnly
        />
      </div>
    </div>
  );
};

export default RemainingMoney;