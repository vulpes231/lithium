import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { devServer, liveServer, sendError } from "../utils/utils";
import axios from "axios";

const initialState = {
  registerLoading: false,
  registerError: false,
  accessToken: false,
};

export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (formData) => {
    const url = `${liveServer}/signup`;
    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      sendError(error);
      throw error;
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    resetRegister(state) {
      state.registerLoading = false;
      state.registerError = false;
      state.accessToken = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.registerLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerLoading = false;
        state.registerError = false;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerLoading = false;
        state.registerError = action.error.message;
        state.accessToken = false;
      });
  },
});

export const { resetRegister } = registerSlice.actions;
export default registerSlice.reducer;
