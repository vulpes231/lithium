import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  devServer,
  getAccessToken,
  liveServer,
  sendError,
} from "../utils/utils";
import axios from "axios";

const initialState = {
  getPlansLoading: false,
  getPlansError: false,
  plans: false,
  investLoading: false,
  investError: false,
  investSuccess: false,
};

export const getPlans = createAsyncThunk("pool/getPlans", async () => {
  const url = `${liveServer}/pool`;
  const accessToken = getAccessToken();
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    sendError(error);
  }
});

export const investPlan = createAsyncThunk(
  "pool/investPlan",
  async (formData) => {
    const url = `${devServer}/pool`;
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

const poolSlice = createSlice({
  name: "pool",
  initialState,
  reducers: {
    resetInvestment(state) {
      state.investError = false;
      state.investLoading = false;
      state.investSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPlans.pending, (state) => {
        state.getPlansLoading = false;
      })
      .addCase(getPlans.fulfilled, (state, action) => {
        state.getPlansLoading = false;
        state.getPlansError = false;
        state.plans = action.payload.pools;
      })
      .addCase(getPlans.rejected, (state, action) => {
        state.getPlansLoading = false;
        state.getPlansError = action.error.message;
        state.plans = false;
      });

    builder
      .addCase(investPlan.pending, (state) => {
        state.investLoading = false;
      })
      .addCase(investPlan.fulfilled, (state) => {
        state.investLoading = false;
        state.investError = false;
        state.investSuccess = true;
      })
      .addCase(investPlan.rejected, (state, action) => {
        state.investLoading = false;
        state.investError = action.error.message;
        state.investSuccess = false;
      });
  },
});

export const { resetInvestment } = poolSlice.actions;
export default poolSlice.reducer;
