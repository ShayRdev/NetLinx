import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage'
import NavBar from '../../components/NavBar/NavBar';

export default function App() {
  const [user, setUser] = useState(getUser());


  return (
    <main className="App">
      {user ?
        <>
            <NavBar setUser={setUser} user={user} />
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  )
}

