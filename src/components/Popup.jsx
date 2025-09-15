import { useState, useEffect, useRef, useCallback } from 'react';
import { clickOutside, calculatePosition } from '@svar-ui/lib-dom';
import './Popup.css';

export function Popup({
  left = 0,
  top = 0,
  at = 'bottom',
  parent = null,
  onCancel,
  children,
}) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [width, setWidth] = useState('auto');
  const [visible, setVisible] = useState(false);

  const self = useRef(null);

  const updatePosition = useCallback(() => {
    if (!self.current) return;

    const result = calculatePosition(self.current, parent, at, left, top);
    if (result) {
      setX(result.x);
      setY(result.y);
      setWidth(result.width);
      setVisible(true);
    }
  }, [self, parent, at, left, top]);

  useEffect(() => {
    requestAnimationFrame(updatePosition);
  }, []);

  useEffect(() => {
    updatePosition(parent);
  }, [parent, at, left, top]);

  useEffect(() => {
    const down = (e) => {
      onCancel && onCancel(e);
    };
    if (self.current) {
      return clickOutside(self.current, down).destroy;
    }
  }, [onCancel]);

  return (
    <div
      ref={self}
      className="wx-37M6Fj wx-popup"
      style={{
        position: 'absolute',
        visibility: visible ? 'visible' : 'hidden',
        top: y + 'px',
        left: x + 'px',
        width: width,
      }}
    >
      {children}
    </div>
  );
}

export default Popup;
