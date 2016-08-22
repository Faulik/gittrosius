import 'babel-polyfill'

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import disableRouterWarnings from 'utils/disableRouterWarnings';
disableRouterWarnings()

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import configureStore from 'store/configureStore';
import Root from 'containers/Root';
import rootSaga from 'sagas'

import 'flexboxgrid';
import 'styles/application.scss';

export const store = configureStore();
store.runSaga(rootSaga)

render(
  <Root
    store={ store }
  />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('containers/Root', () => {
    const RootContainer = require('containers/Root').default;

    render(
      <RootContainer
        store={ store }
      />,
      document.getElementById('root')
    );
  });
}
