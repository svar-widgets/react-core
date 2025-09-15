import { useState, useEffect, useMemo, useContext, useCallback } from 'react';
import { dateToString } from '@svar-ui/lib-dom';
import { useWritableProp } from '@svar-ui/lib-react';
import { i18n } from '../context.js';

import Text from './Text.jsx';
import Dropdown from './Dropdown.jsx';
import RangeCalendar from './RangeCalendar.jsx';
import { defaultLocale } from './helpers/locale.js';

const defaultButtons = ['clear', 'today'];

const DateRangePicker = ({
  value: valueProp,
  onChange,
  id,
  disabled = false,
  error = false,
  width = 'unset',
  align = 'start',
  placeholder = '',
  css = '',
  title = '',
  format = '',
  months = 2,
  buttons = defaultButtons,
  editable = false,
  clear = false,
}) => {
  const [value, setValue] = useWritableProp(valueProp);
  const { calendar: calendarLocale, formats } = (
    useContext(i18n) || defaultLocale()
  ).getRaw();

  const f = format || formats?.dateFormat;
  const dateFormat =
    typeof f === 'function' ? f : dateToString(f, calendarLocale);

  const [popup, setPopup] = useState(false);

  const onCancel = useCallback(() => {
    setPopup(false);
  }, []);

  const formattedValue = useMemo(() => {
    return value
      ? value.start
        ? dateFormat(value.start) +
          (value.end ? ` - ${dateFormat(value.end)}` : '')
        : dateFormat(value)
      : '';
  }, [value, dateFormat]);

  const start = useMemo(() => {
    return value ? value.start || null : null;
  }, [value]);

  const end = useMemo(() => {
    return value ? value.end || null : null;
  }, [value]);

  const doChange = useCallback(
    (d) => {
      const newValue = d.start || d.end ? { start: d.start, end: d.end } : null;

      // Handle both cases: either external setValue or onChange prop
      if (setValue) {
        setValue(newValue);
      } else {
        // Parent must handle value prop update via onChange
      }

      // fire after on-click finished
      if ((d.start && d.end) || (!d.start && !d.end)) {
        // FIXME - select event will trigger even if the same value
        if (onChange) {
          onChange({ value: newValue });
        }
        setTimeout(onCancel, 1);
      }
    },
    [onChange, onCancel, setValue],
  );

  const doInputChange = useCallback(
    (ev) => {
      if (!editable && !clear) return;

      const { value: v, input } = ev;
      if (input) return;

      const [s, e] = v.split(' -').map((a, i) => {
        const av = a.trim();
        let date =
          typeof editable === 'function'
            ? editable(av)
            : av
              ? new Date(av)
              : null;

        // if date is invalid ( incorrect text input ) then use old value
        // else use the entered date
        // in any case fallback to null, to prevent undefined as value
        let val = i === 0 ? start : end;
        return isNaN(date) ? (val ? val : null) : date || null;
      });

      doChange({ start: s, end: e });
    },
    [editable, clear, start, end, doChange],
  );

  useEffect(() => {
    const handleScroll = () => {
      onCancel();
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [onCancel]);

  return (
    <div
      className={`wx-1b0WDQ wx-daterangepicker ${disabled ? 'wx-disabled' : ''} ${error ? 'wx-error' : ''}`}
      onClick={() => setPopup(true)}
    >
      <Text
        css={css}
        title={title}
        value={formattedValue}
        id={id}
        readonly={!editable}
        disabled={disabled}
        placeholder={placeholder}
        error={error}
        onChange={doInputChange}
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
          onCancel={onCancel}
          width={width}
          align={align}
          autoFit={!!align}
        >
          <RangeCalendar
            onCancel={onCancel}
            buttons={buttons}
            start={start}
            end={end}
            months={months}
            onChange={doChange}
          />
        </Dropdown>
      )}
    </div>
  );
};

export default DateRangePicker;

import './DateRangePicker.css';
