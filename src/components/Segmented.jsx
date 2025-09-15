import { useState, useEffect } from 'react';
import { snippet } from '@svar-ui/lib-react';
import './Segmented.css';

const Segmented = ({
  options = [],
  value = '',
  css = '',
  children,
  onChange,
}) => {
  // Note: Using additional state for controlled/uncontrolled handling since React doesn't allow direct prop mutation
  const [internalValue, setInternalValue] = useState(value);

  const handleClick = (id) => {
    setInternalValue(id);
    if (onChange) {
      onChange({ value: id });
    }
  };

  // Ensure internal value stays in sync with external value changes
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  return (
    <div className={'wx-0hMO7P' + ` wx-segmented ${css}`}>
      {options.map((option) => (
        <button
          key={option.id}
          className={
            'wx-0hMO7P' +
            ` wx-segment ${option.css} ${option.id === internalValue ? 'wx-selected' : ''}`
          }
          title={option.title || option.label}
          onClick={() => handleClick(option.id)}
        >
          {children ? (
            snippet(children, { option })
          ) : (
            <>
              {option.icon && (
                <i
                  className={
                    'wx-0hMO7P' +
                    ` wx-icon ${option.icon} ${!option.label ? 'wx-only' : ''}`
                  }
                ></i>
              )}
              {option.label && (
                <span className="wx-0hMO7P wx-label">{option.label}</span>
              )}
            </>
          )}
        </button>
      ))}
    </div>
  );
};

export default Segmented;
