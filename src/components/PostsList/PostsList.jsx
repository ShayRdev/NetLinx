import React, { useState, useEffect } from 'react'
import * as postAPI from '../../utilities/posts-api'
import './PostsList.css'


export default function PostsList({user}) {
    const [allPosts, setAllPosts] = useState([])

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
    }, []);

  return (
    <div className='post-container'>
        {allPosts.map(post => (
            <div className='post' key={post._id}>
                <h3 className='user'>{user.name}</h3>
                <h2 className='subject'>{post.subject}</h2>
                 <p className='body'>{post.body}</p>
            </div>
        ))}
    </div>
  )
}
