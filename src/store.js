/* * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
import { createBrowserHistory } from 'history';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { reducer as reduxFormReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { sagas as openmrsSagas, reducers as openmrsReducers } from '@openmrs/react-components';
import bloodPressureQueueReducer from './screening/bloodPressure/bloodPressureQueueReducer';
import nutritionQueueReducer from "./screening/nutrition/nutritionQueueReducer";
import patientSelectedReducer from './patient/patientSelectedReducer';
import checkInSagas from './checkin/checkInSagas';

// fyi, connected-react-router docs:
// https://github.com/supasate/connected-react-router

const contextPath  = (typeof process !== 'undefined' && typeof process.env !== 'undefined' &&
  typeof process.env.REACT_APP_CONTEXT_PATH  !== 'undefined' && process.env.REACT_APP_CONTEXT_PATH !== null) ?
  process.env.REACT_APP_CONTEXT_PATH : "/";

export const history = createBrowserHistory({
  basename: contextPath
});

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  routerMiddleware(history),
  sagaMiddleware
];

const rootReducer = combineReducers({
  openmrs: openmrsReducers,
  form: reduxFormReducer,
  toastr: toastrReducer,
  selected: patientSelectedReducer,
  screening: combineReducers({
    bloodPressureQueue: bloodPressureQueueReducer,
    nutritionQueue: nutritionQueueReducer
  })
});

const rootSagas = function* () {
  yield all([
    openmrsSagas(),
    checkInSagas()
  ]);
};

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}

export default () => {
  const store = createStore(
    connectRouter(history)(rootReducer),
    compose(
      applyMiddleware(...middlewares),
      window.devToolsExtension && process.env.NODE_ENV !== 'production'
        ? window.devToolsExtension() : f => f,
    ));
  sagaMiddleware.run(rootSagas);
  return store;
};
