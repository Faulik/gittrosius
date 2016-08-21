import { combineReducers } from 'redux';
import user from './user';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  routing: routerReducer,
  user
});

export default rootReducer;
