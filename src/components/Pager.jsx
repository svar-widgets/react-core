import { useContext } from 'react';
import { useWritableProp } from '@svar-ui/lib-react';
import { i18n } from '../context.js';
import './Pager.css';
import { defaultLocale } from './helpers/locale.js';

const Pager = ({
  total = 0,
  pageSize: initialPageSize = 20,
  value: initialValue = 1,
  onChange,
}) => {
  const [pageSize, setPageSize] = useWritableProp(initialPageSize);
  const [value, setValue] = useWritableProp(initialValue);

  const _ = (useContext(i18n) || defaultLocale()).getGroup('core');

  const pageCount = Math.ceil(total / pageSize);
  const from = (value - 1) * pageSize;
  const to = Math.min(value * pageSize, total);

  const setInnerValue = (v, final) => {
    if (Number.isNaN(v)) return;

    if (!final) setValue(v);
    v = Math.max(1, Math.min(v, pageCount));
    if (final) setValue(v);

    if (v === value) return;
    setTimeout(() => {
      onChange &&
        onChange({
          value: v,
          from: (v - 1) * pageSize,
          to: Math.min(v * pageSize, total),
          pageSize: pageSize,
        });
    });
  };

  function setActivePage(id) {
    switch (id) {
      case 'first':
        setInnerValue(1);
        break;

      case 'prev':
        setInnerValue(value - 1);
        break;

      case 'next':
        setInnerValue(value + 1);
        break;

      case 'last':
        setInnerValue(pageCount);
        break;

      default:
        break;
    }
  }

  const onPageSizeInput = (e) => {
    const newValue = e.target.value * 1;
    if (Number.isNaN(newValue)) {
      return;
    }

    setPageSize(newValue);
    onChange && onChange({ value, from, to, pageSize: newValue });
  };

  return (
    <div className="wx-35Np0p wx-pager">
      <div className="wx-35Np0p wx-left">
        <span>{_('Rows per page')}: </span>
        <input
          type="number"
          min={1}
          className="wx-35Np0p wx-input"
          value={pageSize}
          onChange={onPageSizeInput}
        />
      </div>

      <div className="wx-35Np0p wx-center">
        <i
          className={
            'wx-35Np0p wx-icon wxi-angle-dbl-left' +
            (value === 1 ? ' wx-disabled' : '')
          }
          onClick={() => setActivePage('first')}
        ></i>
        <i
          className={
            'wx-35Np0p wx-icon wxi-angle-left' +
            (value === 1 ? ' wx-disabled' : '')
          }
          onClick={() => setActivePage('prev')}
        ></i>
        <input
          type="text"
          value={value}
          className="wx-35Np0p wx-input"
          onChange={(e) => setInnerValue(e.target.value * 1)}
          onBlur={(e) => setInnerValue(e.target.value * 1, true)}
        />
        <i
          className={
            'wx-35Np0p wx-icon wxi-angle-right' +
            (value === pageCount ? ' wx-disabled' : '')
          }
          onClick={() => setActivePage('next')}
        ></i>
        <i
          className={
            'wx-35Np0p wx-icon wxi-angle-dbl-right' +
            (value === pageCount ? ' wx-disabled' : '')
          }
          onClick={() => setActivePage('last')}
        ></i>
      </div>

      <div className="wx-35Np0p wx-right">
        {_('Total pages')}: {pageCount}
      </div>
    </div>
  );
};

export default Pager;
