import React, { useState } from 'react';

function UploadURL({ setImageUrl, setChatStage, wrapperClass }) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) {
      alert('Please enter a valid URL.');
      return;
    }
    setImageUrl(url); // Update the imageUrl in the parent component
    setUrl(''); // Clear the input field
  };

  return React.createElement(
    'div', 
    { className: wrapperClass }, // Outermost wrapper div
    React.createElement(
      'div', 
      { className: 'upload-url-container' }, // Inner wrapper div
      React.createElement(
        'form',
        { onSubmit: handleSubmit },
        React.createElement('input', {
          type: 'text',
          placeholder: 'Enter image URL',
          value: url,
          onChange: (e) => setUrl(e.target.value),
          className: 'upload-url-input',
        }),
        React.createElement(
          'button',
          { type: 'submit', className: 'upload-url-button' },
          'Submit URL'
        )
      )
    )
  );
}

export default UploadURL;