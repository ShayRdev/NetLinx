import React, { useState } from 'react';
import SideBar from './SideBar/SideBar'; // Import the SideBar component
import UserPosts from '../../components/UserPosts/UserPosts';
import ProfilePictureUpload from '../../components/ProfilePictureUpload/ProfilePictureUpload'; // Import the upload component
import './AccountPage.css';

export default function AccountPage({ user, update, setUpdate, darkMode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar open by default

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen pt-20">
      {/* Sidebar */}
      <SideBar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        user={user}
      />

      {/* Main Content */}
      <div
        className="flex-1 overflow-y-auto"
        style={{
          backgroundColor: '#212021',
          backgroundRepeat: 'repeat',
        }}
      >
        <div className="p-6 pt-20">
          <h2 className="p-2 text-3xl font-bold mb-2 text-center text-white">Posts</h2>
          <UserPosts user={user} setUpdate={setUpdate} update={update} darkMode={darkMode} />

          {/* Profile Picture Upload Section */}
          <div className="mt-6">
            <h3 className="text-xl text-white">Upload Profile Picture</h3>
            <ProfilePictureUpload currentUser={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
