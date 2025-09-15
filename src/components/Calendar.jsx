import { useEffect, useCallback } from 'react';
import Panel from './calendar/Panel.jsx';
import { useWritableProp } from '@svar-ui/lib-react';
import Locale from '../Locale.jsx';

function fixCurrent(current, value, setCurrent, force) {
  if (!current || force) {
    const newCurrent = value ? new Date(value) : new Date();
    newCurrent.setDate(1);
    setCurrent(newCurrent);
  } else {
    if (current.getDate() !== 1) {
      const newCurrent = new Date(current);
      newCurrent.setDate(1);
      setCurrent(newCurrent);
    }
  }
}

const defaultButtons = ['clear', 'today'];

export default function Calendar({
  value: valueProp,
  current: currentProp,
  markers = null,
  buttons = defaultButtons,
  onChange,
}) {
  const [value, setValue] = useWritableProp(valueProp);
  const [current, setCurrent] = useWritableProp(currentProp);

  useEffect(() => {
    fixCurrent(current, value, setCurrent, false);
  }, [value, current]);

  const onChangeLocal = useCallback(
    (v) => {
      const x = v.value;
      if (x) {
        setValue(new Date(x));
        fixCurrent(current, new Date(x), setCurrent, true);
      } else {
        setValue(null);
      }

      onChange && onChange({ value: x ? new Date(x) : null });
    },
    [onChange, current],
  );

  const onCurrentChangeLocal = useCallback(
    (v) => {
      setCurrent(v);
    },
    [setCurrent],
  );

  if (!current) return null;

  return (
    <Locale>
      <Panel
        value={value}
        current={current}
        markers={markers}
        buttons={buttons}
        onChange={onChangeLocal}
        onCurrentChange={onCurrentChangeLocal}
      />
    </Locale>
  );
}
