import React from 'react';
import { useAppSelector } from '@/app/hooks';
import { Button } from '@/components/ui/Button';
import { CreateMemberPayload, UpdateMemberPayload, Member } from '@features/members/types';
import './index.css';

interface MemberFormProps {
  member?: Member | null;
  onSubmit: (data: CreateMemberPayload | UpdateMemberPayload) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const MemberForm: React.FC<MemberFormProps> = ({
  member,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const { validationErrors } = useAppSelector(state => state.members);
  const { packages, loading: packagesLoading } = useAppSelector(state => state.packages);

  const [formData, setFormData] = React.useState({
    email: member?.email || '',
    fullName: member?.full_name || '',
    phone: member?.phone || '',
    dateOfBirth: member?.date_of_birth || '',
    gender: member?.gender || '',
    address: member?.address || '',
    emergencyContact: member?.emergencyContact || '',
    packageId: member?.package_id?.toString() || '',
    membershipStartDate: member?.membership_start_date || new Date().toISOString().split('T')[0],
    isActive: member?.is_active ?? true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: any = {
      fullName: formData.fullName,
      phone: formData.phone || undefined,
      dateOfBirth: formData.dateOfBirth || undefined,
      gender: formData.gender || undefined,
      address: formData.address || undefined,
      emergencyContact: formData.emergencyContact || undefined,
      packageId: parseInt(formData.packageId),
      membershipStartDate: formData.membershipStartDate,
    };

    if (!member) {
      // Creating new member
      payload.email = formData.email;
    } else {
      // Updating existing member
      payload.isActive = formData.isActive;
    }

    onSubmit(payload);
  };

  const activePackages = packages.filter(p => p.is_active);

  return (
    <form className="member-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        {/* Email - only for new members */}
        {!member && (
          <div className="form-field">
            <label htmlFor="email">
              Email <span className="required">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="member@example.com"
              disabled={isLoading}
            />
            {validationErrors.email && (
              <span className="field-error">{validationErrors.email}</span>
            )}
          </div>
        )}

        {/* Full Name */}
        <div className="form-field">
          <label htmlFor="fullName">
            Full Name <span className="required">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            disabled={isLoading}
          />
          {validationErrors.fullName && (
            <span className="field-error">{validationErrors.fullName}</span>
          )}
        </div>

        {/* Phone */}
        <div className="form-field">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+977-9841234567"
            disabled={isLoading}
          />
          {validationErrors.phone && (
            <span className="field-error">{validationErrors.phone}</span>
          )}
        </div>

        {/* Date of Birth */}
        <div className="form-field">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            disabled={isLoading}
            max={new Date().toISOString().split('T')[0]}
          />
          {validationErrors.dateOfBirth && (
            <span className="field-error">{validationErrors.dateOfBirth}</span>
          )}
        </div>

        {/* Gender */}
        <div className="form-field">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            disabled={isLoading}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {validationErrors.gender && (
            <span className="field-error">{validationErrors.gender}</span>
          )}
        </div>

        {/* Emergency Contact */}
        <div className="form-field">
          <label htmlFor="emergencyContact">Emergency Contact</label>
          <input
            id="emergencyContact"
            name="emergencyContact"
            type="tel"
            value={formData.emergencyContact}
            onChange={handleChange}
            placeholder="+977-9841234567"
            disabled={isLoading}
          />
          {validationErrors.emergencyContact && (
            <span className="field-error">{validationErrors.emergencyContact}</span>
          )}
        </div>

        {/* Package */}
        <div className="form-field">
          <label htmlFor="packageId">
            Membership Package <span className="required">*</span>
          </label>
          <select
            id="packageId"
            name="packageId"
            required
            value={formData.packageId}
            onChange={handleChange}
            disabled={isLoading || packagesLoading}
          >
            <option value="">Select Package</option>
            {activePackages.map(pkg => (
              <option key={pkg.id} value={pkg.id}>
                {pkg.name} - Rs. {pkg.price.toLocaleString()} ({pkg.duration_type})
              </option>
            ))}
          </select>
          {validationErrors.packageId && (
            <span className="field-error">{validationErrors.packageId}</span>
          )}
        </div>

        {/* Membership Start Date */}
        <div className="form-field">
          <label htmlFor="membershipStartDate">
            Membership Start Date <span className="required">*</span>
          </label>
          <input
            id="membershipStartDate"
            name="membershipStartDate"
            type="date"
            required
            value={formData.membershipStartDate}
            onChange={handleChange}
            disabled={isLoading}
          />
          {validationErrors.membershipStartDate && (
            <span className="field-error">{validationErrors.membershipStartDate}</span>
          )}
        </div>

        {/* Active Status - only for editing */}
        {member && (
          <div className="form-field form-checkbox">
            <label htmlFor="isActive">
              <input
                id="isActive"
                name="isActive"
                type="checkbox"
                checked={formData.isActive}
                onChange={handleChange}
                disabled={isLoading}
              />
              <span>Active Member</span>
            </label>
          </div>
        )}

        {/* Address - full width */}
        <div className="form-field form-field-full">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Full address"
            disabled={isLoading}
            rows={3}
          />
          {validationErrors.address && (
            <span className="field-error">{validationErrors.address}</span>
          )}
        </div>
      </div>

      {/* Form Actions */}
      <div className="form-actions">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading || !formData.packageId}
        >
          {isLoading ? 'Saving...' : member ? 'Update Member' : 'Add Member'}
        </Button>
      </div>
    </form>
  );
};