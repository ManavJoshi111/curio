import { createSlice } from "@reduxjs/toolkit";
import {
  getQuestionsByTopics,
  getQuestionById,
} from "../features/questions/actions/questionActions";

const questionsByTopicSlice = createSlice({
  name: "questionsByTopic",
  initialState: {
    questionsByTopic: [],
    loading: true,
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
        state.error = null;
        state.questionsByTopic = action.payload.data;
      })
      .addCase(getQuestionsByTopics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const questionByIdSlice = createSlice({
  name: "questionById",
  initialState: {
    questionById: {},
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getQuestionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getQuestionById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.questionById = action.payload.data;
      })
      .addCase(getQuestionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const userQuestionsSlice = createSlice({
  name: "userQuestions",
  initialState: {
    userQuestions: [],
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Add your extra reducers for fetching user questions here
  },
});

export const questionSlice = {
  questionsByTopic: questionsByTopicSlice.reducer,
  questionById: questionByIdSlice.reducer,
  userQuestions: userQuestionsSlice.reducer,
};
