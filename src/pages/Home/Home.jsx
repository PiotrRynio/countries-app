import React from 'react';
import { errorCodes, useCountriesNames } from '../../api/apiHooks';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import styles from './Home.module.scss';
import CountriesList from '../../components/CountriesList/CountriesList';
import { useSearchParams } from '../../hooks/useSearchParams';

const Home = () => {
  const { search } = useSearchParams();
  const { isLoading, error, data } = useCountriesNames(search);

  let header = <SectionTitle>Countries list:</SectionTitle>;
  if (isLoading) {
    header = <SectionTitle isAlert={true}>Loading...</SectionTitle>;
  }
  if (error) {
    header = (
      <SectionTitle isAlert={true}>
        {error.message === errorCodes.NOT_FOUND ? `No countries found!` : `api server error`}
      </SectionTitle>
    );
  }

  return (
    <section className={styles.home}>
      {header}
      <article className={styles.home__body}>
        <CountriesList countriesData={data} />
      </article>
    </section>
  );
};

export default Home;
