import { GymFormData } from "@/pages/admin/CreateGym";

export interface Gym {
  id: number;
  name: string;
  address: string | null;
  phone: string | null;
  email: string;
  ownerEmail: string;
  ownerName: string;
  status: 'active' | 'inactive' | 'suspended' | 'trial';
  subscriptionPlan: string | null;
  subscriptionExpiresAt: string | null;
  createdAt: string;
  activeMembers: string;
  owners: string;
  totalMembers: string;
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