import { createSlice } from "@reduxjs/toolkit";
import { fetchColorById, fetchColors } from "./colorsThunk";

const initialState = {
  colors: [],
  color: null,
  loading: false,
  error: null,
};

const colorsSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

    .addCase(fetchColors.pending, (state) => {
        state.loading = true;
        })
        .addCase(fetchColors.fulfilled, (state, action) => {
        state.loading = false;
        state.colors = action.payload;
        })
        .addCase(fetchColors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        })

      .addCase(fetchColorById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchColorById.fulfilled, (state, action) => {
        state.loading = false;
        state.color = action.payload;
      })
      .addCase(fetchColorById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default colorsSlice.reducer;
