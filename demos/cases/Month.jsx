import { useContext } from 'react';
import { Month, context } from '../../src/index';
import './Month.css';

function MonthDemo() {
  const helpers = useContext(context.helpers);

  const value = new Date(2025, 4, 1);
  const addMonth = (date, n) => {
    const next = new Date(date);
    next.setMonth(next.getMonth() + n);
    return next;
  };

  function onChange(date) {
    helpers.showNotice({
      text: 'click on ' + date.toString().substring(0, 15),
    });
  }

  return (
    <>
      <div className="wx-1Y7Cn3 demo-box">
        <h3>Month view</h3>
        <div className="wx-1Y7Cn3 row">
          <div className="wx-1Y7Cn3 cell">
            <Month current={addMonth(value, 0)} onChange={onChange} />
          </div>
          <div className="wx-1Y7Cn3 cell">
            <Month current={addMonth(value, 1)} onChange={onChange} />
          </div>
          <div className="wx-1Y7Cn3 cell">
            <Month current={addMonth(value, 2)} onChange={onChange} />
          </div>
        </div>
      </div>

      <div className="wx-1Y7Cn3 demo-box custom">
        <h3>Month view with custom styles</h3>
        <Month current={new Date(2022, 2, 18)} />
      </div>
    </>
  );
}

export default MonthDemo;
