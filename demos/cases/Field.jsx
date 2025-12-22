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
          <Text value={v1} onChange={setV1} />
        </Field>
        <Field label="Error" error>
          <Text value={v1} onChange={setV1} error />
        </Field>
        <Field label="Required" required>
          <Text value={v1} onChange={setV1} />
        </Field>
      </div>

      <div className="wx-1y9ERZ demo-box">
        <h3>Left Field</h3>
        <Field label="Text" position="left">
          <Text value={v2} onChange={setV2} />
        </Field>
        <Field label="Error" position="left" error>
          <Text value={v2} onChange={setV2} error />
        </Field>
        <Field label="Required" position="left" required>
          <Text value={v2} onChange={setV2} />
        </Field>
      </div>

      <div className="wx-1y9ERZ demo-box">
        <h3>Field with multiple inputs</h3>
        <Field label="Text" position="left">
          <Text placeholder="This gets associated label" /><br />
          <Text placeholder="This one does not" />
        </Field>
      </div>

      <div className="wx-1y9ERZ demo-box">
        <h3>Nested Fields controls</h3>
        <Field label="Each control is associated with its closest Field label">
        <Field label="First Name" position="left">
          <Text />
        </Field>
        <Field label="Last Name" position="left">
          <Text />
        </Field>
      </Field>
      </div>
    </>
  );
}
