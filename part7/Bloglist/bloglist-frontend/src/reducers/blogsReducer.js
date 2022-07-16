import { BLOGS_FETCH_SUCCESS, BLOGS_FETCH_ERROR } from "../actions/types";
import { getBlogs } from "../services/blogServices";

const initialState = {
  blogs: [],
  error: "",
};

const blogsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case BLOGS_FETCH_SUCCESS:
      return {
        ...state,
        blogs: payload,
        error: "",
      };
    case BLOGS_FETCH_ERROR:
      return {
        ...state,
        blogs: [],
        error: payload,
      };
    default:
      return state;
  }
};

const blogFetchSuccess = (response) => {
  return {
    type: BLOGS_FETCH_SUCCESS,
    payload: response,
  };
};

const blogFetchError = (error) => {
  return {
    type: BLOGS_FETCH_ERROR,
    payload: error,
  };
};

export const fetchBlogs = () => {
  return async (dispatch) => {
    try {
      const response = await getBlogs();
      dispatch(blogFetchSuccess(response));
      return response;
    } catch (error) {
      dispatch(blogFetchError(error.message));
    }
  };
};

export default blogsReducer;
