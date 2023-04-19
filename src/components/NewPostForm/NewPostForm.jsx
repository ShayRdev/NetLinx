import React, { useState } from "react"
import * as postAPI from '../../utilities/posts-api'


    const initialState = {
        subject: '',
        body: ''
    }


export default function NewPostForm() {
    const [postData, setPostData] = useState(initialState);
    

    const handleChange = (evt) => {
        evt.preventDefault();
        setPostData({...postData, [evt.target.name]: evt.target.value})
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const newPost = await postAPI.createPost(postData)
        } catch {
          setError('Error')  
        }
            console.log(newPost)
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
            />
            </div>
            <button type="submit" onSubmit={handleSubmit}>Post</button>
        </form>
    </div>
  )
}
