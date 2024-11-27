import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { devServer, liveServer, sendError } from "../utils/utils";
import axios from "axios";

const initialState = {
  registerLoading: false,
  registerError: false,
  accessToken: null,
};

export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (formData) => {
    const url = `${devServer}/signup`;
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
      state.accessToken = null;
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
        state.accessToken = null;
      });
  },
});

export const { resetRegister } = registerSlice.actions;
export default registerSlice.reducer;
