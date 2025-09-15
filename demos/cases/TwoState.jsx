import { useContext } from 'react';
import { TwoState, context } from '../../src/index.js';

export default function Component() {
  const { showNotice } = useContext(context.helpers);

  function onclick() {
    showNotice({
      text: 'TwoState clicked',
    });
  }

  return (
    <>
      <div className="wx-1OqX0e demo-box">
        <h3>Default TwoState Button</h3>
        <TwoState onClick={onclick} active={() => <span>Working...</span>}>
          Click Me
        </TwoState>
        <TwoState disabled={true} onClick={onclick}>
          Click Me
        </TwoState>
      </div>

      <div className="wx-1OqX0e demo-box">
        <h3>Primary TwoState Button</h3>
        <TwoState type="primary" onClick={onclick}>
          Click Me
        </TwoState>
        <TwoState type="primary" disabled={true} onClick={onclick}>
          Click Me
        </TwoState>
      </div>

      <div className="wx-1OqX0e demo-box">
        <h3>Secondary TwoState Button</h3>
        <TwoState type="secondary" onClick={onclick}>
          Click Me
        </TwoState>
        <TwoState type="secondary" disabled={true} onClick={onclick}>
          Click Me
        </TwoState>
      </div>

      <div className="wx-1OqX0e demo-box">
        <h3>Danger TwoState Button</h3>
        <TwoState type="danger" onClick={onclick}>
          Click Me
        </TwoState>
        <TwoState type="danger" disabled={true} onClick={onclick}>
          Click Me
        </TwoState>
      </div>

      <div className="wx-1OqX0e demo-box">
        <h3>Icon TwoState Buttons</h3>
        <TwoState icon="wxi-alert">With Icon</TwoState>
        <TwoState type="primary" icon="wxi-alert" iconActive="wxi-check">
          With Icon
        </TwoState>
        <TwoState type="secondary" icon="wxi-alert">
          With Icon
        </TwoState>
        <TwoState icon="wxi-alert" />
        <TwoState type="primary" icon="wxi-alert" />
        <TwoState type="secondary" icon="wxi-alert" />
        <TwoState type="danger" icon="wxi-alert" />
        <TwoState disabled icon="wxi-alert" />
      </div>

      <div className="wx-1OqX0e demo-box">
        <h3>Disabled</h3>
        <p>
          <TwoState type="primary" value={true} disabled>
            Primary On
          </TwoState>
          <TwoState type="primary" disabled>
            Primary Off
          </TwoState>
        </p>
        <p>
          <TwoState
            title="disabled button"
            type="secondary"
            value={true}
            disabled={true}
          >
            Secondary On
          </TwoState>
          <TwoState type="secondary" disabled={true}>
            Secondary Off
          </TwoState>
        </p>
      </div>
    </>
  );
}
