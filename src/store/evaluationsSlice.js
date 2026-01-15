import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addEvaluation,
  getEvaluationsByEvent,
  deleteEvaluation
} from "../api/evaluationsApi";

export const fetchEvaluations = createAsyncThunk(
  "evaluations/fetch",
  async (eventId) => await getEvaluationsByEvent(eventId)
);

export const createEvaluation = createAsyncThunk(
  "evaluations/create",
  async (data) => await addEvaluation(data)
);

export const removeEvaluation = createAsyncThunk(
  "evaluations/remove",
  async (id) => await deleteEvaluation(id)
);

const evaluationsSlice = createSlice({
  name: "evaluations",
  initialState: { list: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvaluations.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(createEvaluation.fulfilled, (state, action) => {
        state.list.unshift(action.meta.arg);
      })
      .addCase(removeEvaluation.fulfilled, (state, action) => {
        state.list = state.list.filter(e => e.ide !== action.meta.arg);
      });
  }
});

export default evaluationsSlice.reducer;
