import { theme } from '../context';
import RobotoFont from './FonttRoboto';
import './Material.css';
export default function render(props) {
  const { fonts = true, children } = props;

  return (
    <theme.Provider value="material">
      <>
        {children && <div className="wx-material-theme">{children}</div>}

        {fonts && (
          <>
            <link
              rel="preconnect"
              href="https://cdn.webix.com"
              crossOrigin="true"
            />
            <RobotoFont />
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
