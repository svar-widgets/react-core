import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './common/Index.jsx';

import Willow from '../src/themes/Willow.jsx';
import WillowDark from '../src/themes/WillowDark.jsx';

import { Globals, Button, Segmented } from '../src/index.js';

const skins = [
  { id: 'willow', label: 'Willow', Component: Willow },
  { id: 'willow-dark', label: 'Dark', Component: WillowDark },
];

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App
      publicName="Core"
      skins={skins}
      productTag="core"
      Globals={Globals}
      Button={Button}
      Segmented={Segmented}
    />
  </React.StrictMode>,
);
