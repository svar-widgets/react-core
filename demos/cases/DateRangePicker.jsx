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
        {({ id }) => (
          <DateRangePicker value={date} id={id} onChange={showChanges} />
        )}
      </Field>
      <Field label="DateRangePicker with the Done button">
        {({ id }) => <DateRangePicker value={date} id={id} done={true} />}
      </Field>
      <Field label="With custom buttons">
        {({ id }) => (
          <DateRangePicker
            value={date}
            id={id}
            buttons={['done', 'clear', 'today']}
          />
        )}
      </Field>
      <Field label="Disabled">
        {({ id }) => <DateRangePicker disabled value={date} id={id} />}
      </Field>
      <Field label="Editable (new Date())">
        {({ id }) => <DateRangePicker editable value={date} id={id} />}
      </Field>
      <Field label="Editable, custom format (MMDDYYYY - MMDDYYYY)">
        {({ id }) => (
          <DateRangePicker
            editable={parseDate}
            value={date}
            format={'%m%d%Y'}
            id={id}
          />
        )}
      </Field>
      <Field label="Error" error>
        {({ id }) => (
          <DateRangePicker error value={date} id={id} title="Invalid date" />
        )}
      </Field>

      <Field label="Custom format">
        {({ id }) => (
          <DateRangePicker format="%d %F, %Y" value={date} id={id} />
        )}
      </Field>
      <Field label="Custom icon position">
        {({ id }) => (
          <DateRangePicker id={id} value={date} css="wx-icon-left" />
        )}
      </Field>
      <Field label="Single month">
        {({ id }) => <DateRangePicker id={id} months={1} />}
      </Field>
      <Field label="Clear button">
        {({ id }) => <DateRangePicker value={date} id={id} clear />}
      </Field>
    </div>
  );
}

import './DateRangePicker.css';
