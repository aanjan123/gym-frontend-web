import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@features/auth/authSlice';
import gymsReducer from '@features/gyms/gymsSlice';
import membersReducer from '@features/members/membersSlice';
import PackageReducer from '@features/packages/packagesSlice';
import paymentsReducer from '@/features/Payments/paymentsSlice';
import dashboardReducer from '@features/dashboard/dashboardSlice';
import changePasswordReducer from '@features/auth/changePasswordSlice';
import ownerDashboardReducer from '@/features/ownerDashboard/ownerDashboardSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    gyms: gymsReducer,
    members: membersReducer,
    packages: PackageReducer,
    dashboard: dashboardReducer,
    payments: paymentsReducer,
    ownerDashboard: ownerDashboardReducer,
    changePassword: changePasswordReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
