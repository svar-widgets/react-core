import { useCallback, useRef } from 'react';
import { uid } from '@svar-ui/lib-dom';
import { fieldId } from "../context";
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
  const firstInputId = useRef(null);
  const registerInput = useCallback(() => {
    if (firstInputId.current) return firstInputId.current;
    const id = uid();
    firstInputId.current = id;
    return id;
  }, []);

  return (
    <fieldId.Provider value={registerInput}>
      <div
        className={`wx-2oVUvC wx-field wx-${position} ${css} ${error ? 'wx-error' : ''} ${required ? 'wx-required' : ''}`.trim()}
      >
        {label && (
          <label className="wx-2oVUvC wx-label" htmlFor={firstInputId.current}>
            {label}
          </label>
        )}
        <div className={`wx-2oVUvC wx-field-control wx-${type}`}>
          {children}
        </div>
      </div>
    </fieldId.Provider>
  );
}
