import { createSlice, createAsyncThunk, Reducer } from "@reduxjs/toolkit";
import { axiosInstance } from "../../instance";
import endpoints from "../../requests/endpoints";

const initialState = {
  signed: false,
  loading: false,
  token: {
    value: "",
    expires: "",
  },
};

export interface LoginResponseProps {
  message: string;
  token: {
    value: string;
    expires: string;
  };
}

export interface LoginPayloadProps {
  email: string;
  password: string;
}

export const fetchLogin = createAsyncThunk<
  LoginResponseProps,
  LoginPayloadProps
>("authentication.fetchLogin", async (data, { rejectWithValue }) => {
  try {
    const api = axiosInstance;
    const response = await api({
      baseURL: process.env.REACT_APP_BASE_URL + endpoints.login,
      method: "POST",
      data,
    });

    return response.data;
  } catch (err) {
    rejectWithValue(err);
  }
});

export interface LogoutResponseProps {
  message: string;
}

export const logout = createAsyncThunk<LogoutResponseProps>(
  "authentication.logout",
  async (data, { rejectWithValue }) => {
    try {
      const api = axiosInstance;
      const response = await api({
        baseURL: process.env.REACT_APP_BASE_URL + endpoints.logout,
        method: "GET",
      });

      return response.data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.loading = false;
        state.signed = false;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.signed = true;
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(logout.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.signed = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.signed = false;
      });
  },
});

export default authSlice.reducer as Reducer<typeof initialState>;
