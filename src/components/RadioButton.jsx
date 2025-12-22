import { useState } from 'react';
import { useInputId } from './helpers/getInputId.js';
import { useId } from 'react';
import './RadioButton.css';

export default function RadioButton({
  id,
  label = '',
  value: externalValue,
  name = '',
  inputValue = '',
  disabled = false,
  onChange,
}) {
  const fallbackId = useId();
  const inputId = useInputId(id) || fallbackId;
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
        id={inputId}
        disabled={disabled}
        name={name}
        value={inputValue}
        checked={currentValue}
        onChange={handlerChange}
      />
      <label htmlFor={inputId} className="wx-3lDF1s wx-label">
        <span className="wx-3lDF1s wx-circle"></span>
        {label && <span className="wx-3lDF1s wx-radio-text">{label}</span>}
      </label>
    </div>
  );
}
