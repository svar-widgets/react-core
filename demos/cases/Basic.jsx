import { useContext } from 'react';
import { Button, Segmented, Calendar, context } from '../../src/index';

const Basic = () => {
  const { showNotice } = useContext(context.helpers);

  const onClick = () => {
    showNotice({
      text: 'Button clicked',
    });
  };

  return (
    <>
      <div className="wx-1n1s96 demo-box">
        <h3>Buttons</h3>
        <Button onClick={onClick} type="primary">
          Primary
        </Button>{' '}
        <Button onClick={onClick} type="secondary">
          Secondary
        </Button>{' '}
        <Button onClick={onClick} type="danger">
          Danger
        </Button>
      </div>

      <div className="wx-1n1s96 demo-box">
        <h3>Segmented</h3>
        <Segmented
          value="2"
          options={[
            { id: '1', label: 'One' },
            { id: '2', label: 'Two' },
            { id: '3', label: 'Three' },
          ]}
        ></Segmented>
      </div>

      <div className="wx-1n1s96 demo-box">
        <h3>Calendar</h3>
        <div style={{ width: '280px' }}>
          <Calendar value={new Date(2025, 4, 1)} />
        </div>
      </div>
    </>
  );
};

export default Basic;
