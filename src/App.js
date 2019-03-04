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
import TbTestResultSummaryAndForm from "./screening/tbTest/TbTestSummaryAndForm";
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
              fullViewHeight
              path="/"
            />
            <Layout
              component={SearchPatient}
              fullViewHeight
              path="/searchPatient"
              redirectOnLogin="/"
            />
            <Layout
              component={CheckInQueue}
              fullViewHeight
              path="/checkin/checkInQueue"
              redirectOnLogin="/"
            />
            <Layout
              component={CheckInPage}
              noScroll
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
              fullViewHeight
              path="/screening/bloodPressure/queue"
              redirectOnLogin="/"
            />
            <Layout
              component={BloodPressureSummaryAndForm}
              noScroll
              path="/screening/bloodPressure/form"
              redirectOnLogin="/"
            />
            <Layout
              component={NutritionQueue}
              fullViewHeight
              path="/screening/nutrition/queue"
              redirectOnLogin="/"
            />
            <Layout
              component={NutritionSummaryAndForm}
              noScroll
              path="/screening/nutrition/form"
              redirectOnLogin="/"
            />
            <Layout
              component={TbQueue}
              fullViewHeight
              path="/screening/tb/queue"
              redirectOnLogin="/"
            />
            <Layout
              component={TbTestResultSummaryAndForm}
              noScroll
              path="/screening/tb-test/form"
              redirectOnLogin="/"
            />
            <Layout
              component={TbSummaryAndForm}
              noScroll
              path="/screening/tb/form"
              redirectOnLogin="/"
            />
            <Layout
              component={ AdherenceQueue }
              fullViewHeight
              path="/screening/adherence/queue"
              redirectOnLogin="/"
            />
            <Layout
              component={AdherenceSummaryAndForm}
              noScroll
              path="/screening/adherence/form"
              redirectOnLogin="/"
            />
            <Layout
              component={HtcQueue}
              fullViewHeight
              path="/screening/htc/queue"
              redirectOnLogin="/"
            />
            <Layout
              component={HtcSummaryAndForm}
              noScroll
              path="/screening/htc/form"
              redirectOnLogin="/"
            />
            <Layout
              component={VLQueue}
              fullViewHeight
              path="/screening/vl/queue"
              redirectOnLogin="/"
            />
            <Layout
              component={VLSummaryAndForm}
              noScroll
              path="/screening/vl/form"
              redirectOnLogin="/"
            />
            <Layout
              component={EidQueue}
              fullViewHeight
              path="/screening/eid/queue"
              redirectOnLogin="/"
            />
            <Layout
              component={EidSummaryAndForm}
              noScroll
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
              fullViewHeight
              path="/visit/queue"
              redirectOnLogin="/"
            />
            <Layout
              component={CompletedVisitsQueue}
              fullViewHeight
              path="/visit/completedVisits"
              redirectOnLogin="/"
            />
            <Layout
              component={NurseQueue}
              fullViewHeight
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
              noScroll
              path="/screening/clinician/form"
              redirectOnLogin="/"
            />
            <Layout
              component={ClinicianQueue}
              fullViewHeight
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
