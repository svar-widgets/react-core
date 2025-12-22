import { useEffect, useRef, useState, useMemo } from 'react';
import { useHotkeys } from '@svar-ui/lib-react';
import Button from './Button.jsx';
import './Fullscreen.css';

export default function Fullscreen({
  hotkey = null,
  toggleButton,
  children,
}) {
  const nodeRef = useRef(null);
  const [inFullscreen, setInFullscreen] = useState(false);

  const icon = useMemo(
    () => `wxi-${inFullscreen ? 'collapse' : 'expand'}`,
    [inFullscreen],
  );

  const toggleFullscreen = useRef(null);
  toggleFullscreen.current = () => {
    const node = nodeRef.current;
    if (!inFullscreen && node) {
      node.requestFullscreen();
    } else if (inFullscreen) {
      document.exitFullscreen();
    }
    setInFullscreen((prev) => !prev);
  };

  useHotkeys({ [hotkey]: () => toggleFullscreen.current() }, nodeRef);

  useEffect(() => {
    const setFullscreenState = () => {
      setInFullscreen(document.fullscreenElement === nodeRef.current);
    };

    document.addEventListener('fullscreenchange', setFullscreenState);
    return () => {
      document.removeEventListener('fullscreenchange', setFullscreenState);
    };
  }, []);

  return (
    <div className="wx-13aa5W wx-fullscreen" ref={nodeRef} tabIndex={-1}>
      {children}
      {toggleButton ? (
        toggleButton(toggleFullscreen.current, inFullscreen)
      ) : (
        <Button css="wx-13aa5W wx-fullscreen-button" onClick={toggleFullscreen.current}>
          <i className={`wx-13aa5W ${icon} wx-fullscreen-icon`}> </i>
        </Button>
      )}
    </div>
  );
}
