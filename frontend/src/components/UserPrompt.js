import React, { useState } from 'react';

function UserPrompt({ imageUrl }) {
  const [question, setQuestion] = useState('');  // Store user's question
  const [personality, setPersonality] = useState('helpful assistant'); // Store AI personality
  const [response, setResponse] = useState('');  // Store the AI's response
  const [isLoading, setIsLoading] = useState(false);  // Track loading state
  const [error, setError] = useState('');  // Track error state

  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission

    // Validation: Ensure there's a question and image URL
    if (!question || !imageUrl) {
      alert('Please provide a question and upload an image.');
      return;
    }

    setIsLoading(true);
    setError(''); // Reset any previous errors

    try {
      const systemMessage = `You are a ${personality}.`;  // Define system message
      const userMessage = question;  // Define user message

      // Send both the system message and the user's question to the backend
      const res = await fetch('http://localhost:5001/generate-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          systemMessage,  // Adding system message
          userMessage, 
          imageUrl,   // Adding user question
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate response from the server.');
      }

      const data = await res.json();  // Parse the response
      setResponse(data.response);  // Set the response in the state
    } catch (error) {
      console.error('Error generating response:', error);  // Handle errors
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
            onChange={(e) => setQuestion(e.target.value)}  // Update the question state
            placeholder="Enter your question here"
          />
        </div>
        <div>
          <label htmlFor="personality">AI Personality:</label>
          <input
            type="text"
            id="personality"
            value={personality}
            onChange={(e) => setPersonality(e.target.value)}  // Update the personality state
            placeholder="e.g., friendly, informative"
          />
        </div>
        <button type="submit" disabled={isLoading}>Submit</button>
      </form>

      {error && <p className="error">{error}</p>} {/* Display error message */}
      {response && (
        <div className="response">
          <h3>AI Response:</h3>
          <p>{response}</p>  {/* Display the AI's response */}
        </div>
      )}
    </div>
  );
}

export default UserPrompt;