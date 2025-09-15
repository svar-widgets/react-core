import { useState, useCallback } from 'react';
import { uid } from '@svar-ui/lib-dom';
import './Switch.css';

export default function Switch({
  id: initialId = uid(),
  value: initialValue = false,
  disabled = false,
  onChange,
}) {
  const [value, setValue] = useState(initialValue);

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
        id={initialId}
      />
      <span className="wx-2dAR5c wx-box" />
    </label>
  );
}
