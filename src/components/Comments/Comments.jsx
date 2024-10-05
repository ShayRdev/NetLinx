import React, { useState, useEffect } from 'react';
import * as commentAPI from '../../utilities/comments-api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faComment } from '@fortawesome/free-solid-svg-icons';
import './Comments.css'; // Import the CSS file

export default function Comments({ postId, user, darkMode }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function fetchComments() {
      try {
        const fetchedComments = await commentAPI.getCommentsByPostId(postId);
        setComments(fetchedComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
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
    }
  };

  const adjustHeight = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className={`max-w-md mx-auto md:max-w-2xl ${darkMode ? 'text-white' : 'text-gray-800'}`}>
      <div className={`my-4 ${darkMode ? 'bg-[#2e2d2d]' : 'bg-white'} flex items-center p-2`} onClick={() => setModalOpen(true)}>
        <FontAwesomeIcon icon={faComment} className="mr-2 cursor-pointer" />
        <span className="cursor-pointer">{comments.length}</span>
      </div>

      <div className={`my-4 ${darkMode ? 'bg-[#2e2d2d]' : 'bg-white'}`}>
        {loading ? (
          <p className="text-gray-500">Loading comments...</p>
        ) : (
          <>
            <ul className="comments-list">
              {comments.slice(0, 3).map(comment => (
                <li key={comment._id} className={`flex items-start mb-0.5 ${darkMode ? 'bg-[#2e2d2d] text-white' : 'bg-white text-gray-800'} p-1`}>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <p className="text-xs font-normal mr-2">{comment.user.name}</p>
                      <span className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleTimeString()}</span>
                    </div>
                    <p className="text-xs text-gray-400">{comment.content}</p>
                  </div>
                </li>
              ))}
            </ul>

            {comments.length > 3 && (
              <button
                onClick={() => setModalOpen(true)}
                className="text-white text-sm mt-2 mx-auto block"
              >
                Show all comments
              </button>
            )}
          </>
        )}
      </div>

      {/* Modal for All Comments */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`rounded-lg shadow-lg overflow-y-auto ${darkMode ? 'bg-[#2e2d2d] text-white' : 'bg-white text-gray-800'}`} style={{ maxHeight: '80%', width: '47%', padding: '20px' }}>
            <h2 className="text-lg font-bold mb-4">All Comments</h2>
            <ul className="comments-list max-h-60 overflow-y-scroll">
              {comments.map(comment => (
                <li key={comment._id} className={`flex items-start mb-2 p-2 ${darkMode ? 'bg-[#2e2d2d] text-white' : 'bg-white text-gray-800'}`}>
                  <img
                    src={comment.user.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"}
                    alt={`${comment.user.name}'s profile`}
                    className="h-6 w-6 rounded-full mr-2"
                  />
                  <div className={`flex-1`}>
                    <div className="flex items-center">
                      <p className="text-sm font-normal mr-2">{comment.user.name}</p>
                      <span className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleTimeString()}</span>
                    </div>
                    <p className="text-sm text-gray-400">{comment.content}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Comment Form Inside Modal */}
            <form onSubmit={handleAddComment} className={`flex items-center mt-4 pt-2 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
              <img
                src={user.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"}
                alt="Your profile"
                className="h-8 w-8 rounded-full mr-2"
              />
              <textarea
                value={newComment}
                onChange={(e) => {
                  setNewComment(e.target.value);
                  adjustHeight(e);
                }}
                placeholder="Add a comment..."
                required
                rows={1}
                className={`flex-1 p-2 bg-transparent border-b resize-none ${darkMode ? 'text-white border-gray-600' : 'text-gray-800 border-gray-300'} rounded`}
                style={{ minHeight: '40px', maxHeight: '100px', overflow: 'hidden' }}
              />
              <button type="submit" className="ml-2 p-1 rounded-full bg-grey hover:bg-blue-600">
                <FontAwesomeIcon icon={faPaperPlane} className="text-white" />
              </button>
            </form>

            <button onClick={() => setModalOpen(false)} className="mt-4 text-white">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
