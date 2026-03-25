import { useState, useRef } from 'react';
import { Button, Popup, Slider } from '../../src/index';
import { env } from '@svar-ui/lib-dom';
import './Popup.css';

export default function DemoPopup() {
  let node = useRef(null);
  let [isOpen, setIsOpen] = useState(false);
  let [mode, setMode] = useState('bottom');
  let [parent, setParent] = useState(null);

  function showAt() {
    setIsOpen(true);
    setMode('point');
    setParent(null);
  }
  function showNext() {
    setIsOpen(true);
    setMode('bottom');
    setParent(node.current);
  }
  function showCenter(ev) {
    setIsOpen(true);
    setMode('center');
    setParent(env.getTopNode(ev.target));
  }

  function onCancel() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="wx-3w6KNK demo-box">
        <h3>Popup (local)</h3>
        <div className="demo-row">
          <Button onClick={showAt}>Show at position</Button>
          <div ref={node}>
            <Button onClick={showNext}>Show next to button</Button>
          </div>
          <Button onClick={showCenter}>Show at center</Button>
        </div>
      </div>

      {isOpen && (
        <Popup
          onCancel={onCancel}
          at={mode}
          parent={parent}
          left={100}
          top={100}
        >
          <div className="wx-3w6KNK popup">
            <p>Some text here and there</p>
            <p>Some text here and there</p>
            <p>Some text here and there</p>
            <Slider />
          </div>
        </Popup>
      )}
    </>
  );
}
