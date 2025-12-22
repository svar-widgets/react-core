import { useEffect, useRef } from 'react';
import { clickOutside, env } from '@svar-ui/lib-dom';
import { useWritableProp } from '@svar-ui/lib-react';
import './Dropdown.css';

function Dropdown({
  position = 'bottom',
  align = 'start',
  autoFit = true,
  onCancel,
  width = '100%',
  children,
}) {
  const nodeRef = useRef(null);

  const [positionState, setPosition] = useWritableProp(position);
  const [alignState, setAlign] = useWritableProp(align);

  useEffect(() => {
    if (autoFit) {
      const node = nodeRef.current;
      if (node) {
        const nodeCoords = node.getBoundingClientRect();
        const bodyCoords = env.getTopNode(node).getBoundingClientRect();

        if (nodeCoords.right >= bodyCoords.right) {
          setAlign('end');
        }

        if (nodeCoords.bottom >= bodyCoords.bottom) {
          setPosition('top');
        }
      }
    }
  }, [autoFit]);

  useEffect(() => {
    if (nodeRef.current) {
      const down = (e) => {
        onCancel && onCancel(e);
      };
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
