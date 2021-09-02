import React from 'react';
import styles from './Navbar.module.scss';
import logo from '../../assets/img/logo.png';
import { NavLink, Route, Switch } from 'react-router-dom';
import SearchingInput from '../SearchingInput/SearchingInput';

const Navbar = () => {
  return (
    <header className={styles.navbar}>
      <div className={styles.navbar__container}>
        <img src={logo} className={styles.navbar__logo} alt="countries app logo" />
        <Switch>
          <Route exact path="/">
            <SearchingInput />
          </Route>

          <Route>
            <nav className={styles.navbar__optionsContainer}>
              <NavLink to="/" className={styles.navbar__button}>
                Home
              </NavLink>
            </nav>
          </Route>
        </Switch>
      </div>

      <div className={styles.navbar__stripe} />
    </header>
  );
};

export default Navbar;
