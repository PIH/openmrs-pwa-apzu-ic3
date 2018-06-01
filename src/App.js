import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import createStore from './store';
import { AuthenticatedRoute, LoginPage } from '@openmrs/react-components';
import HomePage from './components/pages/HomePage';

const store = createStore();

const App = props => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route
            component={LoginPage}
            path="/login"
          />
          <AuthenticatedRoute
            component={HomePage}
            path="/"
          />
        </Switch>
      </BrowserRouter>
    </Provider>
  );

};

export default App;
