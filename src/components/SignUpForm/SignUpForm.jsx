import React, { useState } from 'react';
import { signUp } from '../../utilities/users-service';
import { Label } from 'flowbite-react';
import { TextInput } from 'flowbite-react';
import './SignUpForm.css'; // Make sure this CSS file is set up correctly

export default function SignUpForm({ setUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('file', file); // Append the file to the form data

      const user = await signUp(formData);
      setUser(user);
    } catch (err) {
      console.error('Sign up error:', err);
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

  const handleFileChange = (evt) => {
    setFile(evt.target.files[0]);
  };

  const disable = password !== confirm;

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen p-6">
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-5xl gap-8">
        <div className="flex-grow flex items-center justify-center lg:justify-start">
          <h1 className="text-7xl font-extrabold text-white capitalize falling-shimmering-letters">
            {Array.from("NetLinx").map((letter, index) => (
              <span key={index}>{letter}</span>
            ))}
          </h1>
        </div>
        <div className="w-full lg:w-1/2 bg-white bg-opacity-80 rounded-lg shadow-lg p-10">
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
                required
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
                required
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
                required
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
                required
              />
            </div>
            <div>
              <div className='mb-2'>
                <Label value="Profile Picture" />
              </div>
              <input 
                type="file" 
                onChange={handleFileChange} 
                required 
              />
            </div>
            <button 
              type="submit" 
              className="mb text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              disabled={disable}
            >
              Sign Up
            </button>
          </form>
          <p className="error-message text-red-500">{error}</p>
        </div>
      </div>
    </div>
  );
}
