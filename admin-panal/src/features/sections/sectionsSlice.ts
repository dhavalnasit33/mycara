import { createSlice } from "@reduxjs/toolkit";
import {
  fetchSections,
  getSectionById,
  createSection,
  updateSection,
  deleteSection,
  bulkDeleteSections,
} from "./sectionsThunk";

interface Section {
  _id: string;
  title: string;
  order:string;
  is_button:boolean;
  button_name: string;
  button_link:string;
  description: string;
  status?: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

interface SectionsState {
  sections: Section[];
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: SectionsState = {
  sections: [],
  total: 0,
  loading: false,
  error: null,
};

const sectionsSlice = createSlice({
  name: "sections",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Fetch
      .addCase(fetchSections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSections.fulfilled, (state, action) => {
        state.loading = false;
        state.sections = action.payload.sections;
        state.total = action.payload.total;
      })
      .addCase(fetchSections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ✅ Create
      .addCase(createSection.fulfilled, (state, action) => {
        state.sections.unshift(action.payload);
        state.total += 1;
      })

      // ✅ Update
      .addCase(updateSection.fulfilled, (state, action) => {
        const index = state.sections.findIndex((s) => s._id === action.payload._id);
        if (index !== -1) state.sections[index] = action.payload;
      })

      // ✅ Delete
      .addCase(deleteSection.fulfilled, (state, action) => {
        state.sections = state.sections.filter((s) => s._id !== action.payload);
        state.total -= 1;
      })

      // ✅ Bulk Delete
      .addCase(bulkDeleteSections.fulfilled, (state, action) => {
        state.sections = state.sections.filter((s) => !action.payload.includes(s._id));
        state.total -= action.payload.length;
      });
  },
});

export default sectionsSlice.reducer;
