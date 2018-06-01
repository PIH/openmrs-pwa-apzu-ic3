import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import createStore from './store';
import { AuthenticatedRoute, LoginPage } from '@openmrs/react-components';
import HomePage from './components/pages/HomePage';

const store = createStore();

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={LoginPage}/>
            <AuthenticatedRoute path="/" component={HomePage}/>
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
