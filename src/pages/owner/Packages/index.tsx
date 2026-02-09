import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Package } from '@/features/packages/types';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { PackageTable } from '@/components/packages/PackageTable';
import { ConfirmationModal } from '@/components/ConfirmationModal';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { PackageFormModal } from '@/components/packages/PackageFormModal';
import { PackageViewModal } from '@/components/packages/PackageViewModal';
import { fetchPackages, deletePackage, clearLastCreatedPackage } from '@/features/packages/packagesSlice';
import '@css/package.css';

export const Packages = () => {
  const dispatch = useAppDispatch();
  const { packages } = useAppSelector(s => s.packages);

  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<Package | null>(null);
  const [viewing, setViewing] = useState<Package | null>(null);
  const [packageToDelete, setPackageToDelete] = useState<Package | null>(null);

  useEffect(() => {
    dispatch(fetchPackages());
  }, []);

  const onClose = () => {
    setOpenForm(false);
    setEditing(null);
    dispatch(clearLastCreatedPackage());
  }

  const handleDelete = (pkg: Package) => {
    setPackageToDelete(pkg);
  }

  const handleConfirmDelete = () => {
    if (packageToDelete) {
      dispatch(deletePackage(packageToDelete.id)).finally(() => {
        setPackageToDelete(null);
      });
    }
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="page-title">Gym Packages</h1>
        <Button onClick={() => setOpenForm(true)}>New Package</Button>
      </div>

      <Card>
        <CardHeader title={`Packages (${packages.length})`} />
        <CardContent>
          <PackageTable
            packages={packages}
            onView={setViewing}
            onEdit={(p) => {
              setEditing(p);
              setOpenForm(true);
            }}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      <PackageFormModal
        open={openForm}
        editingPackage={editing}
        onClose={onClose}
      />

      <PackageViewModal
        pkg={viewing}
        onClose={() => setViewing(null)}
      />

      <ConfirmationModal
        open={!!packageToDelete}
        title="Confirm Deletion"
        description={`Are you sure you want to delete the package "${packageToDelete?.name}"? This action cannot be undone.`}
        onClose={() => setPackageToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};
