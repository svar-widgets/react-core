import { useCallback, useMemo } from 'react';
import { snippet, useWritableProp } from '@svar-ui/lib-react';
import Button from './Button.jsx';

const TwoState = ({
  value: initialValue = false,
  type = '',
  icon = null,
  disabled = null,
  iconActive = null,
  onClick,
  title = '',
  css = '',
  text = '',
  textActive = '',
  children,
  active,
  onChange,
}) => {
  const [value, setValue] = useWritableProp(initialValue);

  const typeStr = useMemo(() => {
    return (value ? 'pressed' : '') + (type ? ' ' + type : '');
  }, [value, type]);

  const handleClick = useCallback(
    (ev) => {
      let next = !value;
      if (onClick) onClick(ev);
      if (!ev.defaultPrevented) {
        setValue(next);
        onChange && onChange({ value: next });
      }
    },
    [value, onClick, onChange],
  );

  if (value && active) {
    return (
      <Button
        title={title}
        text={(value && textActive) || text}
        css={css}
        type={typeStr}
        icon={(value && iconActive) || icon}
        onClick={handleClick}
        disabled={disabled}
      >
        {snippet(active, { value })}
      </Button>
    );
  } else if (children) {
    return (
      <Button
        title={title}
        text={(value && textActive) || text}
        css={css}
        type={typeStr}
        icon={(value && iconActive) || icon}
        onClick={handleClick}
        disabled={disabled}
      >
        {children}
      </Button>
    );
  } else {
    return (
      <Button
        title={title}
        text={(value && textActive) || text}
        css={css}
        type={typeStr}
        icon={(value && iconActive) || icon}
        onClick={handleClick}
        disabled={disabled}
      />
    );
  }
};

export default TwoState;
