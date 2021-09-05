// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

global.addTestWrappers = ({ toBeWrappedComponent, route = undefined, ...others }) => {
  const { componentWithRouter, history } = addRouterWrapper(toBeWrappedComponent, route);
  const { componentWitQueryClientProvider } = addQueryClientProviderWrapper(componentWithRouter);

  return {
    componentWithWrappers: componentWitQueryClientProvider,
    history: history,
    others: others,
  };
};

const addRouterWrapper = (toBeWrappedComponent, route = undefined) => {
  const history = createMemoryHistory();
  if (route) {
    history.push(route);
  }
  const componentWitRouter = <Router history={history}> {toBeWrappedComponent}</Router>;
  return {
    componentWithRouter: componentWitRouter,
    history: history,
  };
};

const addQueryClientProviderWrapper = (toBeWrappedComponent) => {
  const queryClient = new QueryClient();
  const componentWitQueryClientProvider = (
    <QueryClientProvider client={queryClient}> {toBeWrappedComponent}</QueryClientProvider>
  );
  return {
    componentWitQueryClientProvider: componentWitQueryClientProvider,
  };
};
