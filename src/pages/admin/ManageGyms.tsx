import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setStatusFilter, setSearchFilter, suspendGym, activateGym } from '../../features/gyms/gymsSlice';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Table } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import './Dashboard.css';

export const ManageGyms: React.FC = () => {
  const dispatch = useAppDispatch();
  const { gyms, filters } = useAppSelector((state) => state.gyms);

  const filteredGyms = gyms.filter((gym) => {
    const matchesStatus = filters.status === 'all' || gym.status === filters.status;
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

  const columns = [
    {
      header: 'Gym Name',
      accessor: 'name' as const,
    },
    {
      header: 'Owner Email',
      accessor: 'ownerEmail' as const,
    },
    {
      header: 'Status',
      accessor: (gym: typeof gyms[0]) => (
        <span className={`status-badge status-${gym.status}`}>
          {gym.status.charAt(0).toUpperCase() + gym.status.slice(1)}
        </span>
      ),
    },
    {
      header: 'Active Members',
      accessor: (gym: typeof gyms[0]) => `${gym.activeMembersCount}/${gym.totalMembers}`,
    },
    {
      header: 'Created Date',
      accessor: (gym: typeof gyms[0]) => new Date(gym.createdAt).toLocaleDateString(),
    },
    {
      header: 'Actions',
      accessor: (gym: typeof gyms[0]) => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {gym.status === 'suspended' ? (
            <Button size="sm" variant="secondary" onClick={() => handleActivate(gym.id)}>
              Activate
            </Button>
          ) : (
            <Button size="sm" variant="danger" onClick={() => handleSuspend(gym.id)}>
              Suspend
            </Button>
          )}
        </div>
      ),
      align: 'right' as const,
    },
  ];

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
          <div className="filters-bar">
            <div className="filter-group">
              <label>Status Filter</label>
              <select
                value={filters.status}
                onChange={(e) => dispatch(setStatusFilter(e.target.value as any))}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="trial">Trial</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Search</label>
              <div style={{ position: 'relative' }}>
                <Search
                  size={18}
                  style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-tertiary)',
                  }}
                />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={filters.search}
                  onChange={(e) => dispatch(setSearchFilter(e.target.value))}
                  style={{ paddingLeft: '2.75rem' }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card style={{ marginTop: '1.5rem' }}>
        <CardHeader title={`All Gyms (${filteredGyms.length})`} />
        <CardContent>
          <Table data={filteredGyms} columns={columns} emptyMessage="No gyms found" />
        </CardContent>
      </Card>
    </div>
  );
};
