import { useState } from 'react';
import { Select, Field } from '../../src/index.js';
import { users } from '../data/userlist';

export default function Demo() {
  const [v1, setV1] = useState('');
  const [v2, setV2] = useState('');

  return (
    <>
      <div className="wx-1Zx2ti demo-box">
        <h3>Select with a top label</h3>
        <Field label="Details">
          {({ id }) => (
            <Select
              value={v1}
              onChange={(e) => setV1(e.value)}
              id={id}
              options={users}
            />
          )}
        </Field>

        <h3>Select with a placeholder</h3>
        <Field label="Details">
          <Select options={users} placeholder="Select a user" />
        </Field>
      </div>

      <div className="wx-1Zx2ti demo-box">
        <h3>Select with a side label</h3>
        <Field label="Details" position="left">
          {({ id }) => (
            <Select
              value={v2}
              onChange={(e) => setV2(e.value)}
              id={id}
              options={users}
            />
          )}
        </Field>
        <Field label="Disabled" position="left">
          {({ id }) => <Select id={id} disabled options={users} />}
        </Field>
        <Field label="Error" position="left" error>
          {({ id }) => (
            <Select id={id} error options={users} title="Invalid option" />
          )}
        </Field>
      </div>
    </>
  );
}
