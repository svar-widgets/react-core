import { uid } from '@svar-ui/lib-dom';
import { useState } from 'react';
import './RadioButton.css';

export default function RadioButton({
  id = uid(),
  label = '',
  value: externalValue,
  name = '',
  inputValue = '',
  disabled = false,
  onChange,
}) {
  // Internal state for uncontrolled behavior
  const [internalValue, setInternalValue] = useState(false);

  // Determine which value to use (controlled vs uncontrolled)
  // For React, we need to handle both cases
  const isControlled = externalValue !== undefined;
  const currentValue = isControlled ? externalValue : internalValue;

  function handlerChange(ev) {
    const newValue = ev.target.checked;

    if (!isControlled) {
      setInternalValue(newValue);
    }

    if (newValue && onChange) {
      onChange({ value: true, inputValue });
    }
  }

  return (
    <div className="wx-3lDF1s wx-radio">
      <input
        type="radio"
        className="wx-3lDF1s wx-input"
        id={id}
        disabled={disabled}
        name={name}
        value={inputValue}
        checked={currentValue}
        onChange={handlerChange}
      />
      <label htmlFor={id} className="wx-3lDF1s wx-label">
        <span className="wx-3lDF1s wx-circle"></span>
        {label && <span className="wx-3lDF1s wx-radio-text">{label}</span>}
      </label>
    </div>
  );
}
