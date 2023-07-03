import {
  createSlice,
  createAsyncThunk,
  Reducer,
  createAction,
} from "@reduxjs/toolkit";
import { axiosInstance } from "../../instance";
import endpoints from "../../requests/endpoints";
import {
  fetchCreateUser,
  fetchUpdatePassword,
  fetchUpdateUser,
  fetchUserList,
} from "../actions/users";

export interface AuthSliceProps {
  signed: boolean;
  loading: boolean;
  token: {
    value: string;
    expires: string;
  };
  user: {
    id?: number;
    name: string;
    email: string;
  };
}

const initialState: AuthSliceProps = {
  signed: false,
  loading: false,
  token: {
    value: "",
    expires: "",
  },
  user: {
    id: 0,
    name: "",
    email: "",
  },
};

export interface LoginResponseProps {
  message: string;
  token: {
    value: string;
    expires: string;
  };
  user: {
    name: string;
    email: string;
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

export const stopLoading = createAction("authentication.stopLoading");

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
        state.user = action.payload.user;
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
        state.user.name = "";
        state.user.email = "";
      })
      .addCase(fetchCreateUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCreateUser.rejected, (state, action) => {
        state.loading = false;
        state.signed = true;
      })
      .addCase(fetchCreateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.signed = false;
      })
      .addCase(fetchUpdateUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchUpdateUser.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(fetchUpdatePassword.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchUpdatePassword.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchUpdatePassword.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(stopLoading, (state, action) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer as Reducer<typeof initialState>;
