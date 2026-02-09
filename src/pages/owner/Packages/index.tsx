import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchPackages, deletePackage } from '@/features/packages/packagesSlice';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PackageTable } from '@/components/packages/PackageTable';
import { PackageFormModal } from '@/components/packages/PackageFormModal';
import { PackageViewModal } from '@/components/packages/PackageViewModal';
import { Package } from '@/features/packages/types';
import '@css/package.css';

export const Packages = () => {
  const dispatch = useAppDispatch();
  const { packages } = useAppSelector(s => s.packages);

  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<Package | null>(null);
  const [viewing, setViewing] = useState<Package | null>(null);

  useEffect(() => {
    dispatch(fetchPackages());
  }, []);

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
            onDelete={(id) => dispatch(deletePackage(id))}
          />
        </CardContent>
      </Card>

      <PackageFormModal
        open={openForm}
        editingPackage={editing}
        onClose={() => {
          setOpenForm(false);
          setEditing(null);
        }}
      />

      <PackageViewModal
        pkg={viewing}
        onClose={() => setViewing(null)}
      />
    </div>
  );
};
