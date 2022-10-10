import { createContext, useContext } from 'react';
import Tippy, { useSingleton } from '@tippyjs/react';

const TippySingletonContext = createContext(null);

export default () => {
  const tippySingleton = useContext(TippySingletonContext);

  return ({ children, ...restProps }) => (
    <Tippy {...restProps} singleton={tippySingleton}>
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
      <Tippy singleton={source} />
    </>
  );
}