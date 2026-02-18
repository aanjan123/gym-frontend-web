import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AdminLayout } from './layouts/AdminLayout';
import { OwnerLayout } from './layouts/OwnerLayout';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { NotFound } from './pages/NotFound';

// Auth Pages
import { OwnerLogin } from './pages/auth/OwnerLogin';
import { SuperAdminLogin } from './pages/auth/SuperAdminLogin';

// Admin Pages
import { CreateGym } from './pages/admin/CreateGym';
import { ManageGyms } from './pages/admin/ManageGyms';
import { Dashboard as AdminDashboard } from './pages/admin/Dashboard';

// Owner Pages
import { useAppDispatch } from './app/hooks';
import { Members } from './pages/owner/Members';
import { Payments } from './pages/owner/Payments';
import { Packages } from './pages/owner/Packages';
import { Attendance } from './pages/owner/Attendance';
import { initializeAuth } from './features/auth/authSlice';
import { ChangePassword } from './pages/owner/ChangePassword';
import { FullScreenLoader } from './components/ui/FullScreenLoader';
import { OwnerDashboard } from './pages/owner/Dashboard';
import { Announcements } from './pages/owner/Announcements';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FullScreenLoader />} />
        <Route path="/admin/login" element={<SuperAdminLogin />} />
        <Route path="/owner/login" element={<OwnerLogin />} />
        <Route path="/change-password" element={<ChangePassword />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="superadmin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="create-gym" element={<CreateGym />} />
          <Route path="manage-gyms" element={<ManageGyms />} />
        </Route>

        <Route
          path="/owner"
          element={
            <ProtectedRoute requiredRole="owner">
              <OwnerLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/owner/dashboard" replace />} />
          <Route path="dashboard" element={<OwnerDashboard />} />
          <Route path="members" element={<Members />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="payments" element={<Payments />} />
          <Route path="packages" element={<Packages />} />
          <Route path="announcements" element={<Announcements />} />
        </Route>

        {/* Error Pages */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;