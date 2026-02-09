import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import api from '@/services/api';
import { DashboardState, DashboardStatsApiResponse } from '@/types/Dashboard';

const initialState: DashboardState = {
  stats: null,
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    dashboardRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    dashboardRequestFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setDashboardStats: (state, action: PayloadAction<DashboardStatsApiResponse>) => {
      state.stats = action.payload;
      state.loading = false;
    },
    clearDashboardState: () => initialState,
  },
});

export const {
  dashboardRequestStart,
  dashboardRequestFailure,
  setDashboardStats,
  clearDashboardState,
} = dashboardSlice.actions;

export const fetchDashboardStats = () => async (dispatch: any) => {
  dispatch(dashboardRequestStart());
  try {
    const res = await api.get('/superadmin/dashboard');

    if (res.data?.success) {
      dispatch(setDashboardStats(res.data.dashboard));
    } else {
      dispatch(
        dashboardRequestFailure(res.data?.error || 'Failed to load dashboard')
      );
    }
  } catch (error: any) {
    dispatch(
      dashboardRequestFailure(
        error.response?.data?.error ||
        error.message ||
        'Failed to load dashboard'
      )
    );
  }
};

export default dashboardSlice.reducer;
