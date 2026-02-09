import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/services/api';
import {
  Attendance,
  AttendanceListResponse,
  ManualAttendancePayload,
  CheckInPayload,
  CheckOutPayload,
  AttendanceStatsResponse,
} from '@/types/Attendance';

interface AttendanceState {
  list: Attendance[];
  stats: AttendanceStatsResponse['stats'] | null;
  loading: boolean;
  error: string | null;
}

const initialState: AttendanceState = {
  list: [],
  stats: null,
  loading: false,
  error: null,
};

export const fetchAttendance = createAsyncThunk<
  Attendance[],
  Record<string, any> | undefined
>('attendance/fetch', async (params, { rejectWithValue }) => {
  try {
    const res = await api.get<AttendanceListResponse>(
      '/owner/attendance',
      { params }
    );
    return res.data.attendance;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.error || 'Failed to load attendance');
  }
});

export const markManualAttendance = createAsyncThunk<
  Attendance,
  ManualAttendancePayload
>('attendance/markManual', async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post('/owner/attendance', payload);
    return res.data.attendance;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.error || 'Failed to mark attendance');
  }
});

export const checkInMember = createAsyncThunk<
  Attendance,
  CheckInPayload
>('attendance/checkIn', async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post('/owner/attendance/check-in', payload);
    return res.data.attendance;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.error || 'Check-in failed');
  }
});

export const checkOutMember = createAsyncThunk<
  Attendance,
  CheckOutPayload
>('attendance/checkOut', async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post('/owner/attendance/check-out', payload);
    return res.data.attendance;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.error || 'Check-out failed');
  }
});

export const fetchAttendanceStats = createAsyncThunk<
  AttendanceStatsResponse['stats']
>('attendance/stats', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get<AttendanceStatsResponse>(
      '/owner/attendance/stats/summary'
    );
    return res.data.stats;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.error || 'Failed to load stats');
  }
});

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    clearAttendanceError(state) {
      state.error = null;
    },
    resetAttendance(state) {
      state.list = [];
      state.stats = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchAttendance.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(markManualAttendance.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })

      .addCase(checkInMember.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      .addCase(checkInMember.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(checkOutMember.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (a) => a.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      .addCase(fetchAttendanceStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAttendanceStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchAttendanceStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearAttendanceError,
  resetAttendance,
} = attendanceSlice.actions;

export default attendanceSlice.reducer;
