import { createSlice } from "@reduxjs/toolkit";
import { fetchtypes } from "./typeThunk";

const initialState = {
  types: [],
  loading: false,
  error: null,
};

const typesSlice = createSlice({
  name: "types",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchtypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchtypes.fulfilled, (state, action) => {
        state.loading = false;
        state.types = action.payload;
      })
      .addCase(fetchtypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export default typesSlice.reducer;
