import React, { useState, useEffect } from 'react';
import * as commentAPI from '../../utilities/comments-api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export default function Comments({ postId, user, darkMode }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchComments() {
      try {
        const fetchedComments = await commentAPI.getCommentsByPostId(postId);
        setComments(fetchedComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setError('Failed to load comments.');
      } finally {
        setLoading(false);
      }
    }
    fetchComments();
  }, [postId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const addedComment = await commentAPI.addComment(postId, newComment);
      setComments((prev) => [...prev, addedComment]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
      setError('Failed to add comment.');
    }
  };

  return (
    <div className={`max-w-md mx-auto md:max-w-2xl ${darkMode ? 'text-white' : 'text-gray-800'}`}>
      <div className={`my-4 p-4 ${darkMode ? 'bg-[#2e2d2d]' : 'bg-white'}`}>
        {loading ? (
          <p className="text-gray-500">Loading comments...</p>
        ) : (
          <>
            <ul className="comments-list">
              {comments.map(comment => (
                <li key={comment._id} className={`flex items-start mb-1 ${darkMode ? 'bg-[#2e2d2d] text-white' : 'bg-white text-gray-800'} p-1`}>
                  <img
                    src={comment.user.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"}
                    alt={`${comment.user.name}'s profile`}
                    className="h-6 w-6 rounded-full mr-2"
                  />
                  <div className={`flex-1`}>
                    <p className="text-sm font-normal">{comment.user.name}</p>
                    <p className="text-xs text-gray-400">{comment.content}</p>
                  </div>
                  <span className="text-xs text-gray-500 ml-2">{new Date(comment.createdAt).toLocaleTimeString()}</span>
                </li>
              ))}
            </ul>
            <form onSubmit={handleAddComment} className={`flex items-center mt-4 -t pt-2 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
              <img
                src={user.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"}
                alt="Your profile"
                className="h-8 w-8 rounded-full mr-2"
              />
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                required
                className={`flex-1 p-2 bg-transparent border-b ${darkMode ? 'text-white border-gray-600' : 'text-gray-800 border-gray-300'} rounded`}
              />
              <button type="submit" className="ml-2 p-1 rounded-full bg-blue-500 hover:bg-blue-600">
                <FontAwesomeIcon icon={faPaperPlane} className="text-white" />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
