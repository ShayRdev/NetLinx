import React, { useState } from 'react'
import NewPostForm from '../../components/NewPostForm/NewPostForm'
import PostsList from '../../components/PostsList/PostsList'
import { getUser } from '../../utilities/users-service'
import EditPostForm from '../../components/EditPostForm/EditPostForm';

export default function HomePage() {
  const [user, setUser] = useState(getUser());
  const [update, setUpdate] = useState(false);

  return (
    <>
    <div>
      <h1>Sampler</h1>
      <NewPostForm user={user} setUser={setUser} setUpdate={setUpdate}/>
      <PostsList update={update} setUpdate={setUpdate} user={user} setUser={setUser}/>
      <div>hello, </div>
    </div>
    </>
  )
}
