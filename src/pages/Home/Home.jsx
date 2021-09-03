import React from 'react';
import { errorCodes, useCountriesNames } from '../../api/apiHooks';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import styles from './Home.module.scss';

const Home = () => {
  const { isLoading, error, data } = useCountriesNames('united');

  let title = <SectionTitle>Countries list:</SectionTitle>;

  if (isLoading) title = <SectionTitle isAlert={true}>'Loading...'</SectionTitle>;

  if (error) {
    if (error.message === errorCodes.NOT_FOUND)
      title = (
        <SectionTitle isAlert={true}>
          'Not found countries matching given search input'
        </SectionTitle>
      );
    title = <SectionTitle isAlert={true}>'api server error'</SectionTitle>;
  }

  return (
    <section className={styles.home}>
      {title}
      {data ? <section className={styles.home__body}>{data[0].name}</section> : ''}
    </section>
  );
};

export default Home;
