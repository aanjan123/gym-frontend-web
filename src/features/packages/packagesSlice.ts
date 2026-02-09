import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '@services/api';
import { Package } from './types';
import {
  FETCH_PACKAGES,
  CREATE_PACKAGE,
  UPDATE_PACKAGE,
  DELETE_PACKAGE,
} from '@/constants/url';

interface PackagesState {
  packages: Package[];
  loading: boolean;
  error: string | null;
  validationErrors: Record<string, string>;
  lastCreatedPackage: Package | null;
}

const initialState: PackagesState = {
  packages: [],
  loading: false,
  error: null,
  validationErrors: {},
  lastCreatedPackage: null,
};

const packagesSlice = createSlice({
  name: 'packages',
  initialState,
  reducers: {
    packagesRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.validationErrors = {};
      state.lastCreatedPackage = null;
    },
    packagesRequestFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setPackages: (state, action: PayloadAction<Package[]>) => {
      state.packages = action.payload;
      state.loading = false;
    },
    addPackage: (state, action: PayloadAction<Package>) => {
      state.packages.unshift(action.payload);
      state.loading = false;
      state.validationErrors = {};
      state.lastCreatedPackage = action.payload;
    },
    updatePackageInState: (state, action: PayloadAction<Package>) => {
      const idx = state.packages.findIndex(p => p.id === action.payload.id);
      if (idx !== -1) state.packages[idx] = action.payload;
      state.loading = false;
      state.lastCreatedPackage = action.payload;
    },
    deletePackageFromState: (state, action: PayloadAction<number>) => {
      state.packages = state.packages.filter(p => p.id !== action.payload);
      state.loading = false;
    },
    setValidationErrors: (state, action: PayloadAction<Record<string, string>>) => {
      state.validationErrors = action.payload;
      state.loading = false;
    },
    clearLastCreatedPackage: (state) => {
      state.lastCreatedPackage = null;
    },
    clearPackagesState: () => initialState,
  },
});

export const {
  packagesRequestStart,
  packagesRequestFailure,
  setPackages,
  addPackage,
  updatePackageInState,
  deletePackageFromState,
  setValidationErrors,
  clearLastCreatedPackage,
  clearPackagesState,
} = packagesSlice.actions;

export const fetchPackages = () => {
  return async (dispatch: any) => {
    dispatch(packagesRequestStart());
    try {
      const res = await api.get(FETCH_PACKAGES);
      if (res.data?.success) {
        dispatch(setPackages(res.data.packages));
      } else {
        dispatch(packagesRequestFailure(res.data?.error || 'Failed to fetch packages'));
      }
    } catch (error: any) {
      dispatch(packagesRequestFailure(error.response?.data?.error || error.message || 'Failed to fetch packages'));
    }
  };
};

export const createPackage = (payload: any) => {
  return async (dispatch: any) => {
    dispatch(packagesRequestStart());
    try {
      const res = await api.post(CREATE_PACKAGE, payload);
      if (res.data?.success) {
        dispatch(addPackage(res.data.package));
      } else if (res.data?.details) {
        const errors: Record<string, string> = {};
        res.data.details.forEach((e: any) => {
          errors[e.field] = e.message;
        });
        dispatch(setValidationErrors(errors));
      } else {
        dispatch(packagesRequestFailure(res.data?.error || 'Failed to create package'));
      }
    } catch (error: any) {
      const errDetails = error.response?.data?.details;
      if (errDetails) {
        const errors: Record<string, string> = {};
        errDetails.forEach((e: any) => {
          errors[e.field] = e.message;
        });
        dispatch(setValidationErrors(errors));
      } else {
        dispatch(packagesRequestFailure(error.response?.data?.error || error.message || 'Failed to create package'));
      }
    }
  };
};

export const updatePackage = (id: number, payload: any) => {
  return async (dispatch: any) => {
    dispatch(packagesRequestStart());
    try {
      const res = await api.put(`${UPDATE_PACKAGE}/${id}`, payload);
      if (res.data?.success) {
        dispatch(updatePackageInState(res.data.package));
      } else if (res.data?.details) {
        const errors: Record<string, string> = {};
        res.data.details.forEach((e: any) => {
          errors[e.field] = e.message;
        });
        dispatch(setValidationErrors(errors));
      } else {
        dispatch(packagesRequestFailure(res.data?.error || 'Failed to update package'));
      }
    } catch (error: any) {
      const errDetails = error.response?.data?.details;
      if (errDetails) {
        const errors: Record<string, string> = {};
        errDetails.forEach((e: any) => {
          errors[e.field] = e.message;
        });
        dispatch(setValidationErrors(errors));
      } else {
        dispatch(packagesRequestFailure(error.response?.data?.error || error.message || 'Failed to update package'));
      }
    }
  };
};

export const deletePackage = (id: number) => {
  return async (dispatch: any) => {
    dispatch(packagesRequestStart());
    try {
      const res = await api.delete(`${DELETE_PACKAGE}/${id}`);
      if (res.data?.success) {
        dispatch(deletePackageFromState(id));
      } else {
        dispatch(packagesRequestFailure(res.data?.error || 'Failed to delete package'));
      }
    } catch (error: any) {
      dispatch(packagesRequestFailure(error.response?.data?.error || error.message || 'Failed to delete package'));
    }
  };
};

export default packagesSlice.reducer;
