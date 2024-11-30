import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  devServer,
  getAccessToken,
  liveServer,
  sendError,
} from "../utils/utils";
import axios from "axios";

const initialState = {
  getWalletLoading: false,
  getWalletError: false,
  userWallet: false,
};

export const getUserWallet = createAsyncThunk(
  "wallet/getUserWallet",
  async () => {
    const url = `${devServer}/wallet`;
    const accessToken = getAccessToken();
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      sendError(error);
    }
  }
);

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserWallet.pending, (state) => {
        state.getWalletLoading = true;
      })
      .addCase(getUserWallet.fulfilled, (state, action) => {
        state.getWalletLoading = false;
        state.getWalletError = false;
        state.userWallet = action.payload.wallet;
      })
      .addCase(getUserWallet.rejected, (state, action) => {
        state.getWalletLoading = false;
        state.userWallet = false;
        state.getWalletError = action.error.message;
      });
  },
});

export default walletSlice.reducer;
