import React, { createContext, useState } from 'react';

export const CountriesAppContext = createContext({});

export const CountriesAppProvider = ({ children }) => {
  const [searchedPhrase, setSearchedPhrase] = useState('united');

  return (
    <CountriesAppContext.Provider value={{ searchedPhrase, setSearchedPhrase }}>
      {children}
    </CountriesAppContext.Provider>
  );
};
