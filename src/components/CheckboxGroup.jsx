import { useCallback } from 'react';
import Checkbox from './Checkbox.jsx';
import './CheckboxGroup.css';

export default function CheckboxGroup({
  options = [],
  value = [],
  type = '',
  onChange,
}) {
  // Handle both onchange and onChange props for compatibility
  const handleChange = useCallback(
    (obj) => {
      let newValue;
      if (obj.value) newValue = [...value, obj.inputValue];
      else newValue = value.filter((a) => a !== obj.inputValue);

      if (onChange) onChange({ value: newValue });
    },
    [value, onChange],
  );

  return (
    <div className={`wx-q8xwRD wx-checkboxgroup ${type && `wx-${type}`}`}>
      {options.map((option) => (
        <div key={option.id} className="wx-q8xwRD wx-item">
          <Checkbox
            label={option.label}
            inputValue={option.id}
            value={value.includes(option.id)}
            onChange={handleChange}
          />
        </div>
      ))}
    </div>
  );
}
