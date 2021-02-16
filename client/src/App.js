import React, { Component } from 'react';

import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import { Login, Register, ForgetPass, Home, Modal, LinearProgressBar, App } from './components/';
import store from './store';

const mapStateToProp = ({ app }) => ({ theme: app.theme });
const AppWrapper = connect(
  mapStateToProp,
  {}
)(({ theme }) => {
  const palette = {
    type: theme,
    primary: {
      main: '#4f48ec',
    },
    secondary: {
      main: '#49d9f8',
    },
    success: {
      main: '#00e676',
    },
    info: {
      main: '#304ffe',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#fb8c00',
    },
  };
  const themeStore = createMuiTheme({ palette });
  return (
    <ThemeProvider theme={themeStore}>
      <Modal />
      <LinearProgressBar />
      <Router>
        <Switch>
          <Route path='/app'>
            <App />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/signup'>
            <Register />
          </Route>
          <Route path='/forgetpass'>
            <ForgetPass />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
});
class AppProvider extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppWrapper />
      </Provider>
    );
  }
}

export default AppProvider;
