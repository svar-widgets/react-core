import { useState } from 'react';
import { Button, ColorPicker, Field, SideArea } from '../../src/index';
import './SideArea.css';

const cssScope = 'wx-hSXsec';

export default function SideAreaDemo() {
  const [show, setShow] = useState(false);

  return (
    <div className={cssScope + ' demo-box'}>
      <h3>Side Area</h3>
      <p>Click button to show the side area</p>
      <Button onClick={() => setShow(!show)}>Click me</Button>
      {show && (
        <SideArea onCancel={() => setShow(false)}>
          <div className={cssScope + ' descr'}>
            <h3>Some content</h3>
            <Field label="Color">
              <ColorPicker />
            </Field>
          </div>
        </SideArea>
      )}
    </div>
  );
}
