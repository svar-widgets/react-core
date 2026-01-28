import { useContext, useState } from 'react';
import { fieldId } from '../../context';
import { uid } from '@svar-ui/lib-dom';

export function useInputId(id) {
  const register = useContext(fieldId);

  const [inputId] = useState(() => id || (register && register()) || uid());

  return inputId;
}
