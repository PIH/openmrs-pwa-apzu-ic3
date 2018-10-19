import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { Logout, LoadingView } from '@openmrs/react-components';
import { library as fontAwesomeLibrary } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
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
import setupStoreAndPersistor, { history } from './store';
import Layout from './layout/Layout';
import LoginPage from './login/LoginPage';
import HomePage from './home/HomePage';
import InfoPatient from './patient/PatientInfo';
import SearchPatient from './search/SearchPatient';
import CheckInQueue from './checkin/CheckInQueue';
import CheckInTabs from './checkin/CheckInTabs';
import CheckInPage from './checkin/CheckInPage';
import NursePage from './screening/nurse/NursePage';
import CheckInComplete from './checkin/CheckInComplete';
import BloodPressureQueue from "./screening/bloodPressure/BloodPressureQueue";
import BloodPressureForm from './screening/bloodPressure/BloodPressureForm';
import NutritionQueue from "./screening/nutrition/NutritionQueue";
import NutritionForm from "./screening/nutrition/NutritionForm";
import AdherenceQueue from "./screening/adherence/AdherenceQueue";
import AdherenceForm from "./screening/adherence/AdherenceForm";
import HtcQueue from "./screening/htc/HtcQueue";
import HtcPage from "./screening/htc/HtcPage";
import HtcForm from "./screening/htc/HtcForm";
import VLQueueTabs from "./screening/vl/VLQueueTabs";
import VLQueue from "./screening/vl/VLQueue";
import VLQueueComplete from "./screening/vl/VLQueueComplete";
import VLForm from "./screening/vl/VLForm";
import EidQueueTabs from './screening/eid/EidQueueTabs';
import EidQueue from './screening/eid/EidQueue';
import EidQueueComplete from './screening/eid/EidQueueComplete';
import EidForm from './screening/eid/EidForm';
import NurseQueue from "./screening/nurse/NurseQueue";
import ActiveVisitsQueue from "./visit/ActiveVisits";
import CompletedVisitsQueue from "./visit/CompletedVisits";
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/lib/integration/react';

const { store, persistor } = setupStoreAndPersistor();

fontAwesomeLibrary.add(faBars, faPills, faUser, faMapMarker, faCog, faKey, faSignOutAlt, faRibbon, faVial, faChild, faSearch, faNotesMedical, faHeart, faUserMd, faLemon, faHome);

const App = props => {

  return (
    <Provider store={store}>

      <PersistGate loading={<LoadingView />} persistor={persistor}>
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
              component={CheckInTabs}
              path="/checkin/checkInTabs"
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
              component={BloodPressureForm}
              path="/screening/bloodPressure/form"
              redirectOnLogin="/"
            />
            <Layout
              component={NutritionQueue}
              path="/screening/nutrition/queue"
              redirectOnLogin="/"
            />
            <Layout
              component={NutritionForm}
              path="/screening/nutrition/form"
              redirectOnLogin="/"
            />
            <Layout
              component={ AdherenceQueue }
              path="/screening/adherence/queue"
              redirectOnLogin="/"
            />
            <Layout
              component={ AdherenceForm }
              path="/screening/adherence/form"
              redirectOnLogin="/"
            />
            <Layout
              component={HtcQueue}
              path="/screening/htc/queue"
              redirectOnLogin="/"
            />
            <Layout
              component={HtcPage}
              path="/screening/htc/page"
              redirectOnLogin="/"
            />
            <Layout
              component={HtcForm}
              path="/screening/htc/form"
              redirectOnLogin="/"
            />
            <Layout
              component={VLQueueTabs}
              path="/screening/vl/tabs"
              redirectOnLogin="/"
            />
            <Layout
              component={VLQueue}
              path="/screening/vl/queue"
              redirectOnLogin="/"
            />
            <Layout
              component={VLQueueComplete}
              path="/screening/vl/complete"
              redirectOnLogin="/"
            />
            <Layout
              component={VLForm}
              path="/screening/vl/form"
              redirectOnLogin="/"
            />
            <Layout
              component={EidQueueTabs}
              path="/screening/eid/tabs"
              redirectOnLogin="/"
            />
            <Layout
              component={EidQueue}
              path="/screening/eid/queue"
              redirectOnLogin="/"
            />
            <Layout
              component={EidQueueComplete}
              path="/screening/eid/complete"
              redirectOnLogin="/"
            />
            <Layout
              component={EidForm}
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
          </Switch>
        </ConnectedRouter>
      </PersistGate>

    </Provider>
  );

};

export default App;
