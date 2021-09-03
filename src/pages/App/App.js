import React from 'react';
import styles from './App.module.scss';
import Navbar from '../../components/Navbar/Navbar';
import Home from '../Home/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import CountryDetails from '../CountryDetails/CountryDetails';
import { ReactQueryDevtools } from 'react-query/devtools';
import { CountriesAppProvider } from '../../context/CountriesAppContext';

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <CountriesAppProvider>
        <Router>
          <div className={styles.app}>
            <Navbar />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/countries/:countryName">
                <CountryDetails />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      </CountriesAppProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
