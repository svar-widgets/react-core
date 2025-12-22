import { useCallback } from 'react';
import { useWritableProp } from '@svar-ui/lib-react';
import { useInputId } from './helpers/getInputId.js';
import './Switch.css';

export default function Switch({
  id,
  value: initialValue = false,
  disabled = false,
  onChange,
}) {
  const inputId = useInputId(id);
  const [value, setValue] = useWritableProp(initialValue);

  const handleChange = useCallback(
    (event) => {
      const newValue = event.target.checked;
      setValue(newValue);
      onChange && onChange({ value: newValue });
    },
    [onChange],
  );

  return (
    <label className="wx-2dAR5c wx-switch">
      <input
        className="wx-2dAR5c wx-input"
        type="checkbox"
        checked={value}
        onChange={handleChange}
        disabled={disabled}
        id={inputId}
      />
      <span className="wx-2dAR5c wx-box" />
    </label>
  );
}
