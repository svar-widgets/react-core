import { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import { clickOutside, calculatePosition, getAbsParent } from '@svar-ui/lib-dom';
import './Popup.css';

export function Popup({
  left = 0,
  top = 0,
  at = 'bottom',
  parent = null,
  width = 'auto',
  css = '',
  onCancel,
  children,
  trackScroll = false,
}) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [w, setW] = useState('auto');
  const [visible, setVisible] = useState(false);

  const self = useRef(null);
  const portalRef = useRef(null);

  function getWidth(calcWidth) {
    if (parent && (width + '').indexOf('%') > -1) {
      return width.replace(/(\d+)%/, (match, value) => {
        value = (value * parent.offsetWidth) / 100 + 'px';
        return width.replace(match, value);
      });
    }
    return width && width !== 'auto' ? width : calcWidth;
  }

  const updatePosition = useCallback(() => {
    if (!self.current) return;

    const result = calculatePosition(self.current, parent, at, left, top);
    if (result) {
      setX(result.x);
      setY(result.y);
      setW(getWidth(result.width));
    }
  }, [self, parent, at, left, top, width]);

  useLayoutEffect(() => {
    const onScroll = (e) => {
      if (onCancel && e.target !== portalRef.current && self.current && !self.current.contains(e.target))
        onCancel(e);
    };

    requestAnimationFrame(() => {
      updatePosition();
      setVisible(true);
      if (trackScroll && self.current) {
        portalRef.current = getAbsParent(self.current);
        if (portalRef.current)
          portalRef.current.addEventListener('scroll', onScroll, true);
      }
    });

    return () => {
      if (trackScroll && portalRef.current)
        portalRef.current.removeEventListener('scroll', onScroll, true);
    };
  }, []);

  useLayoutEffect(() => {
    updatePosition();
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
      className={['wx-37M6Fj', 'wx-popup', css].filter(Boolean).join(' ')}
      style={{
        position: 'absolute',
        visibility: visible ? 'visible' : 'hidden',
        top: y + 'px',
        left: x + 'px',
        width: w,
      }}
    >
      {children}
    </div>
  );
}

export default Popup;
