import { useEffect, useRef, useState } from 'react';
import { clickOutside } from '@svar-ui/lib-dom';
import './Dropdown.css';

function Dropdown({
  position = 'bottom',
  align = 'start',
  autoFit = true,
  onCancel = null,
  width = '100%',
  children,
}) {
  const nodeRef = useRef(null);

  const [positionState, setPosition] = useState(position);
  const [alignState, setAlign] = useState(align);

  useEffect(() => {
    setPosition(position);
  }, [position]);

  useEffect(() => {
    setAlign(align);
  }, [align]);

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
  }, [autoFit, alignState, positionState]);

  useEffect(() => {
    const down = (e) => {
      onCancel && onCancel(e);
    };
    if (nodeRef.current) {
      return clickOutside(nodeRef.current, down).destroy;
    }
  }, [onCancel]);

  return (
    <div
      ref={nodeRef}
      className={'wx-32GZ52' + ` wx-dropdown wx-${positionState}-${alignState}`}
      style={{ width: width }}
    >
      {children}
    </div>
  );
}

export default Dropdown;
