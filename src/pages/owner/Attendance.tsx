import React, { useState } from 'react';
import { Camera, UserCheck } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addAttendance, setAttendances } from '../../features/dashboard/dashboardSlice';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Table } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { attendances as dummyAttendances } from '../../data/dummyData';
import '../admin/Dashboard.css';

export const Attendance: React.FC = () => {
  const dispatch = useAppDispatch();
  const { attendances } = useAppSelector((state) => state.dashboard);
  const [scannerActive, setScannerActive] = useState(false);

  React.useEffect(() => {
    dispatch(setAttendances(dummyAttendances));
  }, [dispatch]);

  const handleMarkAttendance = () => {
    const newAttendance = {
      id: `att-${Date.now()}`,
      memberId: 'mem-001',
      memberName: 'James Wilson',
      gymId: 'gym-001',
      checkInTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toISOString().split('T')[0],
    };
    dispatch(addAttendance(newAttendance));
    setScannerActive(false);
  };

  const todayAttendances = attendances.filter(
    (a) => a.date === new Date().toISOString().split('T')[0]
  );

  const columns = [
    { header: 'Member', accessor: 'memberName' as const },
    { header: 'Check-In', accessor: 'checkInTime' as const },
    {
      header: 'Check-Out',
      accessor: (att: typeof attendances[0]) => att.checkOutTime || '-',
    },
    {
      header: 'Date',
      accessor: (att: typeof attendances[0]) => new Date(att.date).toLocaleDateString(),
    },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Attendance</h1>
          <p className="page-subtitle">Track member check-ins and check-outs</p>
        </div>
        <Button onClick={() => setScannerActive(!scannerActive)}>
          <Camera size={18} />
          {scannerActive ? 'Close Scanner' : 'Scan QR'}
        </Button>
      </div>

      {scannerActive && (
        <Card style={{ marginBottom: '1.5rem' }}>
          <CardContent>
            <div className="qr-scanner-container">
              <div className="qr-scanner-frame">
                <div className="qr-scanner-overlay">
                  <div className="qr-scanner-line"></div>
                </div>
                <p className="qr-scanner-text">Position QR code within the frame</p>
              </div>
              <Button onClick={handleMarkAttendance}>
                <UserCheck size={18} />
                Manual Check-In
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader title={`Today's Attendance (${todayAttendances.length})`} />
        <CardContent>
          <Table data={todayAttendances} columns={columns} emptyMessage="No attendance records for today" />
        </CardContent>
      </Card>

      <Card style={{ marginTop: '1.5rem' }}>
        <CardHeader title="All Attendance Records" subtitle="Complete history" />
        <CardContent>
          <Table data={attendances} columns={columns} emptyMessage="No attendance records" />
        </CardContent>
      </Card>
    </div>
  );
};
