import { createSlice } from "@reduxjs/toolkit";
import { getUserData } from "../actions/thunk";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        console.log("pending");
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        console.log("fulfilled");
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(getUserData.rejected, (state, action) => {
        console.log("rejected");
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
