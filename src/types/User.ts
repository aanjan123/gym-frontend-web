export interface User {
  id?: number;
  email?: string;
  fullName?: string;
  role?: string;
  userId?: string;
  gymName?: string;
  requirePasswordChange?: boolean;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface ChangePasswordRequest {
  userId: number;
  oldPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}