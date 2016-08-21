export const SET_USER_APP_TOKEN = 'SET_USER_APP_TOKEN'
export const SET_USER_APP_TOKEN_SUCCESS = 'SET_USER_APP_TOKEN_SUCCESS'

export const LOAD_USER = 'LOAD_USER'

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

function action(type, payload = {}) {
  return {type, ...payload}
}

export const user = {
  request: () => action(USER.REQUEST),
  success: (response) => action(USER.SUCCESS, {response: response[0]}),
  failure: (error) => action(USER.FAILURE, {error}),
}

export const setUserAppToken = (token) => action(SET_USER_APP_TOKEN, {token})
export const setUserAppTokenSuccess = () => action(SET_USER_APP_TOKEN_SUCCESS)

export const loadUser = () => action(LOAD_USER)
