import { rest } from 'msw';
import { countriesNamesHandlerResponses } from './countriesNamesHandlerResponses';

const API_URL = 'https://restcountries.eu/rest/v2';

const allCountriesNamesHandler = rest.get(`${API_URL}/:searchedPhrase`, (req, res, ctx) => {
  const { searchParams } = req.url;
  const fields = searchParams.get('fields');
  const searchedPhrase = req.params.searchedPhrase;

  if (fields !== 'name') {
    return res(ctx.status(404));
  }

  if (searchedPhrase === 'all') {
    return res(ctx.status(200), ctx.json(countriesNamesHandlerResponses));
  }

  return res(ctx.status(404));
});

export const countriesNamesHandlers = [allCountriesNamesHandler];
