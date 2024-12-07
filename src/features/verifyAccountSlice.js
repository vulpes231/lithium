import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAccessToken, liveServer, sendError } from "../utils/utils";
import axios from "axios";

const initialState = {
  verifyAccountLoading: false,
  verifyAccountError: false,
  verifyAccountSubmit: false,
};

export const submitVerification = createAsyncThunk(
  "accountverify/submitVerification",
  async (formData) => {
    const url = `${liveServer}/verifyaccount`;
    const accessToken = getAccessToken();
    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      sendError(error);
    }
  }
);

const verifyAccountSlice = createSlice({
  name: "accountverify",
  initialState,
  reducers: {
    resetVerification(state) {
      state.verifyAccountLoading = false;
      state.verifyAccountError = false;
      state.verifyAccountSubmit = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitVerification.pending, (state) => {
        state.verifyAccountLoading = true;
      })
      .addCase(submitVerification.fulfilled, (state) => {
        state.verifyAccountLoading = false;
        state.verifyAccountError = false;
        state.verifyAccountSubmit = success;
      })
      .addCase(submitVerification.rejected, (state, action) => {
        state.verifyAccountLoading = false;
        state.verifyAccountError = action.error.message;
        state.verifyAccountSubmit = false;
      });
  },
});

export const { resetVerification } = verifyAccountSlice.actions;
export default verifyAccountSlice.reducer;
