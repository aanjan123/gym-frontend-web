export interface Member {
  id: number;
  email: string;
  is_active: boolean;
  createdAt: string;
  full_name: string;
  phone?: string;
  date_of_birth?: string;
  gender?: 'male' | 'female' | 'other';
  address?: string;
  emergencyContact?: string;
  member_code: string;
  membership_start_date: string;
  membership_end_date: string;
  package_id: number;
  package_name?: string;
  package_price?: number;
  membership_status: 'active' | 'expired';
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