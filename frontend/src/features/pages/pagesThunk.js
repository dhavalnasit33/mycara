// D:\mycara\frontend\src\features\pages\pagesThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { ROUTES } from "../../services/routes";

// Fetch navbar items
export const fetchPages = createAsyncThunk(
  "pages/fetchPages",
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await api.get(ROUTES.pages.getAll, { params });

  if (res.data.success && res.data.data.pages) {

       
        const homePage = res.data.data.pages.find(page => page.slug === 'home' || page.page_name === 'Home');
        
        
        if (homePage && homePage.sections) {
            return homePage.sections; 
        }

 return rejectWithValue("Home page sections not found in API response");
 }

      return rejectWithValue(res.data.message || "Failed to fetch navbar items");
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);
