import { useContext, useState } from 'react';
import { fieldId } from '../../context';
import { uid } from '@svar-ui/lib-dom';

export function useInputId(id) {
  const contextId = useContext(fieldId);

  const [inputId] = useState(() => id || contextId || uid());

  return inputId;
}
