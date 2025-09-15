import { useContext, useMemo } from 'react';
import { dateToString, getDuodecade } from '@svar-ui/lib-dom';
import { i18n } from '../../context.js';

function Header({ date, type, part, onShift }) {
  const { calendar, formats } = useContext(i18n).getRaw();

  const year = date.getFullYear();

  const label = useMemo(() => {
    switch (type) {
      case 'month':
        return dateToString(formats.monthYearFormat, calendar)(date);
      case 'year':
        return dateToString(formats.yearFormat, calendar)(date);
      case 'duodecade': {
        const { start, end } = getDuodecade(year);
        const yearFormat = dateToString(formats.yearFormat, calendar);
        return `${yearFormat(new Date(start, 0, 1))} - ${yearFormat(new Date(end, 11, 31))}`;
      }
      default:
        return '';
    }
  }, [date, type, year, calendar, formats]);

  function changeType() {
    onShift && onShift({ diff: 0, type });
  }

  return (
    <div className="wx-8HQVQV wx-header">
      {part !== 'right' ? (
        <i
          className="wx-8HQVQV wx-pager wxi-angle-left"
          onClick={() => onShift && onShift({ diff: -1, type })}
        />
      ) : (
        <span className="wx-8HQVQV wx-spacer" />
      )}

      <span className="wx-8HQVQV wx-label" onClick={changeType}>
        {label}
      </span>

      {part !== 'left' ? (
        <i
          className="wx-8HQVQV wx-pager wxi-angle-right"
          onClick={() => onShift && onShift({ diff: 1, type })}
        />
      ) : (
        <span className="wx-8HQVQV wx-spacer" />
      )}
    </div>
  );
}

import './Header.css';

export default Header;
