import './UserOption.css';
const UserOptionComponent = (props) => {
  const { data } = props;
  return (
    <div className="wx-0-b7il9h item">
      <div className="wx-0-b7il9h avatar">
        <div className="wx-0-b7il9h user-avatar">
          {data.avatar && (
            <img
              alt={``}
              src={data.avatar}
              className="wx-0-b7il9h user-photo"
            ></img>
          )}
        </div>
      </div>

      <div>
        <div className="wx-0-b7il9h name">{data.label}</div>

        <div className="wx-0-b7il9h mail">{data.email || ''}</div>
      </div>
    </div>
  );
};
export default UserOptionComponent;
