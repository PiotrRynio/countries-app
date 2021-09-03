import React from 'react';

import styles from './CountriesList.module.scss';
import { BsChevronRight } from 'react-icons/all';

const CountriesList = ({ countriesData = [] }) => {
  if (!countriesData) return;

  return (
    <ul className={styles.countriesList}>
      {countriesData.map(({ name }) => (
        <li key={name} className={styles.countriesList__item}>
          <h3 className={styles.countriesList__itemTitle}>{name}</h3>
          <BsChevronRight className={styles.countriesList__arrow} />
        </li>
      ))}
    </ul>
  );
};

export default CountriesList;
