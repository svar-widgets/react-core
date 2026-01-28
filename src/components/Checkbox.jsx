import { useWritableProp } from '@svar-ui/lib-react';
import { useInputId } from './helpers/getInputId.js';
import './Checkbox.css';

export default function Checkbox({
  id,
  label = '',
  inputValue = '',
  value: valueProp = false,
  onChange,
  disabled = false,
}) {

  const inputId = useInputId(id);
  const [value, setValue] = useWritableProp(valueProp);

  const handlerChange = ({ target }) => {
    const newValue = target.checked;
    setValue(newValue);
    onChange && onChange({ value: newValue, inputValue });
  };

  return (
    <div className="wx-2IvefP wx-checkbox">
      <input
        type="checkbox"
        id={inputId}
        disabled={disabled}
        className="wx-2IvefP wx-check"
        checked={value}
        value={inputValue}
        onChange={handlerChange}
      />
      <label htmlFor={inputId} className="wx-2IvefP wx-label">
        <span className="wx-2IvefP wx-before"></span>
        {label && <span className="wx-2IvefP wx-after">{label}</span>}
      </label>
    </div>
  );
}
