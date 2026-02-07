import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { AdminLayout } from './layouts/AdminLayout';
import { OwnerLayout } from './layouts/OwnerLayout';

// Auth Pages
import { SuperAdminLogin } from './pages/auth/SuperAdminLogin';
import { OwnerLogin } from './pages/auth/OwnerLogin';

// Admin Pages
import { Dashboard as AdminDashboard } from './pages/admin/Dashboard';
import { ManageGyms } from './pages/admin/ManageGyms';
import { CreateGym } from './pages/admin/CreateGym';

// Owner Pages
import { Dashboard as OwnerDashboard } from './pages/owner/Dashboard';
import { Members } from './pages/owner/Members';
import { Attendance } from './pages/owner/Attendance';
import { Payments } from './pages/owner/Payments';
import { Announcements } from './pages/owner/Announcements';
import { ChangePassword } from './pages/owner/ChangePassword';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SuperAdminLogin />} />
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

          {/* Gym Owner Routes */}
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
            <Route path="announcements" element={<Announcements />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
