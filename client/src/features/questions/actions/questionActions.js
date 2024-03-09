import { createAsyncThunk } from "@reduxjs/toolkit";
import { post } from "../../../utils/axios";
import {
  SERVER_URL,
  PAGINATION_DEFAULT_PAGE,
  PAGINATION_LIMIT,
} from "../../../utils/constants";

const getQuestionsByTopics = createAsyncThunk(
  "questions/getByTopics",
  async (data, { rejectWithValue }) => {
    try {
      const res = await post(
        `${SERVER_URL}/api/questions/by-topic?page=${
          data.currentPage || PAGINATION_DEFAULT_PAGE
        }&limit=${data.limit || PAGINATION_LIMIT}`,
        {
          topics: data.topics.map((topic) => topic.topicId),
        }
      );
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export { getQuestionsByTopics };
