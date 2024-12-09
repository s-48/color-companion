import React, { useState, useEffect, useRef } from 'react';
import UploadImage from './components/UploadImage';
import UploadURL from './components/UploadURL';
import UserPrompt from './components/UserPrompt';
import Settings from './components/Settings';
import LiveFeed from './components/LiveFeed';
import ImagePopup from './components/ImagePopup';

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
  const [showLiveFeed, setShowLiveFeed] = useState(false); // Toggle settings panel visibility
  const [darkMode, setDarkMode] = useState(false);

  const resetWorkflow = () => {
    setImageUrl(''); // Clear the current image
    setChatStage(0); // Reset to the initial upload stage
  };

  // Add a new entry to the chat log
  const addChatEntry = (type, content) => {
    setChatLog((prev) => [...prev, { type, content }]);
  };

  const toggleDarkMode = () => {
    const themeStylesheet = document.getElementById('theme-stylesheet');
    if (themeStylesheet.getAttribute('href') === 'styles.css') {
      themeStylesheet.setAttribute('href', 'styles-dark.css');
    } else {
      themeStylesheet.setAttribute('href', 'styles.css');
    }
  };

  // Scroll to the most recent chat entry
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLog]);

  return (
    <div className="App-wrapper">
      <div className="App">
        {/* Conditionally Render Settings */}
        <div className={`settings-sidebar ${showSettings ? 'open' : ''}`}>
          {showSettings && (
            <Settings
              personality={personality}
              setPersonality={setPersonality}
              colorblindness={colorblindness}
              setColorblindness={setColorblindness}
              toggleDarkMode={toggleDarkMode}
            />
          )}
        </div>
        {/* Live Feed Sidebar */}
        <div className={`feed-sidebar ${showLiveFeed ? 'open' : ''}`}>
          <button className="close-btn" onClick={() => setShowLiveFeed(false)}>Close</button>
          <LiveFeed />
        </div>

        <div className="chat-window">
          {/* Chat Log */}
          <div className="chat-log">
            {chatLog.map((entry, index) => (
              <div key={index} className={`chat-entry ${entry.type}`}>
                {entry.type === 'text' && <p>{entry.content}</p>}
                {entry.type === 'image' && (
                  <div className="chat-entry image">
                    <ImagePopup src={entry.content} />
                  </div>
                )}
                {entry.type === 'question' && (
                <div className="chat-row">
                  <div className="chat-container">
                  <p>
                    <strong>Q:</strong> {entry.content}
                  </p>
                  </div>
                  <div className="icon-container">
                    <img src="Images/User.png"/>
                  </div>
                </div>
                )}
                {entry.type === 'answer' && (
                  <div className="chat-row">
                    <div className="icon-container">
                      <img src="Images/Companion.png"/>
                    </div>
                    <div className="chat-container">
                      <p>
                        <strong>A:</strong> {entry.content}
                      </p>
                    </div>
                  </div>
                )}
                {entry.type === 'welcome' && (
                  <div className="chat-row">
                    <div className="icon-container">
                      <img src="Images/Companion.png" alt="Companion Icon" />
                    </div>
                    <div className="chat-container">
                      <p>{entry.content}</p>
                    </div>
                  </div>
                )}
          </div>
            ))}
            <div ref={chatEndRef} />
        </div>

          {/* Stage 0: no image uploaded yet */}
          <div className="chat-input">
            {chatStage === 0 && (
              <div className="upload-container">
                <div className="upload">
                  <UploadImage
                    setImageUrl={(url) => {
                      setImageUrl(url);
                      addChatEntry('image', url);
                      setChatStage(1);
                    }}
                    wrapperClass="chat-input"
                  />
                </div>
                <div className="url">
                  <UploadURL
                    setImageUrl={(url) => {
                      setImageUrl(url);
                      addChatEntry('image', url);
                      setChatStage(1);
                    }}
                    wrapperClass="chat-input"
                  />
                </div>
                <div className="livefeed-container">
                  <button onClick={() => setShowLiveFeed((prev) => !prev)}>
                    {showLiveFeed ? 'Close Live Feed' : 'Open Live Feed'}
                  </button>
                </div>
                <div className="settings-container">
                  <button onClick={() => setShowSettings((prev) => !prev)}>
                    {showSettings ? 'Close Settings' : 'Settings'}
                  </button>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;