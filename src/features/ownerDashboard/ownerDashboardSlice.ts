import api from '@/services/api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  OwnerDashboardState,
  OwnerDashboardData,
  OwnerDashboardResponse,
} from '@/types/OwnerDashboard';

const initialState: OwnerDashboardState = {
  stats: null,
  loading: false,
  error: null,
};

const ownerDashboardSlice = createSlice({
  name: 'ownerDashboard',
  initialState,
  reducers: {
    ownerDashboardRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    ownerDashboardRequestFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setOwnerDashboardStats: (
      state,
      action: PayloadAction<OwnerDashboardData>
    ) => {
      state.stats = action.payload;
      state.loading = false;
    },
    clearOwnerDashboardState: () => initialState,
  },
});

export const {
  ownerDashboardRequestStart,
  ownerDashboardRequestFailure,
  setOwnerDashboardStats,
  clearOwnerDashboardState,
} = ownerDashboardSlice.actions;

export const fetchOwnerDashboardStats = () => async (dispatch: any) => {
  dispatch(ownerDashboardRequestStart());

  try {
    const res = await api.get<OwnerDashboardResponse>('/owner/dashboard');

    if (res.data?.success) {
      dispatch(setOwnerDashboardStats(res.data.dashboard));
    } else {
      dispatch(
        ownerDashboardRequestFailure(
          'Failed to load owner dashboard'
        )
      );
    }
  } catch (error: any) {
    dispatch(
      ownerDashboardRequestFailure(
        error.response?.data?.error ||
        error.message ||
        'Failed to load owner dashboard'
      )
    );
  }
};

export default ownerDashboardSlice.reducer;
