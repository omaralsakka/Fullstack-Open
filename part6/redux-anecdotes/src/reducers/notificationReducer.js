import { createSlice } from "@reduxjs/toolkit";

let timer;

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
    clearTimeout(timer);
    dispatch(Notification(`you voted for ${content}`));
    timer = setTimeout(() => {
      dispatch(Notification(""));
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
