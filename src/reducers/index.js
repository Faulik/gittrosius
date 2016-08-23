import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user';
import rooms from './rooms';
import messages from './messages';

const rootReducer = combineReducers({
  routing: routerReducer,
  user,
  rooms,
  messages,
});

export default rootReducer;
