import React, { useState } from 'react';
import UploadImage from './components/UploadImage';
import UploadURL from './components/UploadURL';
import UserPrompt from './components/UserPrompt';
function App() {
  const [imageUrl, setImageUrl] = useState(''); // Store a single image URL
  const [chatStage, setChatStage] = useState(0); // Track stages in the workflow
  const [response, setResponse] = useState(''); // Store AI responses

  const handleSetImageUrl = (newImageUrl) => {
    if (newImageUrl) {
      setImageUrl(newImageUrl);
      setChatStage(1); // Move to the next stage after image upload
    }
  };

  const resetWorkflow = () => {
    setImageUrl('');
    setResponse('');
    setChatStage(0); // Reset to the initial stage
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Color Companion</h1>
      </header>
      <div className="home-page">
        {/* Initial Greeting */}
        {chatStage === 0 && (
          <div className="chat-box">
            <p>
              Hi! I'm your color companion. Upload an image, and I can answer
              your questions about the colors in it!
            </p>
            <UploadImage setImageUrl={handleSetImageUrl} />
            <UploadURL setImageUrl={handleSetImageUrl} />
          </div>
        )}

        {/* Show preview and prompt for questions */}
        {chatStage === 1 && (
          <div className="chat-box">
            <p>Thanks for the image! What would you like to know about it?</p>
            <div className="image-preview">
              <img
                src={imageUrl}
                alt="Uploaded preview"
                style={{ maxWidth: '200px', margin: '5px' }}
              />
            </div>
            {imageUrl && <UserPrompt imageUrl={imageUrl} />}
          </div>
        )}

        {/* Display AI response and allow follow-up */}
        {chatStage === 2 && (
          <div className="chat-box">
            <div className="response">
              <p>{response}</p>
            </div>
            <div className="follow-up-options">
              <button onClick={() => setChatStage(1)}>Ask another question</button>
              <button onClick={resetWorkflow}>Upload a new image</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


export default App;