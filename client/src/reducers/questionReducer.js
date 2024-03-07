import { createSlice } from "@reduxjs/toolkit";
import { getQuestionsByTopics } from "../features/questions/actions/questionActions";

const questionSlice = createSlice({
  name: "questions",
  initialState: {
    questionsByTopic: {},
    questions: {},
    userQuestions: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getQuestionsByTopics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getQuestionsByTopics.fulfilled, (state, action) => {
        state.loading = false;
        state.questionsByTopic = action.payload.data;
      })
      .addCase(getQuestionsByTopics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default questionSlice.reducer;
