import sendRequest from "./send-request";
const BASE_URL ='/api/posts'


export function createPost(postData) {
    return sendRequest(BASE_URL, 'POST', postData);
}

export function getAllPosts() {
    return sendRequest(`${BASE_URL}`);
}

export function deletePost(id) {
    return sendRequest(`${BASE_URL}/${id}`, 'DELETE');
  }