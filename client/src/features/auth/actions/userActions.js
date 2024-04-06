import { createAsyncThunk } from "@reduxjs/toolkit";
import { get } from "../../../utils/axios";

const getUserData = createAsyncThunk(
  "user/getUserData",
  async (_, { rejectWithValue }) => {
    try {
      const res = await get("api/auth/get-user");
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export { getUserData };
