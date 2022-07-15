import { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_SUCCESS } from "../actions/types";
import { login, setToken } from "../services/loginServices";

const initialState = {
  user: null,
  error: "",
};

const loginReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: payload,
        error: "",
      };
    case LOGIN_ERROR:
      return {
        ...state,
        user: null,
        error: payload,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        error: "",
      };
    default:
      return state;
  }
};

export const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};

const loginFailed = (error) => {
  return {
    type: LOGIN_ERROR,
    payload: error,
  };
};

export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
    payload: "",
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      window.localStorage.clear();
      dispatch(logoutSuccess);
      return;
    } catch (error) {
      return error;
    }
  };
};

export const logUser = (username, password) => {
  return async (dispatch) => {
    try {
      const response = await login({ username, password });
      setToken(response.token);
      dispatch(loginSuccess(response));
      window.localStorage.setItem(
        "loggedBlogappUser",
        JSON.stringify(response)
      );
      return response;
    } catch (error) {
      dispatch(loginFailed(error.message));
    }
  };
};

export default loginReducer;
