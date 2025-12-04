import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import { getExpertService } from "../../services/expertService";

export const fetchExperts = createAsyncThunk(
    "experts/fetchExperts",
    async () =>{
        const response = await getExpertService();
        console.log("response",response.data);
        return response.data
    }
)

const expertSlice = createSlice({
    name:"experts",
    initialState:{
        experts:[],
        loading:false,
        error:null,
    },
    extraReducers:(builder) =>{
    builder
    .addCase(fetchExperts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExperts.fulfilled, (state, action) => {
        state.loading = false;
        state.experts = action.payload.experts;
      })
      .addCase(fetchExperts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    }
})

export default expertSlice.reducer
