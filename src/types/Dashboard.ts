export interface TopPerformingGym {
  id: number;
  name: string;
  status: string;
  activeMembers: string;
  totalRevenue: string;
}

export interface DashboardStatsApiResponse {
  gyms: {
    total: number;
    active: number;
    suspended: number;
    inactive: number;
    byStatus: Record<string, number>;
    recently_created: number;
    subscriptionsExpiringSoon: number;
  };
  members: {
    total: number;
    active: number;
  };
  attendance: {
    today: number;
  };
  revenue: {
    total: number;
    thisMonth: number;
    pendingPayments: number;
  };
  topPerformingGyms: TopPerformingGym[];
}

export interface DashboardState {
  stats: DashboardStatsApiResponse | null;
  loading: boolean;
  error: string | null;
}

export interface GymsData {
  total: number;
  active: number;
  suspended: number;
  inactive: number;
  byStatus: Record<string, number>;
  recently_created: number;
  subscriptionsExpiringSoon: number;
}

export interface MembersData {
  total: number;
  active: number;
}

export interface AttendanceData {
  today: number;
}

export interface RevenueData {
  total: number;
  thisMonth: number;
  pendingPayments: number;
}

export interface DashboardDataPayload {
  gyms: GymsData;
  members: MembersData;
  attendance: AttendanceData;
  revenue: RevenueData;
  topPerformingGyms: TopPerformingGym[];
}

export interface DashboardResponse {
  success: boolean;
  dashboard: DashboardDataPayload;
}

export interface DashboardStats {
  totalGyms: number;
  activeGyms: number;
  totalMembers: number;
  todayAttendance: number;
  totalRevenue?: number;
  thisMonthRevenue?: number;
}