import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import {
  USER_TOKEN,
  LOGIN_USER_SUCCESS,
  ON_CHANGE_TEXT,
  LOGGING_IN,
  LOGIN_SUCCESS,
  LOGIN_fAIL
} from './type';
export const onUpdateInput = ({ prop, value }) => {
  return {
    type: ON_CHANGE_TEXT,
    payload: { prop, value }
  };
};

async function saveToken() {
  try {
    console.log('saveToken');
    AsyncStorage.setItem(USER_TOKEN, 'example_token');
  } catch (e) {
    console.log('AsyncStorage error: saveToken ', e);
  }
}

const LoginSuccess = dispatch => {
  dispatch({
    type: LOGIN_SUCCESS
  });
  saveToken();
  Actions.todoApp({ type: 'reset' });
};
const LoginFail = dispatch => {
  dispatch({
    type: LOGIN_fAIL,
    payload: { error: 'Authentication Failed !' }
  });
};

export const onLogin = ({ username, password }) => {
  return dispatch => {
    dispatch({
      type: LOGGING_IN
    });

    setTimeout(() => {
      if (username.toLowerCase() === 'user' && password === '1234') {
        LoginSuccess(dispatch);
      } else {
        LoginFail(dispatch);
      }
    }, 1000);
  };

  //  setTimeout(() => {}, 2000);
  // return  {
  //   type: LOGGING_IN
  // };
};
