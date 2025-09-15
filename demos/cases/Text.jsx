import { useState } from 'react';
import { Text, Field } from '../../src/index';

export default function Component() {
  const [text2, setText2] = useState('');
  const [password2, setPassword2] = useState('');

  const setText = ({ value }) => {
    setText2(value);
  };

  const setPassword = ({ value }) => {
    setPassword2(value);
  };

  return (
    <>
      <div className="wx-2G3DEY demo-box">
        <h3>Text with a top label</h3>
        <Field label="First name">
          {({ id }) => (
            <Text
              value={text2}
              onChange={setText}
              id={id}
              placeholder="Type here"
            />
          )}
        </Field>
        <Field label="Last name">
          {({ id }) => (
            <Text
              value={text2}
              onChange={setText}
              id={id}
              placeholder="Type here"
            />
          )}
        </Field>
        <Field label="Last name">
          {({ id }) => (
            <Text
              value={text2}
              onChange={setText}
              id={id}
              disabled
              placeholder="Type here"
            />
          )}
        </Field>
        <Field label="Last name" error>
          {({ id }) => (
            <Text
              value={text2}
              onChange={setText}
              id={id}
              error
              placeholder="Type here"
              title="Invalid value"
            />
          )}
        </Field>
      </div>

      <div className="wx-2G3DEY demo-box">
        <h3>Text with a side label</h3>
        <Field label="First name" position="left">
          {({ id }) => <Text value={text2} onChange={setText} id={id} />}
        </Field>
        <Field label="Last name" position="left">
          {({ id }) => <Text value={text2} onChange={setText} id={id} />}
        </Field>
      </div>

      <div className="wx-2G3DEY demo-box">
        <h3>Number input with a side label</h3>
        <Field label="Number" position="left">
          {({ id }) => (
            <Text
              type="number"
              value={password2}
              onChange={setPassword}
              id={id}
            />
          )}
        </Field>
      </div>

      <div className="wx-2G3DEY demo-box">
        <h3>Password input with a side label</h3>
        <Field label="Password" position="left">
          {({ id }) => (
            <Text
              type="password"
              value={password2}
              onChange={setPassword}
              id={id}
            />
          )}
        </Field>
      </div>

      <div className="wx-2G3DEY demo-box">
        <h3>Icon inside of the text control</h3>
        <Field label="Start Date" position="top">
          {({ id }) => <Text id={id} icon="wxi-calendar" css="wx-icon-left" />}
        </Field>
        <Field label="End Date" position="top">
          {({ id }) => <Text id={id} icon="wxi-calendar" />}
        </Field>
      </div>

      <div className="wx-2G3DEY demo-box">
        <h3>Text control with clear button</h3>
        <Field label="First name" position="top">
          {({ id }) => <Text id={id} placeholder="Type here" clear />}
        </Field>
        <Field label="Number" position="top">
          {({ id }) => <Text id={id} type="number" clear />}
        </Field>
        <Field label="Number and icon" position="top">
          {({ id }) => <Text id={id} type="number" clear icon="wxi-calendar" />}
        </Field>
        <Field label="Number and icon left" position="top">
          {({ id }) => (
            <Text
              id={id}
              type="number"
              clear
              icon="wxi-calendar"
              css="wx-icon-left"
            />
          )}
        </Field>
        <Field label="End Date" position="top">
          {({ id }) => <Text id={id} icon="wxi-calendar" clear />}
        </Field>
        <Field label="Start Date" position="top">
          {({ id }) => (
            <Text id={id} icon="wxi-calendar" css="wx-icon-left" clear />
          )}
        </Field>
      </div>
    </>
  );
}
