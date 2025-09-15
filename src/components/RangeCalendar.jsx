import { useState, useEffect, useCallback } from 'react';
import Panel from './calendar/Panel';
import { useWritableProp } from '@svar-ui/lib-react';
import './RangeCalendar.css';
import Locale from '../Locale.jsx';

const defaultButtons = ['clear', 'today'];

const RangeCalendar = ({
  start: startProp,
  end: endProp,
  current,
  months = 2,
  markers = null,
  buttons = defaultButtons,
  onChange,
}) => {
  const [start, setStart] = useWritableProp(startProp);
  const [end, setEnd] = useWritableProp(endProp);
  const [leftCurrent, setLeftCurrent] = useState();
  const [rightCurrent, setRightCurrent] = useState();

  const addMonth = useCallback((l, diff, rPrev) => {
    const r = new Date(l);
    r.setMonth(r.getMonth() + diff);
    if (rPrev && r.valueOf() === rPrev.valueOf()) return rPrev;
    return r;
  }, []);

  const onLeft = useCallback(
    (v) => {
      setLeftCurrent(() => {
        const newLeft = new Date(v);
        newLeft.setDate(1);
        setRightCurrent(addMonth(newLeft, 1));
        return newLeft;
      });
    },
    [addMonth],
  );

  const onRight = useCallback(
    (v) => {
      setRightCurrent(() => {
        const newRight = new Date(v);
        newRight.setDate(1);
        setLeftCurrent(addMonth(newRight, -1));
        return newRight;
      });
    },
    [addMonth],
  );

  // Effect for initializing leftCurrent based on start/current
  useEffect(() => {
    const startVal = start;
    const currentVal = current;

    if (!leftCurrent) {
      onLeft(startVal ? new Date(startVal) : currentVal || new Date());
    }
  }, [start, current, leftCurrent, onLeft]);

  const selectChange = useCallback(
    (ev) => {
      const v = ev.value;
      let s = start,
        e = end;
      const final = v === -1;
      if (!final) {
        if (ev.select) {
          if (!start || end) {
            setStart((s = v));
            setEnd((e = null));
          } else {
            if (start > v) {
              setEnd((e = start));
              setStart((s = v));
            } else {
              setEnd((e = v));
            }
          }
        } else {
          if (!v) {
            setStart((s = null));
            setEnd((e = null));
          } else {
            setStart((s = new Date(v)));
            setEnd((e = new Date(v)));
          }
        }
      }

      if (final || !buttons.includes('done'))
        onChange && onChange({ start: s, end: e });
      return [s, e];
    },
    [start, end, buttons, onChange],
  );

  const doChangeStart = useCallback(
    (v) => {
      const [s] = selectChange(v);
      if (s) onLeft(new Date(s));
    },
    [onLeft, start, end],
  );

  const doChangeEnd = useCallback(
    (v) => {
      const [, e] = selectChange(v);
      if (e) onRight(new Date(e));
    },
    [onRight, start, end],
  );

  if (!leftCurrent || !rightCurrent) return null;

  if (months === 1) {
    return (
      <Locale>
        <Panel
          value={{ start, end }}
          current={leftCurrent}
          setCurrent={onLeft}
          markers={markers}
          buttons={buttons}
          part="both"
          onChange={doChangeStart}
        />
      </Locale>
    );
  } else {
    return (
      <Locale>
        <div className="wx-p2jCaW wx-rangecalendar">
          <div className="wx-p2jCaW wx-half">
            <Panel
              value={{ start, end }}
              current={leftCurrent}
              setCurrent={onLeft}
              markers={markers}
              buttons={false}
              part="left"
              onChange={doChangeStart}
              onCurrentChange={(v) => onLeft(v)}
            />
          </div>
          <div className="wx-p2jCaW wx-half">
            <Panel
              value={{ start, end }}
              current={rightCurrent}
              setCurrent={onRight}
              markers={markers}
              buttons={buttons}
              part="right"
              onChange={doChangeEnd}
              onCurrentChange={(v) => onRight(v)}
            />
          </div>
        </div>
      </Locale>
    );
  }
};

export default RangeCalendar;
