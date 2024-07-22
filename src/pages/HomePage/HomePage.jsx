import React, { useState } from 'react'
import NewPostForm from '../../components/NewPostForm/NewPostForm'
import PostsList from '../../components/PostsList/PostsList'
import { getUser } from '../../utilities/users-service'


export default function HomePage({isModalOpen, setIsModalOpen}) {
  const [user, setUser] = useState(getUser());
  const [update, setUpdate] = useState(false);

  return (
    <>
    <div className="bg-cover" style={{ backgroundImage: "url('/images/Gotham.jpeg')" }}>
      {isModalOpen && <NewPostForm user={user} setUser={setUser} setUpdate={setUpdate} setIsModalOpen={setIsModalOpen} />}
      <PostsList update={update} setUpdate={setUpdate} user={user} setUser={setUser}/>
    </div>
    </>
  )
}


