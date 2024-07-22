import React from 'react';
import UserPosts from '../../components/UserPosts/UserPosts';

export default function AccountPage({ user, update, setUpdate, darkMode }) {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">

      {/* Sidebar */}
      <div className="md:w-1/4 bg-white shadow-lg p-6 flex flex-col items-center justify-center">
        {/* User Profile Image */}
        <img
          className="h-20 w-20 rounded-full mb-4"
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
          alt="User Profile"
        />
        
        {/* User Info */}
        <div className="text-center text-gray-800">
          <h2 className="text-2xl font-bold mb-2">User Info</h2>
          <div className="text-lg font-semibold mb-2">Username:</div>
          <div className="text-xl mb-2">{user.name}</div>
          <div className="text-lg font-semibold mb-2">Email:</div>
          <div className="text-xl mb-2">{user.email}</div>
          <div className="text-lg font-semibold mb-2">Account Created:</div>
          <div className="text-xl mb-4">{formatDate(user.createdAt)}</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto" style={{ 
        backgroundColor: '#f0f0f0', /* Pearl white background color */
        backgroundImage: "url('/images/Gotham.jpeg')",
        backgroundRepeat: "repeat"
      }}>
        <div className="p-6 pt-20"> {/* Reduced top padding */}
          {/* Posts Section */}
          <h2 className="p-2 text-3xl font-bold mb-2 text-center text-white">Posts</h2> {/* Centered and adjusted text color */}
          <UserPosts user={user} setUpdate={setUpdate} update={update} darkMode={darkMode} />
        </div>
      </div>
      
    </div>
  );
}