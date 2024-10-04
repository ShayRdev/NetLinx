import sendRequest from "./send-request";
const BASE_URL = '/api/comments';

// Function to get comments for a specific post
export async function getComments(postId) {
  return sendRequest(`${BASE_URL}/post/${postId}`); // Use the correct route
}

export async function getCommentsByPostId(postId) {
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/comments/post/${postId}`, { // Correct URL
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Error fetching comments:', errorResponse);
        throw new Error('Failed to fetch comments');
    }
    return await response.json();
}

export async function addComment(postId, commentData) {
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ postId, content: commentData }), // Use 'content' here
    });

    if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Error response:', errorResponse);
        throw new Error('Failed to add comment');
    }
    return await response.json();
}

// Function to delete a comment by its ID
export async function deleteComment(commentId) {
  return sendRequest(`${BASE_URL}/${commentId}`, 'DELETE');
}
