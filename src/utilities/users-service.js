import * as usersAPI from './users-api';

export async function signUp(userData) {
  const response = await usersAPI.signUp(userData);
  const token = response.token; // Extract the token from the response
  localStorage.setItem('token', token); // Store only the token string
  return getUser();
}
export function getToken() {
  const token = localStorage.getItem('token');
  return token || null; // No need to parse it since it's a string
}

  
export function getUser() {
  const token = getToken();
  if (!token) return null; // Handle cases where there is no token
  try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.user; // Access the user info directly
  } catch (error) {
      console.error('Error decoding token:', error);
      localStorage.removeItem('token'); // Clear any invalid token
      return null;
  }
}

  export function logOut() {
    localStorage.removeItem('token')
  }

  export async function login(credentials) {
    // Delegate the AJAX request to the users-api.js
    // module.
    const token = await usersAPI.login(credentials);
    localStorage.setItem('token', token);
    return getUser();
  }
  
  