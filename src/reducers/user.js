import * as actions from 'actions';

const { SET_USER_APP_TOKEN, SET_USER_APP_TOKEN_SUCCESS, SIGN_OUT } = actions;
const { USER } = actions;

const initialState = {
  isAuthenticated: false,
  loginStatus: 'init',
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
  v: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_APP_TOKEN:
      return { ...state, token: action.token };
    case SET_USER_APP_TOKEN_SUCCESS:
      return { ...state, isAuthenticated: true };
    case SIGN_OUT:
      return initialState;
    case USER.SUCCESS:
      return { ...state, loginStatus: 'success', ...action.response };
    case USER.REQUEST:
      return { ...state, loginStatus: 'pending' };
    case USER.FAILURE:
      return { ...state, loginStatus: 'failure', isAuthenticated: false };
    default:
      return state;
  }
};
