export interface AttendanceBreakdown {
  qrScans: number;
  manualEntries: number;
}

export interface PendingPayments {
  count: number;
  totalAmount: number;
}

export interface MembersByPackage {
  id: number;
  name: string;
  memberCount: string;
}

export interface OwnerDashboardData {
  totalMembers: number;
  activeMembers: number;
  expiredMembers: number;
  expiringMemberships: number;
  todayAttendance: number;
  attendanceBreakdown: AttendanceBreakdown;
  monthlyRevenue: number;
  pendingPayments: PendingPayments;
  recentMembers: number;
  membersByPackage: MembersByPackage[];
}

export interface OwnerDashboardResponse {
  success: boolean;
  dashboard: OwnerDashboardData;
}

export interface OwnerDashboardState {
  stats: OwnerDashboardData | null;
  loading: boolean;
  error: string | null;
}
