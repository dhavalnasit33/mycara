import { createSlice } from "@reduxjs/toolkit";
import { fetchProductLabels } from "./productlabelsThunk";

const initialState = {
  productLabels: [],
  loading: false,
  error: null,
};

const productLabelsSlice = createSlice({
  name: "productLabels",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductLabels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductLabels.fulfilled, (state, action) => {
        state.loading = false;
        state.productLabels  = action.payload.labels;
      })
      .addCase(fetchProductLabels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export default productLabelsSlice.reducer;
