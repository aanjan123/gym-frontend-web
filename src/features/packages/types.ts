export type DurationType = 'monthly' | 'quarterly' | 'half_yearly' | 'yearly' | 'custom';

export interface Package {
  id: number;
  gym_id: number;
  name: string;
  description: string | null;
  price: string;
  duration_type: DurationType;
  duration_value: number;
  features: string[];
  is_active: boolean;
  member_count?: number;
  created_at: string;
}
