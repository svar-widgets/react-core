import { useState } from 'react';
import { Pager } from '../../src/index';

export default function Demo() {
  const [pageSize, setPageSize] = useState(10);
  const [value, setValue] = useState(2);

  return (
    <div className="wx-172WR8 demo-box">
      <h3>
        100 rows (active = {value}, page size = {pageSize})
      </h3>
      <Pager
        value={value}
        onChange={(e) => {
          setValue(e.value);
          setPageSize(e.pageSize);
        }}
        total={100}
      />
    </div>
  );
}
