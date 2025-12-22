import { useState } from 'react';
import { Checkbox, Field, CheckboxGroup } from '../../src/index';

export default function CheckboxDemo() {
  const options = [
    { id: 1, label: 'Option 1' },
    { id: 2, label: 'Option 2' },
    { id: 3, label: 'Option 3' },
    { id: 4, label: 'Option 4' },
    { id: 5, label: 'Option 5' },
  ];

  const [v1, setV1] = useState(true);
  const [v2, setV2] = useState(false);

  const [valueGroup1, setValueGroup1] = useState([1, 2]);
  const [valueGroup2, setValueGroup2] = useState([2, 3]);
  const [valueGroup3, setValueGroup3] = useState([3, 4]);

  function print(v) {
    return v.join(', ');
  }

  return (
    <>
      <div className="wx-1WSziR demo-box">
        <h3>Checkbox</h3>
        Value:
        {v1.toString()}
        <div>
          <Checkbox label="Check" value={v1} onChange={(e) => setV1(e.value)} />
        </div>
        <div>&nbsp;</div>
        Value:
        {v2.toString()}
        <div>
          <Checkbox
            label="Uncheck"
            value={v2}
            onChange={(e) => setV2(e.value)}
          />
        </div>
      </div>

      <div className="wx-1WSziR demo-box">
        <h3>Checkbox with a side label</h3>
        <Field label="Checkbox" type="checkbox" position="left">
          <Checkbox />
        </Field>
        <Field label="Disabled" type="checkbox" position="left">
          <Checkbox label="Default" disabled />
        </Field>
        <Field label="Disabled" type="checkbox" position="left">
          <Checkbox label="Checked" disabled />
        </Field>
      </div>

      <div className="wx-1WSziR demo-box">
        <h3>Checkbox group: {print(valueGroup1)}</h3>
        <Field label="Check group" position="left" type="checkbox">
          <CheckboxGroup
            options={options}
            value={valueGroup1}
            onChange={(e) => setValueGroup1(e.value)}
          />
        </Field>
      </div>

      <div className="wx-1WSziR demo-box">
        <h3>Checkbox group inline: {print(valueGroup2)}</h3>
        <Field label="Check group" position="left" type="checkbox">
          <CheckboxGroup
            options={options}
            value={valueGroup2}
            onChange={(e) => setValueGroup2(e.value)}
            type="inline"
          />
        </Field>
      </div>

      <div className="wx-1WSziR demo-box">
        <h3>Checkbox group grid: {print(valueGroup3)}</h3>
        <Field label="Check group" position="left" type="checkbox">
          <CheckboxGroup
            options={options}
            value={valueGroup3}
            onChange={(e) => setValueGroup3(e.value)}
            type="grid"
          />
        </Field>
      </div>
    </>
  );
}
