import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  createPackage,
  updatePackage,
} from '@/features/packages/packagesSlice';
import { useEffect, useState } from 'react';
import { Package } from '@/features/packages/types';

export const PackageFormModal = ({
  open,
  onClose,
  editingPackage,
}: {
  open: boolean;
  onClose: () => void;
  editingPackage?: Package | null;
}) => {
  const dispatch = useAppDispatch();
  const { validationErrors, loading, error } = useAppSelector((s) => s.packages);

  const [form, setForm] = useState({
    name: '',
    price: '',
    durationType: 'monthly',
    durationValue: 1,
    description: '',
    features: [] as string[],
    featureInput: '',
  });

  useEffect(() => {
    if (editingPackage) {
      setForm({
        name: editingPackage.name,
        price: editingPackage.price,
        durationType: editingPackage.durationType,
        durationValue: editingPackage.durationValue,
        description: editingPackage.description || '',
        features: editingPackage.features || [],
        featureInput: '',
      });
    } else {
      setForm({
        name: '',
        price: '',
        durationType: 'monthly',
        durationValue: 1,
        description: '',
        features: [] as string[],
        featureInput: '',
      });
    }
  }, [editingPackage]);

  const addFeature = () => {
    if (!form.featureInput.trim()) return;
    setForm({
      ...form,
      features: [...form.features, form.featureInput.trim()],
      featureInput: '',
    });
  };

  const removeFeature = (idx: number) => {
    setForm({
      ...form,
      features: form.features.filter((_, i) => i !== idx),
    });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      price: Number(form.price),
      durationType: form.durationType,
      durationValue: form.durationValue,
      description: form.description || null,
      features: form.features,
    };

    if (editingPackage) {
      dispatch(updatePackage(editingPackage.id, payload)).finally(() => onClose());
    } else {
      dispatch(createPackage(payload)).finally(() => onClose());
    }
  };

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      title={editingPackage ? 'Edit Package' : 'Create Package'}
      size="lg"
    >
      <form onSubmit={submit} className="package-form">
        {/* Name */}
        <div className="form-field">
          <label>Package Name *</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Student Monthly"
          />
          {validationErrors.name && <p className="form-error">{validationErrors.name}</p>}
        </div>

        {/* Price + Duration */}
        <div className="form-row">
          <div className="form-field">
            <label>Price (Rs) *</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="1200"
            />
            {validationErrors.price && <p className="form-error">{validationErrors.price}</p>}
          </div>

          <div className="form-field">
            <label>Duration *</label>
            <div className="duration-group">
              <input
                type="number"
                min={1}
                value={form.durationValue}
                onChange={(e) =>
                  setForm({ ...form, durationValue: Number(e.target.value) })
                }
              />
              <select
                value={form.durationType}
                onChange={(e) =>
                  setForm({ ...form, durationType: e.target.value })
                }
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="half_yearly">Half Yearly</option>
                <option value="yearly">Yearly</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            {validationErrors.durationType && (
              <p className="form-error">{validationErrors.durationType}</p>
            )}
          </div>
        </div>

        <div className="form-field">
          <label>Description</label>
          <textarea
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            placeholder="Short description of the package"
          />
        </div>

        {/* Features */}
        <div className="form-field">
          <label>Features</label>

          <div className="feature-input">
            <input
              value={form.featureInput}
              onChange={(e) =>
                setForm({ ...form, featureInput: e.target.value })
              }
              placeholder="Add feature"
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
            />
            <Button type="button" variant="secondary" onClick={addFeature}>
              Add
            </Button>
          </div>

          <div className="feature-chips">
            {form.features.map((f, idx) => (
              <span key={idx} className="feature-chip">
                {f}
                <button type="button" onClick={() => removeFeature(idx)}>×</button>
              </span>
            ))}
          </div>

          <div className="form-error">
            {error && <h4 className='error-text'>{error}</h4>}
          </div>
        </div>

        <div className="form-actions">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            {editingPackage ? 'Update Package' : 'Create Package'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
