import {
  BLOGS_FETCH_SUCCESS,
  BLOGS_FETCH_ERROR,
  ADD_BLOG_SUCCESS,
  ADD_BLOG_ERROR,
  LIKE_BLOG_SUCCESS,
  LIKE_BLOG_ERROR,
} from "../actions/types";
import { getBlogs, addBlog, likeBlogService } from "../services/blogServices";

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
    case ADD_BLOG_SUCCESS:
      return {
        ...state,
        blogs: state.blogs.concat(payload),
        error: "",
      };
    case ADD_BLOG_ERROR:
      return {
        ...state,
        error: payload,
      };
    case LIKE_BLOG_SUCCESS:
      const newBlogs = state.blogs.map((blog) => {
        if (blog.id === payload.id) {
          return blog.likes + 1;
        }
        return { ...blog };
      });
      return {
        ...state,
        blogs: newBlogs,
        error: "",
      };
    case LIKE_BLOG_ERROR:
      return {
        ...state,
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

const addBlogSuccess = (response) => {
  return {
    type: ADD_BLOG_SUCCESS,
    payload: response,
  };
};

const addBlogError = (response) => {
  return {
    type: ADD_BLOG_ERROR,
    payload: response,
  };
};

const likeBlogSuccess = (response) => {
  return {
    type: LIKE_BLOG_SUCCESS,
    payload: response,
  };
};

const likeBlogError = (response) => {
  return {
    type: LIKE_BLOG_ERROR,
    payload: response,
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

export const createBlog = (content) => {
  return async (dispatch) => {
    try {
      const response = await addBlog(content);
      dispatch(addBlogSuccess(response));
      return response;
    } catch (error) {
      dispatch(addBlogError(error.message));
    }
  };
};

export const addLike = (id, newObj) => {
  return async (dispatch) => {
    try {
      const response = await likeBlogService(id, newObj);
      // console.log("this is response in reducer:", response);
      dispatch(likeBlogSuccess(response));
    } catch (error) {
      dispatch(likeBlogError(error.message));
    }
  };
};

export default blogsReducer;
