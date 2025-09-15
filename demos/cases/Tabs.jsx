import { useContext, useState } from 'react';
import { Tabs, context } from '../../src/index.js';

const tabs = [
  { id: 0, label: 'Info', icon: 'wxi-alert' },
  { id: 1, label: 'About' },
  { id: 2, label: 'Contact' },
  { id: 3, label: '', icon: 'wxi-check' },
];

export default function DemoComponent() {
  const { showNotice } = useContext(context.helpers);

  const [active, setActive] = useState(2);

  function onChange({ value }) {
    setActive(value);
    showNotice({
      type: 'info',
      expire: 2000,
      text: 'ID: ' + value,
    });
  }

  return (
    <div className="wx-1EdWwt demo-box">
      <h3>Tabs</h3>

      <div className="wx-1EdWwt tabbar">
        <Tabs
          options={tabs}
          value={active}
          onChange={({ value }) => setActive(value)}
        />
        {active === 0 ? (
          <div className="wx-1EdWwt body">Info</div>
        ) : active === 1 ? (
          <div className="wx-1EdWwt body">About</div>
        ) : active === 2 ? (
          <div className="wx-1EdWwt body">Contact</div>
        ) : (
          <div className="wx-1EdWwt body">Check</div>
        )}
        <Tabs
          options={tabs}
          value={active}
          onChange={({ value }) => setActive(value)}
          type="bottom"
        />
      </div>

      <h3>onChange</h3>
      <Tabs options={tabs} value={0} onChange={onChange} />
    </div>
  );
}

import './Tabs.css';
