import { uid } from '@svar-ui/lib-dom';
import { useState, useEffect } from 'react';
import RadioButton from './RadioButton.jsx';
import './RadioButtonGroup.css';

export default function RadioButtonGroup({
  options = [{}],
  value = '',
  onChange,
  type = '',
}) {
  const name = uid();

  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  function handleChange(ev) {
    const newValue = ev.inputValue;
    setCurrentValue(newValue);
    if (onChange) {
      onChange({ value: newValue });
    }
  }

  return (
    <div className={`wx-38w70j wx-radiogroup ${type && `wx-${type}`}`}>
      {options.map((option) => (
        <div key={option.id} className="wx-38w70j wx-item">
          <RadioButton
            label={option.label}
            inputValue={option.id}
            value={currentValue === option.id}
            name={name}
            onChange={handleChange}
          />
        </div>
      ))}
    </div>
  );
}
