import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userReducer";
import topicSlice from "./reducers/topicReducer";
import questionSlice from "./reducers/questionReducer";

const store = configureStore({
  reducer: {
    user: userSlice,
    topics: topicSlice,
    questions: questionSlice,
  },
});

export default store;
