import {combineReducers} from 'redux';
import authReducer from './authReducer';
import appReducer from './appReducer';
import msgReducer from './msgReducer';
export default combineReducers({
  auth:authReducer,
  msg:msgReducer,
  app:appReducer
  });
