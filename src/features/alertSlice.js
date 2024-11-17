import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  devServer,
  getAccessToken,
  liveServer,
  sendError,
} from "../utils/utils";
import axios from "axios";

const initialState = {
  getAlertLoading: false,
  getAlertError: false,
  notifications: false,
  getNoteLoading: false,
  getNoteError: false,
  message: false,
  updateAlertLoading: false,
  updateAlertError: false,
  alertUpdated: false,
};

export const getUserAlerts = createAsyncThunk(
  "alert/getUserAlerts",
  async () => {
    const url = `${liveServer}/alert`;
    try {
      const accessToken = getAccessToken();
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
  }
);

export const getAlert = createAsyncThunk("alert/getAlert", async (id) => {
  const url = `${liveServer}/alert/${id}`;
  try {
    const accessToken = getAccessToken();
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

export const updateAlert = createAsyncThunk("alert/updateAlert", async (id) => {
  const url = `${liveServer}/alert/${id}`;
  try {
    const accessToken = getAccessToken();
    const response = await axios.put(
      url,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    sendError(error);
  }
});

const alertSlice = createSlice({
  name: "alert",
  reducers: {
    resetUpdateAlert(state) {
      state.updateAlertLoading = false;
      state.updateAlertError = false;
      state.alertUpdated = false;
    },
  },
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUserAlerts.pending, (state) => {
        state.getAlertLoading = true;
      })
      .addCase(getUserAlerts.fulfilled, (state, action) => {
        state.getAlertLoading = false;
        state.getAlertError = false;
        state.notifications = action.payload.userAlerts;
      })
      .addCase(getUserAlerts.rejected, (state, action) => {
        state.getAlertLoading = false;
        state.getAlertError = action.error.message;
        state.notifications = false;
      });

    builder
      .addCase(getAlert.pending, (state) => {
        state.getNoteLoading = true;
      })
      .addCase(getAlert.fulfilled, (state, action) => {
        state.getNoteLoading = false;
        state.getNoteError = false;
        state.message = action.payload.alert;
      })
      .addCase(getAlert.rejected, (state, action) => {
        state.getNoteLoading = false;
        state.getNoteError = action.error.message;
        state.message = false;
      });

    builder
      .addCase(updateAlert.pending, (state) => {
        state.updateAlertLoading = true;
      })
      .addCase(updateAlert.fulfilled, (state, action) => {
        state.updateAlertLoading = false;
        state.updateAlertError = false;
        state.alertUpdated = action.payload.alert;
      })
      .addCase(updateAlert.rejected, (state, action) => {
        state.updateAlertLoading = false;
        state.updateAlertError = action.error.message;
        state.alertUpdated = false;
      });
  },
});

export const { resetUpdateAlert } = alertSlice.actions;
export default alertSlice.reducer;
