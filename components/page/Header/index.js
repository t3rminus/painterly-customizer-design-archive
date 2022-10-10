import Link from 'next/link';
import style from './style.module.scss';

const Header = () => {
  const x = style;
  return (
    <>
      <header className={style.header}>
        <div className={style.header__group}>
          <h1 className={style.header__title}>Painterly Pack Customizer</h1>
          <h2 className={style.header__subtitle}>Community Continuation!</h2>
        </div>
        <nav className={style.nav}>
          <Link href="/"><a>Home</a></Link>
          <a href="">Customizer</a>
          <Link href="/submit"><a>Submissions</a></Link>
          <a href="">GitHub</a>
        </nav>
      </header>
    </>
  );
}

export default Header;