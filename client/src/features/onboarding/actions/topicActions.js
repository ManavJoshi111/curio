import { createAsyncThunk } from "@reduxjs/toolkit";
import { get } from "../../../utils/axios";
import { SERVER_URL } from "../../../utils/constants";

const getTopics = createAsyncThunk(
  "topics/getTopics",
  async (_, { rejectWithValue }) => {
    try {
      const res = await get(`${SERVER_URL}/api/topics`);
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export { getTopics };
