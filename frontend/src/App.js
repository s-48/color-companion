import React, { useState } from 'react';
import UploadImage from './components/UploadImage';
import UserPrompt from './components/UserPrompt';
import LiveFeed from './components/LiveFeed';

function App() {
  const [imageUrl, setImageUrl] = useState('');
  const [activeTab, setActiveTab] = useState('upload');

  return (
    <div className="App">
      <header className="App-header"></header>
      <h1>Image Upload App</h1>
      <div className="tabs">
        <button onClick={() => setActiveTab('upload')}>Image Upload</button>
        <button onClick={() => setActiveTab('live-feed')}>Live Feed</button>
      </div>
      <div className="home-page">
        {activeTab === 'upload' && (
          <>
            <h1>Welcome to the Image Upload App</h1>
            <UploadImage setImageUrl={setImageUrl} />
            {imageUrl && <UserPrompt imageUrl={imageUrl} />}
          </>
        )}
        {activeTab === 'live-feed' && <LiveFeed />}
      </div>
    </div>
  );
}

export default App;