import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-material.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import 'react-widgets/dist/css/react-widgets.css';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { systemActions } from '@openmrs/react-components';
import reduxStore from './store';
import './index.css';
import App from './App';
import {unregister} from './registerServiceWorker';
//import register from './registerServiceWorker';


const onUpdateSW = () => {
  const { store } = reduxStore;
  store.dispatch(systemActions.updateServiceworker());
}

ReactDOM.render(<App />, document.getElementById('root'));
//register(onUpdateSW);
unregister();
