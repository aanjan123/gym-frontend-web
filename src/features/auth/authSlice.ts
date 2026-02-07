import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, superAdminUser, gymOwners } from '../../data/dummyData';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
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
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions;

// Thunk for login
export const login = (email: string, password: string, gymId?: string) => {
  return (dispatch: any) => {
    dispatch(loginStart());

    // Simulate API call
    setTimeout(() => {
      // Super Admin Login
      if (email === 'admin@gymsaas.com' && password === 'admin123') {
        dispatch(loginSuccess(superAdminUser));
        return;
      }

      // Gym Owner Login
      if (gymId) {
        const owner = gymOwners.find(
          (o) => o.email === email && o.gymId === gymId
        );
        if (owner && password === 'owner123') {
          dispatch(loginSuccess(owner));
          return;
        }
      }

      dispatch(loginFailure('Invalid credentials'));
    }, 1000);
  };
};

export default authSlice.reducer;
