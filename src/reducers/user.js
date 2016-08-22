import * as actions from 'actions';

const { SET_USER_APP_TOKEN, SET_USER_APP_TOKEN_SUCCESS, SIGN_OUT } = actions;
const { USER, USER_ROOMS } = actions;

const initialState = {
  isAuthenticated: false,
  state: 'init',
  token: null,
  avatarUrl: null,
  avatarUrlMedium: null,
  avatarUrlSmall: null,
  displayName: null,
  gv: null,
  id: null,
  providers: [],
  url: null,
  username: null,
  v: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_APP_TOKEN:
      return { ...state, token: action.token}
    case SET_USER_APP_TOKEN_SUCCESS:
      return { ...state, isAuthenticated: true}
    case SIGN_OUT:
      return initialState
    case USER.SUCCESS:
      return { ...state, state: 'success', ...action.response}
    case USER.REQUEST:
      return { ...state, state: 'pending'}
    case USER.FAILURE:
      return { ...state, state: 'failure', isAuthenticated: false}
    default:
      return state;
  }
}
