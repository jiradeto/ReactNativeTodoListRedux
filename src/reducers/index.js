'use strict';

import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import TodoReducer from './TodoReducer';

export default combineReducers({
  auth: AuthReducer,
  todo: TodoReducer
});
