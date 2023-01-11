import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authHandler } from '../api/apiHandlers/authHandler';

import { getUsers } from '../api/apiHandlers/dataBaseHandler';
import { signUpHandler } from '../api/apiHandlers/signUpHandler';
import { instanceOfErrorResponse } from '../shared/checkObjType';

import {
  ErrorResponse,
  IInitialStateUsers,
  SuccessLoginResponse,
} from '../shared/interfaces';
import { localStorageHandler } from '../shared/localStorage';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const res = await getUsers();

  if (res.length) {
    return res;
  }
});

export const signUpUser = createAsyncThunk(
  'users/signUpUser',
  async (
    user: { email: string, nickname: string, password: string },
    { rejectWithValue }
  ) => {
    const res: ErrorResponse | SuccessLoginResponse = await signUpHandler(user);

    if (instanceOfErrorResponse(res)) {
      return rejectWithValue(res.error.code);
    }

    localStorageHandler('setItem', 'uid', res.user.uid);
  }
);

export const signInUser = createAsyncThunk(
  'users/signInUser',
  async (user: { email: string, password: string }, { rejectWithValue }) => {
    const res: ErrorResponse | SuccessLoginResponse = await authHandler(user);

    if (instanceOfErrorResponse(res)) {
      return rejectWithValue(res.error.code);
    }

    localStorageHandler('setItem', 'uid', res.user.uid);
  }
);

const initialState: IInitialStateUsers = {
  users: [],
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    removeError(state) {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        if (action.payload) {
          state.users = action.payload;
        }
      })
      .addCase(signUpUser.rejected, (state, action) => {
        if (action.payload) {
          state.error = String(action.payload);
        }
      })
      .addCase(signInUser.rejected, (state, action) => {
        if (action.payload) {
          state.error = String(action.payload);
        }
      });
  },
});

export const userReducer = userSlice.reducer;
export const { removeError } = userSlice.actions;
