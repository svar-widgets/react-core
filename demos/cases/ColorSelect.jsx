import { useState } from 'react';
import { ColorSelect, Field } from '../../src/index';

export default function SelectColorDemo() {
  const [color, setColor] = useState('');

  return (
    <>
      <div className="wx-2R6R2t demo-box">
        <h3>The selected color: {color ? color : ''}</h3>
        <Field label="Select a color">
          <ColorSelect
            value={color}
            onChange={({ value }) => setColor(value)}
            title="Colors can be reconfigured"
          />
        </Field>
      </div>

      <div className="wx-2R6R2t demo-box">
        <h3>Custom colors</h3>
        <Field label="Your color" position="left">
          <ColorSelect
            colors={['#65D3B3', '#FFC975', '#58C3FE']}
            placeholder="Select a color..."
          />
        </Field>
        <Field label="Disabled" position="left">
          <ColorSelect
            colors={['#65D3B3', '#FFC975', '#58C3FE']}
            placeholder="Select a color..."
            disabled
            value="#65D3B3"
          />
        </Field>
        <Field label="Error" position="left" error>
          <ColorSelect
            colors={['#65D3B3', '#FFC975', '#58C3FE']}
            placeholder="Select a color..."
            error
          />
        </Field>
      </div>

      <div className="wx-2R6R2t demo-box">
        <h3>Clear icon</h3>
        <Field label="Select a color">
          <ColorSelect
            value="#65D3B3"
            placeholder="Select a color..."
            clear
          />
        </Field>
      </div>
    </>
  );
}
