import { useState } from 'react';
import * as usersService from '../../utilities/users-service';
import { Label } from 'flowbite-react';
import { TextInput } from 'flowbite-react';


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

  return (
    <div className=" container mx-auto max-w-2xl sm:max-w-xl lg:mr-0 lg:ml-auto lg:pr-auto lg:w-1/2 pb-80 pr-40 ">
    <div className=' container bg-gradient-to-r from-white via-gray-100 to-gray-70 dark:bg-gray-800 rounded-lg shadow-lg p-10 '>
      <h2 className="text-2xl font-bold mb-2">Log In</h2>
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2">
          <Label
            value='Your Email'
            />
          </div>
          <TextInput
            type="email"
            name='email'
            placeholder="name@example.com"
            value={credentials.email}
            onChange={handleChange}
            required={true}
            className="w-full"
          />
        </div>
        <div>
        <div className="mb-2">
          <Label
            value='Password'
          />
        </div>
        <TextInput 
          type='password' 
          name="password"
          value={credentials.password}
          onChange={handleChange}
          required={true}
          className="w-full"
          />
          </div>
        <button type="submit" className=" mb text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Log In</button>
      <p className="error-message">{error}</p>
    </form>
    </div>
    </div>
  );
}


