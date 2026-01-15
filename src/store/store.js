import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import eventsReducer from "./eventsSlice";
import requestsReducer from "./organizerRequestsSlice";
import evaluationsReducer from "./evaluationsSlice";
import profileReducer from "./profileSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventsReducer,
    requests: requestsReducer,
    evaluations: evaluationsReducer,
    profile: profileReducer,
  },
});
