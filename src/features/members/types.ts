export interface Member {
  id: number;
  email: string;
  isActive: boolean;
  createdAt: string;
  fullName: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  address?: string;
  emergencyContact?: string;
  memberCode: string;
  membershipStartDate: string;
  membershipEndDate: string;
  packageId: number;
  packageName?: string;
  packagePrice?: number;
  membershipStatus: 'active' | 'expired';
  todayAttendanceStatus?: 'absent' | 'checked_in' | 'checked_out';
}

export interface CreateMemberPayload {
  email: string;
  fullName: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  address?: string;
  emergencyContact?: string;
  packageId: number;
  membershipStartDate: string;
}

export interface UpdateMemberPayload {
  fullName?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  address?: string;
  emergencyContact?: string;
  packageId?: number;
  membershipStartDate?: string;
  isActive?: boolean;
}

export interface MemberFilters {
  status: 'all' | 'active' | 'expired';
  packageId?: number;
  search: string;
}

export interface MembersPagination {
  currentPage: number;
  totalPages: number;
  totalMembers: number;
  limit: number;
}