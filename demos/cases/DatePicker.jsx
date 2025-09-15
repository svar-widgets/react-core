import { useContext } from 'react';
import { DatePicker, Field, context } from '../../src/index';

export default function DatePickerDemo() {
  const date = new Date(2025, 4, 1);
  const wh = useContext(context.helpers);

  function showChanges(ev) {
    wh.showNotice({ text: `Date changed to ${ev.value}` });
  }

  function parseDate(string) {
    const p = string.match(/(..)(..)(.+)/);
    return p ? new Date(p.slice(1, 4).join('/')) : null;
  }

  return (
    <div className="wx-2o76S9 demo-box">
      <h3>Datepicker</h3>
      <Field label="Wide">
        {({ id }) => <DatePicker width="100%" id={id} onChange={showChanges} />}
      </Field>
      <Field label="Align auto">{({ id }) => <DatePicker id={id} />}</Field>
      <Field label="Disabled">
        {({ id }) => <DatePicker disabled id={id} />}
      </Field>
      <Field label="Editable (new Date())">
        {({ id }) => <DatePicker editable id={id} />}
      </Field>
      <Field label="Editable custom format (MMDDYYYY)">
        {({ id }) => (
          <DatePicker editable={parseDate} id={id} format={'%m%d%Y'} />
        )}
      </Field>
      <Field label="Align center" error>
        {({ id }) => (
          <DatePicker error id={id} align="center" title="Invalid date" />
        )}
      </Field>
      <Field label="Without buttons">
        {({ id }) => (
          <DatePicker
            id={id}
            buttons={false}
            value={new Date(2022, 4, 10, 16, 0)}
          />
        )}
      </Field>
      <Field label="With Today button only">
        {({ id }) => (
          <DatePicker
            id={id}
            buttons={['today']}
            value={new Date(2022, 4, 10, 16, 0)}
          />
        )}
      </Field>
      <Field label="Default format">
        {({ id }) => <DatePicker id={id} value={date} />}
      </Field>
      <Field label="Custom format">
        {({ id }) => <DatePicker id={id} value={date} format="%d %F, %Y" />}
      </Field>
      <Field label="Custom icon position">
        {({ id }) => <DatePicker id={id} value={date} css="wx-icon-left" />}
      </Field>
      <Field label="With clear icon">
        {({ id }) => <DatePicker id={id} value={date} clear />}
      </Field>
      <Field label="Custom clear icon position">
        {({ id }) => (
          <DatePicker id={id} value={date} css="wx-icon-left" clear />
        )}
      </Field>
    </div>
  );
}
