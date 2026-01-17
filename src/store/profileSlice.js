import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  updateProfile,
  getMyParticipations,
  getMyCreatedEvents,
  getAllEvents   // <-- add this
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
      /* Participations */
      .addCase(fetchParticipations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchParticipations.fulfilled, (state, action) => {
        state.loading = false;
        state.participations = action.payload;
      })
      .addCase(fetchParticipations.rejected, (state) => {
        state.loading = false;
      })
      /* Created Events */
      .addCase(fetchCreatedEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCreatedEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.createdEvents = action.payload;
      })
      .addCase(fetchCreatedEvents.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const { removeCreatedEvent } = profileSlice.actions;
export default profileSlice.reducer;
