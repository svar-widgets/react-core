import { useState } from 'react';
import { TimePicker, Field, Locale } from '../../src/index';
import { cn } from '@svar-ui/core-locales';

export default function TimePickerDemo() {
  const [value, setV] = useState(new Date());
  const setValue = ({ value }) => {
    setV(value);
  };

  return (
    <>
      <div className="wx-28AwJ6 demo-box">
        <h3>TimePicker</h3>
        <Field label="Initial value" position="left">
          <TimePicker value={value} onChange={setValue} />
        </Field>
        <Field label="Default value" position="left">
          <TimePicker />
        </Field>
      </div>

      <div className="wx-28AwJ6 demo-box">
        <h3>TimePicker with a side label</h3>
        <Field label="Time" position="left">
          <TimePicker value={value} onChange={setValue} />
        </Field>
        <Field label="Disabled" position="left">
          <TimePicker value={value} disabled onChange={setValue} />
        </Field>
        <Field label="Error" position="left" error>
          <TimePicker
            value={value}
            error
            title="Invalid option"
            onChange={setValue}
          />
        </Field>
      </div>

      <div className="wx-28AwJ6 demo-box">
        <h3>TimePicker with a dropdown that matches the input width</h3>
        <Field label="Time" position="left">
          <TimePicker dropdown={{ width: '100%' }} value={value} />
        </Field>
      </div>

      <div className="wx-28AwJ6 demo-box">
        <h3>12-hour TimePicker</h3>
        <Locale
          words={{
            formats: { timeFormat: '%g:%i %a' },
            calendar: { clockFormat: 12 },
          }}
        >
          <Field>
            <TimePicker value={value} onChange={setValue} />
          </Field>
        </Locale>
      </div>

      <div className="wx-28AwJ6 demo-box">
        <h3>CN locale</h3>
        <Locale words={cn}>
          <Field>
            <TimePicker value={value} onChange={setValue} />
          </Field>
        </Locale>
      </div>
    </>
  );
}
