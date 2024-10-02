import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import UserPosts from '../../components/UserPosts/UserPosts';
import './AccountPage.css';

export default function AccountPage({ user, update, setUpdate, darkMode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar open by default

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen pt-20">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? 'md:w-1/4 w-56' : 'md:w-20 w-16'
        } bg-white shadow-lg p-4 flex flex-col justify-between`}
        style={{
          backgroundColor: '#2e2d2d',
          height: '100%',
        }}
      >
        {/* User Profile Section */}
        <div className="flex items-center mb-4">
          {isSidebarOpen && (
            <img
              className="h-20 w-20 rounded-full cursor-pointer"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
              alt="User Profile"
            />
          )}

          {/* User Info */}
          <div className={`text-white ml-4 ${isSidebarOpen ? 'block' : 'hidden'}`}>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <div className="text-sm font-semibold">Email: {user.email}</div>
            <div className="text-sm font-semibold">Account Created: {formatDate(user.createdAt)}</div>
          </div>
        </div>

        {/* Icon for toggling sidebar */}
        <div className="flex justify-center mb-4">
          <FontAwesomeIcon
            icon={isSidebarOpen ? faChevronLeft : faUser}
            className="text-white h-10 w-10 cursor-pointer"
            onClick={toggleSidebar}
            title={isSidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
          />
        </div>
      </div>

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
        </div>
      </div>
    </div>
  );
}
