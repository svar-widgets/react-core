import { useState, useEffect, useRef } from 'react';
import { clickOutside } from '@svar-ui/lib-dom';
import './InlineDropdown.css';

function InlineDropdown({
  position: positionProp = 'bottom',
  align: alignProp = 'start',
  autoFit = true,
  onCancel = null,
  width = '100%',
  css = '',
  children,
}) {
  const nodeRef = useRef(null);
  const [position, setPosition] = useState(positionProp);
  const [align, setAlign] = useState(alignProp);
  const onCancelRef = useRef(onCancel);

  useEffect(() => {
    onCancelRef.current = onCancel;
  }, [onCancel]);

  useEffect(() => {
    if (autoFit) {
      const node = nodeRef.current;
      if (node) {
        const nodeCoords = node.getBoundingClientRect();
        const bodyCoords = document.body.getBoundingClientRect();

        if (nodeCoords.right >= bodyCoords.right) {
          setAlign('end');
        }

        if (nodeCoords.bottom >= bodyCoords.bottom) {
          setPosition('top');
        }
      }
    }
  }, []);

  useEffect(() => {
    if (nodeRef.current) {
      const down = (e) => {
        onCancelRef.current && onCancelRef.current(e);
      };
      return clickOutside(nodeRef.current, down).destroy;
    }
  }, []);

  return (
    <div
      ref={nodeRef}
      className={[
        'wx-dropdown',
        `wx-${position}-${align}`,
        css || '',
        'wx-aaaVytZW',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ width: width }}
    >
      {children}
    </div>
  );
}

export default InlineDropdown;
