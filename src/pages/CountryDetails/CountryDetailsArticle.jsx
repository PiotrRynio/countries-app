import React from 'react';
import styles from './CountryDetailsArticle.module.scss';

const CountryDetailsArticle = ({ name, capital, currencies }) => {
  return (
    <article className={styles.countryDetailsArticle}>
      <h3 className={styles.countryDetailsArticle__header}>{name}</h3>
      <h4 className={styles.countryDetailsArticle__detailRow}>
        Capital:
        {capital ? (
          <span className={styles.countryDetailsArticle__detail}>{capital}</span>
        ) : (
          <span className={styles.countryDetailsArticle__noDetail}>no information</span>
        )}
      </h4>

      <section className={styles.countryDetailsArticle__currenciesSection}>
        {currencies.map((currency) => (
          <div className={styles.countryDetailsArticle__currencySection} key={currency.name}>
            <span className={styles.countryDetailsArticle__detailRow}>
              Currency code:
              <span className={styles.countryDetailsArticle__detail}>{currency.code}</span>
            </span>
            <span className={styles.countryDetailsArticle__detailRow}>
              Currency name:
              <span className={styles.countryDetailsArticle__detail}>{currency.name}</span>
            </span>
            <span className={styles.countryDetailsArticle__detailRow}>
              Currency symbole:
              <span className={styles.countryDetailsArticle__detail}>{currency.symbol}</span>{' '}
            </span>
          </div>
        ))}
      </section>
    </article>
  );
};

export default CountryDetailsArticle;
