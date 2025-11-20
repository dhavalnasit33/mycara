import { createSlice } from "@reduxjs/toolkit";
import { fetchFabrics } from "./fabricsThunk";

const initialState = {
  fabrics: [],
  loading: false,
  error: null,
};

const fabricsSlice = createSlice({
  name: "fabrics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFabrics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFabrics.fulfilled, (state, action) => {
        state.loading = false;
        state.fabrics = action.payload.fabrics;
      })
      .addCase(fetchFabrics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export default fabricsSlice.reducer;
