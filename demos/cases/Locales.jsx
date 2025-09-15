import { useState, useMemo } from 'react';
import { Calendar, Segmented, Locale, Text } from '../../src/index';
import { en, cn, de, es, fr, it, ja, pt, ru } from '@svar-ui/core-locales';
import './Locales.css';

const cssScope = 'wx-34jMBF';

const options = [
  { id: 'en', label: 'EN', locale: en },
  { id: 'cn', label: 'CN', locale: cn },
  { id: 'de', label: 'DE', locale: de },
  { id: 'es', label: 'ES', locale: es },
  { id: 'fr', label: 'FR', locale: fr },
  { id: 'it', label: 'IT', locale: it },
  { id: 'ja', label: 'JA', locale: ja },
  { id: 'pt', label: 'PT', locale: pt },
  { id: 'ru', label: 'RU', locale: ru },
];

function getWords(lang) {
  const op = options.find((op) => op.id == lang);
  return op?.locale || en;
}

function getFormattedNumber(l, n) {
  const locale = getWords(l);
  const localeName = locale.lang || 'en-US';
  return new Intl.NumberFormat(localeName, {
    minimumFractionDigits: 2,
    style: 'currency',
    currency: 'EUR',
  }).format(n);
}

const value = new Date(2024, 2, 18);

export default function Locales() {
  const [lang, setLang] = useState('en');
  const [numValue, setNumValue] = useState(1256790.567);

  const localeKey = useMemo(() => lang, [lang]);

  return (
    <>
      <div className={`${cssScope} demo-box`}>
        <Segmented
          options={options}
          value={lang}
          onChange={(v) => setLang(v.value)}
        />
      </div>

      <div className={`${cssScope} demo-box`} style={{ width: '300px' }}>
        <div key={localeKey}>
          <Locale words={getWords(lang)}>
            <div className={`${cssScope} calendar`}>
              <Calendar value={value} />
            </div>

            <div className={`${cssScope} bar`}>
              <div className={`${cssScope} text`}>
                <Text value={numValue} onChange={setNumValue} />
              </div>
              {getFormattedNumber(lang, numValue)}
            </div>
          </Locale>
        </div>
      </div>
    </>
  );
}
