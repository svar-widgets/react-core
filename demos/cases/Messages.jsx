import { useState, useContext } from 'react';
import { Modal, Portal, Text, TextArea, Button, context } from '../../src/index';

const Messages = () => {
  const { showNotice, showModal } = useContext(context.helpers);

  const [custom1, setCustom1] = useState();
  const [custom2, setCustom2] = useState();

  function notice(type, text) {
    showNotice({
      type,
      expire: -1,
      text: text || 'Button clicked',
    });
  }

  async function confirm() {
    try {
      await showModal({
        title: 'Confirm',
        message: 'Will we do it ?',
      });
    } catch (er) {
      console.log('confirm was rejected', er);
    }
  }

  function alert() {
    showModal({
      message: 'Something happens',
      buttons: ['ok'],
    });
  }

  function hideAll() {
    setCustom1(false);
    setCustom2(false);
  }

  return (
    <>
      <div className="wx-Je510u demo-box">
        <h3>Notice</h3>
        <Button type="primary" onClick={() => notice('')}>
          Show Notice
        </Button>
        <Button onClick={() => notice('info')}>Show Info</Button>
        <Button onClick={() => notice('warning')}>Show Warning</Button>
        <Button onClick={() => notice('success')}>Show Success</Button>
        <Button onClick={() => notice('danger')}>Show Danger</Button>
        <Button
          onClick={() =>
            notice('info', 'very long text goes here to show word wrap')
          }
        >
          Show Long message
        </Button>
      </div>

      <div className="wx-Je510u demo-box">
        <h3>Confirm / Alert</h3>
        <Button type="primary" onClick={confirm}>
          Show Confirm
        </Button>
        <Button onClick={alert}>Show Alert</Button>
      </div>

      <div className="wx-Je510u demo-box">
        <h3>Custom dialog</h3>
        <Button type="primary" onClick={() => setCustom1(!custom1)}>
          Show Prompt
        </Button>
        {custom1 && (
          <Portal>
            <Modal title="Custom Prompt" onConfirm={hideAll} onCancel={hideAll}>
              <Text select={true} focus={true} value="Some" />
            </Modal>
          </Portal>
        )}

        <Button onClick={() => setCustom2(!custom2)}>Show Dialog</Button>
        {custom2 && (
          <Modal
            footer={
              <div style={{ marginTop: '20px' }}>
                <Button onClick={hideAll}>Yes</Button>
                <Button onClick={hideAll}>No</Button>
                <Button onClick={hideAll}>Maybe</Button>
              </div>
            }
          >
            Some text here
            <TextArea placeholder="Some text" />
          </Modal>
        )}
      </div>
    </>
  );
};

export default Messages;
