import { useCountriesNames, useCountryDetails } from './apiHooks';
import { setupServer } from 'msw/node';
import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook } from '@testing-library/react-hooks';
import { handlers } from '../mock/msw/handlers/countriesNames/handlers';

const createWrapper = () => {
  // ✅ creates a new QueryClient for each test
  const queryClient = new QueryClient();
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('Api Hooks tests: ', () => {
  const server = setupServer(...handlers);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  describe('useCountriesNames ', () => {
    test(`if you call hook, then fetching is loading`, async () => {
      const { result } = renderHook(() => useCountriesNames(), {
        wrapper: createWrapper(),
      });
      expect(result.current.isLoading).toBe(true);
    });

    test('if you call hook with empty string param, after waiting for data, then fetching data is finished wih success, ', async () => {
      const { result, waitFor } = renderHook(() => useCountriesNames(''), {
        wrapper: createWrapper(),
      });

      await waitFor(() => result.current.isSuccess);

      const { error, isLoading, isLoadingError, isSuccess } = result.current;
      expect(isLoading).toBe(false);
      expect(error).toBe(null);
      expect(isLoadingError).toBe(false);
      expect(isSuccess).toBe(true);
    });

    test('if you call hook without param, after waiting for data, then fetching data is finished wih success, ', async () => {
      const { result, waitFor } = renderHook(() => useCountriesNames(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => result.current.isSuccess);

      const { error, isLoading, isLoadingError, isSuccess } = result.current;
      expect(isLoading).toBe(false);
      expect(error).toBe(null);
      expect(isLoadingError).toBe(false);
      expect(isSuccess).toBe(true);
    });

    test('if you call hook with param, after waiting for data, then fetching data is finished wih success. ', async () => {
      const { result, waitFor } = renderHook(() => useCountriesNames('poland'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => result.current.isSuccess);

      expect(result.current.isSuccess).toBe(true);
    });

    test('if you call hook with param with special chars, after waiting for data, then fetching data is finished wih success. ', async () => {
      const { result, waitFor } = renderHook(() => useCountriesNames('póLĄnD'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => result.current.isSuccess).catch((error) => {});

      expect(result.current.isSuccess).toBe(true);
    });
  });

  describe('useCountryDetails ', () => {
    test(`if you call hook with correct string param, then fetching is loading`, async () => {
      const { result } = renderHook(() => useCountryDetails('poland'), {
        wrapper: createWrapper(),
      });
      expect(result.current.isLoading).toBe(true);
    });

    test('if you call hook with correct string param, after waiting for data, then fetching data is finished wih success, ', async () => {
      const { result, waitFor } = renderHook(() => useCountryDetails('poland'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => result.current.isSuccess);

      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(null);
      expect(result.current.isLoadingError).toBe(false);
      expect(result.current.isSuccess).toBe(true);
    });

    test('if you call hook with correct string param, after waiting for data, then you will receive correct data, ', async () => {
      const { result, waitFor } = renderHook(() => useCountryDetails('poland'), {
        wrapper: createWrapper(),
      });

      const expectedData = {
        currencies: [
          {
            code: 'PLN',
            name: 'Polish złoty',
            symbol: 'zł',
          },
        ],
        name: 'Poland',
        capital: 'Warsaw',
      };

      await waitFor(() => result.current.isSuccess);

      expect(result.current.data).toEqual(expectedData);
    });
  });
});
