import { Calendar, Locale } from '../../src/index';
import { de, cn } from '@svar-ui/core-locales';
import './Calendar.css';

const markLine = (v) =>
  v >= new Date(2022, 2, 13) && v <= new Date(2022, 2, 19) ? 'wx-inrange' : '';

const markLine2 = (v) =>
  v >= new Date(2022, 2, 8) && v <= new Date(2022, 2, 29) ? 'wx-inrange' : '';

export default function CalendarDemo() {
  return (
    <>
      <div className="wx-2V1EF9 demo-box" style={{ width: '900px' }}>
        <h3>Calendar</h3>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Calendar value={new Date(2022, 2, 18)} />
          <Calendar current={new Date(2022, 2, 18)} markers={markLine} />
          <Calendar current={new Date(2022, 2, 18)} markers={markLine2} />
        </div>
      </div>

      <div className="wx-2V1EF9 demo-box" style={{ width: '900px' }}>
        <h3>Calendar with Locale and Format</h3>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Locale words={de}>
            <Calendar value={new Date(2022, 2, 18)} />
          </Locale>
          <Locale words={cn}>
            <Calendar value={new Date(2022, 2, 18)} />
          </Locale>
          <Locale
            words={{
              ...cn,
              formats: {
                ...cn.formats,
                monthYearFormat: '%Y年%F',
                yearFormat: '%Y年',
              },
            }}
          >
            <Calendar value={new Date(2022, 2, 18)} />
          </Locale>
        </div>
      </div>

      <div className="wx-2V1EF9 demo-box" style={{ width: '300px' }}>
        <h3>Calendar without buttons</h3>
        <Calendar value={new Date(2022, 2, 18)} buttons={false} />
      </div>

      <div
        className="wx-2V1EF9 demo-box"
        style={{ width: '300px', marginTop: '20px' }}
      >
        <h3>Calendar with Today button only</h3>
        <Calendar value={new Date(2022, 2, 18)} buttons={['today']} />
      </div>
    </>
  );
}
