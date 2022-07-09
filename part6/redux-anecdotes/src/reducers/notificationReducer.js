import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: "",
  reducers: {
    newNotification(state, action) {
      state = action.payload;
      return state;
    },
    hideNotification(state, action) {
      state = action.payload;
      return state;
    },
  },
});

export const { newNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
