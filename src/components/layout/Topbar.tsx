import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, LogOut } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout } from '../../features/auth/authSlice';
import { Button } from '../ui/Button';
import './Topbar.css';

interface TopbarProps {
  onMenuClick: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const nameToDisplay = useMemo(() => user?.role === 'superadmin' ? user?.fullName : user?.gymName, [user]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="menu-btn" onClick={onMenuClick} aria-label="Toggle menu">
          <Menu size={24} />
        </button>
        <div className="topbar-title">
          <h1>Welcome back, {nameToDisplay}</h1>
        </div>
      </div>

      <div className="topbar-right">
        {/* <button className="notification-btn" aria-label="Notifications">
          <Bell size={20} />
          <span className="notification-badge">3</span>
        </button> */}

        <div className="topbar-user">
          <div className="user-avatar-small">
            {nameToDisplay?.charAt(0).toUpperCase()}
          </div>
          <div className="user-details">
            <p className="user-name-top">{nameToDisplay}</p>
            <p className="user-email">{user?.email}</p>
          </div>
        </div>

        <Button variant="ghost" size="sm" onClick={handleLogout}>
          <LogOut size={18} />
          <span className="logout-text">Logout</span>
        </Button>
      </div>
    </header>
  );
};
