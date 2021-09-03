import React from 'react';
import { errorCodes, useCountriesNames } from '../../api/apiHooks';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import styles from './Home.module.scss';

const Navbar = () => {
  const { isLoading, error, data } = useCountriesNames('united');

  if (isLoading) return <SectionTitle>'Loading...'</SectionTitle>;

  if (error) {
    if (error.message === errorCodes.NOT_FOUND)
      return <SectionTitle>'countries not found - modify the search field'</SectionTitle>;
    return <SectionTitle>'api server error'</SectionTitle>;
  }

  return (
    <section className={styles.home}>
      <SectionTitle>Countries list:</SectionTitle>
      <section className={styles.home__body}>{data[0].name}</section>
    </section>
  );
};

export default Navbar;
