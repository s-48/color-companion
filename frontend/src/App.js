import React, { useState } from 'react';
import UploadImage from './components/UploadImage';
import UploadURL from './components/UploadURL';
import UserPrompt from './components/UserPrompt';

function App() {
  const [imageUrl, setImageUrl] = useState(''); // Store a single image URL
  const [chatStage, setChatStage] = useState(0); // Track current stage
  const [response, setResponse] = useState(''); // Store AI responses

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
        {/* Stage 0: Greeting */}
        <div className={`chat-box ${chatStage >= 0 ? 'visible' : 'hidden'}`}>
          <p>
            Hi! I'm your color companion. Upload an image, and I can answer
            your questions about the colors in it!
          </p>
          {chatStage === 0 && (
            <>
              <UploadImage setImageUrl={setImageUrl} setChatStage={setChatStage} />
              <UploadURL setImageUrl={setImageUrl} setChatStage={setChatStage} />
            </>
          )}
        </div>

        {/* Stage 1: Image Preview and Question Prompt */}
        <div className={`chat-box ${chatStage >= 1 ? 'visible' : 'hidden'}`}>
          {imageUrl && (
            <>
              <p>Thanks for the image! What would you like to know about it?</p>
              <div className="image-preview">
                <img
                  src={imageUrl}
                  alt="Uploaded preview"
                  style={{ maxWidth: '200px', margin: '5px' }}
                />
              </div>
            </>
          )}
          {chatStage === 1 && (
            <UserPrompt
              imageUrl={imageUrl}
              setChatStage={setChatStage}
              setResponse={setResponse}
            />
          )}
        </div>

        {/* Stage 2: Display Response */}
        <div className={`chat-box ${chatStage >= 2 ? 'visible' : 'hidden'}`}>
          {response && (
            <>
              <h3>AI Response:</h3>
              <p>{response}</p>
            </>
          )}
          {chatStage === 2 && (
            <div className="follow-up-options">
              <button onClick={() => setChatStage(1)}>Ask another question</button>
              <button onClick={resetWorkflow}>Upload a new image</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;