import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  updateProfile,
  getMyParticipations,
  getMyCreatedEvents
} from "../api/profileApi";

export const fetchParticipations = createAsyncThunk(
  "profile/participations",
  async (userId) => await getMyParticipations(userId)
);

export const fetchCreatedEvents = createAsyncThunk(
  "profile/createdEvents",
  async (userId) => await getMyCreatedEvents(userId)
);

export const saveProfile = createAsyncThunk(
  "profile/update",
  async (data) => await updateProfile(data)
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    participations: [],
    createdEvents: [],
    loading: false
  },
  reducers: {
    removeCreatedEvent: (state, action) => {
      state.createdEvents = state.createdEvents.filter(
        (event) => event.idE !== action.payload
      );
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchParticipations.fulfilled, (state, action) => {
        state.participations = action.payload;
      })
      .addCase(fetchCreatedEvents.fulfilled, (state, action) => {
        state.createdEvents = action.payload;
      });
  }
});

export const { removeCreatedEvent } = profileSlice.actions;
export default profileSlice.reducer;
