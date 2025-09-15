import { useState } from 'react';
import { Field, Combo, Button } from '../../src/index';
import { users } from '../data/userlist';
import UserOption from '../custom/UserOption';

const ComboDemo = () => {
  const [value, setValue] = useState('');
  const values = [104, 103, 102, ''];

  function changeValue() {
    setValue(values[(values.indexOf(value) + 1) % values.length]);
  }

  const renderedUsers = [
    {
      id: 103,
      label: 'Ned Stark',
      email: 'winterhell@gmail.com',
      avatar:
        'https://docs.webix.com/usermanager-backend/users/103/avatar/491902305.jpg',
    },
    {
      id: 104,
      label: 'Lord Varys',
      email: 'little.birds@gmail.com',
      avatar:
        'https://docs.webix.com/usermanager-backend/users/104/avatar/005471511.jpg',
    },
  ];

  return (
    <>
      <div className="wx-2RGIOJ demo-box">
        <h3>Combo with a simple list</h3>
        <Field>
          <Combo options={users} value={104} />
        </Field>
        <Field label="Disabled">
          <Combo options={users} disabled value={104} />
        </Field>
        <Field label="Error" error>
          <Combo options={users} error value={104} title="Invalid option" />
        </Field>
      </div>

      <div className="wx-2RGIOJ demo-box">
        <h3>Combo with a dynamic value</h3>

        <Button onClick={changeValue}>Change the value</Button>
        <Field>
          <Combo options={users} value={value} />
        </Field>
      </div>

      <div className="wx-2RGIOJ demo-box">
        <h3>Combo with a side label</h3>
        <Field label="Owner" position="left">
          {({ id }) => <Combo options={users} id={id} value={104} />}
        </Field>
      </div>

      <div className="wx-2RGIOJ demo-box">
        <h3>Combo with a template</h3>
        <Field>
          <Combo options={users} value={104}>
            {({ option }) => <UserOption data={option} />}
          </Combo>
        </Field>
      </div>

      <div className="wx-2RGIOJ demo-box">
        <h3>Combo with a custom "textField"</h3>
        <Field>
          <Combo options={users} value={104} textField="email" />
        </Field>
      </div>

      <div className="wx-2RGIOJ demo-box">
        <h3>Combo without a value</h3>
        <Field>
          <Combo options={users} />
        </Field>
      </div>

      <div className="wx-2RGIOJ demo-box">
        <h3>Combo with a value that's not in options</h3>
        <Field>
          <Combo options={users} value={4} />
        </Field>
      </div>

      <div className="wx-2RGIOJ demo-box">
        <h3>Combo without options</h3>
        <Field>
          <Combo />
        </Field>
      </div>

      <div className="wx-2RGIOJ demo-box">
        <h3>Combo with clear button</h3>
        <Field>
          <Combo options={users} value={104} clear={true} />
        </Field>
      </div>

      <div className="wx-2RGIOJ demo-box">
        <h3>Combo with hidden options</h3>
        <Field>
          <Combo
            textOptions={users}
            options={renderedUsers}
            value={87}
            clearButton
          />
        </Field>
      </div>
    </>
  );
};

export default ComboDemo;
