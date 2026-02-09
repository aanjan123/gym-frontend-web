export type DurationType = 'monthly' | 'quarterly' | 'half_yearly' | 'yearly' | 'custom';

export interface Package {
  id: number;
  gymId: number;
  name: string;
  description: string | null;
  price: string;
  durationType: DurationType;
  durationValue: number;
  features: string[];
  isActive: boolean;
  memberCount?: number;
  createdAt: string;
}
