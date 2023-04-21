import React, { useState, useEffect } from 'react'
import * as postAPI from '../../utilities/posts-api'
import EditPostForm from '../EditPostForm/EditPostForm'
import './PostsList.css'


export default function PostsList({user, setUpdate, update}) {
    const [allPosts, setAllPosts] = useState([])
    const [updateState, setUpdateState] = useState(true)

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
    },[update, updateState]);


    async function handleDelete(id) {
       await postAPI.deletePost(id);
       setUpdate(true)
    }

    async function handleEdit(id) {
        await postAPI.updatePost(id);   
        setUpdate(true)
    }


  return (
    <div className='post-container'>
        {allPosts.map(post => (
            <div className='post'  key={post._id}>
                <h3 className='user'>{post.username}</h3>
                <h2 className='subject'>{post.subject}</h2>
                <p className='body'>{post.body}</p>
                { user._id === post.user && <button onClick={() => handleDelete(post._id)}>delete</button> }
                { user._id === post.user && <EditPostForm id={post._id} updateState={updateState} setUpdateState={setUpdateState} handleEdit={handleEdit} /> } 
            </div>
        ))}
    </div>
  )
}
