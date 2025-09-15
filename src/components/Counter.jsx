import { useState, useCallback } from 'react';
import { uid } from '@svar-ui/lib-dom';
import './Counter.css';

const Counter = ({
  id = uid(),
  value: initialValue = 0,
  step = 1,
  min = 0,
  max = Infinity,
  error = false,
  disabled = false,
  readonly = false,
  onChange,
}) => {
  const [value, setValue] = useState(initialValue);

  const dec = useCallback(() => {
    if (readonly || value <= min) return;
    const newValue = value - step;
    setValue(newValue);
    onChange && onChange({ value: newValue });
  }, [value, readonly, min, step, onChange]);

  const inc = useCallback(() => {
    if (readonly || value >= max) return;
    const newValue = value + step;
    setValue(newValue);
    onChange && onChange({ value: newValue });
  }, [value, readonly, max, step, onChange]);

  const blur = useCallback(() => {
    if (!readonly) {
      const tValue =
        Math.round(Math.min(max, Math.max(value, min)) / step) * step;
      const newValue = isNaN(tValue) ? Math.max(min, 0) : tValue;
      setValue(newValue);
      onChange && onChange({ value: newValue });
    }
  }, [readonly, value, max, min, step, onChange]);

  const input = useCallback(
    (e) => {
      const newValue = e.target.value * 1;
      setValue(newValue);
      onChange && onChange({ value: newValue, input: true });
    },
    [onChange],
  );

  return (
    <div
      className={
        'wx-22t21n ' +
        `wx-counter ${disabled ? 'wx-disabled' : ''} ${readonly ? 'wx-readonly' : ''} ${error ? 'wx-error' : ''}`
      }
    >
      <button
        aria-label="-"
        className={'wx-22t21n ' + 'wx-btn wx-btn-dec'}
        disabled={disabled}
        onClick={dec}
      >
        <svg
          className={'wx-22t21n ' + 'wx-dec'}
          width="12"
          height="2"
          viewBox="0 0 12 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M11.2501 1.74994H0.750092V0.249939H11.2501V1.74994Z" />
        </svg>
      </button>
      <input
        id={id}
        type="text"
        className={'wx-22t21n ' + 'wx-input'}
        disabled={disabled}
        readOnly={readonly}
        required
        value={value}
        onBlur={blur}
        onInput={input}
      />
      <button
        aria-label="-"
        className={'wx-22t21n ' + 'wx-btn wx-btn-inc'}
        disabled={disabled}
        onClick={inc}
      >
        <svg
          className={'wx-22t21n ' + 'wx-inc'}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.2501
								6.74994H6.75009V11.2499H5.25009V6.74994H0.750092V5.24994H5.25009V0.749939H6.75009V5.24994H11.2501V6.74994Z"
          />
        </svg>
      </button>
    </div>
  );
};

export default Counter;
