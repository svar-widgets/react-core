import { useCallback, useEffect, useRef, useMemo } from 'react';
import { uid } from '@svar-ui/lib-dom';
import { useWritableProp } from '@svar-ui/lib-react';
import './Text.css';

export default function Text({
  value: propsValue = '',
  id: propsId = uid(),
  readonly = false,
  focus = false,
  select = false,
  type = 'text',
  placeholder = '',
  disabled = false,
  error = false,
  inputStyle = {},
  title = '',
  css = '',
  icon,
  clear = false,
  onChange,
}) {
  const [value, setValue] = useWritableProp(propsValue);
  const inputRef = useRef(null);

  const cssString = useMemo(
    () =>
      icon && css.indexOf('wx-icon-left') === -1 ? 'wx-icon-right ' + css : css,
    [icon, css],
  );

  const hasLeftIcon = useMemo(
    () => icon && css.indexOf('wx-icon-left') !== -1,
    [icon, css],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (focus && inputRef.current) inputRef.current.focus();
      if (select && inputRef.current) inputRef.current.select();
    }, 1);

    return () => clearTimeout(timer);
  }, [focus, select]);

  const oninput = useCallback(
    (e) => {
      const newValue = e.target.value;
      setValue(newValue);
      onChange && onChange({ value: newValue, input: true });
    },
    [onChange],
  );

  const ontextchange = useCallback(
    (ev) => onChange && onChange({ value: ev.target.value }),
    [onChange],
  );

  function clearValue(ev) {
    ev.stopPropagation();
    setValue('');
    onChange && onChange({ value: '' });
  }

  let inputType = type;
  if (type !== 'password' && type !== 'number') {
    inputType = 'text';
  }

  // MK :: EXTRACT
  useEffect(() => {
    const handler = ontextchange;
    const node = inputRef.current;
    node.addEventListener('change', handler);
    return () => {
      if (node) {
        node.removeEventListener('change', handler);
      }
    };
  }, [ontextchange]);

  return (
    <div
      className={`wx-hQ64J4 wx-text ${cssString} ${error ? 'wx-error' : ''} ${
        disabled ? 'wx-disabled' : ''
      } ${clear ? 'wx-clear' : ''}`}
    >
      <input
        className="wx-hQ64J4 wx-input"
        ref={inputRef}
        id={propsId}
        readOnly={readonly}
        disabled={disabled}
        placeholder={placeholder}
        type={inputType}
        style={inputStyle}
        title={title}
        value={value}
        onInput={oninput}
      />

      {clear && !disabled && value ? (
        <>
          <i className="wx-hQ64J4 wx-icon wxi-close" onClick={clearValue}></i>
          {hasLeftIcon && <i className={`wx-hQ64J4 wx-icon ${icon}`}></i>}
        </>
      ) : icon ? (
        <i className={`wx-hQ64J4 wx-icon ${icon}`}></i>
      ) : null}
    </div>
  );
}
