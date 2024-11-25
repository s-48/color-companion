import React, { useState } from 'react';

function UserPrompt({ imageUrl, setChatStage, setResponse, logQuestion, personality }) {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question || !imageUrl) {
      alert('Please provide a question and upload an image.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const systemMessage = `You are a ${personality}.`;
      const userMessage = question;
      logQuestion(question);
      const res = await fetch('http://localhost:5001/generate-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          systemMessage,
          userMessage,
          imageUrl,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate response from the server.');
      }

      const data = await res.json();
      setResponse(data.response); // Update response in parent
      setChatStage(2); // Transition to chatStage 2
    } catch (error) {
      console.error('Error generating response:', error);
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
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
        <button type="submit" disabled={isLoading}>Submit</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default UserPrompt;
