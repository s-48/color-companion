import React, { useState } from 'react';
import axios from 'axios';

const UploadImage = ({ setImageUrl, setChatStage, addChatEntry, wrapperClass }) => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  // Handle image upload
  const handleUpload = async () => {
    if (!image) {
      alert('Please select an image first!');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      setUploadStatus('Uploading...');
      const response = await axios.post('http://localhost:5001/upload', formData);
      setUploadStatus('Upload successful!');
      setImageUrl(response.data.imageUrl); // Update image URL in the parent component
      setChatStage(1); // Move to the next chat stage
    } catch (error) {
      setUploadStatus('Upload failed! Please try again.');
    }
  };

  return (
    <div className={wrapperClass}>
      <div className="upload-image-container">
        <input type="file" accept="image/*" onChange={handleImageChange} className="file-input"/>
        {previewUrl && (
          <div>
            <img src={previewUrl} alt="Preview" style={{ width: '200px', height: 'auto' }} />
            {/* Render the button only if an image is staged */}
            <button onClick={handleUpload}>Upload Image</button>
          </div>
        )}
        {uploadStatus && <p>{uploadStatus}</p>}
      </div>
    </div>
  );
};

export default UploadImage;
