import { useEffect, useState, useRef, useCallback } from 'react';
import { useContext } from 'react';
import { snippet } from '@svar-ui/lib-react';
import { getListHandlers } from './listnav';
import Dropdown from '../Dropdown.jsx';
import { i18n } from '../../context.js';
import './SuggestDropdown.css';
import { defaultLocale } from './locale.js';

export default function SuggestDropdown({
  items = [],
  children,
  onSelect,
  onReady,
}) {
  const list = useRef();
  const helpers = useRef(getListHandlers());

  const [navIndex, setNavIndex] = useState(null);
  const navIndexRef = useRef(navIndex);

  const _ = (useContext(i18n) || defaultLocale()).getGroup('core');

  const selectItem = (ev) => {
    if (ev) ev.stopPropagation();
    onSelect && onSelect({ id: items[navIndexRef.current]?.id });
  };

  useEffect(() => {
    helpers.current.init(
      list.current,
      items,
      (i) => {
        setNavIndex(i);
        navIndexRef.current = i;
      },
      selectItem,
    );
  }, [items, list.current]);

  useEffect(() => {
    onReady && onReady(helpers.current);
  }, []);

  const onCancel = useCallback(() => {
    helpers.current.navigate(null);
  }, [helpers]);

  if (navIndex === null) return null;

  return (
    <Dropdown onCancel={onCancel}>
      <div
        className="wx-233fr7 wx-list"
        ref={list}
        onClick={selectItem}
        onMouseMove={helpers.current.move}
      >
        {items.length ? (
          items.map((data, index) => (
            <div
              key={data.id}
              className={`wx-233fr7 wx-item ${index === navIndex ? 'wx-focus' : ''}`}
              data-id={data.id}
            >
              {children ? snippet(children, { option: data }) : data.label}
            </div>
          ))
        ) : (
          <div className="wx-233fr7 wx-no-data">{_('No data')}</div>
        )}
      </div>
    </Dropdown>
  );
}
