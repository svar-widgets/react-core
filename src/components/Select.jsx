import { useState, useCallback } from 'react';
import { useInputId } from './helpers/getInputId.js';
import './Select.css';

export default function Select({
  value: valueProp,
  options = [],
  placeholder = '',
  title = '',
  disabled = false,
  error = false,
  textField = 'label',
  clear = false,
  id,
  onChange,
}) {
  const inputId = useInputId(id);
  const [value, setValue] = useState(valueProp || '');

  const handleChange = useCallback(
    (event) => {
      const newValue = event.target.value;
      setValue(newValue);
      if (onChange) onChange({ value: newValue });
    },
    [onChange],
  );

  const unselect = useCallback(() => {
    setValue('');
    if (onChange) onChange({ value: '' });
  }, [onChange]);

  return (
    <div className="wx-2yx1Fo wx-select-box">
      <select
        id={inputId}
        value={value}
        disabled={disabled}
        className={`wx-2yx1Fo wx-select ${error ? 'wx-2yx1Fo wx-error' : ''}`}
        title={title}
        onChange={handleChange}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option[textField]}
          </option>
        ))}
      </select>

      {clear && !disabled && value ? (
        <i className="wx-2yx1Fo wx-icon wxi-close" onClick={unselect}></i>
      ) : (
        <i className="wx-2yx1Fo wx-icon wxi-angle-down"></i>
      )}
    </div>
  );
}
