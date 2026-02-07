export interface User {
  id: string;
  email: string;
  role: 'superadmin' | 'owner';
  name: string;
  gymId?: string;
}

export interface Gym {
  id: string;
  name: string;
  ownerEmail: string;
  ownerName: string;
  status: 'active' | 'suspended' | 'trial';
  activeMembersCount: number;
  totalMembers: number;
  createdAt: string;
  expiryDate: string;
  subscriptionPlan: 'basic' | 'standard' | 'premium';
  address: string;
  phone: string;
  monthlyRevenue: number;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  gymId: string;
  status: 'active' | 'inactive' | 'suspended';
  membershipType: 'monthly' | 'quarterly' | 'yearly';
  joinedDate: string;
  expiryDate: string;
  lastPaymentDate: string;
  paymentStatus: 'paid' | 'due' | 'overdue';
  amountDue: number;
  profileImage?: string;
}

export interface Attendance {
  id: string;
  memberId: string;
  memberName: string;
  gymId: string;
  checkInTime: string;
  checkOutTime?: string;
  date: string;
}

export interface Announcement {
  id: string;
  gymId: string;
  title: string;
  message: string;
  createdAt: string;
  isPublished: boolean;
  createdBy: string;
}

export interface DashboardStats {
  totalGyms?: number;
  activeGyms?: number;
  totalMembers?: number;
  todayAttendance?: number;
  activeMembers?: number;
  monthlyRevenue?: number;
}

// Dummy Super Admin
export const superAdminUser: User = {
  id: 'sa-001',
  email: 'admin@gymsaas.com',
  role: 'superadmin',
  name: 'Super Admin',
};

// Dummy Gym Owners
export const gymOwners: User[] = [
  {
    id: 'owner-001',
    email: 'john@fitzone.com',
    role: 'owner',
    name: 'John Doe',
    gymId: 'gym-001',
  },
  {
    id: 'owner-002',
    email: 'sarah@powerhouse.com',
    role: 'owner',
    name: 'Sarah Johnson',
    gymId: 'gym-002',
  },
];

// Dummy Gyms
export const gyms: Gym[] = [
  {
    id: 'gym-001',
    name: 'FitZone Premium',
    ownerEmail: 'john@fitzone.com',
    ownerName: 'John Doe',
    status: 'active',
    activeMembersCount: 245,
    totalMembers: 280,
    createdAt: '2024-01-15',
    expiryDate: '2025-01-15',
    subscriptionPlan: 'premium',
    address: '123 Main St, New York, NY 10001',
    phone: '+1 234-567-8901',
    monthlyRevenue: 24500,
  },
  {
    id: 'gym-002',
    name: 'PowerHouse Gym',
    ownerEmail: 'sarah@powerhouse.com',
    ownerName: 'Sarah Johnson',
    status: 'active',
    activeMembersCount: 180,
    totalMembers: 200,
    createdAt: '2024-02-20',
    expiryDate: '2025-02-20',
    subscriptionPlan: 'standard',
    address: '456 Elm St, Los Angeles, CA 90001',
    phone: '+1 234-567-8902',
    monthlyRevenue: 18000,
  },
  {
    id: 'gym-003',
    name: 'Flex Fitness Center',
    ownerEmail: 'mike@flexfitness.com',
    ownerName: 'Mike Wilson',
    status: 'trial',
    activeMembersCount: 85,
    totalMembers: 95,
    createdAt: '2024-11-10',
    expiryDate: '2025-02-10',
    subscriptionPlan: 'basic',
    address: '789 Oak Ave, Chicago, IL 60601',
    phone: '+1 234-567-8903',
    monthlyRevenue: 8500,
  },
  {
    id: 'gym-004',
    name: 'Iron Paradise',
    ownerEmail: 'alex@ironparadise.com',
    ownerName: 'Alex Martinez',
    status: 'suspended',
    activeMembersCount: 0,
    totalMembers: 150,
    createdAt: '2023-08-05',
    expiryDate: '2024-12-05',
    subscriptionPlan: 'standard',
    address: '321 Pine Rd, Houston, TX 77001',
    phone: '+1 234-567-8904',
    monthlyRevenue: 0,
  },
  {
    id: 'gym-005',
    name: 'Elite Strength Studio',
    ownerEmail: 'emma@elitestrength.com',
    ownerName: 'Emma Davis',
    status: 'active',
    activeMembersCount: 320,
    totalMembers: 350,
    createdAt: '2023-05-12',
    expiryDate: '2025-05-12',
    subscriptionPlan: 'premium',
    address: '654 Maple Dr, Miami, FL 33101',
    phone: '+1 234-567-8905',
    monthlyRevenue: 32000,
  },
];

// Dummy Members for Gym 001
export const members: Member[] = [
  {
    id: 'mem-001',
    name: 'James Wilson',
    email: 'james.w@email.com',
    phone: '+1 555-0101',
    gymId: 'gym-001',
    status: 'active',
    membershipType: 'monthly',
    joinedDate: '2024-01-10',
    expiryDate: '2026-03-10',
    lastPaymentDate: '2026-02-01',
    paymentStatus: 'paid',
    amountDue: 0,
  },
  {
    id: 'mem-002',
    name: 'Emily Chen',
    email: 'emily.c@email.com',
    phone: '+1 555-0102',
    gymId: 'gym-001',
    status: 'active',
    membershipType: 'yearly',
    joinedDate: '2024-03-15',
    expiryDate: '2026-03-15',
    lastPaymentDate: '2025-03-15',
    paymentStatus: 'paid',
    amountDue: 0,
  },
  {
    id: 'mem-003',
    name: 'Michael Brown',
    email: 'michael.b@email.com',
    phone: '+1 555-0103',
    gymId: 'gym-001',
    status: 'active',
    membershipType: 'monthly',
    joinedDate: '2024-06-20',
    expiryDate: '2026-03-20',
    lastPaymentDate: '2026-01-20',
    paymentStatus: 'due',
    amountDue: 99,
  },
  {
    id: 'mem-004',
    name: 'Sophia Martinez',
    email: 'sophia.m@email.com',
    phone: '+1 555-0104',
    gymId: 'gym-001',
    status: 'active',
    membershipType: 'quarterly',
    joinedDate: '2024-08-05',
    expiryDate: '2026-02-05',
    lastPaymentDate: '2025-11-05',
    paymentStatus: 'overdue',
    amountDue: 299,
  },
  {
    id: 'mem-005',
    name: 'David Lee',
    email: 'david.l@email.com',
    phone: '+1 555-0105',
    gymId: 'gym-001',
    status: 'inactive',
    membershipType: 'monthly',
    joinedDate: '2024-04-12',
    expiryDate: '2025-12-12',
    lastPaymentDate: '2025-10-12',
    paymentStatus: 'overdue',
    amountDue: 297,
  },
];

// Dummy Attendance
export const attendances: Attendance[] = [
  {
    id: 'att-001',
    memberId: 'mem-001',
    memberName: 'James Wilson',
    gymId: 'gym-001',
    checkInTime: '06:30',
    checkOutTime: '08:00',
    date: '2026-02-07',
  },
  {
    id: 'att-002',
    memberId: 'mem-002',
    memberName: 'Emily Chen',
    gymId: 'gym-001',
    checkInTime: '07:15',
    checkOutTime: '08:45',
    date: '2026-02-07',
  },
  {
    id: 'att-003',
    memberId: 'mem-003',
    memberName: 'Michael Brown',
    gymId: 'gym-001',
    checkInTime: '17:30',
    date: '2026-02-07',
  },
  {
    id: 'att-004',
    memberId: 'mem-001',
    memberName: 'James Wilson',
    gymId: 'gym-001',
    checkInTime: '06:45',
    checkOutTime: '08:15',
    date: '2026-02-06',
  },
  {
    id: 'att-005',
    memberId: 'mem-004',
    memberName: 'Sophia Martinez',
    gymId: 'gym-001',
    checkInTime: '18:00',
    checkOutTime: '19:30',
    date: '2026-02-06',
  },
];

// Dummy Announcements
export const announcements: Announcement[] = [
  {
    id: 'ann-001',
    gymId: 'gym-001',
    title: 'New Yoga Classes Starting',
    message: 'We are excited to announce new morning yoga classes starting from Monday. Join us at 7 AM for a refreshing start to your day!',
    createdAt: '2026-02-05T10:30:00',
    isPublished: true,
    createdBy: 'John Doe',
  },
  {
    id: 'ann-002',
    gymId: 'gym-001',
    title: 'Gym Maintenance Notice',
    message: 'The gym will be closed on Sunday, Feb 10th for annual maintenance. We apologize for any inconvenience.',
    createdAt: '2026-02-03T14:20:00',
    isPublished: true,
    createdBy: 'John Doe',
  },
  {
    id: 'ann-003',
    gymId: 'gym-001',
    title: 'Valentine Special Offer',
    message: 'Bring your partner for a couples workout session! Special 20% discount on couple memberships this February.',
    createdAt: '2026-02-01T09:00:00',
    isPublished: false,
    createdBy: 'John Doe',
  },
];

// Chart Data
export const memberGrowthData = [
  { month: 'Aug', members: 420 },
  { month: 'Sep', members: 485 },
  { month: 'Oct', members: 540 },
  { month: 'Nov', members: 615 },
  { month: 'Dec', members: 690 },
  { month: 'Jan', members: 750 },
  { month: 'Feb', members: 830 },
];

export const gymsByStatusData = [
  { name: 'Active', value: 3, color: '#10b981' },
  { name: 'Trial', value: 1, color: '#f59e0b' },
  { name: 'Suspended', value: 1, color: '#ef4444' },
];

export const attendanceTrendData = [
  { date: 'Feb 1', count: 142 },
  { date: 'Feb 2', count: 156 },
  { date: 'Feb 3', count: 138 },
  { date: 'Feb 4', count: 165 },
  { date: 'Feb 5', count: 178 },
  { date: 'Feb 6', count: 152 },
  { date: 'Feb 7', count: 145 },
];

export const revenueData = [
  { month: 'Sep', revenue: 23500 },
  { month: 'Oct', revenue: 24200 },
  { month: 'Nov', revenue: 25100 },
  { month: 'Dec', revenue: 24800 },
  { month: 'Jan', revenue: 26500 },
  { month: 'Feb', revenue: 24500 },
];
