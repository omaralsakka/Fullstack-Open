import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: "",
  reducers: {
    Notification(state, action) {
      return action.payload;
    },
  },
});

export const { Notification } = notificationSlice.actions;

export const setNotification = (content, time) => {
  return async (dispatch) => {
    await dispatch(Notification(content));
    setTimeout(() => {
      dispatch(Notification(""));
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
