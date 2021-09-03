import React, { useContext } from 'react';
import { errorCodes, useCountriesNames } from '../../api/apiHooks';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import styles from './Home.module.scss';
import CountriesList from '../../components/CountriesList/CountriesList';
import { CountriesAppContext } from '../../context/CountriesAppContext';

const Home = () => {
  const { searchedPhrase } = useContext(CountriesAppContext);
  const { isLoading, error, data } = useCountriesNames(searchedPhrase);

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
