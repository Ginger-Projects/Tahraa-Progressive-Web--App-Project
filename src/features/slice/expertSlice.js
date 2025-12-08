import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import { getExpertService } from "../../services/expertService";

export const fetchExperts = createAsyncThunk(
    "experts/fetchExperts",
    async ({ page = 1, limit = 10 } = {}) =>{
        const data = await getExpertService(page, limit);
        console.log("experts thunk payload", data);
        return data;
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
        const newExperts = action.payload?.data?.experts || [];
        const page = action.meta?.arg?.page ?? 1;

        if (page > 1 && state.experts && state.experts.length) {
          state.experts = [...state.experts, ...newExperts];
        } else {
          state.experts = newExperts;
        }
      })
      .addCase(fetchExperts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    }
})

export default expertSlice.reducer
