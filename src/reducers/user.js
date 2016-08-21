import { SET_USER_TOKEN, SET_USER_APP_TOKEN_SUCCESS } from 'actions';

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

export default function counter(state = initialState, action) {
  switch (action.type) {
    case SET_USER_APP_TOKEN:
      return { ...state, token: action.token}
    case SET_USER_APP_TOKEN_SUCCESS:
      return { ...state, state: 'success', isAuthenticated: true}
    default:
      return state;
  }
}
