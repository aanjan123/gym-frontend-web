import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Gym, gyms as initialGyms } from '../../data/dummyData';

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
  gyms: initialGyms,
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
    setGyms: (state, action: PayloadAction<Gym[]>) => {
      state.gyms = action.payload;
    },
    addGym: (state, action: PayloadAction<Gym>) => {
      state.gyms.unshift(action.payload);
    },
    updateGym: (state, action: PayloadAction<Gym>) => {
      const index = state.gyms.findIndex((g) => g.id === action.payload.id);
      if (index !== -1) {
        state.gyms[index] = action.payload;
      }
    },
    setSelectedGym: (state, action: PayloadAction<Gym | null>) => {
      state.selectedGym = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<'all' | 'active' | 'suspended' | 'trial'>) => {
      state.filters.status = action.payload;
    },
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
    },
    suspendGym: (state, action: PayloadAction<string>) => {
      const gym = state.gyms.find((g) => g.id === action.payload);
      if (gym) {
        gym.status = 'suspended';
      }
    },
    activateGym: (state, action: PayloadAction<string>) => {
      const gym = state.gyms.find((g) => g.id === action.payload);
      if (gym) {
        gym.status = 'active';
      }
    },
  },
});

export const {
  setGyms,
  addGym,
  updateGym,
  setSelectedGym,
  setStatusFilter,
  setSearchFilter,
  suspendGym,
  activateGym,
} = gymsSlice.actions;

export default gymsSlice.reducer;
