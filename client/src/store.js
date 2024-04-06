import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userReducer";
import topicSlice from "./reducers/topicReducer";
import { questionSlice } from "./reducers/questionReducer";
import { answerSlice } from "./reducers/answerReducer";

const store = configureStore({
  reducer: {
    user: userSlice,
    topics: topicSlice,
    questionsByTopic: questionSlice.questionsByTopic,
    questionById: questionSlice.questionById,
    userQuestions: questionSlice.userQuestions,
    answerByQuestion: answerSlice.answerByQuestion,
  },
});

export default store;
