import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'

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