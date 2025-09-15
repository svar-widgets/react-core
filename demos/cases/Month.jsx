import { useEffect, useContext, useRef } from 'react';
import { Month, context } from '../../src/index';
import { delegateClick } from '@svar-ui/lib-dom';
import './Month.css';

function MonthDemo() {
  const helpers = useContext(context.helpers);

  const value = new Date(2025, 4, 1);
  const addMonth = (date, n) => {
    const next = new Date(date);
    next.setMonth(next.getMonth() + n);
    return next;
  };

  const nodeRef = useRef(null);
  useEffect(() => {
    delegateClick(nodeRef.current, {
      click: (id) => {
        helpers.showNotice({
          text: 'click on ' + new Date(id).toString().substring(0, 15),
        });
      },
    });
  }, [helpers]);

  return (
    <>
      <div className="wx-1Y7Cn3 demo-box" style={{ width: 300 }}>
        <h3>Month view</h3>
        <div className="wx-1Y7Cn3 row" ref={nodeRef}>
          <div className="wx-1Y7Cn3 cell">
            <Month current={addMonth(value, 0)} />
          </div>
          <div className="wx-1Y7Cn3 cell">
            <Month current={addMonth(value, 1)} />
          </div>
          <div className="wx-1Y7Cn3 cell">
            <Month current={addMonth(value, 2)} />
          </div>
        </div>
      </div>

      <div className="wx-1Y7Cn3 demo-box custom_size">
        <h3>Calendar with custom size</h3>
        <Month current={new Date(2022, 2, 18)} />
      </div>
    </>
  );
}

export default MonthDemo;
