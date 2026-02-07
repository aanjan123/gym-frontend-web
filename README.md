# GymSaaS - Multi-Gym Management Platform

A comprehensive SaaS platform for managing multiple gyms with role-based access for Super Admins and Gym Owners.

## 🚀 Features

### Super Admin Features
- **Dashboard**: View platform-wide KPIs (total gyms, active gyms, members, attendance)
- **Create Gym**: Register new gyms with owner details and subscription plans
- **Manage Gyms**: View, filter, suspend, and activate gyms

### Gym Owner Features
- **Dashboard**: View gym performance metrics and trends
- **Members Management**: Add, edit, search, and filter members
- **Attendance Tracking**: QR scanner interface and manual check-in
- **Payment Management**: Track member payments and dues
- **Announcements**: Create and publish announcements for members

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Charts**: Recharts
- **Icons**: Lucide React
- **Styling**: Custom CSS with CSS Variables

## 📁 Project Structure

```
src/
├── app/                    # Redux store configuration
│   ├── store.ts
│   └── hooks.ts
│
├── features/               # Redux slices
│   ├── auth/
│   │   └── authSlice.ts
│   ├── gyms/
│   │   └── gymsSlice.ts
│   ├── members/
│   │   └── membersSlice.ts
│   └── dashboard/
│       └── dashboardSlice.ts
│
├── layouts/               # Layout wrappers
│   ├── AdminLayout.tsx
│   ├── OwnerLayout.tsx
│   └── Layout.css
│
├── pages/                 # Page components
│   ├── auth/
│   │   ├── SuperAdminLogin.tsx
│   │   ├── OwnerLogin.tsx
│   │   └── Auth.css
│   ├── admin/
│   │   ├── Dashboard.tsx
│   │   ├── ManageGyms.tsx
│   │   ├── CreateGym.tsx
│   │   └── Dashboard.css
│   └── owner/
│       ├── Dashboard.tsx
│       ├── Members.tsx
│       ├── Attendance.tsx
│       ├── Payments.tsx
│       └── Announcements.tsx
│
├── components/            # Reusable components
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   └── Table.tsx
│   └── layout/
│       ├── Sidebar.tsx
│       └── Topbar.tsx
│
├── routes/               # Route protection
│   └── ProtectedRoute.tsx
│
├── data/                 # Dummy data
│   └── dummyData.ts
│
├── App.tsx               # Main app component
├── main.tsx              # Entry point
└── index.css             # Global styles
```

## 🎨 Design System

### Color Palette
- **Primary**: #2563eb (Blue)
- **Success**: #10b981 (Green)
- **Warning**: #f59e0b (Orange)
- **Error**: #ef4444 (Red)
- **Neutral**: Grayscale from #fafafa to #171717

### Components
- Buttons (Primary, Secondary, Danger, Ghost)
- Cards with headers and content sections
- Tables with responsive design
- Modals with different sizes
- Status badges
- Form inputs with validation states

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 769px - 1024px
- **Desktop**: > 1024px

## 🔐 Authentication

### Demo Credentials

**Super Admin:**
- Email: `admin@gymsaas.com`
- Password: `admin123`

**Gym Owner:**
- Gym ID: `gym-001`
- Email: `john@fitzone.com`
- Password: `owner123`

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. Clone the repository:
```bash
cd gym-saas-platform
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 📱 Mobile Responsiveness

The application is fully responsive and provides a mobile-app-like experience on smaller screens:

- **Mobile View**: 
  - Collapsible sidebar with overlay
  - Simplified tables showing only key columns
  - Full-width forms
  - Touch-optimized buttons and inputs
  
- **Tablet View**:
  - Adjusted grid layouts
  - Optimized spacing
  - Maintained functionality

## 🎯 Key Features Explained

### Role-Based Access Control
- Super Admins can only access `/admin/*` routes
- Gym Owners can only access `/owner/*` routes
- Automatic redirect if unauthorized

### Data Flow
1. **Redux Store**: Centralized state management
2. **Slices**: Separate concerns (auth, gyms, members, dashboard)
3. **Actions**: Type-safe action creators
4. **Selectors**: Custom hooks for accessing state

### Dashboard Analytics
- **Super Admin**: Platform-wide metrics, gym status distribution, member growth
- **Gym Owner**: Gym-specific metrics, attendance trends, revenue tracking

### Member Management
- Full CRUD operations
- Search and filter functionality
- Status tracking (Active, Inactive, Suspended)
- Payment status monitoring

### Attendance System
- QR scanner interface (UI mock)
- Manual check-in option
- Real-time attendance tracking
- Historical records

## 🔄 State Management

### Redux Slices

**authSlice**
- User authentication
- Role management
- Login/logout actions

**gymsSlice**
- Gym CRUD operations
- Status filters
- Search functionality

**membersSlice**
- Member management
- Payment tracking
- Filter and search

**dashboardSlice**
- KPI statistics
- Attendance records
- Announcements

## 🎨 UI Components

### Button
```tsx
<Button variant="primary" size="md" loading={false}>
  Click Me
</Button>
```

### Card
```tsx
<Card>
  <CardHeader title="Title" subtitle="Subtitle" />
  <CardContent>Content here</CardContent>
</Card>
```

### Table
```tsx
<Table data={data} columns={columns} emptyMessage="No data" />
```

### Modal
```tsx
<Modal isOpen={open} onClose={handleClose} title="Modal Title">
  Content
</Modal>
```

## 📊 Charts & Visualizations

Using Recharts library:
- Line charts for trends
- Bar charts for comparisons
- Pie charts for distributions

## 🔍 Search & Filter

All list pages include:
- Real-time search
- Status filters
- Responsive design

## 💡 Best Practices

- TypeScript for type safety
- Component composition
- Separation of concerns
- Consistent naming conventions
- Mobile-first responsive design
- Accessible UI components

## 🚧 Future Enhancements

- Real QR code scanning
- Email notifications
- Advanced analytics
- Export functionality
- Multi-language support
- Dark mode
- Real-time updates with WebSockets

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using React, TypeScript, and Vite
