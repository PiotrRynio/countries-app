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
});
