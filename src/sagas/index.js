/* eslint-disable no-constant-condition */

import { takeEvery, takeLatest } from 'redux-saga';
import { take, put, call, fork, select } from 'redux-saga/effects';
import { api, history, local } from 'services';
import * as actions from 'actions';

const { user } = actions;


// Subroutines
//
function* setToken(token) {
  yield call(local.setAuthToken, token)
  yield put(actions.setUserAppTokenSuccess())
}

function* fetchUser() {
  yield put( user.request() )
    const {response, error} = yield call(api.fetchUser)
  if(response)
    yield put( user.success(response) )
  else
    yield put( user.failure(error) )
}

//  Watchers

function* watchSetUserAppToken() {
  while(true) {
    const {token} = yield take(actions.SET_USER_APP_TOKEN)
    yield fork(setToken, token)
  }
}

function* watchSetUserAppTokenSuccess() {
  while(true) {
    const {token} = yield take(actions.SET_USER_APP_TOKEN_SUCCESS)
    yield call(fetchUser)
    yield history.push('/')
  }
}

export default function* rootSaga() {
  yield [
    fork(watchSetUserAppToken),
    fork(watchSetUserAppTokenSuccess)
  ]
}
