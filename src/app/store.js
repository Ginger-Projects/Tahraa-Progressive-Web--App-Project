import {configureStore} from "@reduxjs/toolkit";
import expertReducer from '../features/slice/expertSlice.js'
import packageReducer from '../features/slice/packageSlice.js'
import traineeReducer from '../features/slice/trainer/traineeSlice.js'
import registrationReducer from '../features/slice/registrationSlice.js'

export const store = configureStore({
    reducer:{
        experts:expertReducer,
        packages:packageReducer,
        trainee:traineeReducer,
        registration: registrationReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["registration/setEducation", "registration/setBasics"],
        ignoredPaths: [
          "registration.education.previousWorkFiles",
          "registration.basics.photoFile",
        ],
      },
    }),
})
