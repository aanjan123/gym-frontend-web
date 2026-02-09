import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '@services/api';
import { CREATE_GYM } from '@/constants/url';
import { CreateGym, Gym } from '@/types/Gym';

interface GymsState {
  gyms: Gym[];
  selectedGym: Gym | null;
  loading: boolean;
  error: string | null;
  filters: {
    status: 'all' | 'active' | 'suspended' | 'trial';
    search: string;
  };
}

const initialState: GymsState = {
  gyms: [],
  selectedGym: null,
  loading: false,
  error: null,
  filters: {
    status: 'all',
    search: '',
  },
};

const gymsSlice = createSlice({
  name: 'gyms',
  initialState,
  reducers: {

    gymsRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    gymsRequestFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearGymsState: () => initialState,

    setGyms: (state, action: PayloadAction<Gym[]>) => {
      state.gyms = action.payload;
      state.loading = false;
    },

    addGym: (state, action: PayloadAction<Gym>) => {
      state.gyms.unshift(action.payload);
      state.loading = false;
      state.selectedGym = action.payload;
    },

    setSelectedGym: (state, action: PayloadAction<Gym | null>) => {
      state.selectedGym = action.payload;
      state.loading = false;
    },

    setStatusFilter: (
      state,
      action: PayloadAction<'all' | 'active' | 'suspended' | 'trial'>
    ) => {
      state.filters.status = action.payload;
    },

    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
    },

    suspendGym: (state, action: PayloadAction<number>) => {
      const gym = state.gyms.find((g) => g.id === action.payload);
      if (gym) gym.status = 'suspended';
    },

    activateGym: (state, action: PayloadAction<number>) => {
      const gym = state.gyms.find((g) => g.id === action.payload);
      if (gym) gym.status = 'active';
    },
  },
});

export const {
  gymsRequestStart,
  gymsRequestFailure,
  clearGymsState,
  setGyms,
  addGym,
  setSelectedGym,
  setStatusFilter,
  setSearchFilter,
  suspendGym,
  activateGym,
} = gymsSlice.actions;

export const createGym = (payload: CreateGym) => {
  return async (dispatch: any) => {
    dispatch(gymsRequestStart());

    try {
      const res = await api.post(CREATE_GYM, payload);

      if (res.data?.success) {
        dispatch(addGym(res.data.gym));
      } else {
        dispatch(gymsRequestFailure(res.data?.error || 'Failed to create gym'));
      }
    } catch (error: any) {
      dispatch(
        gymsRequestFailure(
          error.response?.data?.details || error.response?.data?.error || error.message || 'Failed to create gym'
        )
      );
    }
  };
};

export const fetchGymById = (gymId: number) => {
  return async (dispatch: any) => {
    dispatch(gymsRequestStart());

    try {
      const res = await api.get(`/superadmin/gyms/${gymId}`);
      console.log(res)

      if (res.data?.success) {
        dispatch(setSelectedGym(res.data.gym));
      } else {
        dispatch(gymsRequestFailure('Failed to fetch gym'));
      }
    } catch (error: any) {
      console.log(error.response?.data)
      dispatch(
        gymsRequestFailure(
          error.response?.data?.details || error.response?.data?.error || error.message || 'Failed to fetch gym'
        )
      );
    }
  };
};

export const fetchAllGyms = (page = 1, limit = 50) => {
  return async (dispatch: any) => {
    dispatch(gymsRequestStart());

    try {
      const res = await api.get(
        `/superadmin/gyms?page=${page}&limit=${limit}`
      );

      if (res.data?.success) {
        dispatch(setGyms(res.data.gyms));
      } else {
        dispatch(gymsRequestFailure('Failed to fetch gyms'));
      }
    } catch (error: any) {
      dispatch(
        gymsRequestFailure(
          error.response?.data?.error || error.message || 'Failed to fetch gyms'
        )
      );
    }
  };
};

export const suspendGymAsync = (gymId: number, reason: string) => {
  return async (dispatch: any) => {
    dispatch(gymsRequestStart());

    try {
      const res = await api.post(
        `/superadmin/gyms/${gymId}/suspend`,
        { reason }
      );

      if (res.data?.success) {
        dispatch(suspendGym(gymId));

        dispatch(setSelectedGym(res.data.gym));
      } else {
        dispatch(
          gymsRequestFailure(res.data?.error || 'Failed to suspend gym')
        );
      }
    } catch (error: any) {
      dispatch(
        gymsRequestFailure(
          error.response?.data?.details ||
            error.response?.data?.error ||
            error.message ||
            'Failed to suspend gym'
        )
      );
    }
  };
};

export const activateGymAsync = (gymId: number) => {
  return async (dispatch: any) => {
    dispatch(gymsRequestStart());

    try {
      const res = await api.post(
        `/superadmin/gyms/${gymId}/activate`
      );

      if (res.data?.success) {
        dispatch(activateGym(gymId));
        dispatch(setSelectedGym(res.data.gym));
      } else {
        dispatch(
          gymsRequestFailure(res.data?.error || 'Failed to activate gym')
        );
      }
    } catch (error: any) {
      dispatch(
        gymsRequestFailure(
          error.response?.data?.details ||
            error.response?.data?.error ||
            error.message ||
            'Failed to activate gym'
        )
      );
    }
  };
};


export default gymsSlice.reducer;
