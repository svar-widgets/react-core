import { DateRangePicker, Field, context } from '../../src/index';
import { useContext, useCallback } from 'react';

const date = {
  start: new Date(2020, 1, 1),
  end: new Date(2021, 3, 3),
};

function parseDate(string) {
  const p = string.match(/(..)(..)(.+)/);
  return p ? new Date(p.slice(1, 4).join('/')) : null;
}

export default function DateRangePickerDemo() {
  const helpers = useContext(context.helpers);
  const showChanges = useCallback(
    (ev) => {
      helpers.showNotice({
        text: `Date changed to ${JSON.stringify(ev.value)}`,
      });
    },
    [helpers],
  );
  return (
    <div className="wx-2kEp5J demo-box">
      <h3>DateRangePicker</h3>
      <Field label="Date range">
        <DateRangePicker value={date} onChange={showChanges} />
      </Field>
      <Field label="DateRangePicker with the Done button">
        <DateRangePicker value={date} done={true} />
      </Field>
      <Field label="With custom buttons">
        <DateRangePicker value={date} buttons={['done', 'clear', 'today']} />
      </Field>
      <Field label="Disabled">
        <DateRangePicker disabled value={date} />
      </Field>
      <Field label="Editable (new Date())">
        <DateRangePicker editable value={date} />
      </Field>
      <Field label="Editable, custom format (MMDDYYYY - MMDDYYYY)">
        <DateRangePicker editable={parseDate} value={date} format={'%m%d%Y'} />
      </Field>
      <Field label="Error" error>
        <DateRangePicker error value={date} title="Invalid date" />
      </Field>

      <Field label="Custom format">
        <DateRangePicker format="%d %F, %Y" value={date} />
      </Field>
      <Field label="Custom icon position">
        <DateRangePicker value={date} css="wx-icon-left" />
      </Field>
      <Field label="Single month">
        <DateRangePicker months={1} />
      </Field>
      <Field label="Clear button">
        <DateRangePicker value={date} clear />
      </Field>
    </div>
  );
}

import './DateRangePicker.css';
