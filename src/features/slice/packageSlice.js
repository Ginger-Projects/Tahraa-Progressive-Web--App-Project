import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import { getPackages } from "../../services/expertService";

export const fetchPackages = createAsyncThunk(
    "experts/fetchPackages",
    async ({ page = 1, limit = 10 } = {}) =>{
        const data = await getPackages(page, limit); 
        console.log("packages", data);
        return data; 
    }
)

const packageSlice = createSlice({
    name:"experts",
    initialState:{
        packages:[],
        loading:false,
        error:null,
    },
    extraReducers:(builder) =>{
    builder
    .addCase(fetchPackages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPackages.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload || {};
        const newPackages =
          payload.data?.packages ||
          payload.packages ||
          [];
        const page = action.meta?.arg?.page ?? 1;

        if (page > 1 && state.packages && state.packages.length) {
          state.packages = [...state.packages, ...newPackages];
        } else {
          state.packages = newPackages;
        }
      })
      .addCase(fetchPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    }
})

export default packageSlice.reducer
