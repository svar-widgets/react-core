import { useState, useImperativeHandle, forwardRef } from 'react';
import Notices from './Notices.jsx';
import Modal from './Modal.jsx';

import { uid } from '@svar-ui/lib-dom';

function Globals({ children }, apiRef) {
  const [modal, setModal] = useState(null);
  const [notices, setNotices] = useState([]);

  useImperativeHandle(
    apiRef,
    () => ({
      showModal: (msg) => {
        const modalObj = { ...msg };
        setModal(modalObj);
        return new Promise((res, rej) => {
          modalObj.resolve = (v) => {
            setModal(null);
            res(v);
          };
          modalObj.reject = (v) => {
            setModal(null);
            rej(v);
          };
        });
      },
      showNotice: (msg) => {
        msg = { ...msg };
        msg.id = msg.id || uid();
        msg.remove = () =>
          setNotices((prev) => prev.filter((a) => a.id !== msg.id));

        if (msg.expire != -1) {
          setTimeout(msg.remove, msg.expire || 5100);
        }
        setNotices((prev) => [...prev, msg]);
      },
    }),
    [],
  );

  return (
    <>
      {children}
      {modal && (
        <Modal
          title={modal.title}
          buttons={modal.buttons}
          onConfirm={modal.resolve}
          onCancel={modal.reject}
        >
          {modal.message}
        </Modal>
      )}
      <Notices data={notices} />
    </>
  );
}

const GlobalsComponentWithRef = forwardRef(Globals);
export default GlobalsComponentWithRef;
