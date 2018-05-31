import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import createStore from './store';
import LoginPage from './components/pages/LoginPage';

const store = createStore();

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Route path="/" component={LoginPage}/>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
