import { useQuery } from 'react-query';

const API_URL = 'https://restcountries.eu/rest/v2';

export const errorCodes = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  NOT_FOUND: 'NOT_FOUND',
};

export const useCountriesNames = (search) =>
  useQuery(['countries', search], async () => {
    const allCountriesPath = `${API_URL}/all?fields=name`;
    const searchedCountriesPath = `${API_URL}/name/${search.trim()}?fields=name`;
    const response = await fetch(search.trim() !== '' ? searchedCountriesPath : allCountriesPath);

    await validateResponse(response);
    return response.json();
  });

export const useCountryDetails = (name) =>
  useQuery(['countries', name], async () => {
    const uriName = encodeURIComponent(name);
    const response = await fetch(
      `${API_URL}/name/${uriName}?fullText=true&fields=name;capital;currencies`,
    );

    await validateResponse(response);
    const countries = await response.json();
    return countries[0];
  });

const validateResponse = async (response) => {
  if (!response.ok) {
    const errorResponse = await response.json();
    if (errorResponse.status === 404) {
      throw new Error(errorCodes.NOT_FOUND);
    }
    throw new Error(errorCodes.NETWORK_ERROR);
  }
};
