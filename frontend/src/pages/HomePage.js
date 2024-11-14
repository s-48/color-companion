import React, { useState } from 'react';
import UploadImage from '../components/UploadImage';
import UserPrompt from '../components/UserPrompt';

function HomePage() {
  // Define state for the image URL
  const [imageUrl, setImageUrl] = useState('');

  return (
    <div className="home-page">
      <h1>Welcome to the Image Upload App</h1>
      {/* Pass the setImageUrl function as a prop */}
      <UploadImage setImageUrl={setImageUrl} />
      {/* Conditionally render UserPrompt if imageUrl is available */}
      {imageUrl && <UserPrompt imageUrl={imageUrl} />}
    </div>
  );
}

export default HomePage;
  