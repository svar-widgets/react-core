import { useRef, useEffect } from 'react';
import { clickOutside } from '@svar-ui/lib-dom';
import './SideArea.css';

export default function SideArea({ position = 'right', children, onCancel }) {
  const divRef = useRef(null);

  useEffect(() => {
    return clickOutside(divRef.current, onCancel).destroy;
  }, []);

  return (
    <div ref={divRef} className={`wx-2L733M wx-sidearea wx-pos-${position}`}>
      {children}
    </div>
  );
}
