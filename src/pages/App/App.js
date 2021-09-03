import React from 'react';
import styles from './App.module.scss';
import Navbar from '../../components/Navbar/Navbar';
import Home from '../Home/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import CountryDetails from '../CountryDetails/CountryDetails';

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className={styles.app}>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route>
              <CountryDetails />
            </Route>
          </Switch>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
