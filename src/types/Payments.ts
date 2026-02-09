
export interface Payment {
  id: number;
  userId: number;
  gymId: number;
  packageId?: number;
  amount: string;
  paymentMonth: string;
  status: 'paid' | 'pending' | 'overdue';
  paymentDate?: string | null;
  paymentMethod?: string | null;
  notes?: string | null;
  email?: string;
  fullName?: string;
  memberCode?: string;
  packageName?: string;
}

export interface Pagination {
  currentPage: number;
  limit: number;
}

export interface PaymentsState {
  payments: Payment[];
  loading: boolean;
  error: string | null;
  pagination: Pagination;
  message: string | null;
}