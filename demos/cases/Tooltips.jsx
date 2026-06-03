import { useState, useMemo } from 'react';
import {
  Button,
  Checkbox,
  Combo,
  Field,
  Icon,
  Modal,
  Segmented,
  Slider,
  Tooltip,
} from '../../src/index';
import MyTooltipContent from '../custom/MyTooltipContent.jsx';
import { users } from '../data/userlist';
import './Tooltips.css';

const SEGMENTED_SIDE_OPTIONS = [
  { id: 'point', label: 'Point' },
  { id: 'top', label: 'Top' },
  { id: 'bottom', label: 'Bottom' },
  { id: 'left', label: 'Left' },
  { id: 'right', label: 'Right' },
];

const SEGMENTED_ALIGN_OPTIONS = [
  { id: 'start', label: 'Start' },
  { id: 'center', label: 'Center' },
  { id: 'end', label: 'End' },
];

function getAt(side, align) {
  if (side === 'point') return 'point';
  return `${side}-${align}`;
}

export default function Component() {
  const [side, setSide] = useState('point');
  const [align, setAlign] = useState('center');
  const at = useMemo(() => getAt(side, align), [side, align]);
  const [arrow, setArrow] = useState(true);
  const [touch, setTouch] = useState(false);
  const [overflow, setOverflow] = useState(false);
  const [delay, setDelay] = useState(200);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="tooltips-demo">
      <div className="demo-box properties">
        <h3>Tooltip Properties</h3>
        <Field label="Side">
          <Segmented
            value={side}
            onChange={({ value }) => setSide(value)}
            options={SEGMENTED_SIDE_OPTIONS}
          />
        </Field>
        <Field label="Align">
          <Segmented
            value={align}
            onChange={({ value }) => setAlign(value)}
            options={SEGMENTED_ALIGN_OPTIONS}
          />
        </Field>
        <Field label="Delay">
          <Slider
            value={delay}
            onChange={({ value }) => setDelay(value)}
            min={0}
            max={500}
            step={25}
            label={`${delay} ms`}
          />
        </Field>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Checkbox
            value={arrow}
            onChange={({ value }) => setArrow(value)}
            label="Arrow"
          ></Checkbox>
          <Checkbox
            value={touch}
            onChange={({ value }) => setTouch(value)}
            label="Enable on Touch Devices"
          ></Checkbox>
          <Checkbox
            value={overflow}
            onChange={({ value }) => setOverflow(value)}
            label="Overflow Only"
          ></Checkbox>
        </div>
      </div>

      <div className="demo-box">
        <h3>Tooltip Area</h3>
        <Tooltip
          at={at}
          arrow={arrow}
          delay={delay}
          touch={touch}
          overflow={overflow}
        >
          <div className="item margin" data-tooltip-text="This is a tooltip!">
            Hover to see the tooltip
          </div>
        </Tooltip>
      </div>

      <div className="demo-box">
        <h3>Controls with Tooltip</h3>
        <Tooltip
          at={at}
          arrow={arrow}
          delay={delay}
          touch={touch}
          overflow={overflow}
        >
          <div className="controls">
            <div>
              <Button type="primary" tooltip="I am a button">
                Button
              </Button>
              <Icon css="wxi-star" tooltip="I am an icon" />
            </div>
            <Combo tooltip="I am a combo box" options={users} value={87} />
            <Button
              css="button-overflow"
              tooltip="With overflow=true, this is the only visible tooltip in this section"
            >
              Overflowing text in button
            </Button>
          </div>
        </Tooltip>
      </div>

      <div className="demo-box">
        <h3>Tooltips in Modals</h3>
        <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
        {isModalOpen && (
          <Modal buttons={['ok']} onConfirm={() => setIsModalOpen(false)}>
            <div className="modal-content">
              <h3>Modal Content</h3>
              <p>This is a modal with a tooltip.</p>
              <Tooltip
                at={at}
                arrow={arrow}
                delay={delay}
                touch={touch}
                overflow={overflow}
              >
                <div
                  className="item"
                  data-tooltip-text="This is a tooltip inside a modal!"
                >
                  Hover to see the tooltip
                </div>
              </Tooltip>
            </div>
          </Modal>
        )}
      </div>

      <div className="demo-box">
        <h3>Custom Tooltip Content and Resolver</h3>
        <Tooltip
          at={at}
          arrow={arrow}
          touch={touch}
          delay={delay}
          overflow={overflow}
          content={MyTooltipContent}
          resolver={element =>
            element.matches('.grid > div')
              ? {
                  x: Number(element.dataset.x),
                  y: Number(element.dataset.y),
                  value: Number(element.textContent),
                }
              : null
          }
        >
          <div className="grid">
            <div data-x="0" data-y="0">
              10
            </div>
            <div data-x="1" data-y="0">
              20
            </div>
            <div data-x="2" data-y="0">
              30
            </div>
            <div data-x="0" data-y="1">
              40
            </div>
            <div data-x="1" data-y="1">
              50
            </div>
            <div data-x="2" data-y="1">
              60
            </div>
            <div data-x="0" data-y="2">
              70
            </div>
            <div data-x="1" data-y="2">
              80
            </div>
            <div data-x="2" data-y="2">
              90
            </div>
          </div>
        </Tooltip>
      </div>

      <div className="demo-box">
        <h3>Nested Tooltips</h3>
        <Tooltip at="top-center" arrow={true}>
          <div className="item" data-tooltip-text="Outer Tooltip">
            <div style={{ marginBottom: '20px' }}>Outer Tooltip</div>
            <Tooltip at="right-center" arrow={true}>
              <div
                className="item"
                style={{ margin: '0' }}
                data-tooltip-text="Inner Tooltip"
              >
                Inner Tooltip
              </div>
            </Tooltip>
          </div>
        </Tooltip>
      </div>
    </div>
  );
}
