import './Button.css';

export default function Button({ onClick, children }) {
  return (
    <button className="wx-3s8W4d wx-button" onClick={onClick}>
      {children}
    </button>
  );
}
