import React, { useState, useEffect, useRef } from 'react';
import UploadImage from './components/UploadImage';
import UploadURL from './components/UploadURL';
import UserPrompt from './components/UserPrompt';
import Settings from './components/Settings';

function App() {
  const [imageUrl, setImageUrl] = useState('');
  const [chatLog, setChatLog] = useState([
    { type: 'welcome', content: "Hi! I'm your color companion. Upload an image, and I can answer your questions about the colors in it!" }
  ]); // Include the welcome message in the chat log
  const [chatStage, setChatStage] = useState(0); // Track current stage
  const chatEndRef = useRef(null); // Reference for auto-scrolling
  const [personality, setPersonality] = useState('Expert colorblind assistant'); // Track settings
  const [colorblindness, setColorblindness] = useState('none'); // Track settings
  const [showSettings, setShowSettings] = useState(false); // Toggle settings panel visibility

  const resetWorkflow = () => {
    setImageUrl(''); // Clear the current image
    setChatStage(0); // Reset to the initial upload stage
    // Do not clear chatLog to preserve existing messages
  };

  // Add a new entry to the chat log
  const addChatEntry = (type, content) => {
    setChatLog((prev) => [...prev, { type, content }]);
  };

  // Scroll to the most recent chat entry
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLog]);

  return (
    <div className="App-wrapper">
      <div className="App">
        {/* Conditionally Render Settings */}
        {showSettings && (
          <Settings
            personality={personality}
            setPersonality={setPersonality}
            colorblindness={colorblindness}
            setColorblindness={setColorblindness}
          />
        )}

        <div className="chat-window">
          {/* Chat Log */}
          <div className="chat-log">
            {chatLog.map((entry, index) => (
              <div key={index} className={`chat-entry ${entry.type}`}>
                {entry.type === 'text' && <p>{entry.content}</p>}
                {entry.type === 'image' && (
                  <div className="chat-entry image">
                    <img
                      src={entry.content}
                      alt="Uploaded preview"
                      style={{ maxWidth: '200px', margin: '5px' }}
                    />
                  </div>
                )}
                {entry.type === 'question' && (
                  <p>
                    <strong>Q:</strong> {entry.content}
                  </p>
                )}
                {entry.type === 'answer' && (
                  <p>
                    <strong>A:</strong> {entry.content}
                  </p>
                )}
                {entry.type === 'welcome' && <p>{entry.content}</p>}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Stage 0: no image uploaded yet */}
          <div className="chat-input">
            {chatStage === 0 && (
              <div className="">
                <div className="upload">
                  <UploadImage
                    setImageUrl={(url) => {
                      setImageUrl(url);
                      addChatEntry('image', url);
                      setChatStage(1);
                    }}
                  />
                </div>
                <div className="url">
                  <UploadURL
                    setImageUrl={(url) => {
                      setImageUrl(url);
                      addChatEntry('image', url);
                      setChatStage(1);
                    }}
                  />
                </div>
              </div>
            )}
            {/* Stage 1: image uploaded */}
            {chatStage === 1 && imageUrl && (
              <div className="user-prompt">
                <p>What would you like to know about the image?</p>
                <UserPrompt
                  imageUrl={imageUrl}
                  setChatStage={() => setChatStage(2)}
                  setResponse={(response) => {
                    addChatEntry('answer', response);
                    setChatStage(2);
                  }}
                  logQuestion={(question) => {
                    addChatEntry('question', question);
                  }}
                  personality={personality}
                  colorblindness={colorblindness}
                />
              </div>
            )}
            {/* Stage 2: Response returned */}
            {chatStage === 2 && (
              <div className="user-options">
                <button onClick={() => setChatStage(1)}>Ask another question</button>
                <button onClick={resetWorkflow}>Upload a new image</button>
              </div>
            )}
                <button onClick={() => setShowSettings((prev) => !prev)}>
                  {showSettings ? 'Close Settings' : 'Settings'}
                </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;