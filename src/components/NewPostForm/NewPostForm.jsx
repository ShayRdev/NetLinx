import React, { useEffect, useState } from "react"
import * as postAPI from '../../utilities/posts-api'
import { Textarea } from "@material-tailwind/react"


export default function NewPostForm({setUpdate, user}) {
    
    const initialState = {
        subject: '',
        body: '',
        username: user.name
    }


    const [postData, setPostData] = useState(initialState);
    const [error, setError] = useState('')

    function handleChange(evt) {
       const inputData = {...postData, [evt.target.name]: evt.target.value}
       setPostData(inputData);
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            
        await postAPI.createPost(postData, user)
            setUpdate(true)
            setPostData(initialState);
            } catch (error) {
            console.log('Error')  
            }
    }

  return (
    <div>
        <form className="new-post-form" onSubmit={handleSubmit}>
            <div className="subject">
            <h4>New Post</h4>
            <label></label>
            <input className="subject-input-field"
                type='text'
                placeholder="Subject"
                name='subject'
                onChange={handleChange}
                value={postData.subject}
            />
            </div>
            <div className="body">
            <Textarea 
                label="Message" 
                type='text'
                placeholder="Write a post! "
                name='body'
                onChange={handleChange}
                value={postData.body}
            />




            



            </div>
            <button className="post-button" type="submit" >Post</button>
        </form>
        <p className="error-message">&nbsp;{error}</p>
    </div>
  )
}
