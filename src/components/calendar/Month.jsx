import { useContext, useMemo, useEffect, useRef } from 'react';
import { delegateClick } from '@svar-ui/lib-dom';
import { i18n } from '../../context.js';
import './Month.css';
import { defaultLocale } from '../helpers/locale.js';

export default function Month({
  value,
  current,
  part = '',
  markers = null,
  onCancel,
  onChange,
}) {
  const locale = (useContext(i18n) || defaultLocale()).getRaw().calendar;
  const weekStart = (locale.weekStart || 7) % 7;
  const weekdays = locale.dayShort
    .slice(weekStart)
    .concat(locale.dayShort.slice(0, weekStart));

  const dv = (d, dm, dd) =>
    new Date(
      d.getFullYear(),
      d.getMonth() + (dm || 0),
      d.getDate() + (dd || 0),
    );
  let ranges = part !== 'normal';

  function isWeekEnd(date) {
    const d = date.getDay();
    return d === 0 || d === 6;
  }

  function getStart() {
    const start = dv(current, 0, 1 - current.getDate());
    start.setDate(start.getDate() - ((start.getDay() - (weekStart - 7)) % 7));
    return start;
  }
  function getEnd() {
    const end = dv(current, 1, -current.getDate());
    end.setDate(end.getDate() + ((6 - end.getDay() + weekStart) % 7));
    return end;
  }

  //MK : HACK
  const lastTime = useRef(0);
  function selectDate(date, e) {
    if (e.timeStamp === lastTime.current) return;
    lastTime.current = e.timeStamp;

    e.stopPropagation();
    if (onChange) onChange(new Date(new Date(date)));
    if (onCancel) onCancel();
  }

  const date = useMemo(() => {
    if (part == 'normal') return [value ? dv(value).valueOf() : 0];
    return value
      ? [
          value.start ? dv(value.start).valueOf() : 0,
          value.end ? dv(value.end).valueOf() : 0,
        ]
      : [0, 0];
  }, [part, value]);

  const days = useMemo(() => {
    const start = getStart();
    const end = getEnd();
    const curMonth = current.getMonth();

    let days = [];
    for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
      const day = {
        day: d.getDate(),
        in: d.getMonth() === curMonth,
        date: d.valueOf(),
      };

      let css = '';
      css += !day.in ? ' wx-inactive' : '';
      css += date.indexOf(day.date) > -1 ? ' wx-selected' : '';

      if (ranges) {
        const s = day.date == date[0];
        const e = day.date == date[1];
        if (s && !e) css += ' wx-left';
        else if (e && !s) css += ' wx-right';

        if (day.date > date[0] && day.date < date[1]) css += ' wx-inrange';
      }

      css += isWeekEnd(d) ? ' wx-weekend' : '';
      if (markers) {
        const mark = markers(d);
        if (mark) css += ' ' + mark;
      }

      days.push({ ...day, css });
    }
    return days;
  }, [current, date, ranges, markers]);

  const delegateRef = useRef(null);
  let delegateHandler = useRef({});
  delegateHandler.current.click = selectDate;

  useEffect(() => {
    delegateClick(delegateRef.current, delegateHandler.current);
  }, []);

  return (
    <div>
      <div className="wx-398RBS wx-weekdays">
        {weekdays.map((day) => (
          <div key={day} className="wx-398RBS wx-weekday">
            {day}
          </div>
        ))}
      </div>
      <div className="wx-398RBS wx-days" ref={delegateRef}>
        {days.map((day) => (
          <div
            key={day.date}
            className={`wx-398RBS wx-day ${day.css} ${!day.in ? 'wx-out' : ''}`}
            data-id={day.date}
          >
            {day.day}
          </div>
        ))}
      </div>
    </div>
  );
}
