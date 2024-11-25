import React, { useState, useEffect, useRef } from 'react';
import UploadImage from './components/UploadImage';
import UploadURL from './components/UploadURL';
import UserPrompt from './components/UserPrompt';
import Settings from './components/Settings';

function App() {
  const [imageUrl, setImageUrl] = useState('');
  const [chatLog, setChatLog] = useState([]); // Store all chat messages
  const [chatStage, setChatStage] = useState(0); // Track current stage
  const chatEndRef = useRef(null); // Reference for auto-scrolling
  var [personality, setPersonality] = useState('helpful assistant');

  //Resets chat stage on new image upload
  const resetWorkflow = () => {
    setImageUrl('');
    setChatLog([]);
    setChatStage(0);
  };

  //Adds a chat to chat log
  const addChatEntry = (type, content) => {
    setChatLog((prev) => [...prev, { type, content }]);
  };

  //Scroll to most recent chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLog]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Color Companion</h1>
      </header>
      <Settings personality={personality} setPersonality={setPersonality} />
      <div className="chat-window">
        {/* Chat Log */}
        <div className="chat-log">
          {chatLog.map((entry, index) => (
            <div key={index} className={`chat-entry ${entry.type}`}>
              {entry.type === 'text' && <p>{entry.content}</p>}
              {entry.type === 'image' && (
                <img src={entry.content} alt="Uploaded preview" style={{ maxWidth: '200px', margin: '5px' }} />
              )}
              {entry.type === 'question' && <p><strong>Q:</strong> {entry.content}</p>}
              {entry.type === 'answer' && <p><strong>A:</strong> {entry.content}</p>}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Stage 0: no image upload yet */}
        <div className="chat-input">
          {chatStage === 0 && (
            <div className="">
              <div className="color-welcome">
                <p>Hi! I'm your color companion. Upload an image, and I can answer your questions about the colors in it!</p>
              </div>
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
          {/* Stage 1: image upload- sending prompt to openAI */}
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
              />
            </div>
          )}
          {/* Stage 2: Prompt submitted and response returned- option to keep asking or new upload */}
          {chatStage === 2 && (
            <div className="user-options">
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