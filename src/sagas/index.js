/* eslint-disable no-constant-condition */

import { takeEvery, takeLatest } from 'redux-saga';
import { take, put, call, fork, select } from 'redux-saga/effects';
import { api, history, local } from 'services';
import * as actions from 'actions';
import { getUserId, getCurrentRoom } from 'reducers/selectors';

const { user, userRooms, rooms, roomMessages, messagePost, roomRemoveUser, roomSearch, roomJoin } = actions;

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
  else
    yield put(user.failure(error))
  return {response, error}
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

function* removeUserFromRoom(roomId, userId) {
  yield put(roomRemoveUser.request())
  const {response, error} = yield call(api.removeUserFromRoom, roomId, userId)
  if(response)
    yield put(roomRemoveUser.success(response))
  else
    yield put(roomRemoveUser.failure(error))
}

function* fetchRoomsSearch(query) {
  yield put(roomSearch.request())
  const {response, error} = yield call(api.fetchRooms, query)
  if(response)
    yield put(roomSearch.success(response))
  else
    yield put(roomSearch.failure(error))
}

function* joinRoom(roomId) {
  yield put(roomJoin.request())
  const userId = yield select(getUserId)
  const {response, error} = yield call(api.addRoomToUser, userId, roomId)
  if(response)
    yield put(roomJoin.success(response))
  else
    yield put(roomJoin.failure(error))
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
    const currentId = yield select(getCurrentRoom)
    if (roomId == currentId) {
      yield call(fetchRoomMessages, roomId)
    }
  }
}

function* watchLeaveRoom() {
  while(true) {
    const {roomId} = yield take(actions.LEAVE_ROOM)
    const userId = yield select(getUserId)
    yield call(removeUserFromRoom, roomId, userId)
    yield fork(fetchUserRooms)
    yield history.push('/')
  }
}

function* watchSearchRoom() {
  while(true) {
    const {query} = yield take(actions.SEARCH_ROOM)
    yield fork(fetchRoomsSearch, query)
  }
}

function* watchJoinRoom() {
  while(true) {
    const {uri, roomId} = yield take(actions.JOIN_ROOM)
    yield call(joinRoom, roomId)
    yield call(fetchUserRooms)
    yield history.push(`/${uri}`)
  }
}

function* watchSelectRoom() {
  while(true) {
    const {roomId, roomName} = yield take(actions.SELECT_ROOM)
    yield call(fetchRoomMessages, roomId)
    yield history.push(`/${roomName}`)
  }
}

function* watchNavigate() {
  while(true) {
    yield take(actions.NAVIGATE_HOME)
    yield history.push('/')
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
      const {response, error} = yield call(fetchRooms)
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

function* watchLoginByToken() {
  while(true) {
    const {token} = yield take(actions.LOGIN_USER_BY_TOKEN)
    yield call(setToken, token)
    const {response, error} = yield call(fetchUser)
    console.log(response)
    if(response)
      history.push('/')
  }
}

function* watchLogout() {
  while(true) {
    yield take(actions.LOGOUT_USER)
    yield call(signOutUser)
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
    fork(watchSearchRoom),
    fork(watchLeaveRoom),
    fork(watchJoinRoom),
    fork(watchNavigate),
    fork(watchLoadRoomMessages),
    fork(watchPostMessage),
    fork(watchLoginByToken),
    fork(watchLogout),
  ]
}
