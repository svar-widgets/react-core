import { useState, useRef, useMemo, useCallback } from 'react';
import List from './helpers/SuggestDropdown.jsx';
import { useWritableProp } from '@svar-ui/lib-react';
import { uid } from '@svar-ui/lib-dom';
import './Combo.css';

export default function Combo({
  value: valueProp = '',
  onValueChange,
  id = uid(),
  options = [],
  textOptions = null,
  textField = 'label',
  placeholder = '',
  title = '',
  disabled = false,
  error = false,
  clear = false,
  children: kids,
  onChange,
}) {
  const navigate = useRef(null);
  const keydown = useRef(null);

  const [value, setValue] = useWritableProp(valueProp);
  const [filterActive, setFilterActive] = useState(false);
  const [textInput, setTextInput] = useState('');

  const inputElement = useRef(null);
  const [hasFocus, setHasFocus] = useState(false);

  // calculate the derived values
  const text = useMemo(() => {
    if (filterActive) return textInput;
    if (value || value === 0) {
      const option = (textOptions || options).find((a) => a.id === value);
      if (option) return option[textField];
    }
    return '';
  }, [filterActive, textInput, value, textOptions, options, textField]);

  const filteredOptions = useMemo(() => {
    if (!text || !filterActive) return options;

    return options.filter((i) =>
      i[textField].toLowerCase().includes(text.toLowerCase()),
    );
  }, [text, filterActive, options, textField]);

  const index = useCallback(
    () => filteredOptions.findIndex((a) => a.id === value),
    [filteredOptions, value],
  );

  const ready = useCallback((ev) => {
    navigate.current = ev.navigate;
    keydown.current = ev.keydown;
  }, []);

  const doSelect = useCallback(
    (id, effects) => {
      if (id || id === 0) {
        let selected = options.find((a) => a.id === id);
        setFilterActive(false);

        if (effects) navigate.current(null);

        if (selected && value !== selected.id) {
          const newValue = selected.id;
          setValue(newValue);
          onValueChange && onValueChange(newValue);
          onChange && onChange({ value: newValue });
        }
      }

      if (!hasFocus && effects) inputElement.current.focus();
    },
    [options, value, hasFocus, onValueChange, onChange],
  );

  const selectByEvent = useCallback(
    ({ id }) => {
      doSelect(id, true);
    },
    [doSelect],
  );

  const doUnselect = useCallback(
    (ev) => {
      if (ev) ev.stopPropagation();

      setValue('');
      setFilterActive(false);
      onValueChange && onValueChange('');
      onChange && onChange({ value: '' });
    },
    [onValueChange, onChange],
  );

  const selectByText = useCallback(
    (chunk) => {
      if (!options.length) return;
      if (chunk === '' && clear) {
        doUnselect();
        return;
      }

      let res = options.find((i) => i[textField] === chunk);
      if (!res) {
        res = options.find((i) =>
          i[textField].toLowerCase().includes(chunk.toLowerCase()),
        );
      }

      const id = res ? res.id : value || options[0].id;
      doSelect(id, false);
    },
    [options, textField, clear, value, doSelect, doUnselect],
  );

  const handleInput = useCallback(() => {
    setTextInput(inputElement.current.value);
    setFilterActive(true);

    if (filteredOptions.length) navigate.current(0);
    else navigate.current(null);
  }, [filteredOptions.length, navigate]);

  const handleFocus = useCallback(() => {
    setHasFocus(true);
  }, []);

  const handleBlur = useCallback(() => {
    setHasFocus(false);
    setTimeout(() => {
      if (!hasFocus) selectByText(text);
    }, 200);
  }, [hasFocus, selectByText, text]);

  return (
    <div
      className="wx-1j11Jk wx-combo"
      onClick={() => navigate.current(index())}
      onKeyDown={(ev) => keydown.current(ev, index())}
      title={title}
    >
      <input
        className={'wx-1j11Jk wx-input ' + (error ? 'wx-error' : '')}
        id={id}
        ref={inputElement}
        value={text}
        disabled={disabled}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onInput={handleInput}
      />

      {clear && !disabled && value ? (
        <i className="wx-1j11Jk wx-icon wxi-close" onClick={doUnselect}></i>
      ) : (
        <i className="wx-1j11Jk wx-icon wxi-angle-down"></i>
      )}

      {!disabled && (
        <List items={filteredOptions} onReady={ready} onSelect={selectByEvent}>
          {({ option }) => <>{kids ? kids({ option }) : option[textField]}</>}
        </List>
      )}
    </div>
  );
}

// Note: React components don't support bind syntax, so onValueChange is used instead
// update parent component to handle value changes via onValueChange
