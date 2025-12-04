import {configureStore} from "@reduxjs/toolkit";
import expertReducer from '../features/slice/expertSlice.js'
import packageReducer from '../features/slice/packageSlice.js'
import traineeReducer from '../features/slice/trainer/traineeSlice.js'

export const store = configureStore({
    reducer:{
        experts:expertReducer,
        packages:packageReducer,
        trainee:traineeReducer
    }
})
