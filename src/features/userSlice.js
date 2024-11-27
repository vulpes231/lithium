import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  devServer,
  getAccessToken,
  liveServer,
  sendError,
} from "../utils/utils";
import axios from "axios";

const initialState = {
  getUserLoading: false,
  getUserError: false,
  user: false,
  editUserLoading: false,
  editUserError: null,
  userEdited: false,
  updatePassLoading: false,
  updatePassError: null,
  passUpdated: false,
  logoutLoading: false,
  logoutError: null,
  loggedOut: false,
};

export const getUser = createAsyncThunk("user/getUser", async () => {
  const url = `${devServer}/user`;
  const accessToken = getAccessToken();
  //   console.log(accessToken);
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
});

export const editUser = createAsyncThunk("user/editUser", async (formData) => {
  const url = `${devServer}/user`;
  const accessToken = getAccessToken();
  //   console.log(accessToken);
  try {
    const response = await axios.put(url, formData, {
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
});

export const changePass = createAsyncThunk(
  "user/changePass",
  async (formData) => {
    const url = `${devServer}/user/changepass`;
    const accessToken = getAccessToken();
    //   console.log(accessToken);
    try {
      const response = await axios.post(url, formData, {
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

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  const url = `${devServer}/user/logout`;
  const accessToken = getAccessToken();
  //   console.log(accessToken);
  try {
    const response = await axios.post(
      url,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    sendError(error);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetChangePass(state) {
      state.updatePassLoading = false;
      state.updatePassError = null;
      state.passUpdated = false;
    },
    resetEditUser(state) {
      state.editUserLoading = false;
      state.editUserError = null;
      state.userEdited = false;
    },
    resetLogout(state) {
      state.logoutLoading = false;
      state.logoutError = null;
      state.loggedOut = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.getUserLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.getUserLoading = false;
        state.getUserError = false;
        state.user = action.payload.user;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.getUserLoading = false;
        state.getUserError = action.error.message;
        state.user = false;
      });

    builder
      .addCase(editUser.pending, (state) => {
        state.editUserLoading = true;
      })
      .addCase(editUser.fulfilled, (state) => {
        state.editUserLoading = false;
        state.editUserError = null;
        state.userEdited = true;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.editUserLoading = false;
        state.editUserError = action.error.message;
        state.userEdited = false;
      });

    builder
      .addCase(changePass.pending, (state) => {
        state.updatePassLoading = true;
      })
      .addCase(changePass.fulfilled, (state) => {
        state.updatePassLoading = false;
        state.updatePassError = null;
        state.passUpdated = true;
      })
      .addCase(changePass.rejected, (state, action) => {
        state.updatePassLoading = false;
        state.updatePassError = action.error.message;
        state.passUpdated = false;
      });

    builder
      .addCase(logoutUser.pending, (state) => {
        state.logoutLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.logoutLoading = false;
        state.logoutError = null;
        state.loggedOut = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.logoutLoading = false;
        state.logoutError = action.error.message;
        state.loggedOut = false;
      });
  },
});

export const { resetChangePass, resetEditUser, resetLogout } =
  userSlice.actions;
export default userSlice.reducer;
