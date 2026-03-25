import { useMemo } from 'react';
import { uid } from '@svar-ui/lib-dom';
import { fieldId } from "../context";
import './Field.css';

export default function Field({
  label = '',
  position = '',
  error = false,
  type = '',
  required = false,
  id,
  children,
  width = "",
}) {
  const inputId = useMemo(() => (id === undefined ? uid() : id), [id]);
  const style = {...(width && { width })};

  return (
    <fieldId.Provider value={inputId}>
      <div
        style={style}
        className={`wx-2oVUvC wx-field wx-${position} ${error ? 'wx-error' : ''} ${required ? 'wx-required' : ''}`.trim()}
      >
        {label && (
          inputId
            ? <label className="wx-2oVUvC wx-label" htmlFor={inputId}>{label}</label>
            : <div className="wx-2oVUvC wx-label">{label}</div>
        )}
        <div className={`wx-2oVUvC wx-field-control wx-${type}`}>
          {children}
        </div>
      </div>
    </fieldId.Provider>
  );
}
