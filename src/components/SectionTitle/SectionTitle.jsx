import React from 'react';

import styles from './SectionTitle.module.scss';
import cn from 'classnames';

const SearchingInput = ({ isAlert = false, children }) => {
  return (
    <header className={styles.sectionTitle}>
      <h2
        className={cn(styles.sectionTitle__text, {
          [styles['sectionTitle__text--alert']]: isAlert,
        })}
      >
        {children}
      </h2>
    </header>
  );
};

export default SearchingInput;
