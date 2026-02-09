// import React, { useState, useEffect } from 'react';
// import { Megaphone, Plus } from 'lucide-react';
// import { useAppDispatch, useAppSelector } from '../../app/hooks';
// import { addAnnouncement, toggleAnnouncementPublish, setAnnouncements } from '../../features/dashboard/dashboardSlice';
// import { Card, CardHeader, CardContent } from '../../components/ui/Card';
// import { Button } from '../../components/ui/Button';
// import { Modal } from '../../components/ui/Modal';
// import { announcements as dummyAnnouncements } from '../../data/dummyData';
// import '../admin/Dashboard.css';

// export const Announcements: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const { announcements } = useAppSelector((state) => state.dashboard);
//   const { user } = useAppSelector((state) => state.auth);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [formData, setFormData] = useState({ title: '', message: '' });

//   useEffect(() => {
//     dispatch(setAnnouncements(dummyAnnouncements));
//   }, [dispatch]);

//   const handleAddAnnouncement = (e: React.FormEvent) => {
//     e.preventDefault();
//     const newAnnouncement = {
//       id: `ann-${Date.now()}`,
//       gymId: user?.gymId || 'gym-001',
//       ...formData,
//       createdAt: new Date().toISOString(),
//       isPublished: false,
//       createdBy: user?.name || 'Owner',
//     };
//     dispatch(addAnnouncement(newAnnouncement));
//     setShowAddModal(false);
//     setFormData({ title: '', message: '' });
//   };

//   return (
//     <div className="dashboard">
//       <div className="dashboard-header">
//         <div>
//           <h1 className="page-title">Announcements</h1>
//           <p className="page-subtitle">Communicate with your members</p>
//         </div>
//         <Button onClick={() => setShowAddModal(true)}>
//           <Plus size={18} />
//           New Announcement
//         </Button>
//       </div>

//       <Card>
//         <CardHeader title="All Announcements" />
//         <CardContent>
//           {announcements.length === 0 ? (
//             <div className="empty-state">
//               <div className="empty-state-icon">
//                 <Megaphone size={32} />
//               </div>
//               <h3 className="empty-state-title">No Announcements Yet</h3>
//               <p className="empty-state-description">
//                 Create your first announcement to communicate with members
//               </p>
//               <Button onClick={() => setShowAddModal(true)}>Create Announcement</Button>
//             </div>
//           ) : (
//             <div>
//               {announcements.map((announcement) => (
//                 <div key={announcement.id} className="announcement-item">
//                   <div className="announcement-header">
//                     <div>
//                       <h3 className="announcement-title">{announcement.title}</h3>
//                       <p className="announcement-meta">
//                         {new Date(announcement.createdAt).toLocaleDateString()} by {announcement.createdBy}
//                       </p>
//                     </div>
//                     <span className={`status-badge status-${announcement.isPublished ? 'active' : 'inactive'}`}>
//                       {announcement.isPublished ? 'Published' : 'Draft'}
//                     </span>
//                   </div>
//                   <p className="announcement-message">{announcement.message}</p>
//                   <div className="announcement-actions">
//                     <Button
//                       size="sm"
//                       variant={announcement.isPublished ? 'secondary' : 'primary'}
//                       onClick={() => dispatch(toggleAnnouncementPublish(announcement.id))}
//                     >
//                       {announcement.isPublished ? 'Unpublish' : 'Publish'}
//                     </Button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       <Modal
//         isOpen={showAddModal}
//         onClose={() => setShowAddModal(false)}
//         title="Create Announcement"
//         size="md"
//       >
//         <form onSubmit={handleAddAnnouncement}>
//           <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
//             <div className="form-field">
//               <label htmlFor="title">Title *</label>
//               <input
//                 id="title"
//                 type="text"
//                 required
//                 value={formData.title}
//                 onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                 placeholder="Enter announcement title"
//               />
//             </div>
//             <div className="form-field">
//               <label htmlFor="message">Message *</label>
//               <textarea
//                 id="message"
//                 required
//                 value={formData.message}
//                 onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//                 placeholder="Enter announcement message"
//               />
//             </div>
//           </div>
//           <div className="form-actions">
//             <Button type="button" variant="secondary" onClick={() => setShowAddModal(false)}>
//               Cancel
//             </Button>
//             <Button type="submit">Create Announcement</Button>
//           </div>
//         </form>
//       </Modal>
//     </div>
//   );
// };
