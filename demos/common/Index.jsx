import { useState, useEffect, useCallback } from 'react';
import { HashRouter, NavLink, useNavigate } from 'react-router-dom';
import {
  Globals,
  Material,
  Willow,
  WillowDark,
  Button,
  Segmented,
} from '../../src/index.js';
import Router from './Router';
import { links } from '../routes';
import { GitHubLogoIcon, LogoIcon } from '../assets/icons';
import './Index.css';

const skins = [
  { id: 'willow', label: 'Willow', props: {} },
  { id: 'willow-dark', label: 'Dark', props: {} },
];

if (document.location.hostname !== 'docs.svar.dev') {
  skins.unshift({
    id: 'material',
    label: 'Material',
    props: {},
  });
}

function DemoExplorerContent() {
  const navigate = useNavigate();
  const [skin, setSkin] = useState('willow');
  const [title, setTitle] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [show, setShow] = useState(true);

  const baseLink =
    'https://github.com/svar-widgets/react-core/tree/main/demos/cases/';

  useEffect(() => {
    document.body.className = `wx-willow-theme`;
  }, []);

  const handleRouteChange = useCallback(
    (path) => {
      const parts = path.split('/');
      const page = parts[1];
      const newSkin = parts[2];

      if (newSkin && newSkin !== skin) {
        setSkin(newSkin);
      }

      const targetPage = `/${page}/:skin`;
      const matched = links.find((a) => a[0] === targetPage);
      if (matched) {
        setTitle(matched[1]);
        const name = matched[1] || '';
        setGithubLink(`${baseLink}${name.replace(/\s+/g, '')}.jsx`);
      }
    },
    [skin],
  );

  const handleSkinChange = ({ value }) => {
    setSkin(value);
    const currentPath = window.location.hash.slice(1);
    const parts = currentPath.split('/');
    if (parts[1]) {
      navigate(`/${parts[1]}/${value}`);
    }
  };

  const toggleSidebar = () => {
    setShow(!show);
  };

  return (
    <div className={`wx-demos layout ${show ? 'active' : ''}`}>
      <div
        className={`wx-demos sidebar ${show ? 'active' : ''}`}
        role="tabpanel"
      >
        <div className="wx-demos sidebar-content">
          <div className="wx-demos sidebar-header">
            <div className="wx-demos box-title">
              <a
                href="https://svar.dev/react/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={LogoIcon} alt="Logo icon" className="box-title-img" />
              </a>
              <div className="wx-demos separator"></div>
              <a
                href="https://svar.dev/react/core/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h1 className="wx-demos title">React Core</h1>
              </a>
            </div>
            <div className="wx-demos btn-box">
              <Button
                type="secondary"
                icon="wxi-angle-left"
                css="toggle-btn"
                onClick={toggleSidebar}
              ></Button>
            </div>
          </div>
          <div className="wx-demos box-links">
            {links.map((data) => (
              <NavLink
                key={data[0]}
                to={data[0].replace(':skin', skin)}
                className={({ isActive }) =>
                  `wx-demos demo ${isActive ? 'active' : ''}`
                }
              >
                {data[1]}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      <div className="wx-demos page-content">
        <div className="wx-demos page-content-header">
          <div className="wx-demos header-title-box">
            {!show && (
              <div className="wx-demos btn-box">
                <Button
                  type="secondary"
                  icon="wxi-angle-right"
                  css="toggle-btn"
                  onClick={toggleSidebar}
                />
              </div>
            )}
            <div className="wx-demos hint">{title}</div>
          </div>
          <div className="wx-demos header-actions-container">
            <div className="wx-demos segmented-box">
              <Segmented
                value={skin}
                options={skins}
                css="segmented-themes"
                onChange={handleSkinChange}
              />
            </div>
            <div className="wx-demos btn-box">
              <a href={githubLink} target="_blank" rel="noopener noreferrer">
                <Button type="secondary" css="toggle-btn">
                  <img src={GitHubLogoIcon} alt="GitHub icon" />
                  See code on GitHub
                </Button>
              </a>
            </div>
          </div>
        </div>

        <div
          className="wx-demos wrapper-content"
          onClick={() => setShow(false)}
          role="none"
        >
          <div
            className={`wx-demos content wx-${skin}-theme`}
            role="none"
            data-wx-portal-root="true"
          >
            <Globals>
              <Router skin={skin} onRouteChange={handleRouteChange} />
            </Globals>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DemoExplorer() {
  return (
    <>
      <Material />
      <Willow />
      <WillowDark />
      <HashRouter>
        <DemoExplorerContent />
      </HashRouter>
    </>
  );
}
