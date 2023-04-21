import sendRequest from "./send-request";
const BASE_URL ='/api/posts'


export function createPost(postData, user) {
    return sendRequest(`${BASE_URL}/posts`, 'POST', {postData, user});
}

export function getAllPosts() {
    return sendRequest(BASE_URL);
}

export function deletePost(id, ) {
    return sendRequest(`${BASE_URL}/${id}`, 'DELETE');
  }

  export function updatePost(id, postData) {
    return sendRequest(`${BASE_URL}/${id}`, 'PUT', postData);
}