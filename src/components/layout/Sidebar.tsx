import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Users,
  UserPlus,
  ClipboardCheck,
  CreditCard,
  Megaphone,
  X,
} from 'lucide-react';
import { useAppSelector } from '../../app/hooks';
import './Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  path: string;
  icon: React.ReactNode;
  label: string;
  role: 'superadmin' | 'owner';
}

const menuItems: MenuItem[] = [
  // Super Admin
  { path: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard', role: 'superadmin' },
  { path: '/admin/create-gym', icon: <UserPlus size={20} />, label: 'Create Gym', role: 'superadmin' },
  { path: '/admin/manage-gyms', icon: <Building2 size={20} />, label: 'Manage Gyms', role: 'superadmin' },

  // Gym Owner
  { path: '/owner/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard', role: 'owner' },
  { path: '/owner/members', icon: <Users size={20} />, label: 'Members', role: 'owner' },
  { path: '/owner/attendance', icon: <ClipboardCheck size={20} />, label: 'Attendance', role: 'owner' },
  { path: '/owner/payments', icon: <CreditCard size={20} />, label: 'Payments', role: 'owner' },
  { path: '/owner/packages', label: 'Packages', role: 'owner', icon: <CreditCard size={20} /> },
  { path: '/owner/announcements', icon: <Megaphone size={20} />, label: 'Announcements', role: 'owner' },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);

  const filteredMenuItems = menuItems.filter((item) => item.role === user?.role);
  const nameToDisplay = useMemo(() => user?.role === 'superadmin' ? user?.fullName : user?.gymName, [user]);

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="brand-icon">
              <Building2 size={24} />
            </div>
            <span className="brand-text">GymSaaS</span>
          </div>
          <button className="sidebar-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {filteredMenuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
                onClick={onClose}
              >
                <span className="sidebar-link-icon">{item.icon}</span>
                <span className="sidebar-link-text">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="user-avatar">
              {nameToDisplay?.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <p className="user-name">{nameToDisplay}</p>
              <p className="user-role">
                {user?.role === 'superadmin' ? 'Super Admin' : 'Gym Owner'}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
