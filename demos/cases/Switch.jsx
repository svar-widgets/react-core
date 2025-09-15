import { useState } from 'react';
import { Switch, Field } from '../../src/index.js';

export default function SwitchDemo() {
  const [v1, setV1] = useState(true);
  const [v2, setV2] = useState(false);

  return (
    <>
      <div className="wx-1fqWan demo-box">
        <h3>Switch Button</h3>
        <Field>
          <Switch value={v1} onChange={(e) => setV1(e.value)} />
        </Field>
      </div>

      <div className="wx-1fqWan demo-box">
        <h3>Switch Button with a side label</h3>
        <Field label={`Switch: ${v2}`} position="left" type="switch">
          {({ id }) => (
            <Switch value={v2} onChange={(e) => setV2(e.value)} id={id} />
          )}
        </Field>
        <Field label="Disabled" position="left" type="switch">
          {({ id }) => <Switch disabled id={id} />}
        </Field>
      </div>
    </>
  );
}
