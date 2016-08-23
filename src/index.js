import 'babel-polyfill';

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
import disableRouterWarnings from 'utils/disableRouterWarnings';


import React from 'react';
import { render } from 'react-dom';

import configureStore from 'store/configureStore';
import Root from 'containers/Root';
import rootSaga from 'sagas';

import 'flexboxgrid';
import 'styles/application.scss';

injectTapEventPlugin();
disableRouterWarnings();

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore();

store.runSaga(rootSaga);

render(
  <Root
    store={store}
  />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('containers/Root', () => {
    // eslint-disable-next-line global-require
    const RootContainer = require('containers/Root').default;

    render(
      <RootContainer
        store={store}
      />,
      document.getElementById('root')
    );
  });
}
