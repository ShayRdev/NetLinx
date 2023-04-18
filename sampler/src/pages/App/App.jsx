import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthPage from '../AuthPage/Authpage';
import NavBar from '../../components/NavBar/NavBar';

export default function App() {
  const [user, setUser] = useState(null)

  return (
    <main className="App">
      {user ?
        <>
          <NavBar />
        
        </>
        :
        <AuthPage setUser={setUser} />
      }
      App bro
    </main>
  )
}