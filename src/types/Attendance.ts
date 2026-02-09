

export interface Attendance {
  id: number;
  userId: number;
  gymId: number;
  date: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  method: AttendanceMethod;

  email?: string;
  fullName?: string;
  memberName?: string;
  memberCode?: string;

  status?: AttendanceStatus;

  durationMinutes?: number;
  durationHours?: number;
  durationFormatted?: string;

  createdAt?: string;
}

export interface AttendanceFilters {
  memberId?: number;
  date?: string;
  page?: number;
  limit?: number;
}

export interface AttendanceState {
  attendance: Attendance[];
  loading: boolean;
  error: string | null;
  message: string | null;
  pagination: {
    currentPage: number;
    limit: number;
  } | null;
}

export type AttendanceMethod = 'manual' | 'qr_scan';

export type AttendanceStatus =
  | 'not_checked_in'
  | 'checked_in'
  | 'completed';

export interface AttendanceListResponse {
  success: boolean;
  attendance: Attendance[];
  pagination: {
    currentPage: number;
    limit: number;
  };
}

export interface ManualAttendancePayload {
  memberId: number;
  date: string;
  checkInTime: string;
  checkOutTime?: string;
}

export interface CheckInPayload {
  memberId: number;
  date: string;
}

export interface CheckOutPayload {
  memberId: number;
  date: string;
}

export interface AttendanceStatusResponse {
  success: boolean;
  member: {
    id: number;
    fullName: string;
    memberCode: string;
  };
  status: AttendanceStatus;
  date: string;
  attendance: Attendance | null;
  actions: {
    checkInRequired: boolean;
    checkOutRequired: boolean;
    completed: boolean;
  };
}

export interface AttendanceStatsResponse {
  success: boolean;
  stats: {
    today: {
      total: string;
      checked_in: string;
      checked_out: string;
      currently_present: string;
      qrScans: string;
      manualEntries: string;
    };
    avgSessionDuration: {
      average: number;
      minimum: number;
      maximum: number;
    };
    peakHours: {
      hour: number;
      count: number;
      formattedHour: string;
    }[];
    topMembers: {
      userId: number;
      fullName: string;
      memberCode: string;
      visits: number;
      avgDurationMinutes: number;
    }[];
  };
}
