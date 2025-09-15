import { useMemo } from 'react';
import { uid } from '@svar-ui/lib-dom';
import { snippet } from '@svar-ui/lib-react';
import './Field.css';

export default function Field({
  label = '',
  position = '',
  css = '',
  error = false,
  type = '',
  required = false,
  children,
}) {
  const id = useMemo(() => uid(), []);

  return (
    <div
      className={`wx-2oVUvC wx-field wx-${position} ${css} ${error ? 'wx-error' : ''} ${required ? 'wx-required' : ''}`.trim()}
    >
      {label && (
        <label className="wx-2oVUvC wx-label" htmlFor={id}>
          {label}
        </label>
      )}
      <div className={`wx-2oVUvC wx-field-control wx-${type}`}>
        {snippet(children, { id })}
      </div>
    </div>
  );
}
