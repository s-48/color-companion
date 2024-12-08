import React, { useRef, useState } from 'react';

const LiveFeed = () => {
  const videoRef = useRef(null); // Ref for the video element
  const canvasRef = useRef(null); // Ref for the canvas (for pixel analysis)
  const [stream, setStream] = useState(null); // State to store the media stream
  const [rgbValue, setRgbValue] = useState(null); // State to store the RGB value
  const [colorName, setColorName] = useState(null); // State to store the color name

  // Function to start the camera and get permissions
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = mediaStream;
      setStream(mediaStream);
      videoRef.current.play();
    } catch (err) {
      console.error('Error accessing the camera: ', err);
      alert('Error accessing the camera. Please check permissions or camera availability.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setStream(null);
    }
  };

  const handleClick = async (event) => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const rect = video.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((event.clientY - rect.top) / rect.height) * canvas.height;

    const pixelData = context.getImageData(x, y, 1, 1).data;
    const rgb = `RGB(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;

    setRgbValue(rgb);

    try {
      const res = await fetch('http://localhost:5001/get-color', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rgbValue: rgb }), // Pass the RGB value
      });

      if (!res.ok) {
        throw new Error('Failed to fetch color name from the server.');
      }

      const data = await res.json();
      setColorName(data.response); // Set the color name
    } catch (error) {
      console.error('Error fetching color name:', error);
      setColorName('Unknown'); // Fallback in case of error
    }
  };

  return (
    <div className="live-feed">
        <h2>Live Camera Feed</h2>
      <div className="camera-buttons">
        <button onClick={startCamera}>Start Camera</button>
        <button onClick={stopCamera} disabled={!stream}>Stop Camera</button>
      </div>
      <div>
        <video
          ref={videoRef}
          width="640"
          height="480"
          onClick={handleClick}
          style={{ cursor: 'crosshair' }}
        />
        <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }}></canvas>
      </div>

      {rgbValue && <p>RGB Value: {rgbValue}</p>}
      {colorName && <p>Color Name: {colorName}</p>}
    </div>
  );
};

export default LiveFeed;