import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import createStore, { history } from './store';
import { AuthenticatedRoute, LoginPage } from '@openmrs/react-components';
import HomePage from './components/pages/HomePage';
import InfoPatient from './components/pages/InfoPatient';
import SearchPatient from './components/pages/SearchPatient';
import CheckInQueue from './checkin/CheckInQueue';
import CheckInPage from './checkin/CheckInPage';
import Navigation from './components/pages/Navigation';
import BloodPressureQueue from "./screening/bloodPressure/BloodPressureQueue";
import BloodPressureForm from './screening/bloodPressure/BloodPressureForm';
import NutritionQueue from "./screening/nutrition/NutritionQueue";
import NutritionForm from "./screening/nutrition/NutritionForm";
import { ConnectedRouter } from 'connected-react-router';

const store = createStore();

const App = props => {

  const AuthenticatedLayout = props => {
    return (
      <div>
        <Navigation />
        <AuthenticatedRoute {...props} />
      </div>
    );
  };

  return (
    <Provider store={store}>    
      <ConnectedRouter history={history}>      
        <Switch>
          <Route
            component={LoginPage}
            path="/login"
          />
          <AuthenticatedLayout
            component={HomePage}
            exact
            path="/"
          />
          <AuthenticatedLayout
            component={SearchPatient}
            path="/searchPatient"
            redirectOnLogin="/"
          />
          <AuthenticatedLayout
            component={CheckInQueue}
            path="/checkin/checkinQueue"
            redirectOnLogin="/"
          />
          <AuthenticatedLayout
            component={CheckInPage}
            path="/checkin/checkinPage"
            redirectOnLogin="/"
          />
          <AuthenticatedLayout
            component={BloodPressureQueue}
            path="/screening/bloodPressure/queue"
            redirectOnLogin="/"
          />
          <AuthenticatedLayout
            component={BloodPressureForm}
            path="/screening/bloodPressure/form"
            redirectOnLogin="/"
          />
          <AuthenticatedLayout
            component={NutritionQueue}
            path="/screening/nutrition/queue"
            redirectOnLogin="/"
          />
          <AuthenticatedLayout
            component={NutritionForm}
            path="/screening/nutrition/form"
            redirectOnLogin="/"
          />
          <AuthenticatedLayout
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
