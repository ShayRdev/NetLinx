import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage'
import NavBar from '../../components/NavBar/NavBar';
import HomePage from '../HomePage/HomePage';


export default function App() {
  const [user, setUser] = useState(getUser());
  const [isModalOpen, setIsModalOpen] = useState(false); // Add state for modal visibility


  return (
    <main className="bg-cover bg-center bg-fixed">
      {user ?
        <div>
            <NavBar setUser={setUser}  user={user} setIsModalOpen={setIsModalOpen}/>
            <div>
            <Routes>
              < Route path="/home" element={<HomePage setUser={setUser} user={user} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>} />
              < Route path="/*" element={<Navigate to='/home' />} />
            </Routes>
            </div>
        </div>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  )
}