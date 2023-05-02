import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage'
import NavBar from '../../components/NavBar/NavBar';
import HomePage from '../HomePage/HomePage';


export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="bg-cover bg-center bg-fixed">
      {user ?
        <div>
            <NavBar setUser={setUser} user={user}/>
            <div className='pt-20'>
            <Routes>
              < Route path="/home" element={<HomePage setUser={setUser} user={user} />} />
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