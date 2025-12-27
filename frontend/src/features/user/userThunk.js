import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { ROUTES } from "../../services/routes";

export const uploadProfilePicture = createAsyncThunk(
  "users/uploadProfilePicture",
  async (file, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("profile_picture", file);

      const res = api.put(ROUTES.user.updateOneProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Upload failed");
      }

      return data.profile_picture;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
