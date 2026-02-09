import React, { useEffect, useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchAttendance, checkInMember, checkOutMember, clearAttendanceError } from '@/features/attendance/attendanceSlice';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Table } from '@/components/ui/Table';
import { AttendanceTable } from '@/components/attendance/AttendanceTable';
import { Button } from '@/components/ui/Button';
import { Check, LogIn, LogOut } from 'lucide-react';
import { AttendanceFilters } from '@components/attendance/AttendanceFilters';
import { useDebounce } from '@hooks/useDebounce';
import './index.css';
import { fetchMembers } from '@/features/members/membersSlice';
import { Toast } from '@/components/ui/Toast';
import { getFormatedDate } from '@/components/members/MemberForm';

export const Attendance: React.FC = () => {
  const dispatch = useAppDispatch();

  const { list: attendanceList, loading, error } = useAppSelector((state) => state.attendance);
  const { members } = useAppSelector((state) => state.members);

  const [filters, setFilters] = useState({ search: '', date: new Date().toISOString().split('T')[0] });
  const debouncedSearch = useDebounce(filters.search, 400);

  const filteredMembers = useMemo(() => {
    return members.filter((m) =>
      m.fullName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      m.email.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [members, debouncedSearch]);

  useEffect(() => {
    dispatch(fetchAttendance({ date: filters.date }));
  }, [filters.date, dispatch]);

  useEffect(() => {
    dispatch(fetchMembers());
  }, []);

  const todayAttendance = useMemo(() => {
    const filterDate = new Date(filters.date);
    filterDate.setDate(filterDate.getDate() - 1);
    const formattedDate = filterDate.toISOString().split('T')[0];

    return attendanceList.filter((a) => getFormatedDate(a.date) === formattedDate);
  }, [attendanceList, filters.date]);


  const handleCheckIn = (memberId: number) => {
    dispatch(checkInMember({ memberId, date: new Date().toISOString() })).finally(() => {
      dispatch(fetchMembers())
    })
  };

  const handleCheckOut = (memberId: number) => {
    dispatch(checkOutMember({ memberId, date: new Date().toISOString() })).finally(() => {
      dispatch(fetchMembers())
    })
  };

  // const handleManualAttendance = (memberId: number) => {
  //   dispatch(markManualAttendance({
  //     memberId,
  //     date: filters.date,
  //     checkInTime: new Date().toISOString(),
  //     checkOutTime: null,
  //   }));
  // };

  const columns = [
    { header: 'Member', accessor: 'fullName' as const },
    { header: 'Email', accessor: 'email' as const },
    { header: 'Membeship Status', accessor: 'membershipStatus' as const },
    {
      header: 'Attendance',
      accessor: (row: typeof filteredMembers[0]) => {
        const isCheckedIn = row.todayAttendanceStatus === "checked_in"
        const isCompleted = row.todayAttendanceStatus === "checked_out";

        return isCompleted ?
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button size="sm" variant="primary">
              <Check size={16} /> Completed
            </Button>
          </div>
          :
          isCheckedIn ? (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {/* <span>{att.checkInTime ? 'Checked In' : 'Pending'}</span> */}
              <Button size="sm" variant="secondary" onClick={() => handleCheckOut(row.id)}>
                <LogOut size={16} /> Check-Out
              </Button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button size="sm" variant="secondary" onClick={() => handleCheckIn(row.id)}>
                <LogIn size={16} /> Check-In
              </Button>
              {/* <Button size="sm" variant="secondary" onClick={() => handleManualAttendance(row.id)}>
              <UserCheck size={16} /> Manual
            </Button> */}
            </div>
          );
      },
    },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Attendance</h1>
          <p className="page-subtitle">Mark attendance for members</p>
        </div>
      </div>

      <AttendanceFilters filters={filters} setFilters={setFilters} />

      <Card>
        <CardHeader title={`Members (${filteredMembers.length})`} />
        <CardContent>
          <Table
            data={filteredMembers}
            columns={columns}
            loading={loading}
            emptyMessage="No members found"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="All Attendance Records" subtitle="Complete history" />
        <CardContent>
          <AttendanceTable
            loading={loading}
            data={todayAttendance}
          />
        </CardContent>
      </Card>

      {error && <Toast type='error' message={error} onClose={() => dispatch(clearAttendanceError())} />}
    </div>
  );
};
