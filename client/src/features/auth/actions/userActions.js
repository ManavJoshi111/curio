import { createAsyncThunk } from "@reduxjs/toolkit";
import { post } from "../../../utils/axios";

const getUserData = createAsyncThunk(
  "user/getUserData",
  async (_, { rejectWithValue }) => {
    try {
      const res = await post("api/auth/get-user");
      return res;
    } catch (err) {
      return rejectWithValue(err.error);
    }
  }
);

export { getUserData };
