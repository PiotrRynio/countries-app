import React from 'react';
import { errorCodes, useCountriesNames } from '../../api/apiHooks';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import styles from './Home.module.scss';
import CountriesList from '../../components/CountriesList/CountriesList';

const Home = () => {
  const { isLoading, error, data } = useCountriesNames('united');

  let header = <SectionTitle>Countries list:</SectionTitle>;

  if (isLoading) header = <SectionTitle isAlert={true}>Loading...</SectionTitle>;

  if (error) {
    header =
      error.message === errorCodes.NOT_FOUND ? (
        <SectionTitle isAlert={true}>Not found countries matching given search input</SectionTitle>
      ) : (
        <SectionTitle isAlert={true}>api server error</SectionTitle>
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
