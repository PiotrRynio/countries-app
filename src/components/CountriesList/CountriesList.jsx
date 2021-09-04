import React from 'react';

import styles from './CountriesList.module.scss';
import { BsChevronRight } from 'react-icons/all';
import { NavLink } from 'react-router-dom';
import Paginate from '../Paginate/Paginate';
import { useSearchParams } from '../../hooks/useSearchParams';

const CountriesList = ({ countriesData = [] }) => {
  const { page, setSearchParams } = useSearchParams();

  if (!countriesData) return;

  const pageCount = Math.ceil(countriesData.length / 20);

  const sortByName = (a, b) => ('' + a.name).localeCompare(b.name, 'en', { sensitivity: 'base' });
  const visibleCountriesFilter = (countryData, index) => {
    const minIndex = (page - 1) * 20;
    const maxIndex = page * 20 - 1;
    if (index >= minIndex && index <= maxIndex) return countryData;
  };

  const onPageChangeHandle = (selected) => setSearchParams({ page: selected });

  return (
    <>
      <Paginate pageCount={pageCount} forcePage={page} onPageChange={onPageChangeHandle} />
      <ul className={styles.countriesList}>
        {countriesData
          .sort(sortByName)
          .filter(visibleCountriesFilter)
          .map(({ name }) => (
            <NavLink to={`/countries/${name}`} key={name} className={styles.countriesList__item}>
              <h3 className={styles.countriesList__itemTitle}>{name}</h3>
              <BsChevronRight className={styles.countriesList__arrow} />
            </NavLink>
          ))}
      </ul>
    </>
  );
};

export default CountriesList;
