import React, { useState } from 'react';
import SideBar from './SideBar/SideBar'; 
import UserPosts from '../../components/UserPosts/UserPosts';
import FileUpload from '../../components/FileUpload/FileUpload';
import './AccountPage.css';

export default function AccountPage({ user, update, setUpdate, darkMode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const [userState, setUserState] = useState(user); // Local state for user

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleUserUpdate = (newProfilePicture) => {
    const updatedUser = { ...userState, profilePicture: newProfilePicture };
    setUserState(updatedUser); // Update the local user state
    setUpdate(true); // Trigger update if necessary
  };

  return (
    <div className="flex h-screen pt-20">
      <SideBar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        user={userState}
        userId={userState._id} 
        onUserUpdate={handleUserUpdate}
      />

      <div className="flex-1 overflow-y-auto" style={{ backgroundColor: '#212021' }}>
        <div className="p-6 pt-20">
          <h2 className="p-2 text-3xl font-bold mb-2 text-center text-white">Posts</h2>
          <UserPosts user={userState} setUpdate={setUpdate} update={update} darkMode={darkMode} />

          <div className="mt-6">
            <h3 className="text-xl text-white">Upload Profile Picture</h3>
            <FileUpload userId={userState._id} onUserUpdate={handleUserUpdate} />
          </div>
        </div>
      </div>
    </div>
  );
}
