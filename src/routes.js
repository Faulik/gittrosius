import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { local } from 'services';
import { setUserAppToken, checkRoom } from 'actions';
import AppWrapper from 'containers/AppWrapper';
import Login from 'components/Login/LoginContainer';
import Dashboard from 'components/Dashboard/DashboardContainer';
import Chat from 'components/Dashboard/ChatContainer';
import Home from 'components/Dashboard/HomeContainer';

export default (store) => {
  const requireAuthentication = (nextState, replace) => {
    if (store.getState().user.isAuthenticated) {
      return true;
    } else if (local.hasAuthToken()) {
      store.dispatch(setUserAppToken(local.getAuthToken()));
    } else {
      replace({
        pathname: '/login'
      })
    }
  }

  return(
    <Route path='/'>
      <Route path='login' component={Login}/>
      <Route component={AppWrapper} onEnter={requireAuthentication}>
        <Route component={Dashboard}>
          <IndexRoute component={Home}></IndexRoute>
          <Route path=':repo(/:channel)' component={Chat}/>
        </Route>
      </Route>
    </Route>
  )
};
