import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import HomePage from '../HomePage/HomePage';
import AccountPage from '../AccountPage/AccountPage';
import NewPostForm from '../../components/NewPostForm/NewPostForm';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // State for dark mode

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <main className={`bg-cover bg-center bg-fixed ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      {user ? (
        <>
          <NavBar setUser={setUser} user={user} setIsModalOpen={setIsModalOpen} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          {isModalOpen && (
            <NewPostForm
              user={user}
              setUser={setUser}
              setUpdate={setUpdate}
              setIsModalOpen={setIsModalOpen}
            />
          )}
          <div>
            <Routes>
              <Route
                path="/home"
                element={
                  <HomePage setUser={setUser} user={user} update={update} setUpdate={setUpdate} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} darkMode={darkMode}/>
                }
              />
              <Route
                path="/account"
                element={
                  <AccountPage user={user} update={update} setUpdate={setUpdate} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} darkMode={darkMode}/>
                }
              />
              <Route path="/*" element={<Navigate to="/home" />} />
            </Routes>
          </div>
        </>
      ) : (
        <AuthPage setUser={setUser} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      )}
    </main>
  );
}
