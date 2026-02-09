import React from 'react';
import { Table } from '@components/ui/Table';
import { Button } from '@components/ui/Button';

interface Gym {
  id: string;
  name: string;
  ownerEmail: string;
  status: 'active' | 'trial' | 'suspended';
  activeMembers: number;
  totalMembers: number;
  createdAt: string;
}

interface GymsTableProps {
  gyms: Gym[];
  onSuspend: (id: string) => void;
  onActivate: (id: string) => void;
}

export const GymsTable: React.FC<GymsTableProps> = ({
  gyms,
  onSuspend,
  onActivate,
}) => {
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
      accessor: (gym: Gym) => (
        <span className={`status-badge status-${gym.status}`}>
          {gym.status.charAt(0).toUpperCase() + gym.status.slice(1)}
        </span>
      ),
    },
    {
      header: 'Active Members',
      accessor: (gym: Gym) =>
        `${gym.activeMembers}/${gym.totalMembers}`,
    },
    {
      header: 'Created Date',
      accessor: (gym: Gym) =>
        new Date(gym.createdAt).toLocaleDateString(),
    },
    {
      header: 'Actions',
      accessor: (gym: Gym) => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {gym.status === 'suspended' ? (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onActivate(gym.id)}
            >
              Activate
            </Button>
          ) : (
            <Button
              size="sm"
              variant="danger"
              onClick={() => onSuspend(gym.id)}
            >
              Suspend
            </Button>
          )}
        </div>
      ),
      align: 'right' as const,
    },
  ];

  return (
    <Table
      data={gyms}
      columns={columns}
      emptyMessage="No gyms found"
    />
  );
};
