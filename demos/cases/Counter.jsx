import { useState } from 'react';
import { Counter, Field } from '../../src/index';

export default function CounterDemo() {
  // Initial values
  const [v1, setV1] = useState(5);
  const [v2, setV2] = useState(3);
  const [v3, setV3] = useState(29);
  const [v4, setV4] = useState(0);

  // Event handler
  function handleChange({ input, value }) {
    if (!input) setV4(value);
  }

  return (
    <div className="wx-1bOyjr demo-box">
      <Field label="No initial value">{({ id }) => <Counter id={id} />}</Field>

      <Field label="Initial value">
        {({ id }) => (
          <>
            <Counter id={id} value={v1} onChange={(e) => setV1(e.value)} />
            <div className="wx-1bOyjr">The value is: {v1}</div>
          </>
        )}
      </Field>

      <Field label="Custom step">
        {({ id }) => (
          <Counter
            id={id}
            value={v2}
            onChange={(e) => setV2(e.value)}
            step={3}
          />
        )}
      </Field>

      <Field label="With negative numbers">
        {({ id }) => <Counter id={id} min={-Infinity} />}
      </Field>

      <Field label="With custom min and max values (-30, 30)">
        {({ id }) => (
          <Counter
            id={id}
            min={-30}
            max={30}
            value={v3}
            onChange={(e) => setV3(e.value)}
          />
        )}
      </Field>

      <Field label="Handling change event">
        {({ id }) => (
          <>
            <Counter id={id} onChange={handleChange} />
            <div className="wx-1bOyjr">The value is: {v4}</div>
          </>
        )}
      </Field>

      <Field label="Disabled">{({ id }) => <Counter id={id} disabled />}</Field>

      <Field label="Readonly">{({ id }) => <Counter id={id} readonly />}</Field>

      <Field label="Error">{({ id }) => <Counter id={id} error />}</Field>
    </div>
  );
}
