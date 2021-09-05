import { rest } from 'msw';
import { countriesNamesHandlersResponses } from './responses/countriesNames';
import { countryDetailsHandlersResponses } from './responses/countryDetails';

const API_URL = 'https://restcountries.eu/rest/v2';

const allCountriesNamesHandler = rest.get(`${API_URL}/all`, (req, res, ctx) => {
  const fields = req.url.searchParams.get('fields');
  if (fields === 'name') {
    const handlerResponse = countriesNamesHandlersResponses.allCountriesNames;
    return res(ctx.status(200), ctx.json(handlerResponse));
  }
  return res(ctx.status(404));
});

const searchedCountriesNamesAndCountryDetailsHandler = rest.get(
  `${API_URL}/name/:name`,
  (req, res, ctx) => {
    const { searchParams } = req.url;
    const fields = searchParams.get('fields');
    const fullText = searchParams.get('fullText');
    const name = req.params.name;

    const isCorrectCountryNameQuery = fields === 'name' && fullText !== undefined;

    if (isCorrectCountryNameQuery && name === 'poland') {
      return res(ctx.status(200), ctx.json(countriesNamesHandlersResponses.poland));
    }

    const isCorrectCountryDetailsQuery =
      fullText === 'true' && fields === 'name;capital;currencies';

    if (isCorrectCountryDetailsQuery && name === 'poland') {
      const handlerResponse = countryDetailsHandlersResponses.poland;
      return res(ctx.status(200), ctx.json(handlerResponse));
    }

    return res(ctx.status(404), ctx.json([{}]));
  },
);
export const handlers = [allCountriesNamesHandler, searchedCountriesNamesAndCountryDetailsHandler];
