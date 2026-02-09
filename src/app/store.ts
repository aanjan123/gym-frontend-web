import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import gymsReducer from '../features/gyms/gymsSlice';
import membersReducer from '../features/members/membersSlice';
import PackageReducer from '../features/packages/packagesSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice';
import changePasswordReducer from '../features/auth/changePasswordSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    gyms: gymsReducer,
    packages: PackageReducer,
    members: membersReducer,
    dashboard: dashboardReducer,
    changePassword: changePasswordReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
