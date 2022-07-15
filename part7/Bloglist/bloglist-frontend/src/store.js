import loginReducer from "./reducers/loginReducer";
import blogsReducer from "./reducers/blogsReducer";
import { configureStore } from "@reduxjs/toolkit";

// we create the store first and assign the reducer to it
const store = configureStore({
  reducer: {
    login: loginReducer,
    blogs: blogsReducer,
  },
});
export default store;
