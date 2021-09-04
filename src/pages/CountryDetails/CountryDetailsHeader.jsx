import React from 'react';
import styles from './CountryDetailsHeader.module.scss';
import { NavLink } from 'react-router-dom';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { errorCodes } from '../../api/apiHooks';

const CountryDetailsHeader = ({ isLoading, error }) => {
  const goHomeButton = (
    <div className={styles.countryDetailsHeader__navContainer}>
      <NavLink to="/" className={styles.countryDetailsHeader__goHomeButton}>
        Go to home page
      </NavLink>
    </div>
  );

  if (isLoading) {
    return (
      <>
        <SectionTitle isAlert={true}>Loading...</SectionTitle>
        {goHomeButton}
      </>
    );
  }

  if (error) {
    return (
      <>
        <SectionTitle isAlert={true}>
          {error.message === errorCodes.NOT_FOUND ? `No country found :(` : `api server error :(`}
        </SectionTitle>
        {goHomeButton}
      </>
    );
  }

  return <SectionTitle>Country details:</SectionTitle>;
};

export default CountryDetailsHeader;
