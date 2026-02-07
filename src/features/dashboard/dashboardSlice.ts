import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DashboardStats, Attendance, Announcement } from '../../data/dummyData';

interface DashboardState {
  stats: DashboardStats;
  attendances: Attendance[];
  announcements: Announcement[];
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  stats: {},
  attendances: [],
  announcements: [],
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setStats: (state, action: PayloadAction<DashboardStats>) => {
      state.stats = action.payload;
    },
    setAttendances: (state, action: PayloadAction<Attendance[]>) => {
      state.attendances = action.payload;
    },
    addAttendance: (state, action: PayloadAction<Attendance>) => {
      state.attendances.unshift(action.payload);
    },
    setAnnouncements: (state, action: PayloadAction<Announcement[]>) => {
      state.announcements = action.payload;
    },
    addAnnouncement: (state, action: PayloadAction<Announcement>) => {
      state.announcements.unshift(action.payload);
    },
    toggleAnnouncementPublish: (state, action: PayloadAction<string>) => {
      const announcement = state.announcements.find((a) => a.id === action.payload);
      if (announcement) {
        announcement.isPublished = !announcement.isPublished;
      }
    },
    deleteAnnouncement: (state, action: PayloadAction<string>) => {
      state.announcements = state.announcements.filter((a) => a.id !== action.payload);
    },
  },
});

export const {
  setStats,
  setAttendances,
  addAttendance,
  setAnnouncements,
  addAnnouncement,
  toggleAnnouncementPublish,
  deleteAnnouncement,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
