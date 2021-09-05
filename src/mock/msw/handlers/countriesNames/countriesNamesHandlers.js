import { rest } from 'msw';
import { allCountriesNamesHandlerResponse } from './allCountriesNamesHandlerResponse';
import { polandHandlerResponse } from './responses/polandHandlerResponse';

const API_URL = 'https://restcountries.eu/rest/v2';

const allCountriesNamesHandler = rest.get(`${API_URL}/all`, (req, res, ctx) => {
  const { searchParams } = req.url;
  const fields = searchParams.get('fields');

  if (fields !== 'name') {
    return res(ctx.status(404));
  }

  return res(ctx.status(200), ctx.json(allCountriesNamesHandlerResponse));
});

const searchedCountriesNamesHandler = rest.get(`${API_URL}/name/:name`, (req, res, ctx) => {
  const { searchParams } = req.url;
  const fields = searchParams.get('fields');
  const searchedPhrase = req.params.name;

  if (fields !== 'name') {
    return res(ctx.status(404), ctx.json([]));
  }

  if (searchedPhrase === 'poland') {
    return res(ctx.status(200), ctx.json(polandHandlerResponse));
  }

  return res(ctx.status(404), ctx.json([{}]));
});

export const countriesNamesHandlers = [allCountriesNamesHandler, searchedCountriesNamesHandler];
