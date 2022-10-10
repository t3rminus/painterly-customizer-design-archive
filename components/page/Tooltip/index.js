import { createContext, useContext } from 'react';
import Tippy, { useSingleton } from '@tippyjs/react';
import style from './style.module.scss';
import 'tippy.js/dist/tippy.css'

const TippySingletonContext = createContext(null);

const getContent = ({ name, author, choice, telethon }) => {
  const nameClass = style.tooltip__name + (telethon ? ` ${style.tooltip__telethon}` : '');
  return <div className={style.tooltip}>
    <h4 className={nameClass}>{name}</h4>
    <h5 className={style.tooltip__author}>By {author}</h5>
    <h5 className={style.tooltip__choice}>{choice}</h5>
  </div>;
};

export default ({ children, content = {}, ...restProps }) => {
  const tippySingleton = useContext(TippySingletonContext);
  return (
    <Tippy {...restProps} content={getContent(content)} singleton={tippySingleton}>
      {children}
    </Tippy>
  );
};

export const TippyContext = ({ children }) => {
  const [source, target] = useSingleton();

  return (
    <>
      <TippySingletonContext.Provider value={target}>
        {children}
      </TippySingletonContext.Provider>
      <Tippy singleton={source} placement="bottom-start" hideOnClick="true" interactive="true" />
    </>
  );
}