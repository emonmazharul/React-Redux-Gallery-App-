import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "./firebaseMethods";
const loadUserInfo = createAsyncThunk("user/loadAuthenticData", () => {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        resolve({
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid,
        });
      }
      reject({ errorName: "not authenticated" });
    });
  });
});

export default loadUserInfo;
