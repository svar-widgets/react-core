import { useContext, useRef, useEffect, useState } from 'react';
import { theme as themeContext } from '../context.js';
import { createPortal } from 'react-dom';

function Portal({ theme: initialTheme = '', target, children }) {
  const portalRef = useRef(null);
  const componentRef = useRef(null);
  const [targetRef, setTargetRef] = useState(null);

  if (!portalRef.current) {
    portalRef.current = document.createElement('div');
  }

  const contextTheme = useContext(themeContext);

  useEffect(() => {
    setTargetRef(
      target || getParentRoot(componentRef.current) || document.body,
    );
  }, [componentRef.current]);

  return (
    <>
      <span ref={componentRef} style={{ display: 'none' }} />
      {componentRef.current && targetRef
        ? createPortal(
            <div
              className={`wx-3ZWsT0 wx-${initialTheme || contextTheme}-theme`}
            >
              {children}
            </div>,
            targetRef,
          )
        : null}
    </>
  );
}

export default Portal;

function getParentRoot(p) {
  while (p && p !== document.body && !p.getAttribute('data-wx-portal-root')) {
    p = p.parentNode;
  }
  return p;
}
