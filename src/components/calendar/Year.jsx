import { useContext, useMemo, useCallback } from 'react';
import Button from './Button.jsx';
import { getPartValue } from './helpers';
import { i18n } from '../../context.js';
import './Year.css';
import { useWritableProp } from '@svar-ui/lib-react';

export default function Year({
  value: valueProp,
  current: currentProp,
  part,
  onCancel,
  onChange,
  onShift,
}) {
  const [value, setValue] = useWritableProp(valueProp || new Date());
  const [current, setCurrent] = useWritableProp(currentProp || new Date());

  const locale = useContext(i18n).getRaw().calendar;
  const months = locale.monthShort || [];

  const monthNum = useMemo(() => {
    return current.getMonth();
  }, [current]);

  const selectMonth = useCallback(
    (month, e) => {
      if (month !== null && month !== undefined) {
        e.stopPropagation();
        const newCurrent = new Date(current);
        newCurrent.setMonth(month);
        setCurrent(newCurrent);

        onShift && onShift({ current: newCurrent });
      }

      if (part === 'normal') setValue(new Date(current));

      onCancel && onCancel();
    },
    [current, part, onShift, onCancel],
  );

  const done = useCallback(() => {
    const date = new Date(getPartValue(value, part) || current);

    date.setMonth(current.getMonth());
    date.setFullYear(current.getFullYear());

    onChange && onChange(date);
  }, [value, current, part, onChange]);

  const handleMonthClick = useCallback(
    (e) => {
      const target = e.target.closest('[data-id]');
      if (target) {
        const month = parseInt(target.getAttribute('data-id'), 10);
        selectMonth(month, e);
      }
    },
    [selectMonth],
  );

  return (
    <>
      <div className={'wx-34U8T8 wx-months'} onClick={handleMonthClick}>
        {months.map((month, i) => (
          <div
            key={i}
            className={
              'wx-34U8T8 wx-month' + (monthNum === i ? ' wx-current' : '')
            }
            data-id={i}
          >
            {month}
          </div>
        ))}
      </div>
      <div className={'wx-34U8T8 wx-buttons'}>
        <Button onClick={done}>{locale.done}</Button>
      </div>
    </>
  );
}
