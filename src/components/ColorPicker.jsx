import { useState } from 'react';
import { uid } from '@svar-ui/lib-dom';
import Dropdown from './Dropdown.jsx';
import ColorBoard from './ColorBoard.jsx';
import { useWritableProp } from '@svar-ui/lib-react';

import './ColorPicker.css';

export default function ColorPicker({
  value: propertyValue = '',
  id = undefined,
  placeholder = '',
  title = '',
  disabled = false,
  error = false,
  clear = false,
  onChange,
}) {
  let [value, setValue] = useWritableProp(propertyValue);
  const [popup, setPopup] = useState(false);

  const finalId = id || uid();

  function handlePopup() {
    if (disabled) return false;
    setPopup(true);
  }

  function selectColor(ev) {
    if (ev.input) return;

    setPopup(false);
    const newValue = ev.value;
    setValue(newValue);
    if (onChange) onChange({ value: newValue });
  }

  function unselectColor(ev) {
    ev.stopPropagation();
    setValue('');
    if (onChange) onChange({ value: '' });
  }

  return (
    <div className="wx-mmT8WH wx-colorpicker" onClick={handlePopup}>
      <input
        className={
          'wx-mmT8WH wx-input' +
          (error ? ' wx-error' : '') +
          (popup ? ' wx-focus' : '')
        }
        title={title}
        value={value}
        readOnly
        id={finalId}
        placeholder={placeholder}
        disabled={disabled}
      />
      <div className="wx-mmT8WH wx-color" style={{ background: value }}></div>

      {clear && !disabled && value && (
        <i className="wx-mmT8WH wxi-close" onClick={unselectColor}></i>
      )}

      {popup && (
        <Dropdown onCancel={() => setPopup(false)}>
          <ColorBoard value={value} button="true" onChange={selectColor} />
        </Dropdown>
      )}
    </div>
  );
}
