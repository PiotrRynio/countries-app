import React from 'react';
import { useCountryDetails } from '../../api/apiHooks';
import styles from './CountryDetails.module.scss';
import CountryDetailsArticle from './CountryDetailsArticle';
import CountryDetailsHeader from './CountryDetailsHeader';
import { useParams } from 'react-router-dom';

const CountryDetails = () => {
  const { countryName } = useParams();

  const { isLoading, error, data } = useCountryDetails(countryName);

  return (
    <section className={styles.countryDetails}>
      <CountryDetailsHeader isLoading={isLoading} error={error} />
      <article className={styles.countryDetails__body}>
        {data ? (
          <CountryDetailsArticle
            name={data.name}
            capital={data.capital}
            currencies={data.currencies}
          ></CountryDetailsArticle>
        ) : (
          ''
        )}
      </article>
    </section>
  );
};

export default CountryDetails;
