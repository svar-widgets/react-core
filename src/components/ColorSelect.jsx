import { useState, useCallback } from 'react';
import { useInputId } from './helpers/getInputId.js';
import Dropdown from './Dropdown.jsx';
import './ColorSelect.css';

const defaultColors = [
  '#00a037',
  '#37a9ef',
  '#f5a623',
  '#ff4c3b',
  '#a0a0a0',
  '#000000',
  '#ffffff',
];

export default function ColorSelect({
  colors = defaultColors,
  value = '',
  onChange,
  id,
  clear = false,
  placeholder = '',
  title = '',
  disabled = false,
  error = false,
}) {
  const inputId = useInputId(id);
  const [currentValue, setCurrentValue] = useState(value);
  const [popup, setPopup] = useState(false);

  const selectColor = useCallback(
    (ev, color) => {
      ev.stopPropagation();
      setCurrentValue(color);
      setPopup(false);
      onChange && onChange({ value: color });
    },
    [onChange],
  );

  const unselectColor = useCallback(
    (ev) => {
      ev.stopPropagation();
      setCurrentValue('');
      onChange && onChange({ value: '' });
    },
    [onChange],
  );

  const handlePopup = useCallback(() => {
    if (disabled) return false;
    setPopup(true);
  }, [disabled]);

  return (
    <div className="wx-121TgJ wx-colorselect" onClick={handlePopup}>
      <input
        className={
          'wx-121TgJ wx-input' +
          (error ? ' wx-error' : '') +
          (popup ? ' wx-focus' : '')
        }
        title={title}
        value={currentValue}
        readOnly
        id={inputId}
        placeholder={placeholder}
        disabled={disabled}
      />

      {clear && currentValue && !disabled && (
        <i className="wx-121TgJ wx-clear wxi-close" onClick={unselectColor}></i>
      )}

      {currentValue ? (
        <div
          className="wx-121TgJ wx-color wx-selected"
          style={{ backgroundColor: currentValue || '#00a037' }}
        ></div>
      ) : (
        <div className="wx-121TgJ wx-empty wx-selected"></div>
      )}

      {popup && (
        <Dropdown onCancel={() => setPopup(false)}>
          <div className="wx-121TgJ wx-colors">
            <div
              className="wx-121TgJ wx-empty"
              onClick={(ev) => selectColor(ev, '')}
            ></div>
            {colors.map((color, index) => (
              <div
                key={index}
                className="wx-121TgJ wx-color"
                style={{ backgroundColor: color }}
                onClick={(ev) => selectColor(ev, color)}
              ></div>
            ))}
          </div>
        </Dropdown>
      )}
    </div>
  );
}
