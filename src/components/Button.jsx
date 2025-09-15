import { useMemo } from 'react';
import './Button.css';

export default function Button({
  type = '',
  css = '',
  icon = '',
  disabled = false,
  title = '',
  text = '',
  children,
  onClick,
}) {
  const buttonCss = useMemo(() => {
    let cssType = type
      ? type
          .split(' ')
          .filter((a) => a !== '')
          .map((x) => 'wx-' + x)
          .join(' ')
      : '';
    return css + (css ? ' ' : '') + cssType;
  }, [type, css]);

  const handleClick = (ev) => {
    onClick && onClick(ev);
  };

  return (
    <button
      title={title}
      className={`wx-2ZWgb4 wx-button ${buttonCss} ${icon && !children ? 'wx-icon' : ''}`}
      disabled={disabled}
      onClick={handleClick}
    >
      {icon && <i className={'wx-2ZWgb4 ' + icon}></i>}
      {children ? children : text || ' '}
    </button>
  );
}
