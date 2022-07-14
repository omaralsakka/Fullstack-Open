import { LOGIN_SUCCESS, LOGIN_ERROR } from "../actions/types";
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
    } catch (error) {
      dispatch(loginFailed(error.message));
    }
  };
};

export default loginReducer;
