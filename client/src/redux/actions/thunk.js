import { createAsyncThunk } from "@reduxjs/toolkit";
import { post } from "../../utils/axios";

const getUserData = createAsyncThunk(
  "user/getUserData",
  async (token, thunkAPI) => {
    const res = await post("/user");
    console.log("res in thunk: ", res);
    return res;
  }
);

export { getUserData };
