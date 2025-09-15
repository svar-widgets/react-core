import Notice from './Notice.jsx';
import './Notices.css';

export default function Notices({ data = [] }) {
  return (
    <div className="wx-3nwoO9 wx-notices">
      {data.map((notice) => (
        <Notice key={notice.id} notice={notice} />
      ))}
    </div>
  );
}
