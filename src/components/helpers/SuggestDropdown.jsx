import { useEffect, useState, useRef, useCallback, useMemo, useLayoutEffect, memo } from 'react';
import { useContext } from 'react';
import { snippet } from '@svar-ui/lib-react';
import { getListHandlers } from './listnav';
import Dropdown from '../Dropdown.jsx';
import Checkbox from '../Checkbox.jsx';
import { i18n } from '../../context.js';
import './SuggestDropdown.css';
import { defaultLocale } from './locale.js';

const overscan = 10;

const ItemContent = memo(function ItemContent({ data, checkboxes, children, value }) {
  return (
    <>
      {checkboxes && (
        <Checkbox
          id={data.id}
          style = {{marginRight: "8px",pointerEvents: "none"}}
          value={value && value.includes(data.id)}
        />
      )}
      {children ? snippet(children, { option: data }) : data.label}
    </>
  );
});

function ListContent({
  visibleItems,
  visibleRange,
  navIndex,
  checkboxes,
  children,
  value,
  measureRefCallback,
}) {
  return visibleItems.map((data, visibleIndex) => {
    const index = visibleRange.start + visibleIndex;
    return <div
      key={data.id}
      ref={visibleIndex === 0 ? measureRefCallback : undefined}
      className={`wx-233fr7 wx-item ${(index) === navIndex ? 'wx-focus' : ''}`}
      data-id={data.id}
    >
      <ItemContent
        data={data}
        checkboxes={checkboxes}
        children={children}
        value={value}
      />
    </div>

  });
}

export default function SuggestDropdown({
  items = [],
  children,
  onSelect,
  onReady,
  virtualized = false,
  checkboxes,
  multiselect,
  value,
  ...rest
}) {
  const list = useRef();
  const initialScrolled = useRef(false);
  const helpers = useRef(getListHandlers());

  const [navIndex, setNavIndex] = useState(null);
  const navIndexRef = useRef(navIndex);

  const [scrollTop, setScrollTop] = useState(0);
  const [itemHeight, setItemHeight] = useState(24);
  const isItemHeightInitialized = useRef(false);

  const _ = (useContext(i18n) || defaultLocale()).getGroup('core');

  // Keep refs current for use inside callbacks
  const itemsRef = useRef(items);
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  const valueRef = useRef(value);
  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  const itemHeightRef = useRef(0);
  useEffect(() => {
    itemHeightRef.current = itemHeight;
  }, [itemHeight]);

  const selectItem = useCallback((ev) => {
    if (ev) ev.stopPropagation();
    const currentItems = itemsRef.current;
    const currentValue = valueRef.current;
    const currentNavIndex = navIndexRef.current;
    let nextValue;
    const nextId = currentItems[currentNavIndex]?.id;
    if (multiselect) {
      if (currentValue && currentValue.includes(nextId)) {
        nextValue = currentValue.filter(i => i !== nextId);
      } else {
        nextValue = [...(currentValue || []), nextId];
      }
    } else {
      nextValue = nextId;
    }
    onSelect && onSelect({ id: nextValue });
  }, [multiselect, onSelect]);

  const selectItemRef = useRef(selectItem);
  useEffect(() => {
    selectItemRef.current = selectItem;
  }, [selectItem]);

  const scrollToVirtualized = useCallback((idx) => {
    if (list.current) {
      let newScrollTop = idx * itemHeightRef.current - list.current.clientHeight + itemHeightRef.current;
      setScrollTop(newScrollTop);
      list.current.scrollTop = newScrollTop;
    }
  }, [itemHeightRef.current]);

  const listRefCallback = useCallback(
    (el) => {
      list.current = el;
      if (virtualized) {
        if (el && !initialScrolled.current && navIndexRef.current !== null) {
          requestAnimationFrame(() => {
            if (list.current) {
              scrollToVirtualized(navIndexRef.current);
              initialScrolled.current = true;
            }
          });
        }
        if (!el) {
          initialScrolled.current = false;
        }
      }
    },
    [scrollToVirtualized]
  );

  const measureRefCallback = useCallback((node) => {
    if (!node) return;
    if (isItemHeightInitialized.current) return;
  
    const height = node.getBoundingClientRect().height;
  
    if (height) {
      setItemHeight(height);
      itemHeightRef.current = height;
      isItemHeightInitialized.current = true;
    }
  }, []);
  
  useEffect(() => {
    helpers.current.init(
      list.current,
      items,
      (i) => {
        setNavIndex(i);
        navIndexRef.current = i;
      },
      (ev) => selectItemRef.current(ev),
      virtualized,
    );
  }, [items, list.current, virtualized]);

  useEffect(() => {
    const navigateVirtualized = (dir, ev) => {
      helpers.current.navigate(dir, ev);
      scrollToVirtualized(navIndexRef.current);
    };

    const keydownVirtualized = (ev, dir) => {
      const currentNavIndex = navIndexRef.current;
      const currentItems = itemsRef.current;
      if (
        currentNavIndex !== 0 &&
        currentNavIndex !== currentItems.length - 1 &&
        (ev.key === 'ArrowDown' || ev.key === 'ArrowUp')
      )
        ev.preventDefault();
      helpers.current.keydown(ev, dir);

      if (list.current) {
        const isTargetVisibleTop = list.current.scrollTop <= navIndexRef.current * itemHeightRef.current;
        const isTargetVisibleBottom =
          list.current.scrollTop + list.current.clientHeight >=
          navIndexRef.current * itemHeightRef.current + itemHeightRef.current;

        if (!isTargetVisibleTop) {
          list.current.scrollTop = navIndexRef.current * itemHeightRef.current;
          setScrollTop(list.current.scrollTop);
        } else if (!isTargetVisibleBottom) {
          scrollToVirtualized(navIndexRef.current);
        }
      }
    };

    onReady &&
      onReady({
        navigate: virtualized ? navigateVirtualized : helpers.current.navigate,
        keydown: virtualized ? keydownVirtualized : helpers.current.keydown,
        move: helpers.current.move,
      });
  }, []);

  const dropdownKey = useRef(0);
  const prevItemsRef = useRef(items);
  if (prevItemsRef.current !== items) {
    prevItemsRef.current = items;
    dropdownKey.current += 1;
  }

  const onCancel = useCallback(() => {
    helpers.current.navigate(null);
  }, [helpers]);

  const handleScroll = useCallback((ev) => {
    if (virtualized) {
      setScrollTop(ev.target.scrollTop);
    }
  }, [virtualized]);

  const displayedItemsCount = useMemo(
    () => Math.ceil((list.current?.clientHeight || 0) / itemHeight),
    [itemHeight, scrollTop],
  );

  const visibleRange = useMemo(() => {
    if (!virtualized) return { start: 0, end: items.length };
    if (!items.length) return { start: 0, end: 0 };

    const start = Math.floor(scrollTop / itemHeight);
    const end = start + displayedItemsCount;

    return {
      start: Math.max(0, start - overscan),
      end: Math.min(items.length, end + overscan),
    };
  }, [virtualized, items, scrollTop, itemHeight, displayedItemsCount]);

  const visibleItems = useMemo(() => {
    if (!virtualized) return items;
    const { start, end } = visibleRange;
    return items.slice(start, end).map((item) => ({
      ...item,
    }));
  }, [virtualized, items, visibleRange]);

  const offsetTop = visibleRange.start * itemHeight;
  const totalHeight = items.length * itemHeight;

  useEffect(() => {
    if (navIndex === null) {
      initialScrolled.current = false;
    }
  }, [navIndex]);

  if (navIndex === null) return null;

  return (
    <Dropdown key={dropdownKey.current} onCancel={onCancel} {...rest}>
      <div
        className="wx-233fr7 wx-list"
        ref={listRefCallback}
        onClick={selectItem}
        onMouseMove={helpers.current.move}
        onScroll={handleScroll}
      >
        {items.length ? (
          virtualized ? (
            <div
              className="wx-233fr7 wx-list-wrapper"
              style={{ height: `${totalHeight}px` }}
            >
              <div
                className="wx-233fr7 wx-list-content"
                style={{ transform: `translateY(${offsetTop}px)` }}
              >
                <ListContent
                  visibleRange={visibleRange}
                  visibleItems={visibleItems}
                  navIndex={navIndex}
                  measureRefCallback={measureRefCallback}
                  checkboxes={checkboxes}
                  children={children}
                  value={value}
                />
              </div>
            </div>
          ) : (
            <ListContent
              visibleRange={visibleRange}
              visibleItems={visibleItems}
              navIndex={navIndex}
              measureRefCallback={measureRefCallback}
              checkboxes={checkboxes}
              children={children}
              value={value}
            />
          )
        ) : (
          <div className="wx-233fr7 wx-no-data">{_('No data')}</div>
        )}
      </div>
    </Dropdown>
  );
}

