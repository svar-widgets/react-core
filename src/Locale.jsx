import { useContext, useMemo } from 'react';
import { i18n } from './context';
import { locale } from '@svar-ui/lib-dom';
import { en } from '@svar-ui/core-locales';

export default function Component(props) {
  let { words = null, optional = false, children } = props;

  let l = useContext(i18n);
  const v = useMemo(() => {
    let t = l;
    if (!t || !t.extend) t = locale(en);
    t = t.extend(words, optional);
    return t;
  }, [words, optional, l]);

  return <i18n.Provider value={v}>{children}</i18n.Provider>;
}
