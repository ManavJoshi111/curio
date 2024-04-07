import { createSlice } from "@reduxjs/toolkit";
import { getAnswerByQuestion } from "../features/answers/actions/answerActions";

const getAnswerByQuestionSlice = createSlice({
  name: "answerByQuestion",
  initialState: {
    answers: [],
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAnswerByQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAnswerByQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.answers = action.payload.data;
      })
      .addCase(getAnswerByQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const answerSlice = {
  answerByQuestion: getAnswerByQuestionSlice.reducer,
};
