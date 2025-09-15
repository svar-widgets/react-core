import { useState } from 'react';
import { ColorBoard, ColorPicker, Field } from '../../src/index';

export default function ColorPickerDemo() {
  const [value, setValue] = useState('#48C8E2');
  const [selectedColor, setSelectedColor] = useState('');

  return (
    <>
      <div className="wx-80WVQA demo-box">
        <h3>The current color: {value || ''}</h3>
        <div style={{ width: '300px', height: 'auto' }}>
          <ColorBoard value={value} onValueChange={setValue} />
        </div>
        <h3>The selected form color: {selectedColor || ''}</h3>
        <div style={{ width: '300px', height: 'auto' }}>
          <ColorBoard value={selectedColor} onValueChange={setSelectedColor} />
        </div>
      </div>

      <div className="wx-80WVQA demo-box">
        <h3>Custom color select forms:</h3>
        <Field label="Your color" position="left">
          {({ id }) => (
            <ColorPicker
              value="#5D59BA"
              id={id}
              placeholder="Select a color..."
            />
          )}
        </Field>
        <Field label="Disabled" position="left">
          {({ id }) => (
            <ColorPicker
              id={id}
              placeholder="Select a color..."
              disabled
              value="#65D3B3"
            />
          )}
        </Field>
        <Field label="Error" position="left" error>
          {({ id }) => (
            <ColorPicker id={id} placeholder="Select a color..." error />
          )}
        </Field>
        <Field label="Clear button" position="left">
          {({ id }) => (
            <ColorPicker
              id={id}
              value="#65D3B3"
              placeholder="Select a color..."
              clear
            />
          )}
        </Field>
      </div>
    </>
  );
}
