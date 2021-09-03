import React, { useState } from 'react';
import styles from './SearchingInput.module.scss';
import { GoSearch } from 'react-icons/go';
import { useSearchParams } from '../../hooks/useSearchParams';

const SearchingInput = () => {
  const { search, setSearchParams } = useSearchParams();

  const [textInput, setTextInput] = useState(search);

  const handleChange = (event) => {
    setTextInput(event.target.value);
  };

  const onClickButton = () => {
    const newValues = {
      page: '1',
      search: textInput,
    };
    setSearchParams(newValues);
  };

  return (
    <label className={styles.searchingInput}>
      <input
        type="text"
        className={styles.searchingInput__searcher}
        value={textInput}
        onChange={handleChange}
        placeholder={`Wyszukaj kraj...`}
      />
      <button className={styles.searchingInput__searchButton} onClick={onClickButton}>
        <GoSearch className={styles.searchingInput__icon} />
      </button>
    </label>
  );
};

export default SearchingInput;
