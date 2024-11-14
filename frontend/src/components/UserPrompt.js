import React, { useState } from 'react';

function UserPrompt() {
  const [question, setQuestion] = useState('');
  const [personality, setPersonality] = useState('helpful assistant');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Question:', question);
    console.log('Personality:', personality);
    // You could add a function here to send these inputs to your backend or OpenAI API
  };

  return (
    <div className="user-prompt">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="question">Ask a Question:</label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question here"
          />
        </div>
        <div>
          <label htmlFor="personality">AI Personality:</label>
          <input
            type="text"
            id="personality"
            value={personality}
            onChange={(e) => setPersonality(e.target.value)}
            placeholder="e.g., friendly, informative"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserPrompt;