import { USERS_FETCH_SUCCESS, USERS_FETCH_ERROR } from "../actions/types";
import { usersFetch } from "../services/userServices";

const initialState = {
  users: [],
  error: "",
};

const usersReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USERS_FETCH_SUCCESS:
      return {
        ...state,
        users: payload,
        error: "",
      };

    case USERS_FETCH_ERROR:
      return {
        ...state,
        users: [],
        error: payload,
      };
    default:
      return state;
  }
};

const userFetchSuccess = (users) => {
  return {
    type: USERS_FETCH_SUCCESS,
    payload: users,
  };
};

const userFetchError = (error) => {
  return {
    type: USERS_FETCH_ERROR,
    payload: error.message,
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const response = await usersFetch();
      dispatch(userFetchSuccess(response));
      return response;
    } catch (error) {
      dispatch(userFetchError(error.message));
    }
  };
};

export default usersReducer;
