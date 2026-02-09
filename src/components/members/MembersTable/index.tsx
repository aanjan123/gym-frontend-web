import React from 'react';
import { Edit, Trash2, Eye } from 'lucide-react';
import { Member } from '../../../features/members/types';
import { Button } from '@/components/ui/Button';
import './index.css';
import { useAppSelector } from '@/app/hooks';

interface MembersTableProps {
  members: Member[];
  onView: (member: Member) => void;
  onEdit: (member: Member) => void;
  onDelete: (member: Member) => void;
  loading?: boolean;
}

export const MembersTable: React.FC<MembersTableProps> = ({
  members,
  onView,
  onEdit,
  onDelete,
  loading = false,
}) => {

  const { error } = useAppSelector((state) => state.members);

  const getStatusBadge = (status: 'active' | 'expired') => {
    const statusClasses = {
      active: 'status-badge status-success',
      expired: 'status-badge status-danger',
    };

    const statusLabels = {
      active: 'Active',
      expired: 'Expired',
    };

    return (
      <span className={statusClasses[status]}>
        {statusLabels[status]}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="table-loading">
        <div className="spinner"></div>
        <p>Loading members...</p>
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="table-empty">
        <p>No members found</p>
        <span>Try adjusting your filters or add a new member</span>
      </div>
    );
  }

  return (
    <div className="members-table-wrapper">
      <table className="members-table">
        <thead>
          <tr>
            <th>Member Code</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Package</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>
                <code className="member-code">{member.memberCode}</code>
              </td>
              <td>
                <div className="member-name">
                  {member.fullName}
                  {!member.isActive && (
                    <span className="inactive-badge">Inactive</span>
                  )}
                </div>
              </td>
              <td className="text-secondary">{member.email}</td>
              <td className="text-secondary">{member.phone || '-'}</td>
              <td>
                <div className="package-info">
                  <span className="package-name">{member.packageName}</span>
                  {member.packagePrice && (
                    <span className="package-price">
                      Rs. {member.packagePrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </td>
              <td>{getStatusBadge(member.membershipStatus)}</td>
              <td className="text-secondary">
                {formatDate(member.membershipStartDate)}
              </td>
              <td className="text-secondary">
                {formatDate(member.membershipEndDate)}
              </td>
              <td>
                <div className="action-buttons">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onView(member)}
                    title="View details"
                  >
                    <Eye size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(member)}
                    title="Edit member"
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(member)}
                    title="Delete member"
                    className="btn-danger"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};