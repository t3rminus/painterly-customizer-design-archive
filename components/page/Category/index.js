import { useState } from 'react';
import { titleize } from '@/lib/text';
import style from './style.module.scss';

import Texture from '@/components/page/Texture';

const Category = ({ category }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={style.category}>
      <h3 onClick={() => setExpanded(!expanded)}>{titleize(category.name)}</h3>
      <div className={style.category__texture} style={{ height: expanded ? 'auto' : 0 }}>
        {category.textures.map((t) => <Texture texture={t} visible={expanded} key={`${category.name}-${t.name}`} />)}
      </div>
    </div>
  );
}

export default Category;
