import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import { getPackages } from "../../services/expertService";

export const fetchPackages = createAsyncThunk(
    "experts/fetchPackages",
    async () =>{
        const data = await getPackages(); 
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
        state.packages =
          payload.data?.packages ||
          payload.packages ||
          [];
      })
      .addCase(fetchPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    }
})

export default packageSlice.reducer
