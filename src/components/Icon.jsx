import './Icon.css';

export default function Icon({ css = '', title = '', tooltip, children, onClick }) {
  if (children) {
    return (
      <i
        title={title}
        role="img"
        className={`wx-mdnST1 wx-icon ${css}`}
        onClick={onClick}
        data-tooltip-text={tooltip}
      >
        {children}
      </i>
    );
  } else {
    return (
      <i
        title={title}
        className={`wx-mdnST1 wx-icon ${css}`}
        onClick={onClick}
        data-tooltip-text={tooltip}
      />
    );
  }
}
