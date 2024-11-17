import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendError } from "../utils/utils";
import axios from "axios";

const initialState = {
  getCoinLoading: false,
  getCoinError: false,
  coinData: false,
  btcDataLoading: false,
  btcDataError: false,
  btcData: false,
};

export const getCoinData = createAsyncThunk("coin/getCoinData", async () => {
  const url =
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,dogecoin,litecoin,tron,bnb,xrp&vs_currencies=usd&include_24hr_change=true";
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    sendError(error);
    throw error;
  }
});

export const getBtcData = createAsyncThunk("coin/getBtcData", async () => {
  const url =
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true";
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    sendError(error);
    throw error;
  }
});

const coinSlice = createSlice({
  name: "coin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCoinData.pending, (state) => {
        state.getCoinLoading = true;
      })
      .addCase(getCoinData.fulfilled, (state, action) => {
        state.getCoinLoading = false;
        state.getCoinError = false;
        state.coinData = action.payload;
      })
      .addCase(getCoinData.rejected, (state, action) => {
        state.getCoinLoading = false;
        state.getCoinError = action.error.message;
        state.coinData = false;
      });
    builder
      .addCase(getBtcData.pending, (state) => {
        state.btcDataLoading = true;
      })
      .addCase(getBtcData.fulfilled, (state, action) => {
        state.btcDataLoading = false;
        state.btcDataError = false;
        state.btcData = action.payload;
      })
      .addCase(getBtcData.rejected, (state, action) => {
        state.btcDataLoading = false;
        state.btcDataError = action.error.message;
        state.btcData = false;
      });
  },
});

export default coinSlice.reducer;
