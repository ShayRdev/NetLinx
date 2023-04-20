import React, { useState } from 'react'
import NewPostForm from '../../components/NewPostForm/NewPostForm'
import PostsList from '../../components/PostsList/PostsList'
import { getUser } from '../../utilities/users-service'

export default function HomePage() {
  const [user, setUser] = useState(getUser());
  return (
    <>
    <div>
      <h1>Sampler</h1>
      <NewPostForm />
      <PostsList user={user} setUser={setUser}/>
      <div>hello, </div>
    </div>
    </>
  )
}
