import { useCountriesNames } from './apiHooks';
import { setupServer } from 'msw/node';
import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook } from '@testing-library/react-hooks';
import { countriesNamesHandlers } from '../mock/msw/handlers/countriesNames/countriesNamesHandlers';

const createWrapper = () => {
  // ✅ creates a new QueryClient for each test
  const queryClient = new QueryClient();
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('Api Hooks tests: ', () => {
  const server = setupServer(...countriesNamesHandlers);

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

      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(null);
      expect(result.current.isLoadingError).toBe(false);
      expect(result.current.isSuccess).toBe(true);
    });

    test('if you call hook without param, after waiting for data, then fetching data is finished wih success, ', async () => {
      const { result, waitFor } = renderHook(() => useCountriesNames(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => result.current.isSuccess);

      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(null);
      expect(result.current.isLoadingError).toBe(false);
      expect(result.current.isSuccess).toBe(true);
    });
  });
});
