import { useWritableProp } from '@svar-ui/lib-react';
import './Tabs.css';

const Tabs = ({
  options = [],
  value: propValue = '',
  type = 'top',
  css = '',
  onChange,
}) => {
  const [value, setValue] = useWritableProp(propValue);

  const handleClick = (optionId) => {
    setValue(optionId);
    if (onChange) {
      onChange({ value: optionId });
    }
  };

  return (
    <div className={'wx-138fWJ ' + `wx-tabs wx-${type} ${css}`}>
      {options.map((option) => (
        <button
          key={option.id}
          className={
            'wx-138fWJ ' +
            `wx-tab ${option.css} ${option.id === value ? 'wx-active' : ''}`
          }
          title={option.title}
          onClick={() => handleClick(option.id)}
        >
          {option.icon && (
            <i
              className={
                'wx-138fWJ ' +
                `wx-icon ${option.icon} ${!option.label ? 'wx-only' : ''}`
              }
            ></i>
          )}
          {option.label && (
            <span className="wx-138fWJ wx-label">{option.label}</span>
          )}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
