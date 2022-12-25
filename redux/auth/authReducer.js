import { createSlice } from "@reduxjs/toolkit";

const state = {
  userId: null,
  username: null,
  stateChange: false,
  email: null,
  avatarURL: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      username: payload.username,
      email: payload.email,
      avatarURL: payload.avatarURL,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: () => state,
  },
});
