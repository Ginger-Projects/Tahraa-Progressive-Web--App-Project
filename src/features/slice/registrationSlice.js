import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  basics: {},
  education: {},
  work: {},
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    setBasics(state, action) {
      state.basics = { ...state.basics, ...action.payload };
    },
    setEducation(state, action) {
      state.education = { ...state.education, ...action.payload };
    },
    setWork(state, action) {
      state.work = { ...state.work, ...action.payload };
    },
    clearRegistration() {
      return initialState;
    },
  },
});

export const { setBasics, setEducation, setWork, clearRegistration } =
  registrationSlice.actions;

export default registrationSlice.reducer;
