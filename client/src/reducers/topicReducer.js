import { createSlice } from "@reduxjs/toolkit";
import { getTopics } from "../features/onboarding/actions/topicActions";

const topicsSlice = createSlice({
  name: "topics",
  initialState: {
    topics: [],
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTopics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTopics.fulfilled, (state, action) => {
        state.loading = false;
        state.topics = action.payload.data;
      })
      .addCase(getTopics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default topicsSlice.reducer;
