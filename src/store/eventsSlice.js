import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getEventsForUser,
  getMyOrganizerEvents,
  getAllEventsAdmin,
  createEvent,
  deleteEvent
} from "../api/eventsApi";

/* Fetch events for normal user */
export const fetchEvents = createAsyncThunk(
  "events/fetch",
  async ({ role, userId }) => {
    if (role === "admin") return await getAllEventsAdmin();
    if (role === "organizer") return await getMyOrganizerEvents(userId);
    return await getEventsForUser();
  }
);

export const addEvent = createAsyncThunk(
  "events/add",
  async ({ event, user }) => await createEvent(event, user)
);

export const removeEvent = createAsyncThunk(
  "events/remove",
  async (eventId) => await deleteEvent(eventId)
);

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    events: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.events = action.payload;
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
      })
      .addCase(removeEvent.fulfilled, (state, action) => {
        state.events = state.events.filter(e => e.idE !== action.meta.arg);
      });
  }
});

export default eventsSlice.reducer;
