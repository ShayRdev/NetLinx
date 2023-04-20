import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage'
import NavBar from '../../components/NavBar/NavBar';
import HomePage from '../HomePage/HomePage';


export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      {user ?
        <>
            <NavBar setUser={setUser} user={user} />
            <Routes>
              < Route path="/home" element={<HomePage setUser={setUser} user={user} />} />
              < Route path="/*" to="/home" element={<HomePage />}></Route>
            </Routes>
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  )
}

