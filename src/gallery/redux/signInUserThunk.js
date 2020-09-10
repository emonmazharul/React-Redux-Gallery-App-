import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, provider } from "./firebaseMethods";

const signInUser = createAsyncThunk("signInUser", (thunkAPI) => {
  return auth
    .signInWithPopup(provider)
    .then((res) => {
      return {
        displayName: res.user.displayName,
        photoURL: res.user.photoURL,
        uid: res.user.uid,
      };
    })
    .catch((e) => {
      console.log(e);
      return thunkAPI.rejectWithValue({ errorName: "Sign in Filed" });
    });
});

export default signInUser;
