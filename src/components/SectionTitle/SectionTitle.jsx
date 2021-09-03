import React from 'react';

import styles from './SectionTitle.module.scss';

const SearchingInput = ({ children }) => {
  return (
    <header className={styles.sectionTitle}>
      <h2 className={styles.sectionTitle__text}>{children}</h2>
    </header>
  );
};

export default SearchingInput;
