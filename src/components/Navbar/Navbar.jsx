import styles from './Navbar.module.scss';
import logo from '../../assets/img/logo.png';

import cn from 'classnames';

const Navbar = () => {
  return (
    <header className={styles.navbar}>
      <div className={styles.navbar__container}>
        <img src={logo} className={styles.navbar__logo} alt="countries app logo" />

        <nav className={styles.navbar__optionsContainer}>
          <span
            to="/"
            className={cn(styles.navbar__button, { [styles['navbar__button--activated']]: false })}
          >
            {' '}
            Home{' '}
          </span>
        </nav>
      </div>

      <div className={styles.navbar__stripe}></div>
    </header>
  );
};

export default Navbar;
