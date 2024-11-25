import React, { useState } from 'react';

function UploadURL({ setImageUrl, setChatStage }) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) {
      alert('Please enter a valid URL.');
      return;
    }
    setImageUrl(url); // Update the imageUrl in the parent component
    // setChatStage(1);
    setUrl(''); // Clear the input field
  };

  return React.createElement(
    'form',
    { onSubmit: handleSubmit, className: 'upload-url-form' },
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
  );
}

export default UploadURL;