import { LOGIN_SUCCESS, LOGIN_FAIL } from "../actions/types";

const initialState = { user: null };

const loginReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default loginReducer;
