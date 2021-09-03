import React from 'react';
import { errorCodes, useCountryDetails } from '../../api/apiHooks';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { NavLink } from 'react-router-dom';
import styles from './CountryDetails.module.scss';

const CountryDetails = () => {
  // return <div>sss</div>

  const { isLoading, error, data } = useCountryDetails('poland');

  const goHomeButton = (
    <div className={styles.countryDetails__navContainer}>
      <NavLink to="/" className={styles.countryDetails__goHomeButton}>
        {' '}
        go Home Page{' '}
      </NavLink>
    </div>
  );

  let header = <SectionTitle>Country details:</SectionTitle>;

  if (isLoading)
    header = (
      <>
        <SectionTitle isAlert={true}>Loading...</SectionTitle> {goHomeButton}
      </>
    );

  if (error) {
    header =
      error.message === errorCodes.NOT_FOUND ? (
        <>
          <SectionTitle isAlert={true}>Not found country :( </SectionTitle>
          {goHomeButton}
        </>
      ) : (
        <>
          <SectionTitle isAlert={true}>api server error :(</SectionTitle>
          {goHomeButton}
        </>
      );
  }

  return (
    <section className={styles.countryDetails}>
      {header}
      {data ? <article className={styles.countryDetails__body}>article</article> : ''}
    </section>
  );
};

export default CountryDetails;
