import { useState, useEffect, useMemo, useRef } from 'react';
import { calculatePosition, getAbsParent } from '@svar-ui/lib-dom';
import Portal from './Portal.jsx';
import './Tooltip.css';

function getSide(at) {
  if (at === 'point') return 'point';
  const split = at.split('-');
  return split[0];
}

function getAlign(at) {
  if (at === 'point') return 'center';
  const split = at.split('-');
  return split.length === 1 ? 'center' : split[1];
}

function readCSSPropertyInt(node, property, defaultValue) {
  const value = getComputedStyle(node).getPropertyValue(property);
  return parseInt(value) || defaultValue;
}

function Tooltip(props) {
  const {
    at = 'top-center',
    arrow = false,
    touch = false,
    overflow = false,
    delay = 300,
    content: Content = null,
    children,
    css = '',
  } = props;

  function defaultResolver(element) {
    if (overflow && element.scrollWidth <= element.clientWidth) return null;
    const text = element.getAttribute?.('data-tooltip-text');
    return text ? text : null;
  }
  const resolver = props.resolver || defaultResolver;

  const side = useMemo(() => getSide(at), [at]);
  const align = useMemo(() => getAlign(at), [at]);
  const resolvedAt = useMemo(() => {
    if (at === 'point') return 'point';
    return `${side}-${align}`;
  }, [at, side, align]);

  const areaNode = useRef(null);
  const isHovered = useRef(false);
  const [tooltipNode, setTooltipNode] = useState(null);
  const [match, setMatch] = useState(null); // { result, anchor, mouseX, mouseY }
  const [position, setPosition] = useState(null); // { x, y, z, side, arrowOffset }
  const [firstAnchor, setFirstAnchor] = useState(false);

  // keep a fresh copy of match for long-lived handlers (avoid stale closures)
  const matchRef = useRef(match);
  useEffect(() => {
    matchRef.current = match;
  }, [match]);

  // render only when there is displayable content
  const shouldRender = useMemo(
    () => match !== null && (!!match.result || Content != null),
    [match, Content],
  );

  function getPointOffset() {
    return readCSSPropertyInt(tooltipNode, '--wx-tooltip-point-offset', 14);
  }

  function getArrowSize() {
    return readCSSPropertyInt(tooltipNode, '--wx-tooltip-arrow-size', 6);
  }

  // Compute the CSS arrow offset relative to the anchor
  function getArrowOffset(arrowSize, result, rect, body) {
    if (side === 'point') return '50%';
    const bodyRect = body?.getBoundingClientRect() ?? { top: 0, left: 0 };
    const h = arrowSize / 2;

    let anchorPoint;
    let tooltipEdge;
    if (side === 'top' || side === 'bottom') {
      tooltipEdge = result.x - (body?.scrollLeft ?? 0) + bodyRect.left;
      if (align === 'start') anchorPoint = rect.left + arrowSize + h;
      else if (align === 'end') anchorPoint = rect.right - arrowSize - h;
      else anchorPoint = rect.left + rect.width / 2;
    } else {
      tooltipEdge = result.y - (body?.scrollTop ?? 0) + bodyRect.top;
      if (align === 'start') anchorPoint = rect.top + arrowSize + h;
      else if (align === 'end') anchorPoint = rect.bottom - arrowSize - h;
      else anchorPoint = rect.top + rect.height / 2;
    }

    return `${anchorPoint - tooltipEdge}px`;
  }

  // Positioning of the tooltip
  useEffect(() => {
    if (!tooltipNode || !match) return void setPosition(null);

    // Offset from the mouse cursor when at="point"
    const offset = at === 'point' ? getPointOffset() : 0;

    // Calculate the position of the tooltip
    const result = calculatePosition(
      tooltipNode,
      match.anchor,
      resolvedAt,
      match.mouseX + offset,
      match.mouseY + offset,
    );

    if (result === null) return void setPosition(null);

    // Detect if calculatePosition flipped to the opposite side
    const anchorRect = match.anchor.getBoundingClientRect();
    const body = getAbsParent(tooltipNode);
    const realSide = getSide(result.at);

    // Add gap for the arrow if needed, using realSide for direction
    let arrowOffset = '50%';
    if (result && arrow && at !== 'point') {
      const arrowSize = getArrowSize();
      if (realSide === 'top') result.y -= arrowSize;
      else if (realSide === 'bottom') result.y += arrowSize;
      else if (realSide === 'left') result.x -= arrowSize;
      else if (realSide === 'right') result.x += arrowSize;
      arrowOffset = getArrowOffset(arrowSize, result, anchorRect, body);
    }

    // Submit the result to the position state
    const minZ = readCSSPropertyInt(tooltipNode, '--wx-tooltip-z-index', 1002);

    setPosition({
      x: Math.round(result.x),
      y: Math.round(result.y),
      z: Math.max(result.z, minZ),
      side: realSide,
      arrowOffset,
    });
  }, [tooltipNode, match, at, arrow, side, align, resolvedAt]);

  function walk(node, ev) {
    if (!isHovered.current) return null;

    // Disable tooltip on touch devices if prop touch == false
    const touchD =
      'ontouchstart' in window || window.navigator.maxTouchPoints > 0;
    if (touchD && !touch) return null;

    for (; node && node !== areaNode.current; node = node.parentNode) {
      if (node.nodeType !== window.Node.ELEMENT_NODE) continue;

      const result = resolver(node, ev);
      if (result == null) continue;

      return {
        result,
        anchor: node,
        mouseX: ev.clientX,
        mouseY: ev.clientY,
      };
    }

    return null;
  }

  const timer = useRef(undefined);
  const hiding = useRef(false);
  function debounce(fn) {
    clearTimeout(timer.current);
    timer.current = setTimeout(fn, delay);
  }

  function onMouseMove(ev) {
    // (1) Ignore if the most closely hovered tooltip area is not this one (in case of nested tooltips)
    if (ev.target.closest('.wx-tooltip-area') !== areaNode.current) {
      isHovered.current = false;
      setMatch(null);
      clearTimeout(timer.current);
      return;
    }
    isHovered.current = true;

    const match = matchRef.current;

    // (2) If the cursor is still within the anchor element
    if (match?.anchor?.contains(ev.target)) {
      clearTimeout(timer.current);
      hiding.current = false;
      const result = resolver(ev.target, ev);
      if (result != null) {
        setMatch({
          result,
          anchor: ev.target,
          mouseX: ev.clientX,
          mouseY: ev.clientY,
        });
        return;
      }
    }

    // (3) Cursor left the anchor - walk for a new anchor
    if (match !== null) {
      const result = walk(ev.target, ev);
      if (!result) {
        if (!hiding.current) {
          hiding.current = true;
          debounce(() => {
            hiding.current = false;
            setMatch(null);
          });
        }
      } else {
        clearTimeout(timer.current);
        hiding.current = false;
        setMatch(result);
        setFirstAnchor(false);
      }
    } else {
      debounce(() => {
        setMatch(walk(ev.target, ev));
        setFirstAnchor(true);
      });
    }
  }

  function onMouseLeave() {
    debounce(() => {
      hiding.current = false;
      isHovered.current = false;
      setMatch(null);
    });
  }

  useEffect(() => {
    function onscroll() {
      clearTimeout(timer.current);
      setMatch(null);
    }

    window.addEventListener('scroll', onscroll, {
      capture: true,
      passive: true,
    });

    return () => {
      clearTimeout(timer.current);
      window.removeEventListener('scroll', onscroll, { capture: true });
    };
  }, []);

  const tooltipClassName = [
    'wx-tooltip',
    css,
    arrow && position?.side === 'top' ? 'wx-arrow-top' : '',
    arrow && position?.side === 'bottom' ? 'wx-arrow-bottom' : '',
    arrow && position?.side === 'left' ? 'wx-arrow-left' : '',
    arrow && position?.side === 'right' ? 'wx-arrow-right' : '',
    !firstAnchor ? 'wx-tooltip-transition' : '',
    'wx-aab5ZNfz',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={areaNode}
      className="wx-tooltip-area wx-aab5ZNfz"
      role="none"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {shouldRender ? (
        <Portal>
          <div
            className={tooltipClassName}
            role="tooltip"
            ref={setTooltipNode}
            style={{
              translate: `${position?.x ?? 0}px ${position?.y ?? 0}px`,
              zIndex: position?.z ?? 20,
              visibility: !position ? 'hidden' : undefined,
              '--wx-arrow-offset': position?.arrowOffset ?? '50%',
            }}
          >
            <div className="wx-tooltip-wrapper wx-aab5ZNfz">
              <div className="wx-tooltip-inner wx-aab5ZNfz">
                {typeof match.result === 'string' ? (
                  Content ? (
                    <Content data={match.result} />
                  ) : (
                    <div className="wx-tooltip-text wx-aab5ZNfz">
                      {match.result}
                    </div>
                  )
                ) : Content ? (
                  <Content {...match.result} />
                ) : (
                  <div className="wx-tooltip-text wx-aab5ZNfz">
                    {match.result?.data}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Portal>
      ) : null}

      {children}
    </div>
  );
}

export default Tooltip;
