import React from 'react';

import styles from './SearchingInput.module.scss';
import { GoSearch } from 'react-icons/go';

const SearchingInput = () => {
  return (
    <label className={styles.searchingInput}>
      <input type="text" className={styles.searchingInput__searcher} />
      <GoSearch className={styles.searchingInput__icon} />
    </label>
  );
};

export default SearchingInput;
