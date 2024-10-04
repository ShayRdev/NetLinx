import React, { useState } from 'react';

const FileUpload = ({ onUserUpdate }) => {
  const [file, setFile] = useState(null);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('token'); // Get the token

    try {
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Include token in header
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('File URL:', data.fileUrl);

      // Update the user state with the new profile picture URL
      onUserUpdate(data.fileUrl);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="file" onChange={onFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default FileUpload;
