import { Field, DatePicker } from '../../src/index';
import './DropdownScroll.css';

export default function DemoDropdownScroll() {
  return (
    <div className="demo-box">
      <h3>DatePicker in a scrollable container.</h3>
      <p>
        Click to show and scroll the container. <b>trackScroll</b> closes
        dropdown on scroll
      </p>
      <div>
        <Field>
          <div className="container" style={{ height: '150px', overflow: 'auto' }}>
            <div style={{ width: '100%', height: '700px' }}>
              <DatePicker dropdown={{ trackScroll: true }} />
            </div>
          </div>
        </Field>
      </div>
      <p>
        <b>inline</b> dropdown mode
      </p>
      <div>
        <Field>
          <div className="container" style={{ height: '150px', overflow: 'auto' }}>
            <div style={{ width: '100%', height: '700px' }}>
              <DatePicker dropdown={{ inline: true }} />
            </div>
          </div>
        </Field>
      </div>
    </div>
  );
}
