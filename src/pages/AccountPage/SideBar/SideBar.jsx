import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns'; // Importing format from date-fns

// Define the formatDate function using date-fns
const formatDate = (date) => {
  return format(new Date(date), 'PP'); // 'PP' is a common pattern for displaying dates (like Jan 1, 2024)
};

const SideBar = ({ isOpen, toggleSidebar, user }) => {
  return (
    <div
      className={`transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} bg-white shadow-lg flex flex-col`}
      style={{
        backgroundColor: '#2e2d2d',
        height: '100%',
      }}
    >
      {/* User Profile Section */}
      <div className="flex items-center mb-4">
        {isOpen && (
          <img
            className="h-20 w-20 rounded-full cursor-pointer"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
            alt="User Profile"
          />
        )}
        {/* User Info */}
        <div className={`text-white ml-4 ${isOpen ? 'block' : 'hidden'}`}>
          <h2 className="text-xl font-bold">{user.name}</h2>
          <div className="text-sm font-semibold">Email: {user.email}</div>
          <div className="text-sm font-semibold">Account Created: {formatDate(user.createdAt)}</div>
        </div>
      </div>

      {/* Toggle Icon */}
      <div className="flex justify-center mb-4">
        <FontAwesomeIcon
          icon={isOpen ? faChevronLeft : faUser}
          className="text-white h-10 w-10 cursor-pointer"
          onClick={toggleSidebar}
          title={isOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
        />
      </div>
    </div>
  );
};

export default SideBar;
