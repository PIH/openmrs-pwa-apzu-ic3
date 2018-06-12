import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import createStore, { history } from './store';
import { AuthenticatedRoute, LoginPage } from '@openmrs/react-components';
import { ConnectedRouter } from 'connected-react-router';
import HomePage from './components/pages/HomePage';
import InfoPatient from './components/pages/InfoPatient';
import SearchPatient from './components/pages/SearchPatient';
import BloodPressureQueue from "./screening/bloodPressure/BloodPressureQueue";
import NutritionQueue from "./screening/nutrition/NutritionQueue";
import SampleFormPage from './components/pages/SampleFormPage';

const store = createStore();

const App = props => {

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route
            component={LoginPage}
            path="/login"
          />
          <AuthenticatedRoute
            component={HomePage}
            exact
            path="/"
          />
          <AuthenticatedRoute
            component={SearchPatient}
            path="/searchPatient"
            redirectOnLogin="/"
          />
          <AuthenticatedRoute
            component={BloodPressureQueue}
            path="/screening/bloodPressureQueue"
            redirectOnLogin="/"
          />
          <AuthenticatedRoute
            component={NutritionQueue}
            path="/screening/nutritionQueue"
            redirectOnLogin="/"
          />
          <AuthenticatedRoute
            component={InfoPatient}
            path="/infoPatient"
            redirectOnLogin="/"
          />
          <AuthenticatedRoute
            component={SampleFormPage}
            path="/sampleFormPage"
            redirectOnLogin="/"
          />
        </Switch>
      </ConnectedRouter>
    </Provider>
  );

};

export default App;
