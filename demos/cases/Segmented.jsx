import { useState } from 'react';
import { Segmented } from '../../src/index';

const options = [
  {
    id: 1,
    label: 'One',
    icon: 'wxi-view-sequential',
    title: 'Grid mode',
  },
  { id: 2, label: 'Two', icon: 'wxi-view-grid', title: 'Tiles mode' },
  {
    id: 3,
    label: 'Three',
    icon: 'wxi-view-column',
    title: 'Two panels mode',
  },
];

const optionsIcons = options.map((a) => ({ ...a, label: null }));
const optionsText = options.map((a) => ({ ...a, icon: null }));

export default function Component() {
  const [value, setValue] = useState(2);

  return (
    <>
      <div className="wx-32O2Aw demo-box">
        <h3>Default templates</h3>

        <h4>Segmented Button</h4>
        <Segmented
          options={optionsText}
          value={value}
          onChange={(e) => setValue(e.value)}
        />

        <h4>Segmented Button with icons</h4>
        <Segmented
          options={optionsIcons}
          value={value}
          onChange={(e) => setValue(e.value)}
        />

        <h4>Segmented Button with a mixed content</h4>
        <Segmented options={options} value={1} />
      </div>

      <div className="wx-32O2Aw demo-box">
        <h3>Custom templates</h3>

        <h4>Segmented Button</h4>
        <Segmented
          options={options}
          value={value}
          onChange={(e) => setValue(e.value)}
        />

        <h4>Segmented Button with icons</h4>
        <Segmented options={options} value={1}>
          {({ option }) => <i className={`icon wx-32O2Aw ${option.icon}`}></i>}
        </Segmented>

        <h4>Segmented Button with a mixed content</h4>
        <Segmented options={options} value={2}>
          {({ option }) => (
            <>
              <i className={`icon wx-32O2Aw ${option.icon}`}></i>
              <span className="wx-32O2Aw bottom">{option.label}</span>
            </>
          )}
        </Segmented>
      </div>
    </>
  );
}
