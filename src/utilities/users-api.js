import sendRequest from "./send-request";
import { getToken } from './users-service'; // Import your getToken function

const BASE_URL = '/api/users';

// Sign Up function
export function signUp(userData) {
    return sendRequest(BASE_URL, 'POST', userData);
}

// Login function
export function login(credentials) {
    return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

// Upload Profile Picture function
export async function uploadProfilePicture(imageFile) {
  const token = getToken(); // Retrieve the token
  if (!token) throw new Error('User not authenticated');

  const formData = new FormData();
  formData.append('profilePicture', imageFile); // Ensure 'profilePicture' matches the field name in multer

  // Log formData content to check if the file is appended
  for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
  }

  const options = {
      method: 'POST',
      headers: {
          'Authorization': `Bearer ${token}` // Include token for authentication
      },
      body: formData,
  };

  const res = await fetch(`${BASE_URL}/uploadProfilePicture`, options);
  const responseBody = await res.json();
  console.log(responseBody); // Log server response to check for errors

  if (res.ok) {
      return responseBody;
  } else {
      throw new Error(responseBody.message || 'Failed to upload profile picture');
  }
}