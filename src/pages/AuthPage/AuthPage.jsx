import { useState } from 'react'
import React from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import SignUpForm from '../../components/SignUpForm/SignUpForm'



export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <main className=" flex flex-col items-ce bg-cover bg-center bg-fixed h-screen" style={{ backgroundImage: "url('/images/AuthPhoto.jpeg')" }}>
  <div className="flex-col items-center justify-center h-full">
    <button className="bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50  " onClick={() => setShowLogin(!showLogin)}>
      {showLogin ? 'LOG IN' : 'SIGN UP'}
    </button>
  </div>
  <div className='flex-col'>
    {showLogin ? <SignUpForm setUser={setUser} /> : <LoginForm setUser={setUser} />}
  </div>
</main>
  )
}
