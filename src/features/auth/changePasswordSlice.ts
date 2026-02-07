import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import api from '@services/api';
import { ChangePasswordRequest, ChangePasswordResponse } from '@/types/User';
import { CHANGE_PASSWORD } from '@/constants/url';

interface ChangePasswordState {
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: ChangePasswordState = {
  loading: false,
  error: null,
  success: null,
};

const changePasswordSlice = createSlice({
  name: 'changePassword',
  initialState,
  reducers: {
    changePasswordStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    changePasswordSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.success = action.payload;
      state.error = null;
    },
    changePasswordFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.success = null;
    },
    clearChangePasswordState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = null;
    },
  },
});

export const {
  changePasswordStart,
  changePasswordSuccess,
  changePasswordFailure,
  clearChangePasswordState,
} = changePasswordSlice.actions;

export const changePassword = (payload: ChangePasswordRequest) => {
  return async (dispatch: any) => {
    dispatch(changePasswordStart());

    try {
      const response = await api.post<ChangePasswordResponse>(
        CHANGE_PASSWORD,
        payload
      );

      dispatch(changePasswordSuccess(response.data.message));
    } catch (error: any) {
      const message =
        error.response?.data?.error || error.message || 'Password change failed';
      dispatch(changePasswordFailure(message));
    }
  };
};

export default changePasswordSlice.reducer;
