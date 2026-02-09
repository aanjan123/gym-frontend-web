import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/hooks';
import {
  fetchAllGyms,
  suspendGym,
  activateGym,
} from '@features/gyms/gymsSlice';

import { GymsTable } from '@components/gym/GymsTable';
import { GymsFiltersBar } from '@components/gym/GymsFiltersBar';
import { Card, CardHeader, CardContent } from '@components/ui/Card';

import './Dashboard.css';

export const ManageGyms: React.FC = () => {
  const dispatch = useAppDispatch();
  const { gyms, filters, loading } = useAppSelector((state) => state.gyms);

  useEffect(() => {
    dispatch(fetchAllGyms());
  }, [dispatch]);

  const filteredGyms = gyms.filter((gym) => {
    const matchesStatus =
      filters.status === 'all' || gym.status === filters.status;

    const matchesSearch =
      gym.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      gym.ownerEmail.toLowerCase().includes(filters.search.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const handleSuspend = (id: string) => {
    if (confirm('Are you sure you want to suspend this gym?')) {
      dispatch(suspendGym(id));
    }
  };

  const handleActivate = (id: string) => {
    dispatch(activateGym(id));
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Manage Gyms</h1>
          <p className="page-subtitle">View and manage all registered gyms</p>
        </div>
      </div>

      <Card>
        <CardContent>
          <GymsFiltersBar />
        </CardContent>
      </Card>

      <Card style={{ marginTop: '1.5rem' }}>
        <CardHeader title={`All Gyms (${filteredGyms.length})`} />
        <CardContent>
          <GymsTable
            gyms={filteredGyms}
            loading={loading}
            onSuspend={handleSuspend}
            onActivate={handleActivate}
          />
        </CardContent>
      </Card>
    </div>
  );
};
