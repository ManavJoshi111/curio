import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, post } from "../../../utils/axios";
import { SERVER_URL } from "../../../utils/constants";

const getAnswerByQuestion = createAsyncThunk(
  "answers/getByQuestion",
  async (questionId, { rejectWithValue }) => {
    try {
      const res = await get(
        `${SERVER_URL}/api/answer/by-question/${questionId}`
      );
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export { getAnswerByQuestion };
