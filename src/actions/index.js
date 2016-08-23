export const SET_USER_APP_TOKEN = 'SET_USER_APP_TOKEN'
export const SET_USER_APP_TOKEN_SUCCESS = 'SET_USER_APP_TOKEN_SUCCESS'

export const LOGIN_USER_BY_TOKEN = 'LOGIN_USER_BY_TOKEN'
export const SIGN_OUT = 'SIGN_OUT'
export const LOGOUT_USER = 'LOGOUT_USER'

export const CHECK_ROOM = 'CHECK_ROOM'
export const SELECT_ROOM = 'SELECT_ROOM'
export const LEAVE_ROOM = 'LEAVE_ROOM'
export const SEARCH_ROOM = 'SEARCH_ROOM'
export const JOIN_ROOM = 'JOIN_ROOM'
export const UPDATE_ROOM = 'UPDATE_ROOM'

export const NAVIGATE_HOME = 'NAVIGATE_HOME'

export const LOAD_USER = 'LOAD_USER'
export const LOAD_ROOMS = 'LOAD_ROOMS'
export const LOAD_USER_ROOMS = 'LOAD_USER_ROOMS'
export const LOAD_ROOM_MESSAGES = 'LOAD_ROOM_MESSAGES'

export const POST_MESSAGE = 'POST_MESSAGE'

const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
		acc[type] = `${base}_${type}`
		return acc
	}, {})
}

export const USER = createRequestTypes('USER')
export const USER_ROOMS = createRequestTypes('USER_ROOMS')
export const ROOMS = createRequestTypes('ROOMS')
export const ROOM_MESSAGES = createRequestTypes('ROOM_MESSAGES')
export const ROOM_REMOVE_USER = createRequestTypes('ROOM_REMOVE_USER')
export const ROOM_SEARCH = createRequestTypes('ROOM_SEARCH')
export const ROOM_JOIN = createRequestTypes('ROOM_JOIN')
export const MESSAGE_POST = createRequestTypes('MESSAGE_POST')

function action(type, payload = {}) {
  return {type, ...payload}
}

export const user = {
  request: () => action(USER.REQUEST),
  success: (response) => action(USER.SUCCESS, {response: response[0]}),
  failure: (error) => action(USER.FAILURE, {error}),
}

export const userRooms = {
  request: () => action(USER_ROOMS.REQUEST),
  success: (response) => action(USER_ROOMS.SUCCESS, {response}),
  failure: (error) => action(USER_ROOMS.FAILURE, {error}),
}

export const rooms = {
  request: () => action(ROOMS.REQUEST),
  success: (response) => action(ROOMS.SUCCESS, {response}),
  failure: (error) => action(ROOMS.FAILURE, {error}),
}

export const roomMessages = {
  request: () => action(ROOM_MESSAGES.REQUEST),
  success: (response) => action(ROOM_MESSAGES.SUCCESS, {response}),
  failure: (error) => action(ROOM_MESSAGES.FAILURE, {error}),
}

export const messagePost = {
  request: () => action(MESSAGE_POST.REQUEST),
  success: (response) => action(MESSAGE_POST.SUCCESS, {response}),
  failure: (error) => action(MESSAGE_POST.FAILURE, {error}),
}

export const roomRemoveUser = {
  request: () => action(ROOM_REMOVE_USER.REQUEST),
  success: (response) => action(ROOM_REMOVE_USER.SUCCESS, {response}),
  failure: (error) => action(ROOM_REMOVE_USER.FAILURE, {error}),
}

export const roomSearch = {
  request: () => action(ROOM_SEARCH.REQUEST),
  success: (response) => action(ROOM_SEARCH.SUCCESS, {response}),
  failure: (error) => action(ROOM_SEARCH.FAILURE, {error}),
}

export const roomJoin = {
  request: () => action(ROOM_JOIN.REQUEST),
  success: (response) => action(ROOM_JOIN.SUCCESS, {response}),
  failure: (error) => action(ROOM_JOIN.FAILURE, {error}),
}

export const loginUserByToken = (token) => action(LOGIN_USER_BY_TOKEN, {token})

export const setUserAppToken = (token) => action(SET_USER_APP_TOKEN, {token})
export const setUserAppTokenSuccess = () => action(SET_USER_APP_TOKEN_SUCCESS)

export const updateRoom = (roomId, room) => action(UPDATE_ROOM, {roomId, room})
export const leaveRoom = (roomId) => action(LEAVE_ROOM, {roomId})
export const checkRoom = (name) => action(CHECK_ROOM, {name})
export const joinRoom = (uri, roomId) => action(JOIN_ROOM, {uri, roomId})
export const searchRoom = (query) => action(SEARCH_ROOM, {query})
export const selectRoom= (roomId, roomName) => action(SELECT_ROOM, {roomId, roomName})

export const postMessage= (roomId, text) => action(POST_MESSAGE, {roomId, text})

export const navigateHome = () => action(NAVIGATE_HOME)

export const loadUser = () => action(LOAD_USER)
export const loadUserRooms = () => action(LOAD_USER_ROOMS)
export const loadRooms = () => action(LOAD_ROOMS)
export const loadRoomMessages = (roomId) => action(LOAD_ROOM_MESSAGES, {roomId})

export const signOut = () => action(SIGN_OUT)
export const logoutUser = () => action(LOGOUT_USER)
