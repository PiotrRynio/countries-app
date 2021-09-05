import { rest } from 'msw';
import { countriesNamesHandlerResponses } from './countriesNamesHandlerResponses';

const API_URL = 'https://restcountries.eu/rest/v2';

const allCountriesNamesHandler = rest.get(`${API_URL}/all`, (req, res, ctx) => {
  const query = req.url.searchParams;
  // const fields = query.get("fields");

  return res(
    ctx.status(200),
    ctx.json({
      countriesNamesHandlerResponse: countriesNamesHandlerResponses,
    }),
  );
});

export const countriesNamesHandler = {
  allCountriesNames: allCountriesNamesHandler,
};
