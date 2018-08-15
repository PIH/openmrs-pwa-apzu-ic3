import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';
import { AuthenticatedRoute, LoginPage, LoadingView } from '@openmrs/react-components';
import './App.css';
import setupStoreAndPersistor, { history } from './store';
import HomePage from './home/HomePage';
import InfoPatient from './patient/PatientInfo';
import SearchPatient from './search/SearchPatient';
import CheckInQueue from './checkin/CheckInQueue';
import CheckInTabs from './checkin/CheckInTabs';
import CheckInPage from './checkin/CheckInPage';
import NursePage from './screening/nurse/NursePage';
import CheckInComplete from './checkin/CheckInComplete';
import Header from './header/Header';
import BloodPressureQueue from "./screening/bloodPressure/BloodPressureQueue";
import BloodPressureForm from './screening/bloodPressure/BloodPressureForm';
import NutritionQueue from "./screening/nutrition/NutritionQueue";
import NutritionForm from "./screening/nutrition/NutritionForm";
import NurseQueue from "./screening/nurse/NurseQueue";
import ActiveVisitsQueue from "./visit/ActiveVisits";
import CompletedVisitsQueue from "./visit/CompletedVisits";
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/lib/integration/react';

const { store, persistor } = setupStoreAndPersistor();


const App = props => {

  const AuthenticatedLayout = props => {
    return (
      <div id="outer-container" className="ag-theme-material">
        <ReduxToastr/>
        <Header />
        <main id="page-wrap">
          <AuthenticatedRoute {...props} />
        </main>
      </div>
    );
  };

  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingView />} persistor={persistor}>
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
              component={CheckInTabs}
              path="/checkin/checkInTabs"
              redirectOnLogin="/"
            />
            <AuthenticatedLayout
              component={CheckInQueue}
              path="/checkin/checkInQueue"
              redirectOnLogin="/"
            />
            <AuthenticatedLayout
              component={CheckInPage}
              path="/checkin/checkInPage"
              redirectOnLogin="/"
            />
            <AuthenticatedLayout
              component={CheckInComplete}
              path="/checkin/checkInComplete"
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
            <AuthenticatedLayout
              component={ActiveVisitsQueue}
              path="/visit/queue"
              redirectOnLogin="/"
            />
            <AuthenticatedLayout
              component={CompletedVisitsQueue}
              path="/visit/completedVisits"
              redirectOnLogin="/"
            />
            <AuthenticatedLayout
              component={NurseQueue}
              path="/screening/nurse/queue"
              redirectOnLogin="/"
            />
            <AuthenticatedLayout
              component={NursePage}
              path="/nurse/nursePage"
              redirectOnLogin="/"
            />
          </Switch>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );

};

export default App;
