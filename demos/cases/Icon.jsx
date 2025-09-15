import { Icon } from '../../src/index.js';
import { icons } from '../data/icons';

const arrs = [];
// split icons in blocks of 16 icons each
for (let i = 0; i < icons.length; i += 16) {
  arrs.push(icons.slice(i, i + 16));
}

export default function IconsDemo() {
  return (
    <div className="wx-t6oiW2 demo-box">
      <h3>Icons</h3>
      {arrs.map((subset, index) => (
        <div key={index}>
          {subset.map((icon) => (
            <Icon key={icon} title={icon} css={icon} />
          ))}
        </div>
      ))}
    </div>
  );
}
