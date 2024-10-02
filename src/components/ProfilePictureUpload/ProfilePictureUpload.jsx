import React, { useState } from 'react';
import sendRequest from "../../utilities/send-request"; // Ensure the correct path to the utility for API requests

const ProfilePictureUpload = ({ currentUser }) => { // Accept currentUser as a prop
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
    formData.append('userId', currentUser._id); // Ensure you have the current user's ID

    try {
      const response = await fetch('/api/uploads/uploadProfilePicture', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const data = await response.json();
      console.log('Upload successful:', data);
      setUploadStatus('File uploaded successfully!'); // Update status on success
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Error uploading file. Please try again.'); // Update status on error
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
      {uploadStatus && <p>{uploadStatus}</p>} {/* Display upload status */}
    </div>
  );
};

export default ProfilePictureUpload;
