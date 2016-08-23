import * as actions from 'actions';

const { ROOM_MESSAGES, SELECT_ROOM } = actions;

const initialState = {
  state: 'init',
  visible: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ROOM_MESSAGES.SUCCESS:
      return { ...state, state: 'success', visible: action.response };
    case ROOM_MESSAGES.REQUEST:
      return { ...state, state: 'pending' };
    case ROOM_MESSAGES.FAILURE:
      return { ...state, state: 'failure' };
    case SELECT_ROOM:
      return { ...initialState };
    default:
      return state;
  }
};
