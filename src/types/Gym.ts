import { GymFormData } from "@/pages/admin/CreateGym";

export interface Gym {
  id: number;
  name: string;
  address: string | null;
  phone: string | null;
  email: string;
  owner_email: string;
  owner_name: string;
  status: 'active' | 'inactive';
  subscription_plan: string | null;
  subscription_expires_at: string | null;
  created_at: string;
  active_members: string;
  owners: string;
}

export interface GymPagination {
  currentPage: number;
  totalPages: number;
  totalGyms: number;
  limit: number;
}

export interface GymListResponse {
  success: boolean;
  gyms: Gym[];
  pagination: GymPagination;
}

export interface CreateGym {
  gymName: string;
  gymAddress: string;
  gymPhone: string;
  gymEmail: string;
  ownerName: string;
  ownerEmail: string;
  subscriptionExpiresAt?: string;
  subscriptionPlan?: 'basic' | 'standard' | 'premium';
}

export type FieldErrors = Partial<Record<keyof GymFormData, string>>;