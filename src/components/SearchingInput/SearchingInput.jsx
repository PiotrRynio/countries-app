import React, { useContext, useState } from 'react';
import styles from './SearchingInput.module.scss';
import { GoSearch } from 'react-icons/go';
import { SearchedPhraseContext } from '../../context/SearchedPhraseContext';

const SearchingInput = () => {
  const { searchedPhrase, setSearchedPhrase } = useContext(SearchedPhraseContext);
  const [textInput, setTextInput] = useState(searchedPhrase);

  const handleChange = (event) => {
    setTextInput(event.target.value);
  };
  const onClickButton = () => {
    setSearchedPhrase(textInput);
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
