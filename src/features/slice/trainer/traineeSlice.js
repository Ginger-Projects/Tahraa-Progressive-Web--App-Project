import { createSlice } from "@reduxjs/toolkit";

let initialUser = null;
let initialToken = null;
let initialRememberMe = false;

if (typeof window !== "undefined") {
  const localUserRaw = localStorage.getItem("traineeUser");
  const localToken = localStorage.getItem("traineeToken");
  const sessionUserRaw = sessionStorage.getItem("traineeUser");
  const sessionToken = sessionStorage.getItem("traineeToken");

  if (localUserRaw && localToken) {
    initialUser = JSON.parse(localUserRaw);
    initialToken = localToken;
    initialRememberMe = true;
  } else if (sessionUserRaw && sessionToken) {
    initialUser = JSON.parse(sessionUserRaw);
    initialToken = sessionToken;
    initialRememberMe = false;
  }
}

const traineeSlice = createSlice({
  name: "traineeAuth",
  initialState: {
    user: initialUser,
    token: initialToken,
    rememberMe: initialRememberMe,
  },
  reducers: {
    setTrainee(state, action) {
      const { user, token, rememberMe } = action.payload || {};
      state.user = user;
      state.token = token;
      state.rememberMe = !!rememberMe;

      if (typeof window !== "undefined") {
        // Clear both storages first
        localStorage.removeItem("traineeUser");
        localStorage.removeItem("traineeToken");
        sessionStorage.removeItem("traineeUser");
        sessionStorage.removeItem("traineeToken");

        const storage = rememberMe ? localStorage : sessionStorage;

        if (user && token && storage) {
          storage.setItem("traineeUser", JSON.stringify(user));
          storage.setItem("traineeToken", token);
        }
      }
    },

    logoutTrainee(state) {
      state.user = null;
      state.token = null;
      state.rememberMe = false;

      if (typeof window !== "undefined") {
        localStorage.removeItem("traineeUser");
        localStorage.removeItem("traineeToken");
        sessionStorage.removeItem("traineeUser");
        sessionStorage.removeItem("traineeToken");
      }
    },
  },
});

export const { setTrainee, logoutTrainee } = traineeSlice.actions;
export default traineeSlice.reducer;
