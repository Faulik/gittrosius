import * as actions from 'actions';

const { USER_ROOMS, SELECT_ROOM, ROOM_SEARCH, NAVIGATE_HOME } = actions;

const initialState = {
  joinedStatus: 'init',
  searchState: 'init',
  current: null,
  joined: [],
  searched: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_ROOMS.SUCCESS:
      return { ...state, joinedStatus: 'success', joined: action.response };
    case USER_ROOMS.REQUEST:
      return { ...state, joinedStatus: 'pending' };
    case USER_ROOMS.FAILURE:
      return { ...state, joinedStatus: 'failure' };
    case ROOM_SEARCH.SUCCESS:
      return { ...state, searchState: 'success', searched: action.response.results };
    case ROOM_SEARCH.REQUEST:
      return { ...state, searchState: 'pending' };
    case ROOM_SEARCH.FAILURE:
      return { ...state, searchState: 'failure' };
    case SELECT_ROOM:
      return { ...state, current: action.roomId };
    case NAVIGATE_HOME:
      return { ...state, current: null };
    default:
      return state;
  }
};
