import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import Button from './Button.jsx';
import { sliderMove } from './helpers/sliderMove.js';
import colorTransformator from './helpers/colorTransformator.js';
import { parseColor } from './helpers/colorValidation.js';
import { i18n } from '../context.js';
import { useWritableProp } from '@svar-ui/lib-react';
import './ColorBoard.css';
import { defaultLocale } from './helpers/locale.js';

const BLOCK = 'Block';
const LINE = 'Line';

function ColorBoard({
  value: propertyValue = '#65D3B3',
  button = false,
  onChange,
}) {
  const _ = (useContext(i18n) || defaultLocale()).getGroup('core');

  const blockRef = useRef(null);
  const colorLineRef = useRef(null);

  const [blockTop, setBlockTop] = useState();
  const [blockLeft, setBlockLeft] = useState();
  const [hueColor, setHueColor] = useState();
  const [lineLeft, setLineLeft] = useState();

  const [value, setValue] = useWritableProp(propertyValue);

  const color = useMemo(() => parseColor(value) || '#65D3B3', [value]);
  const blockColor = useMemo(
    () => colorTransformator.hvsToHex(hueColor || 0, 1, 1),
    [hueColor],
  );

  const moveBlockSlider = useCallback(
    (dx, dy) => {
      const { width, height } = blockRef.current.getBoundingClientRect();

      if (dy < 0) dy = 0;
      else if (dy > height) dy = height;

      if (dx < 0) dx = 0;
      else if (dx > width) dx = width;

      setBlockTop(dy);
      setBlockLeft(dx);

      // Call setCurrentColor
      let _sValue, _vValue;

      const [, ,] = colorTransformator.hexToHvs(color);
      const pxX = width / 100;
      const pxY = height / 100;

      _sValue = Math.ceil(dx / pxX) / 100;
      _vValue = Math.ceil(Math.abs(dy / pxY - 100)) / 100;

      const newValue = colorTransformator.hvsToHex(
        hueColor || 0,
        _sValue,
        _vValue,
      );
      setValue(newValue);
      onChange && onChange({ value: newValue, input: true });
    },
    [color, hueColor, onChange],
  );

  const moveLineSlider = useCallback(
    (dx) => {
      const width = colorLineRef.current.getBoundingClientRect().width;

      if (dx < 0) dx = 0;
      else if (dx > width) dx = width;

      const h = Math.round((dx * 359) / width);
      const newHue = Math.max(Math.min(h, 359), 0);
      setHueColor(newHue);
      setLineLeft(dx);

      // Call setCurrentColor with lineSliderMove=true
      let _sValue, _vValue;
      [, _sValue, _vValue] = colorTransformator.hexToHvs(color);
      const newValue = colorTransformator.hvsToHex(newHue, _sValue, _vValue);
      setValue(newValue);
      onChange && onChange({ value: newValue, input: true });
    },
    [color, onChange],
  );

  const setSlidersPosition = useCallback(() => {
    const [h, s, v] = colorTransformator.hexToHvs(color);
    setHueColor(h);

    if (blockRef.current) {
      const { width, height } = blockRef.current.getBoundingClientRect();

      if (colorLineRef.current) {
        setLineLeft(
          (h * colorLineRef.current.getBoundingClientRect().width) / 359,
        );
      }
      setBlockLeft(s * width);
      setBlockTop(Math.abs(height * (v - 1)));
    }
  }, [color]);

  const handleChange = useCallback(
    ({ target }) => {
      const newColor = parseColor(target.value);
      setValue(newColor);
      onChange && onChange({ value: newColor, input: true });
      if (newColor) {
        setSlidersPosition();
      }
    },
    [onChange, setSlidersPosition],
  );

  const handleSelect = useCallback(
    (ev) => {
      ev.stopPropagation();
      onChange && onChange({ value: color });
    },
    [color, onChange],
  );

  const keydown = useCallback(
    (ev) => {
      const slider = ev.target;
      const isSliderBlock = slider.getAttribute('data-slider') === BLOCK;
      const isSliderLine = slider.getAttribute('data-slider') === LINE;

      let css = window.getComputedStyle(slider);
      let left = parseFloat(css.left);
      let top = parseFloat(css.top);
      const code = ev.code;

      if (isSliderBlock) {
        switch (code) {
          case 'ArrowLeft': {
            left--;
            break;
          }
          case 'ArrowRight': {
            left++;
            break;
          }
          case 'ArrowDown': {
            top++;
            break;
          }
          case 'ArrowUp': {
            top--;
            break;
          }
          default:
            return;
        }

        moveBlockSlider(left, top);
      }

      if (isSliderLine) {
        if (code === 'ArrowLeft' || code === 'ArrowDown') left--;
        else if (code === 'ArrowRight' || code === 'ArrowUp') left++;
        else return;
        moveLineSlider(left);
      }

      ev.preventDefault();
    },
    [moveBlockSlider, moveLineSlider],
  );

  useEffect(() => {
    setSlidersPosition();
  }, [setSlidersPosition]);

  useEffect(() => {
    if (value !== value) {
      setValue(value);
      setSlidersPosition();
    }
  }, [value, value, setSlidersPosition]);

  useEffect(() => {
    if (blockRef.current) {
      sliderMove(blockRef.current, { moveBlockSlider });
    }
    if (colorLineRef.current) {
      sliderMove(colorLineRef.current, { moveLineSlider });
    }
  }, [moveBlockSlider, moveLineSlider]);

  useEffect(() => {
    if (value !== value) {
      onChange && onChange({ value: value, input: true });
    }
  }, [value, onChange]);

  useEffect(() => {
    if (color && blockRef.current) {
      setSlidersPosition();
    }
  }, [color, setSlidersPosition]);

  const cssScope = 'wx-1yoKzq';

  return (
    <div className={cssScope + ' wx-colorboard'}>
      <div
        className={cssScope + ' wx-color-block'}
        style={{ background: blockColor }}
        ref={blockRef}
      >
        <div
          className={cssScope + ' wx-color-block-slider wx-slider'}
          style={{
            background: color,
            top: blockTop + 'px',
            left: blockLeft + 'px',
          }}
          tabIndex={0}
          data-slider={BLOCK}
          onKeyDown={keydown}
        ></div>
      </div>
      <div className={cssScope + ' wx-color-line'} ref={colorLineRef}>
        <div
          className={cssScope + ' wx-color-line-slider wx-slider'}
          style={{ background: blockColor, left: lineLeft + 'px' }}
          tabIndex={0}
          data-slider={LINE}
          onKeyDown={keydown}
        ></div>
      </div>
      <div className={cssScope + ' wx-color-controls'}>
        <div
          className={cssScope + ' wx-color'}
          style={{ background: color }}
        ></div>
        <input
          type="text"
          className={cssScope + ' wx-text'}
          value={value}
          onChange={handleChange}
        />
      </div>
      {button && (
        <Button onClick={handleSelect} type="secondary">
          {_('select')}
        </Button>
      )}
    </div>
  );
}

export default ColorBoard;
