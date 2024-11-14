import React from 'react';
import UploadImage from './components/UploadImage';
import UserPrompt from '../components/UserPrompt';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Image Upload App</h1>
        <UploadImage />
        <UserPrompt />
      </header>
    </div>
  );
}

export default App;