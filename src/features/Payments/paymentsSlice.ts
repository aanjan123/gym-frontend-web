import { Pagination, Payment, PaymentsState } from '@/types/Payments';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '@services/api';


const initialState: PaymentsState = {
  payments: [],
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    limit: 50,
  },
  message: null,
};

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    paymentsRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    paymentsRequestFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    setPayments: (
      state,
      action: PayloadAction<{ payments: Payment[]; pagination: Pagination }>
    ) => {
      state.payments = action.payload.payments;
      state.pagination = action.payload.pagination;
      state.loading = false;
    },

    updatePaymentSuccess: (state, action: PayloadAction<Payment>) => {
      const index = state.payments.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) state.payments[index] = action.payload;
      state.loading = false;
    },

    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
      state.loading = false;
    },

    clearPaymentsState: () => initialState,
  },
});

export const {
  paymentsRequestStart,
  paymentsRequestFailure,
  setPayments,
  updatePaymentSuccess,
  setMessage,
  clearPaymentsState,
} = paymentsSlice.actions;

export default paymentsSlice.reducer;


export const fetchPayments = (filters: {
  memberId?: number;
  packageId?: number;
  status?: 'paid' | 'pending' | 'overdue';
  month?: string;
  page?: number;
  limit?: number;
}) => {
  return async (dispatch: any) => {
    dispatch(paymentsRequestStart());

    try {
      const query = new URLSearchParams();
      if (filters.memberId) query.append('memberId', filters.memberId.toString());
      if (filters.packageId) query.append('packageId', filters.packageId.toString());
      if (filters.status) query.append('status', filters.status);
      if (filters.month) query.append('month', filters.month);
      if (filters.page) query.append('page', filters.page.toString());
      if (filters.limit) query.append('limit', filters.limit.toString());

      const res = await api.get(`/owner/payments?${query.toString()}`);

      if (res.data?.success) {
        dispatch(
          setPayments({
            payments: res.data.payments,
            pagination: res.data.pagination,
          })
        );
      } else {
        dispatch(paymentsRequestFailure('Failed to fetch payments'));
      }
    } catch (error: any) {
      dispatch(
        paymentsRequestFailure(
          error.response?.data?.error || error.message || 'Failed to fetch payments'
        )
      );
    }
  };
};

export const updatePayment = (
  paymentId: number,
  payload: {
    status: 'paid' | 'pending' | 'overdue';
    amount: string;
    paymentMethod: string;
    notes?: string;
  }
) => {
  return async (dispatch: any) => {
    dispatch(paymentsRequestStart());

    try {
      const res = await api.put(`/owner/payments/${paymentId}`, payload);

      if (res.data?.success) {
        dispatch(fetchPayments({ page: 1, limit: 50 }));
        const message = payload.status === 'paid' ? 'Payment marked as paid' : 'Payment updated';
        dispatch(setMessage(message));
      } else {
        dispatch(paymentsRequestFailure('Failed to update payment'));
      }
    } catch (error: any) {
      dispatch(
        paymentsRequestFailure(
          error.response?.data?.error || error.message || 'Failed to update payment'
        )
      );
    }
  };
};

export const sendPaymentReminder = (paymentId: number) => {
  return async (dispatch: any) => {
    dispatch(paymentsRequestStart());

    try {
      const res = await api.post(`/owner/payments/${paymentId}/send-reminder`);

      if (res.data?.success) {
        dispatch(setMessage(res.data.message));
      } else {
        dispatch(paymentsRequestFailure('Failed to send payment reminder'));
      }
    } catch (error: any) {
      dispatch(
        paymentsRequestFailure(
          error.response?.data?.error || error.message || 'Failed to send payment reminder'
        )
      );
    }
  };
};

export const sendPaymentRequest = (paymentId: number, customMessage?: string) => {
  return async (dispatch: any) => {
    dispatch(paymentsRequestStart());

    try {
      const res = await api.post(`/owner/payments/${paymentId}/send-request`, {
        customMessage,
      });

      if (res.data?.success) {
        dispatch(setMessage(res.data.message));
      } else {
        dispatch(paymentsRequestFailure('Failed to send payment request'));
      }
    } catch (error: any) {
      dispatch(
        paymentsRequestFailure(
          error.response?.data?.error || error.message || 'Failed to send payment request'
        )
      );
    }
  };
};
