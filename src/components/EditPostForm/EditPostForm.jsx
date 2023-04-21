import React, { useState, useEffect } from 'react'
import * as postAPI from '../../utilities/posts-api'
import PostsList from '../PostsList/PostsList';

const editedState = {
    subject: '',
    body: '',
}

export default function EditPostForm({id, setUpdateState, updateState, handleEdit}) {

  const [postData, setPostData] = useState(editedState);
  const [error, setError] = useState('');

  function handleChange(evt) {
    const inputEditedData = {...postData, [evt.target.name]: evt.target.value};
    setPostData(inputEditedData);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
    await postAPI.updatePost(id, postData);
    setPostData(postData)
    setUpdateState(!updateState);
    } catch (error) {
      setError('Error editing post');
    }
  }

  return (
    <div>
      <form className="edit-post-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            onChange={handleChange}
            value={postData.subject}
          />
        </div>
        <div>
        <label>Body</label>
          <input
            id="body"
            name="body"
            onChange={handleChange}
            value={postData.body}
        />
        </div>
        <button type="submit">Save Changes</button>
      </form>
      {error && <p className="error-message">&nbsp;{error}</p>}
    </div>
  )
}