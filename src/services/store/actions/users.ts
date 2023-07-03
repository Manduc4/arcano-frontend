import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../instance";
import endpoints from "../../requests/endpoints";

export interface CreateUserResponseProps {
  message: string;
  token: {
    value: string;
    expires: string;
  };
}

export interface CreateUserPayloadProps {
  name: string;
  email: string;
  password: string;
}

export const fetchCreateUser = createAsyncThunk<
  CreateUserResponseProps,
  CreateUserPayloadProps
>("authentication.fetchCreateUser", async (data, { rejectWithValue }) => {
  try {
    const api = axiosInstance;
    const response = await api({
      baseURL: process.env.REACT_APP_BASE_URL + endpoints.register,
      method: "POST",
      data,
    });

    return response.data;
  } catch (err) {
    rejectWithValue(err);
  }
});

interface UpdateUserPayloadProps {
  id: number;
  name: string;
  email: string;
}

interface UpdateUserResponseProps {
  message: string;
  user: {
    name: string;
    email: string;
  };
}

export const fetchUpdateUser = createAsyncThunk<
  UpdateUserResponseProps,
  UpdateUserPayloadProps
>("authentication.fetchUpdateUser", async (data, { rejectWithValue }) => {
  try {
    const api = axiosInstance;
    const response = await api({
      baseURL: `${process.env.REACT_APP_BASE_URL}${endpoints.users}/${String(
        data.id
      )}`,
      method: "PUT",
      data: {
        name: data.name,
        email: data.email,
      },
    });

    return response.data;
  } catch (err) {
    rejectWithValue(err);
  }
});

export interface UpdatePasswordPayloadProps {
  password: string;
}

export interface UpdatePasswordResponseProps {
  message: string;
}

export const fetchUpdatePassword = createAsyncThunk<
  UpdatePasswordResponseProps,
  UpdatePasswordPayloadProps
>("authentication.fetchUpdatePassword", async (data, { rejectWithValue }) => {
  try {
    const api = axiosInstance;
    const response = await api({
      baseURL: `${process.env.REACT_APP_BASE_URL}${endpoints.changePassword}`,
      method: "PUT",
      data: {
        password: data.password,
      },
    });

    return response.data;
  } catch (err) {
    rejectWithValue(err);
  }
});

export const fetchUserList = createAsyncThunk<CreateUserResponseProps>(
  "authentication.fetchUserList",
  async (data, { rejectWithValue }) => {
    try {
      const api = axiosInstance;
      const response = await api({
        baseURL: process.env.REACT_APP_BASE_URL + endpoints.users,
        method: "GET",
        data,
      });

      return response.data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);
