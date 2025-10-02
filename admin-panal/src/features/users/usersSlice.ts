import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers, createUser, updateUser, deleteUser, bulkDeleteUsers, getUserById } from "./usersThunk";

interface User {
  _id: string;
  name: string;
  email: string;
  is_active: boolean;
  profile_picture:string;
  role:string;
  createdAt: string;
  updatedAt: string;
}

interface UsersState {
  users: User[];
  total: number;
  loading: boolean;
  error: string | null;
  selectedUser?: User;
}

const initialState: UsersState = {
  users: [],
  total: 0,
  loading: false,
  error: null,
  selectedUser: undefined,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.total = action.payload.total;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Get user by ID
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedUser = undefined;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create user
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.unshift(action.payload);
        state.total += 1;
      })

      // Update user
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((u) => u._id === action.payload._id);
        if (index !== -1) state.users[index] = action.payload;
        if (state.selectedUser?._id === action.payload._id) state.selectedUser = action.payload;
      })

      // Delete user
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u._id !== action.payload);
        state.total -= 1;
      })

      // Bulk delete users
      .addCase(bulkDeleteUsers.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => !action.payload.includes(u._id));
        state.total -= action.payload.length;
      });
  },
});

export default usersSlice.reducer;
