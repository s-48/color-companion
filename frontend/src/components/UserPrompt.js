import React, { useState } from 'react';

function UserPrompt() {
  const [question, setQuestion] = useState('');
  const [personality, setPersonality] = useState('helpful assistant');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const systemMessage = `You are a ${personality}.`;
      const userMessage = question;

      // Send both the system message and the user's question to the backend
      const res = await fetch('/api/generate-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          systemMessage,  // Adding system message
          userMessage,    // Adding user question
        }),
      });

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error('Error generating response:', error);
    }
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

      {response && (
        <div className="response">
          <h3>AI Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default UserPrompt;