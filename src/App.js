import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import createStore, { history } from './store';
import { AuthenticatedRoute, LoginPage } from '@openmrs/react-components';
import HomePage from './components/pages/HomePage';
import InfoPatient from './components/pages/InfoPatient';
import SearchPatient from './components/pages/SearchPatient';
import BloodPressureQueue from "./screening/bloodPressure/BloodPressureQueue";
import BloodPressureForm from './screening/bloodPressure/BloodPressureForm';
import NutritionQueue from "./screening/nutrition/NutritionQueue";
import NutritionForm from "./screening/nutrition/NutritionForm"
import { ConnectedRouter } from 'connected-react-router';

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
            path="/screening/bloodPressure/queue"
            redirectOnLogin="/"
          />
          <AuthenticatedRoute
            component={BloodPressureForm}
            path="/screening/bloodPressure/form"
            redirectOnLogin="/"
          />
          <AuthenticatedRoute
            component={NutritionQueue}
            path="/screening/nutrition/queue"
            redirectOnLogin="/"
          />
          <AuthenticatedRoute
            component={NutritionForm}
            path="/screening/nutrition/form"
            redirectOnLogin="/"
          />
          <AuthenticatedRoute
            component={InfoPatient}
            path="/infoPatient"
            redirectOnLogin="/"
          />
        </Switch>
      </ConnectedRouter>
    </Provider>
  );

};

export default App;
