import React from 'react';
import { InputField } from '@components/ui/InputField';
import { GymFormData } from '@/pages/admin/CreateGym';

interface Props {
  data: GymFormData;
  errors?: Partial<Record<keyof GymFormData, string>>;
  onChange: <K extends keyof GymFormData>(name: K, value: GymFormData[K]) => void;
}

export const GymDetailsForm: React.FC<Props> = ({ errors, data, onChange }) => (
  <div className="form-section">
    <h3 className="form-section-title">Gym Details</h3>
    <div className="form-grid">
      <InputField
        id="gymName"
        label="Gym Name *"
        value={data.gymName}
        type='text'
        onChange={(e) => onChange('gymName', e.target.value)}
        error={errors?.gymName}
      />
      <InputField
        id="gymEmail"
        label="Gym Email *"
        type="email"
        value={data.gymEmail}
        onChange={(e) => onChange('gymEmail', e.target.value)}
        error={errors?.gymEmail}
      />
      <InputField
        id="phone"
        label="Phone *"
        type='text'
        value={data.gymPhone}
        onChange={(e) => onChange('gymPhone', e.target.value)}
        error={errors?.gymPhone}
      />
      <InputField
        id="address"
        label="Address *"
        fullWidth
        type='text'
        value={data.gymAddress}
        onChange={(e) => onChange('gymAddress', e.target.value)}
        error={errors?.gymAddress}
      />
    </div>
  </div>
);
