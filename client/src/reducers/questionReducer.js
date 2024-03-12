import { createSlice } from "@reduxjs/toolkit";
import {
  getQuestionsByTopics,
  getQuestionById,
} from "../features/questions/actions/questionActions";

const questionSlice = createSlice({
  name: "questions",
  initialState: {
    questionsByTopic: {},
    questions: {},
    questionById: {},
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
      })
      .addCase(getQuestionById.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getQuestionById.fulfilled, (state, action) => {
        state.loading = false;
        state.questionById = action.payload.data;
      })
      .addCase(getQuestionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default questionSlice.reducer;
