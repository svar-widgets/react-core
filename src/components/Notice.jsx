import './Notice.css';

export default function Notice({ notice = {} }) {
  function onRemove() {
    if (notice.remove) notice.remove();
  }

  return (
    <div
      className={`wx-11sNg5 wx-notice wx-${notice.type ? notice.type : ''}`}
      role="status"
      aria-live="polite"
    >
      <div className="wx-11sNg5 wx-text">{notice.text}</div>
      <div className="wx-11sNg5 wx-button">
        <i className="wx-11sNg5 wxi-close" onClick={onRemove} />
      </div>
    </div>
  );
}
