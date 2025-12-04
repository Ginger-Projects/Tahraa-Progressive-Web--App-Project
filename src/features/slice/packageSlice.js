import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import { getPackages } from "../../services/expertService";

export const fetchPackages = createAsyncThunk(
    "experts/fetchPackages",
    async () =>{
        const response = await getPackages();
        console.log("packages",response);
        
        return response.data
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
        state.packages = action.payload.packages;
      })
      .addCase(fetchPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    }
})

export default packageSlice.reducer
