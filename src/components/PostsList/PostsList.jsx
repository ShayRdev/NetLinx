import React, { useState, useEffect } from 'react';
import * as postAPI from '../../utilities/posts-api';
import EditPostForm from '../EditPostForm/EditPostForm';
import Comments from '../Comments/Comments';
import { io } from 'socket.io-client';

const ENDPOINT = "https://sampler.herokuapp.com/";
let socket;

export default function PostsList({ user, setUpdate, update }) {
  const [allPosts, setAllPosts] = useState([]);
  const [updateState, setUpdateState] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPostId, setEditPostId] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  async function getPosts() {
    try {
      const fetchedData = await postAPI.getAllPosts();
      fetchedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setAllPosts(fetchedData);
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  }

  useEffect(() => {
    getPosts();
    setUpdate(false);
  }, [update, updateState]);

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.on('postCreated', (postCreated) => {
      setAllPosts((prevPosts) => [postCreated, ...prevPosts]);
    });

    socket.on('postUpdated', (updatedPost) => {
      setAllPosts((prevPosts) => 
        prevPosts.map(post => post._id === updatedPost._id ? updatedPost : post)
      );
    });

    socket.on('postDeleted', (postId) => {
      setAllPosts((prevPosts) =>
        prevPosts.filter(post => post._id !== postId))
    });

    return () => {
      socket.disconnect();
    }
  }, []);

  async function handleDelete(id) {
    await postAPI.deletePost(id);
    setUpdate(true);
  }

  async function handleEdit(id) {
    setEditPostId(id);
    setIsModalOpen(true);
  }

  function toggleDropdown(id) {
    console.log('Toggling dropdown for post ID:', id);
    setDropdownOpen(dropdownOpen === id ? null : id);
  }

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  return (
    <div className={`pt-24 max-w-md mx-auto ${darkMode ? ' text-white' : 'text-gray-900'} rounded-xl overflow-hidden md:max-w-2xl`}>
      <div className="absolute pt-24 top-0 right-0 m-4">
        <button
          className={`px-3 py-1 rounded-full ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} border border-gray-200 focus:outline-none`}
          onClick={toggleDarkMode}
          style={darkMode ? { backgroundColor: '#2e2d2d' } : {}}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      {allPosts.map((post) => (
        <div 
          key={post._id} 
          className={`rounded-lg shadow-md my-4 p-4 pb-10 ${!darkMode ? 'bg-white' : ''}`} 
          style={darkMode ? { backgroundColor: '#2e2d2d' } : {}}
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src={post.user.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"}
                alt={post.user.username}
              />
            </div>
            <div className="ml-3">
              <h3 className={`text-lg font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{post.username}</h3>
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{new Date(post.createdAt).toLocaleDateString()}</p>
              <div className={`${darkMode ? 'border-gray-600' : 'border-gray-300'} border-solid w-full mt-1`}></div>
            </div>
            {user._id === post.user._id && (
              <div className="ml-auto relative">
                <button
                  className={`inline-flex items-center justify-center p-2 rounded-md text-sm font-medium ${darkMode ? 'text-gray-400 bg-gray-700 hover:bg-gray-600' : 'text-gray-600 bg-gray-100 hover:bg-gray-200'} shadow-sm border border-transparent focus:outline-none`}
                  onClick={() => toggleDropdown(post._id)}
                >
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 5h14v2H3V5zM3 10h14v2H3v-2zM3 15h14v2H3v-2z" clipRule="evenodd" />
                  </svg>
                </button>
                {dropdownOpen === post._id && (
                  <div className={`absolute right-0 mt-2 w-48 ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'} rounded-md shadow-lg z-10`}>
                    <button
                      className={`block w-full px-4 py-2 text-left text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} focus:outline-none`}
                      onClick={() => handleEdit(post._id)}
                    >
                      Edit
                    </button>
                    <button
                      className={`block w-full px-4 py-2 text-left text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} focus:outline-none`}
                      onClick={() => handleDelete(post._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-3 p-0.5">
            <h3 className={`text-xl mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{post.subject}</h3>
            <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>{post.body}</p>
            {/* <img src="https://live.staticflickr.com/2474/3861091786_7775e8579a_c.jpg" alt="" /> */}
          </div>

          {/* Comments Section */}
          <div className="mt-4">
            <Comments 
              postId={post._id} 
              darkMode={darkMode} 
              setUpdate={setUpdate}
              user={user}
            />
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
