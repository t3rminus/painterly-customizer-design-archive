import { useState } from 'react';
import { titleize } from '@/lib/text';
import Tooltip from '@/components/page/Tooltip';
import style from './style.module.scss';

const Texture = ({ texture, visible }) => {
  const [expanded, setExpanded] = useState(false);

  return <div className={style.texture}>
    <h4 className={style.texture__heading} onClick={() => setExpanded(!expanded)}>{titleize(texture.name)}</h4>
    <ul className={style.texture__options} style={{ height: expanded ? 'auto' : 0 }}>
      {texture.options.map(o =>
      <li className={style.texture__option} key={o.id}>
        <Tooltip content={o}>
          <label className={style.texture__label} data-tip={JSON.stringify(o)}>
            <input type="radio" name={texture.id} />
            {expanded && visible && <img src="https://www.filterforge.com/filters/11635.jpg" className={style.texture__image} loading="lazy" />}
          </label>
        </Tooltip>
      </li>
      )}
    </ul>
  </div>;
};

export default Texture;
