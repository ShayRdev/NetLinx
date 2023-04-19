import { useState } from 'react'
import './AuthPage.css'
import React from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import SignUpForm from '../../components/SignUpForm/SignUpForm'

export default function Authpage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <main className='AuthPage'> 
      <div>
      <h3 onClick={() => setShowLogin(!showLogin)}>{showLogin ? 'SIGN UP' : 'LOG IN'}</h3>
      </div>
      {showLogin ? <SignUpForm  setUser={setUser}/> : <LoginForm setUser={setUser} />}
    </main>
  )
}
