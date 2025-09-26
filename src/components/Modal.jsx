import { useRef, useEffect, useContext } from 'react';
import Button from './Button.jsx';
import { i18n } from '../context.js';
import './Modal.css';
import { defaultLocale } from './helpers/locale.js';

export default function Modal({
  title = '',
  buttons = ['cancel', 'ok'],
  header,
  children,
  footer,
  onConfirm,
  onCancel,
}) {
  const _ = (useContext(i18n) || defaultLocale()).getGroup('core');
  const modal = useRef(null);

  useEffect(() => {
    modal.current?.focus();
  }, []);

  function keydown(ev) {
    switch (ev.code) {
      case 'Enter': {
        const from = ev.target.tagName;
        if (from === 'TEXTAREA' || from === 'BUTTON') return;
        onConfirm && onConfirm({ event: ev });
        break;
      }
      case 'Escape':
        onCancel && onCancel({ event: ev });
        break;
    }
  }

  function onclick(ev, button) {
    const pack = { event: ev, button };
    if (button === 'cancel') {
      onCancel && onCancel(pack);
    } else {
      onConfirm && onConfirm(pack);
    }
  }

  return (
    <div
      className="wx-1FxkZa wx-modal"
      ref={modal}
      tabIndex={0}
      onKeyDown={keydown}
    >
      <div className="wx-1FxkZa wx-window">
        {header ? (
          header
        ) : title ? (
          <div className="wx-1FxkZa wx-header">{title}</div>
        ) : null}

        <div>{children}</div>

        {footer
          ? footer
          : buttons && (
              <div className="wx-1FxkZa wx-buttons">
                {buttons.map((button) => (
                  <div key={button} className="wx-1FxkZa wx-button">
                    <Button
                      type={`block ${button === 'ok' ? 'primary' : 'secondary'}`}
                      onClick={(ev) => onclick(ev, button)}
                    >
                      {_(button)}
                    </Button>
                  </div>
                ))}
              </div>
            )}
      </div>
    </div>
  );
}
