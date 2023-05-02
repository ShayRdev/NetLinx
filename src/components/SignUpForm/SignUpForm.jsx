import React, { useState } from 'react';
import { signUp } from '../../utilities/users-service';
import { Label } from 'flowbite-react';
import { TextInput } from 'flowbite-react';

export default function SignUpForm({ setUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const formData = { name, email, password };
      const user = await signUp(formData);
      setUser(user);
    } catch {
      setError('Sign Up Failed - Try Again');
    }
  };

  const handleChange = (evt) => {
    switch (evt.target.name) {
      case 'name':
        setName(evt.target.value);
        break;
      case 'email':
        setEmail(evt.target.value);
        break;
      case 'password':
        setPassword(evt.target.value);
        break;
      case 'confirm':
        setConfirm(evt.target.value);
        break;
      default:
        break;
    }
    setError('');
  };

  const disable = password !== confirm;

  return (
    <div className="container mx-auto max-w-2xl sm:max-w-xl lg:mr-0 lg:ml-auto lg:pr-auto lg:w-1/2 pb-80 pr-40">
      <div className="container bg-gradient-to-r from-white via-gray-100 to-gray-70 dark:bg-gray-800 rounded-lg shadow-lg p-10">
        <h2 className="text-2xl font-bold mb-2">Sign Up</h2>
        <form className="flex flex-col gap-4" autoComplete="off" onSubmit={handleSubmit}>
          <div>
            <div className='mb-2'>
              <Label value='Name' />
            </div>
            <TextInput 
              type="text" 
              name="name" 
              value={name} 
              onChange={handleChange}
              required={true}

            />
          </div>
          <div>
            <div className='mb-2'>
              <Label value="Your Email" />
            </div>
              <TextInput 
                type="email" 
                name="email" 
                value={email} 
                onChange={handleChange}
                required={true}
              />
          </div>
          <div>
            <div className='mb-2'>
              <Label value="Password" />
            </div>
              <TextInput 
                type="password" 
                name="password" 
                value={password} 
                onChange={handleChange}
                required={true}
              />
          </div>
          <div>
            <div className='mb-2'>
              <Label value="Confirm" />
            </div>
              <TextInput 
                type="password" 
                name="confirm" 
                value={confirm} 
                onChange={handleChange}
                required={true}
              />
          </div>
 
          <button type="submit" className=" mb text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Log In</button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}
