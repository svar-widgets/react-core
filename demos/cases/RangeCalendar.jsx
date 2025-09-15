import { RangeCalendar } from '../../src/index';

const start1 = new Date(2022, 2, 18);
const start2 = new Date(2022, 1, 18);
const end = new Date(2022, 2, 22);

export default function App() {
  return (
    <>
      <div className="wx-2sNjaP demo-box" style={{ width: 300 }}>
        <h3>Range Calendar</h3>
        <RangeCalendar start={start1} end={end} />

        <RangeCalendar start={start2} end={end} />
      </div>

      <div className="wx-2sNjaP demo-box" style={{ width: 300 }}>
        <h3>Range Calendar without buttons</h3>
        <RangeCalendar buttons={false} />
      </div>

      <div className="wx-2sNjaP demo-box" style={{ width: 160 }}>
        <h3>Range Calendar with Done button</h3>
        <RangeCalendar buttons={['done', 'clear', 'today']} />
      </div>

      <div className="wx-2sNjaP demo-box" style={{ width: 160 }}>
        <h3>Single month</h3>
        <RangeCalendar months={1} />
      </div>
    </>
  );
}
