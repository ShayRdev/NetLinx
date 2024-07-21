import React, { useState, useEffect } from 'react';
import * as postAPI from '../../utilities/posts-api';
import { Textarea } from "@material-tailwind/react";

export default function EditPostForm({ id, updateState, setUpdateState, setIsModalOpen}) {
  const [postData, setPostData] = useState({ subject: '', body: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the post data when the component mounts
    async function fetchPost() {
      try {
        const post = await postAPI.getPostById(id);
        setPostData({ subject: post.subject, body: post.body });
      } catch (error) {
        setError('Error fetching post data');
      }
    }
    fetchPost();
  }, [id]);

  function handleChange(evt) {
    const inputEditedData = { ...postData, [evt.target.name]: evt.target.value };
    setPostData(inputEditedData);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await postAPI.updatePost(id, postData);
      setPostData(postData);
      setUpdateState(!updateState);
      setIsModalOpen(false); // Close the modal after submitting
    } catch (error) {
      setError('Error editing post');
    }
  }

  return (
    <div>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div className="bg-white p-6">
              <h4 className="text-2xl font-bold mb-4 text-gray-800">Edit Post</h4>
              <form className="edit-post-form space-y-6" onSubmit={handleSubmit}>
                <div className="subject">
                  <label className="block mb-2 text-sm font-medium text-gray-700">Subject</label>
                  <input
                    className="subject-input-field w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type='text'
                    placeholder="Subject"
                    name='subject'
                    onChange={handleChange}
                    value={postData.subject}
                  />
                </div>
                <div className="body">
                  <Textarea
                    label="Body"
                    name='body'
                    onChange={handleChange}
                    value={postData.body}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    className="cancel-button py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="save-button py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="submit"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
              {error && <p className="error-message text-red-500 mt-4">&nbsp;{error}</p>}
            </div>
          </div>
        </div>
      </div>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div className="bg-white p-6">
              <h4 className="text-2xl font-bold mb-4 text-gray-800">Edit Post</h4>
              <form className="edit-post-form space-y-6" onSubmit={handleSubmit}>
                <div className="subject">
                  <label className="block mb-2 text-sm font-medium text-gray-700">Subject</label>
                  <input
                    className="subject-input-field w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type='text'
                    placeholder="Subject"
                    name='subject'
                    onChange={handleChange}
                    value={postData.subject}
                  />
                </div>
                <div className="body">
                  <Textarea
                    label="Body"
                    name='body'
                    onChange={handleChange}
                    value={postData.body}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    className="cancel-button py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="save-button py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="submit"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
              {error && <p className="error-message text-red-500 mt-4">&nbsp;{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
