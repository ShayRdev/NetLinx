import React, { useEffect, useState } from "react"
import * as postAPI from '../../utilities/posts-api'
import './NewPostForm.css'

    const initialState = {
        subject: '',
        body: '',
    }


export default function NewPostForm({setUpdate, user}) {
    const [postData, setPostData] = useState(initialState);
    const [error, setError] = useState('')

    function handleChange(evt) {
       const inputData = {...postData, [evt.target.name]: evt.target.value}
       setPostData(inputData);
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            
        const newPost = await postAPI.createPost(postData, user)
            setUpdate(true)
            setPostData(initialState);
            } catch (error) {
            console.log('Error')  
            }
    }


  return (
    <div>
        <form className="new-post-form" onSubmit={handleSubmit}>
            <div>
            <label>Subject</label>
            <input
                type='text'
                name='subject'
                onChange={handleChange}
                value={postData.subject}
            />
            </div>
            <div>
            <label>Body</label>
            <input 
                type='text'
                name='body'
                onChange={handleChange}
                value={postData.body}
            />
            </div>
            <button type="submit" >Post</button>
        </form>
        <p className="error-message">&nbsp;{error}</p>
    </div>
  )
}
