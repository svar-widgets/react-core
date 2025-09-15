import { useState } from 'react';
import { Text, Field } from '../../src/index.js';

export default function Component() {
  const [v1, setterV1] = useState('');
  const [v2, setterV2] = useState('');

  const setV1 = ({ value }) => {
    setterV1(value);
  };

  const setV2 = ({ value }) => {
    setterV2(value);
  };

  return (
    <>
      <div className="wx-1y9ERZ demo-box">
        <h3>Top Fields</h3>
        <Field label="Text">
          {({ id }) => <Text value={v1} onChange={setV1} id={id} />}
        </Field>
        <Field label="Error" error>
          {({ id }) => <Text value={v1} onChange={setV1} id={id} error />}
        </Field>
        <Field label="Required" required>
          {({ id }) => <Text value={v1} onChange={setV1} id={id} />}
        </Field>
      </div>

      <div className="wx-1y9ERZ demo-box">
        <h3>Left Field</h3>
        <Field label="Text" position="left">
          {({ id }) => <Text value={v2} onChange={setV2} id={id} />}
        </Field>
        <Field label="Error" position="left" error>
          {({ id }) => <Text value={v2} onChange={setV2} id={id} error />}
        </Field>
        <Field label="Required" position="left" required>
          {({ id }) => <Text value={v2} onChange={setV2} id={id} />}
        </Field>
      </div>
    </>
  );
}
