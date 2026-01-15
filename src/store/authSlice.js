import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, registerUser } from "../api/authApi";

/* =========================
   SAFE LOAD USER FROM LOCALSTORAGE
   ========================= */
let savedUser = localStorage.getItem("user");

try {
  savedUser = savedUser ? JSON.parse(savedUser) : null;
} catch (e) {
  console.error("Invalid user in localStorage, clearing it");
  localStorage.removeItem("user");
  savedUser = null;
}

/* =========================
   THUNKS
   ========================= */

export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await registerUser(data);
      if (!res.success) return rejectWithValue(res.error || "Register failed");
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, motdepasse }, { rejectWithValue }) => {
    try {
      const res = await login(email, motdepasse);
      if (!res.success) return rejectWithValue(res.error || "Login failed");
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* =========================
   SLICE
   ========================= */

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: savedUser,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    setUserProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem("user", JSON.stringify(state.user));
    },
  },
  extraReducers: (builder) => {
    builder
      /* REGISTER */
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* LOGIN */
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setUserProfile } = authSlice.actions;
export default authSlice.reducer;
