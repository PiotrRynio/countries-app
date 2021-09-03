import React from 'react';

import styles from './CountriesList.module.scss';
import { BsChevronRight } from 'react-icons/all';
import { useHistory } from 'react-router-dom';

const CountriesList = ({ countriesData = [] }) => {
  let history = useHistory();

  if (!countriesData) return;

  function handleClick(param) {
    history.push(`/countries/${param}`);
  }

  return (
    <ul className={styles.countriesList}>
      {countriesData.map(({ name }) => (
        <li key={name} className={styles.countriesList__item} onClick={() => handleClick(name)}>
          <h3 className={styles.countriesList__itemTitle}>{name}</h3>
          <BsChevronRight className={styles.countriesList__arrow} />
        </li>
      ))}
    </ul>
  );
};

export default CountriesList;
