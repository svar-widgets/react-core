import { useWritableProp } from '@svar-ui/lib-react';
import { uid } from '@svar-ui/lib-dom';
import './Checkbox.css';

export default function Checkbox({
  id = uid(),
  label = '',
  inputValue = '',
  value: valueProp = false,
  onChange,
  disabled = false,
}) {
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
        id={id}
        disabled={disabled}
        className="wx-2IvefP wx-check"
        checked={value}
        value={inputValue}
        onChange={handlerChange}
      />
      <label htmlFor={id} className="wx-2IvefP wx-label">
        <span className="wx-2IvefP wx-before"></span>
        {label && <span className="wx-2IvefP wx-after">{label}</span>}
      </label>
    </div>
  );
}
