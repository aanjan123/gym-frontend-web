export type UserRole = 'superadmin' | 'owner';

export interface UserProfile {
  id: number;
  email: string;
  role: UserRole;
  gym_id?: number;
  gym_name?: string;
  address?: string | null;
  gym_phone?: string | null;
  gym_email?: string | null;
  gym_status?: 'active' | 'inactive';
}

export interface ProfileResponse {
  success: boolean;
  profile: UserProfile;
}
