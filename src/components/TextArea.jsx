import { useCallback, useEffect, useRef } from 'react';
import { useWritableProp } from '@svar-ui/lib-react';
import { uid } from '@svar-ui/lib-dom';

import './TextArea.css';

export default function TextArea({
  value: propValue = '',
  id = uid(),
  placeholder = '',
  title = '',
  disabled = false,
  error = false,
  readonly = false,
  onChange,
}) {
  const [value, setValue] = useWritableProp(propValue);

  const handleInput = useCallback(
    (e) => {
      const newValue = e.target.value;
      setValue(newValue);
      if (onChange) {
        onChange({ value: newValue, input: true });
      }
    },
    [onChange],
  );

  const ontextchange = useCallback(
    (e) => {
      const newValue = e.target.value;
      setValue(newValue);
      if (onChange) {
        onChange({ value: newValue });
      }
    },
    [onChange],
  );

  const inputRef = useRef(null);
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
    <textarea
      className={'wx-3yFVAC' + ` wx-textarea ${error ? 'wx-error' : ''}`}
      id={id}
      disabled={disabled}
      placeholder={placeholder}
      readOnly={readonly}
      title={title}
      value={value}
      onInput={handleInput}
      ref={inputRef}
    />
  );
}
