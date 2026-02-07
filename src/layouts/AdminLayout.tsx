import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Topbar } from '../components/layout/Topbar';
import './Layout.css';

export const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="layout-main">
        <Topbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="layout-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
