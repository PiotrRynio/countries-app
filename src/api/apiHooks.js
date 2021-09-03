import { useQuery } from 'react-query';

const API_URL = 'https://restcountries.eu/rest/v2';

export const errorCodes = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  NOT_FOUND: 'NOT_FOUND',
};

export const useCountriesNames = (search) =>
  useQuery(['countries', search], async () => {
    const response = await fetch(`${API_URL}/name/${search}?fields=name`);

    if (!response.ok) {
      const errorResponse = await response.json();
      if (errorResponse.status === 404) throw new Error(errorCodes.NOT_FOUND);
      throw new Error(errorCodes.NETWORK_ERROR);
    }

    return response.json();
  });

export const useCountryDetails = (name) =>
  useQuery(['countries', name], async () => {
    const uriName = encodeURIComponent(name);
    const response = await fetch(
      `${API_URL}/name/${uriName}?fullText=true&fields=name;capital;currencies`,
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      if (errorResponse.status === 404) throw new Error(errorCodes.NOT_FOUND);
      throw new Error(errorCodes.NETWORK_ERROR);
    }

    const countries = response.json();
    return countries[0];
  });
