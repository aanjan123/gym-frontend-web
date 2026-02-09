import React from 'react';
import { useAppSelector } from '@/app/hooks';
import { Button } from '@/components/ui/Button';
import { InputField } from '@/components/ui/InputField';
import { CreateMemberPayload, UpdateMemberPayload, Member } from '@features/members/types';
import './index.css';
interface MemberFormProps {
  member?: Member | null;
  onSubmit: (data: CreateMemberPayload | UpdateMemberPayload) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const getFormatedDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
}

export const MemberForm: React.FC<MemberFormProps> = ({
  member,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const { validationErrors, error } = useAppSelector(state => state.members);
  const { packages, loading: packagesLoading } = useAppSelector(state => state.packages);
  const [formData, setFormData] = React.useState({
    email: member?.email || '',
    fullName: member?.fullName || '',
    phone: member?.phone || '',
    dateOfBirth: member?.dateOfBirth ? getFormatedDate(member?.dateOfBirth) : '',
    gender: member?.gender || '',
    address: member?.address || '',
    emergencyContact: member?.emergencyContact || '',
    packageId: member?.packageId?.toString() || '',
    membershipStartDate: member?.membershipStartDate ? getFormatedDate(member?.membershipStartDate) : new Date().toISOString().split('T')[0],
    isActive: member?.isActive ?? true,
  });

  const handleChange = (name: string, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { value, type } = e.target;

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
      payload.email = formData.email;
    } else {
      payload.isActive = formData.isActive;
    }

    onSubmit(payload);
  };

  const activePackages = packages.filter(p => p.isActive);

  return (
    <form className="member-form" onSubmit={handleSubmit}>
      <div className="form-grid">

        {!member && (
          <InputField
            label={"Email"}
            placeholder="Enter email"
            id="email"
            type="email"
            required
            value={formData.email}
            disabled={isLoading}
            error={validationErrors.email}
            onChange={(e) => handleChange('email', e)}
          />
        )}

        <InputField
          label={"Full Name"}
          placeholder="Enter full name"
          icon={null}
          id="fullName"
          type="text"
          required
          value={formData.fullName}
          disabled={isLoading}
          error={validationErrors.fullName}
          onChange={(e) => handleChange('fullName', e)}
        />

        <InputField
          label={"phone"}
          placeholder="Enter phone number"
          icon={null}
          id="phone"
          type="tel"
          required
          value={formData.phone}
          disabled={isLoading}
          error={validationErrors.phone}
          onChange={(e) => handleChange('phone', e)}
        />

        <InputField
          id="Date of Birth"
          label="Date of Birth"
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) => handleChange('dateOfBirth', e)}
        />

        {/* Gender */}
        <div className="form-group form-field">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            disabled={isLoading}
            onChange={(e) => handleChange('gender', e)}
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

        <InputField
          label={"Emergency Contact"}
          placeholder="Enter emergency contact number"
          icon={null}
          id="emergencyContact"
          type="tel"
          required
          value={formData.emergencyContact}
          disabled={isLoading}
          error={validationErrors.emergencyContact}
          onChange={(e) => handleChange('emergencyContact', e)}
        />

        <div className="form-field">
          <label htmlFor="packageId">
            Membership Package
          </label>
          <select
            id="packageId"
            name="packageId"
            required
            value={formData.packageId}
            onChange={(e) => handleChange('packageId', e)}
            disabled={isLoading || packagesLoading}
          >
            <option value="">Select Package</option>
            {activePackages.map(pkg => (
              <option key={pkg.id} value={pkg.id}>
                {pkg.name} - Rs. {pkg.price.toLocaleString()} ({pkg.durationType})
              </option>
            ))}
          </select>
          {validationErrors.packageId && (
            <span className="field-error">{validationErrors.packageId}</span>
          )}
        </div>

        <InputField
          id="membershipStartDate"
          label="Membership Start Date "
          type="date"
          value={formData.membershipStartDate}
          onChange={(e) => handleChange('membershipStartDate', e)}
          required
        />

        {member && (
          <div className="form-field form-checkbox">
            <label htmlFor="isActive">
              <input
                id="isActive"
                name="isActive"
                type="checkbox"
                checked={formData.isActive}
                disabled={isLoading}
                onChange={(e) => handleChange('isActive', e)}
              />
              <span>Active Member</span>
            </label>
          </div>
        )}

        <div className="form-field form-field-full">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={(e) => handleChange('address', e)}
            placeholder="Full address"
            disabled={isLoading}
            rows={3}
          />
          {validationErrors.address && (
            <span className="field-error">{validationErrors.address}</span>
          )}
        </div>

        <div className='form-error'>
          {error && (
            <h4 className="field-error bold">{error}</h4>
          )}
        </div>
      </div>

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