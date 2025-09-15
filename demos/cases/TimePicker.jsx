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
          {({ id }) => <TimePicker value={value} id={id} onChange={setValue} />}
        </Field>
        <Field label="Disabled" position="left">
          {({ id }) => (
            <TimePicker value={value} disabled id={id} onChange={setValue} />
          )}
        </Field>
        <Field label="Error" position="left" error>
          {({ id }) => (
            <TimePicker
              value={value}
              error
              id={id}
              title="Invalid option"
              onChange={setValue}
            />
          )}
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
          <TimePicker value={value} onChange={setValue} />
        </Locale>
      </div>

      <div className="wx-28AwJ6 demo-box">
        <h3>CN locale</h3>
        <Locale words={cn}>
          <TimePicker value={value} onChange={setValue} />
        </Locale>
      </div>
    </>
  );
}
