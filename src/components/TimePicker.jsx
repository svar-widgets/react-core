import { useState, useMemo, useContext, useCallback } from 'react';
import Field from './Field.jsx';
import Text from './Text.jsx';
import Dropdown from './Dropdown.jsx';
import Slider from './Slider.jsx';
import TwoState from './TwoState.jsx';
import { i18n } from '../context.js';
import { useWritableProp } from '@svar-ui/lib-react';
import { dateToString } from '@svar-ui/lib-dom';
import './TimePicker.css';
import { defaultLocale } from './helpers/locale.js';

const defValue = new Date(0, 0, 0, 0, 0);

export default function TimePicker({
  value: propertyValue = defValue,
  id,
  title = '',
  css = '',
  disabled = false,
  error = false,
  format = '',
  onChange,
}) {
  let [value, setValue] = useWritableProp(propertyValue);

  const { calendar: calendarLocale, formats } = (
    useContext(i18n) || defaultLocale()
  ).getRaw();
  const h12 = calendarLocale.clockFormat == 12;

  const maxH = 23;
  const maxM = 59;

  const timeFormat = useMemo(() => {
    const f = format || formats?.timeFormat;
    return typeof f === 'function' ? f : dateToString(f, calendarLocale);
  }, [format, formats, calendarLocale]);

  const zeroBased = useMemo(() => {
    return timeFormat(new Date(0, 0, 0, 1)).indexOf('01') != -1;
  }, [timeFormat]);

  const formatTime = (v, zeroBased) => {
    return (v < 10 && zeroBased ? `0${v}` : `${v}`).slice(-2);
  };

  const formatM = (v) => {
    return formatTime(v, true);
  };

  const getNumber = (v) => {
    return `${v}`.replace(/[^\d]/g, '') || 0;
  };
  const formatH = (v) => {
    if (h12) {
      v = v % 12;
      if (v === 0) return '12';
    }
    return formatTime(v, zeroBased);
  };

  const update = useCallback((v, max) => {
    v = getNumber(v);
    return Math.min(v, max);
  }, []);

  const [popup, setPopup] = useState(null);

  const safeValue = value || defValue;

  const h = update(safeValue.getHours(), maxH);
  const m = update(safeValue.getMinutes(), maxM);

  const pm = h > 12;

  const hText = formatH(h);
  const mText = formatM(m);
  const textValue = useMemo(
    () => timeFormat(new Date(0, 0, 0, h, m)),
    [h, m, timeFormat],
  );

  const click = useCallback(() => {
    setPopup(true);
  }, []);

  const togglePM = useCallback(() => {
    const next = new Date(safeValue);
    next.setHours(next.getHours() + (pm ? -12 : 12));
    setValue(next);
    if (onChange) onChange({ value: next });
  }, [safeValue, pm, onChange]);

  const setHours = useCallback(
    ({ value: v }) => {
      if (safeValue.getHours() === v) return;

      const next = new Date(safeValue);
      next.setHours(v);
      setValue(next);
      if (onChange) onChange({ value: next });
    },
    [safeValue, onChange],
  );

  const setMinutes = useCallback(
    ({ value: v }) => {
      if (safeValue.getMinutes() === v) return;

      const next = new Date(safeValue);
      next.setMinutes(v);
      setValue(next);
      if (onChange) onChange({ value: next });
    },
    [safeValue, onChange],
  );

  const updateH = useCallback(
    (v) => {
      v = update(v, maxH);
      if (h12) {
        v = v * 1;
        if (v === 12) v = 0;
        if (pm) v += 12;
      }
      return v;
    },
    [update, h12, pm],
  );

  const oncancel = useCallback(() => {
    setPopup(null);
  }, []);

  return (
    <div
      className={`wx-7f497i wx-timepicker ${error ? 'wx-7f497i wx-error' : ''} ${disabled ? 'wx-7f497i wx-disabled' : ''}`}
      onClick={disabled ? undefined : click}
      style={{ cursor: disabled ? 'default' : 'pointer' }}
    >
      <Text
        id={id}
        css={css}
        title={title}
        value={textValue}
        readonly={true}
        disabled={disabled}
        error={error}
        icon="wxi-clock"
        inputStyle={{
          cursor: 'pointer',
          width: '100%',
          paddingRight:
            'calc(var(--wx-input-icon-size) + var(--wx-input-icon-indent) * 2)',
        }}
      />

      {popup && !disabled && (
        <Dropdown onCancel={oncancel} width="unset">
          <div className="wx-7f497i wx-wrapper">
            <div className="wx-7f497i wx-timer">
              <input
                className="wx-7f497i wx-digit"
                value={hText}
                onChange={(ev) => {
                  const val = updateH(ev.target.value);
                  setHours({ value: val });
                }}
              />
              <div className="wx-7f497i wx-separator">:</div>
              <input
                className="wx-7f497i wx-digit"
                value={mText}
                onChange={(ev) => {
                  const val = update(ev.target.value, maxM);
                  setMinutes({ value: val });
                }}
              />
              {h12 && (
                <TwoState
                  value={pm}
                  onClick={togglePM}
                  active={() => <span>pm</span>}
                >
                  <span>am</span>
                </TwoState>
              )}
            </div>
            <Field width="unset">
              <Slider
                label={calendarLocale.hours}
                value={h}
                onChange={setHours}
                max={maxH}
              />
            </Field>
            <Field width="unset">
              <Slider
                label={calendarLocale.minutes}
                value={m}
                onChange={setMinutes}
                max={maxM}
              />
            </Field>
          </div>
        </Dropdown>
      )}
    </div>
  );
}
