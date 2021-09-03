import React, { createContext, useState } from 'react';

export const SearchedPhraseContext = createContext({});

export const SearchedPhraseProvider = ({ children }) => {
  const [searchedPhrase, setSearchedPhrase] = useState('united');

  return (
    <SearchedPhraseContext.Provider value={{ searchedPhrase, setSearchedPhrase }}>
      {children}
    </SearchedPhraseContext.Provider>
  );
};
