import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import loginReducer from "./reducers/loginReducer";
const store = configureStore({
  reducer: {
    login: loginReducer,
    notification: notificationReducer,
  },
});
export default store;
