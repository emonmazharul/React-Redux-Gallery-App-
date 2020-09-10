import { createSlice } from "@reduxjs/toolkit";
import loadUserInfo from "./loadUserThunk";
import signInUser from "./signInUserThunk";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    signOutUser: (state) => {
      return {
        ...state,
        isAuthenticated: false,
        uid: undefined,
        displayName: undefined,
        photoURL: "",
      };
    },
  },
  extraReducers: {
    [loadUserInfo.fulfilled]: (state, action) => {
      return {
        ...state,
        isAuthenticated: true,
        ...action.payload,
      };
    },
    [signInUser.fulfilled]: (state, action) => {
      return {
        ...state,
        isAuthenticated: true,
        ...action.payload,
      };
    },
  },
});

export const { signOutUser } = userSlice.actions;
const userReducer = userSlice.reducer;

export default userReducer;
