import { useContext } from 'react';
import { Button, context } from '../../src/index.js';

export default function Buttons() {
  const { showNotice } = useContext(context.helpers);

  const onClick = () => {
    showNotice({
      text: 'Button clicked',
    });
  };

  return (
    <>
      <div className="wx-kfse34 demo-box">
        <h3>Default button</h3>
        <Button onClick={onClick} title="Click me and I will do nothing">
          Click Me
        </Button>
        <Button disabled={true} onClick={onClick}>
          Click Me
        </Button>
      </div>

      <div className="wx-kfse34 demo-box">
        <h3>Primary button</h3>
        <Button type="primary" onClick={onClick}>
          Click Me
        </Button>
        <Button type="primary" disabled={true} onClick={onClick}>
          Click Me
        </Button>
      </div>

      <div className="wx-kfse34 demo-box">
        <h3>Secondary button</h3>
        <Button type="secondary" onClick={onClick}>
          Click Me
        </Button>
        <Button type="secondary" disabled={true} onClick={onClick}>
          Click Me
        </Button>
      </div>

      <div className="wx-kfse34 demo-box">
        <h3>Danger button</h3>
        <Button type="danger" onClick={onClick}>
          Click Me
        </Button>
        <Button type="danger" disabled={true} onClick={onClick}>
          Click Me
        </Button>
      </div>

      <div className="wx-kfse34 demo-box">
        <h3>Link button</h3>
        <p>
          <Button type="link" icon="wxi-alert" onClick={onClick}>
            Click Me
          </Button>
        </p>
        <p>
          <Button type="link" onClick={onClick}>
            Click Me
          </Button>
        </p>
        <p>
          <Button type="link" disabled={true} onClick={onClick}>
            Click Me
          </Button>
        </p>
      </div>

      <div className="wx-kfse34 demo-box">
        <h3>Block buttons</h3>
        <p>
          <Button type="primary block">Click Me</Button>
        </p>
        <p>
          <Button type="secondary block">Click Me</Button>
        </p>
        <div style={{ display: 'flex' }}>
          <Button type="secondary block">Click Me</Button>
          &nbsp;
          <Button type="primary block">Click Me</Button>
        </div>
      </div>

      <div className="wx-kfse34 demo-box">
        <h3>Icon buttons</h3>
        <Button icon="wxi-alert">With Icon</Button>
        <Button type="primary" icon="wxi-alert">
          With Icon
        </Button>
        <Button type="secondary" icon="wxi-alert">
          With Icon
        </Button>
        <Button icon="wxi-alert" />
        <Button type="primary" icon="wxi-alert" />
        <Button type="secondary" icon="wxi-alert" />
        <Button type="danger" icon="wxi-alert" />
        <Button disabled icon="wxi-alert" />
      </div>

      <div className="wx-kfse34 demo-box">
        <h3>Multi-line button</h3>
        <p>
          <Button type="primary">
            Click me
            <br />a few times
          </Button>
        </p>
      </div>
    </>
  );
}
