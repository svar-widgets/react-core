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
              href="https://cdn.webix.com"
              crossOrigin="true"
            />
            <FontOpenSans />
            <link
              rel="stylesheet"
              href="https://webix.io/dev/fonts/wxi/wx-icons.css"
            />
          </>
        )}
      </>
    </theme.Provider>
  );
}
