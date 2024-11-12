import React, { useState } from 'react';
import axios from 'axios';

const UploadImage = () => {
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
      setUploadStatus('Upload successful! Image URL: ' + response.data.imageUrl);
    } catch (error) {
      setUploadStatus('Upload failed! Please try again.');
    }
  };

  return (
    <div className="upload-container">
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {previewUrl && (
        <img src={previewUrl} alt="Preview" style={{ width: '200px', height: 'auto' }} />
      )}
      <button onClick={handleUpload}>Upload Image</button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default UploadImage;
