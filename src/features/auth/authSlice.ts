import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import api, { setAuthToken } from '@services/api';
import { LoginResponse, User } from '@/types/User';
import { GYM_OWNER_LOGIN, SUPER_ADMIN_LOGIN } from '@/constants/url';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<LoginResponse>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;

      setAuthToken(action.payload.token);
      localStorage.setItem('token', action.payload.token);
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      setAuthToken(null);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      setAuthToken(null);
      localStorage.removeItem('token');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions;

export const login = (email: string, password: string, gymId = '') => {
  return async (dispatch: any) => {
    dispatch(loginStart());

    try {
      const response = await api.post<LoginResponse>(
        gymId ? GYM_OWNER_LOGIN : SUPER_ADMIN_LOGIN,
        gymId ? { email, password, gymId } : { email, password }
      );

      if (response.status === 200) {
        const responseData: any = response.data;
        if (responseData.success && responseData.requirePasswordChange) {
          dispatch(loginSuccess({
            user: {
              userId: responseData.userId,
              role: 'owner',
              requirePasswordChange: true
            },
            token: '',
          }));
          return
        }
        dispatch(loginSuccess(responseData));
      }
    } catch (error: any) {
      const message =
        error.response?.data?.error || error.message || 'Login failed';
      dispatch(loginFailure(message));
    }
  };
};

export default authSlice.reducer;
