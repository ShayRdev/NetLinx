import { useState } from 'react'
import './AuthPage.css'
import React from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import SignUpForm from '../../components/SignUpForm/SignUpForm'

export default function Authpage({setUser}) {
  return (
    <main> 
    <div>Authpage</div>
    <SignUpForm  setUser={setUser}/>
    </main>
  )
}
