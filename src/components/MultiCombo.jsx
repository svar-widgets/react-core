import { useState, useMemo, useRef, useCallback } from 'react';
import { useWritableProp, snippet } from '@svar-ui/lib-react';
import { useInputId } from './helpers/getInputId.js';
import List from './helpers/SuggestDropdown.jsx';
import Checkbox from './Checkbox.jsx';
import './MultiCombo.css';

const defaultValue = [];

export default function MultiCombo({
  id,
  value: valueProp = defaultValue,
  options = [],
  textOptions = null,
  textField = 'label',
  placeholder = '',
  title = '',
  disabled = false,
  error = false,
  checkboxes = false,
  onChange,
  children,
}) {
  const inputId = useInputId(id);
  const navigate = useRef(null);
  const keydown = useRef(null);

  const [value, setValue] = useWritableProp(valueProp);

  const [text, setText] = useState('');
  const [focus, setFocus] = useState(false);
  const inputElement = useRef(null);

  const selected = useMemo(() => {
    return value
      ? (textOptions || options).filter((i) => value.includes(i.id))
      : [];
  }, [value, textOptions, options]);

  const filterOptions = useMemo(() => {
    const o = options;
    return text
      ? o.filter((i) => i[textField].toLowerCase().includes(text.toLowerCase()))
      : o;
  }, [text, options, textField]);

  const onready = useCallback((ev) => {
    navigate.current = ev.navigate;
    keydown.current = ev.keydown;
  }, []);

  const input = useCallback(() => {
    if (filterOptions.length) navigate.current(0);
    else navigate.current(null);
  }, [filterOptions]);

  const onselect = useCallback(
    (ev) => {
      const { id } = ev;

      if (id) {
        let next;
        if (value) {
          if (value.includes(id)) {
            next = value.filter((i) => i !== id);
          } else {
            next = [...value, id];
          }
        } else {
          next = [id];
        }

        setValue(next);
        onChange && onChange({ value: next });

        inputElement.current.focus();
      }
    },
    [value, onChange],
  );

  const remove = useCallback(
    (id, ev) => {
      if (ev) ev.stopPropagation();

      const next = value.filter((i) => i !== id);
      setValue(next);
      onChange && onChange({ value: next });
    },
    [value, onChange],
  );

  const index = useCallback(
    () =>
      value && value.length
        ? filterOptions.findIndex((i) => i.id === value[0])
        : 0,
    [value, filterOptions],
  );

  const onClickHandler = useCallback(() => {
    if (!disabled) {
      inputElement.current.focus();
      navigate.current(index());
    }
  }, [disabled, index]);

  return (
    <div
      title={title}
      className={
        'wx-12Wj21 wx-multicombo ' +
        `${error ? 'wx-error' : ''} ${disabled ? 'wx-disabled' : ''} ${selected.length ? 'wx-not-empty' : ''} ${focus && !disabled ? 'wx-focus' : ''}`
      }
      onClick={onClickHandler}
      onKeyDown={(ev) => keydown.current(ev, index())}
    >
      <div className="wx-12Wj21 wx-wrapper">
        <div className="wx-12Wj21 wx-tags">
          {selected.map((tag) => (
            <div key={tag.id} className="wx-12Wj21 wx-tag">
              {children ? snippet(children, { option: tag }) : tag[textField]}
              {!disabled && (
                <i
                  className="wx-12Wj21 wx-icon wxi-close"
                  onClick={(ev) => remove(tag.id, ev)}
                ></i>
              )}
            </div>
          ))}
        </div>
        <div className="wx-12Wj21 wx-select">
          <input
            className="wx-12Wj21 wx-input"
            id={inputId}
            type="text"
            value={text}
            onChange={(ev) => setText(ev.target.value)}
            onInput={input}
            placeholder={placeholder}
            disabled={disabled}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            ref={inputElement}
          />
          <i className="wx-12Wj21 wx-icon wxi-angle-down"></i>
        </div>
      </div>

      {!disabled && (
        <List items={filterOptions} onReady={onready} onSelect={onselect}>
          {({ option }) => (
            <>
              {checkboxes && (
                <Checkbox
                  style={{ marginRight: '8px', pointerEvents: 'none' }}
                  name={option.id}
                  value={value && value.includes(option.id)}
                />
              )}
              {children ? snippet(children, { option }) : option[textField]}
            </>
          )}
        </List>
      )}
    </div>
  );
}
