import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  sendOrganizerRequest,
  fetchOrganizerRequests,
  approveOrganizerRequest
} from "../api/organizerRequestsApi";

export const loadRequests = createAsyncThunk(
  "requests/load",
  async () => await fetchOrganizerRequests()
);

export const sendRequest = createAsyncThunk(
  "requests/send",
  async ({ user_id, message }) =>
    await sendOrganizerRequest(user_id, message)
);

export const approveRequest = createAsyncThunk(
  "requests/approve",
  async (user_id) => await approveOrganizerRequest(user_id)
);

const requestsSlice = createSlice({
  name: "requests",
  initialState: { requests: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadRequests.fulfilled, (state, action) => {
        state.requests = action.payload;
      })
      .addCase(approveRequest.fulfilled, (state, action) => {
        state.requests = state.requests.filter(r => r.user_id !== action.meta.arg);
      });
  }
});

export default requestsSlice.reducer;
