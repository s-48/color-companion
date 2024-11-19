import React, { useState } from 'react';
import UploadImage from './components/UploadImage';
import UploadURL from './components/UploadURL';
import UserPrompt from './components/UserPrompt';
function App() {
  const [imageUrl, setImageUrl] = useState('');
  return (
    <div className="App">
      <header className="App-header">
      </header>
          <div className="home-page">
            {/* Pass the setImageUrl function as a prop */}
            <UploadImage setImageUrl={setImageUrl} />
            {/* Allow users to submit a custom URL */}
            <UploadURL setImageUrl={setImageUrl} />
            {/* Conditionally render UserPrompt if imageUrl is available */}
            {imageUrl && <UserPrompt imageUrl={imageUrl} />}
          </div>
    </div>
  );
}

export default App;