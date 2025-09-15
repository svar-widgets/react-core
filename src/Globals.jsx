import { useMemo, useRef } from 'react';
import { helpers } from './context';
import Globals from './components/Globals.jsx';

export default function Component(props) {
  let { children } = props;
  let api = useRef();

  const l = useMemo(() => {
    return {
      showNotice: (msg) => api.current.showNotice(msg),
      showModal: (msg) => api.current.showModal(msg),
    };
  }, []);

  return (
    <helpers.Provider value={l}>
      <Globals ref={api}>{children}</Globals>
    </helpers.Provider>
  );
}
