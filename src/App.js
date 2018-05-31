import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Header } from '@openmrs/react-components';
import { Login } from '@openmrs/react-components';
import './App.css';
import createStore from './store';

const store = createStore();

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Header />
          <Login />
        </div>
      </Provider>
    );
  }
}

export default App;
