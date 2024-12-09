import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  devServer,
  getAccessToken,
  liveServer,
  sendError,
} from "../utils/utils";
import axios from "axios";

const initialState = {
  createTicketLoading: false,
  createTicketError: false,
  ticketCreated: false,
  replyTicketLoading: false,
  replyTicketError: false,
  ticketReplied: false,
  getTicketLoading: false,
  getTicketError: false,
  tickets: false,
  ticketDataLoading: false,
  ticketDataError: false,
  ticketData: false,
};

export const createTicket = createAsyncThunk(
  "ticket/createTicket",
  async (formData) => {
    const url = `${liveServer}/ticket`;
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

export const getUserTickets = createAsyncThunk(
  "ticket/getUserTickets",
  async () => {
    const url = `${liveServer}/ticket`;
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
  }
);

export const getTicket = createAsyncThunk(
  "ticket/getTicket",
  async ({ ticketId }) => {
    const url = `${liveServer}/ticket/${ticketId}`;
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
  }
);

export const replyTicket = createAsyncThunk(
  "ticket/replyTicket",
  async (formData) => {
    const url = `${liveServer}/ticket`;
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

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    resetCreateTicket(state) {
      state.createTicketError = false;
      state.createTicketLoading = false;
      state.ticketCreated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.createTicketLoading = true;
      })
      .addCase(createTicket.fulfilled, (state) => {
        state.createTicketLoading = false;
        state.createTicketError = false;
        state.ticketCreated = true;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.createTicketLoading = false;
        state.createTicketError = action.error.message;
        state.ticketCreated = false;
      });

    builder
      .addCase(replyTicket.pending, (state) => {
        state.replyTicketLoading = true;
      })
      .addCase(replyTicket.fulfilled, (state) => {
        state.replyTicketLoading = false;
        state.replyTicketError = false;
        state.ticketReplied = true;
      })
      .addCase(replyTicket.rejected, (state, action) => {
        state.replyTicketLoading = false;
        state.replyTicketError = action.error.message;
        state.ticketReplied = false;
      });

    builder
      .addCase(getUserTickets.pending, (state) => {
        state.getTicketLoading = true;
      })
      .addCase(getUserTickets.fulfilled, (state, action) => {
        state.getTicketLoading = false;
        state.getTicketError = false;
        state.tickets = action.payload;
      })
      .addCase(getUserTickets.rejected, (state, action) => {
        state.getTicketLoading = false;
        state.getTicketError = action.error.message;
        state.tickets = false;
      });

    builder
      .addCase(getTicket.pending, (state) => {
        state.ticketDataLoading = true;
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        state.ticketDataLoading = false;
        state.ticketDataError = false;
        state.ticketData = action.payload.ticket;
      })
      .addCase(getTicket.rejected, (state, action) => {
        state.ticketDataLoading = false;
        state.ticketDataError = action.error.message;
        state.ticketData = false;
      });
  },
});

export const { resetCreateTicket } = ticketSlice.actions;

export default ticketSlice.reducer;
