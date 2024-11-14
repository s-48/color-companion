import React, { useState } from 'react';
import UploadImage from './components/UploadImage';
import UserPrompt from './components/UserPrompt';
function App() {
  const [imageUrl, setImageUrl] = useState('');
  return (
    <div className="App">
      <header className="App-header">
      </header>
        <h1>Image Upload App</h1>

          <div className="home-page">
            <h1>Welcome to the Image Upload App</h1>
            {/* Pass the setImageUrl function as a prop */}
            <UploadImage setImageUrl={setImageUrl} />
            {/* Conditionally render UserPrompt if imageUrl is available */}
            {imageUrl && <UserPrompt imageUrl={imageUrl} />}
          </div>
    </div>
  );
}

export default App;