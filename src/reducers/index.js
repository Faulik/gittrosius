import { combineReducers } from 'redux';
import user from './user';
import rooms from './rooms';
import messages from './messages';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  routing: routerReducer,
  user,
  rooms,
  messages,
});

export default rootReducer;
