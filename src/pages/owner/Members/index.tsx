import React, { useEffect, useState } from 'react';
import { UserPlus, Download, Upload } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  fetchMembers,
  createMember,
  updateMember,
  deleteMember,
  setPage,
  clearErrors,
} from '@/features/members/membersSlice';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { MembersFilters } from '@components/members/MembersFilters';
import { MembersTable } from '@components/members/MembersTable';
import { MemberForm } from '@components/members/MemberForm';
import { MemberDetails } from '@components/members/MemberDetails';
import { Pagination } from '@components/members/Pagination';
import { Member } from '@/features/members/types';
import './Members.css';
import { fetchPackages } from '@/features/packages/packagesSlice';

export const Members: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    members,
    loading,
    error,
    filters,
    pagination
  } = useAppSelector((state) => state.members);

  const { packages } = useAppSelector((state) => state.packages);

  const [modalState, setModalState] = useState<{
    type: 'add' | 'edit' | 'view' | 'delete' | null;
    member: Member | null;
  }>({ type: null, member: null });

  useEffect(() => {
    if (packages.length === 0) {
      dispatch(fetchPackages());
    }
  }, [dispatch, packages.length]);

  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch, filters, pagination.currentPage]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (filters.search || filters.search === '') {
        dispatch(fetchMembers());
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [filters.search, dispatch]);

  const openModal = (type: 'add' | 'edit' | 'view' | 'delete', member: Member | null = null) => {
    dispatch(clearErrors());
    setModalState({ type, member });
  };

  const closeModal = () => {
    setModalState({ type: null, member: null });
    dispatch(clearErrors());
  };

  const handleAddMember = (data: any) => {
    dispatch(createMember(data, () => {
      closeModal();
    }));
  };

  const handleUpdateMember = (data: any) => {
    if (modalState.member) {
      dispatch(updateMember(modalState.member.id, data, () => {
        closeModal();
      }));
    }
  };

  const handleDeleteMember = () => {
    if (modalState.member) {
      dispatch(deleteMember(modalState.member.id, () => {
        closeModal();
      }));
    }
  };

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  const handleExportMembers = () => {
    console.log('Export members');
  };

  const handleImportMembers = () => {
    console.log('Import members');
  };

  return (
    <div className="members-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Members</h1>
          <p className="page-subtitle">Manage your gym members and their memberships</p>
        </div>
        <div className="page-actions">
          <Button
            variant="secondary"
            onClick={handleImportMembers}
            disabled={loading}
          >
            <Upload size={18} />
            Import
          </Button>
          <Button
            variant="secondary"
            onClick={handleExportMembers}
            disabled={loading || members.length === 0}
          >
            <Download size={18} />
            Export
          </Button>
          <Button onClick={() => openModal('add')}>
            <UserPlus size={18} />
            Add Member
          </Button>
        </div>
      </div>

      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
          <button onClick={() => dispatch(clearErrors())}>×</button>
        </div>
      )}

      <MembersFilters />

      <Card className="members-card">
        <CardHeader
          title={`All Members (${pagination.totalMembers})`}
          subtitle={`${members.length} members displayed`}
        />
        <CardContent>
          <MembersTable
            members={members}
            onView={(member) => openModal('view', member)}
            onEdit={(member) => openModal('edit', member)}
            onDelete={(member) => openModal('delete', member)}
            loading={loading}
          />

          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            totalItems={pagination.totalMembers}
            onPageChange={handlePageChange}
            disabled={loading}
          />
        </CardContent>
      </Card>

      <Modal
        isOpen={modalState.type === 'add'}
        onClose={closeModal}
        title="Add New Member"
        size="lg"
      >
        <MemberForm
          onSubmit={handleAddMember}
          onCancel={closeModal}
          isLoading={loading}
        />
      </Modal>

      {/* Edit Member Modal */}
      <Modal
        isOpen={modalState.type === 'edit'}
        onClose={closeModal}
        title="Edit Member"
        size="lg"
      >
        <MemberForm
          member={modalState.member}
          onSubmit={handleUpdateMember}
          onCancel={closeModal}
          isLoading={loading}
        />
      </Modal>

      {/* View Member Modal */}
      <Modal
        isOpen={modalState.type === 'view'}
        onClose={closeModal}
        title=""
        size="lg"
      >
        {modalState.member && (
          <MemberDetails
            member={modalState.member}
            onClose={closeModal}
            onEdit={() => {
              setModalState({ type: 'edit', member: modalState.member });
            }}
          />
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={modalState.type === 'delete'}
        onClose={closeModal}
        title="Delete Member"
        size="sm"
      >
        <div className="delete-confirmation">
          <p>
            Are you sure you want to delete <strong>{modalState.member?.full_name}</strong>?
          </p>
          <p className="delete-warning">
            This will permanently delete the member and all their data including attendance records and payments. This action cannot be undone.
          </p>
          <div className="delete-actions">
            <Button
              variant="secondary"
              onClick={closeModal}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteMember}
              disabled={loading}
            >
              {loading ? 'Deleting...' : 'Delete Member'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};