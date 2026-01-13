import { theme } from '../context';
import FontOpenSans from './FontOpenSans';
import './Willow.css';
export default function render(props) {
  const { fonts = true, children } = props;

  return (
    <theme.Provider value="willow">
      <>
        {children && children && (
          <div className="wx-theme wx-willow-theme">{children}</div>
        )}

        {fonts && (
          <>
            <link
              rel="preconnect"
              href="https://cdn.svar.dev"
              crossOrigin="true"
            />
            <FontOpenSans />
            <link
              rel="stylesheet"
              href="https://cdn.svar.dev/fonts/wxi/wx-icons.css"
            />
          </>
        )}
      </>
    </theme.Provider>
  );
}
