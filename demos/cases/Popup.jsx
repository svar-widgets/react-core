import { useState, useRef } from 'react';
import { Button, Popup } from '../../src/index';
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
  function showCenter() {
    setIsOpen(true);
    setMode('center');
    setParent(document.body);
  }

  function onCancel() {
    setIsOpen(false);
  }

  return (
    <div className="wx-3w6KNK demo-box">
      <h3>Popup</h3>
      <div className="wx-3w6KNK toolbar">
        <div>
          <Button type="block" onClick={showAt}>
            Show at position
          </Button>
        </div>
        <div ref={node}>
          <Button type="block" onClick={showNext}>
            Show next to button
          </Button>
        </div>
        <div>
          <Button type="block" onClick={showCenter}>
            Show at center
          </Button>
        </div>
      </div>
      <div>
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
            </div>
          </Popup>
        )}
      </div>
    </div>
  );
}
