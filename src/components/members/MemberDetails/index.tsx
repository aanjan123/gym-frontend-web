import React from 'react';
import { X, Mail, Phone, Calendar, MapPin, User, CreditCard, AlertCircle } from 'lucide-react';
import { Member } from '../../../features/members/types';
import { Button } from '@/components/ui/Button';
import './index.css';

interface MemberDetailsProps {
  member: Member;
  onClose: () => void;
  onEdit: () => void;
}

export const MemberDetails: React.FC<MemberDetailsProps> = ({
  member,
  onClose,
  onEdit,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status: 'active' | 'expired') => {
    const statusClasses = {
      active: 'detail-badge badge-success',
      expired: 'detail-badge badge-danger',
    };

    const statusLabels = {
      active: 'Active Membership',
      expired: 'Expired Membership',
    };

    return (
      <span className={statusClasses[status]}>
        {statusLabels[status]}
      </span>
    );
  };

  const calculateDaysRemaining = () => {
    const endDate = new Date(member.membership_end_date);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = calculateDaysRemaining();

  return (
    <div className="member-details">
      {/* Header */}
      <div className="details-header">
        <div>
          <h2>{member.full_name}</h2>
          <code className="member-code-large">{member.member_code}</code>
        </div>
        <div className="header-actions">
          <Button variant="primary" onClick={onEdit}>
            Edit Member
          </Button>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Status */}
      <div className="details-status">
        {getStatusBadge(member.membership_status)}
        {!member.is_active && (
          <span className="detail-badge badge-warning">Inactive Account</span>
        )}
        {member.membership_status === 'active' && daysRemaining <= 7 && daysRemaining > 0 && (
          <span className="detail-badge badge-warning">
            <AlertCircle size={14} />
            Expires in {daysRemaining} days
          </span>
        )}
      </div>

      <div className="details-grid">
        <div className="detail-section">
          <h3 className="section-title">Contact Information</h3>
          <div className="detail-items">
            <div className="detail-item">
              <Mail size={18} className="detail-icon" />
              <div>
                <span className="detail-label">Email</span>
                <span className="detail-value">{member.email}</span>
              </div>
            </div>

            {member.phone && (
              <div className="detail-item">
                <Phone size={18} className="detail-icon" />
                <div>
                  <span className="detail-label">Phone</span>
                  <span className="detail-value">{member.phone}</span>
                </div>
              </div>
            )}

            {member.emergencyContact && (
              <div className="detail-item">
                <AlertCircle size={18} className="detail-icon" />
                <div>
                  <span className="detail-label">Emergency Contact</span>
                  <span className="detail-value">{member.emergencyContact}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Personal Information */}
        <div className="detail-section">
          <h3 className="section-title">Personal Information</h3>
          <div className="detail-items">
            {member.date_of_birth && (
              <div className="detail-item">
                <Calendar size={18} className="detail-icon" />
                <div>
                  <span className="detail-label">Date of Birth</span>
                  <span className="detail-value">{formatDate(member.date_of_birth)}</span>
                </div>
              </div>
            )}

            {member.gender && (
              <div className="detail-item">
                <User size={18} className="detail-icon" />
                <div>
                  <span className="detail-label">Gender</span>
                  <span className="detail-value">
                    {member.gender.charAt(0).toUpperCase() + member.gender.slice(1)}
                  </span>
                </div>
              </div>
            )}

            {member.address && (
              <div className="detail-item">
                <MapPin size={18} className="detail-icon" />
                <div>
                  <span className="detail-label">Address</span>
                  <span className="detail-value">{member.address}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="detail-section">
          <h3 className="section-title">Membership Details</h3>
          <div className="detail-items">
            <div className="detail-item">
              <CreditCard size={18} className="detail-icon" />
              <div>
                <span className="detail-label">Package</span>
                <span className="detail-value">
                  {member.package_name}
                  {member.package_price && (
                    <span className="package-price-tag">
                      Rs. {member.package_price.toLocaleString()}
                    </span>
                  )}
                </span>
              </div>
            </div>

            <div className="detail-item">
              <Calendar size={18} className="detail-icon" />
              <div>
                <span className="detail-label">Start Date</span>
                <span className="detail-value">{formatDate(member.membership_start_date)}</span>
              </div>
            </div>

            <div className="detail-item">
              <Calendar size={18} className="detail-icon" />
              <div>
                <span className="detail-label">End Date</span>
                <span className="detail-value">{formatDate(member.membership_end_date)}</span>
              </div>
            </div>

            <div className="detail-item">
              <Calendar size={18} className="detail-icon" />
              <div>
                <span className="detail-label">Joined</span>
                <span className="detail-value">{formatDate(member.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};