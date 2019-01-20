import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import {Logout, LoadingView} from '@openmrs/react-components';
import { library as fontAwesomeLibrary } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faEdit,
  faUser,
  faPills,
  faMapMarker,
  faCog,
  faKey,
  faSignOutAlt,
  faRibbon,
  faVial,
  faChild,
  faSearch,
  faNotesMedical,
  faHeart,
  faUserMd,
  faLemon,
  faHome
} from '@fortawesome/free-solid-svg-icons';
import './App.css';
import reduxStore, { history } from './store';
import Layout from './layout/Layout';
import LoginPage from './login/LoginPage';
import HomePage from './home/HomePage';
import InfoPatient from './patient/PatientInfo';
import SearchPatient from './search/SearchPatient';
import CheckInQueue from './checkin/CheckInQueue';
import CheckInPage from './checkin/CheckInPage';
import NursePage from './screening/nurse/NursePage';
import ClinicianSummaryAndForm from './screening/clinician/ClinicianSummaryAndForm';
import ClinicianQueue from './screening/clinician/ClinicianQueue';
import CheckInComplete from './checkin/CheckInComplete';
import BloodPressureQueue from "./screening/bloodPressure/BloodPressureQueue";
import NutritionQueue from "./screening/nutrition/NutritionQueue";
import TbQueue from "./screening/tb/TbQueue";
import AdherenceQueue from "./screening/adherence/AdherenceQueue";
import AdherenceSummaryAndForm from "./screening/adherence/AdherenceSummaryAndForm";
import HtcQueue from "./screening/htc/HtcQueue";
import VLQueue from "./screening/vl/VLQueue";
import VLSummaryAndForm from "./screening/vl/VLSummaryAndForm";
import EidQueue from './screening/eid/EidQueue';
import EidSummaryAndForm from './screening/eid/EidSummaryAndForm';
import NurseQueue from "./screening/nurse/NurseQueue";
import ActiveVisitsQueue from "./visit/ActiveVisits";
import CompletedVisitsQueue from "./visit/CompletedVisits";
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/lib/integration/react';
import BloodPressureSummaryAndForm from "./screening/bloodPressure/BloodPressureSummaryAndForm";
import NutritionSummaryAndForm from "./screening/nutrition/NutritionSummaryAndForm";
import TbTestResultSummaryAndForm from "./screening/tbTest/TbTestResultSummaryAndForm";
import TbSummaryAndForm from "./screening/tb/TbSummaryAndForm";
import HtcSummaryAndForm from "./screening/htc/HtcSummaryAndForm";
import UserSession from "./login/UserSession";
import ScreeningList from './screening/ScreeningList';

const { store, persistor } = reduxStore;

fontAwesomeLibrary.add(faBars, faEdit, faPills, faUser, faMapMarker, faCog, faKey, faSignOutAlt, faRibbon, faVial, faChild, faSearch, faNotesMedical, faHeart, faUserMd, faLemon, faHome);

const App = props => {

  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingView />} persistor={persistor}>
        <UserSession/>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              component={LoginPage}
              path="/login"
            />
            <Route
              component={Logout}
              path="/logout"
            />
            <Layout
              component={HomePage}
              exact
              path="/"
            />
            <Layout
              component={SearchPatient}
              path="/searchPatient"
              redirectOnLogin="/"
            />
            <Layout
              component={CheckInQueue}
              path="/checkin/checkInQueue"
              redirectOnLogin="/"
            />
            <Layout
              component={CheckInPage}
              path="/checkin/checkInPage"
              redirectOnLogin="/"
            />
            <Layout
              component={CheckInComplete}
              path="/checkin/checkInComplete"
              redirectOnLogin="/"
            />
            <Layout
              component={BloodPressureQueue}
              path="/screening/bloodPressure/queue"
              redirectOnLogin="/"
            />
            <Layout
              component={BloodPressureSummaryAndForm}
              path="/screening/bloodPressure/form"
              redirectOnLogin="/"
            />
            <Layout
              component={NutritionQueue}
              path="/screening/nutrition/queue"
              redirectOnLogin="/"
            />
            <Layout
              component={NutritionSummaryAndForm}
              path="/screening/nutrition/form"
              redirectOnLogin="/"
            />
            <Layout
              component={TbQueue}
              path="/screening/tb/queue"
              redirectOnLogin="/"
            />
            <Layout
              component={TbTestResultSummaryAndForm}
              path="/screening/tb-test/form"
              redirectOnLogin="/"
            />
            <Layout
              component={TbSummaryAndForm}
              path="/screening/tb/form"
              redirectOnLogin="/"
            />
            <Layout
              component={ AdherenceQueue }
              path="/screening/adherence/queue"
              redirectOnLogin="/"
            />
            <Layout
              component={AdherenceSummaryAndForm}
              path="/screening/adherence/form"
              redirectOnLogin="/"
            />
            <Layout
              component={HtcQueue}
              path="/screening/htc/queue"
              redirectOnLogin="/"
            />
            <Layout
              component={HtcSummaryAndForm}
              path="/screening/htc/form"
              redirectOnLogin="/"
            />
            <Layout
              component={VLQueue}
              path="/screening/vl/queue"
              redirectOnLogin="/"
            />
            <Layout
              component={VLSummaryAndForm}
              path="/screening/vl/form"
              redirectOnLogin="/"
            />
            <Layout
              component={EidQueue}
              path="/screening/eid/queue"
              redirectOnLogin="/"
            />
            <Layout
              component={EidSummaryAndForm}
              path="/screening/eid/form"
              redirectOnLogin="/"
            />
            <Layout
              component={InfoPatient}
              path="/infoPatient"
              redirectOnLogin="/"
            />
            <Layout
              component={ActiveVisitsQueue}
              path="/visit/queue"
              redirectOnLogin="/"
            />
            <Layout
              component={CompletedVisitsQueue}
              path="/visit/completedVisits"
              redirectOnLogin="/"
            />
            <Layout
              component={NurseQueue}
              path="/screening/nurse/queue"
              redirectOnLogin="/"
            />
            <Layout
              component={NursePage}
              path="/screening/nurse/nursePage"
              redirectOnLogin="/"
            />
            <Layout
              component={ClinicianSummaryAndForm}
              path="/screening/clinician/form"
              redirectOnLogin="/"
            />
            <Layout
              component={ClinicianQueue}
              path="/screening/clinician/queue"
              redirectOnLogin="/"
            />
            <Layout
              component={ScreeningList}
              path="/screening"
              redirectOnLogin="/"
            />
          </Switch>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );

};

export default App;
