import { useState } from 'react';
import * as usersService from '../../utilities/users-service';
import { Label } from 'flowbite-react';
import { TextInput } from 'flowbite-react';
import './LoginForm.css'; // Ensure this path is correct

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await usersService.login(credentials);
      setUser(user);
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  const text = "NetLinx";
  
  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen p-6">
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-5xl gap-8">
        <div className="flex-grow flex items-center justify-center lg:justify-start">
          <div className="falling-shimmering-letters-container">
              <h1 className="text-7xl font-extrabold text-white capitalize falling-shimmering-letters">
                {text.split('').map((letter, index) => (
                  <span key={index}>{letter}</span>
                ))}
              </h1>
            </div>
        </div>
        <div className="w-full lg:w-1/2 bg-gradient-to-r from-white via-gray-100 to-gray-70 dark:bg-gray-800 rounded-lg shadow-lg p-10">
          <h2 className="text-2xl font-bold mb-2">Log In</h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <div className="mb-2">
                <Label value='Your Email' />
              </div>
              <TextInput
                type="email"
                name='email'
                placeholder="name@example.com"
                value={credentials.email}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
            <div>
              <div className="mb-2">
                <Label value='Password' />
              </div>
              <TextInput
                type='password'
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
            <button
              type="submit"
              className="mb text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Log In
            </button>
            <p className="error-message text-red-500">{error}</p>
          </form>
        </div>
      </div>
    </div>
  );
}
