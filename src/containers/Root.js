import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import crateRoutes from 'routes';


export default class Root extends Component {
  render() {
    const { store } = this.props;

    const routes = crateRoutes(store);
    const history = syncHistoryWithStore(browserHistory, store);

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <Provider store={store}>
          <Router history={history}>
            {routes}
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}
