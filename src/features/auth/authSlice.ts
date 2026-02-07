import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import api, { setAuthToken } from '@services/api';
import { LoginResponse, User } from '@/types/User';
import { AUTH_PROFILE, GYM_OWNER_LOGIN, SUPER_ADMIN_LOGIN, SUPER_ADMIN_PROFILE } from '@/constants/url';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  initializing: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  initializing: true,
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
      state.initializing = false;
      state.error = null;

      if (action.payload.token) {
        setAuthToken(action.payload.token);
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('role', action.payload.user?.role || 'owner');
      }
    },

    setAuthFromProfile: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.initializing = false;
      state.error = null;
    },

    authInitFinished: (state) => {
      state.initializing = false;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.initializing = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      setAuthToken(null);
      localStorage.removeItem('token');
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.initializing = false;
      state.error = null;
      setAuthToken(null);
      localStorage.removeItem('token');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  logout,
  loginStart,
  clearError,
  loginSuccess,
  loginFailure,
  authInitFinished,
  setAuthFromProfile
} = authSlice.actions;

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
            success: false,
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

export const initializeAuth = () => {
  return async (dispatch: any) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
      dispatch(authInitFinished());
      return;
    }

    try {
      setAuthToken(token);

      const response = await api.get(role === 'owner' ? AUTH_PROFILE : SUPER_ADMIN_PROFILE);
      if (response.data?.success) {
        const data = response.data.profile;
        dispatch(setAuthFromProfile(data));
      } else {
        dispatch(logout());
      }
    } catch (error) {
      dispatch(logout());
    } finally {
      dispatch(authInitFinished());
    }
  };
};

export default authSlice.reducer;
