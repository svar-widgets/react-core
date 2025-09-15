import { useContext, useState, useMemo } from 'react';
import Header from './Header.jsx';
import Button from './Button.jsx';
import { configs } from './helpers';
import { i18n } from '../../context.js';
import './Panel.css';

const defaultButtons = ['clear', 'today'];

function getButtonValue(btn) {
  if (btn === 'done') return -1;
  if (btn === 'clear') return null;
  if (btn === 'today') return new Date();
}

function Panel({
  value,
  current,
  onCurrentChange,
  part = 'normal',
  markers = null,
  buttons,
  onShift,
  onChange,
}) {
  const _ = useContext(i18n).getGroup('calendar');

  const [type, setType] = useState('month');

  const buttonsList = Array.isArray(buttons)
    ? buttons
    : buttons
      ? defaultButtons
      : [];

  const selectDate = (ev, date) => {
    ev.preventDefault();
    onChange && onChange({ value: date });
  };

  const oncancel = () => {
    if (type === 'duodecade') setType('year');
    else if (type === 'year') setType('month');
  };

  const onShiftLocal = (ev) => {
    const { diff, current: newCurrent } = ev;

    if (diff === 0) {
      if (type === 'month') setType('year');
      else if (type === 'year') setType('duodecade');
      return;
    }
    if (diff) {
      const obj = configs[type];
      onCurrentChange(diff > 0 ? obj.next(current) : obj.prev(current));
    } else if (newCurrent) {
      onCurrentChange(newCurrent);
    }

    onShift && onShift();
  };

  const onChangeLocal = (value) => {
    setType('month');
    onChange && onChange({ select: true, value });
  };

  const CalendarView = useMemo(() => configs[type].component, [type]);

  return (
    <div
      className={`wx-2Gr4AS wx-calendar ${part !== 'normal' && part !== 'both' ? 'wx-part' : ''}`}
    >
      <div className="wx-2Gr4AS wx-wrap">
        <Header date={current} part={part} type={type} onShift={onShiftLocal} />
        <div>
          <CalendarView
            value={value}
            current={current}
            onCurrentChange={onCurrentChange}
            part={part}
            markers={markers}
            onCancel={oncancel}
            onChange={onChangeLocal}
            onShift={onShiftLocal}
          />
          {type === 'month' && buttonsList.length > 0 && (
            <div className="wx-2Gr4AS wx-buttons">
              {buttonsList.map((button) => (
                <div key={button} className="wx-2Gr4AS wx-button-item">
                  <Button
                    onClick={(e) => selectDate(e, getButtonValue(button))}
                  >
                    {_(button)}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Panel;
