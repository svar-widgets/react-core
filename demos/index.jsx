import ReactDOM from 'react-dom/client';
import App from './common/Index.jsx';

import Willow from '../src/themes/Willow.jsx';
import WillowDark from '../src/themes/WillowDark.jsx';

import { Globals, Button, Segmented } from '../src/index.js';
import { WillowIcon, WillowDarkIcon } from './assets/icons/index';

const skins = [
  { id: 'willow', label: 'Willow', Component: Willow, icon: WillowIcon },
  { id: 'willow-dark', label: 'Dark', Component: WillowDark, icon: WillowDarkIcon },
];

ReactDOM.createRoot(document.getElementById('root')).render(
    <App
      publicName="Core"
      skins={skins}
      productTag="core"
      productLink="core"
      Globals={Globals}
      Button={Button}
      Segmented={Segmented}
    />
);
