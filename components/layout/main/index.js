import Header from '@/components/page/Header';
import style from './style.module.scss';

export default ({ children }) => {
  return (
    <>
      <div className={style.wrapper}>
        <div className={style.container}>
          <Header />
          <main className={style.main}>
            {children}
          </main>
        </div>
      </div>
    </>
  );
}