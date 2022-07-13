import { LOGIN_SUCCESS, LOGIN_FAIL, SET_MESSAGE } from "./types";

import loginService from "../services/login";

export const login = (username, password) => (dispatch) => {
  return loginService.login(username, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });
      return Promise.resolve();
    },
    (error) => {
      const message = "login failed";
      dispatch({
        type: LOGIN_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};
