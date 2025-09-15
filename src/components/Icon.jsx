import './Icon.css';

export default function Icon({ css = '', title = '', children, onClick }) {
  if (children) {
    return (
      <i
        title={title}
        role="img"
        className={`wx-mdnST1 wx-icon ${css}`}
        onClick={onClick}
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
      />
    );
  }
}
