import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { checkUserLoginStatus } from "../utils/CheckUserLoginStatus";

const initialState = {
  isLoggedIn: checkUserLoginStatus(),
  userId: Cookies.get("userId"),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      Cookies.set("jwt_token", action.payload.jwtToken, {
        expires: 30,
        path: "/",
      });
      Cookies.set("userId", action.payload.user.id, {
        expires: 30,
        path: "/",
      });
      state.userId = action.payload.user.id;
      state.isLoggedIn = checkUserLoginStatus();
    },
    logoutUser: (state) => {
      Cookies.remove("jwt_token", { path: "/" });
      Cookies.remove("userId", { path: "/" });
      console.log("logoutUser action is executed");
      state.isLoggedIn = checkUserLoginStatus();
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
