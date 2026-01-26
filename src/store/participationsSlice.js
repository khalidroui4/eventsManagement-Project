import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  participateInEvent,
  cancelParticipation,
  checkParticipation,
} from "../api/participationsApi";

export const participate = createAsyncThunk(
  "participations/participate",
  async ({ user_id, event_id }) => await participateInEvent(user_id, event_id),
);

export const cancel = createAsyncThunk(
  "participations/cancel",
  async ({ user_id, event_id }) => await cancelParticipation(user_id, event_id),
);

export const check = createAsyncThunk(
  "participations/check",
  async ({ user_id, event_id }) => await checkParticipation(user_id, event_id),
);

const participationsSlice = createSlice({
  name: "participations",
  initialState: {
    isParticipating: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(check.fulfilled, (state, action) => {
        state.isParticipating = action.payload.exists;
      })
      .addCase(participate.fulfilled, (state) => {
        state.isParticipating = true;
      })
      .addCase(cancel.fulfilled, (state) => {
        state.isParticipating = false;
      });
  },
});

export default participationsSlice.reducer;
