import * as actions from 'actions';

const { ROOMS, SELECT_ROOM } = actions;

const initialState = {
  state: 'init',
  current: null,
  joined: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ROOMS.SUCCESS:
      return { ...state, state: 'success', joined: action.response }
    case ROOMS.REQUEST:
      return { ...state, state: 'pending' }
    case ROOMS.FAILURE:
      return { ...state, state: 'failure' }
    case SELECT_ROOM:
      return { ...state, current: action.roomId }
    default:
      return state;
  }
}
