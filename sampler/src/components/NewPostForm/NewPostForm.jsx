import React, { useState } from "react"

    const initialState = {
        subject: '',
        body: ''
    }


export default function NewPostForm() {
    

    const handleChange = (evt) => {
        evt.preventDefault();
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
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
