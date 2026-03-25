import { useState } from 'react';
import { Field, Dropdown, Calendar, RadioButtonGroup, Button } from '../../src/index';
import './Dropdown.css';

const positions = ['bottom', 'top', 'left', 'right'].map(id => ({ id, label: id }));
const alignOptions = ['start', 'center', 'end'].map(id => ({ id, label: id }));

export default function DemoDropdown() {
  const [popup, setPopup] = useState(undefined);
  const [position, setPosition] = useState('bottom');
  const [align, setAlign] = useState('start');

  return (
    <div className="wx-DrpDwn01 demo-box">
      <div className="wx-DrpDwn01 label">Select dropdown position</div>
      <RadioButtonGroup
        options={positions}
        value={position}
        onChange={({ value }) => setPosition(value)}
        type="inline"
      />

      <div className="wx-DrpDwn01 label">Select dropdown align</div>
      <RadioButtonGroup
        options={alignOptions}
        value={align}
        onChange={({ value }) => setAlign(value)}
        type="inline"
      />

      <div className="wx-DrpDwn01 dropdown-box">
        <Field>
          <Button css="my-button" onClick={() => setPopup(true)}>
            Click to show a dropdown
          </Button>
          {popup && (
            <Dropdown
              width="300px"
              position={position}
              align={align}
              onCancel={() => setPopup(false)}
              css="my-dropdown"
            >
              <Calendar />
            </Dropdown>
          )}
        </Field>
      </div>
    </div>
  );
}
