import { createAsyncThunk } from "@reduxjs/toolkit";
import { post, get } from "../../../utils/axios";
import {
  SERVER_URL,
  PAGINATION_DEFAULT_PAGE,
  PAGINATION_DEFAULT_LIMIT,
} from "../../../utils/constants";

const getQuestionById = createAsyncThunk(
  "questions/getById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await get(`${SERVER_URL}/api/questions/${id}`);
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const getQuestionsByTopics = createAsyncThunk(
  "questions/getByTopics",
  async (data, { rejectWithValue }) => {
    try {
      const res = await post(
        `${SERVER_URL}/api/questions/by-topic?page=${
          data.page || PAGINATION_DEFAULT_PAGE
        }&limit=${data.limit || PAGINATION_DEFAULT_LIMIT}`,
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

export { getQuestionById, getQuestionsByTopics };
