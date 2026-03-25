import { useState, useEffect, useRef, useMemo, useLayoutEffect } from 'react';
import Portal from './Portal.jsx';
import Popup from './Popup.jsx';
import InlineDropdown from './helpers/InlineDropdown.jsx';
import './Dropdown.css';

function Dropdown({
  position = 'bottom',
  align = 'start',
  autoFit = true,
  inline = false,
  onCancel,
  width = '100%',
  children,
  ...props
}) {
  const [target, setTarget] = useState(undefined);
  const nodeRef = useRef(null);

  const at = useMemo(() => `${position}-${align}`, [position, align]);

  useLayoutEffect(() => {
    if (nodeRef.current) {
      setTarget(nodeRef.current.parentNode);
    }
  }, []);

  return (
    <>
      {target && (inline ? (
        <InlineDropdown
          onCancel={onCancel}
          position={position}
          align={align}
          autoFit={autoFit}
          width={width}
          {...props}
        >
          {children}
        </InlineDropdown>
      ) : (
        <Portal>
          <Popup parent={target} at={at} onCancel={onCancel} width={width} {...props}>
            {children}
          </Popup>
        </Portal>
      ))}
      <span ref={nodeRef} className="wx-portal-node wx-32GZ52" />
    </>
  );
}

export default Dropdown;
