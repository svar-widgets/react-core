import { useState, useEffect, useMemo } from 'react';
import { uid } from '@svar-ui/lib-dom';
import './Slider.css';

export default function Slider({
  id = uid(),
  label = '',
  css = '',
  min = 0,
  max = 100,
  value: initialValue = 0,
  step = 1,
  title = '',
  disabled = false,
  onChange,
}) {
  const [value, setValue] = useState(initialValue);
  const [previous, setPrevious] = useState(value);

  const progress = useMemo(
    () => ((value - min) / (max - min)) * 100 + '%',
    [value, min, max],
  );

  const bgStyle = useMemo(() => {
    return disabled
      ? ''
      : `linear-gradient(90deg, var(--wx-slider-primary) 0% ${progress}, var(--wx-slider-background) ${progress} 100%)`;
  }, [disabled, progress]);

  function oninput({ target }) {
    const newValue = target.value || 0;
    setValue(newValue);
    if (previous !== newValue) {
      onChange && onChange({ value: newValue, previous, input: true });
      setPrevious(newValue);
    }
  }

  function onslider({ target }) {
    const newValue = target.value * 1;
    setValue(newValue);
    onChange && onChange({ value: newValue });
  }

  // Sync if props.value changes externally
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div className={`wx-2EDJ8G wx-slider ${css}`} title={title}>
      {label && (
        <label className="wx-2EDJ8G wx-label" htmlFor={id}>
          {label}
        </label>
      )}
      <div className="wx-2EDJ8G wx-inner">
        <input
          id={id}
          className="wx-2EDJ8G wx-input"
          type="range"
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          value={value}
          onInput={oninput}
          onChange={onslider}
          style={{ background: bgStyle }}
        />
      </div>
    </div>
  );
}
