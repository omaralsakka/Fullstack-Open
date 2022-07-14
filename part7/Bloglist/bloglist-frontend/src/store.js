import loginReducer from "./reducers/loginReducer";
import { configureStore } from "@reduxjs/toolkit";

// we create the store first and assign the reducer to it
const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});
export default store;
