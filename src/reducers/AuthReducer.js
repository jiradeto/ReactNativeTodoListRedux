const INITIAL_STATE = {
  username: '',
  password: '',
  loading: false,
  error: ''
};

import {
  LOGIN_fAIL,
  LOGIN_SUCCESS,
  LOGGING_IN,
  ON_CHANGE_TEXT
} from '../actions/type';

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ON_CHANGE_TEXT:
      return {
        ...state,
        error: '',
        [action.payload.prop]: action.payload.value
      };
    case LOGGING_IN:
      return { ...state, loading: true };
    case LOGIN_fAIL:
      return { ...state, loading: false, error: action.payload.error };
    case LOGIN_SUCCESS:
      console.log('reducer LOGIN_SUCCESS');
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};
