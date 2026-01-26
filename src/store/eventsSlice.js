import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllEvents,
  getMyOrganizerEvents,
  createEvent,
  deleteEvent,
  updateEvent,
} from "../api/eventsApi";

export const fetchEvents = createAsyncThunk("events/fetch", async () => {
  return await getAllEvents();
});

export const addEvent = createAsyncThunk(
  "events/add",
  async ({ event, user }) => {
    const res = await createEvent(event, user);
    return res;
  },
);

export const editEvent = createAsyncThunk(
  "events/edit",
  async ({ id, event }) => {
    const res = await updateEvent(id, event);
    return { ...event, idE: id };
  },
);

export const removeEvent = createAsyncThunk(
  "events/remove",
  async (eventId) => {
    await deleteEvent(eventId);
    return eventId;
  },
);

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.events.unshift(action.payload);
      })
      .addCase(removeEvent.fulfilled, (state, action) => {
        state.events = state.events.filter((e) => e.idE !== action.payload);
      });
  },
});

export default eventsSlice.reducer;
