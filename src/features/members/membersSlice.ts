import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Member, members as initialMembers } from '../../data/dummyData';

interface MembersState {
  members: Member[];
  selectedMember: Member | null;
  loading: boolean;
  error: string | null;
  filters: {
    status: 'all' | 'active' | 'inactive' | 'suspended';
    search: string;
    paymentStatus: 'all' | 'paid' | 'due' | 'overdue';
  };
}

const initialState: MembersState = {
  members: initialMembers,
  selectedMember: null,
  loading: false,
  error: null,
  filters: {
    status: 'all',
    search: '',
    paymentStatus: 'all',
  },
};

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    setMembers: (state, action: PayloadAction<Member[]>) => {
      state.members = action.payload;
    },
    addMember: (state, action: PayloadAction<Member>) => {
      state.members.unshift(action.payload);
    },
    updateMember: (state, action: PayloadAction<Member>) => {
      const index = state.members.findIndex((m) => m.id === action.payload.id);
      if (index !== -1) {
        state.members[index] = action.payload;
      }
    },
    deleteMember: (state, action: PayloadAction<string>) => {
      state.members = state.members.filter((m) => m.id !== action.payload);
    },
    setSelectedMember: (state, action: PayloadAction<Member | null>) => {
      state.selectedMember = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<'all' | 'active' | 'inactive' | 'suspended'>) => {
      state.filters.status = action.payload;
    },
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
    },
    setPaymentStatusFilter: (state, action: PayloadAction<'all' | 'paid' | 'due' | 'overdue'>) => {
      state.filters.paymentStatus = action.payload;
    },
    deactivateMember: (state, action: PayloadAction<string>) => {
      const member = state.members.find((m) => m.id === action.payload);
      if (member) {
        member.status = 'inactive';
      }
    },
  },
});

export const {
  setMembers,
  addMember,
  updateMember,
  deleteMember,
  setSelectedMember,
  setStatusFilter,
  setSearchFilter,
  setPaymentStatusFilter,
  deactivateMember,
} = membersSlice.actions;

export default membersSlice.reducer;
