import React from 'react'
import { Link } from 'react-router-dom'
import * as userService from '../../utilities/users-service'

export default function NavBar({user, setUser}) {

  function handleLogOut(){
    userService.logOut()
    setUser(null)
  }

  return (
    <nav>
    <div>hello, {user.name}</div>
    <Link to='/home'>Home</Link>
    &nbsp;  &nbsp;
    <Link to='' onClick={handleLogOut}>Log out</Link>
    </nav>
  )
}
