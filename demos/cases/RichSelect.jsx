import { Field } from '../../src/index.js';
import { RichSelect } from '../../src/index.js';
import { users } from '../data/userlist.js';

import UserOption from '../custom/UserOption.jsx';

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

export default function RichSelectExamples() {
  return (
    <>
      <div className="wx-1Ca119 demo-box">
        <h3>RichSelect with a simple list</h3>
        <Field>
          <RichSelect options={users} value={104} />
        </Field>
      </div>

      <div className="wx-1Ca119 demo-box">
        <h3>RichSelect with a side label</h3>
        <Field label="Owner" position="left">
          {({ id }) => <RichSelect options={users} id={id} value={104} />}
        </Field>
        <Field label="Disabled" position="left">
          {({ id }) => (
            <RichSelect options={users} id={id} disabled value={104} />
          )}
        </Field>
        <Field label="Error" position="left" error>
          {({ id }) => (
            <RichSelect
              options={users}
              id={id}
              error
              value={104}
              title="Invalid option"
            />
          )}
        </Field>
      </div>

      <div className="wx-1Ca119 demo-box">
        <h3>RichSelect overflow</h3>
        <Field width="150px">
          <RichSelect options={users} value={105} />
          <br />
          <RichSelect options={users} value={105}>
            {(option) => option.label}
          </RichSelect>
        </Field>
      </div>

      <div className="wx-1Ca119 demo-box">
        <h3>RichSelect with a template</h3>
        <Field>
          <RichSelect options={users} value={104}>
            {(option) => <UserOption data={option} />}
          </RichSelect>
        </Field>
      </div>

      <div className="wx-1Ca119 demo-box">
        <h3>RichSelect with a custom "textField"</h3>
        <Field>
          <RichSelect options={users} value={104} textField="email" />
        </Field>
      </div>

      <div className="wx-1Ca119 demo-box">
        <h3>RichSelect without a value</h3>
        <Field>
          <RichSelect options={users} />
        </Field>
      </div>

      <div className="wx-1Ca119 demo-box">
        <h3>RichSelect without options</h3>
        <Field>
          <RichSelect />
        </Field>
      </div>

      <div className="wx-1Ca119 demo-box">
        <h3>RichSelect with clear button</h3>
        <Field>
          <RichSelect options={users} value={104} clear />
        </Field>
      </div>

      <div className="wx-1Ca119 demo-box">
        <h3>RichSelect with hidden options</h3>
        <Field>
          <RichSelect textOptions={users} options={renderedUsers} value={87} />
        </Field>
      </div>
    </>
  );
}
