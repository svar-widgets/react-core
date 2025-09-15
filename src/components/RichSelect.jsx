import { useRef, useCallback, useMemo } from 'react';
import List from './helpers/SuggestDropdown.jsx';
import { useWritableProp } from '@svar-ui/lib-react';
import './RichSelect.css';

export default function RichSelect({
  value: propertyValue = '',
  options = [],
  textOptions = null,
  placeholder = '',
  disabled = false,
  error = false,
  title = '',
  textField = 'label',
  clear = false,
  children: kids,
  onChange,
}) {
  const navigate = useRef(null);
  const keydown = useRef(null);
  let [value, setValue] = useWritableProp(propertyValue);

  function ready(ev) {
    navigate.current = ev.navigate;
    keydown.current = ev.keydown;
  }

  const selected = useMemo(() => {
    return value || value === 0
      ? (textOptions || options).find((a) => a.id === value)
      : null;
  }, [value, textOptions, options]);

  const select = useCallback(
    ({ id }) => {
      if (id || id === 0) {
        setValue(id);
        navigate.current(null);
        onChange && onChange({ value: id });
      }
    },
    [setValue, onChange],
  );

  const unselect = useCallback(
    (ev) => {
      ev.stopPropagation();
      setValue('');
      onChange && onChange({ value: '' });
    },
    [setValue, onChange],
  );

  const index = useCallback(() => {
    return options.findIndex((a) => a.id === value);
  }, [options, value]);

  return (
    <div
      className={`wx-2YgblL wx-richselect ${error ? 'wx-2YgblL wx-error' : ''} ${disabled ? 'wx-2YgblL wx-disabled' : ''} ${!kids ? 'wx-2YgblL wx-nowrap' : ''}`}
      title={title}
      onClick={() => navigate.current(index())}
      onKeyDown={(ev) => keydown.current(ev, index())}
      tabIndex={0}
    >
      <div className="wx-2YgblL wx-label">
        {selected ? (
          kids ? (
            kids(selected)
          ) : (
            selected[textField]
          )
        ) : placeholder ? (
          <span className="wx-2YgblL wx-placeholder">{placeholder}</span>
        ) : (
          '\u00A0'
        )}
      </div>

      {clear && !disabled && value ? (
        <i className="wx-2YgblL wx-icon wxi-close" onClick={unselect} />
      ) : (
        <i className="wx-2YgblL wx-icon wxi-angle-down" />
      )}

      {!disabled && (
        <List items={options} onReady={ready} onSelect={select}>
          {({ option }) => (kids ? kids(option) : option[textField])}
        </List>
      )}
    </div>
  );
}
