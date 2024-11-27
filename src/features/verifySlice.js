import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { devServer, sendError } from "../utils/utils";
import axios from "axios";

const initialState = {
  emailCodeError: false,
  emailCodeLoading: false,
  emailOtp: false,
  verifyMailError: false,
  verifyMailLoading: false,
  emailVerified: false,
};

export const sendMailCode = createAsyncThunk(
  "verify/sendMailCode",
  async (formData) => {
    const url = `${devServer}/verify/emailotp`;
    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      sendError(error);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "verify/verifyEmail",
  async (formData) => {
    const url = `${devServer}/verify/verifymail`;
    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      sendError(error);
    }
  }
);

const verifySlice = createSlice({
  name: "verify",
  initialState,
  reducers: {
    resetSendCode(state) {
      state.emailCodeLoading = false;
      state.emailCodeError = false;
      state.emailOtp = false;
    },
    resetMailVerify(state) {
      state.verifyMailLoading = false;
      state.verifyMailError = false;
      state.emailVerified = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMailCode.pending, (state) => {
        state.emailCodeLoading = true;
      })
      .addCase(sendMailCode.fulfilled, (state, action) => {
        state.emailCodeLoading = false;
        state.emailCodeError = false;
        state.emailOtp = action.payload.otp;
      })
      .addCase(sendMailCode.rejected, (state, action) => {
        state.emailCodeLoading = false;
        state.emailCodeError = action.error.message;
        state.emailOtp = false;
      });

    builder
      .addCase(verifyEmail.pending, (state) => {
        state.verifyMailLoading = true;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.verifyMailLoading = false;
        state.verifyMailError = false;
        state.emailVerified = true;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.verifyMailLoading = false;
        state.emailCodeError = action.error.message;
        state.emailVerified = false;
      });
  },
});

export const { resetMailVerify, resetSendCode } = verifySlice.actions;
export default verifySlice.reducer;
