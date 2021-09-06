import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { handlers } from '../../mock/msw/handlers/countriesNames/handlers';
import Home from './Home';

describe('Home page: ', () => {
  const server = setupServer(...handlers);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test(`when country names are not fetched yet, then loading screen is displayed`, async () => {
    const { componentWithWrappers } = addTestWrappers({
      route: undefined,
      toBeWrappedComponent: <Home />,
    });
    render(componentWithWrappers);
    const headerTitle = screen.getByRole('heading');

    const searchedText = /Loading/i;
    expect(headerTitle).toHaveTextContent(searchedText);
  });

  test(`when country names are fetched, then loading text is changed to other`, async () => {
    const { componentWithWrappers } = addTestWrappers({
      route: undefined,
      toBeWrappedComponent: <Home />,
    });
    render(componentWithWrappers);
    const headerTitle = screen.getByRole('heading');

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

    const searchedText = /Countries list/i;
    expect(headerTitle).toHaveTextContent(searchedText);
  });

  test(`when country names are fetched, then initial list of countries is displayed`, async () => {
    const { componentWithWrappers } = addTestWrappers({
      route: undefined,
      toBeWrappedComponent: <Home />,
    });
    render(componentWithWrappers);

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

    const country1 = screen.queryByText(/Afghanistan/i);
    const country2 = screen.queryByText(/Åland Islands/i);
    const country3 = screen.queryByText(/Albania/i);
    const country4 = screen.queryByText(/Algeria/i);
    expect(country1).toBeInTheDocument();
    expect(country2).toBeInTheDocument();
    expect(country3).toBeInTheDocument();
    expect(country4).toBeInTheDocument();
  });
});
