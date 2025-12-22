import { useState, useEffect, useMemo, useContext } from 'react';
import { dateToString } from '@svar-ui/lib-dom';
import { i18n } from '../context.js';

import Text from './Text.jsx';
import Dropdown from './Dropdown.jsx';
import Calendar from './Calendar.jsx';
import './DatePicker.css';
import { defaultLocale } from './helpers/locale.js';

const defaultButtons = ['clear', 'today'];

export default function DatePicker({
  value: propValue,
  id,
  disabled = false,
  error = false,
  width = 'unset',
  align = 'start',
  placeholder = '',
  format = '',
  buttons = defaultButtons,
  css = '',
  title = '',
  editable = false,
  clear = false,
  onChange,
}) {
  const { calendar: calendarLocale, formats } = (
    useContext(i18n) || defaultLocale()
  ).getRaw();
  const f = format || formats?.dateFormat;
  let dateFormat =
    typeof f === 'function' ? f : dateToString(f, calendarLocale);

  const [value, setValue] = useState(propValue);
  const [popup, setPopup] = useState(false);

  // Update local value when prop value changes
  useEffect(() => {
    setValue(propValue);
  }, [propValue]);

  function oncancel() {
    setPopup(false);
  }

  function doChange(v) {
    // skip "select" event if the same value
    // or different objects with the same value
    // or different objects with the same value
    const skipEvent =
      v === value ||
      (v && value && v.valueOf() === value.valueOf()) ||
      (!v && !value);

    setValue(v);
    if (!skipEvent) {
      onChange && onChange({ value: v });
    }

    // fire after on-click finished
    setTimeout(oncancel, 1);
  }

  const formattedValue = useMemo(
    () => (value ? dateFormat(value) : ''),
    [value, dateFormat],
  );

  function onchangeHandler({ value: v, input }) {
    if (!editable && !clear) return;
    if (input) return;

    // convert to date, but ignore empty string input
    let date =
      typeof editable === 'function' ? editable(v) : v ? new Date(v) : null;

    // if date is invalid ( incorrect text input ) then use old value
    // else use the entered date
    // in any case fallback to null, to prevent undefined as value
    date = isNaN(date) ? value || null : date || null;
    doChange(date);
  }

  // Handle scroll event on window
  useEffect(() => {
    const handleScroll = oncancel;
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="wx-1lKOFG wx-datepicker" onClick={() => setPopup(true)}>
      <Text
        css={css}
        title={title}
        value={formattedValue}
        id={id}
        readonly={!editable}
        disabled={disabled}
        error={error}
        placeholder={placeholder}
        onInput={oncancel}
        onChange={onchangeHandler}
        icon="wxi-calendar"
        inputStyle={{
          cursor: 'pointer',
          width: '100%',
          paddingRight:
            'calc(var(--wx-input-icon-size) + var(--wx-input-icon-indent) * 2)',
        }}
        clear={clear}
      />

      {popup && !disabled && (
        <Dropdown
          onCancel={oncancel}
          width={width}
          align={align}
          autoFit={!!align}
        >
          <Calendar
            buttons={buttons}
            value={value}
            onChange={(e) => doChange(e.value)}
          />
        </Dropdown>
      )}
    </div>
  );
}
