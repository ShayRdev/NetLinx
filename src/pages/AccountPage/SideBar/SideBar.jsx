import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import './SideBar.css'; // Import the updated CSS file for styling

export default function SideBar({ isSidebarOpen, toggleSidebar, user }) {
  // Log user object at the beginning (consider removing in production)
  if (user) {
    console.log('User Object:', user);
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div
      className={`sidebar-container transition-all duration-300 ${
        isSidebarOpen ? 'w-56 md:w-1/4' : 'w-16 md:w-20'
      }`}
    >
      {/* User Profile Section */}
      <div className="flex items-center mb-4">
        {isSidebarOpen && user && (
          <img
            className="h-20 w-20 rounded-full cursor-pointer"
            src={user.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"}
            alt={`${user.name}'s Profile`}
          />
        )}

        {/* User Info */}
        <div className={`text-white ml-4 ${isSidebarOpen ? 'block' : 'hidden'}`}>
          {user && (
            <>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <div className="text-sm font-semibold">Email: {user.email}</div>
              <div className="text-sm font-semibold">Account Created: {formatDate(user.createdAt)}</div>
            </>
          )}
        </div>
      </div>

      <div className="sidebar-icons">
        <FontAwesomeIcon
          icon={isSidebarOpen ? faChevronLeft : faUser}
          className="text-white h-8 w-8 cursor-pointer"
          onClick={toggleSidebar}
          title={isSidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
        />
      </div>
    </div>
  );
}
