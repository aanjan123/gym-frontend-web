import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchOwnerDashboardStats } from '@/features/ownerDashboard/ownerDashboardSlice';

import { StatsGrid } from './components/StatsGrid';
import { ChartsSection } from './components/ChartsSection';
import { DashboardSkeleton } from './components/DashboardSkeleton';

import './../../admin/Dashboard.css';

export const OwnerDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { stats, loading, error } = useAppSelector(
    (state) => state.ownerDashboard
  );

  useEffect(() => {
    dispatch(fetchOwnerDashboardStats());
  }, [dispatch]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return <div className="error-state">{error}</div>;
  }

  if (!stats) return null;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Overview of your gym performance</p>
        </div>
      </div>

      <StatsGrid stats={stats} />
      <ChartsSection />
    </div>
  );
};
