import React, { useState, useEffect } from 'react';
import * as postAPI from '../../utilities/posts-api';
import EditPostForm from '../EditPostForm/EditPostForm';

export default function UserPosts({ user, setUpdate, update, darkMode }) {
  const [userPosts, setUserPosts] = useState([]);
  const [updateState, setUpdateState] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPostId, setEditPostId] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  async function fetchUserPosts() {
    try {
      const posts = await postAPI.getPostsByUser(user._id);
      posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setUserPosts(posts);
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  }

  useEffect(() => {
    fetchUserPosts();
    setUpdate(false);
  }, [update, updateState]);

  async function handleDelete(id) {
    await postAPI.deletePost(id);
    setUpdate(true);
  }

  async function handleEdit(id) {
    setEditPostId(id);
    setIsModalOpen(true);
  }

  function toggleDropdown(id) {
    setDropdownOpen(dropdownOpen === id ? null : id);
  }

  useEffect(() => {
    fetchUserPosts();
  }, [darkMode]); // Ensure component updates when darkMode changes

  return (
    <div className={`max-w-md mx-auto rounded-xl overflow-hidden md:max-w-2xl ${darkMode ? 'text-white' : 'text-gray-800'}`}>
      {userPosts.map((post) => (
        <div 
          key={post._id} 
          className={`rounded-lg shadow-md my-4 p-4 pb-10 ${!darkMode ? 'bg-white' : ''}`} 
          style={darkMode ? { backgroundColor: '#2e2d2d' } : {}}
          
        >
          
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                alt=""
              />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium">{post.username}</h3>
              <p className="text-sm font-medium text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
              <div className='border-solid w-full'></div>
            </div>
            {user._id === post.user && (
              <div className="ml-auto relative">
                <button
                  className={`inline-flex items-center justify-center p-2 border border-transparent rounded-md shadow-sm text-sm font-medium ${darkMode ? 'text-white bg-gray-600 hover:bg-gray-700' : 'text-gray-600 bg-gray-100 hover:bg-gray-200'} focus:outline-none`}
                  onClick={() => toggleDropdown(post._id)}
                >
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 5h14v2H3V5zM3 10h14v2H3v-2zM3 15h14v2H3v-2z" clipRule="evenodd" />
                  </svg>
                </button>
                {dropdownOpen === post._id && (
                  <div className={`absolute right-0 mt-2 w-48 ${darkMode ? 'bg-gray-700' : 'bg-white'} border border-gray-200 rounded-md shadow-lg z-10`}>
                    <button
                      className={`block w-full px-4 py-2 text-left text-sm ${darkMode ? 'text-white' : 'text-gray-700'} hover:bg-gray-100`}
                      onClick={() => handleEdit(post._id)}
                    >
                      Edit
                    </button>
                    <button
                      className={`block w-full px-4 py-2 text-left text-sm ${darkMode ? 'text-white' : 'text-gray-700'} hover:bg-gray-100`}
                      onClick={() => handleDelete(post._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-3">
            <h3 className="text-xl mb-2">{post.subject}</h3>
            <p className="text-sm mb-2">{post.body}</p>
          </div>
        </div>
      ))}
      {isModalOpen && (
        <EditPostForm
          id={editPostId}
          updateState={updateState}
          setUpdateState={setUpdateState}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
}
