import { Fullscreen, Button, ColorPicker, DatePicker } from '../../src/index';

export default function Component() {
  return (
    <div className="fullscreen-demo">
      <Fullscreen hotkey="ctrl+shift+f">
        <div className="demo-box">
          <h3>Fullscreen</h3>
          <p>Click button or press Ctrl + Shift + F to toggle fullscreen</p>
          <div className="demo-content">
            <ColorPicker placeholder="Select a color..." value="#65D3B3" />
            <ColorPicker placeholder="Select a color..." value="#65D3B3" />
            <ColorPicker placeholder="Select a color..." value="#65D3B3" />
          </div>
        </div>
      </Fullscreen>
      <Fullscreen hotkey="ctrl+shift+f">
        <div className="demo-box">
          <h3>Fullscreen</h3>
          <p>
            When encountering multiple instances with same hotkeys selects
            focused area first
          </p>
          <p>Click button or press Ctrl + Shift + F to toggle fullscreen</p>
          <div className="demo-content">
            <ColorPicker placeholder="Select a color..." value="#ffc975" />
            <ColorPicker placeholder="Select a color..." value="#ffc975" />
            <ColorPicker placeholder="Select a color..." value="#ffc975" />
          </div>
        </div>
      </Fullscreen>
      <Fullscreen
        hotkey="ctrl+shift+space"
        toggleButton={(onClick, inFullscreen) => (
          <div className="demo-button">
            <Button onClick={onClick}>
              {`Click me to ${inFullscreen ? 'exit' : 'enter'} fullscreen`}
            </Button>
          </div>
        )}
      >
        <div className="demo-box">
          <h3>Fullscreen with custom button</h3>
          <p>
            Click button or press Ctrl + Shift + Space to toggle fullscreen
          </p>
          <div className="demo-content">
            <DatePicker />
            <DatePicker />
            <DatePicker />
          </div>
        </div>
      </Fullscreen>

      <style>{`
        .fullscreen-demo {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .demo-button {
          margin: 20px;
        }
        .demo-box {
          border: var(--wx-border);
          padding: 0 12px 12px;
          border-radius: var(--wx-border-radius, 3px);
        }
        .demo-content {
          display: flex;
          flex-direction: row;
          max-width: 900px;
          gap: 8px;
        }
      `}</style>
    </div>
  );
}
