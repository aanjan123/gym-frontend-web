import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/hooks';
import {
  fetchAllGyms,
  suspendGymAsync,
  activateGymAsync,
} from '@features/gyms/gymsSlice';

import { GymsTable } from '@components/gym/GymsTable';
import { GymsFiltersBar } from '@components/gym/GymsFiltersBar';
import { Card, CardHeader, CardContent } from '@components/ui/Card';

import '../Dashboard.css';
import { SuspendGymModal } from '@/components/gym/SuspendGymModal';
import { ConfirmationModal } from '@/components/ConfirmationModal';

export const ManageGyms: React.FC = () => {
  const dispatch = useAppDispatch();
  const { gyms, filters, loading } = useAppSelector((state) => state.gyms);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);

  const [requesting, setRequesting] = useState(false);
  const [memberId, setMemberId] = useState<number | null>(null);

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

  const handleSuspend = (id: number) => {
    setMemberId(id);
    setShowSuspendModal(true);
  };

  const handleActivate = (id: number) => {
    setMemberId(id);
    setShowConfirmModal(true);
  };

  const handleConfirmActivate = async () => {
    dispatch(activateGymAsync(memberId!)).finally(() => {
      setRequesting(false);
      setShowConfirmModal(false);
      setMemberId(null);
    });
  }

  const handleConfirmSuspend = async (suspendReason: string) => {
    if (!memberId || !suspendReason.trim()) {
      alert('Please provide a reason for suspension.');
      return;
    }

    setRequesting(true);

    dispatch(suspendGymAsync(memberId, suspendReason.trim()))
      .finally(() => {
        setRequesting(false);
        setShowSuspendModal(false);
        setMemberId(null);
      });
  };

  const closeSuspendModal = () => {
    setShowSuspendModal(false);
    setMemberId(null);
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

      <Card>
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

      {showSuspendModal && (
        <SuspendGymModal
          suspending={requesting}
          onClose={closeSuspendModal}
          onConfirm={handleConfirmSuspend}
        />
      )}

      <ConfirmationModal
        open={showConfirmModal}
        title='Activate Gym'
        onClose={closeSuspendModal}
        onConfirm={handleConfirmActivate}
        description='Are you sure you want to activate this gym?'
      />
    </div>
  );
};