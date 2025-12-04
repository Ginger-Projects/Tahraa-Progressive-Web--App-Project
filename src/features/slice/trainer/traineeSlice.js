import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("traineeUser");
const storedToken = localStorage.getItem("traineeToken");

const traineeSlice = createSlice({
  name: "traineeAuth",
  initialState: {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken || null,
  },
  reducers: {
    setTrainee(state, action) {
      state.user = action.payload.user
      state.token = action.payload.token

      localStorage.setItem("traineeUser", JSON.stringify(action.payload.user));
      localStorage.setItem("traineeToken", action.payload.token);
    },

    logoutTrainee(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("traineeUser");
      localStorage.removeItem("traineeToken");
    }
  }
});

export const { setTrainee, logoutTrainee } = traineeSlice.actions;
export default traineeSlice.reducer;
