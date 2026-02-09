import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '@/services/api';
import {
  Member,
  CreateMemberPayload,
  UpdateMemberPayload,
  MemberFilters,
  MembersPagination,
} from './types';

interface MembersState {
  members: Member[];
  selectedMember: Member | null;
  loading: boolean;
  error: string | null;
  validationErrors: Record<string, string>;
  filters: MemberFilters;
  pagination: MembersPagination;
}

const initialState: MembersState = {
  members: [],
  selectedMember: null,
  loading: false,
  error: null,
  validationErrors: {},
  filters: {
    status: 'all',
    search: '',
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    limit: 50,
    totalMembers: 0,
  },
};

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {

    membersRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.validationErrors = {};
    },
    membersRequestFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    setMembers: (
      state,
      action: PayloadAction<{ members: Member[]; pagination: MembersPagination }>
    ) => {
      state.members = action.payload.members;
      state.pagination = action.payload.pagination;
      state.loading = false;
    },

    addMember: (state, action: PayloadAction<Member>) => {
      state.members.unshift(action.payload);
      state.pagination.totalMembers += 1;
      state.loading = false;
      state.validationErrors = {};
    },

    updateMemberInState: (state, action: PayloadAction<Member>) => {
      const idx = state.members.findIndex(m => m.id === action.payload.id);
      if (idx !== -1) state.members[idx] = action.payload;

      if (state.selectedMember?.id === action.payload.id) {
        state.selectedMember = action.payload;
      }

      state.loading = false;
    },

    deleteMemberFromState: (state, action: PayloadAction<number>) => {
      state.members = state.members.filter(m => m.id !== action.payload);
      state.pagination.totalMembers = Math.max(0, state.pagination.totalMembers - 1);
      if (state.selectedMember?.id === action.payload) {
        state.selectedMember = null;
      }
      state.loading = false;
    },

    setSelectedMember: (state, action: PayloadAction<Member | null>) => {
      state.selectedMember = action.payload;
      state.loading = false;
    },

    setValidationErrors: (state, action: PayloadAction<Record<string, string>>) => {
      state.validationErrors = action.payload;
      state.loading = false;
    },

    clearErrors: (state) => {
      state.error = null;
      state.validationErrors = {};
    },

    setStatusFilter: (state, action: PayloadAction<'all' | 'active' | 'expired'>) => {
      state.filters.status = action.payload;
      state.pagination.currentPage = 1;
    },
    setPackageFilter: (state, action: PayloadAction<number | undefined>) => {
      state.filters.packageId = action.payload;
      state.pagination.currentPage = 1;
    },
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.pagination.currentPage = 1;
    },

    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },

    resetMembersState: () => initialState,
  },
});

export const {
  membersRequestStart,
  membersRequestFailure,
  setMembers,
  addMember,
  updateMemberInState,
  deleteMemberFromState,
  setSelectedMember,
  setValidationErrors,
  clearErrors,
  setStatusFilter,
  setPackageFilter,
  setSearchFilter,
  clearFilters,
  setPage,
  resetMembersState,
} = membersSlice.actions;

// ========================
// MEMBERS
// ========================
export const fetchMembers =
  (page?: number, limit?: number, filters?: Partial<MemberFilters>) =>
    async (dispatch: any, getState: any) => {
      dispatch(membersRequestStart());

      const state = getState().members;
      const params = new URLSearchParams({
        page: String(page ?? state.pagination.currentPage),
        limit: String(limit ?? state.pagination.limit),
      });

      const f = filters ?? state.filters;
      if (f.status !== 'all') params.append('status', f.status);
      if (f.packageId) params.append('packageId', String(f.packageId));
      if (f.search) params.append('search', f.search);

      try {
        const res = await api.get(`/owner/members?${params}`);
        if (res.data?.success) {
          dispatch(setMembers(res.data));
        } else {
          dispatch(membersRequestFailure(res.data?.error || 'Failed to fetch members'));
        }
      } catch (err: any) {
        dispatch(membersRequestFailure(err.response?.data?.error || err.message));
      }
    };

export const fetchMemberById =
  (id: number) =>
    async (dispatch: any) => {
      dispatch(membersRequestStart());
      try {
        const res = await api.get(`/owner/members/${id}`);
        if (res.data?.success) {
          dispatch(setSelectedMember(res.data.member));
        } else {
          dispatch(membersRequestFailure(res.data?.error));
        }
      } catch (err: any) {
        dispatch(membersRequestFailure(err.response?.data?.error || err.message));
      }
    };

export const createMember =
  (payload: CreateMemberPayload, onSuccess?: () => void) =>
    async (dispatch: any) => {
      dispatch(membersRequestStart());
      try {
        const res = await api.post('/owner/members', payload);
        if (res.data?.success) {
          dispatch(addMember(res.data.member));
          onSuccess?.();
        } else if (res.data?.details) {
          const errors: Record<string, string> = {};
          res.data.details.forEach((e: any) => (errors[e.field] = e.message));
          dispatch(setValidationErrors(errors));
        } else {
          dispatch(membersRequestFailure(res.data?.error));
        }
      } catch (err: any) {
        const details = err.response?.data?.details;
        if (details) {
          const errors: Record<string, string> = {};
          details.forEach((e: any) => (errors[e.field] = e.message));
          dispatch(setValidationErrors(errors));
        } else {
          dispatch(membersRequestFailure(err.response?.data?.error || err.message));
        }
      }
    };

export const updateMember =
  (id: number, payload: UpdateMemberPayload, onSuccess?: () => void) =>
    async (dispatch: any) => {
      dispatch(membersRequestStart());
      try {
        const res = await api.put(`/owner/members/${id}`, payload);
        if (res.data?.success) {
          dispatch(updateMemberInState(res.data.member));
          onSuccess?.();
        } else if (res.data?.details) {
          const errors: Record<string, string> = {};
          res.data.details.forEach((e: any) => (errors[e.field] = e.message));
          dispatch(setValidationErrors(errors));
        } else {
          dispatch(membersRequestFailure(res.data?.error));
        }
      } catch (err: any) {
        dispatch(membersRequestFailure(err.response?.data?.error || err.message));
      }
    };

export const deleteMember =
  (id: number, onSuccess?: () => void) =>
    async (dispatch: any) => {
      dispatch(membersRequestStart());
      try {
        const res = await api.delete(`/owner/members/${id}`);
        if (res.data?.success) {
          dispatch(deleteMemberFromState(id));
          onSuccess?.();
        } else {
          dispatch(membersRequestFailure(res.data?.error));
        }
      } catch (err: any) {
        dispatch(membersRequestFailure(err.response?.data?.error || err.message));
      }
    };

export default membersSlice.reducer;
