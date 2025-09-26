import { useState } from 'react';
import { Field, Slider } from '../../src/index';

export default function SliderDemo() {
  const [valueA, setValueA] = useState(50);
  const [valueB, setValueB] = useState(50);
  const [valueC, setValueC] = useState(50);

  function onInput({ input, value, previous }) {
    if (input) {
      console.log(`Input change from ${previous} to ${value}`);
      setValueB(value);
    }
  }
  function onChange({ input, value, previous }) {
    if (!input) {
      console.log(`Final input change from ${previous} to ${value}`);
      setValueC(value);
    }
  }

  return (
    <div className="wx-24lPdP demo-box">
      <h3>Slider</h3>
      <Field label="Updates from binding" position="left" type="slider">
        {({ id }) => (
          <Slider
            id={id}
            label={`Progress: ${valueA}%`}
            value={valueA}
            onChange={({ value }) => setValueA(value)}
          />
        )}
      </Field>
      <Field
        label="Updates from input 'change' event"
        position="left"
        type="slider"
      >
        {({ id }) => (
          <Slider
            id={id}
            label={`Progress: ${valueB}%`}
            value={valueB}
            onChange={onInput}
          />
        )}
      </Field>
      <Field label="Updates from 'change' event" position="left" type="slider">
        {({ id }) => (
          <Slider
            id={id}
            label={`Progress: ${valueC}%`}
            value={valueC}
            onChange={onChange}
          />
        )}
      </Field>
      <Field label="Disabled" position="left" type="slider">
        {({ id }) => <Slider disabled id={id} value={20} />}
      </Field>
      <Field label="Unset value" position="left" type="slider">
        {({ id }) => <Slider id={id} title="Default slider's value is 0" />}
      </Field>
    </div>
  );
}
