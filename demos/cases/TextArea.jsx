import { useState } from 'react';
import { TextArea, Field } from '../../src/index';

export default function Demo() {
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
      <div className="wx-2Y6z85 demo-box">
        <h3>Area with a top label</h3>
        <Field label="Details">
          <TextArea value={v1} onChange={setV1} placeholder="Type here" />
        </Field>
        <Field label="Disabled">
          <TextArea
            value={v1}
            onChange={setV1}
            disabled
            placeholder="Type here"
          />
        </Field>
        <Field label="Readonly">
          <TextArea
            value={v1}
            onChange={setV1}
            readonly
            placeholder="Type here"
          />
        </Field>
        <Field label="Error" error>
          <TextArea
            value={v1}
            onChange={setV1}
            error
            placeholder="Type here"
            title="It can't be empty"
          />
        </Field>
      </div>

      <div className="wx-2Y6z85 demo-box">
        <h3>Area with a side label</h3>
        <Field label="Details" position="left">
          <TextArea value={v2} onChange={setV2} placeholder="Type here" />
        </Field>
      </div>
    </>
  );
}
