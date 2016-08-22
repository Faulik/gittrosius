/* eslint-disable no-constant-condition */

import { takeEvery, takeLatest } from 'redux-saga';
import { take, put, call, fork, select } from 'redux-saga/effects';
import { api, history, local } from 'services';
import * as actions from 'actions';
import { getUserId } from 'reducers/selectors';

const { user, userRooms, rooms, roomMessages, messagePost } = actions;


// Subroutines

function* signOutUser() {
  yield put(actions.signOut())
  yield local.removeAuthToken()
  yield history.push('/login')
}

function* setToken(token) {
  yield call(local.setAuthToken, token)
  yield put(actions.setUserAppTokenSuccess())
}

function* fetchUser() {
  yield put(user.request())
  const {response, error} = yield call(api.fetchUser)
  if(response)
    yield put(user.success(response))
  else {
    yield put(user.failure(error))
    yield call(signOutUser)
  }
}

function* fetchUserRooms() {
  yield call(fetchUser)
  const userId = yield select(getUserId)
  yield put(userRooms.request())
  const {response, error} = yield call(api.fetchUserRooms, userId)
  if(response)
    yield put(userRooms.success(response))
  else
    yield put(userRooms.failure(error))
}

function* fetchRooms() {
  yield call(fetchUser)
  yield put(rooms.request())
  const {response, error} = yield call(api.fetchRooms)
  if(response)
    yield put(rooms.success(response))
  else
    yield put(rooms.failure(error))
  return {response, error}
}

function* fetchRoomMessages(roomId) {
  yield put(roomMessages.request())
  const {response, error} = yield call(api.fetchRoomMessages, roomId)
  if(response)
    yield put(roomMessages.success(response))
  else
    yield put(roomMessages.failure(error))
}

function* postMessage(roomId, text) {
  yield put(messagePost.request())
  const {response, error} = yield call(api.postMessage, roomId, text)
  if(response)
    yield put(messagePost.success(response))
  else
    yield put(messagePost.failure(error))
}

//  Watchers

function* watchSetUserAppToken() {
  while(true) {
    const {token} = yield take(actions.SET_USER_APP_TOKEN)
    yield fork(setToken, token)
  }
}

function* watchLoadUserRooms() {
  while(true) {
    yield take(actions.LOAD_USER_ROOMS)
    yield call(fetchUserRooms)
  }
}

function* watchLoadRooms() {
  while(true) {
    yield take(actions.LOAD_ROOMS)
    yield call(fetchRooms)
  }
}

function* watchLoadRoomMessages() {
  while(true) {
    const {roomId} = yield take(actions.LOAD_ROOM_MESSAGES)
    yield call(fetchRoomMessages, roomId)
  }
}

function* watchSetUserAppTokenSuccess() {
  while(true) {
    const {token} = yield take(actions.SET_USER_APP_TOKEN_SUCCESS)
    yield call(fetchUser)
  }
}

function* watchUpdateRoom() {
  while(true) {
    const {roomId, room} = yield take(actions.UPDATE_ROOM)
    yield call(fetchRoomMessages, roomId)
  }
}

function* watchSelectRoom() {
  while(true) {
    const {roomId, roomName} = yield take(actions.SELECT_ROOM)
    yield call(fetchRoomMessages, roomId)
    yield history.push(`/${roomName}`)
  }
}

function* watchCheckRoom() {
  while(true) {
    let room
    const {name} = yield take(actions.CHECK_ROOM)
    const rooms = yield select((state) => state.rooms.joined)
    room = rooms.find((room) => room.name === name)
    if (room) {
      yield put(actions.selectRoom(room.id, room.name))
      yield call(fetchRoomMessages, room.id)
    } else {
      const { response, error} = yield call(fetchRooms)
      if (response) {
        room = response.find((room) => room.name === name)
        if (room) {
          yield put(actions.selectRoom(room.id, room.name))
          yield call(fetchRoomMessages, room.id)
        } else {
          history.push('/')
        }
      } else {
        yield call(signOutUser)
      }
    }
  }
}

function* watchPostMessage() {
  while(true) {
    const {roomId, text} = yield take(actions.POST_MESSAGE)
    yield call(postMessage, roomId, text)
  }
}

export default function* rootSaga() {
  yield [
    fork(watchSetUserAppToken),
    fork(watchSetUserAppTokenSuccess),
    fork(watchLoadUserRooms),
    fork(watchLoadRooms),
    fork(watchSelectRoom),
    fork(watchCheckRoom),
    fork(watchUpdateRoom),
    fork(watchLoadRoomMessages),
    fork(watchPostMessage),
  ]
}
