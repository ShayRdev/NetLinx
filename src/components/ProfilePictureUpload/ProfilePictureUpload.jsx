import React, { useState } from 'react';
import sendRequest from "../../utilities/send-request"; // Correct path

const ProfilePictureUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  // Function to handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Function to handle file upload
  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('profilePicture', file);
    
    try {
      const response = await fetch('/api/uploads/uploadProfilePicture', { // Updated endpoint
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const data = await response.json();
      console.log('Upload successful:', data);
      setUploadStatus('File uploaded successfully!'); // Update upload status
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Error uploading file'); // Update upload status on error
    }
  };
  

  // Function triggered on form submit
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    if (selectedFile) {
      handleFileUpload(selectedFile);
    } else {
      setUploadStatus('Please select a file first.');
    }
  };

  return (
    <div>
      <h1>Upload Profile Picture</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default ProfilePictureUpload;
