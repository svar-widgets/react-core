import { useContext, useMemo, useRef, useEffect } from 'react';
import { useWritableProp } from '@svar-ui/lib-react';
import { delegateClick, getDuodecade } from '@svar-ui/lib-dom';
import Button from './Button.jsx';
import { getPartValue } from './helpers';
import { i18n } from '../../context.js';
import './Duodecade.css';

const cssScope = 'wx-1XEF33';

const Duodecade = ({ value, current, onCancel, onChange, onShift, part }) => {
  const _ = useContext(i18n).getRaw().calendar;

  const [currentState, setCurrent] = useWritableProp(current);
  const [valueState, setValue] = useWritableProp(value);

  const year = useMemo(() => currentState.getFullYear(), [currentState]);

  const years = useMemo(() => {
    const { start, end } = getDuodecade(year);
    const years = [];
    for (let y = start; y <= end; ++y) {
      years.push(y);
    }
    return years;
  }, [year]);

  const selectYears = {
    click: selectYear,
  };

  function selectYear(yearVal, e) {
    if (yearVal) {
      e.stopPropagation();
      const newCurrent = new Date(currentState);
      newCurrent.setFullYear(yearVal);
      setCurrent(newCurrent);

      onShift && onShift({ current: newCurrent });
    }

    if (part === 'normal') {
      setValue(new Date(currentState));
    }

    onCancel && onCancel();
  }

  function done() {
    const date = new Date(getPartValue(valueState, part) || currentState);

    date.setFullYear(currentState.getFullYear());

    onChange && onChange(date);
  }

  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      delegateClick(containerRef.current, selectYears);
    }
  }, []);

  return (
    <>
      <div className={cssScope + ' wx-years'} ref={containerRef}>
        {years.map((y, i) => (
          <div
            key={i}
            className={
              cssScope +
              ` wx-year ${year == y ? 'wx-current' : ''} ${i === 0 ? 'wx-prev-decade' : ''} ${i === 11 ? 'wx-next-decade' : ''}`
            }
            data-id={y}
          >
            {y}
          </div>
        ))}
      </div>
      <div className={cssScope + ' wx-buttons'}>
        <Button onClick={done}>{_.done}</Button>
      </div>
    </>
  );
};

export default Duodecade;
