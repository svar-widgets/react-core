import { Button, Field, ColorPicker, ModalArea } from '../../src/index';
import { useState } from 'react';
import './ModalArea.css';

export default function ModalAreaDemo() {
  const [show, setShow] = useState(false);

  return (
    <div className="wx-35ecww demo-box">
      <h3>Modal Area</h3>
      <p>Click button to show the modal area</p>
      <Button onClick={() => setShow(!show)}>Click me</Button>
      {show && (
        <ModalArea>
          <div className="wx-35ecww descr">
            <Field label="Color">
              <ColorPicker />
            </Field>
          </div>
          <div className="wx-35ecww descr center">
            <p>To close the modal, click the button below</p>
            <Button onClick={() => setShow(false)}>Close</Button>
          </div>
        </ModalArea>
      )}
    </div>
  );
}
