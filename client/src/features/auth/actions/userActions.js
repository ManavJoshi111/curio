import { createAsyncThunk } from "@reduxjs/toolkit";
import { post } from "../../../utils/axios";

const getUserData = createAsyncThunk("user/getUserData", async () => {
  const res = await post("api/auth/get-user", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res;
});

export { getUserData };
