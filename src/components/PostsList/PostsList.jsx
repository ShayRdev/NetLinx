import React, { useState, useEffect } from 'react'
import * as postAPI from '../../utilities/posts-api'
import EditPostForm from '../EditPostForm/EditPostForm'
import './PostsList.css'


export default function PostsList({user, setUpdate, update}) {
    const [allPosts, setAllPosts] = useState([])
    const [rerender, setRerender] = useState(true)
    async function getPosts () {
        try {
            const fetchedData = await postAPI.getAllPosts();
            setAllPosts(fetchedData);
        }
        catch (error) {
            console.error(error, 'error for getPost');    
        }
    }

    useEffect(function() {
        getPosts();
        setUpdate(false)
    },[update,]);


    async function handleDelete(id) {
       await postAPI.deletePost(id);
       setUpdate(true)
    }

    async function handleEdit(id) {
        const editedPost = await postAPI.updatePost(id);   
        setAllPosts(allPosts);
    }

  return (
    <div className='post-container'>
        {allPosts.map(post => (
            <div className='post'  key={post._id}>
                <h3 className='user'>{user.name}</h3>
                <h2 className='subject'>{post.subject}</h2>
                <p className='body'>{post.body}</p>
                <button onClick={() => handleDelete(post._id)}>delete</button>
                <EditPostForm id={post._id} handleEdit={handleEdit} />  
            </div>
        ))}
    </div>
  )
}
