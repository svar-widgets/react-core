import { useContext } from 'react';
import { fieldId } from '../../context';

export function useInputId(id) {
  const v = useContext(fieldId);
  return id || v;
}
