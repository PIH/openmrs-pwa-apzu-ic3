import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import createStore from './store';
import { AuthenticatedRoute, LoginPage } from '@openmrs/react-components';
import HomePage from './components/pages/HomePage';
import InfoPatient from './components/pages/InfoPatient';
import SearchPatient from './components/pages/SearchPatient';
import BloodPressureQueue from "./screening/bloodPressure/BloodPressureQueue";
import NutritionQueue from "./screening/nutrition/NutritionQueue";

const store = createStore();

const App = props => {

  const contextPath  = (typeof process !== 'undefined' && typeof process.env !== 'undefined' &&
    typeof process.env.REACT_APP_CONTEXT_PATH  !== 'undefined' && process.env.REACT_APP_CONTEXT_PATH !== null) ?
    process.env.REACT_APP_CONTEXT_PATH : "/";

  return (
    <Provider store={store}>
      <BrowserRouter basename={contextPath}>
        <Switch>
          <Route
            component={LoginPage}
            path="/login"
          />
          <AuthenticatedRoute
            component={HomePage}
            exact path="/"
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
            />
        </Switch>
      </BrowserRouter>
    </Provider>
  );

};

export default App;
